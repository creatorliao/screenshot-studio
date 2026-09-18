# 翻译规范补充：对比表格与结构化文案

本批是 `lib/seo/comparisons.ts` 等**对比页表格**里的短句，以及 FAQ、开发者页的说明文字。

## 额外规则

1. **对比表格单元格**（`studio` / `competitor` 字段）多为能力描述短语，译成简洁名词或短句：
   | 英文 | 中文 |
   |------|------|
   | Not available | 不支持 |
   | Limited | 有限 |
   | Limited free set | 免费版有限 |
   | Yes | 支持 |
   | No | 不支持 |
   | Free forever | 永久免费 |
   | Free | 免费 |
   | Freemium ($5+/mo) | 免费增值（$5+/月） |
   | ~$63 one-time | 约 $63 买断 |
   | $29.99+ one-time | $29.99 起买断 |
   | Full editor | 完整编辑器 |
   | Any browser | 任意浏览器 |
   | Any browser (web app) | 任意浏览器（网页应用） |
   | None required | 无需安装 |
   | Built-in capture | 内置截图 |
   | Upload or paste | 上传或粘贴 |
   | Solid colors only | 仅纯色 |

2. **`Yes` / `No` 这类**：作为表格能力勾选时应译「支持」/「不支持」；若确实是是非问答的答案（如 FAQ「Do I need an account?」的答案），译「是」/「否」。
   拿不准时优先按「表格能力」处理为「支持」/「不支持」。

3. **价格与专有名词**：`$`、数字、`Apache 2.0`、`MIT`、`iOS`、`Android` 保持原样；货币与许可名称不译。

4. **产品名保持英文**：Screenshot Studio、Safari、Chrome、Arc、Polaroid、macOS、Windows、Ray.so、Carbon、Shots.so、CleanShot X、Pika、Figma。

5. **技术名词**：`MP4, WebM, GIF`、`PNG, JPEG, WebP up to 5x` 这类格式枚举保持格式名英文，只译修饰语，
   如 `PNG, JPEG, WebP up to 5x` → `PNG、JPEG、WebP，最高 5x`。

6. **开发者文档短语**：`POST /api/screenshot`、`Retry-After`、`X-RateLimit-*`、`429`、`HTTP` 保持原样。

7. 其余遵循 `BRIEF.md`（术语表、片段形态、不加多余句号）。
