import { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/landing/Navigation";
import { Footer } from "@/components/landing/Footer";
import { OG_DEFAULTS } from "@/lib/seo/metadata";

export const metadata: Metadata = {
  title: "更新日志 - 最新更新与功能",
  description:
    "看看 Screenshot Studio 有哪些新内容。最新更新包括动画时间轴、视频导出、3D 效果等。",
  keywords: [
    "screenshot studio changelog",
    "screenshot studio updates",
    "screenshot editor new features",
    "image editor release notes",
    "animation maker updates",
  ],
  openGraph: {
    ...OG_DEFAULTS,
    title: "更新日志 - Screenshot Studio",
    description:
      "看看 Screenshot Studio 有哪些新内容。最新更新包括动画时间轴、视频导出等。",
    url: "/changelog",
  },
  alternates: {
    canonical: "/changelog",
  },
};

interface ChangelogEntry {
  date: string;
  version: string;
  title: string;
  description: string;
  changes: {
    type: "added" | "improved" | "fixed";
    text: string;
  }[];
}

const changelog: ChangelogEntry[] = [
  {
    date: "2026 年 8 月 30 日",
    version: "2.6.0",
    title: "代码图片",
    description:
      "代码片段生成器现已成为 /code 上的独立编辑器，拥有自己的整页工作区和可分享链接。",
    changes: [
      {
        type: "added",
        text: "位于 /code 的独立 Code Images 编辑器，配备整页工作区和简洁顶栏",
      },
      {
        type: "added",
        text: "可分享链接，可从 URL 还原完全相同的主题、背景和代码",
      },
      {
        type: "improved",
        text: "代码片段生成器已从截图编辑器主侧边栏移出，成为独立页面，可通过「代码图片」卡片进入",
      },
    ],
  },
  {
    date: "2026 年 3 月 9 日",
    version: "2.5.0",
    title: "浏览器模型",
    description:
      "逼真的 Safari 和 Chrome 浏览器边框，支持浅色和深色模式、可调标题栏高度以及自定义 URL。",
    changes: [
      {
        type: "added",
        text: "Safari 浏览器边框（浅色和深色），包含红绿灯按钮、侧边栏、前进/后退和居中地址栏",
      },
      {
        type: "added",
        text: "Chrome 浏览器边框（浅色和深色），带标签栏、活动标签和多功能地址栏",
      },
      {
        type: "added",
        text: "可调整的浏览器顶栏高度滑块（50%–200%），用于微调工具栏比例",
      },
      {
        type: "added",
        text: "在浏览器地址栏中显示自定义 URL",
      },
      {
        type: "improved",
        text: "浏览器边框是共享组件。在 2D 和 3D 透视视图中渲染效果完全一致",
      },
      {
        type: "improved",
        text: "编辑器中的浏览器样式预览现已与样式区块的卡片布局保持一致",
      },
    ],
  },
  {
    date: "2026 年 3 月 7 日",
    version: "2.4.0",
    title: "推文导入、代码片段与叠加层改进",
    description:
      "将推文导入为截图、生成美观的代码片段，并体验改进后的叠加层调整尺寸和深度控件。",
    changes: [
      {
        type: "added",
        text: "推文导入。粘贴任意推文 URL 即可预览，并通过浅色/深色主题切换截取为高分辨率截图",
      },
      {
        type: "added",
        text: "代码片段生成器。语法高亮的代码截图，支持 20+ 主题、20 种语言、10 款等宽字体，以及可自定义的字号、圆角和行号",
      },
      {
        type: "added",
        text: '推文深色主题使用 X 的“熄灯”纯黑，而非默认的蓝色“暗调”主题',
      },
      {
        type: "improved",
        text: "图片叠加层的调整尺寸和旋转控制点现在可以稳定工作。修复了 Moveable 控件的 pointer-events 和取消选中问题",
      },
      {
        type: "improved",
        text: "简化了深度区块。移除了阴影叠加层，让素材选择器更简洁，聚焦于 3D 对象",
      },
      {
        type: "improved",
        text: "主图的缩放手柄在点击时不再取消选中，修复了代码片段和推文截图的点击缩放问题",
      },
      {
        type: "fixed",
        text: "输入框和下拉菜单的内边距不再被全局字号规则撑大。现仅作用于移动端，以防止 iOS 缩放",
      },
      {
        type: "fixed",
        text: "叠加层上下文工具栏换成了更简洁的通用设计（图层开关、复制、删除）",
      },
    ],
  },
  {
    date: "2026 年 3 月 6 日",
    version: "2.3.0",
    title: "标注工具、文字叠加改版与 UI 打磨",
    description:
      "直接在画布上绘制箭头、曲线、矩形、圆形和模糊区域。文字叠加控制已重新设计。更新日志和落地页已焕新。",
    changes: [
      {
        type: "added",
        text: "标注工具。在画布上绘制箭头、曲线箭头、直线、矩形、圆形和模糊区域",
      },
      {
        type: "added",
        text: "绘制后标注会自动选中，可立即从侧边栏编辑颜色和描边",
      },
      {
        type: "added",
        text: "按标注逐个编辑。点击画布上任意形状即可修改其颜色和描边宽度",
      },
      {
        type: "added",
        text: "可拖拽的曲线控制点，用于绘制带参考线的弧形箭头",
      },
      {
        type: "added",
        text: "模糊工具。在画布上绘制应用背景模糊的区域，支持逐个区域控制强度",
      },
      {
        type: "added",
        text: "描边宽度范围提升至 24px，并新增预设按钮和精细调节滑块",
      },
      {
        type: "improved",
        text: "文字叠加控件全面重做。紧凑的行内编辑、快捷色板、原生字体/字重选择器、阴影开关",
      },
      {
        type: "improved",
        text: "标注区块已移至编辑面板顶部，访问更快捷",
      },
      {
        type: "improved",
        text: "更新日志页面重新设计，布局更简洁，并按变更类型分组",
      },
      {
        type: "improved",
        text: "视频推荐语区块改用响应式网格，支持多个视频",
      },
      {
        type: "improved",
        text: "箭头头部重新设计为简洁的缺口造型，并缩短线段以避免重叠",
      },
      {
        type: "fixed",
        text: "落地页的 YouTube 嵌入不再被 Cross-Origin-Embedder-Policy 响应头阻止",
      },
      {
        type: "fixed",
        text: "标注描边宽度滑块上限从 8 提升到 24。此前在大画布上显得太细",
      },
    ],
  },
  {
    date: "2026 年 2 月 28 日",
    version: "2.2.0",
    title: "模板侧边栏、标签切换动画与导出修复",
    description:
      "预设已移至新的模板叠加层，标签切换现在有平滑过渡，动画视频导出精度也已修复。",
    changes: [
      {
        type: "added",
        text: '模板叠加层。预设库从标签栏移到专用的滑入面板，可通过标签上方的“模板”按钮打开',
      },
      {
        type: "added",
        text: "平滑的标签页内容切换。在「调整」「设计」「背景」「3D」和「动效」标签之间切换时，现在会以轻微的滑动动画淡入淡出",
      },
      {
        type: "improved",
        text: "右侧面板标签栏从 6 个减少到 5 个，布局更清爽，预设可从模板叠加层访问",
      },
      {
        type: "improved",
        text: "模板叠加层以平滑的滑入动画打开/关闭，并支持按 Escape 键关闭",
      },
      {
        type: "fixed",
        text: "动画视频导出现在能捕获精确的帧值。此前，3D 叠加层上的 CSS 过渡会导致导出的帧显示平滑或滞后的中间值，而不是预期的动画",
      },
      {
        type: "fixed",
        text: "使用双重 RAF 技术改进导出帧时序，确保每次截帧前 React DOM 的提交都已完全绘制",
      },
    ],
  },
  {
    date: "2026 年 2 月 23 日",
    version: "2.1.0",
    title: "叠加层缩放、自定义预设与弧形控制",
    description:
      "直接在画布上调整叠加层大小，保存自己的预设，并用新的宽度和不透明度滑块微调 Arc 边框。",
    changes: [
      {
        type: "added",
        text: "画布上的箭头和贴纸叠加层缩放手柄。拖动任意角即可缩放（20–800px）",
      },
      {
        type: "added",
        text: "自定义预设。保存当前画布配置以便日后复用，持久化在本地存储中",
      },
      {
        type: "added",
        text: "边框区块和边框控件中的 Arc 边框宽度滑块（1–20px）和不透明度滑块（0–100%）",
      },
      {
        type: "improved",
        text: "Arc 边框现在在所有渲染路径中都使用动态宽度和不透明度，不再使用硬编码值",
      },
      {
        type: "fixed",
        text: "Arc 边框的不透明度和宽度变更现在会立即反映在画布上",
      },
    ],
  },
  {
    date: "2026 年 2 月 20 日",
    version: "2.0.0",
    title: "动画与视频导出",
    description:
      "用关键帧动画让截图栩栩如生，并导出为 MP4、WebM 或 GIF。",
    changes: [
      {
        type: "added",
        text: "带交互式播放头、标尺和动画轨道的时间轴编辑器",
      },
      {
        type: "added",
        text: "20+ 动画预设，涵盖 5 个类别：显现、翻转、透视、环绕和景深",
      },
      {
        type: "added",
        text: "关键帧动画系统，内置 8 种缓动函数（linear、ease-in、ease-out、cubic、expo）",
      },
      {
        type: "added",
        text: "实时动画预览，支持播放、暂停、循环和进度拖动控制",
      },
      {
        type: "added",
        text: "支持导出 MP4、WebM 和 GIF 格式视频，并提供质量预设（高/中/低）",
      },
      {
        type: "added",
        text: "通过 WebCodecs API 硬件加速编码，并以 FFmpeg WASM 作为回退",
      },
      {
        type: "added",
        text: "使用 SharedArrayBuffer 进行多线程 FFmpeg 编码，导出更快",
      },
      {
        type: "added",
        text: "导出进度对话框，实时显示帧数和状态",
      },
      {
        type: "added",
        text: "右侧面板中带分类浏览的动画预设库",
      },
      {
        type: "added",
        text: "支持多片段，并在时间轴上处理重叠",
      },
      {
        type: "improved",
        text: "编辑器右侧面板新增独立的动画标签页",
      },
      {
        type: "improved",
        text: "为编辑器、时间轴控件、CTA 和首屏区块添加了分析追踪",
      },
    ],
  },
  {
    date: "2026 年 2 月 14 日",
    version: "1.0.0",
    title: "全面改版",
    description:
      "Screenshot Studio 的彻底重写：现代技术栈、全新 UI 和强大的新功能。",
    changes: [
      {
        type: "added",
        text: "全新的编辑器布局，统一的右侧面板（设置、编辑、背景、3D、动画、预设标签页）",
      },
      {
        type: "added",
        text: "3D 透视变换，实时预览",
      },
      {
        type: "added",
        text: "50+ 渐变与纯色背景，带模糊和噪点效果",
      },
      {
        type: "added",
        text: "设备边框：macOS、Windows、Arc 风格和 Polaroid 边框",
      },
      {
        type: "added",
        text: "文字叠加支持 25+ 字体、自定义颜色、阴影和定位",
      },
      {
        type: "added",
        text: "支持旋转、翻转、不透明度和拖拽定位的图片叠加层",
      },
      {
        type: "added",
        text: "通过 Screen-Shot.xyz 抓取网站截图（桌面端和移动端视口）",
      },
      {
        type: "added",
        text: "以 PNG 和 JPG 格式导出最高 5 倍缩放的高分辨率图片",
      },
      {
        type: "added",
        text: "通过 Zundo 实现无限历史的撤销/重做",
      },
      {
        type: "added",
        text: "一键设定样式的设计预设",
      },
      {
        type: "added",
        text: "适用于 Instagram、YouTube、Twitter、LinkedIn 和 Open Graph 的宽高比预设",
      },
      {
        type: "added",
        text: "为渐变组件加上错误边界和懒加载",
      },
      {
        type: "improved",
        text: "迁移至 Next.js 16，采用 React 19 和 React Compiler",
      },
      {
        type: "improved",
        text: "升级到 Tailwind CSS 4，采用全新的主题系统",
      },
      {
        type: "improved",
        text: "使用 Zustand + temporal 中间件重构状态管理",
      },
      {
        type: "improved",
        text: "重新设计了落地页，新增主视觉、功能、用户评价和常见问题等版块",
      },
      {
        type: "improved",
        text: "针对截图美化、社交媒体图片、动画和 3D 效果的 SEO 优化功能页",
      },
    ],
  },
];

const typeBadge = {
  added: "text-foreground",
  improved: "text-muted-foreground",
  fixed: "text-muted-foreground/70",
} as const;

const typeDot = {
  added: "bg-primary",
  improved: "bg-muted-foreground",
  fixed: "bg-muted-foreground/70",
} as const;

// 分组标题的中文标签。
// type 本身是参与 c.type === type 比较的数据枚举，不能直接翻译枚举值，
// 只能在渲染处做一次映射。
const typeLabel = {
  added: "新增",
  improved: "改进",
  fixed: "修复",
} as const;

const ctaClassName =
  "relative inline-flex items-center justify-center rounded-md border-0 bg-[var(--nav-cta-bg)] px-6 py-2.5 text-sm font-medium text-[var(--nav-cta-fg)] shadow-none transition-[transform,box-shadow] duration-150 ease-out [text-shadow:var(--nav-cta-text-shadow)] hover:shadow-[var(--nav-cta-hover-shadow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 active:scale-[0.97]";

const INTER =
  "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";

export default function ChangelogPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.screenshot-studio.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Changelog",
            item: "https://www.screenshot-studio.com/changelog",
          },
        ],
      },
      {
        "@type": "WebPage",
        name: "Screenshot Studio Changelog",
        description:
          "Latest updates, new features, and improvements to Screenshot Studio.",
        url: "https://www.screenshot-studio.com/changelog",
        mainEntity: {
          "@type": "ItemList",
          name: "Screenshot Studio Release History",
          itemListElement: changelog.map((entry, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: `v${entry.version} - ${entry.title}`,
            description: entry.description,
          })),
        },
      },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Navigation />

      <main className="flex-1 px-6 pb-20 pt-28">
        <div className="mx-auto max-w-2xl">
          <header className="mb-16">
            <h1
              className="mb-2 text-3xl font-semibold tracking-[-0.03em] text-foreground"
              style={{ fontFamily: INTER }}
            >
              更新日志
            
            </h1>
            <p className="text-sm text-muted-foreground">
              新功能、改进与修复。
            
            </p>
          </header>

          <div className="space-y-0">
            {changelog.map((entry, entryIndex) => (
              <article
                key={entry.version}
                className={
                  entryIndex !== changelog.length - 1
                    ? "mb-12 border-b border-border pb-12"
                    : "pb-12"
                }
              >
                <div className="mb-4 flex items-baseline gap-3">
                  <time className="font-mono text-xs text-muted-foreground">
                    {entry.date}
                  </time>
                  <span className="font-mono text-xs text-muted-foreground">
                    v{entry.version}
                  </span>
                </div>

                <h2
                  className="mb-1.5 text-lg font-semibold tracking-[-0.02em] text-foreground"
                  style={{ fontFamily: INTER }}
                >
                  {entry.title}
                </h2>
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  {entry.description}
                </p>

                {(["added", "improved", "fixed"] as const).map((type) => {
                  const items = entry.changes.filter((c) => c.type === type);
                  if (items.length === 0) return null;
                  return (
                    <div key={type} className="mb-4 last:mb-0">
                      <h3
                        className={`mb-2 text-xs font-medium uppercase tracking-wider ${typeBadge[type]}`}
                      >
                        {typeLabel[type]}
                      </h3>
                      <ul className="space-y-1.5">
                        {items.map((change, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground/80"
                          >
                            <span
                              className={`mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full ${typeDot[type]}`}
                            />
                            {change.text}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </article>
            ))}
          </div>

          <div className="border-t border-border pt-8 text-center">
            <p className="mb-4 text-sm text-muted-foreground">
              所有功能免费。无需注册。
            
            </p>
            <Link href="/" className={ctaClassName}>
              打开编辑器
            
            </Link>
          </div>
        </div>
      </main>

      <Footer brandName="Screenshot Studio" />
    </div>
  );
}
