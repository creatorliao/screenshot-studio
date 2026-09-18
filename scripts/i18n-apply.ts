/**
 * 汉化 codemod：按字典把源码里的英文文案就地替换为简体中文。
 *
 * 用法：
 *   npx tsx scripts/i18n-apply.ts            # dry-run，只报告与抽样
 *   npx tsx scripts/i18n-apply.ts --write    # 实际写盘
 *   npx tsx scripts/i18n-apply.ts --restore  # 从英文原文快照整体还原为英文
 *
 * 设计要点：
 *   - 只改字符串内容，不改任何代码结构（无新 import、无 hook、无类型变更）
 *   - 未命中字典的文案保持英文（自然降级，不会渲染成 key）
 *   - 从后往前替换，保证偏移量有效
 *   - JSX 文本若译文含 { } < > 会被跳过并告警（会破坏 JSX 语法）
 *   - **不再写目录备份**：写盘前只校验英文原文快照存在。
 *     "撤销上一次替换"交给 git（`git checkout`），见 scripts/lib/i18n-paths.ts
 */
import ts from "typescript";
import fs from "node:fs";
import path from "node:path";
import { collectEdits, encodeLiteral, isExcluded, type Edit } from "./lib/i18n-detect";
import { ORIGINAL_EN_DIR, ORIGINAL_EN_REL } from "./lib/i18n-paths";

const ROOT = process.cwd();
const DIRS = ["app", "components", "lib", "hooks"];
const WRITE = process.argv.includes("--write");
const RESTORE = process.argv.includes("--restore");

// ---------- 0. 还原模式：从英文原文快照覆盖回源码 ----------
// 语义是「整体回到汉化前」，不是「撤销上一次替换」。
// 想撤销单次替换请用 git（`git checkout -- <file>` / `git revert`）。
if (RESTORE) {
  const bakRoot = ORIGINAL_EN_DIR;
  if (!fs.existsSync(bakRoot)) {
    console.error(`✗ 没有 ${ORIGINAL_EN_REL}/，无法还原`);
    console.error("  先跑 npx tsx scripts/i18n-snapshot.ts 生成英文原文快照。");
    process.exit(1);
  }
  let n = 0;
  const walkBak = (dir: string) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) { walkBak(p); continue; }
      const target = path.join(ROOT, path.relative(bakRoot, p));
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.copyFileSync(p, target);
      n++;
    }
  };
  walkBak(bakRoot);
  console.log(`✅ 已从 ${ORIGINAL_EN_REL}/ 还原 ${n} 个文件（界面回到英文）`);
  process.exit(0);
}

// ---------- 1. 合并译文字典 ----------
const zhDir = path.join(ROOT, "i18n-work", "zh");
const dictFiles = fs.existsSync(zhDir)
  ? fs.readdirSync(zhDir).filter((f) => /^chunk-\d+\.json$/.test(f))
  : [];
if (dictFiles.length === 0) {
  console.error("✗ 没有找到任何译文分片（i18n-work/zh/chunk-*.json）");
  process.exit(1);
}

const idToZh = new Map<string, string>();
for (const f of dictFiles) {
  const raw = fs.readFileSync(path.join(zhDir, f), "utf8");
  let obj: Record<string, string>;
  try {
    obj = JSON.parse(raw);
  } catch (e) {
    console.error(`✗ ${f} 不是合法 JSON: ${(e as Error).message}`);
    process.exit(1);
  }
  for (const [k, v] of Object.entries(obj)) {
    if (typeof v === "string" && v.trim()) idToZh.set(k, v);
  }
}

// ---------- 2. id -> en（来自分片文件，i18n-todo.json 本身不含 id）----------
const todoDir = path.join(ROOT, "i18n-work", "todo");
const todoFiles = fs.existsSync(todoDir)
  ? fs.readdirSync(todoDir).filter((f) => /^chunk-\d+\.json$/.test(f))
  : [];
if (todoFiles.length === 0) {
  console.error("✗ 找不到 i18n-work/todo/chunk-*.json（待译分片）。先跑 scripts/i18n-split.ts");
  process.exit(1);
}

const idToEn = new Map<string, string>();
for (const f of todoFiles) {
  const arr: { id: string; en: string }[] = JSON.parse(fs.readFileSync(path.join(todoDir, f), "utf8"));
  for (const t of arr) idToEn.set(t.id, t.en);
}
if (idToEn.size === 0) {
  console.error("✗ id→en 映射为空，拒绝继续（否则会静默替换 0 处）");
  process.exit(1);
}

const enToZh = new Map<string, string>();
let missingIds = 0;
for (const [id, en] of idToEn) {
  const zh = idToZh.get(id);
  if (zh == null) { missingIds++; continue; }
  enToZh.set(en, zh);
}

// 分片里出现但清单里没有的 id（异常）
const unknownIds = [...idToZh.keys()].filter((id) => !idToEn.has(id));

// 增量字典：键为英文原文，补上收紧类名判定后新暴露的文案。
// 支持多个分片（zh-extra.json / zh-extra-a.json / ...）
const workDir = path.join(ROOT, "i18n-work");
let extraAdded = 0;
if (fs.existsSync(workDir)) {
  for (const f of fs.readdirSync(workDir).filter((x) => /^zh-extra.*\.json$/.test(x))) {
    const extra = JSON.parse(fs.readFileSync(path.join(workDir, f), "utf8")) as Record<string, string>;
    for (const [en, zh] of Object.entries(extra)) {
      if (typeof zh === "string" && zh && !enToZh.has(en)) { enToZh.set(en, zh); extraAdded++; }
    }
  }
}

console.log("=".repeat(72));
console.log(`译文分片            : ${dictFiles.length} 个，共 ${idToZh.size} 条`);
console.log(`待译分片            : ${todoFiles.length} 个，共 ${idToEn.size} 条`);
console.log(`已获得译文          : ${enToZh.size} 条`);
if (extraAdded) console.log(`  其中增量字典      : ${extraAdded} 条`);
console.log(`缺译（保持英文）    : ${missingIds} 条`);
if (unknownIds.length) console.log(`⚠ 清单外的多余 id   : ${unknownIds.length} 条`);
console.log("=".repeat(72));

// ---------- 3. 遍历源码 ----------
function walk(dir: string, out: string[] = []): string[] {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name !== "node_modules" && e.name !== ".next") walk(p, out);
    } else if (/\.tsx?$/.test(e.name) && !/\.d\.ts$/.test(e.name)) out.push(p);
  }
  return out;
}

const files = DIRS.flatMap((d) => walk(path.join(ROOT, d)));

// 写盘前必须确认「汉化前英文原文」这棵树在 —— 它是全流水线唯一的原文来源，
// 也是 --restore 的还原源。缺了就停，不要靠"反正有 git"糊过去。
if (WRITE && !fs.existsSync(ORIGINAL_EN_DIR)) {
  console.error(`✗ 写盘前检查失败：找不到 ${ORIGINAL_EN_REL}/`);
  console.error("  先跑 npx tsx scripts/i18n-snapshot.ts 生成英文原文快照，再 --write。");
  process.exit(1);
}

let filesChanged = 0;
let totalReplaced = 0;
let totalSites = 0;
let skippedJsxSpecial = 0;
const warnings: string[] = [];
const samples: string[] = [];
const changedFiles: { file: string; n: number }[] = [];

for (const file of files) {
  const rel = path.relative(ROOT, file).replace(/\\/g, "/");
  if (isExcluded(rel)) continue;

  const src = fs.readFileSync(file, "utf8");
  const edits = collectEdits(file, src);
  totalSites += edits.length;

  // 只保留命中字典的
  type Applied = Edit & { zh: string; replacement: string };
  const applied: Applied[] = [];
  for (const e of edits) {
    const zh = enToZh.get(e.key);
    if (zh == null || zh === e.key) continue;

    if (e.kind === "jsxText" && /[{}$<>]/.test(zh)) {
      skippedJsxSpecial++;
      warnings.push(`${rel}:${e.key.slice(0, 40)} -> 译文含 JSX 特殊字符，跳过`);
      continue;
    }
    const replacement =
      e.quote === null
        ? (e.lead ?? "") + zh + (e.trail ?? "")
        : encodeLiteral(zh, e.quote, e.kind);
    applied.push({ ...e, zh, replacement });
  }
  if (applied.length === 0) continue;

  // 重叠检查
  const sorted = [...applied].sort((a, b) => a.start - b.start);
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i].start < sorted[i - 1].end) {
      warnings.push(`${rel}: 检出重叠替换区间，已跳过该文件`);
      continue;
    }
  }

  // 从后往前替换
  let out = src;
  for (const a of [...applied].sort((x, y) => y.start - x.start)) {
    out = out.slice(0, a.start) + a.replacement + out.slice(a.end);
  }

  if (out !== src) {
    filesChanged++;
    totalReplaced += applied.length;
    changedFiles.push({ file: rel, n: applied.length });
    for (const a of applied.slice(0, 2)) {
      if (samples.length < 25) samples.push(`${rel}:${a.key.slice(0, 45)} → ${a.zh.slice(0, 45)}`);
    }
    if (WRITE) {
      fs.writeFileSync(file, out);
    }
  }
}

console.log(`扫描文件            : ${files.length}`);
console.log(`文案位点总数        : ${totalSites}`);
console.log(`命中字典并替换      : ${totalReplaced} 处`);
console.log(`改动文件            : ${filesChanged} 个`);
console.log(`剩余保持英文        : ${totalSites - totalReplaced} 处`);
if (skippedJsxSpecial) console.log(`⚠ JSX 特殊字符跳过  : ${skippedJsxSpecial} 处`);

console.log("\n---- 替换抽样 ----");
samples.forEach((s) => console.log(`   · ${s}`));

if (warnings.length) {
  console.log(`\n---- 告警 (${warnings.length}) ----`);
  warnings.slice(0, 20).forEach((w) => console.log(`   ! ${w}`));
}

console.log("\n---- 改动最多的 15 个文件 ----");
changedFiles.sort((a, b) => b.n - a.n).slice(0, 15)
  .forEach((c) => console.log(`   ${String(c.n).padStart(4)}  ${c.file}`));

// 保存英文原文快照（便于回退与日后重做多语言）
if (WRITE) {
  fs.writeFileSync(
    path.join(ROOT, "i18n-work", "en-zh-snapshot.json"),
    JSON.stringify(Object.fromEntries(enToZh), null, 2),
  );
  console.log(`\n✅ 已写盘。英文原文快照 i18n-work/en-zh-snapshot.json（回退用 git checkout 或 --restore）`);
} else {
  console.log("\n(dry-run，未写盘。加 --write 才会实际替换)");
}
