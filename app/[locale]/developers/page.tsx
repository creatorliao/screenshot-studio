import { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/landing/Navigation";
import { Footer } from "@/components/landing/Footer";
import { OG_DEFAULTS } from "@/lib/seo/metadata";
import {
  INTER,
  cardSurface,
  codeBlockClassName,
  linkClassName,
} from "@/lib/seo/docs-shared";

export const metadata: Metadata = {
  title: "Screenshot Studio 开发者门户",
  description:
    "Screenshot Studio 的开发者门户：API 文档、OpenAPI 3.1 规范、身份验证、速率限制、快速上手请求，以及开源仓库。",
  keywords: [
    "Screenshot Studio developers",
    "Screenshot Studio developer portal",
    "Screenshot Studio API",
    "screenshot API quickstart",
    "screenshot OpenAPI spec",
  ],
  openGraph: {
    ...OG_DEFAULTS,
    title: "Screenshot Studio 开发者门户",
    description:
      "API 文档、OpenAPI 规范、认证、快速开始请求，以及开源仓库。",
    url: "/developers",
  },
  alternates: {
    canonical: "/developers",
  },
};

const RESOURCES = [
  {
    href: "/docs",
    label: "API 文档",
    detail:
      "所有公开接口，含请求与响应示例，以及错误码表。",
  },
  {
    href: "/openapi.json",
    label: "OpenAPI 3.1 规范",
    detail:
      "包含 operationId、带类型参数和响应 schema 的机器可读契约。",
  },
  {
    href: "/docs/authentication",
    label: "身份验证与速率限制",
    detail: "无需 API 密钥。按 IP 限流与 429 语义。",
  },
  {
    href: "/llms.txt",
    label: "llms.txt",
    detail: "面向 AI 智能体和 LLM 爬虫的 Markdown 站点概览。",
  },
  {
    href: "/llms-full.txt",
    label: "llms-full.txt",
    detail: "涵盖功能与 API 的长篇 Markdown 参考文档。",
  },
  {
    href: "https://github.com/opennookorg/screenshot-studio",
    label: "GitHub 上的源代码",
    detail: "Apache 2.0。问题反馈、讨论与自托管说明都在这里。",
  },
];

const QUICKSTART = [
  {
    id: "capture",
    title: "1. 抓取实时页面",
    body: "无需密钥，无需注册。提交一个 URL，返回一张 base64 PNG。",
    code: `curl -s -X POST https://www.screenshot-studio.com/api/screenshot \\
  -H "Content-Type: application/json" \\
  -d '{"url":"https://example.com","deviceType":"desktop"}' \\
  | jq -r .screenshot | base64 -d > shot.png`,
  },
  {
    id: "optimize",
    title: "2. 优化导出",
    body: "把图片送回 Sharp 重新压缩为 WebP。",
    code: `curl -s -X POST https://www.screenshot-studio.com/api/export \\
  -F "image=@shot.png" \\
  -F "format=webp" \\
  -F "qualityPreset=high" \\
  -o shot.webp`,
  },
  {
    id: "handle-errors",
    title: "3. 处理失败",
    body: "每个失败的请求都返回相同的 JSON 信封。根据 code 分支。",
    code: `{
  "error": "URL is required",
  "code": "invalid_request",
  "message": "URL is required",
  "hint": "Send a JSON body with a \\"url\\" string.",
  "status": 400,
  "documentation": "https://www.screenshot-studio.com/docs#errors"
}`,
  },
];

export default function DevelopersPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navigation />

      <main className="mx-auto max-w-3xl flex-1 px-6 pb-16 pt-28 sm:pb-24">
        <h1
          className="mb-4 text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-4xl"
          style={{ fontFamily: INTER }}
        >
          Screenshot Studio 开发者门户
        
        </h1>
        <p className="mb-12 text-lg leading-relaxed text-muted-foreground">
          Screenshot Studio 是一款开源、基于浏览器的截图编辑器，并带有一个小型公开 HTTP API。本页是围绕它进行开发的入口：这些端点无需鉴权，协议以 OpenAPI 3.1 发布，整个应用以 Apache 2.0 协议开源在 GitHub 上。
        
        </p>

        <div className="space-y-12">
          <section id="resources">
            <h2
              className="mb-4 text-xl font-semibold tracking-[-0.02em] text-foreground"
              style={{ fontFamily: INTER }}
            >
              从这里开始
            
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {RESOURCES.map((resource) => (
                <Link
                  key={resource.href}
                  href={resource.href}
                  className={cardSurface}
                >
                  <p className="mb-1 font-medium text-foreground">
                    {resource.label}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {resource.detail}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          <section id="api-keys">
            <h2
              className="mb-3 text-xl font-semibold tracking-[-0.02em] text-foreground"
              style={{ fontFamily: INTER }}
            >
              API 密钥
            
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              没有，也无需注册任何东西。公开 API 是匿名的，由按 IP 的速率限制而非凭据管理。详情见{" "}
              <Link href="/docs/authentication" className={linkClassName}>
                身份验证与速率限制
              
              </Link>
              .
            </p>
          </section>

          <section id="quickstart">
            <h2
              className="mb-4 text-xl font-semibold tracking-[-0.02em] text-foreground"
              style={{ fontFamily: INTER }}
            >
              快速开始
            
            </h2>
            <div className="space-y-8">
              {QUICKSTART.map((step) => (
                <div key={step.id} id={step.id}>
                  <h3 className="mb-2 text-base font-medium text-foreground">
                    {step.title}
                  </h3>
                  <p className="mb-3 leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                  <pre className={codeBlockClassName}>
                    <code>{step.code}</code>
                  </pre>
                </div>
              ))}
            </div>
          </section>

          <section id="sandbox">
            <h2
              className="mb-3 text-xl font-semibold tracking-[-0.02em] text-foreground"
              style={{ fontFamily: INTER }}
            >
              沙盒
            
            </h2>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              没有单独的沙箱主机。可以直接在生产环境上安全试验：这些接口对你的数据而言是只读的，不会把任何内容关联到账号存储，编辑器本身也从不上传你的图片。若要在本地运行完整技术栈：
            
            </p>
            <pre className={codeBlockClassName}>
              <code>{`git clone https://github.com/opennookorg/screenshot-studio.git
cd screenshot-studio
npm install
npm run dev`}</code>
            </pre>
          </section>

          <section id="agents">
            <h2
              className="mb-3 text-xl font-semibold tracking-[-0.02em] text-foreground"
              style={{ fontFamily: INTER }}
            >
              构建智能体
            
            </h2>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              加载{" "}
              <Link href="/openapi.json" className={linkClassName}>
                /openapi.json
              </Link>{" "}
              直接作为函数调用的工具定义。每个操作都带有唯一的  <code>operationId</code>、描述、带类型的参数和响应 schema。本站的任何页面在被请求时也会返回 Markdown：
            
            </p>
            <pre className={codeBlockClassName}>
              <code>{`curl -H "Accept: text/markdown" https://www.screenshot-studio.com/docs`}</code>
            </pre>
          </section>

          <section id="cli">
            <h2
              className="mb-3 text-xl font-semibold tracking-[-0.02em] text-foreground"
              style={{ fontFamily: INTER }}
            >
              CLI 与 MCP 服务器
            
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              目前尚未发布官方 CLI 工具和 MCP 服务器。上面的 curl 示例是受支持的命令行方式。如果你想要其中之一，{" "}
              <a
                href="https://github.com/opennookorg/screenshot-studio/issues"
                className={linkClassName}
              >
                提交 issue
              
              </a>
              .
            </p>
          </section>

          <section id="support">
            <h2
              className="mb-3 text-xl font-semibold tracking-[-0.02em] text-foreground"
              style={{ fontFamily: INTER }}
            >
              支持
            
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              提交缺陷和功能请求请前往{" "}
              <a
                href="https://github.com/opennookorg/screenshot-studio/issues"
                className={linkClassName}
              >
                GitHub Issues
              
              </a>
              ，或通过以下渠道联系维护者：{" "}
              <Link href="/contact" className={linkClassName}>
                联系页面
              
              </Link>
              .
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
