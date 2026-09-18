import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight01Icon,
  ColorsIcon,
  CubeIcon,
  Download04Icon,
  Layers01Icon,
  MagicWand01Icon,
  TextFontIcon,
  Video01Icon,
} from "hugeicons-react";
import { Navigation } from "@/components/landing/Navigation";
import { Footer } from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "免费在线截图编辑器",
  description:
    "免费在线截图编辑器：用渐变背景、浏览器模型、阴影、3D 效果和动画美化截图。无需注册，无水印。",
  keywords: [
    "screenshot editor online free",
    "free screenshot editor",
    "online screenshot editor",
    "screenshot beautifier free",
    "edit screenshots online",
    "free screenshot tool",
    "screenshot background editor",
    "beautify screenshots online free",
    "screenshot editor no signup",
    "free image editor for screenshots",
    "pika style alternative free",
    "shots.so alternative free",
    "screenshot mockup generator free",
    "browser mockup tool online",
    "screenshot wrapper no watermark",
    "screenshot editor online free",
    "best screenshot editor online",
    "screenshot editor without watermark",
    "screenshot editor online free without watermark",
    "screenshot editor no download",
    "uizard screenshot editor alternative",
    "add gradient background to screenshot",
    "screenshot shadow and border editor",
  ],
  openGraph: {
    title: "免费在线截图编辑器 - Screenshot Studio",
    description:
      "用 100+ 种背景、3D 效果和动画即刻美化截图。免费，无需注册。",
    url: "/free-screenshot-editor",
  },
  alternates: {
    canonical: "/free-screenshot-editor",
  },
};

const INTER =
  'Inter, "Inter Fallback", Arial, Helvetica, sans-serif';

const ctaClassName =
  "relative inline-flex items-center justify-center rounded-md border-0 bg-[var(--nav-cta-bg)] px-6 py-2.5 text-base font-medium text-[var(--nav-cta-fg)] shadow-none transition-[transform,box-shadow] duration-150 ease-out [text-shadow:var(--nav-cta-text-shadow)] hover:shadow-[var(--nav-cta-hover-shadow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 active:scale-[0.97]";

const secondaryCtaClassName =
  "inline-flex items-center justify-center rounded-md px-6 py-2.5 text-base font-medium text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground active:scale-[0.99]";

const cardSurface =
  "rounded-2xl bg-card ring-1 ring-border shadow-[var(--card-edge-shadow)]";

const capabilities = [
  {
    icon: ColorsIcon,
    title: "100+ 背景",
    description:
      "渐变、纯色、网格背景和自定义上传。用专业的背景让任何截图都出彩。",
  },
  {
    icon: MagicWand01Icon,
    title: "阴影与效果",
    description:
      "逼真的投影，模糊、扩散、偏移和颜色均可自定义。一键添加层次感。",
  },
  {
    icon: Layers01Icon,
    title: "设备边框",
    description:
      "把截图包进 macOS、Windows、Arc 或 Polaroid 边框。非常适合产品营销。",
  },
  {
    icon: CubeIcon,
    title: "3D 透视",
    description:
      "用实时 3D 变换进行倾斜、旋转和缩放。为演示文稿打造吸引眼球的角度。",
  },
  {
    icon: Video01Icon,
    title: "动画与视频导出",
    description:
      "用 20+ 个预设添加关键帧动画，并导出为 MP4、WebM 或 GIF。让静态截图动起来。",
  },
  {
    icon: TextFontIcon,
    title: "文字与叠加层",
    description:
      "用 25+ 种字体添加字幕、标签和标注。为教程叠加贴纸和箭头。",
  },
  {
    icon: Download04Icon,
    title: "高分辨率导出",
    description:
      "最高可导出 5x 分辨率的 PNG 或 JPG。为任何平台提供适配视网膜屏的图片。",
  },
] as const;

const howItWorks = [
  {
    step: "1",
    title: "上传你的截图",
    desc: "拖放任意图片或从剪贴板粘贴。支持 PNG、JPG、WebP 等格式。",
  },
  {
    step: "2",
    title: "美化",
    desc: "选择背景、添加阴影、应用 3D 变换，或直接选用一键预设。",
  },
  {
    step: "3",
    title: "导出与分享",
    desc: "以高分辨率 PNG/JPG 下载，或将动画导出为 MP4、WebM 或 GIF。",
  },
];

const useCases = [
  {
    title: "SaaS 产品营销",
    description:
      "把原始的产品截图变成精致的首屏图，用于落地页、提案演示和广告素材。",
  },
  {
    title: "社交媒体帖子",
    description:
      "几秒钟用应用截图制作令人停下滑动的 Twitter、LinkedIn 和 Instagram 帖子。",
  },
  {
    title: "开发者作品集",
    description:
      "用突出你最佳作品的专业截图展示你的项目。",
  },
  {
    title: "文档与教程",
    description:
      "为帮助文档、博客文章和分步指南标注并美化截图。",
  },
  {
    title: "App Store 列表",
    description:
      "生成美观的预览图，提升下载量和转化率。",
  },
  {
    title: "客户演示",
    description:
      "在提案和报告中使用精致的模型代替原始截图，让客户印象深刻。",
  },
];

const faqs = [
  {
    q: "这款截图编辑器真的免费吗？",
    a: "是的，Screenshot Studio 100% 免费，没有隐藏费用、付费档位或水印。所有功能对所有人开放。导出不限次数、完整分辨率、没有任何限制。",
  },
  {
    q: "我需要安装任何东西吗？",
    a: "不用。Screenshot Studio 完全在浏览器中运行，无需下载或安装任何东西。打开编辑器就能立刻开始编辑截图。",
  },
  {
    q: "需要注册账号吗？",
    a: "无需注册。我们重视你的隐私：不收集个人数据，也不要求注册。打开编辑器即可开始创作。",
  },
  {
    q: "支持哪些图片格式？",
    a: "你可以上传 PNG、JPG、WebP 以及大多数常见图片格式。可导出为高分辨率 PNG（保留透明度）或 JPG。若需要动画，可导出为 MP4、WebM 或 GIF。",
  },
  {
    q: "我能将它用于商业项目吗？",
    a: "当然可以。你创建的图片没有使用限制。可用于 SaaS 营销、社交媒体、客户项目、应用商店或任何其他用途。",
  },
  {
    q: "它与 Canva 或 Figma 相比如何？",
    a: "Screenshot Studio 专为截图美化而生。与通用编辑器不同，它提供一键预设、3D 透视变换、动画时间轴和视频导出，全部针对截图到社交媒体的工作流做了优化。",
  },
];

const featureLinks = [
  {
    href: "/features/screenshot-beautifier",
    label: "截图美化",
  },
  {
    href: "/features/animation-maker",
    label: "动画制作",
  },
  {
    href: "/features/3d-effects",
    label: "3D 效果",
  },
  {
    href: "/features/social-media-graphics",
    label: "社交媒体图片",
  },
] as const;

export default function FreeScreenshotEditorPage() {
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
            name: "Free Screenshot Editor",
            item: "https://www.screenshot-studio.com/free-screenshot-editor",
          },
        ],
      },
      {
        "@type": "SoftwareApplication",
        name: "Screenshot Studio - Free Screenshot Editor Online",
        description:
          "Free screenshot editor online. Beautify screenshots with backgrounds, shadows, 3D effects, animations, and video export. No signup required.",
        url: "https://www.screenshot-studio.com/free-screenshot-editor",
        applicationCategory: "DesignApplication",
        applicationSubCategory: "Screenshot Editor",
        operatingSystem: "Any (Web Browser)",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        featureList: [
          "100+ gradient backgrounds",
          "Custom shadow effects",
          "3D perspective transforms",
          "Device frames (macOS, Windows, Arc)",
          "Text and image overlays",
          "20+ animation presets",
          "Video export (MP4, WebM, GIF)",
          "High-res export up to 5x",
          "No signup required",
          "No watermarks",
        ],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          ratingCount: "150",
          bestRating: "5",
        },
      },
      {
        "@type": "HowTo",
        name: "How to Edit Screenshots Online for Free",
        description:
          "Beautify any screenshot in 3 easy steps using Screenshot Studio's free online editor.",
        totalTime: "PT1M",
        tool: {
          "@type": "HowToTool",
          name: "Screenshot Studio",
        },
        step: howItWorks.map((item, index) => ({
          "@type": "HowToStep",
          name: item.title,
          text: item.desc,
          position: index + 1,
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.a,
          },
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
      <Navigation brandName="Screenshot Studio" />

      <main className="flex-1">
        <section className="px-6 pb-20 pt-32">
          <div className="mx-auto max-w-4xl text-center">
            <span className="mb-6 inline-flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <span>100% 免费</span>
              <span className="h-3 w-px bg-border" aria-hidden />
              <span>无需注册</span>
              <span className="h-3 w-px bg-border" aria-hidden />
              <span>无水印</span>
            </span>
            <h1
              className="mb-6 text-4xl font-semibold tracking-[-0.03em] text-foreground md:text-6xl"
              style={{ fontFamily: INTER }}
            >
              免费在线截图编辑器
            
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
              几秒内美化任何截图。添加背景、阴影、3D 效果和动画，然后导出为图片或视频。无需注册，无需下载。
            
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/" className={ctaClassName}>
                打开免费编辑器
              
              </Link>
              <Link href="/features" className={secondaryCtaClassName}>
                查看全部功能
              
              </Link>
            </div>
          </div>
        </section>

        <section className="border-y border-border px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <h2
                className="mb-4 text-3xl font-semibold tracking-[-0.03em] text-foreground md:text-4xl"
                style={{ fontFamily: INTER }}
              >
                编辑截图所需的一切
              
              </h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                一款完全在浏览器中运行的截图编辑器。没有臃肿的软件，没有学习成本。只有真正好用的强大工具。
              
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {capabilities.map((cap, index) => (
                <div
                  key={cap.title}
                  className={`flex gap-4 p-6 ${cardSurface} ${
                    index === capabilities.length - 1
                      ? "md:col-span-2 md:max-w-md md:justify-self-center lg:col-span-1 lg:col-start-2 lg:max-w-none lg:justify-self-stretch"
                      : ""
                  }`}
                >
                  <cap.icon
                    className="size-6 shrink-0 text-foreground"
                    aria-hidden
                  />
                  <div>
                    <h3 className="mb-2 text-base font-semibold text-foreground">
                      {cap.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{cap.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="mx-auto max-w-4xl">
            <div className="mb-16 text-center">
              <h2
                className="mb-4 text-3xl font-semibold tracking-[-0.03em] text-foreground md:text-4xl"
                style={{ fontFamily: INTER }}
              >
                3 步做出专业截图
              
              </h2>
              <p className="text-muted-foreground">
                没有学习成本。无需教程。
              
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {howItWorks.map((item) => (
                <div key={item.step} className="text-center">
                  <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-md bg-primary text-base font-semibold text-primary-foreground">
                    {item.step}
                  </div>
                  <h3 className="mb-2 text-base font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-border px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <h2
                className="mb-4 text-3xl font-semibold tracking-[-0.03em] text-foreground md:text-4xl"
                style={{ fontFamily: INTER }}
              >
                适用于各种场景
              
              </h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                无论你是开发者、营销人员、设计师还是内容创作者，Screenshot Studio 都能满足你的需求。
              
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {useCases.map((uc) => (
                <div key={uc.title} className={`p-6 ${cardSurface}`}>
                  <h3 className="mb-2 font-semibold text-foreground">{uc.title}</h3>
                  <p className="text-sm text-muted-foreground">{uc.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="mx-auto max-w-3xl">
            <div className="mb-16 text-center">
              <h2
                className="mb-4 text-3xl font-semibold tracking-[-0.03em] text-foreground md:text-4xl"
                style={{ fontFamily: INTER }}
              >
                常见问题
              
              </h2>
              <p className="text-muted-foreground">
                关于我们的免费截图编辑器，你需要了解的一切。
              
              </p>
            </div>

            <div className="space-y-6">
              {faqs.map((faq) => (
                <div
                  key={faq.q}
                  className="border-b border-border pb-6 last:border-b-0"
                >
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    {faq.q}
                  </h3>
                  <p className="text-muted-foreground">{faq.a}</p>
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
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {featureLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex items-center justify-between rounded-md bg-foreground/[0.04] px-4 py-3 text-sm font-medium text-foreground/90 ring-1 ring-border transition-colors hover:bg-foreground/[0.08] hover:text-foreground"
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
          <div className="mx-auto max-w-3xl text-center">
            <h2
              className="mb-4 text-3xl font-semibold tracking-[-0.03em] text-foreground md:text-4xl"
              style={{ fontFamily: INTER }}
            >
              免费开始编辑截图
            
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              无需注册。无需下载。没有水印。打开编辑器即可创作。
            
            </p>
            <Link href="/" className={ctaClassName}>
              打开免费截图编辑器
            
            </Link>
          </div>
        </section>
      </main>

      <Footer brandName="Screenshot Studio" />
    </div>
  );
}
