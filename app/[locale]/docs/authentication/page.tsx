import { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/landing/Navigation";
import { Footer } from "@/components/landing/Footer";
import { OG_DEFAULTS } from "@/lib/seo/metadata";
import { INTER, codeBlockClassName, linkClassName } from "@/lib/seo/docs-shared";

export const metadata: Metadata = {
  title: "Screenshot Studio API 身份验证",
  description:
    "Screenshot Studio API 无需 API 密钥、令牌或账号。了解匿名访问、按 IP 的速率限制、429 响应以及 Retry-After 响应头的工作方式。",
  keywords: [
    "Screenshot Studio API authentication",
    "Screenshot Studio API key",
    "screenshot API rate limit",
    "screenshot API no auth",
  ],
  openGraph: {
    ...OG_DEFAULTS,
    title: "Screenshot Studio API 身份验证",
    description:
      "无需 API 密钥。支持匿名访问，按 IP 限流，遵循标准 429 语义。",
    url: "/docs/authentication",
  },
  alternates: {
    canonical: "/docs/authentication",
  },
};

const LIMITS = [
  {
    endpoint: "POST /api/screenshot",
    limit: "20 requests per minute per IP",
    notes: "返回 429，并带有 Retry-After 与 X-RateLimit-* 响应头。",
  },
  {
    endpoint: "POST /api/export",
    limit: "Unmetered",
    notes: "受请求体大小和服务器处理时间限制。",
  },
  {
    endpoint: "GET /api/tweet/{id}",
    limit: "Unmetered",
    notes: "受上游聚合 API 限制。",
  },
  {
    endpoint: "GET /api/image-proxy",
    limit: "Unmetered",
    notes: "仅限 Twitter 媒体主机的允许列表。",
  },
];

export default function AuthenticationPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navigation />

      <main className="mx-auto max-w-3xl flex-1 px-6 pb-16 pt-28 sm:pb-24">
        <h1
          className="mb-4 text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-4xl"
          style={{ fontFamily: INTER }}
        >
          Screenshot Studio API 身份验证
        
        </h1>
        <p className="mb-12 text-lg leading-relaxed text-muted-foreground">
          Screenshot Studio 的公开 API 无需身份验证。无需申请 API 密钥，无需轮换令牌，也无需创建账号。直接发送请求即可获得响应。访问权限由按 IP 的速率限制而非凭据控制。
        
        </p>

        <div className="space-y-10">
          <section id="no-credentials">
            <h2
              className="mb-3 text-xl font-semibold tracking-[-0.02em] text-foreground"
              style={{ fontFamily: INTER }}
            >
              无需凭据
            
            </h2>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              不要发送  <code>授权</code> 请求头。它会被忽略。完整的请求如下：
            
            </p>
            <pre className={codeBlockClassName}>
              <code>{`curl -X POST https://www.screenshot-studio.com/api/screenshot \\
  -H "Content-Type: application/json" \\
  -d '{"url":"https://example.com"}'`}</code>
            </pre>
          </section>

          <section id="rate-limits">
            <h2
              className="mb-3 text-xl font-semibold tracking-[-0.02em] text-foreground"
              style={{ fontFamily: INTER }}
            >
              速率限制
            
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-2 pr-4 font-medium text-foreground">
                      端点
                    
                    </th>
                    <th className="py-2 pr-4 font-medium text-foreground">
                      限制
                    
                    </th>
                    <th className="py-2 font-medium text-foreground">说明</th>
                  </tr>
                </thead>
                <tbody>
                  {LIMITS.map((row) => (
                    <tr key={row.endpoint} className="border-b border-border/60">
                      <td className="py-2 pr-4 font-mono text-xs text-foreground">
                        {row.endpoint}
                      </td>
                      <td className="py-2 pr-4 text-muted-foreground">
                        {row.limit}
                      </td>
                      <td className="py-2 text-muted-foreground">
                        {row.notes}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="handling-429">
            <h2
              className="mb-3 text-xl font-semibold tracking-[-0.02em] text-foreground"
              style={{ fontFamily: INTER }}
            >
              处理 429
            
            </h2>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              超出限制时，响应会带有{" "}
              <code>Retry-After</code> 几秒内即可完成，还能搭配{" "}
              <code>X-RateLimit-Limit</code>,{" "}
              <code>X-RateLimit-Remaining</code>，以及{" "}
              <code>X-RateLimit-Reset</code>。等待{" "}
              <code>Retry-After</code> 后重试。
            
            </p>
            <pre className={codeBlockClassName}>
              <code>{`{
  "error": "Rate limit exceeded. Please try again later.",
  "code": "rate_limited",
  "message": "Rate limit exceeded. Please try again later.",
  "hint": "Wait 42 seconds, then retry. This endpoint allows 20 requests per minute per IP address.",
  "status": 429,
  "documentation": "https://www.screenshot-studio.com/docs#errors",
  "retryAfter": 42
}`}</code>
            </pre>
          </section>

          <section id="maintenance-endpoints">
            <h2
              className="mb-3 text-xl font-semibold tracking-[-0.02em] text-foreground"
              style={{ fontFamily: INTER }}
            >
              需凭据的维护端点
            
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              少数缓存维护端点需要维护者持有的共享密钥。它们不属于公共 API 范围，并有意未出现在{" "}
              <Link href="/openapi.json" className={linkClassName}>
                OpenAPI 规范
              
              </Link>
              .
            </p>
          </section>

          <section id="next">
            <h2
              className="mb-3 text-xl font-semibold tracking-[-0.02em] text-foreground"
              style={{ fontFamily: INTER }}
            >
              后续步骤
            
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              阅读完整{" "}
              <Link href="/docs" className={linkClassName}>
                API 文档
              
              </Link>
              ，请浏览{" "}
              <Link href="/developers" className={linkClassName}>
                开发者门户
              
              </Link>
              ，或获取{" "}
              <Link href="/openapi.json" className={linkClassName}>
                OpenAPI 3.1 规范
              
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
