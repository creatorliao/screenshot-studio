import { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/landing/Navigation";
import { Footer } from "@/components/landing/Footer";
import { GithubIcon, NewTwitterIcon, Mail01Icon } from "hugeicons-react";

export const metadata: Metadata = {
  title: "联系我们",
  description:
    "联系 Screenshot Studio 团队。反馈问题、提出功能建议，或者只是打个招呼。",
  alternates: {
    canonical: "/contact",
  },
};

const cardLinkClassName =
  "group rounded-2xl bg-card p-6 ring-1 ring-inset ring-border shadow-[var(--card-highlight-shadow)] transition-colors hover:bg-foreground/[0.04] hover:ring-ring/40";

const iconWrapClassName =
  "flex size-9 items-center justify-center rounded-xl bg-foreground/[0.06] text-foreground ring-1 ring-inset ring-border";

const linkClassName =
  "text-foreground underline decoration-foreground/30 underline-offset-4 transition-colors hover:decoration-foreground/60";

const INTER =
  "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";

const contacts = [
  {
    href: "https://github.com/opennookorg/screenshot-studio/issues",
    external: true,
    icon: GithubIcon,
    title: "报告问题",
    description:
      "发现问题？在 GitHub 上提交 issue，我们会跟进处理。",
  },
  {
    href: "https://github.com/opennookorg/screenshot-studio/issues/new?labels=enhancement",
    external: true,
    icon: GithubIcon,
    title: "提交功能建议",
    description:
      "有让 Screenshot Studio 变得更好的想法？我们很乐意听听。",
  },
  {
    href: "https://x.com/screenshotstdio",
    external: true,
    icon: NewTwitterIcon,
    title: "Twitter / X",
    description:
      "关注 @screenshotstdio 获取发布说明、技巧和产品更新。",
  },
  {
    href: "mailto:kartik.labhshetwar@gmail.com",
    external: false,
    icon: Mail01Icon,
    title: "电子邮件",
    description:
      "其他任何问题，给我们发邮件，我们会尽快回复。",
  },
] as const;

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navigation />

      <main className="mx-auto max-w-3xl flex-1 px-6 pb-16 pt-28 sm:pb-24">
        <h1
          className="mb-4 text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-4xl"
          style={{ fontFamily: INTER }}
        >
          联系我们
        
        </h1>
        <p className="mb-12 text-lg text-muted-foreground">
          有疑问、发现了 bug，还是想提功能建议？以下是与我们联系的最佳方式。
        
        </p>

        <div className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {contacts.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              {...(item.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className={cardLinkClassName}
            >
              <div className="mb-3 flex items-center gap-3">
                <div className={iconWrapClassName}>
                  <item.icon size={20} strokeWidth={1.75} />
                </div>
                <h2
                  className="font-semibold tracking-[-0.02em] text-foreground"
                  style={{ fontFamily: INTER }}
                >
                  {item.title}
                </h2>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </Link>
          ))}
        </div>

        <section className="mb-8 rounded-2xl bg-card p-6 ring-1 ring-inset ring-border shadow-[var(--card-highlight-shadow)]">
          <h2
            className="mb-2 text-lg font-semibold tracking-[-0.02em] text-foreground"
            style={{ fontFamily: INTER }}
          >
            联系前须知
          
          </h2>
          <p className="mb-3 leading-relaxed text-muted-foreground">
            许多问题已经在这里得到解答：{" "}
            <Link href="/features" className={linkClassName}>
              功能
            
            </Link>{" "}
            页面，在{" "}
            <Link href="/docs" className={linkClassName}>
              API 文档
            
            </Link>
            ，或在{" "}
            <Link href="/changelog" className={linkClassName}>
              更新日志
            
            </Link>
            。Screenshot Studio 免费、无需账号，并在浏览器中处理你的图片，因此没有需要取消的项目，也无需管理订阅。
          
          </p>
          <p className="leading-relaxed text-muted-foreground">
            报告 bug 时，请附上你的浏览器和操作系统、你执行的操作步骤，如果方便的话再附上截图或导出的文件。GitHub issue 通常会在几天内回复；邮件可能会稍慢一些。
          
          </p>
        </section>

        <section className="rounded-2xl bg-card p-6 ring-1 ring-inset ring-border shadow-[var(--card-highlight-shadow)]">
          <h2
            className="mb-2 text-lg font-semibold tracking-[-0.02em] text-foreground"
            style={{ fontFamily: INTER }}
          >
            参与贡献
          
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            Screenshot Studio 是开源的。如果你是开发者并想参与贡献，请查看{" "}
            <Link
              href="https://github.com/opennookorg/screenshot-studio"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClassName}
            >
              GitHub 仓库
            
            </Link>
            。欢迎提交 PR、报告 bug 和提出功能建议。
          
          </p>
        </section>
      </main>

      <Footer brandName="Screenshot Studio" />
    </div>
  );
}
