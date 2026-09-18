/**
 * 汉化工作目录的**唯一**路径定义。
 *
 * 背景（为什么要有这个文件）：
 * 这套流水线一度存在**两棵整树副本**，而且角色互相冲突 ——
 *
 *   - `i18n-work/backup/`：`i18n-apply.ts --write` 在**每次写盘前**把被改文件
 *     覆盖进去。它是"撤销上一次替换"的缓冲，**会随着第二次 apply 变成中文**
 *     （实测：该树含 745 个中文字符）。
 *   - `i18n-work/backup-original-en/`：汉化前的英文原文（实测 0 个中文字符），
 *     但**没有任何脚本引用它**，是死目录。
 *
 * 而 `i18n-audit.ts` / `i18n-delta.ts` / `i18n-props.ts` 需要的是**永不改变的
 * 英文原文**，三个脚本却都把 `SRC_ROOT` 指向了会变的 `backup/`。
 * `i18n-delta.ts` 的注释白纸黑字写着"必须对「汉化前」的英文原文做增量分析"，
 * 与它实际读的目录不一致 —— 这是真缺陷，不是命名问题。
 *
 * 现在收敛为**一棵**：`i18n-work/original-en/`
 *   - 语义：汉化前的英文原文快照，**只读**。
 *   - 唯一写入者：`scripts/i18n-snapshot.ts`（默认只在不存在时生成）。
 *   - "撤销上一次替换"不再靠目录副本，**交给 git**（`git checkout`）。
 */
import path from "node:path";

/** 相对仓库根的路径，用于提示信息 */
export const ORIGINAL_EN_REL = "i18n-work/original-en";

/** 绝对路径。与各脚本的 `const ROOT = process.cwd()` 保持一致 */
export const ORIGINAL_EN_DIR = path.join(process.cwd(), "i18n-work", "original-en");
