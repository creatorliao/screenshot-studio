/**
 * 汉化效果验证：抓取页面 HTML，剔除 <script>/<style> 后统计
 *   可见 DOM 中的中文字符数 / 残留英文单词数
 *
 * 用法：npx tsx scripts/i18n-verify.ts [baseUrl]
 *   默认 http://localhost:3000
 *
 * 注：tsx 以 CJS 输出，顶层 await 不被支持，故用 main() 包裹。
 */
const BASE = process.argv[2] ?? "http://localhost:3000";

const ROUTES = [
  "/",
  "/about",
  "/contact",
  "/privacy-policy",
  "/terms",
  "/changelog",
  "/features",
  "/tools",
  "/code",
  "/landing",
  "/for/developers",
  "/free-screenshot-editor",
  "/jpg-to-png",
  "/resize-image",
  "/developers",
];

const CJK = /[\u4e00-\u9fff]/g;
const LATIN_WORD = /[A-Za-z]{3,}/g;

// 判定为"不该翻译"的英文，从残留计数中剔除
const WHITELIST = new Set([
  "Screenshot", "Studio", "Safari", "Chrome", "GitHub", "Twitter", "Instagram",
  "LinkedIn", "Figma", "PostHog", "AdSense", "Google", "Apple", "macOS",
  "Windows", "Python", "React", "Prisma", "Markdown", "API", "HTML", "CSS",
  "URL", "PNG", "JPG", "JPEG", "WebP", "GIF", "MP4", "WebM", "SVG", "WASM",
  "FFmpeg", "Polaroid", "Arc", "Vercel", "YouTube", "Sharp", "OpenAPI",
  "the", "and", "for", "with", "from", "your", "you", "that", "this",
  "not", "are", "all", "can", "use", "our", "was", "has", "have", "src",
  "className", "div", "span", "href", "png", "jpg", "true", "false",
]);

type Row = { route: string; status: number; cjk: number; latinUnique: number; leftover: string[] };

async function main() {
  const rows: Row[] = [];

  for (const route of ROUTES) {
    let html = "";
    let status = 0;
    try {
      const res = await fetch(BASE + route, {
        headers: { "Accept-Language": "zh-CN,zh;q=0.9" },
        redirect: "follow",
      });
      status = res.status;
      html = await res.text();
    } catch (e) {
      rows.push({ route, status: -1, cjk: 0, latinUnique: 0, leftover: [(e as Error).message] });
      continue;
    }

    const visible = html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/&[a-z]+;/gi, " ");

    const cjk = (visible.match(CJK) ?? []).length;
    const words = (visible.match(LATIN_WORD) ?? [])
      .filter((w) => !WHITELIST.has(w))
      .map((w) => w.toLowerCase());
    const uniq = [...new Set(words)];

    rows.push({ route, status, cjk, latinUnique: uniq.length, leftover: uniq.slice(0, 12) });
  }

  console.log("=".repeat(84));
  console.log(`汉化验证  base = ${BASE}   （Accept-Language: zh-CN）`);
  console.log("=".repeat(84));
  console.log(
    "route".padEnd(30) + "status".padStart(7) + "中文字符".padStart(10) + "残留英文词".padStart(12),
  );
  console.log("-".repeat(84));

  let totalCjk = 0;
  for (const r of rows) {
    totalCjk += r.cjk;
    console.log(
      r.route.padEnd(30) +
        String(r.status).padStart(7) +
        String(r.cjk).padStart(10) +
        String(r.latinUnique).padStart(12),
    );
  }
  console.log("-".repeat(84));
  console.log(`中文字符合计: ${totalCjk}`);

  const withLeftover = rows.filter((r) => r.latinUnique > 0);
  if (withLeftover.length) {
    console.log("\n---- 残留英文样例 ----");
    withLeftover.slice(0, 10).forEach((r) => {
      console.log(`  ${r.route.padEnd(26)} ${r.leftover.join(", ")}`);
    });
  }

  const failed = rows.filter((r) => r.status !== 200);
  if (failed.length) {
    console.log("\n⚠ 非 200 页面：");
    failed.forEach((r) => console.log(`  ${r.route} -> ${r.status}`));
  }
}

main();

// 使本文件成为模块：否则它是全局脚本，顶层 const 会与其它脚本互相冲突
export {};
