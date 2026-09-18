/**
 * 经验性发现：哪些对象属性名承载的是「文案」而非「逻辑值」
 *
 * 白名单式 TEXT_PROP_KEYS 总有遗漏（已漏 q/a/detail/heroTitle…）。
 * 这里对备份中的英文原文做统计：按属性名分组，看其字符串值的"文本形态"比例。
 *   - 值多为多词、含空格、长度较长 → 文案
 *   - 值多为单 token、小写、短 → 逻辑值/标识
 */
import ts from "typescript";
import fs from "node:fs";
import path from "node:path";
import { ORIGINAL_EN_DIR } from "./lib/i18n-paths";

const ROOT = process.cwd();
// 属性名统计同样只对英文原文有意义（中文里没有这些标识符）。
const SRC_ROOT = ORIGINAL_EN_DIR;
const DIRS = ["app", "components", "lib", "hooks"];

function walk(dir: string, out: string[] = []): string[] {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (e.name !== "node_modules" && e.name !== ".next") walk(p, out); }
    else if (/\.tsx?$/.test(e.name) && !/\.d\.ts$/.test(e.name)) out.push(p);
  }
  return out;
}

type Stat = { total: number; textual: number; samples: string[] };
const stats = new Map<string, Stat>();

/** 文本形态：多词、含空格、够长 —— 逻辑值/标识基本不会长这样 */
function isTextual(s: string): boolean {
  if (s.length < 10) return false;
  if (!/\s/.test(s)) return false;              // 必须含空格
  if (!/^[A-Z(]/.test(s)) return false;         // 通常以大写或括号开头
  if (/^[a-z0-9-]+(\s+[a-z0-9-]+)+$/.test(s)) return false; // 全小写 kebab 串 = 类名
  return true;
}

const files = DIRS.flatMap((d) => walk(path.join(SRC_ROOT, d)));

for (const file of files) {
  const rel = path.relative(SRC_ROOT, file).replace(/\\/g, "/");
  const src = fs.readFileSync(file, "utf8");
  const sf = ts.createSourceFile(file, src, ts.ScriptTarget.Latest, true,
    /\.tsx$/.test(file) ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
  const isTsx = /\.tsx$/.test(file);

  const visit = (node: ts.Node) => {
    // 对象属性：name: "value"
    if (ts.isPropertyAssignment(node) && node.initializer && ts.isStringLiteral(node.initializer)) {
      const key = node.name.getText(sf).replace(/['"]/g, "");
      const val = node.initializer.text;
      let st = stats.get(key);
      if (!st) { st = { total: 0, textual: 0, samples: [] }; stats.set(key, st); }
      st.total++;
      if (isTextual(val)) {
        st.textual++;
        if (st.samples.length < 2) st.samples.push(val.slice(0, 60));
      }
    }
    // JSX 属性：name="value"（含 heroTitle 这类自定义属性）
    if (isTsx && ts.isJsxAttribute(node) && node.initializer && ts.isStringLiteral(node.initializer)) {
      const key = node.name.getText(sf);
      const val = node.initializer.text;
      let st = stats.get(key);
      if (!st) { st = { total: 0, textual: 0, samples: [] }; stats.set(key, st); }
      st.total++;
      if (isTextual(val)) {
        st.textual++;
        if (st.samples.length < 2) st.samples.push(val.slice(0, 60));
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
}

const rows = [...stats.entries()]
  .filter(([, s]) => s.textual > 0)
  .sort((a, b) => b[1].textual - a[1].textual);

console.log("=".repeat(84));
console.log("承载文案的属性名（按文本形态值数量排序）");
console.log("=".repeat(84));
console.log("  文案值  总字符串  属性名");
console.log("-".repeat(84));
for (const [key, s] of rows) {
  console.log(`  ${String(s.textual).padStart(6)}  ${String(s.total).padStart(8)}  ${key}`);
}

console.log("\n---- 样例（判断是否真为文案）----");
for (const [key, s] of rows.slice(0, 25)) {
  console.log(`  [${key}]`);
  s.samples.forEach((x) => console.log(`      ${x}`));
}

fs.writeFileSync(
  path.join(ROOT, "i18n-work", "prop-names.json"),
  JSON.stringify(rows.map(([k, s]) => ({ key: k, textual: s.textual, total: s.total })), null, 2),
);
console.log("\n-> i18n-work/prop-names.json");
