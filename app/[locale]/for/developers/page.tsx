import { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/landing/Navigation";
import { Footer } from "@/components/landing/Footer";
import {
  Github01Icon,
  SourceCodeIcon,
  ComputerTerminal01Icon,
  DocumentCodeIcon,
  Layers01Icon,
  Video01Icon,
  ArrowRight01Icon,
} from "hugeicons-react";

export const metadata: Metadata = {
  title: "面向开发者的截图编辑器",
  description:
    "用背景、3D 效果和动画美化代码截图、终端输出和应用 UI。面向开发者的免费截图模型工具，无需注册。",
  keywords: [
    "screenshot editor for developers",
    "code screenshot beautifier",
    "developer portfolio images",
    "github readme images",
    "terminal screenshot tool",
    "code snippet beautifier",
    "developer screenshot tool",
    "project showcase images",
    "github readme screenshot maker",
    "app store screenshot generator",
    "documentation screenshot tool",
    "code screenshot with background",
    "api screenshot beautifier",
    "open source project screenshots",
  ],
  openGraph: {
    title: "面向开发者的截图编辑器",
    description:
      "美化代码截图、终端输出和项目 UI。面向开发者的免费浏览器工具。",
    url: "/for/developers",
  },
  alternates: {
    canonical: "/for/developers",
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
    icon: Github01Icon,
    title: "GitHub README 图片",
    description:
      "用 README 文件中精致的截图让开源项目脱颖而出。为应用截图添加背景和阴影，以最佳状态展示你的作品。",
  },
  {
    icon: SourceCodeIcon,
    title: "代码片段分享",
    description:
      "在 Twitter、LinkedIn 或开发者博客上分享漂亮的代码截图。添加渐变背景和设备边框，让你的代码在任何信息流中都出彩。",
  },
  {
    icon: ComputerTerminal01Icon,
    title: "终端与 CLI 输出",
    description:
      "把原始终端输出变成简洁的视觉图，用于文档和教程。添加 macOS 窗口边框和细腻阴影，呈现专业质感。",
  },
  {
    icon: DocumentCodeIcon,
    title: "技术博客文章",
    description:
      "为 dev.to、Hashnode 或个人博客制作抢眼的头图和文内截图。让所有内容保持一致的风格。",
  },
  {
    icon: Layers01Icon,
    title: "作品集与案例",
    description:
      "用 3D 透视模型和专业样式展示你的项目。让你的作品以应有的方式被看见。",
  },
  {
    icon: Video01Icon,
    title: "演示视频与 GIF",
    description:
      "用缩放、平移和转场效果制作应用的动态演示。导出为 MP4 或 GIF，用于问题跟踪器和拉取请求。",
  },
];

const workflows = [
  {
    title: "从剪贴板粘贴",
    description:
      "用系统快捷键截图，然后直接 Cmd+V 粘贴到编辑器。无需先保存文件。",
  },
  {
    title: "拖放",
    description:
      "从文件管理器把任意图片文件直接拖到画布上。支持 PNG、JPG、WebP。",
  },
  {
    title: "一键预设",
    description:
      "选一个符合你风格的预设。暗色渐变、极简白色，或鲜艳色彩。几秒搞定。",
  },
];

const reasons = [
  {
    title: "开源",
    description:
      "在 GitHub 上完全开源。可查看代码、参与贡献或自行托管。",
  },
  {
    title: "隐私优先",
    description:
      "编辑在浏览器中进行。导入的图片不会被上传即可编辑，导出压缩会返回处理完成的图片，不会对其做任何存储。",
  },
  {
    title: "快速轻量",
    description:
      "无需下载大型文件，也不用装 Electron 应用。打开一个浏览器标签页就能开始编辑。",
  },
];

const featureLinks = [
  { href: "/features/screenshot-beautifier", label: "截图美化" },
  { href: "/features/animation-maker", label: "动画制作" },
  { href: "/features/3d-effects", label: "3D 效果" },
  { href: "/features/social-media-graphics", label: "社交媒体图片" },
];

export default function ForDevelopersPage() {
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
            name: "For Developers",
            item: "https://www.screenshot-studio.com/for/developers",
          },
        ],
      },
      {
        "@type": "SoftwareApplication",
        name: "Screenshot Studio for Developers",
        applicationCategory: "DesignApplication",
        operatingSystem: "Web Browser",
        description:
          "Free screenshot editor built for developers. Beautify code screenshots, terminal output, and project UIs for READMEs, blogs, and portfolios.",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        featureList: [
          "Code screenshot beautification",
          "Terminal window frames",
          "GitHub README images",
          "3D perspective mockups",
          "Animation and video export",
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
              专为开发者
            
            </p>
            <h1
              className="mb-6 text-4xl font-semibold tracking-[-0.04em] text-foreground md:text-6xl"
              style={{ fontFamily: INTER }}
            >
              面向开发者的截图编辑器
            
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
              让你的代码、项目和作品集看起来更专业。为任意截图添加背景、设备边框、3D 效果和动画。在浏览器中免费使用。
            
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/" className={ctaClassName}>
                打开编辑器
              
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
                开发者如何使用 Screenshot Studio
              
              </h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                从 README 文件到会议演讲，让每一张截图都发挥作用。
              
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
                契合你的工作流
              
              </h2>
              <p className="text-muted-foreground">
                无需账号、无需安装、没有冗余。只有浏览器里一个快速的编辑器。
              
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {workflows.map((w, i) => (
                <div key={w.title} className="text-center">
                  <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-md bg-primary text-base font-semibold text-primary-foreground">
                    {i + 1}
                  </div>
                  <h3
                    className="mb-2 text-lg font-semibold tracking-[-0.02em] text-foreground"
                    style={{ fontFamily: INTER }}
                  >
                    {w.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{w.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border px-6 py-20">
          <div className="mx-auto max-w-4xl">
            <h2
              className="mb-12 text-center text-3xl font-semibold tracking-[-0.03em] text-foreground"
              style={{ fontFamily: INTER }}
            >
              开发者为什么选择 Screenshot Studio
            
            </h2>
            <div className="space-y-6">
              {reasons.map((reason) => (
                <div key={reason.title} className="flex gap-4">
                  <div className="mt-3 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  <div>
                    <h3
                      className="mb-1 font-semibold tracking-[-0.02em] text-foreground"
                      style={{ fontFamily: INTER }}
                    >
                      {reason.title}
                    </h3>
                    <p className="text-muted-foreground">{reason.description}</p>
                  </div>
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
              交付更好看的项目
            
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
