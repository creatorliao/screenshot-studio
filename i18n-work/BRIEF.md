# 翻译规范：Screenshot Studio UI 英译简中

## 任务

把输入 JSON 数组里每一条的 `en` 字段译成**简体中文**，输出 JSON 对象：`id -> 译文`。

输入形如：

```json
[{"id":"s0000","en":"3D Effects","count":17,"where":"components/editor/..."}]
```

输出形如：

```json
{"s0000":"3D 效果"}
```

## 硬规则

1. **逐条全覆盖**：输入有多少条，输出就有多少条。不得遗漏、不得合并、不得新增。
2. **只输出 JSON**，不要解释、不要 markdown 代码围栏之外的文字。
3. **保留占位符原样**：`{name}`、`{count}`、`{year}` 等花括号变量必须原样保留。
4. **保留 HTML/JSX 片段原样**：若译文里出现 `<link>...</link>`、`<b>...</b>` 这类标签，标签本身不翻译，只译标签之间的文字。
5. **不翻译代码/标识**：文件名、CSS 类、函数名、URL、`llms.txt`、`PNG/JPG/WebP/MP4/WebM/GIF/SVG`、`API`、`HTML`、`CSS`、`URL`、`3D`、`UI`、`UX`、`WASM`、`FFmpeg` 保持原样。
6. **保留专有名词英文**：Screenshot Studio、Safari、Chrome、Arc、macOS、Windows、GitHub、Twitter / X、Figma、Polaroid、Pika Style、Shots.so、CleanShot X、Screely、Moqups、Uizard、PostHog、AdSense、GDPR、OpenAPI、Prisma、Next.js、React。
7. **保留标点与语气**：原文若是句子片段（如以 `. ` 开头、无首字母大写），译文也要保持"片段"形态，不要补成完整句子。
8. **数字与单位**：`100+`、`20+`、`16:9`、`4K`、`60fps`、`1920x1080` 原样保留数字。
9. **不要加句号**：原文没有句末标点的短标签（按钮、菜单项），译文也不要加 `。`。原文是完整句子且带 `.` 的，译文用 `。` 收尾。

## 风格

- 面向设计师 / 开发者 / 创作者的工具类产品文案。
- **按钮、菜单、标签**：2–6 字，动宾结构，如 `Export` → `导出`、`Reset Defaults` → `重置默认`、`Add Slide` → `添加幻灯片`。
- **正文**：自然、专业、不堆砌营销辞藻，避免"赋能""打造""助力"这类空词。
- **术语统一**（务必用右列）：
  | 英文 | 中文 |
  |------|------|
  | Screenshot / Screenshots | 截图 |
  | Editor | 编辑器 |
  | Background | 背景 |
  | Gradient | 渐变 |
  | Shadow | 阴影 |
  | Border Radius / Corner Radius | 圆角 |
  | Padding | 内边距 |
  | Frame / Mockup | 边框 / 模型（浏览器模型、设备模型） |
  | Browser Mockup | 浏览器模型 |
  | Device Frame | 设备边框 |
  | Animation / Animate | 动画 |
  | Timeline | 时间轴 |
  | Preset | 预设 |
  | Canvas | 画布 |
  | Layer | 图层 |
  | Overlay | 叠加层 |
  | Text Overlay | 文字叠加 |
  | Perspective | 透视 |
  | Blur | 模糊 |
  | Opacity | 不透明度 |
  | Watermark | 水印 |
  | Export | 导出 |
  | Import | 导入 |
  | Upload | 上传 |
  | Download | 下载 |
  | Sign up / Signup | 注册 |
  | Free | 免费 |
  | Open Source | 开源 |
  | Template | 模板 |
  | Aspect Ratio | 宽高比 |
  | Crop | 裁剪 |
  | Resize | 调整尺寸 |
  | Rotate | 旋转 |
  | Compress | 压缩 |
  | Convert | 转换 |
  | Code Snippet | 代码片段 |
  | Tweet | 推文 |

## 上下文提示

- `where` 字段给出该文案出现的文件路径，可据此判断语境。
  例如 `components/editor/**` 是编辑器 UI，`app/[locale]/features/**` 是介绍页，`lib/seo/**` 是营销文案。
- 同一个英文词在不同文件可能需要不同译法，但**本次按全局统一处理**：优先选最通用的译法。
- 若某条本身就是中文或无法翻译（如纯符号、纯数字），原样返回。
