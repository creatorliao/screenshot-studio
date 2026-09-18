/**
 * 替换安全性审计 v2
 *
 * 教训：只在 jsxExpr 通道做渲染位判定不够。真实构建失败来自
 * `(["added","improved","fixed"] as const).map(...)` —— 数组字面量里的枚举值。
 *
 * 本版对所有编辑统一做「风险祖先」扫描：只要字符串向上到函数边界之间
 * 出现比较、函数实参、数组字面量、非文本属性赋值等构造，就判为高风险。
 */
import ts from "typescript";
import fs from "node:fs";
import path from "node:path";
import { collectEdits, isExcluded, TEXT_PROP_KEYS, isDisplayShaped } from "./lib/i18n-detect";
import { ORIGINAL_EN_DIR } from "./lib/i18n-paths";

const ROOT = process.cwd();
// 审计必须针对「汉化前」的英文原文：对已汉化的源码扫描，
// 中文会被当成"新文案"，风险判定与位点统计都无意义。
const SRC_ROOT = ORIGINAL_EN_DIR;
const DIRS = ["app", "components", "lib", "hooks"];

const TEXT_PROP_KEYS_LOCAL = TEXT_PROP_KEYS;

function walk(dir: string, out: string[] = []): string[] {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (e.name !== "node_modules" && e.name !== ".next") walk(p, out); }
    else if (/\.tsx?$/.test(e.name) && !/\.d\.ts$/.test(e.name)) out.push(p);
  }
  return out;
}

type Risk = { file: string; line: number; reason: string; key: string };
const risks: Risk[] = [];
const reasonCount = new Map<string, number>();
let total = 0;

const files = DIRS.flatMap((d) => walk(path.join(SRC_ROOT, d)));

for (const file of files) {
  const rel = path.relative(SRC_ROOT, file).replace(/\\/g, "/");
  if (isExcluded(rel)) continue;
  const src = fs.readFileSync(file, "utf8");
  const sf = ts.createSourceFile(file, src, ts.ScriptTarget.Latest, true,
    /\.tsx$/.test(file) ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
  const edits = collectEdits(file, src);
  total += edits.length;

  for (const e of edits) {
    // 定位节点：内容区间起点往前一格即引号（字符串字面量）
    let node: ts.Node | undefined;
    const find = (n: ts.Node) => {
      if (node) return;
      if (ts.isStringLiteral(n) && n.getStart(sf) + 1 === e.start) { node = n; return; }
      if (ts.isJsxText(n) && n.getStart(sf) === e.start) { node = n; return; }
      ts.forEachChild(n, find);
    };
    find(sf);
    if (!node) continue;

    // 向上扫描，但一到「渲染边界」就停：
    //   JsxExpression      —— 已由 isRenderPosition 判定为渲染分支
    //   JsxAttribute       —— 已由 TEXT_ATTRS 白名单限定为文案属性
    //   文本型属性赋值      —— dataProp 通道，值即文案
    // 越过这些边界继续向上，只会把外层 return / 数组说成风险，产生噪音。
    let cur: ts.Node | undefined = node;
    let reason = "";
    while (cur) {
      const p: ts.Node | undefined = cur.parent;
      if (!p) break;
      if (
        ts.isFunctionDeclaration(p) || ts.isFunctionExpression(p) ||
        ts.isArrowFunction(p) || ts.isMethodDeclaration(p)
      ) break;

      // 渲染边界：安全，停止上溯
      if (ts.isJsxExpression(p)) break;
      if (ts.isJsxAttribute(p)) break;
      // JSX 元素树内的一切文本都是渲染内容（jsxText 直接挂在 JsxElement 下，
      // 不经过 JsxExpression，若不在此停止会一路走到外层 return 造成误报）
      if (
        ts.isJsxElement(p) || ts.isJsxFragment(p) ||
        ts.isJsxSelfClosingElement(p) || ts.isJsxOpeningElement(p) ||
        ts.isJsxClosingElement(p)
      ) break;
      if (ts.isPropertyAssignment(p) && p.initializer === cur) {
        const nm = p.name.getText(sf).replace(/['"]/g, "");
        if (TEXT_PROP_KEYS_LOCAL.has(nm)) break;
        reason = `对象属性值(${nm})`;
      }

      if (!reason && ts.isBinaryExpression(p)) {
        const k = p.operatorToken.kind;
        const cmp =
          k === ts.SyntaxKind.EqualsEqualsToken || k === ts.SyntaxKind.EqualsEqualsEqualsToken ||
          k === ts.SyntaxKind.ExclamationEqualsToken || k === ts.SyntaxKind.ExclamationEqualsEqualsToken ||
          k === ts.SyntaxKind.LessThanToken || k === ts.SyntaxKind.GreaterThanToken ||
          k === ts.SyntaxKind.LessThanEqualsToken || k === ts.SyntaxKind.GreaterThanEqualsToken;
        if (cmp) reason = "比较运算";
        else if (k === ts.SyntaxKind.PlusToken) reason = "字符串拼接";
      }
      if (!reason && p.kind === ts.SyntaxKind.CaseClause) reason = "switch case";
      // 数组元素：展示形态的长句是刻意收录的（见 isDisplayShaped），到此为止；
      // 短枚举 token 出现在数组里才是风险。
      if (!reason && ts.isArrayLiteralExpression(p)) {
        if (isDisplayShaped(e.key)) break;
        reason = "数组字面量";
      }
      if (!reason && ts.isCallExpression(p) && p.arguments.includes(cur as ts.Expression)) reason = "函数实参";
      if (!reason && ts.isNewExpression(p) && p.arguments?.includes(cur as ts.Expression)) reason = "构造函数实参";
      if (!reason && ts.isVariableDeclaration(p) && p.initializer === cur) reason = "变量初始化";
      if (!reason && ts.isReturnStatement(p)) reason = "return 值";
      cur = p;
    }

    if (reason) {
      reasonCount.set(reason, (reasonCount.get(reason) ?? 0) + 1);
      const line = sf.getLineAndCharacterOfPosition(node.getStart(sf)).line + 1;
      risks.push({ file: rel, line, reason, key: e.key });
    }
  }
}

console.log("=".repeat(76));
console.log("替换安全性审计 v2（全通道风险扫描，对英文原文）");
console.log("=".repeat(76));
console.log(`编辑总数        : ${total}`);
console.log(`高风险编辑      : ${risks.length}`);
console.log("\n按原因分布：");
[...reasonCount.entries()].sort((a, b) => b[1] - a[1])
  .forEach(([r, c]) => console.log(`  ${String(c).padStart(5)}  ${r}`));

console.log("\n---- 高风险样例（前 40）----");
risks.slice(0, 40).forEach((r) => console.log(`  ${r.file}:${r.line}  [${r.reason}]  "${r.key.slice(0, 60)}"`));
