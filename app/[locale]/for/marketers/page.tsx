import { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/landing/Navigation";
import { Footer } from "@/components/landing/Footer";
import {
  Megaphone01Icon,
  Share01Icon,
  ChartIncreaseIcon,
  Presentation01Icon,
  ChartHistogramIcon,
  Image01Icon,
  ArrowRight01Icon,
} from "hugeicons-react";

export const metadata: Metadata = {
  title: "面向营销人员的截图编辑器",
  description:
    "为落地页、社交媒体和广告制作令人停下滑动的产品截图和模型。背景、3D 效果、动画。免费，无需设计技能。",
  keywords: [
    "screenshot editor for marketers",
    "product screenshot tool",
    "saas screenshot maker",
    "landing page images",
    "marketing screenshot editor",
    "ad creative tool",
    "product mockup generator",
    "social media marketing images",
    "product hunt launch images",
    "saas landing page hero image",
    "startup screenshot maker",
    "pitch deck screenshot tool",
    "feature announcement images",
    "comparison screenshot maker",
  ],
  openGraph: {
    title: "面向营销人员的截图编辑器",
    description:
      "为营销活动、落地页和社交媒体制作专业的产品截图。免费，无需注册。",
    url: "/for/marketers",
  },
  alternates: {
    canonical: "/for/marketers",
  },
};

const ctaClassName =
  "relative inline-flex items-center justify-center rounded-md border-0 bg-[var(--nav-cta-bg)] px-6 py-2.5 text-base font-medium text-[var(--nav-cta-fg)] shadow-none transition-[transform,box-shadow] duration-150 ease-out [text-shadow:var(--nav-cta-text-shadow)] hover:shadow-[var(--nav-cta-hover-shadow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 active:scale-[0.97]";

const secondaryCtaClassName =
  "inline-flex items-center justify-center rounded-md px-6 py-2.5 text-base font-medium text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground active:scale-[0.99]";

const cardSurface =
  "rounded-2xl bg-card p-6 ring-1 ring-inset ring-border shadow-[var(--card-highlight-shadow)]";

const chipLinkClassName =
  "group flex items-center justify-between rounded-md bg-foreground/[0.04] px-4 py-3 text-sm font-medium text-foreground/90 ring-1 ring-border transition-colors hover:bg-foreground/[0.08] hover:text-foreground";

const INTER =
  "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";

const useCases = [
  {
    icon: Megaphone01Icon,
    title: "落地页主图",
    description:
      "把原始的产品截图变成能带来转化的精致首屏图。添加渐变背景、阴影和 3D 透视，以最佳方式展示你的产品。",
  },
  {
    icon: Share01Icon,
    title: "社交媒体营销活动",
    description:
      "为 Twitter、LinkedIn 和 Instagram 制作风格统一、带品牌感的图形。适配每个平台的完美尺寸，为互动率而优化。",
  },
  {
    icon: ChartIncreaseIcon,
    title: "广告素材",
    description:
      "制作让人停下来看的广告图。经过美化的产品截图，配合吸睛的背景与角度，效果远胜普通的图库照片。",
  },
  {
    icon: Presentation01Icon,
    title: "路演幻灯片与提案",
    description:
      "用专业的产品模型打动投资者和客户。3D 透视和设备边框为任何演示增添可信度。",
  },
  {
    icon: ChartHistogramIcon,
    title: "产品公告",
    description:
      "用惊艳的视觉发布新功能。动画截图能吸引注意力，并清晰地展示你的产品能做什么。",
  },
  {
    icon: Image01Icon,
    title: "邮件营销",
    description:
      "为电子报和邮件培育活动制作简洁的产品图片。高分辨率导出，在任何设备上都清晰锐利。",
  },
];

const benefits = [
  {
    title: "无需设计技能",
    description:
      "一键预设包办设计工作。只需上传截图、挑选风格、导出即可。整个团队都能做出符合品牌调性的视觉内容。",
  },
  {
    title: "统一的品牌素材",
    description:
      "在所有营销物料中沿用相同的背景、阴影和样式。用一致的视觉强化辨识度。",
  },
  {
    title: "比 Figma 或 Canva 更快",
    description:
      "专为截图打造，而非通用设计。在 Figma 里要花 15 分钟的事，这里 30 秒就能完成。没有学习成本。",
  },
  {
    title: "能带来转化的动画内容",
    description:
      "用缩放和平移效果制作动态产品演示。导出为视频或 GIF，用于社交媒体的帖子效果优于静态图片。",
  },
];

const featureLinks = [
  { href: "/features/screenshot-beautifier", label: "截图美化" },
  { href: "/features/social-media-graphics", label: "社交媒体图片" },
  { href: "/features/animation-maker", label: "动画制作" },
  { href: "/features/3d-effects", label: "3D 效果" },
];

export default function ForMarketersPage() {
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
            name: "For Marketers",
            item: "https://www.screenshot-studio.com/for/marketers",
          },
        ],
      },
      {
        "@type": "SoftwareApplication",
        name: "Screenshot Studio for Marketers",
        applicationCategory: "DesignApplication",
        operatingSystem: "Web Browser",
        description:
          "Free screenshot editor for marketers. Create professional product screenshots for landing pages, social media, and ad creatives without design skills.",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        featureList: [
          "Product screenshot beautification",
          "Social media graphics",
          "Ad creative generation",
          "3D product mockups",
          "Animated demo videos",
          "No signup required",
        ],
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

      <main className="flex-1">
        <section className="px-6 pb-20 pt-32">
          <div className="mx-auto max-w-4xl text-center">
            <p
              className="mb-6 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground"
              style={{ fontFamily: INTER }}
            >
              专为营销人员
            
            </p>
            <h1
              className="mb-6 text-4xl font-semibold tracking-[-0.04em] text-foreground md:text-6xl"
              style={{ fontFamily: INTER }}
            >
              面向营销人员的截图编辑器
            
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
              为落地页、社交媒体和广告素材制作令人停下滑动的产品视觉图。无需设计技能，无需 Figma。
            
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/" className={ctaClassName}>
                创建营销图片
              
              </Link>
              <Link href="/features" className={secondaryCtaClassName}>
                查看全部功能
              
              </Link>
            </div>
          </div>
        </section>

        <section className="border-t border-border px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <h2
                className="mb-4 text-3xl font-semibold tracking-[-0.03em] text-foreground md:text-4xl"
                style={{ fontFamily: INTER }}
              >
                营销人员如何使用 Screenshot Studio
              
              </h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                从落地页主视觉到社交营销活动，制作能带来转化的视觉内容。
              
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {useCases.map((uc) => (
                <div key={uc.title} className={`${cardSurface} flex gap-4`}>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-foreground/[0.06] text-foreground ring-1 ring-inset ring-border">
                    <uc.icon size={20} strokeWidth={1.75} />
                  </div>
                  <div>
                    <h3
                      className="mb-2 text-lg font-semibold tracking-[-0.02em] text-foreground"
                      style={{ fontFamily: INTER }}
                    >
                      {uc.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {uc.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border px-6 py-20">
          <div className="mx-auto max-w-4xl">
            <div className="mb-16 text-center">
              <h2
                className="mb-4 text-3xl font-semibold tracking-[-0.03em] text-foreground md:text-4xl"
                style={{ fontFamily: INTER }}
              >
                营销团队为什么选择 Screenshot Studio
              
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {benefits.map((b) => (
                <div key={b.title} className={cardSurface}>
                  <h3
                    className="mb-2 text-lg font-semibold tracking-[-0.02em] text-foreground"
                    style={{ fontFamily: INTER }}
                  >
                    {b.title}
                  </h3>
                  <p className="text-muted-foreground">{b.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border px-6 py-16">
          <div className="mx-auto max-w-4xl">
            <h2
              className="mb-8 text-center text-2xl font-semibold tracking-[-0.03em] text-foreground"
              style={{ fontFamily: INTER }}
            >
              浏览功能
            
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {featureLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={chipLinkClassName}
                >
                  <span>
                    {link.label}
                  </span>
                  <ArrowRight01Icon
                    size={14}
                    strokeWidth={1.75}
                    className="size-3.5 shrink-0 text-muted-foreground/70 transition-colors group-hover:text-foreground"
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border px-6 py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2
              className="mb-4 text-3xl font-semibold tracking-[-0.03em] text-foreground md:text-4xl"
              style={{ fontFamily: INTER }}
            >
              几秒创建营销视觉图
            
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              永久免费。无需注册。无水印。
            
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
