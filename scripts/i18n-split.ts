/**
 * 把 i18n-todo.json 切成 N 份，供并行翻译。
 * 每条带唯一 id，便于合并与校验。
 *
 * 注意：本脚本**只清空 `i18n-work/todo/`**，不动同级其它目录。
 * 早先的写法是 `fs.rmSync("i18n-work", { recursive: true })` ——
 * 那会连同**已入库**的译文分片（`zh/`）、字典与 `original-en/` 英文原文树一起删掉，
 * 重跑一次清点就等于把全部译文丢了。
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const CHUNK_SIZE = 140;

type Todo = { en: string; count: number; files: string[]; kinds: string[] };
const todo: Todo[] = JSON.parse(fs.readFileSync(path.join(ROOT, "i18n-todo.json"), "utf8"));

const outDir = path.join(ROOT, "i18n-work", "todo");
fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

const chunks: { id: string; en: string; count: number; where: string }[][] = [];
for (let i = 0; i < todo.length; i += CHUNK_SIZE) {
  chunks.push(
    todo.slice(i, i + CHUNK_SIZE).map((t, j) => ({
      id: `s${String(i + j).padStart(4, "0")}`,
      en: t.en,
      count: t.count,
      where: t.files.slice(0, 2).join(", "),
    })),
  );
}

chunks.forEach((c, i) => {
  fs.writeFileSync(
    path.join(outDir, `chunk-${String(i).padStart(2, "0")}.json`),
    JSON.stringify(c, null, 2),
  );
});

console.log(`待译 ${todo.length} 条 -> ${chunks.length} 个分片（每片 <= ${CHUNK_SIZE}）`);
console.log(`输出目录: i18n-work/todo/`);
chunks.forEach((c, i) => {
  const chars = c.reduce((a, x) => a + x.en.length, 0);
  console.log(`  chunk-${String(i).padStart(2, "0")}.json  ${String(c.length).padStart(4)} 条  ${chars} 字符`);
});
