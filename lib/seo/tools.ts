/**
 * The image tools registry: one definition per landing page.
 *
 * This is the single source of truth behind the tool routes, the /tools hub,
 * the sitemap, and the agent-readable site content. Adding a tool page means
 * adding an entry here plus a four-line route file that renders <ToolPage>.
 *
 * Several entries share an engine on purpose: /png-to-jpg and /jpg-to-png run
 * the same converter with a different preset, but each targets its own query
 * and gets its own copy, FAQs, and structured data.
 */

import type { RasterFormat } from "@/lib/image-tools/types";

export type ToolEngine = "compress" | "convert" | "resize" | "crop" | "rotate";

export interface ToolFaq {
  question: string;
  answer: string;
}

export interface ToolPreset {
  /** Converter pages preselect the output format. */
  targetFormat?: RasterFormat;
  /** Copy shown on the dropzone, e.g. "PNG" for /png-to-jpg. */
  sourceLabel?: string;
}

export interface ToolDefinition {
  /** Route path, without a locale prefix. */
  slug: string;
  engine: ToolEngine;
  preset?: ToolPreset;
  /** Short label for the hub grid and related-tool links. */
  name: string;
  h1: string;
  /** <title>. Kept under ~60 characters where possible. */
  title: string;
  /** Meta description. Kept under ~155 characters. */
  description: string;
  keywords: string[];
  /** Paragraph under the H1. */
  intro: string;
  /** Bullets for the SoftwareApplication featureList and the "how it works" list. */
  features: string[];
  faqs: ToolFaq[];
  /** Slugs of related tools, for internal linking. */
  related: string[];
  /** Primary tools lead the hub grid and carry higher sitemap priority. */
  primary: boolean;
}

/** FAQ answers every tool repeats, phrased once so the claims stay consistent. */
const PRIVACY_FAQ: ToolFaq = {
  question: "我的图片会上传到服务器吗？",
  answer:
    "不会。本页所有工具都完全在浏览器中使用 Canvas 和 Web Worker API 运行。文件从磁盘读取，在当前标签页中处理，然后直接写回下载文件夹。不会上传、存储或记录任何内容，这也意味着页面加载后即使断网，工具仍能继续使用。",
};

const FREE_FAQ: ToolFaq = {
  question: "免费吗，会有水印吗？",
  answer:
    "它完全免费，无需注册、无需账号、没有每日限制，也没有水印。Screenshot Studio 基于 Apache 2.0 许可证开源。",
};

const BATCH_FAQ: ToolFaq = {
  question: "我可以一次处理多张图片吗？",
  answer:
    "可以。随意拖入任意数量的图片，它们会在后台依次处理。单张图片直接下载；多张图片会打包成一个 zip 文件。",
};

export const TOOLS: ToolDefinition[] = [
  {
    slug: "/compress-image",
    engine: "compress",
    name: "压缩图片",
    h1: "压缩图片",
    title: "在线压缩图片：免费、隐私安全、无需上传",
    description:
      "在浏览器中压缩 JPG、PNG 和 WebP 文件。支持批量压缩和实时体积预览。免费、无需注册、无水印、无需上传。",
    keywords: [
      "compress image",
      "compress image online",
      "image compressor",
      "reduce image file size",
      "compress jpeg",
      "compress png",
      "compress webp",
      "shrink image size",
      "image compressor free",
      "batch image compression",
      "compress image without losing quality",
      "iloveimg alternative",
    ],
    intro:
      "无需上传即可缩小图片文件。选择压缩级别，看清每个文件具体节省多少 KB，然后逐个下载结果，或打包成 zip 下载。",
    features: [
      "四档压缩，从轻度到极限",
      "每张图实时显示压缩前后体积",
      "批量压缩，一次打包下载 zip",
      "可选切换到 WebP 格式，压缩收益最大",
      "完全在浏览器中运行，无需上传",
    ],
    faqs: [
      {
        question: "我的图片能缩小多少？",
        answer:
          "这取决于源文件。以 PNG 保存的截图压缩为 WebP 或 JPG 时通常能减小 60-80%，而本身已是 JPG 的照片在中档通常能节省 30-60%。处理完成后每个文件都会显示实际节省的空间，因此你可以先试一个档位再调整。",
      },
      {
        question: "压缩会损失画质吗？",
        answer:
          "JPG 和 WebP 是有损格式，压缩率越高确实会丢弃更多细节。低档对大多数图片来说视觉上几乎无损，同时仍能明显减小体积。PNG 是无损格式，因此压缩为 PNG 只是重新编码文件；要让 PNG 明显变小，请将其转换为 WebP。",
      },
      BATCH_FAQ,
      PRIVACY_FAQ,
      FREE_FAQ,
    ],
    related: ["/convert-image", "/resize-image", "/png-to-webp"],
    primary: true,
  },
  {
    slug: "/convert-image",
    engine: "convert",
    name: "转换图片",
    h1: "转换图片格式",
    title: "在线转换图片格式：PNG、JPG、WebP",
    description:
      "在浏览器中在 PNG、JPG 和 WebP 之间转换。支持批量转换、质量控制、无需上传。免费、无需注册、无水印。",
    keywords: [
      "convert image",
      "image converter",
      "convert image format",
      "png to jpg",
      "jpg to png",
      "convert to webp",
      "image format converter online",
      "free image converter",
      "batch image converter",
      "convert image without uploading",
    ],
    intro:
      "无需安装任何东西即可更改图片格式。选择 PNG、JPG 或 WebP，设置质量，一次转换整个文件夹。",
    features: [
      "支持任意方向的 PNG、JPG 与 WebP",
      "有损格式提供质量滑块",
      "选择透明区域的底色",
      "批量转换，一次打包下载 zip",
      "完全在浏览器中运行，无需上传",
    ],
    faqs: [
      {
        question: "支持哪些格式？",
        answer:
          "你可以读取 PNG、JPG、WebP、GIF、BMP 和 AVIF，并写出 PNG、JPG 和 WebP。WebP 的写出取决于你的浏览器，不可用时会自动隐藏。我们不提供 AVIF 输出，因为目前没有浏览器能从 canvas 编码 AVIF。",
      },
      {
        question: "转换为 JPG 时透明度会怎样？",
        answer:
          "JPG 没有 Alpha 通道，因此透明区域必须填充为纯色。该工具默认在图片后方填充白色，并允许你在转换前选择其他颜色。",
      },
      {
        question: "我该选哪种格式？",
        answer:
          "WebP 适合网页，在相同质量下通常比 JPG 小 25-35%。JPG 适合与较旧软件的兼容性最大化。需要透明度或像素级无损副本（例如 UI 截图）时使用 PNG。",
      },
      BATCH_FAQ,
      PRIVACY_FAQ,
    ],
    related: ["/png-to-jpg", "/png-to-webp", "/compress-image"],
    primary: true,
  },
  {
    slug: "/resize-image",
    engine: "resize",
    name: "调整图片尺寸",
    h1: "调整图片尺寸",
    title: "在线调整图片尺寸：精确像素或百分比",
    description:
      "按像素尺寸或百分比调整图片大小，锁定宽高比。在浏览器中批量调整。免费，无需注册，无需上传。",
    keywords: [
      "resize image",
      "resize image online",
      "image resizer",
      "change image dimensions",
      "resize photo",
      "bulk image resizer",
      "resize image by percentage",
      "resize image in pixels",
      "scale image online",
      "free image resizer",
    ],
    intro:
      "设置精确的宽度和高度，或按百分比缩放，一张图或上百张都能处理。宽高比默认锁定，除非你手动解锁；图片分步缩小，文字保持清晰。",
    features: [
      "按精确像素或百分比调整尺寸",
      "宽高比锁定，自动推算另一轴",
      "可选放大，默认关闭",
      "分级降采样，保持截图文字清晰可读",
      "批量调整尺寸，一次打包下载 zip",
    ],
    faqs: [
      {
        question: "调整尺寸会让图片变模糊吗？",
        answer:
          "缩小采用逐级减半的方式，而非一次大幅跳变，因此比单次缩放保留的细节多得多。对于包含小字的截图，差别非常明显。放大无法凭空生成细节，所以默认关闭；仅当你需要达到特定像素尺寸时才启用。",
      },
      {
        question: "如何保持宽高比？",
        answer:
          "锁定默认开启：输入一个尺寸，另一个会自动计算。如果你确实想把图片拉伸到精确尺寸，可以解锁。",
      },
      {
        question: "我可以批量把图片调整到相同尺寸吗？",
        answer:
          "支持。批量拖入图片，设置一个目标宽度，每张图都会缩放到该宽度，高度按其自身宽高比推算。百分比模式则按每张图自身尺寸的比例缩放。",
      },
      PRIVACY_FAQ,
      FREE_FAQ,
    ],
    related: ["/crop-image", "/compress-image", "/convert-image"],
    primary: true,
  },
  {
    slug: "/crop-image",
    engine: "crop",
    name: "裁剪图片",
    h1: "裁剪图片",
    title: "在线裁剪图片：带比例预设的免费裁剪工具",
    description:
      "通过拖拽选区或输入精确像素来裁剪图片。内置社交媒体比例预设。免费，在浏览器中完成，无需上传。",
    keywords: [
      "crop image",
      "crop image online",
      "image cropper",
      "crop photo",
      "crop picture online",
      "crop image to square",
      "crop image to 16:9",
      "free image cropper",
      "crop screenshot",
      "crop image without uploading",
    ],
    intro:
      "在图片上拖拽选区，或直接输入精确的像素值。比例预设涵盖正方形、16:9、4:3 以及常见的社交尺寸，裁剪按原始分辨率应用。",
    features: [
      "拖拽选择，或输入精确像素坐标",
      "比例预设：自由、正方形、16:9、4:3、3:2、9:16",
      "按原始分辨率裁剪，而非预览分辨率",
      "拖拽时实时显示输出尺寸",
      "完全在浏览器中运行，无需上传",
    ],
    faqs: [
      {
        question: "裁剪会降低分辨率吗？",
        answer:
          "只取决于你裁掉的部分。选区会映射回原始像素，因此从一张 4000px 宽的图片中裁掉中间 50%，得到的是全画质的 2000px 宽结果，而不是缩小后的预览。",
      },
      {
        question: "我可以按指定宽高比裁剪吗？",
        answer:
          "可以。选择宽高比预设后，拖动时选区会被限制在该比例内。选择“自由”即可裁剪成任意形状。",
      },
      {
        question: "我可以一次裁剪多张图片吗？",
        answer:
          "裁剪需逐张进行，因为合适的选区取决于每张图片的内容。若要对一批图片应用相同尺寸，请改用调整尺寸工具。",
      },
      PRIVACY_FAQ,
      FREE_FAQ,
    ],
    related: ["/resize-image", "/rotate-image", "/compress-image"],
    primary: true,
  },
  {
    slug: "/rotate-image",
    engine: "rotate",
    name: "旋转图片",
    h1: "旋转与翻转图片",
    title: "在线旋转图片：旋转与翻转，免费",
    description:
      "将图片旋转 90、180 或 270 度，并水平或垂直翻转。在浏览器中批量旋转。免费，无需上传。",
    keywords: [
      "rotate image",
      "rotate image online",
      "flip image",
      "rotate photo",
      "mirror image online",
      "rotate image 90 degrees",
      "flip image horizontally",
      "batch rotate images",
      "free image rotator",
      "turn image sideways",
    ],
    intro:
      "以四分之一圈为单位旋转图片，并可沿任一轴镜像。旋转不损失形状：像素以完整尺寸重绘，一批图片也能一次矫正到位。",
    features: [
      "旋转 90、180 或 270 度",
      "水平或垂直翻转",
      "确认前实时预览",
      "批量旋转，一次打包下载 zip",
      "完全在浏览器中运行，无需上传",
    ],
    faqs: [
      {
        question: "我的照片一开始为什么方向就不对？",
        answer:
          "手机相机通常以某一个方向存储照片，并在 EXIF 标签中记录实际的旋转方向。忽略该标签的软件会把照片显示成侧向。本工具在加载时读取 EXIF 方向，因此你看到的就是已经摆正的画面，你添加的旋转也会烘焙进输出的像素中。",
      },
      {
        question: "旋转和翻转有什么区别？",
        answer:
          "旋转会让图片绕中心转动。翻转会镜像图片，文字也会反向。先应用翻转，再应用旋转，与你在预览中看到的一致。",
      },
      BATCH_FAQ,
      PRIVACY_FAQ,
      FREE_FAQ,
    ],
    related: ["/crop-image", "/resize-image", "/convert-image"],
    primary: true,
  },
];

/** Converter landing pages: one engine, one preset, one keyword each. */
const CONVERSION_PAGES: {
  slug: string;
  from: string;
  to: RasterFormat;
  toLabel: string;
  why: string;
  keywords: string[];
}[] = [
  {
    slug: "/png-to-jpg",
    from: "PNG",
    to: "jpeg",
    toLabel: "JPG",
    why: "对于照片来说，JPG 文件比 PNG 小得多，而且到处都被接受，因此这种转换对邮件附件和有大小限制的上传表单很有用。",
    keywords: ["png to jpg", "png to jpeg", "convert png to jpg", "png to jpg converter"],
  },
  {
    slug: "/jpg-to-png",
    from: "JPG",
    to: "png",
    toLabel: "PNG",
    why: "PNG 是无损格式，如果你打算反复编辑并保存同一张图片，转成 PNG 就能避免画质进一步下降。",
    keywords: ["jpg to png", "jpeg to png", "convert jpg to png", "jpg to png converter"],
  },
  {
    slug: "/png-to-webp",
    from: "PNG",
    to: "webp",
    toLabel: "WebP",
    why: "WebP 和 PNG 一样保留透明度，但体积小得多，因此通常是网站图片的最佳格式。",
    keywords: ["png to webp", "convert png to webp", "png to webp converter"],
  },
  {
    slug: "/webp-to-png",
    from: "WebP",
    to: "png",
    toLabel: "PNG",
    why: "一些较旧的软件和设计工具仍无法打开 WebP。转成 PNG 可保留透明度，并且到处都能用。",
    keywords: ["webp to png", "convert webp to png", "webp to png converter"],
  },
  {
    slug: "/jpg-to-webp",
    from: "JPG",
    to: "webp",
    toLabel: "WebP",
    why: "在相同视觉质量下，WebP 通常比 JPG 小 25-35%，这是图片较多的网站最容易拿到的页面速度提升。",
    keywords: ["jpg to webp", "jpeg to webp", "convert jpg to webp"],
  },
  {
    slug: "/webp-to-jpg",
    from: "WebP",
    to: "jpeg",
    toLabel: "JPG",
    why: "对于早于 WebP 的软件，包括许多印刷服务和较旧的图片编辑器，JPG 是最安全的格式。",
    keywords: ["webp to jpg", "webp to jpeg", "convert webp to jpg"],
  },
];

for (const page of CONVERSION_PAGES) {
  const { slug, from, to, toLabel, why, keywords } = page;

  TOOLS.push({
    slug,
    engine: "convert",
    preset: { targetFormat: to, sourceLabel: from },
    name: `${from} 转 ${toLabel}`,
    h1: `${from} 转 ${toLabel}`,
    title: `${from} 转 ${toLabel} 转换器：免费、无需上传`,
    description: `在浏览器中把 ${from} 转成 ${toLabel}。支持批量转换与质量控制，无需注册、无水印，也不上传任何文件。`,
    keywords: [
      ...keywords,
      `${from.toLowerCase()} to ${toLabel.toLowerCase()} online`,
      `free ${from.toLowerCase()} to ${toLabel.toLowerCase()}`,
      `batch ${from.toLowerCase()} to ${toLabel.toLowerCase()}`,
      "convert image without uploading",
    ],
    intro: `把 ${from} 文件转成 ${toLabel}，无需上传到任何地方。拖入一张图片或整个文件夹，调整质量，然后下载结果。`,
    features: [
      `${from} 转 ${toLabel}，保持原始分辨率`,
      "批量转换，一次打包下载 zip",
      "可控制输出文件体积",
      "完全在浏览器中运行，无需上传",
      "免费，无需注册、无水印",
    ],
    faqs: [
      {
        question: `为什么要转换 ${from} 到 ${toLabel}？`,
        answer: why,
      },
      ...(to === "jpeg"
        ? [
            {
              question: "透明区域会怎样？",
              answer:
                "JPG 无法保存透明度，因此透明像素会被填充为纯色。默认使用白色，你也可以在转换前选择其他颜色。",
            },
          ]
        : []),
      {
        question: `转换 ${from} 文件有数量限制吗？`,
        answer:
          "没有。因为转换在你自己的设备上完成，不存在会触顶的服务器配额。实际限制取决于设备内存，文件会逐个处理，以保证一切可控。",
      },
      PRIVACY_FAQ,
      FREE_FAQ,
    ],
    related: ["/convert-image", "/compress-image", "/resize-image"],
    primary: false,
  });
}

export const TOOL_SLUGS: string[] = TOOLS.map((tool) => tool.slug);

export const PRIMARY_TOOLS: ToolDefinition[] = TOOLS.filter(
  (tool) => tool.primary
);

export const CONVERTER_TOOLS: ToolDefinition[] = TOOLS.filter(
  (tool) => !tool.primary
);

export function getTool(slug: string): ToolDefinition | undefined {
  return TOOLS.find((tool) => tool.slug === slug);
}

/**
 * Throwing accessor for route files, so a typo in a slug fails the build
 * rather than rendering an empty page.
 */
export function requireTool(slug: string): ToolDefinition {
  const tool = getTool(slug);
  if (!tool) throw new Error(`Unknown image tool slug: ${slug}`);
  return tool;
}

export function getRelatedTools(tool: ToolDefinition): ToolDefinition[] {
  return tool.related
    .map((slug) => getTool(slug))
    .filter((related): related is ToolDefinition => Boolean(related));
}

export const TOOLS_HUB_PATH = "/tools";
