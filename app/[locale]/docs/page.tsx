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
  title: "Screenshot Studio API 文档",
  description:
    "Screenshot Studio API 文档：端点、请求与响应结构、速率限制、JSON 错误码，以及 OpenAPI 3.1 规范。无需 API key。",
  keywords: [
    "Screenshot Studio API",
    "Screenshot Studio API docs",
    "Screenshot Studio OpenAPI",
    "screenshot API",
    "screenshot capture API",
  ],
  openGraph: {
    ...OG_DEFAULTS,
    title: "Screenshot Studio API 文档",
    description:
      "公开的 Screenshot Studio API 的端点、数据结构、速率限制和错误码。",
    url: "/docs",
  },
  alternates: {
    canonical: "/docs",
  },
};

interface Endpoint {
  operationId: string;
  method: string;
  path: string;
  description: string;
  request: string;
  response: string;
}

const ENDPOINTS: Endpoint[] = [
  {
    operationId: "captureScreenshot",
    method: "POST",
    path: "/api/screenshot",
    description:
      "渲染指定 URL 的页面，并以 base64 编码的 PNG 返回截图。结果按 URL、设备类型和配色方案缓存。",
    request: `curl -X POST https://www.screenshot-studio.com/api/screenshot \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://example.com",
    "deviceType": "desktop",
    "colorScheme": "light",
    "forceRefresh": false
  }'`,
    response: `{
  "screenshot": "iVBORw0KGgoAAAANSUhEUg...",
  "url": "https://example.com",
  "cached": false,
  "strategy": "microlink",
  "deviceType": "desktop",
  "colorScheme": "light"
}`,
  },
  {
    operationId: "optimizeExportImage",
    method: "POST",
    path: "/api/export",
    description:
      "使用 Sharp 重新压缩图像并返回优化后的字节。JPEG 使用 MozJPEG，WebP 使用 libwebp，PNG 使用自适应滤波。响应体是图像本身，而不是 JSON。",
    request: `curl -X POST https://www.screenshot-studio.com/api/export \\
  -F "image=@shot.png" \\
  -F "format=webp" \\
  -F "qualityPreset=high" \\
  -o shot.webp`,
    response: `HTTP/2 200
content-type: image/webp

<binary image bytes>`,
  },
  {
    operationId: "getTweet",
    method: "GET",
    path: "/api/tweet/{id}",
    description:
      "返回用于将推文渲染为图片的公开推文数据。id 是推文 URL 中的数字状态 ID。",
    request: `curl https://www.screenshot-studio.com/api/tweet/1234567890123456789`,
    response: `{
  "data": {
    "id_str": "1234567890123456789",
    "text": "...",
    "user": { "name": "...", "screen_name": "..." }
  }
}`,
  },
  {
    operationId: "proxyTwitterImage",
    method: "GET",
    path: "/api/image-proxy",
    description:
      "通过该源代理传输 Twitter 托管的图片，使其可以绘制到画布上而不污染画布。仅允许 pbs.twimg.com、abs.twimg.com、ton.twitter.com 和 video.twimg.com。",
    request: `curl "https://www.screenshot-studio.com/api/image-proxy?url=https://pbs.twimg.com/media/EXAMPLE.jpg" \\
  -o media.jpg`,
    response: `HTTP/2 200
content-type: image/jpeg

<binary image bytes>`,
  },
];

const ERROR_CODES = [
  {
    code: "invalid_request",
    status: "400",
    meaning: "必填字段缺失或格式有误。",
  },
  {
    code: "invalid_url",
    status: "400",
    meaning: "该 url 不是有效的绝对 http 或 https URL。",
  },
  {
    code: "unsupported_value",
    status: "400",
    meaning: "字段被设置为超出其允许枚举范围的值。",
  },
  {
    code: "forbidden_domain",
    status: "403",
    meaning: "请求的主机不在代理允许列表中。",
  },
  {
    code: "not_found",
    status: "404",
    meaning: "没有与请求匹配的接口或资源。",
  },
  {
    code: "method_not_allowed",
    status: "405",
    meaning: "该端点不接受此 HTTP 方法。",
  },
  {
    code: "rate_limited",
    status: "429",
    meaning: "已超出单 IP 速率限制，请遵循 Retry-After。",
  },
  {
    code: "upstream_timeout",
    status: "408",
    meaning: "目标页面加载超时。",
  },
  {
    code: "upstream_unavailable",
    status: "503",
    meaning: "无法连接上游截图服务。",
  },
  {
    code: "upstream_failed",
    status: "502",
    meaning: "上游主机拒绝或未能完成该请求。",
  },
  {
    code: "internal_error",
    status: "500",
    meaning: "服务器端出现意外故障。",
  },
];

const RESOURCES = [
  {
    href: "/openapi.json",
    label: "OpenAPI 3.1 规范",
    detail: "本页每个操作的机器可读契约。",
  },
  {
    href: "/docs/authentication",
    label: "身份验证与速率限制",
    detail: "无需 API 密钥。在此查看按 IP 的限流规则。",
  },
  {
    href: "/developers",
    label: "开发者门户",
    detail: "快速开始、智能体文件与开源仓库。",
  },
  {
    href: "/llms.txt",
    label: "llms.txt",
    detail: "面向 AI 智能体的整站 Markdown 概览。",
  },
];

export default function DocsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navigation />

      <main className="mx-auto max-w-3xl flex-1 px-6 pb-16 pt-28 sm:pb-24">
        <h1
          className="mb-4 text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-4xl"
          style={{ fontFamily: INTER }}
        >
          Screenshot Studio API 文档
        
        </h1>
        <p className="mb-12 text-lg leading-relaxed text-muted-foreground">
          Screenshot Studio 提供一个小型公开 HTTP API：把在线网页截取为图片、重新压缩已导出的图片、解析推文，以及代理 Twitter 媒体。无需 API key、无需 token、无需账号。每个失败的请求都返回相同的 JSON 错误结构。机器可读的协议见{" "}
          <Link href="/openapi.json" className={linkClassName}>
            /openapi.json
          </Link>
          .
        </p>

        <div className="space-y-12">
          <section id="quickstart">
            <h2
              className="mb-3 text-xl font-semibold tracking-[-0.02em] text-foreground"
              style={{ fontFamily: INTER }}
            >
              快速开始
            
            </h2>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              用一条命令抓取页面并把 PNG 写入磁盘。
            
            </p>
            <pre className={codeBlockClassName}>
              <code>{`curl -s -X POST https://www.screenshot-studio.com/api/screenshot \\
  -H "Content-Type: application/json" \\
  -d '{"url":"https://example.com"}' \\
  | jq -r .screenshot | base64 -d > shot.png`}</code>
            </pre>
          </section>

          <section id="base-url">
            <h2
              className="mb-3 text-xl font-semibold tracking-[-0.02em] text-foreground"
              style={{ fontFamily: INTER }}
            >
              基础 URL
            
            </h2>
            <pre className={codeBlockClassName}>
              <code>https://www.screenshot-studio.com</code>
            </pre>
          </section>

          <section id="endpoints">
            <h2
              className="mb-4 text-xl font-semibold tracking-[-0.02em] text-foreground"
              style={{ fontFamily: INTER }}
            >
              端点
            
            </h2>
            <div className="space-y-8">
              {ENDPOINTS.map((endpoint) => (
                <div key={endpoint.operationId} id={endpoint.operationId}>
                  <p className="mb-1 flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-foreground/[0.06] px-2 py-0.5 font-mono text-xs font-medium text-foreground ring-1 ring-inset ring-border">
                      {endpoint.method}
                    </span>
                    <code className="font-mono text-sm text-foreground">
                      {endpoint.path}
                    </code>
                  </p>
                  <p className="mb-1 text-xs text-muted-foreground">
                    operationId: <code>{endpoint.operationId}</code>
                  </p>
                  <p className="mb-4 leading-relaxed text-muted-foreground">
                    {endpoint.description}
                  </p>
                  <p className="mb-2 text-sm font-medium text-foreground">
                    请求
                  
                  </p>
                  <pre className={`${codeBlockClassName} mb-4`}>
                    <code>{endpoint.request}</code>
                  </pre>
                  <p className="mb-2 text-sm font-medium text-foreground">
                    响应
                  
                  </p>
                  <pre className={codeBlockClassName}>
                    <code>{endpoint.response}</code>
                  </pre>
                </div>
              ))}
            </div>
          </section>

          <section id="errors">
            <h2
              className="mb-3 text-xl font-semibold tracking-[-0.02em] text-foreground"
              style={{ fontFamily: INTER }}
            >
              错误
            
            </h2>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              每个失败的请求都返回相同结构的 JSON。根据{" "}
              <code>代码</code>，这是稳定版；  <code>错误</code> 和{" "}
              <code>message</code> 携带相同的可读文本，并且{" "}
              <code>提示</code> 并说明了如何恢复。
            
            </p>
            <pre className={`${codeBlockClassName} mb-6`}>
              <code>{`{
  "error": "URL is required",
  "code": "invalid_request",
  "message": "URL is required",
  "hint": "Send a JSON body with a \\"url\\" string, for example {\\"url\\": \\"https://example.com\\"}.",
  "status": 400,
  "documentation": "https://www.screenshot-studio.com/docs#errors"
}`}</code>
            </pre>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-2 pr-4 font-medium text-foreground">
                      代码
                    
                    </th>
                    <th className="py-2 pr-4 font-medium text-foreground">
                      状态
                    
                    </th>
                    <th className="py-2 font-medium text-foreground">
                      含义
                    
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ERROR_CODES.map((row) => (
                    <tr key={row.code} className="border-b border-border/60">
                      <td className="py-2 pr-4 font-mono text-xs text-foreground">
                        {row.code}
                      </td>
                      <td className="py-2 pr-4 text-muted-foreground">
                        {row.status}
                      </td>
                      <td className="py-2 text-muted-foreground">
                        {row.meaning}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="markdown">
            <h2
              className="mb-3 text-xl font-semibold tracking-[-0.02em] text-foreground"
              style={{ fontFamily: INTER }}
            >
              Markdown 内容协商
            
            </h2>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              本站每个页面都会向请求 Markdown 的客户端返回 Markdown。响应会设置{" "}
              <code>Content-Type: text/markdown; charset=utf-8</code> 和{" "}
              <code>Vary: Accept, Accept-Encoding</code>。如果请求既不接受  <code>text/html</code> 也不  <code>text/markdown</code> 的答案是  <code>406</code>，未知路径会返回{" "}
              <code>404</code> 并带有 Markdown 正文，列出接下来该看哪里。
            
            </p>
            <pre className={codeBlockClassName}>
              <code>{`curl -H "Accept: text/markdown" https://www.screenshot-studio.com/`}</code>
            </pre>
          </section>

          <section id="resources">
            <h2
              className="mb-4 text-xl font-semibold tracking-[-0.02em] text-foreground"
              style={{ fontFamily: INTER }}
            >
              相关资源
            
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
        </div>
      </main>

      <Footer />
    </div>
  );
}
