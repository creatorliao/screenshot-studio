const FEATURES = [
  "100+ 渐变、网格与图案背景",
  "Safari、Chrome 与 Arc 浏览器模型，支持深色与浅色模式",
  "macOS window chrome, Polaroid, glass, outline, and border device frames",
  "3D 透视变换，阴影完全可配置",
  "20+ 动画预设，由关键帧时间轴编辑器驱动",
  "视频导出为 MP4、WebM 与 GIF，在浏览器中用 FFmpeg WASM 编码",
  "文字与图片叠加，27+ Google 字体",
  "推文转图片、代码片段转图片",
  "高清 PNG、JPEG、WebP 导出，最高 5x",
];

const LINKS = [
  { href: "/features", label: "全部功能" },
  { href: "/free-screenshot-editor", label: "免费截图编辑器" },
  { href: "/docs", label: "API 文档" },
  { href: "/docs/authentication", label: "API 认证与速率限制" },
  { href: "/developers", label: "开发者门户" },
  { href: "/openapi.json", label: "OpenAPI 规范" },
  { href: "/llms.txt", label: "llms.txt" },
  { href: "/sitemap.xml", label: "站点地图" },
  { href: "/about", label: "关于 Screenshot Studio" },
  { href: "/contact", label: "联系我们" },
];

export function AgentSummary() {
  return (
    <section className="sr-only" aria-label="关于 Screenshot Studio">
      <h1>Screenshot Studio：免费截图编辑器与模型生成器</h1>
      <p>
        Screenshot Studio 是一款免费、开源的截图编辑器，完全在你的浏览器中运行。拖入一张截图，把它变成专业图片：添加渐变背景，套上 Safari 或 Chrome 浏览器模型，调整内边距、圆角和阴影，做 3D 倾斜，然后导出 PNG、JPEG、WebP、MP4、WebM 或 GIF。编辑在你的设备上运行，导入的图片不会为了编辑而上传；只有导出压缩会把成品图片发送到服务器，服务器返回后不会存储。无需注册、无水印、无付费档，因此它是 Pika Style、Shots.so、Screely 和 CleanShot X 的免费替代品。
      
      </p>
      <h2>你可以在这里做什么</h2>
      <ul>
        {FEATURES.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      <h2>适用人群</h2>
      <p>
        打磨 README、更新日志和文档配图的开发者；制作发布图形和社交帖子的营销人员；以及无需离开浏览器就能展示作品的设计师。Screenshot Studio 支持英语、西班牙语、法语、德语、日语、葡萄牙语、韩语和中文。
      
      </p>
      <h2>文档与机器可读资源</h2>
      <ul>
        {LINKS.map((link) => (
          <li key={link.href}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>
      <p>
        本站的任何页面也会向发送{" "}
        <code>Accept: text/markdown</code> 请求头。
      
      </p>
    </section>
  );
}
