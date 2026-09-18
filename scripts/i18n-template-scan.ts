/**
 * 模板字符串文案扫描
 *
 * 漏洞：检测器只认 ts.isStringLiteral，而模板字符串（含 ${} 插值）是
 * TemplateExpression / NoSubstitutionTemplateLiteral，全部被跳过。
 * 工具页的 name/h1/title/intro 正是用模板串拼的，导致整页文案漏翻。
 *
 * 本脚本只统计，不改写 —— 模板串需要在源码里手工改写为中文，无法靠字典替换。
 */
import ts from "typescript";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const DIRS = ["app", "components", "lib", "hooks"];

const TEXT_ATTRS = new Set([
  "title", "placeholder", "alt", "label", "aria-label", "description",
  "ctaLabel", "headline", "heroTitle", "heroSubtitle", "heroDescription",
]);
const TEXT_PROP_KEYS = new Set([
  "label", "title", "subtitle", "heading", "description", "desc", "text",
  "question", "answer", "name", "cta", "ctaLabel", "headline", "tagline",
  "caption", "summary", "body", "content", "note", "hint", "placeholder",
  "intro", "h1", "why", "detail", "verdict", "meaning", "notes", "endpoint",
  "error", "metaTitle", "metaDescription",
]);

function walk(dir: string, out: string[] = []): string[] {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (e.name !== "node_modules" && e.name !== ".next") walk(p, out); }
    else if (/\.tsx?$/.test(e.name) && !/\.d\.ts$/.test(e.name)) out.push(p);
  }
  return out;
}

const LATIN = /[A-Za-z]{3,}/;
type Hit = { file: string; line: number; ctx: string; text: string };
const hits: Hit[] = [];

for (const file of DIRS.flatMap((d) => walk(path.join(ROOT, d)))) {
  const rel = path.relative(ROOT, file).replace(/\\/g, "/");
  const src = fs.readFileSync(file, "utf8");
  const isTsx = /\.tsx$/.test(file);
  const sf = ts.createSourceFile(file, src, ts.ScriptTarget.Latest, true,
    isTsx ? ts.ScriptKind.TSX : ts.ScriptKind.TS);

  const visit = (node: ts.Node) => {
    const isTpl =
      ts.isTemplateExpression(node) ||
      (ts.isNoSubstitutionTemplateLiteral(node) as boolean);
    if (isTpl) {
      const text = node.getText(sf);
      const lit = ts.isTemplateExpression(node)
        ? [node.head.text, ...node.templateSpans.map((s) => s.literal.text)].join(" ")
        : (node as ts.NoSubstitutionTemplateLiteral).text;
      if (!LATIN.test(lit)) { ts.forEachChild(node, visit); return; }

      // 判断上下文
      let ctx = "其他";
      const p = node.parent;
      if (ts.isPropertyAssignment(p)) {
        const nm = p.name.getText(sf).replace(/['"]/g, "");
        if (TEXT_PROP_KEYS.has(nm)) ctx = `属性(${nm})`;
        else { ts.forEachChild(node, visit); return; }
      } else if (ts.isJsxAttribute(p)) {
        const nm = p.name.getText(sf);
        if (TEXT_ATTRS.has(nm)) ctx = `JSX属性(${nm})`;
        else { ts.forEachChild(node, visit); return; }
      } else if (ts.isJsxExpression(p)) {
        ctx = "JSX子节点";
      } else {
        ts.forEachChild(node, visit); return;
      }

      const line = sf.getLineAndCharacterOfPosition(node.getStart(sf)).line + 1;
      hits.push({ file: rel, line, ctx, text: text.slice(0, 110).replace(/\n/g, " ") });
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
}

console.log("=".repeat(84));
console.log("模板字符串文案扫描（字典替换无法覆盖，需手工改写）");
console.log("=".repeat(84));
console.log(`命中总数: ${hits.length}`);
const byFile = new Map<string, number>();
for (const h of hits) byFile.set(h.file, (byFile.get(h.file) ?? 0) + 1);
console.log("\n按文件：");
[...byFile.entries()].sort((a, b) => b[1] - a[1]).forEach(([f, c]) => console.log(`  ${String(c).padStart(3)}  ${f}`));
console.log("\n明细：");
hits.forEach((h) => console.log(`  ${h.file}:${h.line}  [${h.ctx}]  ${h.text}`));
