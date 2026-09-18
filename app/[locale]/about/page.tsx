import { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/landing/Navigation";
import { Footer } from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "关于我们",
  description:
    "关于 Screenshot Studio——这款免费、开源的浏览器工具，能把普通截图变成专业图形。",
  alternates: {
    canonical: "/about",
  },
};

const cardSurface =
  "rounded-2xl bg-card p-4 ring-1 ring-inset ring-border shadow-[var(--card-highlight-shadow)]";

const linkClassName =
  "text-foreground underline decoration-foreground/30 underline-offset-4 transition-colors hover:decoration-foreground/60";

const INTER =
  "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";

const offerings = [
  {
    title: "100+ 背景",
    description:
      "渐变背景、纯色和图案，让你的截图更出彩。",
  },
  {
    title: "浏览器模型",
    description:
      "Safari 和 Chrome 浏览器边框，用于逼真的应用预览。",
  },
  {
    title: "3D 效果与动画",
    description:
      "透视变换、阴影，以及支持视频导出的动画时间轴。",
  },
  {
    title: "推文与代码导入",
    description:
      "把推文和代码片段变成精美的可分享图片。",
  },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navigation />

      <main className="mx-auto max-w-3xl flex-1 px-6 pb-16 pt-28 sm:pb-24">
        <h1
          className="mb-6 text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-4xl"
          style={{ fontFamily: INTER }}
        >
          关于 Screenshot Studio
        
        </h1>

        <div className="space-y-8">
          <section>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Screenshot Studio 是一款免费、开源的截图编辑器，面向那些希望图片看起来专业、又不想为昂贵工具付费或再注册一个账号的开发者、设计师和营销人员。
            
            </p>
          </section>

          <section>
            <h2
              className="mb-3 text-xl font-semibold tracking-[-0.02em] text-foreground"
              style={{ fontFamily: INTER }}
            >
              我们为什么做这个
            
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              每当你在社交媒体、文档或落地页上分享截图时，呈现效果都很重要。但现有工具要么太贵，要么需要注册，要么加水印，要么把你的图片上传到它们的服务器。我们想要更好的东西：一个完全在浏览器中运行、尊重你的隐私、并且完全免费使用的工具。
            
            </p>
          </section>

          <section>
            <h2
              className="mb-3 text-xl font-semibold tracking-[-0.02em] text-foreground"
              style={{ fontFamily: INTER }}
            >
              我们提供什么
            
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {offerings.map((item) => (
                <div key={item.title} className={cardSurface}>
                  <p className="mb-1 font-medium text-foreground">
                    {item.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2
              className="mb-3 text-xl font-semibold tracking-[-0.02em] text-foreground"
              style={{ fontFamily: INTER }}
            >
              开源
            
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              Screenshot Studio 完全开源。你可以查看、贡献或复刻该项目，见{" "}
              <Link
                href="https://github.com/opennookorg/screenshot-studio"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClassName}
              >
                GitHub
              </Link>
              。我们相信最好的工具诞生于开放之中。
            
            </p>
          </section>

          <section>
            <h2
              className="mb-3 text-xl font-semibold tracking-[-0.02em] text-foreground"
              style={{ fontFamily: INTER }}
            >
              开发者
            
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              由以下人员创建并维护{" "}
              <Link
                href="https://x.com/code_kartik"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClassName}
              >
                Kartik Labhshetwar
              </Link>
              。如果你觉得 Screenshot Studio 有用，欢迎给仓库点星或分享给他人。
            
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
