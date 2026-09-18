import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight01Icon,
  BrowserIcon,
  CubeIcon,
  MagicWand01Icon,
  Share08Icon,
  SourceCodeIcon,
  Video01Icon,
} from "hugeicons-react";
import { Navigation } from "@/components/landing/Navigation";
import { Footer } from "@/components/landing/Footer";
import { OG_DEFAULTS } from "@/lib/seo/metadata";

export const metadata: Metadata = {
  title: "功能：截图与模型工具",
  description:
    "Screenshot Studio 的全部功能：截图美化、浏览器模型、应用与 UI 模型、社交媒体图片、动画和 3D 效果。免费，无需注册。",
  keywords: [
    "screenshot editor features",
    "image editing tools",
    "free design tools",
    "screenshot beautifier",
    "social media graphics",
    "animation maker",
    "3d effects",
    "screenshot mockup features",
    "browser frame mockup",
    "image background remover alternative",
    "screenshot gradient background",
    "screenshot presentation tool",
    "mockup screenshot",
    "mockup online",
    "mockup screen",
    "mockups ui",
    "mockup ui ux",
    "app mockup generator",
    "ui mockup generator",
    "shots app alternative",
    "shots net alternative",
    "moqups alternative",
    "previewed app alternative",
    "appshots alternative",
    "goodmockups alternative",
    "mockup me alternative",
    "mockup generator",
    "free mockup generator",
    "mockup generator free",
    "mockup online generator",
    "mockup online editor",
    "mockup editor online free",
    "mockup design online",
    "mockup free online",
    "free online mockup generator no watermark",
    "free mockup generator without watermark",
    "app mockup generator",
    "website mockup generator",
    "free website mockup generator",
    "website mockup generator from url",
    "laptop mockup generator",
    "product mockup generator",
    "free online 3d mockup generator",
    "best mockup generator",
    "best online mockup generator",
    "mockup app",
  ],
  openGraph: {
    ...OG_DEFAULTS,
    title: "功能 - Screenshot Studio",
    description:
      "所有工具和功能集于一个免费编辑器。美化、制作动画并转换截图。",
    url: "/features",
  },
  alternates: {
    canonical: "/features",
  },
};

const INTER =
  'Inter, "Inter Fallback", Arial, Helvetica, sans-serif';

const ctaClassName =
  "relative inline-flex items-center justify-center rounded-md border-0 bg-[var(--nav-cta-bg)] px-6 py-2.5 text-base font-medium text-[var(--nav-cta-fg)] shadow-none transition-[transform,box-shadow] duration-150 ease-out [text-shadow:var(--nav-cta-text-shadow)] hover:shadow-[var(--nav-cta-hover-shadow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 active:scale-[0.97]";

const cardSurface =
  "rounded-2xl bg-card ring-1 ring-border shadow-[var(--card-edge-shadow)]";

const features = [
  {
    icon: MagicWand01Icon,
    title: "截图美化",
    description:
      "把普通截图变成专业视觉作品。添加背景、阴影和圆角。",
    href: "/features/screenshot-beautifier",
    // 注意：这里是**页面上渲染出来的标签**，必须叫 tags。
    // 叫 keywords 会与 metadata.keywords（仅供搜索引擎的英文关键词）同名同构，
    // 汉化流水线无法区分两者，只能整组跳过 —— 参见 R20260914-01《05-执行记录》§6.1。
    tags: ["背景", "阴影", "圆角", "内边距"],
  },
  {
    icon: Share08Icon,
    title: "社交媒体图片",
    description:
      "为 Twitter、LinkedIn 和 Instagram 制作尺寸完美的图形。无需设计技能。",
    href: "/features/social-media-graphics",
    tags: ["Twitter", "LinkedIn", "Instagram", "帖子"],
  },
  {
    icon: Video01Icon,
    title: "动画制作",
    description:
      "用缩放、平移和淡入淡出动画让截图栩栩如生。可导出为视频或 GIF。",
    href: "/features/animation-maker",
    tags: ["缩放", "平移", "幻灯片", "视频导出"],
  },
  {
    icon: CubeIcon,
    title: "3D 效果",
    description:
      "为扁平截图添加惊艳的 3D 透视、旋转和层次感。实时预览。",
    href: "/features/3d-effects",
    tags: ["透视", "旋转", "景深", "模型"],
  },
  {
    icon: BrowserIcon,
    title: "浏览器模型",
    description:
      "为截图添加逼真的 Safari 和 Chrome 浏览器边框。支持亮色和暗色模式，可自定义 URL。",
    href: "/features/browser-mockups",
    tags: ["Safari", "Chrome", "浏览器边框", "地址栏"],
  },
  {
    icon: SourceCodeIcon,
    title: "代码图片",
    description:
      "把代码变成精美、可分享的图片。语法主题、渐变背景、行号和窗口边框。",
    href: "/features/code-snippets",
    tags: ["语法高亮", "渐变", "行号", "可分享链接"],
  },
] as const;

export default function FeaturesPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Screenshot Studio Features",
    description: "Complete list of Screenshot Studio features and tools",
    itemListElement: features.map((feature, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: feature.title,
      description: feature.description,
      url: `https://www.screenshot-studio.com${feature.href}`,
    })),
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Navigation brandName="Screenshot Studio" />

      <main className="flex-1">
        <section className="px-6 pb-12 pt-32">
          <div className="mx-auto max-w-4xl text-center">
            <h1
              className="mb-6 text-4xl font-semibold tracking-[-0.03em] text-foreground md:text-6xl"
              style={{ fontFamily: INTER }}
            >
              全部功能
            
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
              从截图创作出惊艳视觉所需的一切。100% 免费，无需注册。
            
            </p>
          </div>
        </section>

        <section className="px-6 pb-16">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-4 md:grid-cols-2">
              {features.map((feature, index) => (
                <Link
                  key={feature.title}
                  href={feature.href}
                  className={`group p-8 transition-[box-shadow,ring-color] duration-150 hover:ring-ring/40 ${cardSurface} ${
                    index === features.length - 1
                      ? "md:col-span-2 md:max-w-xl md:justify-self-center"
                      : ""
                  }`}
                >
                  <feature.icon
                    className="mb-6 size-8 text-foreground"
                    aria-hidden
                  />
                  <h2 className="mb-3 text-2xl font-semibold tracking-tight text-foreground">
                    {feature.title}
                  </h2>
                  <p className="mb-4 text-muted-foreground">{feature.description}</p>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {feature.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-foreground/[0.04] px-2 py-1 text-xs text-muted-foreground ring-1 ring-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-foreground/90 transition-colors group-hover:text-foreground">
                    了解更多
                    
                    <ArrowRight01Icon
                      className="size-3.5 transition-transform group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border px-6 py-20">
          <div className="mx-auto max-w-3xl">
            <h2
              className="mb-6 text-3xl font-semibold tracking-[-0.03em] text-foreground"
              style={{ fontFamily: INTER }}
            >
              适配各种屏幕的模型
            
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Screenshot Studio 是一款完全在浏览器中运行的免费模型生成器。拖入应用、网站或 UI 设计的截图，几秒内即可在线变成精致的模型。无需账号、无水印、无需安装任何东西。
              
              </p>
              <p>
                把任意界面套进 Safari 或 Chrome 浏览器模型，放到渐变或纯色背景上，再加阴影、内边距和圆角。用 3D 倾斜做出透视模型，或做成一段短产品视频用于发布。
              
              </p>
              <p>
                它适用于 UI 和 UX 模型、应用商店截图、落地页主图、README 预览和社交媒体配图。如果你用过 Shots、Moqups、Previewed、AppShots 或 Pika Style 这类工具，会觉得很熟悉，只是这里的一切都免费且开源。
              
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-border px-6 py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h2
              className="mb-4 text-3xl font-semibold tracking-[-0.03em] text-foreground"
              style={{ fontFamily: INTER }}
            >
              准备好开始创作了吗？
            
            </h2>
            <p className="mb-8 text-muted-foreground">
              所有功能，零成本。几秒即可开始创作。
            
            </p>
            <Link href="/" className={ctaClassName}>
              打开编辑器
            
            </Link>
          </div>
        </section>
      </main>

      <Footer brandName="Screenshot Studio" />
    </div>
  );
}
