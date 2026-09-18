/**
 * i18n 文案清点 v3（补全覆盖）
 *
 * v2 的漏洞：只扫 app/ + components/ 的 JSX 形态，漏了两大类真实用户文案
 *   1) 模块顶层的普通对象/数组数据（navLinks / howItWorks / FAQ / Pricing…）
 *      它们不是 JSX，但最终被渲染成界面文字
 *   2) lib/ 下的内容模块（对比页、工具页的营销文案）
 *
 * 本版：app / components / lib 全覆盖；JSX 形态 + 文本型对象属性 双通道。
 */
import ts from "typescript";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const DIRS = ["app", "components", "lib", "hooks"];

// 明确不汉化：非 UI 文案，或汉化会破坏功能
const EXCLUDE_FILES = [
  "lib/api/openapi.ts",   // OpenAPI 规范（给机器/开发者）
  "lib/agents/",          // llms.txt 等面向 AI 的内容
  "lib/constants/fonts.ts",        // 字体族名，必须原样传给 canvas/CSS
  "lib/constants/aspect-ratios.ts", // "16:9" 之类非语言内容
];

const TEXT_ATTRS = new Set([
  "title", "placeholder", "alt", "label", "aria-label", "aria-description",
  "description", "ctaLabel", "headline", "tooltip", "helperText", "emptyText",
]);
// 对象属性里承载文案的键名（用于捕获数据数组）
const TEXT_PROP_KEYS = new Set([
  "label", "title", "subtitle", "heading", "description", "desc", "text",
  "question", "answer", "name", "cta", "ctaLabel", "headline", "tagline",
  "caption", "summary", "body", "content", "note", "hint", "placeholder",
  "feature", "benefit", "step", "description2", "suffix", "prefix",
]);
const STYLE_ATTRS = new Set(["className", "class", "style"]);
const STRUCT_ATTRS = new Set([
  "href", "src", "id", "key", "type", "name", "value", "htmlFor", "target",
  "rel", "role", "as", "size", "variant", "color", "fill", "stroke", "d",
  "width", "height", "xmlns", "srcSet", "sizes", "loading", "decoding",
  "crossOrigin", "referrerPolicy", "method", "action", "autoComplete",
  "inputMode", "pattern", "step", "min", "max", "data-testid", "slot", "slug",
]);
const CLASS_FNS = new Set(["cn", "clsx", "cva", "twMerge", "classNames", "cx"]);

const HAS_LATIN = /[A-Za-z]{2,}/;
function looksLikeClass(s: string): boolean {
  if (/^[a-z-]+:/.test(s)) return true;
  if (/\[[^\]]*\]/.test(s) && /[-:]/.test(s)) return true;
  if (/\b(flex|grid|absolute|relative|rounded|border|px-|py-|text-|bg-|w-|h-|gap-|items-|justify-)\b/.test(s)) return true;
  if (/^[a-z0-9-]+(\s+[a-z0-9-\[\]:/.]+)+$/.test(s) && !/[A-Z]/.test(s)) return true;
  return false;
}
function isMeaningfulText(s: string): boolean {
  if (!s || !HAS_LATIN.test(s) || s.length < 2) return false;
  if (/^(https?:|\/|\.\/|#|@\/)/.test(s)) return false;
  if (/^[\w-]+\.(tsx?|json|png|jpg|svg|webp|css)$/.test(s)) return false;
  if (looksLikeClass(s)) return false;
  if (/^[A-Z_0-9]+$/.test(s)) return false;
  if (/^[a-z]+[A-Z][A-Za-z]*$/.test(s)) return false;
  // 纯 slug / 路径片段
  if (/^[a-z0-9]+(-[a-z0-9]+)+$/.test(s)) return false;
  return true;
}

function walk(dir: string, out: string[] = []): string[] {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (e.name !== "node_modules" && e.name !== ".next") walk(p, out); }
    else if (/\.tsx?$/.test(e.name) && !/\.d\.ts$/.test(e.name)) out.push(p);
  }
  return out;
}

const files = DIRS.flatMap((d) => walk(path.join(ROOT, d)));
const hist = { jsxText: 0, jsxAttr: 0, jsxExpr: 0, dataProp: 0 };
const distinct = new Set<string>();
const byFile = new Map<string, number>();
const dataSamples: string[] = [];
type Hit = { file: string; line: number; kind: string; text: string };
const allHits: Hit[] = [];

for (const file of files) {
  const src = fs.readFileSync(file, "utf8");
  const isTsx = file.endsWith(".tsx");
  const sf = ts.createSourceFile(file, src, ts.ScriptTarget.Latest, true, isTsx ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
  const rel = path.relative(ROOT, file).replace(/\\/g, "/");
  if (EXCLUDE_FILES.some((x) => rel.startsWith(x))) continue;
  let n = 0;
  const add = (text: string, node: ts.Node, kind: string) => {
    n++; distinct.add(text);
    const line = sf.getLineAndCharacterOfPosition(node.getStart(sf)).line + 1;
    allHits.push({ file: rel, line, kind, text });
  };

  const inNonText = (node: ts.Node): boolean => {
    let cur: ts.Node | undefined = node;
    while (cur) {
      if (ts.isJsxAttribute(cur) && (STYLE_ATTRS.has(cur.name.getText(sf)) || STRUCT_ATTRS.has(cur.name.getText(sf)))) return true;
      if (ts.isCallExpression(cur) && CLASS_FNS.has(cur.expression.getText(sf))) return true;
      if (ts.isPropertyAssignment(cur)) {
        const nm = cur.name.getText(sf).replace(/['"]/g, "");
        if (nm === "className" || nm === "style" || nm === "keywords" || nm === "alternates" || nm === "images" || nm === "icons") return true;
      }
      cur = cur.parent;
    }
    return false;
  };

  const visit = (node: ts.Node) => {
    if (isTsx && ts.isJsxText(node)) {
      const t = node.getText(sf).replace(/\s+/g, " ").trim();
      if (isMeaningfulText(t)) { hist.jsxText++; add(t, node, "jsxText"); }
    } else if (isTsx && ts.isJsxAttribute(node) && node.initializer && ts.isStringLiteral(node.initializer)) {
      const attr = node.name.getText(sf);
      if (TEXT_ATTRS.has(attr) && isMeaningfulText(node.initializer.text)) { hist.jsxAttr++; add(node.initializer.text, node, "jsxAttr"); }
    } else if (isTsx && ts.isStringLiteral(node)) {
      let cur: ts.Node | undefined = node.parent, insideJsxChild = false;
      while (cur) {
        if (ts.isJsxExpression(cur)) { insideJsxChild = true; break; }
        if (ts.isJsxAttribute(cur)) break;
        cur = cur.parent;
      }
      if (insideJsxChild && isMeaningfulText(node.text) && !inNonText(node)) { hist.jsxExpr++; add(node.text, node, "jsxExpr"); }
    }
    // 数据型：对象属性名为文本键
    if (ts.isPropertyAssignment(node) && node.initializer && ts.isStringLiteral(node.initializer)) {
      const key = node.name.getText(sf).replace(/['"]/g, "");
      const val = node.initializer.text;
      if (TEXT_PROP_KEYS.has(key) && isMeaningfulText(val) && !ts.isJsxAttribute(node.parent) && !inNonText(node)) {
        hist.dataProp++; add(val, node, "dataProp");
        if (dataSamples.length < 25) {
          const ln = sf.getLineAndCharacterOfPosition(node.getStart(sf)).line + 1;
          dataSamples.push(`${rel}:${ln}  ${val.slice(0, 68)}`);
        }
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
  if (n > 0) byFile.set(rel, n);
}

const total = Object.values(hist).reduce((a, b) => a + b, 0);
const totalChars = [...distinct].reduce((a, s) => a + s.length, 0);

console.log("=".repeat(72));
console.log("i18n 文案清点 v3（覆盖 app/ + components/ + lib/ + hooks/）");
console.log("=".repeat(72));
console.log(`扫描源文件            : ${files.length}`);
console.log(`用户可见文案位点      : ${total}`);
console.log(`去重独立文案          : ${distinct.size}`);
console.log(`去重后总字符          : ${totalChars}`);
console.log(`\n按来源通道：`);
console.log(`  JSX 文本节点        : ${hist.jsxText}`);
console.log(`  JSX 文本属性        : ${hist.jsxAttr}`);
console.log(`  JSX 表达式字符串    : ${hist.jsxExpr}`);
console.log(`  数据对象属性        : ${hist.dataProp}   ← v2 完全漏掉的一类`);
console.log(`\n有文案的文件数        : ${byFile.size}`);

console.log("\n---- Top 20 文件 ----");
[...byFile.entries()].sort((a, b) => b[1] - a[1]).slice(0, 20)
  .forEach(([f, c]) => console.log(`   ${String(c).padStart(4)}  ${f}`));

console.log("\n---- 数据对象文案样例（v2 漏掉的那一类）----");
dataSamples.forEach((s) => console.log(`   · ${s}`));

// ---- 导出待译清单（供翻译与 codemod 使用）----
const agg = new Map<string, { en: string; count: number; files: Set<string>; kinds: Set<string> }>();
for (const h of allHits) {
  let e = agg.get(h.text);
  if (!e) { e = { en: h.text, count: 0, files: new Set(), kinds: new Set() }; agg.set(h.text, e); }
  e.count++;
  e.files.add(h.file);
  e.kinds.add(h.kind);
}
const todo = [...agg.values()]
  .map((e) => ({ en: e.en, count: e.count, files: [...e.files].slice(0, 3), kinds: [...e.kinds] }))
  .sort((a, b) => b.count - a.count || a.en.localeCompare(b.en));

fs.writeFileSync(path.join(ROOT, "i18n-todo.json"), JSON.stringify(todo, null, 2));
fs.writeFileSync(path.join(ROOT, "i18n-inventory.json"), JSON.stringify({ summary: { files: files.length, hits: total, distinct: distinct.size, hist }, hits: allHits }, null, 2));
console.log(`\n待译清单 -> i18n-todo.json   (${todo.length} 条)`);
console.log(`位点明细 -> i18n-inventory.json (${allHits.length} 处)`);
