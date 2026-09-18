import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight01Icon,
  ColorsIcon,
  Download04Icon,
  Layers01Icon,
  MagicWand01Icon,
} from "hugeicons-react";
import { Navigation } from "@/components/landing/Navigation";
import { Footer } from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "免费在线截图美化工具",
  description:
    "免费截图美化工具：添加渐变背景、浏览器边框、阴影、圆角与内边距，把普通截图变成精美模型。无需注册。",
  keywords: [
    "screenshot beautifier",
    "screenshot editor online free",
    "screenshot editor",
    "beautify screenshots",
    "free screenshot editor",
    "screenshot mockup",
    "screenshot background",
    "screenshot shadows",
    "free screenshot tool",
    "online screenshot beautifier",
    "pika style alternative",
    "shots.so alternative",
    "screenshot wrapper tool",
    "mac window mockup screenshot",
    "browser frame screenshot tool",
    "screenshot border radius shadow",
    "gradient background screenshot maker",
    "screenshot padding tool",
  ],
  openGraph: {
    title: "免费截图美化工具 - 让截图更专业",
    description:
      "把普通截图变成惊艳的视觉效果。添加背景、阴影，并以高分辨率导出。",
    url: "/features/screenshot-beautifier",
  },
  alternates: {
    canonical: "/features/screenshot-beautifier",
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
    icon: ColorsIcon,
    title: "100+ 渐变背景",
    description:
      "从精美的渐变、纯色中挑选，或上传你自己的自定义背景。",
  },
  {
    icon: MagicWand01Icon,
    title: "专业阴影",
    description:
      "添加逼真的阴影，可自定义模糊、扩散和不透明度，营造层次感。",
  },
  {
    icon: Layers01Icon,
    title: "圆角与内边距",
    description:
      "调整圆角和内边距，适配任何风格或平台要求。",
  },
  {
    icon: Download04Icon,
    title: "高分辨率导出",
    description:
      "最高可导出 5x 分辨率。非常适合视网膜屏和印刷。",
  },
] as const;

const useCases = [
  {
    title: "产品截图",
    description:
      "让你的 SaaS 产品截图在落地页和营销物料中脱颖而出。",
  },
  {
    title: "社交媒体帖子",
    description:
      "用你的截图制作抢眼的 Twitter、LinkedIn 和 Instagram 帖子。",
  },
  {
    title: "文档",
    description:
      "用于教程、指南和帮助文档的专业截图。",
  },
  {
    title: "App Store 素材",
    description:
      "精美的应用预览图，提升下载量和转化率。",
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
    title: "选择你的风格",
    description:
      "从 100+ 种背景中挑选，调整阴影、圆角和内边距，以匹配你的品牌。",
  },
  {
    step: "3",
    title: "导出与分享",
    description:
      "以 PNG 或 JPG 下载。可放大至 5x，获得清晰的高分辨率输出。",
  },
];

const relatedLinks = [
  { href: "/features/browser-mockups", label: "浏览器模型" },
  { href: "/features/social-media-graphics", label: "社交媒体图片" },
  { href: "/features/animation-maker", label: "动画制作" },
  { href: "/features/3d-effects", label: "3D 效果" },
] as const;

export default function ScreenshotBeautifierPage() {
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
        name: "Screenshot Beautifier",
        item: "https://www.screenshot-studio.com/features/screenshot-beautifier",
      },
    ],
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: "Screenshot Studio - Screenshot Beautifier",
        applicationCategory: "DesignApplication",
        operatingSystem: "Web Browser",
        description:
          "Free online tool to beautify screenshots with backgrounds, shadows, and professional styling.",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        featureList: [
          "Gradient backgrounds",
          "Custom shadows",
          "Rounded corners",
          "High-resolution export",
          "No signup required",
        ],
      },
      {
        "@type": "HowTo",
        name: "How to Beautify Screenshots",
        description:
          "Transform plain screenshots into professional visuals in 3 easy steps using Screenshot Studio.",
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
              免费截图美化工具
            
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
              几秒钟内把普通截图变成专业感十足的视觉效果。添加出色背景、阴影，并以高分辨率导出。
            
            </p>
            <div className="flex flex-col items-center">
              <Link href="/" className={ctaClassName}>
                美化你的截图
              
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
              美化截图所需的一切
            
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
              无论你是开发者、营销人员还是内容创作者，我们的截图美化工具都能帮你做出惊艳的视觉效果。
            
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
              如何美化截图
            
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
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
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
              准备好美化你的截图了吗？
            
            </h2>
            <p className="mb-8 text-muted-foreground">
              加入成千上万创作者的行列，一起制作专业的图形。
            
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
