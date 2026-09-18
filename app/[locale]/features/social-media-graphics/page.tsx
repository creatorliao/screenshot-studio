import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight01Icon,
  InstagramIcon,
  Linkedin01Icon,
  NewTwitterIcon,
  Share08Icon,
} from "hugeicons-react";
import { Navigation } from "@/components/landing/Navigation";
import { Footer } from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "免费社交媒体图片制作工具",
  description:
    "为 Twitter、LinkedIn 和 Instagram 制作社交媒体图形。把截图变成尺寸完美的可分享帖子。免费，无需注册。",
  keywords: [
    "social media graphics maker",
    "twitter card generator",
    "linkedin post maker",
    "instagram post creator",
    "social media image editor",
    "free graphics maker",
    "social media templates",
    "twitter post image maker",
    "og image generator free",
    "social media screenshot tool",
    "product hunt screenshot maker",
    "social media mockup generator",
    "twitter banner maker free",
  ],
  openGraph: {
    title: "免费社交媒体图片制作工具 - 制作出色的帖子",
    description:
      "制作专业的社交媒体图形。适配每个平台的完美尺寸。",
    url: "/features/social-media-graphics",
  },
  alternates: {
    canonical: "/features/social-media-graphics",
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

const platforms = [
  {
    icon: NewTwitterIcon,
    name: "Twitter / X",
    dimensions: "1200 x 675px",
    description:
      "制作抢眼的 Twitter 卡片和帖子图片，提升互动率。",
  },
  {
    icon: Linkedin01Icon,
    name: "LinkedIn",
    dimensions: "1200 x 627px",
    description:
      "为 LinkedIn 帖子制作专业图形，树立权威形象。",
  },
  {
    icon: InstagramIcon,
    name: "Instagram",
    dimensions: "1080 x 1080px",
    description: "在拥挤的信息流中脱颖而出的方形帖子和快拍。",
  },
  {
    icon: Share08Icon,
    name: "任意平台",
    dimensions: "Custom sizes",
    description:
      "可按任意尺寸导出，用于博客、演示或文档。",
  },
] as const;

const benefits = [
  {
    title: "无需设计技能",
    description:
      "我们直观易用的编辑器让你几分钟就能轻松做出专业图形。",
  },
  {
    title: "品牌形象统一",
    description:
      "使用自定义背景和配色，让所有帖子的视觉与品牌形象保持一致。",
  },
  {
    title: "高分辨率输出",
    description:
      "最高可导出 5x 分辨率，在任何设备上都清晰锐利。",
  },
  {
    title: "零成本",
    description:
      "无水印创建无限图形。100% 永久免费。",
  },
];

const createItems = [
  {
    title: "产品公告",
    description:
      "用能带来点击的漂亮截图分享新功能。",
  },
  {
    title: "教程截图",
    description:
      "制作专业的方法教程内容，树立权威。",
  },
  {
    title: "代码片段",
    description:
      "用开发者喜爱的漂亮背景分享代码。",
  },
];

const relatedLinks = [
  { href: "/features/screenshot-beautifier", label: "截图美化" },
  { href: "/features/animation-maker", label: "动画制作" },
  { href: "/features/3d-effects", label: "3D 效果" },
] as const;

export default function SocialMediaGraphicsPage() {
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
        name: "Social Media Graphics",
        item: "https://www.screenshot-studio.com/features/social-media-graphics",
      },
    ],
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Screenshot Studio - Social Media Graphics Maker",
    applicationCategory: "DesignApplication",
    operatingSystem: "Web Browser",
    description:
      "Free online tool to create professional social media graphics for Twitter, LinkedIn, and Instagram.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Twitter card generator",
      "LinkedIn post maker",
      "Instagram graphics",
      "Custom dimensions",
      "High-resolution export",
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <Navigation brandName="Screenshot Studio" />

      <main className="flex-1">
        <section className="px-6 pb-20 pt-32">
          <div className="mx-auto max-w-4xl text-center">
            <h1
              className="mb-6 text-4xl font-semibold tracking-[-0.03em] text-foreground md:text-6xl"
              style={{ fontFamily: INTER }}
            >
              社交媒体图片制作器
            
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
              几秒钟为 Twitter、LinkedIn 和 Instagram 制作出色的图形。把截图变成能提升互动率的可分享内容。
            
            </p>
            <div className="flex flex-col items-center">
              <Link href="/" className={ctaClassName}>
                免费创建图形
              
              </Link>
              <p className="mt-4 inline-flex flex-wrap items-center justify-center gap-2 text-sm font-medium text-muted-foreground/70">
                <span>无需注册</span>
                <span className="h-3 w-px bg-border" aria-hidden />
                <span>无水印</span>
                <span className="h-3 w-px bg-border" aria-hidden />
                <span>完全免费</span>
              </p>
            </div>
          </div>
        </section>

        <section className="border-y border-border px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <h2
              className="mb-4 text-center text-3xl font-semibold tracking-[-0.03em] text-foreground"
              style={{ fontFamily: INTER }}
            >
              适配每个平台的完美尺寸
            
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
              用合适的宽高比和分辨率，为每个社交平台制作优化的图形。
            
            </p>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {platforms.map((platform) => (
                <div key={platform.name} className={`p-6 ${cardSurface}`}>
                  <platform.icon
                    className="mb-4 size-8 text-foreground"
                    aria-hidden
                  />
                  <h3 className="mb-1 text-lg font-semibold text-foreground">
                    {platform.name}
                  </h3>
                  <p className="mb-2 text-sm text-foreground/90">
                    {platform.dimensions}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {platform.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <h2
              className="mb-12 text-center text-3xl font-semibold tracking-[-0.03em] text-foreground"
              style={{ fontFamily: INTER }}
            >
              创作者为什么选择 Screenshot Studio
            
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="flex gap-4">
                  <div
                    className="mt-3 size-2 shrink-0 rounded-full bg-primary"
                    aria-hidden
                  />
                  <div>
                    <h3 className="mb-2 text-lg font-semibold text-foreground">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
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
              你能创作什么？
            
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {createItems.map((item) => (
                <div key={item.title} className={`p-6 ${cardSurface}`}>
                  <h3 className="mb-2 font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
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
              开始制作社交媒体图片
            
            </h2>
            <p className="mb-8 text-muted-foreground">
              无需设计经验。30 秒即可开始创作。
            
            </p>
            <Link href="/" className={ctaClassName}>
              立即免费试用
            
            </Link>
          </div>
        </section>
      </main>

      <Footer brandName="Screenshot Studio" />
    </div>
  );
}
