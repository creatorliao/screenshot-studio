/**
 * 生成「汉化前英文原文」快照：i18n-work/original-en/
 *
 * 这是全流水线**唯一**一棵原文树，只读。`i18n-audit` / `i18n-delta` /
 * `i18n-props` / `i18n-apply --restore` 全部读它。
 *
 * 用法：
 *   npx tsx scripts/i18n-snapshot.ts          # 只在不存在时生成（安全默认）
 *   npx tsx scripts/i18n-snapshot.ts --force  # 强制用当前源码覆盖（危险）
 *
 * 为什么默认不覆盖：
 *   这棵树的全部价值就是"汉化前"三个字。一旦在汉化**之后**重跑并覆盖，
 *   它就变成了中文副本，所有依赖它的脚本会静默得出错误结论
 *   （这正是旧的 `i18n-work/backup/` 发生过的事）。所以覆盖必须显式 `--force`。
 */
import fs from "node:fs";
import path from "node:path";
import { ORIGINAL_EN_DIR, ORIGINAL_EN_REL } from "./lib/i18n-paths";

const ROOT = process.cwd();
const DIRS = ["app", "components", "lib", "hooks"];
const FORCE = process.argv.includes("--force");

function walk(dir: string, out: string[] = []): string[] {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name !== "node_modules" && e.name !== ".next") walk(p, out);
    } else if (/\.tsx?$/.test(e.name) && !/\.d\.ts$/.test(e.name)) {
      out.push(p);
    }
  }
  return out;
}

const exists = fs.existsSync(ORIGINAL_EN_DIR) && fs.readdirSync(ORIGINAL_EN_DIR).length > 0;

if (exists && !FORCE) {
  const n = DIRS.flatMap((d) => walk(path.join(ORIGINAL_EN_DIR, d))).length;
  console.log(`✓ ${ORIGINAL_EN_REL}/ 已存在（${n} 个文件），未改动。`);
  console.log("  这棵树是「汉化前英文原文」，只读；要重建请显式加 --force。");
  process.exit(0);
}

if (exists && FORCE) {
  // 保护：当前源码若已大面积汉化，覆盖等于毁掉原文树。要求二次确认。
  const probe = DIRS.flatMap((d) => walk(path.join(ROOT, d)))
    .slice(0, 400)
    .map((f) => fs.readFileSync(f, "utf8"))
    .join("\n");
  const cjk = (probe.match(/[\u4e00-\u9fff]/g) ?? []).length;
  if (cjk > 200) {
    console.error(`✗ 拒绝执行：当前源码里已检出 ${cjk} 个中文字符（抽样 400 个文件）。`);
    console.error("  用它覆盖原文树会毁掉「汉化前英文」这个唯一语义。");
    console.error("  真要重建，请先 git checkout 回到汉化前的提交，再跑本脚本。");
    process.exit(1);
  }
}

const files = DIRS.flatMap((d) => walk(path.join(ROOT, d)));
fs.rmSync(ORIGINAL_EN_DIR, { recursive: true, force: true });
for (const f of files) {
  const rel = path.relative(ROOT, f);
  const dest = path.join(ORIGINAL_EN_DIR, rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(f, dest);
}
console.log(`✅ 已生成 ${ORIGINAL_EN_REL}/：${files.length} 个文件（英文原文快照，只读）`);
