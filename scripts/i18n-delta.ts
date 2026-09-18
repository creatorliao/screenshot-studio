/**
 * 漏网文案增量清点
 *
 * 收紧 looksLikeClass 后，会有一批此前被误判为 CSS 类名的真实文案重新暴露出来。
 * 分片 id 是按位置分配的，重跑清点会导致全部译文错位 —— 所以不能重跑清点，
 * 改为：只算出「当前字典覆盖不到的英文」，作为增量清单，用英文原文做键补译。
 *
 * 输出：i18n-work/todo-extra.json
 */
import ts from "typescript";
import fs from "node:fs";
import path from "node:path";
import { collectEdits, isExcluded } from "./lib/i18n-detect";
import { ORIGINAL_EN_DIR, ORIGINAL_EN_REL } from "./lib/i18n-paths";

const ROOT = process.cwd();
// 必须对「汉化前」的英文原文做增量分析：
// 对本已汉化的源码扫描只会把中文当成"新文案"，结论无效。
const SRC_ROOT = ORIGINAL_EN_DIR;
const DIRS = ["app", "components", "lib", "hooks"];

// 现有字典：id -> zh，配合 todo 分片得到 en -> zh
const zhDir = path.join(ROOT, "i18n-work", "zh");
const todoDir = path.join(ROOT, "i18n-work", "todo");
const idToZh = new Map<string, string>();
for (const f of fs.readdirSync(zhDir).filter((x) => /^chunk-\d+\.json$/.test(x))) {
  for (const [k, v] of Object.entries(JSON.parse(fs.readFileSync(path.join(zhDir, f), "utf8")))) {
    if (typeof v === "string") idToZh.set(k, v as string);
  }
}
const known = new Set<string>();
for (const f of fs.readdirSync(todoDir).filter((x) => /^chunk-\d+\.json$/.test(x))) {
  const arr: { id: string; en: string }[] = JSON.parse(fs.readFileSync(path.join(todoDir, f), "utf8"));
  for (const t of arr) {
    const zh = idToZh.get(t.id);
    if (zh == null) continue;
    if (zh === t.en) continue;
    known.add(t.en);
  }
}
// 手工增量字典（可能切成多片：zh-extra.json / zh-extra-a.json / ...）
const workDir = path.join(ROOT, "i18n-work");
if (fs.existsSync(workDir)) {
  for (const f of fs.readdirSync(workDir).filter((x) => /^zh-extra.*\.json$/.test(x))) {
    for (const [k] of Object.entries(JSON.parse(fs.readFileSync(path.join(workDir, f), "utf8")))) known.add(k);
  }
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

const files = DIRS.flatMap((d) => walk(path.join(SRC_ROOT, d)));
const agg = new Map<string, { en: string; count: number; files: Set<string>; kinds: Set<string> }>();
let totalSites = 0;

if (!fs.existsSync(SRC_ROOT)) {
  console.error(`✗ 找不到 ${ORIGINAL_EN_REL}/，无法做增量分析`);
  process.exit(1);
}

for (const file of files) {
  const rel = path.relative(SRC_ROOT, file).replace(/\\/g, "/");
  if (isExcluded(rel)) continue;
  const src = fs.readFileSync(file, "utf8");
  for (const e of collectEdits(file, src)) {
    totalSites++;
    if (known.has(e.key)) continue;
    let cur = agg.get(e.key);
    if (!cur) { cur = { en: e.key, count: 0, files: new Set(), kinds: new Set() }; agg.set(e.key, cur); }
    cur.count++;
    cur.files.add(rel);
    cur.kinds.add(e.kind);
  }
}

const extra = [...agg.values()]
  .map((e) => ({ en: e.en, count: e.count, where: [...e.files].slice(0, 3).join(", "), kinds: [...e.kinds] }))
  .sort((a, b) => b.count - a.count || a.en.localeCompare(b.en));

fs.writeFileSync(path.join(ROOT, "i18n-work", "todo-extra.json"), JSON.stringify(extra, null, 2));

console.log("=".repeat(72));
console.log("漏网文案增量清点");
console.log("=".repeat(72));
console.log(`编辑位点总数        : ${totalSites}`);
console.log(`字典已覆盖          : ${known.size} 条（去重）`);
console.log(`新暴露的未覆盖文案  : ${extra.length} 条（去重）`);
console.log(`新增位点            : ${extra.reduce((a, x) => a + x.count, 0)} 处`);
console.log(`新增字符            : ${extra.reduce((a, x) => a + x.en.length, 0)}`);
console.log("\n---- 前 40 条 ----");
extra.slice(0, 40).forEach((e) => console.log(`  ${String(e.count).padStart(3)}x  ${e.en.slice(0, 90)}`));
