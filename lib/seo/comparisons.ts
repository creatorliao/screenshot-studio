export interface ComparisonData {
  slug: string;
  competitorName: string;
  competitorUrl: string;
  tagline: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  competitorPricing: string;
  competitorLimitations: string[];
  studioAdvantages: string[];
  features: {
    name: string;
    studio: string;
    competitor: string;
  }[];
  verdict: string;
  faqs: { q: string; a: string }[];
}

export const comparisons: ComparisonData[] = [
  {
    slug: "pika-style",
    competitorName: "Pika Style",
    competitorUrl: "https://pika.style",
    tagline:
      "Screenshot Studio 免费提供更多背景、3D 效果、动画和视频导出。",
    metaTitle: "Screenshot Studio 对比 Pika Style - 免费替代方案（2026）",
    metaDescription:
      "对比 Screenshot Studio 与 Pika Style。两者都能美化截图，但 Screenshot Studio 免费提供 3D 效果、动画、视频导出和 100+ 背景。无需注册。",
    keywords: [
      "pika style alternative",
      "pika style vs screenshot studio",
      "screenshot studio vs pika",
      "pika style free alternative",
      "pika screenshot editor alternative",
      "better than pika style",
      "pika style competitor",
    ],
    competitorPricing: "免费版有限制，付费方案 $5/月起",
    competitorLimitations: [
      "免费背景有限",
      "无动画，无视频导出",
      "无 3D 透视效果",
      "免费版导出带水印",
      "部分功能需要账号",
    ],
    studioAdvantages: [
      "100+ 背景免费提供",
      "完整动画时间轴，20+ 预设",
      "3D 透视变换",
      "视频导出（MP4、WebM、GIF）",
      "永不添加水印",
      "无需注册",
      "开源",
    ],
    features: [
      { name: "价格", studio: "永久免费", competitor: "免费增值（$5+/月）" },
      { name: "背景", studio: "100+ 渐变、纯色、图片", competitor: "免费版有限" },
      { name: "设备边框", studio: "Safari、Chrome（浅色/深色）、Arc、Polaroid", competitor: "macOS、Windows" },
      { name: "3D 效果", studio: "完整透视变换", competitor: "不支持" },
      { name: "动画", studio: "20+ 预设、关键帧编辑器", competitor: "不支持" },
      { name: "视频导出", studio: "MP4、WebM、GIF", competitor: "不支持" },
      { name: "文字叠加", studio: "25+ 字体、阴影、图层", competitor: "基础文字" },
      { name: "图片叠加层", studio: "箭头、贴纸、图标", competitor: "有限" },
      { name: "导出分辨率", studio: "最高 5x 缩放", competitor: "标准" },
      { name: "水印", studio: "从不添加", competitor: "免费版有" },
      { name: "需要注册", studio: "不支持", competitor: "部分功能需要" },
      { name: "开源", studio: "支持（Apache 2.0）", competitor: "不支持" },
    ],
    verdict:
      "如果你需要动画、3D 效果和视频导出，Screenshot Studio 是更强的选择。Pika Style 更简单，但对 Screenshot Studio 免费提供的功能收费。",
    faqs: [
      {
        q: "Screenshot Studio 是 Pika Style 的理想替代品吗？",
        a: "支持。Screenshot Studio 覆盖 Pika Style 的全部核心功能（背景、阴影、设备边框），并增加 3D 透视变换、带 20+ 预设的动画时间轴，以及 MP4、WebM 或 GIF 视频导出。所有功能免费，无需注册。",
      },
      {
        q: "Pika Style 提供动画或视频导出吗？",
        a: "没有。Pika Style 侧重静态截图美化。Screenshot Studio 提供带关键帧编辑的完整动画时间轴、20+ 动态预设，并可导出为 MP4、WebM 和 GIF 格式。",
      },
      {
        q: "哪个工具的背景更多？",
        a: "Screenshot Studio 免费提供 100+ 渐变、纯色、网格和自定义背景。Pika Style 提供的免费背景较少，更多背景需要付费方案。",
      },
    ],
  },
  {
    slug: "shots-so",
    competitorName: "Shots.so",
    competitorUrl: "https://shots.so",
    tagline:
      "免费获得 Shots.so 的全部功能，外加动画、3D 效果和视频导出。",
    metaTitle: "Screenshot Studio 对比 Shots.so - 免费替代方案（2026）",
    metaDescription:
      "对比 Screenshot Studio 与 Shots.so。Screenshot Studio 额外提供 3D 效果、动画时间轴、视频导出、文字叠加和 100+ 背景。免费，无需注册。",
    keywords: [
      "shots.so alternative",
      "shots so alternative free",
      "screenshot studio vs shots so",
      "shots.so vs screenshot studio",
      "better than shots.so",
      "shots.so free alternative",
      "shots so competitor",
    ],
    competitorPricing: "免费版有限制，Pro 版 $5/月起",
    competitorLimitations: [
      "免费版自定义有限",
      "无动画，无视频导出",
      "无 3D 透视效果",
      "设备边框选项有限",
      "部分功能需付费",
    ],
    studioAdvantages: [
      "全部功能免费，无分级",
      "完整动画时间轴，20+ 预设",
      "3D 透视与旋转",
      "视频导出为 MP4、WebM、GIF",
      "文字与图片叠加图层",
      "无需账号",
      "开源代码",
    ],
    features: [
      { name: "价格", studio: "永久免费", competitor: "免费增值（$5+/月）" },
      { name: "背景", studio: "100+ 选项", competitor: "精选集合，Pro 版更多" },
      { name: "设备边框", studio: "Safari、Chrome（浅色/深色）、Arc、Polaroid", competitor: "macOS、浏览器" },
      { name: "3D 效果", studio: "透视倾斜与旋转", competitor: "不支持" },
      { name: "动画", studio: "20+ 预设、关键帧", competitor: "不支持" },
      { name: "视频导出", studio: "MP4、WebM、GIF", competitor: "不支持" },
      { name: "文字叠加", studio: "25+ 字体、完整样式", competitor: "有限" },
      { name: "代码片段", studio: "语法高亮、主题", competitor: "不支持" },
      { name: "导出分辨率", studio: "最高 5x 缩放", competitor: "最高 2x" },
      { name: "需要注册", studio: "不支持", competitor: "仅 Pro 功能需要" },
      { name: "开源", studio: "支持（Apache 2.0）", competitor: "不支持" },
    ],
    verdict:
      "Shots.so 在基础截图美化上打磨得很精致。Screenshot Studio 达到同等品质，并免费增加动画、3D 效果、视频导出和代码片段支持。",
    faqs: [
      {
        q: "Screenshot Studio 比 Shots.so 更好吗？",
        a: "Screenshot Studio 具备 Shots.so 的全部能力，并额外提供：3D 透视效果、带 20+ 预设的完整动画时间轴、视频导出（MP4/WebM/GIF）、代码片段美化，以及文字/图片叠加。全部免费，无需注册。",
      },
      {
        q: "Shots.so 有动画功能吗？",
        a: "没有。Shots.so 是静态截图编辑器。Screenshot Studio 提供带关键帧编辑的完整动画时间轴，以及缩放、平移、Ken Burns、淡入淡出等 20+ 动态预设。",
      },
      {
        q: "我能从 Shots.so 切换到 Screenshot Studio 吗？",
        a: "是的，切换是即时的。Screenshot Studio 无需账号或安装。打开编辑器，把截图拖进来，立刻就能用全部功能开始编辑。",
      },
    ],
  },
  {
    slug: "snagit",
    competitorName: "Snagit",
    competitorUrl: "https://www.techsmith.com/snagit",
    tagline:
      "Snagit 的免费浏览器替代方案，用于美化与分享截图。",
    metaTitle: "Screenshot Studio 对比 Snagit - 免费浏览器替代方案（2026）",
    metaDescription:
      "对比 Screenshot Studio 与 Snagit。Screenshot Studio 免费，在浏览器中运行，支持渐变背景、3D 效果、动画和视频导出。无需下载。",
    keywords: [
      "snagit alternative free",
      "snagit alternative",
      "screenshot studio vs snagit",
      "free snagit alternative",
      "snagit free alternative online",
      "browser based snagit alternative",
      "snagit competitor free",
    ],
    competitorPricing: "一次性购买约 $63",
    competitorLimitations: [
      "需要安装桌面端",
      "付费软件（无免费版）",
      "仅 Windows/Mac",
      "无动画时间轴或动态预设",
      "无渐变背景或模型样式",
      "大型应用（200MB+）",
    ],
    studioAdvantages: [
      "免费，任意浏览器可用",
      "无需安装",
      "100+ 精美背景",
      "3D 透视效果",
      "动画，20+ 预设",
      "视频导出（MP4、WebM、GIF）",
      "支持任意操作系统，包括 Chromebook",
    ],
    features: [
      { name: "价格", studio: "永久免费", competitor: "约 $63 买断" },
      { name: "平台", studio: "任意浏览器（网页应用）", competitor: "Windows、Mac 桌面端" },
      { name: "安装", studio: "无需安装", competitor: "桌面应用下载" },
      { name: "屏幕截图", studio: "通过浏览器或系统工具", competitor: "内置截图" },
      { name: "背景", studio: "100+ 渐变、纯色", competitor: "仅纯色" },
      { name: "设备边框", studio: "Safari、Chrome（浅色/深色）、Arc、Polaroid", competitor: "不支持" },
      { name: "3D 效果", studio: "透视变换", competitor: "不支持" },
      { name: "动画", studio: "20+ 预设、关键帧", competitor: "基础 GIF 录制" },
      { name: "视频导出", studio: "从时间轴导出 MP4、WebM、GIF", competitor: "仅支持屏幕录制" },
      { name: "标注", studio: "文字、箭头、叠加层", competitor: "文字、箭头、形状" },
      { name: "开源", studio: "支持（Apache 2.0）", competitor: "不支持" },
    ],
    verdict:
      "Snagit 擅长为企业团队做屏幕截图与标注。若要用背景、3D 效果和动画来美化截图，Screenshot Studio 是更好的选择，而且完全免费。",
    faqs: [
      {
        q: "Screenshot Studio 能替代 Snagit 吗？",
        a: "就截图美化而言，可以。Screenshot Studio 提供渐变背景、3D 效果、设备边框和动画，这些 Snagit 都不具备。Snagit 有内置屏幕截图，以及滚动截图这类企业级功能，而 Screenshot Studio 则改为通过浏览器/系统截图工具来实现。",
      },
      {
        q: "与 Snagit 的价格相比，Screenshot Studio 真的免费吗？",
        a: "是的。Screenshot Studio 100% 免费，没有隐藏费用、订阅或功能锁。Snagit 一次性购买约 $63，大版本升级还需额外付费。",
      },
      {
        q: "Screenshot Studio 能在 Chromebook 上使用吗？",
        a: "支持。Screenshot Studio 可在任意现代浏览器中运行，包括 Chromebook、Linux 和移动设备上的 Chrome。Snagit 仅能运行在 Windows 和 macOS 桌面端。",
      },
    ],
  },
  {
    slug: "cleanshot-x",
    competitorName: "CleanShot X",
    competitorUrl: "https://cleanshot.com",
    tagline:
      "CleanShot X 的免费跨平台替代方案，直接在浏览器中运行。",
    metaTitle:
      "Screenshot Studio 对比 CleanShot X - 免费跨平台替代方案（2026）",
    metaDescription:
      "对比 Screenshot Studio 与 CleanShot X。Screenshot Studio 免费、跨平台，并提供渐变背景、3D 效果、动画和视频导出。无需 macOS。",
    keywords: [
      "cleanshot x alternative",
      "cleanshot alternative free",
      "cleanshot x free alternative",
      "screenshot studio vs cleanshot",
      "cleanshot x vs screenshot studio",
      "cleanshot alternative windows",
      "cleanshot competitor",
    ],
    competitorPricing: "$29 买断或 $8/月（Cloud）",
    competitorLimitations: [
      "macOS only",
      "付费软件",
      "无网页版编辑器",
      "无动画时间轴",
      "背景样式有限",
      "无 3D 透视变换",
    ],
    studioAdvantages: [
      "免费，任意操作系统可用",
      "浏览器中运行（无需安装）",
      "100+ 渐变背景",
      "3D 透视效果",
      "完整动画时间轴",
      "视频导出（MP4、WebM、GIF）",
      "开源",
    ],
    features: [
      { name: "价格", studio: "永久免费", competitor: "$29 起买断" },
      { name: "平台", studio: "任意浏览器", competitor: "仅 macOS" },
      { name: "屏幕截图", studio: "通过浏览器/系统工具", competitor: "内置（出色）" },
      { name: "背景样式", studio: "100+ 渐变、图片", competitor: "基础纯色背景" },
      { name: "设备边框", studio: "Safari、Chrome（浅色/深色）、Arc、Polaroid", competitor: "不支持" },
      { name: "3D 效果", studio: "完整透视变换", competitor: "不支持" },
      { name: "动画", studio: "20+ 预设、关键帧", competitor: "不支持" },
      { name: "视频导出", studio: "MP4、WebM、GIF", competitor: "屏幕录制" },
      { name: "云存储", studio: "本地（隐私优先）", competitor: "CleanShot Cloud" },
      { name: "标注", studio: "文字、箭头、叠加层", competitor: "文字、箭头、形状、模糊" },
      { name: "开源", studio: "支持（Apache 2.0）", competitor: "不支持" },
    ],
    verdict:
      "CleanShot X 是最好的 macOS 屏幕截图工具。若要用背景、3D 效果和动画美化截图，Screenshot Studio 是更好的选择，并且免费、支持任何平台。",
    faqs: [
      {
        q: "Screenshot Studio 是 CleanShot X 的理想替代品吗？",
        a: "就截图美化而言，可以。Screenshot Studio 提供渐变背景、3D 透视、动画和视频导出，这些 CleanShot X 都不具备。CleanShot X 在自带屏幕截图、滚动截图和 macOS 集成方面更出色。",
      },
      {
        q: "我能在 Windows 或 Linux 上使用 Screenshot Studio 吗？",
        a: "支持。Screenshot Studio 可在 Windows、macOS、Linux 和 Chromebook 上的任意现代浏览器中运行。CleanShot X 仅支持 macOS。",
      },
      {
        q: "CleanShot X 有动画功能吗？",
        a: "没有。CleanShot X 侧重屏幕截图和基础标注，Screenshot Studio 则提供带 20+ 预设的完整动画时间轴，并可将动画导出为 MP4、WebM 或 GIF。",
      },
    ],
  },
  {
    slug: "screely",
    competitorName: "Screely",
    competitorUrl: "https://screely.com",
    tagline:
      "比 Screely 提供更多背景、效果和导出选项，且全部免费。",
    metaTitle: "Screenshot Studio 对比 Screely - 功能更多，依然免费（2026）",
    metaDescription:
      "对比 Screenshot Studio 与 Screely。两者都是免费的截图编辑器，但 Screenshot Studio 额外提供 3D 效果、动画、视频导出、设备边框和 100+ 背景。",
    keywords: [
      "screely alternative",
      "screely vs screenshot studio",
      "screenshot studio vs screely",
      "better than screely",
      "screely alternative with more features",
      "screely competitor",
    ],
    competitorPricing: "免费",
    competitorLimitations: [
      "背景选项有限",
      "无设备边框",
      "无 3D 效果",
      "无动画或视频",
      "无文字叠加",
      "仅有基础阴影选项",
    ],
    studioAdvantages: [
      "100+ 背景（渐变、图片、网格）",
      "设备边框（macOS、Windows、Arc、Polaroid）",
      "3D 透视变换",
      "动画时间轴，20+ 预设",
      "视频导出（MP4、WebM、GIF）",
      "文字与图片叠加图层",
      "高清导出，最高 5x",
    ],
    features: [
      { name: "价格", studio: "永久免费", competitor: "免费" },
      { name: "背景", studio: "100+ 渐变、纯色、图片", competitor: "纯色" },
      { name: "设备边框", studio: "Safari、Chrome（浅色/深色）、Arc、Polaroid", competitor: "仅浏览器边框" },
      { name: "阴影", studio: "模糊、扩散、偏移、颜色", competitor: "基础投影" },
      { name: "3D 效果", studio: "透视倾斜与旋转", competitor: "不支持" },
      { name: "动画", studio: "20+ 预设、关键帧", competitor: "不支持" },
      { name: "视频导出", studio: "MP4、WebM、GIF", competitor: "不支持" },
      { name: "文字叠加", studio: "25+ 字体、阴影", competitor: "不支持" },
      { name: "导出分辨率", studio: "最高 5x 缩放", competitor: "标准" },
      { name: "撤销/重做", studio: "无限历史记录", competitor: "不支持" },
      { name: "开源", studio: "支持（Apache 2.0）", competitor: "不支持" },
    ],
    verdict:
      "Screely 是一款给截图加窗口边框的简单工具。Screenshot Studio 不仅能做 Screely 的全部事情，还多得多：100+ 背景、3D 效果、动画、视频导出和设备边框。",
    faqs: [
      {
        q: "Screenshot Studio 与 Screely 相比如何？",
        a: "Screenshot Studio 覆盖 Screely 的全部功能，并额外提供更多：100+ 渐变背景、多种设备边框（macOS、Windows、Arc）、3D 透视变换、动画时间轴、视频导出、文字叠加，以及最高 5x 的高分辨率导出。",
      },
      {
        q: "对开发者来说，Screely 和 Screenshot Studio 哪个更好？",
        a: "对开发者来说，Screenshot Studio 是更好的选择。它提供代码片段美化、终端窗口边框、用于作品集图片的 3D 透视模型，以及演示视频的动画导出，这些都是 Screely 不具备的。",
      },
    ],
  },
  {
    slug: "carbon",
    competitorName: "Carbon",
    competitorUrl: "https://carbon.now.sh",
    tagline:
      "Screenshot Studio 用更多主题、背景和导出格式把代码变成图片，同时还能处理截图和模型。",
    metaTitle: "Screenshot Studio 对比 Carbon - 免费代码转图片替代方案（2026）",
    metaDescription:
      "对比 Screenshot Studio 与 Carbon 的代码截图功能。Screenshot Studio 额外提供 32 款主题、100+ 背景、浏览器模型、3D 效果和视频导出。免费，无需注册。",
    keywords: [
      "carbon alternative",
      "carbon.now.sh alternative",
      "carbon code screenshot alternative",
      "code to image tool",
      "code snippet screenshot generator",
      "screenshot studio vs carbon",
      "beautiful code screenshots",
    ],
    competitorPricing: "免费",
    competitorLimitations: [
      "仅支持代码，无截图或模型编辑",
      "背景数量少",
      "无 3D 透视或动画",
      "仅支持 PNG 与 SVG 导出",
      "无浏览器或设备边框",
    ],
    studioAdvantages: [
      "32 款语法主题，100+ 背景",
      "代码图片与截图、模型编辑，一个工具搞定",
      "3D 透视变换与动画预设",
      "导出 PNG、JPEG、WebP、MP4、WebM 与 GIF",
      "为代码加上浏览器与设备边框",
      "无需注册、无水印",
      "开源",
    ],
    features: [
      { name: "价格", studio: "永久免费", competitor: "免费" },
      { name: "语法主题", studio: "32", competitor: "约 30" },
      { name: "背景", studio: "100+ 渐变、纯色、图片", competitor: "纯色" },
      { name: "截图编辑", studio: "完整编辑器", competitor: "不支持" },
      { name: "设备边框", studio: "Safari、Chrome、Arc、macOS 窗口", competitor: "仅 macOS 窗口" },
      { name: "3D 效果", studio: "完整透视变换", competitor: "不支持" },
      { name: "动画", studio: "20+ 预设、关键帧编辑器", competitor: "不支持" },
      { name: "视频导出", studio: "MP4、WebM、GIF", competitor: "不支持" },
      { name: "图片导出", studio: "PNG、JPEG、WebP，最高 5x", competitor: "PNG、SVG" },
      { name: "需要注册", studio: "不支持", competitor: "不支持" },
      { name: "开源", studio: "支持（Apache 2.0）", competitor: "支持" },
    ],
    verdict:
      "Carbon 是一款扎实的单一用途代码图片工具。Screenshot Studio 能完成同样的工作，主题和背景更多，还能为结果添加边框、制作动画，并导出为图片或视频。",
    faqs: [
      {
        q: "Screenshot Studio 是 Carbon 的理想替代品吗？",
        a: "支持。Screenshot Studio 生成代码图片时提供 32 种语法主题、行号、窗口边框和 100+ 背景，并补上 Carbon 缺少的功能：浏览器模型、3D 变换、动画和视频导出。免费，无需注册。",
      },
      {
        q: "我能把代码图片导出为视频吗？",
        a: "支持。Screenshot Studio 可借助动画时间轴把代码图片导出为 MP4、WebM 或 GIF，适合演示视频和社交帖子。Carbon 只能导出静态 PNG 和 SVG。",
      },
    ],
  },
  {
    slug: "ray-so",
    competitorName: "Ray.so",
    competitorUrl: "https://ray.so",
    tagline:
      "Screenshot Studio 提供比 Ray.so 更多的主题、背景、边框和导出格式，并支持完整的截图与模型编辑。",
    metaTitle: "Screenshot Studio 对比 Ray.so - 免费代码图片替代方案（2026）",
    metaDescription:
      "对比 Screenshot Studio 与 Ray.so 的代码截图功能。Screenshot Studio 额外提供 32 款主题、100+ 背景、浏览器模型、3D 效果、动画和视频导出。免费，无需注册。",
    keywords: [
      "ray.so alternative",
      "ray so alternative",
      "ray.so vs screenshot studio",
      "code screenshot tool",
      "code to image generator",
      "raycast code image alternative",
      "code snippet to image",
    ],
    competitorPricing: "免费",
    competitorLimitations: [
      "仅支持代码，无截图编辑",
      "固定的渐变主题集",
      "无浏览器或设备边框",
      "无 3D 效果或动画",
      "仅支持静态图片导出",
    ],
    studioAdvantages: [
      "32 款语法主题，100+ 背景",
      "截图与模型编辑集于同一工具",
      "浏览器、设备与 macOS 窗口边框",
      "3D 透视变换与动画",
      "视频导出（MP4、WebM、GIF）",
      "无需注册、无水印",
      "开源",
    ],
    features: [
      { name: "价格", studio: "永久免费", competitor: "免费" },
      { name: "语法主题", studio: "32", competitor: "约 20" },
      { name: "背景", studio: "100+ 渐变、纯色、图片", competitor: "主题渐变" },
      { name: "截图编辑", studio: "完整编辑器", competitor: "不支持" },
      { name: "设备边框", studio: "Safari、Chrome、Arc、macOS 窗口", competitor: "不支持" },
      { name: "3D 效果", studio: "完整透视变换", competitor: "不支持" },
      { name: "动画", studio: "20+ 预设、关键帧编辑器", competitor: "不支持" },
      { name: "视频导出", studio: "MP4、WebM、GIF", competitor: "不支持" },
      { name: "图片导出", studio: "PNG、JPEG、WebP，最高 5x", competitor: "PNG、SVG" },
      { name: "需要注册", studio: "不支持", competitor: "不支持" },
      { name: "开源", studio: "支持（Apache 2.0）", competitor: "支持" },
    ],
    verdict:
      "Ray.so 做快速代码片段时又快又好看。Screenshot Studio 覆盖同样的用途，并进一步提供边框、3D 效果、动画和视频导出，全部免费。",
    faqs: [
      {
        q: "Screenshot Studio 是 Ray.so 的理想替代品吗？",
        a: "支持。Screenshot Studio 同样能生成干净的代码图片，提供 32 种主题和 100+ 背景，并增加浏览器模型、3D 透视、动画和视频导出。免费、开源，无需注册。",
      },
      {
        q: "Ray.so 支持浏览器模型或动画吗？",
        a: "不支持。Ray.so 只能导出静态代码图片。Screenshot Studio 可以把代码放进 Safari、Chrome 或 macOS 边框中，做 3D 倾斜、加动画，并导出为 MP4、WebM 或 GIF。",
      },
    ],
  },
  {
    slug: "xnapper",
    competitorName: "Xnapper",
    competitorUrl: "https://xnapper.com",
    tagline:
      "Screenshot Studio 让你在浏览器中、在任意操作系统上获得 Xnapper 风格的美化截图，支持 3D 效果、动画和视频导出，且完全免费。",
    metaTitle: "Screenshot Studio 对比 Xnapper - 免费在线替代方案（2026）",
    metaDescription:
      "对比 Screenshot Studio 与 Xnapper。Xnapper 是付费的 macOS 应用；Screenshot Studio 在任何浏览器中免费运行，提供 100+ 背景、浏览器模型、3D 效果、动画和视频导出。",
    keywords: [
      "xnapper alternative",
      "xnapper free alternative",
      "xnapper for windows",
      "xnapper vs screenshot studio",
      "screenshot beautifier app alternative",
      "xnapper online alternative",
      "beautiful screenshots mac windows",
    ],
    competitorPricing: "一次性购买 $29.99 起，仅 macOS",
    competitorLimitations: [
      "macOS only, requires install",
      "需要付费许可",
      "无 3D 透视效果",
      "无动画或视频导出",
      "设备边框选项有限",
    ],
    studioAdvantages: [
      "在 macOS、Windows 与 Linux 的任意浏览器中运行",
      "永久免费，无需许可",
      "100+ 背景与浏览器模型",
      "3D 透视变换",
      "动画时间轴与视频导出",
      "无需注册、无水印",
      "开源",
    ],
    features: [
      { name: "价格", studio: "永久免费", competitor: "$29.99 起买断" },
      { name: "平台", studio: "任意浏览器", competitor: "macOS 应用" },
      { name: "背景", studio: "100+ 渐变、纯色、图片", competitor: "渐变和壁纸" },
      { name: "设备边框", studio: "Safari、Chrome、Arc、Polaroid、macOS 窗口", competitor: "macOS 窗口" },
      { name: "屏幕截图", studio: "上传或粘贴", competitor: "内置截图" },
      { name: "3D 效果", studio: "完整透视变换", competitor: "不支持" },
      { name: "动画", studio: "20+ 预设、关键帧编辑器", competitor: "不支持" },
      { name: "视频导出", studio: "MP4、WebM、GIF", competitor: "不支持" },
      { name: "导出分辨率", studio: "最高 5x 缩放", competitor: "Retina" },
      { name: "需要注册", studio: "不支持", competitor: "许可证密钥" },
      { name: "开源", studio: "支持（Apache 2.0）", competitor: "不支持" },
    ],
    verdict:
      "如果你愿意付费，Xnapper 是不错的 macOS 原生截图工具。Screenshot Studio 在浏览器里免费给出同样的美化效果，支持任何操作系统，并增加 3D、动画和视频导出。",
    faqs: [
      {
        q: "有没有 Xnapper 的免费替代品？",
        a: "支持。Screenshot Studio 是 Xnapper 的免费开源替代方案，直接在浏览器里运行。它能为任意截图添加背景、阴影、浏览器模型、3D 效果和动画，无需注册，也没有水印。",
      },
      {
        q: "Xnapper 能在 Windows 上使用吗？",
        a: "不支持。Xnapper 仅支持 macOS。Screenshot Studio 可在 Windows、macOS、Linux 和 ChromeOS 上的任意现代浏览器中使用，无需安装任何东西，就能得到同样精美的截图。",
      },
    ],
  },
];

export function getComparison(slug: string): ComparisonData | undefined {
  return comparisons.find((c) => c.slug === slug);
}

export function getAllComparisonSlugs(): string[] {
  return comparisons.map((c) => c.slug);
}
