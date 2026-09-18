import { Metadata } from "next";
import { Navigation } from "@/components/landing/Navigation";
import { Footer } from "@/components/landing/Footer";
import Link from "next/link";
import { OG_DEFAULTS } from "@/lib/seo/metadata";
import {
  PaintBoardIcon,
  ColorsIcon,
  PenTool01Icon,
  SmartPhone01Icon,
  Layers01Icon,
  EyeIcon,
  SparklesIcon,
} from "hugeicons-react";

export const metadata: Metadata = {
  title: "面向设计师的模型与截图工具",
  description:
    "面向 UI/UX 设计师的免费模型工具。用背景、浏览器边框和 3D 效果创建应用模型、UI 模型和作品集截图。无需注册。",
  keywords: [
    "screenshot tool for designers",
    "UI mockup creator",
    "design portfolio screenshots",
    "designer screenshot editor",
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
    title: "面向设计师的模型与截图工具",
    description:
      "用背景、浏览器边框和 3D 效果制作应用模型、UI 模型和作品集截图。免费，无需注册。",
    url: "/for/designers",
  },
  alternates: {
    canonical: "/for/designers",
  },
};

const ctaClassName =
  "relative inline-flex items-center justify-center rounded-md border-0 bg-[var(--nav-cta-bg)] px-6 py-2.5 text-base font-medium text-[var(--nav-cta-fg)] shadow-none transition-[transform,box-shadow] duration-150 ease-out [text-shadow:var(--nav-cta-text-shadow)] hover:shadow-[var(--nav-cta-hover-shadow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 active:scale-[0.97]";

const secondaryCtaClassName =
  "inline-flex items-center justify-center rounded-md px-6 py-2.5 text-base font-medium text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground active:scale-[0.99]";

const cardSurface =
  "rounded-2xl bg-card p-6 ring-1 ring-inset ring-border shadow-[var(--card-highlight-shadow)]";

const INTER =
  "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";

const useCases = [
  {
    icon: PaintBoardIcon,
    title: "作品集演示",
    description:
      "用专业模型和精美呈现展示你的 UI 设计",
  },
  {
    icon: ColorsIcon,
    title: "客户演示",
    description:
      "为客户评审和设计演示制作精致的模型",
  },
  {
    icon: PenTool01Icon,
    title: "设计系统",
    description:
      "用清晰、一致的视觉示例记录你的设计系统",
  },
  {
    icon: SmartPhone01Icon,
    title: "App Store 素材",
    description:
      "为 App Store 和 Play Store 商品页生成出色的截图",
  },
];

const features = [
  {
    icon: Layers01Icon,
    title: "高级图层",
    description: "完全掌控图层、阴影和视觉层次",
  },
  {
    icon: EyeIcon,
    title: "精准控制",
    description: "像素级精准调整，成就专业效果",
  },
  {
    icon: ColorsIcon,
    title: "配色方案",
    description: "适用于任何品牌的精美渐变和纯色",
  },
  {
    icon: SparklesIcon,
    title: "导出选项",
    description: "多种格式的高分辨率导出",
  },
];

export default function ForDesignersPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-4xl text-center">
            <p
              className="mb-6 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground"
              style={{ fontFamily: INTER }}
            >
              专为设计师
            
            </p>
            <h1
              className="mb-6 text-5xl font-semibold tracking-[-0.04em] text-foreground md:text-6xl"
              style={{ fontFamily: INTER }}
            >
              符合你标准的设计工具
            
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-muted-foreground">
              用设计师要求的精确度和控制力，制作值得放进作品集的截图和模型。品质绝不妥协。
            
            </p>
            <div className="mb-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/" className={ctaClassName}>
                免费开始设计
              
              </Link>
              <Link href="/features" className={secondaryCtaClassName}>
                查看全部功能
              
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border py-20">
        <div className="container mx-auto px-6">
          <div className="mb-16 text-center">
            <h2
              className="mb-4 text-3xl font-semibold tracking-[-0.03em] text-foreground md:text-4xl"
              style={{ fontFamily: INTER }}
            >
              适配各种设计流程
            
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              从客户提案到作品集，我们都能帮你搞定
            
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
            {useCases.map((useCase) => (
              <div key={useCase.title} className={cardSurface}>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-foreground/[0.06] text-foreground ring-1 ring-inset ring-border">
                  <useCase.icon size={24} strokeWidth={1.75} />
                </div>
                <h3
                  className="mb-2 text-xl font-semibold tracking-[-0.02em] text-foreground"
                  style={{ fontFamily: INTER }}
                >
                  {useCase.title}
                </h3>
                <p className="text-muted-foreground">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border py-20">
        <div className="container mx-auto px-6">
          <div className="mb-16 text-center">
            <h2
              className="mb-4 text-3xl font-semibold tracking-[-0.03em] text-foreground md:text-4xl"
              style={{ fontFamily: INTER }}
            >
              设计师喜爱的功能
            
            </h2>
          </div>

          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.title} className={`${cardSurface} text-center`}>
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-foreground/[0.06] text-foreground ring-1 ring-inset ring-border">
                  <feature.icon size={24} strokeWidth={1.75} />
                </div>
                <h3
                  className="mb-2 text-lg font-semibold tracking-[-0.02em] text-foreground"
                  style={{ fontFamily: INTER }}
                >
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border py-20">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl">
            <h2
              className="mb-6 text-3xl font-semibold tracking-[-0.03em] text-foreground md:text-4xl"
              style={{ fontFamily: INTER }}
            >
              为 UI 和 UX 工作打造的模型工具
            
            </h2>
            <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
              <p>
                从 Figma、Sketch 或正在运行的应用中导出画面，拖进 Screenshot Studio，不到一分钟就能得到可直接用于演示的 UI 模型。选择一个浏览器边框或简洁的设备样式窗口，设置内边距和圆角，再从一百多种渐变和纯色背景中挑选。
              
              </p>
              <p>
                对于案例研究和 Dribbble 作品，可以把模型做 3D 倾斜来增加纵深感，或者把多个界面叠成一段动画演示并导出为视频。所有内容都以高分辨率渲染，让你的作品在作品集网站、Behance 和 LinkedIn 上都清晰锐利。
              
              </p>
              <p>
                Screenshot Studio 免费且开源，因此你可以把它用于客户项目，无需许可证、水印或账号。
              
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border py-20">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2
              className="mb-6 text-3xl font-semibold tracking-[-0.03em] text-foreground md:text-4xl"
              style={{ fontFamily: INTER }}
            >
              准备好提升你的设计演示了吗？
            
            </h2>
            <p className="mb-8 text-xl text-muted-foreground">
              加入成千上万设计师的行列，一起创作惊艳的视觉内容
            
            </p>
            <Link href="/" className={ctaClassName}>
              免费开始创作
            
            </Link>
          </div>
        </div>
      </section>

      <Footer brandName="Screenshot Studio" />
    </div>
  );
}
