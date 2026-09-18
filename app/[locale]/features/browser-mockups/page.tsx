import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight01Icon,
  BrowserIcon,
  ComputerIcon,
  Settings01Icon,
  Sun01Icon,
} from "hugeicons-react";
import { Navigation } from "@/components/landing/Navigation";
import { Footer } from "@/components/landing/Footer";
import { OG_DEFAULTS } from "@/lib/seo/metadata";

export const metadata: Metadata = {
  title: "免费浏览器模型生成器",
  description:
    "免费浏览器模型生成器。为截图添加 Safari 和 Chrome 边框，支持浅色与深色模式、自定义 URL 栏和 3D 透视。无需注册。",
  keywords: [
    "browser mockup generator",
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

    "safari browser mockup",
    "chrome browser mockup",
    "browser frame screenshot",
    "free browser mockup tool",
    "safari window mockup",
    "chrome window mockup",
    "browser mockup online free",
    "screenshot browser frame",
    "mac browser mockup",
    "website mockup generator",
    "browser screenshot tool",
    "add browser frame to screenshot",
    "safari dark mode mockup",
    "chrome dark mode mockup",
  ],
  openGraph: {
    ...OG_DEFAULTS,
    title: "免费浏览器模型生成器 - Safari 与 Chrome 边框",
    description:
      "为截图添加逼真的 Safari 和 Chrome 浏览器边框。亮色和暗色模式，自定义 URL。免费，无需注册。",
    url: "/features/browser-mockups",
  },
  alternates: {
    canonical: "/features/browser-mockups",
  },
};

const INTER =
  'Inter, "Inter Fallback", Arial, Helvetica, sans-serif';

const ctaClassName =
  "relative inline-flex items-center justify-center rounded-md border-0 bg-[var(--nav-cta-bg)] px-6 py-2.5 text-base font-medium text-[var(--nav-cta-fg)] shadow-none transition-[transform,box-shadow] duration-150 ease-out [text-shadow:var(--nav-cta-text-shadow)] hover:shadow-[var(--nav-cta-hover-shadow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 active:scale-[0.97]";

const cardSurface =
  "rounded-2xl bg-card ring-1 ring-border shadow-[var(--card-edge-shadow)]";

const chipLinkClassName =
  "group flex items-center justify-between rounded-md bg-foreground/[0.04] px-4 py-3 text-sm font-medium text-foreground/90 ring-1 ring-border transition-colors hover:bg-foreground/[0.08] hover:text-foreground";

const features = [
  {
    icon: BrowserIcon,
    title: "Safari 浏览器边框",
    description:
      "逼真的 macOS Safari 工具栏，包含红绿灯按钮、侧边栏、前进/后退导航，以及带锁图标的居中地址栏。",
  },
  {
    icon: ComputerIcon,
    title: "Chrome 浏览器边框",
    description:
      "逼真的 Chrome 工具栏，包含标签栏、活动标签、彩色红绿灯按钮和地址栏。",
  },
  {
    icon: Sun01Icon,
    title: "浅色与深色模式",
    description:
      "每个浏览器边框都提供浅色和深色两种变体，以匹配你的截图内容或品牌风格。",
  },
  {
    icon: Settings01Icon,
    title: "自定义 URL 与页头尺寸",
    description:
      "设置显示在地址栏中的自定义 URL，并在默认尺寸的 50% 到 200% 之间调整工具栏高度。",
  },
] as const;

const useCases = [
  {
    title: "SaaS 落地页",
    description:
      "把产品放进浏览器边框展示，让访客真实预览你的 Web 应用。",
  },
  {
    title: "作品集与案例",
    description:
      "用专业的浏览器外框展示网站设计，适用于客户作品集。",
  },
  {
    title: "博客与文档",
    description:
      "为教程、指南和技术文章中的截图添加浏览器语境。",
  },
  {
    title: "社交媒体帖子",
    description:
      "用精致的浏览器边框，让你的产品截图在 Twitter、LinkedIn 和 Product Hunt 上脱颖而出。",
  },
];

const howToSteps = [
  {
    step: "1",
    title: "上传你的截图",
    description:
      "拖放任意图片，或从剪贴板粘贴。支持 PNG、JPG 和 WebP。",
  },
  {
    step: "2",
    title: "选择浏览器边框",
    description:
      "在浅色或深色模式下选择 Safari 或 Chrome。设置自定义 URL，并按喜好调整标题栏尺寸。",
  },
  {
    step: "3",
    title: "导出",
    description:
      "以最高 5x 分辨率下载为 PNG 或 JPG。添加 3D 透视，层次更丰富。",
  },
];

const relatedLinks = [
  { href: "/features/screenshot-beautifier", label: "截图美化" },
  { href: "/features/3d-effects", label: "3D 效果" },
  { href: "/features/social-media-graphics", label: "社交媒体图片" },
] as const;

export default function BrowserMockupsPage() {
  const breadcrumb = {
    "@context": "https://schema.org",
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
        name: "Features",
        item: "https://www.screenshot-studio.com/features",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Browser Mockups",
        item: "https://www.screenshot-studio.com/features/browser-mockups",
      },
    ],
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: "Screenshot Studio - Browser Mockup Generator",
        applicationCategory: "DesignApplication",
        operatingSystem: "Web Browser",
        description:
          "Free online tool to add Safari and Chrome browser frames to screenshots with light/dark modes and custom URL.",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        featureList: [
          "Safari browser frame (light & dark)",
          "Chrome browser frame (light & dark)",
          "Custom URL display",
          "Adjustable header size",
          "3D perspective support",
          "No signup required",
        ],
      },
      {
        "@type": "HowTo",
        name: "How to Add a Browser Frame to a Screenshot",
        description:
          "Add a realistic Safari or Chrome browser frame to any screenshot in 3 steps using Screenshot Studio.",
        totalTime: "PT1M",
        tool: {
          "@type": "HowToTool",
          name: "Screenshot Studio",
        },
        step: howToSteps.map((item, index) => ({
          "@type": "HowToStep",
          name: item.title,
          text: item.description,
          position: index + 1,
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Navigation brandName="Screenshot Studio" />

      <main className="flex-1">
        <section className="px-6 pb-20 pt-32">
          <div className="mx-auto max-w-4xl text-center">
            <h1
              className="mb-6 text-4xl font-semibold tracking-[-0.03em] text-foreground md:text-6xl"
              style={{ fontFamily: INTER }}
            >
              免费浏览器模型生成器
            
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
              为你的截图添加逼真的 Safari 和 Chrome 浏览器边框。亮色和暗色模式，自定义 URL，可调整顶栏高度。
            
            </p>
            <div className="flex flex-col items-center">
              <Link href="/" className={ctaClassName}>
                添加浏览器边框
              
              </Link>
              <p className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground/70">
                <span>100% 免费</span>
                <span className="h-3 w-px bg-border" aria-hidden />
                <span>无需注册</span>
              </p>
            </div>
          </div>
        </section>

        <section className="border-y border-border px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <h2
              className="mb-12 text-center text-3xl font-semibold tracking-[-0.03em] text-foreground"
              style={{ fontFamily: INTER }}
            >
              适用于任何截图的逼真浏览器边框
            
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className={`flex gap-4 p-6 ${cardSurface}`}
                >
                  <feature.icon
                    className="size-6 shrink-0 text-foreground"
                    aria-hidden
                  />
                  <div>
                    <h3 className="mb-2 text-lg font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <h2
              className="mb-4 text-center text-3xl font-semibold tracking-[-0.03em] text-foreground"
              style={{ fontFamily: INTER }}
            >
              适用于各种场景
            
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
              浏览器模型能为任何截图增添语境与专业感。
            
            </p>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {useCases.map((useCase) => (
                <div key={useCase.title} className={`p-6 ${cardSurface}`}>
                  <h3 className="mb-2 font-semibold text-foreground">
                    {useCase.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {useCase.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-border px-6 py-16">
          <div className="mx-auto max-w-4xl">
            <h2
              className="mb-12 text-center text-3xl font-semibold tracking-[-0.03em] text-foreground"
              style={{ fontFamily: INTER }}
            >
              如何添加浏览器边框
            
            </h2>
            <div className="space-y-8">
              {howToSteps.map((item) => (
                <div key={item.step} className="flex items-start gap-6">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary text-sm font-semibold text-primary-foreground">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto max-w-4xl">
            <h2
              className="mb-8 text-center text-2xl font-semibold tracking-[-0.03em] text-foreground"
              style={{ fontFamily: INTER }}
            >
              探索更多功能
            
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {relatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={chipLinkClassName}
                >
                  <span>{link.label}</span>
                  <ArrowRight01Icon
                    className="size-3.5 text-muted-foreground/70 transition-colors group-hover:text-foreground"
                    aria-hidden
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border px-6 py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h2
              className="mb-4 text-3xl font-semibold tracking-[-0.03em] text-foreground"
              style={{ fontFamily: INTER }}
            >
              准备好添加浏览器边框了吗？
            
            </h2>
            <p className="mb-8 text-muted-foreground">
              用逼真的浏览器模型让截图更显专业。
            
            </p>
            <Link href="/" className={ctaClassName}>
              免费开始
            
            </Link>
          </div>
        </section>
      </main>

      <Footer brandName="Screenshot Studio" />
    </div>
  );
}
