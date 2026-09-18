import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight01Icon,
  ColorsIcon,
  Download04Icon,
  Link01Icon,
  SourceCodeIcon,
} from "hugeicons-react";
import { Navigation } from "@/components/landing/Navigation";
import { Footer } from "@/components/landing/Footer";
import { OG_DEFAULTS } from "@/lib/seo/metadata";

export const metadata: Metadata = {
  title: "代码转图片生成器：免费代码截图",
  description:
    "免费代码转图片工具：选择语法主题、渐变背景、行号和窗口边框，然后导出清晰的 PNG。ray.so 和 carbon.now.sh 的免费替代品。无需注册。",
  keywords: [
    "code to image",
    "code snippet screenshot",
    "code screenshot generator",
    "code to png",
    "ray.so alternative",
    "carbon alternative",
    "carbon.now.sh alternative",
    "syntax highlighting screenshot",
    "beautiful code screenshots",
    "code image generator free",
    "share code as image",
    "code snippet to image",
    "programming screenshot tool",
  ],
  openGraph: {
    ...OG_DEFAULTS,
    title: "代码转图片生成器 - Screenshot Studio",
    description:
      "把代码变成精美、可分享的图片。主题、渐变、行号和窗口边框。免费，无需注册。",
    url: "/features/code-snippets",
  },
  alternates: {
    canonical: "/features/code-snippets",
  },
};

const INTER = 'Inter, "Inter Fallback", Arial, Helvetica, sans-serif';

const ctaClassName =
  "relative inline-flex items-center justify-center rounded-md border-0 bg-[var(--nav-cta-bg)] px-6 py-2.5 text-base font-medium text-[var(--nav-cta-fg)] shadow-none transition-[transform,box-shadow] duration-150 ease-out [text-shadow:var(--nav-cta-text-shadow)] hover:shadow-[var(--nav-cta-hover-shadow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 active:scale-[0.97]";

const cardSurface =
  "rounded-2xl bg-card ring-1 ring-border shadow-[var(--card-edge-shadow)]";

const chipLinkClassName =
  "group flex items-center justify-between rounded-md bg-foreground/[0.04] px-4 py-3 text-sm font-medium text-foreground/90 ring-1 ring-border transition-colors hover:bg-foreground/[0.08] hover:text-foreground";

const features = [
  {
    icon: SourceCodeIcon,
    title: "14 种语法主题",
    description:
      "Midnight、Sunset、Candy 等。可自动检测你的语言，也可从 20+ 种中手动选择。",
  },
  {
    icon: ColorsIcon,
    title: "渐变、图片与图案",
    description:
      "每个主题都自带渐变，你也可以从数十种渐变、图片背景和图案中挑选，或者关闭背景以获得透明 PNG。",
  },
  {
    icon: Download04Icon,
    title: "行号与窗口边框",
    description:
      "可切换行号、macOS 风格标题栏或不显示标题栏，并调整边框尺寸以适配你的代码。",
  },
  {
    icon: Link01Icon,
    title: "可分享链接与 2x/4x 导出",
    description:
      "所有设置都保存在 URL 中，因此你可以分享链接，或导出 2x 或 4x 的 PNG。",
  },
] as const;

const howToSteps = [
  {
    step: "1",
    title: "粘贴或输入你的代码",
    description:
      "拖入一段代码片段，或直接在代码卡片中输入。格式和缩进都会保留。",
  },
  {
    step: "2",
    title: "选择主题和背景",
    description:
      "选择语法主题、渐变、内边距，以及是否显示行号或窗口边框。",
  },
  {
    step: "3",
    title: "导出或分享",
    description:
      "下载 2x PNG、把图片复制到剪贴板，或复制一个能重新打开你这份设计的链接。",
  },
];

const faqs = [
  {
    question: "代码转图片生成器免费吗？",
    answer:
      "是的。完全免费，无需注册、没有水印，也没有付费档位。",
  },
  {
    question: "这与 ray.so 或 carbon.now.sh 有何不同？",
    answer:
      "它覆盖了相同的核心工作流、主题、渐变、行号和窗口边框，并内置于 Screenshot Studio 自己的编辑器中，支持可分享链接，且无需注册账号。",
  },
  {
    question: "可以导出透明背景吗？",
    answer:
      '可以。导出前把背景设为“透明”，PNG 就不会有背景底色。',
  },
  {
    question: "支持哪些语言？",
    answer:
      "自动检测会自动识别最常用的语言，你也可以从 20+ 种语言中手动选择，包括 TypeScript、Python、Rust、Go 和 SQL。",
  },
  {
    question: "我的代码会被上传到什么地方吗？",
    answer:
      "代码卡片完全在浏览器中渲染和导出，因此你的代码不会被发送到服务器来生成图片。",
  },
];

const relatedLinks = [
  { href: "/code", label: "打开代码图片编辑器" },
  { href: "/features/screenshot-beautifier", label: "截图美化" },
  { href: "/features/browser-mockups", label: "浏览器模型" },
  { href: "/features/social-media-graphics", label: "社交媒体图片" },
  { href: "/features", label: "全部功能" },
] as const;

export default function CodeSnippetsFeaturePage() {
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
        name: "Code Images",
        item: "https://www.screenshot-studio.com/features/code-snippets",
      },
    ],
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: "Screenshot Studio - Code to Image",
        applicationCategory: "DesignApplication",
        operatingSystem: "Web Browser",
        description:
          "Free online tool that turns code into beautiful, shareable images with syntax themes, gradient backgrounds, and a window frame.",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        featureList: [
          "14 syntax highlighting themes",
          "Gradient, image, and pattern backgrounds plus transparent export",
          "Line numbers and macOS window frame",
          "Shareable links and 2x or 4x PNG export",
          "No signup required",
        ],
      },
      {
        "@type": "HowTo",
        name: "How to Turn Code Into an Image",
        description:
          "Create a shareable code screenshot in three steps using Screenshot Studio.",
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
              把代码变成精美图片
            
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
              选择主题、渐变背景、行号和窗口边框，然后导出清晰的 PNG 或分享链接。ray.so 和 carbon.now.sh 的免费替代品。
            
            </p>
            <div className="flex flex-col items-center">
              <Link href="/code" className={ctaClassName}>
                创建代码图片
              
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
              制作出色代码截图所需的一切
            
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
          <div className="mx-auto max-w-4xl">
            <h2
              className="mb-12 text-center text-3xl font-semibold tracking-[-0.03em] text-foreground"
              style={{ fontFamily: INTER }}
            >
              工作原理
            
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
          <div className="mx-auto max-w-3xl">
            <h2
              className="mb-12 text-center text-3xl font-semibold tracking-[-0.03em] text-foreground"
              style={{ fontFamily: INTER }}
            >
              常见问题
            
            </h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.question} className={`p-6 ${cardSurface}`}>
                  <h3 className="mb-2 font-semibold text-foreground">
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
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
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
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
              准备好把代码变成图片了吗？
            
            </h2>
            <p className="mb-8 text-muted-foreground">
              免费、快速，无需账户。
            
            </p>
            <Link href="/code" className={ctaClassName}>
              打开代码图片
            
            </Link>
          </div>
        </section>
      </main>

      <Footer brandName="Screenshot Studio" />
    </div>
  );
}
