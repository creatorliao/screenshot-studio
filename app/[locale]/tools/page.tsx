import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight01Icon, CheckmarkCircle02Icon } from "hugeicons-react";
import { Navigation } from "@/components/landing/Navigation";
import { Footer } from "@/components/landing/Footer";
import { OG_DEFAULTS } from "@/lib/seo/metadata";
import { buildToolsHubJsonLd } from "@/lib/seo/tool-metadata";
import {
  CONVERTER_TOOLS,
  PRIMARY_TOOLS,
  TOOLS,
  TOOLS_HUB_PATH,
} from "@/lib/seo/tools";

export const metadata: Metadata = {
  title: "免费在线图片工具：压缩、转换、调整尺寸、裁剪",
  description:
    "在浏览器中压缩、转换、调整尺寸、裁剪和旋转图片。支持批量处理，无需注册、无水印，任何文件都不会被上传。",
  keywords: [
    "image tools",
    "online image tools",
    "free image editor tools",
    "compress image",
    "convert image",
    "resize image",
    "crop image",
    "rotate image",
    "batch image tools",
    "image tools without upload",
    "iloveimg alternative",
    "privacy friendly image tools",
  ],
  openGraph: {
    ...OG_DEFAULTS,
    title: "免费在线图片工具：压缩、转换、调整尺寸、裁剪",
    description:
      "一套完全在浏览器中运行的免费图片工具。支持批量处理，无需注册，无水印，无需上传。",
    url: TOOLS_HUB_PATH,
  },
  alternates: {
    canonical: TOOLS_HUB_PATH,
  },
};

const PROMISES = [
  "不上传任何内容，所有工具都在你的浏览器中运行",
  "批量处理，一次打包下载 zip",
  "永久免费，无需注册、无水印",
  "基于 Apache 2.0 许可开源",
];

export default function ToolsHubPage() {
  const jsonLd = buildToolsHubJsonLd(TOOLS);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />

      <main className="bg-background">
        <section className="px-6 pt-28 pb-12">
          <div className="mx-auto max-w-5xl">
            <h1 className="mb-3 text-3xl font-semibold tracking-[-0.02em] text-foreground sm:text-4xl">
              免费在线图片工具
            
            </h1>
            <p className="max-w-2xl text-base text-muted-foreground">
              无需上传到任何地方，即可压缩、转换、调整尺寸、裁剪和旋转图片。下面每个工具都完全在浏览器内运行，可一次处理整个文件夹，而且完全免费。
            
            </p>

            <ul className="mt-8 grid gap-2.5 sm:grid-cols-2">
              {PROMISES.map((promise) => (
                <li key={promise} className="flex items-start gap-2.5">
                  <CheckmarkCircle02Icon
                    size={17}
                    className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-500"
                    aria-hidden="true"
                  />
                  <span className="text-sm text-muted-foreground">{promise}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="px-6 pb-16">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-4 text-xl font-semibold tracking-[-0.01em] text-foreground">
              工具
            
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {PRIMARY_TOOLS.map((tool) => (
                <Link
                  key={tool.slug}
                  href={tool.slug}
                  className="group flex flex-col rounded-xl border border-border bg-card p-5 transition-colors hover:border-foreground/25"
                >
                  <span className="mb-1.5 flex items-center justify-between gap-2 text-base font-medium text-foreground">
                    {tool.name}
                    <ArrowRight01Icon
                      size={16}
                      className="text-muted-foreground transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {tool.description}
                  </span>
                </Link>
              ))}
            </div>

            <h2 className="mt-12 mb-4 text-xl font-semibold tracking-[-0.01em] text-foreground">
              格式转换器
            
            </h2>
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {CONVERTER_TOOLS.map((tool) => (
                <Link
                  key={tool.slug}
                  href={tool.slug}
                  className="rounded-lg border border-border bg-card px-4 py-3 text-center text-sm font-medium text-foreground transition-colors hover:border-foreground/25"
                >
                  {tool.name}
                </Link>
              ))}
            </div>

            <p className="mt-12 max-w-2xl text-sm text-muted-foreground">
              想要的不只是快速修图？{" "}
              <Link href="/" className="underline">
                Screenshot Studio 编辑器
              
              </Link>{" "}
              把普通截图变成完整的成品图，包含渐变背景、浏览器模型、阴影、3D 透视、标注和视频导出，并且{" "}
              <Link href="/code" className="underline">
                代码图片
              
              </Link>{" "}
              对代码片段也是如此。
            
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
