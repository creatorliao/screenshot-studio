import { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/landing/Navigation";
import { Footer } from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "条款与条件",
  description:
    "使用 Screenshot Studio 的条款与条件，这是一款免费开源的截图美化工具。",
  alternates: {
    canonical: "/terms",
  },
};

const linkClassName =
  "text-foreground underline decoration-foreground/30 underline-offset-4 transition-colors hover:decoration-foreground/60";

const INTER =
  "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navigation />

      <main className="mx-auto max-w-3xl flex-1 px-6 pb-16 pt-28 sm:pb-24">
        <h1
          className="mb-2 text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-4xl"
          style={{ fontFamily: INTER }}
        >
          条款与条件
        
        </h1>
        <p className="mb-12 text-sm text-muted-foreground">
          最后更新：2026 年 6 月 2 日
        
        </p>

        <div className="space-y-8">
          <section>
            <h2
              className="mb-3 text-xl font-semibold tracking-[-0.02em] text-foreground"
              style={{ fontFamily: INTER }}
            >
              1. 条款的接受
            
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              访问并使用 Screenshot Studio（&quot;本服务&quot;）即表示你同意受本条款与条件的约束。如果你不同意这些条款，请勿使用本服务。
            
            </p>
          </section>

          <section>
            <h2
              className="mb-3 text-xl font-semibold tracking-[-0.02em] text-foreground"
              style={{ fontFamily: INTER }}
            >
              2. 服务说明
            
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              Screenshot Studio 是一款免费的、基于浏览器的截图编辑工具，用户可以用背景、边框、效果等美化截图。编辑在浏览器中进行，你导入的图片不会为了编辑而上传。导出会把成品图片发送到我们的压缩接口，接口返回图片后不会存储；从 URL 截取截图时，会把该地址发送给第三方截图服务。我们的{" "}
              <Link href="/privacy-policy" className={linkClassName}>
                隐私政策
              
              </Link>{" "}
              对两者都有完整说明。
            
            </p>
          </section>

          <section>
            <h2
              className="mb-3 text-xl font-semibold tracking-[-0.02em] text-foreground"
              style={{ fontFamily: INTER }}
            >
              3. 服务的使用
            
            </h2>
            <p className="mb-3 leading-relaxed text-muted-foreground">
              你同意仅将本服务用于合法目的。你不得：
            
            </p>
            <ul className="list-inside list-disc space-y-2 text-muted-foreground">
              <li>使用本服务创建或传播有害内容</li>
              <li>
                试图干扰本服务的运行或安全
              
              </li>
              <li>
                对服务进行超出开源许可范围的反向工程
              
              </li>
              <li>
                以任何违反适用法律法规的方式使用本服务
              
              </li>
            </ul>
          </section>

          <section>
            <h2
              className="mb-3 text-xl font-semibold tracking-[-0.02em] text-foreground"
              style={{ fontFamily: INTER }}
            >
              4. 知识产权
            
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              你用 Screenshot Studio 创建的图片归你所有。我们不对你使用该工具创作的内容主张任何所有权或权利。Screenshot Studio 软件本身是开源的，其许可条款见我们的{" "}
              <Link
                href="https://github.com/opennookorg/screenshot-studio"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClassName}
              >
                GitHub 仓库
              
              </Link>
              .
            </p>
          </section>

          <section>
            <h2
              className="mb-3 text-xl font-semibold tracking-[-0.02em] text-foreground"
              style={{ fontFamily: INTER }}
            >
              5. 免责声明
            
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              本服务按“原样”和“现有可用”提供，不附带任何明示或暗示的保证。我们不保证本服务不会中断、没有错误或不含有害组件。
            
            </p>
          </section>

          <section>
            <h2
              className="mb-3 text-xl font-semibold tracking-[-0.02em] text-foreground"
              style={{ fontFamily: INTER }}
            >
              6. 责任限制
            
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              在任何情况下，Screenshot Studio 或其创作者均不对因你使用本服务而产生或与之相关的任何间接、附带、特殊、后果性或惩罚性损害承担责任。
            
            </p>
          </section>

          <section>
            <h2
              className="mb-3 text-xl font-semibold tracking-[-0.02em] text-foreground"
              style={{ fontFamily: INTER }}
            >
              7. 条款变更
            
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              我们保留随时修改这些条款的权利。变更将在本页面公布并附上更新日期。变更后继续使用本服务即视为接受新条款。
            
            </p>
          </section>

          <section>
            <h2
              className="mb-3 text-xl font-semibold tracking-[-0.02em] text-foreground"
              style={{ fontFamily: INTER }}
            >
              8. 联系我们
            
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              如对这些条款有疑问，请访问我们的{" "}
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
