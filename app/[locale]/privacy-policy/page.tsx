import { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/landing/Navigation";
import { Footer } from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "隐私政策",
  description:
    "Screenshot Studio 隐私政策。哪些数据留在你的设备上，哪些会发送到我们的服务器，以及涉及哪些第三方。",
  alternates: {
    canonical: "/privacy-policy",
  },
};

const linkClassName =
  "text-foreground underline decoration-foreground/30 underline-offset-4 transition-colors hover:decoration-foreground/60";

const INTER =
  "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navigation />

      <main className="mx-auto max-w-3xl flex-1 px-6 pb-16 pt-28 sm:pb-24">
        <h1
          className="mb-2 text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-4xl"
          style={{ fontFamily: INTER }}
        >
          隐私政策
        
        </h1>
        <p className="mb-12 text-sm text-muted-foreground">
          最后更新：2026 年 8 月 23 日
        
        </p>

        <div className="max-w-none space-y-8">
          <section>
            <h2
              className="mb-3 text-xl font-semibold tracking-[-0.02em] text-foreground"
              style={{ fontFamily: INTER }}
            >
              概述
            
            </h2>
            <p className="mb-3 leading-relaxed text-muted-foreground">
              Screenshot Studio 是一款基于浏览器的图像编辑器。无需账号、无需注册、无需登录，因此我们绝不要求你提供姓名、邮箱或支付信息即可使用编辑器。
            
            </p>
            <p className="leading-relaxed text-muted-foreground">
              编辑、合成和预览渲染都在你的设备上、在浏览器画布中完成。有三项功能会把数据发送到你的设备之外：导出压缩、从 URL 截取截图，以及导入推文。下面会逐一说明。我们不会出售你的数据。
            
            </p>
          </section>

          <section>
            <h2
              className="mb-3 text-xl font-semibold tracking-[-0.02em] text-foreground"
              style={{ fontFamily: INTER }}
            >
              哪些数据保留在你的设备上
            
            </h2>
            <p className="mb-3 leading-relaxed text-muted-foreground">
              你从设备导入的图片在浏览器中读取，绝不会上传到我们这里进行编辑。编辑器还会把作品保存在你自己的浏览器中：
            
            </p>
            <ul className="list-inside list-disc space-y-2 text-muted-foreground">
              <li>
                <strong className="text-foreground">草稿：</strong> 你正在编辑的画布会自动保存到 IndexedDB，并在 7 天后自动删除。
              
              </li>
              <li>
                <strong className="text-foreground">图片：</strong> 导入的图片小于 500KB 时会保存在本地存储中，刷新页面不会丢失。更大的图片仅保存在内存中。
              
              </li>
              <li>
                <strong className="text-foreground">偏好设置：</strong> 宽高比、导出设置、自定义预设、主题和最近的导出记录。
              
              </li>
            </ul>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              这些内容都不会传到我们的服务器。清除浏览器中的站点数据即可将其全部删除。
            
            </p>
          </section>

          <section>
            <h2
              className="mb-3 text-xl font-semibold tracking-[-0.02em] text-foreground"
              style={{ fontFamily: INTER }}
            >
              哪些数据会离开你的设备
            
            </h2>
            <ul className="list-inside list-disc space-y-3 text-muted-foreground">
              <li>
                <strong className="text-foreground">导出压缩：</strong>{" "}
                当你导出时，渲染后的图片会被发送到我们的{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 text-[13px]">
                  /api/export
                </code>{" "}
                端点，使用 Sharp 在内存中重新压缩后返回给你。它不会被写入磁盘、不会被存储，也不会被记录日志。超过 4MB 的图片，以及任何失败或超时，都会回退到在浏览器内压缩。
              
              </li>
              <li>
                <strong className="text-foreground">
                  从 URL 抓取截图：
                
                </strong>{" "}
                你输入的地址会发送到{" "}
                <Link
                  href="https://microlink.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClassName}
                >
                  Microlink
                </Link>
                ，它会加载该页面并截图。生成的图片会缓存在 Cloudflare R2 中，我们的数据库会存储规范化后的 URL、其哈希值、设备与配色方案选项以及存储键，以便重复截图时更快。只有你明确提交的公开网页才会被截图。
              
              </li>
              <li>
                <strong className="text-foreground">导入推文：</strong>{" "}
                数字推文 ID 会发送到 X 的公开 syndication API，以获取在你的画布上渲染的推文内容。
              
              </li>
              <li>
                <strong className="text-foreground">远程图片：</strong>{" "}
                通过 URL 引用的图片会经由我们的图片代理获取，该代理仅限白名单内的主机。
              
              </li>
            </ul>
          </section>

          <section>
            <h2
              className="mb-3 text-xl font-semibold tracking-[-0.02em] text-foreground"
              style={{ fontFamily: INTER }}
            >
              分析、广告与第三方
            
            </h2>
            <ul className="list-inside list-disc space-y-3 text-muted-foreground">
              <li>
                <strong className="text-foreground">Databuddy:</strong>{" "}
                不使用 Cookie 的产品分析。记录页面浏览量、Web 指标、JavaScript 错误和外链点击。
              
              </li>
              <li>
                <strong className="text-foreground">PostHog：</strong> 用于功能使用情况的产品分析。它会设置第一方标识符，以便识别再次访问。
              
              </li>
              <li>
                <strong className="text-foreground">Google AdSense：</strong> 广告在本站投放。Google 可能依据其自身政策设置 Cookie，并将其用于广告投放、衡量和个性化。你可以在以下位置控制{" "}
                <Link
                  href="https://myadcenter.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClassName}
                >
                  我的广告中心
                
                </Link>
                .
              </li>
              <li>
                <strong className="text-foreground">
                  托管与网络：
                
                </strong>{" "}
                网站运行在 Cloudflare 之后的 Vercel 上。出于安全和可靠性考虑，两者都会保留包含 IP 地址的标准请求日志。
              
              </li>
              <li>
                <strong className="text-foreground">速率限制：</strong> 截图 API 会在服务器内存中保留你的 IP 地址最多 60 秒，以执行每分钟的限制。该地址不会写入数据库。
              
              </li>
            </ul>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              我们不会投放自己的跨站广告像素，也不会将你的数据出售或分享给数据经纪商。
            
            </p>
          </section>

          <section>
            <h2
              className="mb-3 text-xl font-semibold tracking-[-0.02em] text-foreground"
              style={{ fontFamily: INTER }}
            >
              Cookie
            
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              我们自己设置了一个 Cookie，{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-[13px]">
                NEXT_LOCALE
              </code>
              ，用于记住你的语言选择。如上所述，PostHog 和 Google AdSense 可能会设置额外的 Cookie 和标识符。
            
            </p>
          </section>

          <section>
            <h2
              className="mb-3 text-xl font-semibold tracking-[-0.02em] text-foreground"
              style={{ fontFamily: INTER }}
            >
              你的选择
            
            </h2>
            <ul className="list-inside list-disc space-y-2 text-muted-foreground">
              <li>
                清除浏览器中的站点数据，即可删除本地存储的所有草稿、图片和偏好设置。
              
              </li>
              <li>
                屏蔽 Cookie 或使用广告或追踪拦截器。编辑器在没有分析和广告的情况下也能正常使用。
              
              </li>
              <li>
                如果你不想发起这些请求，可以跳过 URL 截图和推文导入。从设备导入图片永远不会离开浏览器。
              
              </li>
              <li>
                给我们发邮件，即可移除你所拥有页面的缓存截图。
              
              </li>
            </ul>
          </section>

          <section>
            <h2
              className="mb-3 text-xl font-semibold tracking-[-0.02em] text-foreground"
              style={{ fontFamily: INTER }}
            >
              儿童
            
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              Screenshot Studio 不面向 13 岁以下儿童，我们也不会在知情的情况下收集他们的信息。
            
            </p>
          </section>

          <section>
            <h2
              className="mb-3 text-xl font-semibold tracking-[-0.02em] text-foreground"
              style={{ fontFamily: INTER }}
            >
              开源
            
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              Screenshot Studio 是开源的。本页的每一项声明都可以对照{" "}
              <Link
                href="https://github.com/opennookorg/screenshot-studio"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClassName}
              >
                GitHub 上的源代码
              
              </Link>
              .
            </p>
          </section>

          <section>
            <h2
              className="mb-3 text-xl font-semibold tracking-[-0.02em] text-foreground"
              style={{ fontFamily: INTER }}
            >
              变更
            
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              我们可能会不时更新本政策。变更会连同更新日期一并反映在本页面上。
            
            </p>
          </section>

          <section>
            <h2
              className="mb-3 text-xl font-semibold tracking-[-0.02em] text-foreground"
              style={{ fontFamily: INTER }}
            >
              联系我们
            
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              如果对本政策有疑问，请通过我们的{" "}
              <Link href="/contact" className={linkClassName}>
                联系页面
              
              </Link>
              .
            </p>
          </section>
        </div>
      </main>

      <Footer brandName="Screenshot Studio" />
    </div>
  );
}
