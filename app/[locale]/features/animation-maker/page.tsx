import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight01Icon,
  MagicWand01Icon,
  PlayIcon,
  SparklesIcon,
  Video01Icon,
} from "hugeicons-react";
import { Navigation } from "@/components/landing/Navigation";
import { Footer } from "@/components/landing/Footer";
import { OG_DEFAULTS } from "@/lib/seo/metadata";

export const metadata: Metadata = {
  title: "免费截图动画制作工具",
  description:
    "从截图创建出色的动画。用缩放、平移和淡入淡出效果搭建幻灯片。可导出为视频或 GIF。免费的浏览器端动画工具。",
  keywords: [
    "animation maker",
    "screenshot animation",
    "slideshow maker",
    "animated slideshow",
    "screenshot to video",
    "zoom animation",
    "pan animation",
    "ken burns effect",
    "free animation tool",
    "animated screenshot maker",
    "product demo animation",
    "screenshot gif maker",
    "app preview video maker",
    "animated mockup generator",
    "screenshot video export free",
  ],
  openGraph: {
    ...OG_DEFAULTS,
    title: "免费动画制作工具 - 创建动画截图与幻灯片",
    description:
      "从截图创建出色的动画。缩放、平移和淡入淡出效果，支持视频导出。",
    url: "/features/animation-maker",
  },
  alternates: {
    canonical: "/features/animation-maker",
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

const animations = [
  {
    name: "放大",
    description: "戏剧化的缩放效果，把注意力引向关键细节",
  },
  {
    name: "缩小",
    description: "从聚焦的起点揭示完整画面",
  },
  {
    name: "向左/向右平移",
    description: "在宽幅截图上平滑横向移动",
  },
  {
    name: "Ken Burns",
    description: "经典纪录片风格的缓慢缩放与平移组合",
  },
  {
    name: "上下倾斜",
    description: "长截图和长页面的垂直平移",
  },
  {
    name: "淡入淡出过渡",
    description: "多张幻灯片之间优雅的交叉淡化",
  },
];

const features = [
  {
    icon: MagicWand01Icon,
    title: "20+ 动画预设",
    description:
      "一键动画，包括缩放、平移、倾斜、旋转和 Ken Burns 效果。",
  },
  {
    icon: PlayIcon,
    title: "时间轴编辑器",
    description:
      "用可视化时间轴精细调整时序。调整时长、缓动和关键帧。",
  },
  {
    icon: Video01Icon,
    title: "视频导出",
    description:
      "导出为 MP4 视频或动图 GIF。非常适合社交媒体和演示。",
  },
  {
    icon: SparklesIcon,
    title: "幻灯片生成器",
    description:
      "把多张截图合成带转场的动画幻灯片。",
  },
] as const;

const useCases = [
  {
    title: "产品演示",
    description:
      "制作吸引人的产品演示，用流畅的缩放和平移动画突出关键功能。",
  },
  {
    title: "社交媒体内容",
    description:
      "用动态帖子在 Twitter、LinkedIn 等拥挤的信息流中脱颖而出，抓住注意力。",
  },
  {
    title: "教程视频",
    description:
      "把截图组合成带清晰转场的动画幻灯片，制作分步教程。",
  },
  {
    title: "作品集展示",
    description:
      "用电影感的 Ken Burns 效果展示你的作品，增添精致与专业感。",
  },
];

const howToSteps = [
  {
    step: "1",
    title: "上传你的截图",
    description:
      "添加一张或多张截图，制作幻灯片或为单张图片添加动画。",
  },
  {
    step: "2",
    title: "选择动画预设",
    description:
      "从 zoom、pan、Ken Burns 等 20+ 预设中选择，或用时间轴创建自定义动画。",
  },
  {
    step: "3",
    title: "导出为视频",
    description:
      "下载为 MP4 视频或 GIF。直接分享到社交媒体或嵌入任何位置。",
  },
];

const relatedLinks = [
  { href: "/features/screenshot-beautifier", label: "截图美化" },
  { href: "/features/social-media-graphics", label: "社交媒体图片" },
  { href: "/features/3d-effects", label: "3D 效果" },
] as const;

export default function AnimationMakerPage() {
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
        name: "Animation Maker",
        item: "https://www.screenshot-studio.com/features/animation-maker",
      },
    ],
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: "Screenshot Studio - Animation Maker",
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Web Browser",
        description:
          "Free online tool to create animated screenshots and slideshows with zoom, pan, and fade effects.",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        featureList: [
          "Zoom animations",
          "Pan effects",
          "Ken Burns effect",
          "Timeline editor",
          "Video export",
          "Slideshow builder",
        ],
      },
      {
        "@type": "HowTo",
        name: "How to Create Screenshot Animations",
        description:
          "Create stunning animations from screenshots in 3 steps using Screenshot Studio's free animation maker.",
        totalTime: "PT2M",
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
              免费截图动画制作工具
            
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
              用出色的动画让截图栩栩如生。制作缩放效果、流畅平移和动画幻灯片，导出为视频或 GIF。
            
            </p>
            <div className="flex flex-col items-center">
              <Link href="/" className={ctaClassName}>
                免费创建动画
              
              </Link>
              <p className="mt-4 inline-flex flex-wrap items-center justify-center gap-2 text-sm font-medium text-muted-foreground/70">
                <span>无需注册</span>
                <span className="h-3 w-px bg-border" aria-hidden />
                <span>无水印</span>
                <span className="h-3 w-px bg-border" aria-hidden />
                <span>无限次导出</span>
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
              强大的动画工具
            
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
              动画效果
            
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
              从我们的专业动画预设库中挑选，或用时间轴编辑器自定义。
            
            </p>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {animations.map((animation) => (
                <div key={animation.name} className={`p-6 ${cardSurface}`}>
                  <h3 className="mb-2 font-semibold text-foreground">
                    {animation.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {animation.description}
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
              适用场景
            
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {useCases.map((useCase) => (
                <div key={useCase.title} className={`p-6 ${cardSurface}`}>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    {useCase.title}
                  </h3>
                  <p className="text-muted-foreground">{useCase.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto max-w-4xl">
            <h2
              className="mb-12 text-center text-3xl font-semibold tracking-[-0.03em] text-foreground"
              style={{ fontFamily: INTER }}
            >
              如何创建动画
            
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

        <section className="border-y border-border px-6 py-16">
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

        <section className="px-6 py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h2
              className="mb-4 text-3xl font-semibold tracking-[-0.03em] text-foreground"
              style={{ fontFamily: INTER }}
            >
              立即开始创作动画
            
            </h2>
            <p className="mb-8 text-muted-foreground">
              无需视频剪辑经验。几分钟即可做出专业动画。
            
            </p>
            <Link href="/" className={ctaClassName}>
              免费试用动画制作器
            
            </Link>
          </div>
        </section>
      </main>

      <Footer brandName="Screenshot Studio" />
    </div>
  );
}
