import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight01Icon,
  CubeIcon,
  Layers01Icon,
  RotateClockwiseIcon,
  IdeaIcon,
} from "hugeicons-react";
import { Navigation } from "@/components/landing/Navigation";
import { Footer } from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "3D 截图效果与模型",
  description:
    "为截图添加惊艳的 3D 效果。透视倾斜、旋转、深度阴影和逼真光照。把扁平图片变成吸睛的 3D 模型。",
  keywords: [
    "free online 3d mockup generator",
    "3d mockup generator",
    "laptop mockup generator",
    "3d screenshot effects",
    "3d image editor",
    "perspective screenshot",
    "3d mockup generator",
    "screenshot tilt effect",
    "3d rotation effect",
    "image perspective tool",
    "free 3d effects",
    "3d product mockup free",
    "isometric screenshot maker",
    "perspective transform tool",
    "3d app screenshot",
    "hero image 3d effect",
    "landing page screenshot 3d",
  ],
  openGraph: {
    title: "免费 3D 截图效果 - 添加透视与纵深感",
    description:
      "为截图添加惊艳的 3D 效果。透视、旋转和逼真阴影。",
    url: "/features/3d-effects",
  },
  alternates: {
    canonical: "/features/3d-effects",
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

const effects = [
  {
    icon: CubeIcon,
    title: "3D 透视",
    description:
      "用透视变换增加层次感。让扁平的截图看起来像真实的产品图。",
  },
  {
    icon: RotateClockwiseIcon,
    title: "旋转与倾斜",
    description:
      "沿 X、Y、Z 轴旋转。打造引人注目的夸张角度。",
  },
  {
    icon: Layers01Icon,
    title: "深度阴影",
    description:
      "跟随 3D 变换的逼真阴影。模糊和距离可调。",
  },
  {
    icon: IdeaIcon,
    title: "光照效果",
    description:
      "随透视变化的模拟光照，呈现真实效果。",
  },
] as const;

const useCases = [
  {
    title: "App Store 截图",
    description:
      "用 3D 透视制作专业的应用预览图，提升下载量。",
  },
  {
    title: "落地页主图",
    description:
      "引人注目的主视觉图片，从动态角度展示你的产品。",
  },
  {
    title: "社交媒体帖子",
    description:
      "用能让人停下滚动的 3D 风格截图脱颖而出。",
  },
  {
    title: "产品模型",
    description:
      "无需昂贵的 3D 软件或设计技能，也能做出专业模型。",
  },
];

const whyPoints = [
  {
    title: "更高互动率",
    description:
      "在社交媒体帖子中，3D 图片的点击量比平面截图高 30%。",
  },
  {
    title: "专业外观",
    description:
      "无需聘请设计师或学习复杂的 3D 软件，也能提升质感。",
  },
  {
    title: "脱颖而出",
    description:
      "在所有人都用平面图片的拥挤信息流中，让你的内容脱颖而出。",
  },
];

const relatedLinks = [
  { href: "/features/screenshot-beautifier", label: "截图美化" },
  { href: "/features/social-media-graphics", label: "社交媒体图片" },
  { href: "/features/animation-maker", label: "动画制作" },
] as const;

export default function ThreeDEffectsPage() {
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
        name: "3D Effects",
        item: "https://www.screenshot-studio.com/features/3d-effects",
      },
    ],
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Screenshot Studio - 3D Effects",
    applicationCategory: "DesignApplication",
    operatingSystem: "Web Browser",
    description:
      "Free online tool to add 3D perspective, rotation, and depth effects to screenshots.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "3D perspective transforms",
      "X, Y, Z rotation",
      "Depth shadows",
      "Lighting effects",
      "Real-time preview",
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
              免费 3D 截图效果
            
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
              把平面的截图变成惊艳的 3D 视觉效果。无需任何设计技能，即可添加透视、旋转和逼真的阴影。
            
            </p>
            <div className="flex flex-col items-center">
              <Link href="/" className={ctaClassName}>
                免费添加 3D 效果
              
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
              3D 效果与变换
            
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {effects.map((effect) => (
                <div
                  key={effect.title}
                  className={`flex gap-4 p-6 ${cardSurface}`}
                >
                  <effect.icon
                    className="size-6 shrink-0 text-foreground"
                    aria-hidden
                  />
                  <div>
                    <h3 className="mb-2 text-lg font-semibold text-foreground">
                      {effect.title}
                    </h3>
                    <p className="text-muted-foreground">{effect.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto max-w-4xl">
            <h2
              className="mb-4 text-center text-3xl font-semibold tracking-[-0.03em] text-foreground"
              style={{ fontFamily: INTER }}
            >
              易用的控制项
            
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
              用简单的滑块调整 3D 效果。尝试不同透视时实时查看变化。
            
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "X 轴旋转",
                  description:
                    "前后倾斜，呈现戏剧化的透视效果",
                },
                {
                  title: "Y 轴旋转",
                  description: "左右旋转，展示不同角度",
                },
                {
                  title: "Z 轴旋转",
                  description: "旋转，打造富有创意的对角构图",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className={`p-6 text-center ${cardSurface}`}
                >
                  <h3 className="mb-2 font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-border px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <h2
              className="mb-12 text-center text-3xl font-semibold tracking-[-0.03em] text-foreground"
              style={{ fontFamily: INTER }}
            >
              适用场景
            
            </h2>
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

        <section className="px-6 py-16">
          <div className="mx-auto max-w-4xl">
            <h2
              className="mb-12 text-center text-3xl font-semibold tracking-[-0.03em] text-foreground"
              style={{ fontFamily: INTER }}
            >
              为什么要添加 3D 效果？
            
            </h2>
            <div className="space-y-6">
              {whyPoints.map((point) => (
                <div key={point.title} className="flex gap-4">
                  <div
                    className="mt-3 size-2 shrink-0 rounded-full bg-primary"
                    aria-hidden
                  />
                  <div>
                    <h3 className="mb-1 font-semibold text-foreground">
                      {point.title}
                    </h3>
                    <p className="text-muted-foreground">{point.description}</p>
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
              为你的截图添加 3D 效果
            
            </h2>
            <p className="mb-8 text-muted-foreground">
              无需 3D 软件。直接在浏览器中创建惊艳的视觉效果。
            
            </p>
            <Link href="/" className={ctaClassName}>
              免费试用 3D 效果
            
            </Link>
          </div>
        </section>
      </main>

      <Footer brandName="Screenshot Studio" />
    </div>
  );
}
