import type { Metadata } from "next";
import { EditorLayout } from "@/components/editor/EditorLayout";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { AgentSummary } from "@/components/seo/AgentSummary";
import { OG_DEFAULTS } from "@/lib/seo/metadata";

export const metadata: Metadata = {
  title: "在线截图编辑器与模型制作工具",
  description:
    "在浏览器中运行的在线截图编辑器与模型制作工具。可添加渐变背景、Safari 和 Chrome 浏览器模型、阴影、3D 效果和动画。无需注册。",
  keywords: [
    "screenshot editor online free",
    "free screenshot editor",
    "online image editor",
    "screenshot beautifier online",
    "screenshot mockup tool",
    "pika style alternative",
    "shots.so alternative",
    "browser mockup generator",
    "safari browser mockup",
    "chrome browser mockup",
    "browser frame screenshot",
    "screenshot wrapper tool",
    "add background to screenshot free",
    "tweet to screenshot",
    "code snippet screenshot",
    "code to image generator",
    "mockup screenshot",
    "mockup online",
    "mockup screen",
    "mockups ui",
    "mockup ui ux",
    "app mockup generator",
    "ui mockup generator",
    "shots app alternative",
    "shots net alternative",
    "moqups alternative",
    "previewed app alternative",
    "appshots alternative",
    "goodmockups alternative",
    "mockup me alternative",
    "screenshot editor online free",
    "best screenshot editor online",
    "screenshot editor without watermark",
    "screenshot editor online free without watermark",
    "screenshot editor no download",
    "uizard screenshot editor alternative",
    "mockup generator",
    "free mockup generator",
    "mockup generator free",
    "mockup online generator",
    "mockup online editor",
    "mockup editor online free",
    "mockup design online",
    "mockup free online",
    "free online mockup generator no watermark",
    "free mockup generator without watermark",
    "app mockup generator",
    "website mockup generator",
    "free website mockup generator",
    "website mockup generator from url",
    "laptop mockup generator",
    "product mockup generator",
    "free online 3d mockup generator",
    "best mockup generator",
    "best online mockup generator",
    "mockup app",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    ...OG_DEFAULTS,
    title: "Screenshot Studio - 免费截图编辑器与模型生成器",
    description:
      "免费在线截图编辑器：添加背景、阴影、3D 效果和动画。导出为 PNG、JPG 或视频。",
    url: "/",
  },
};

export default async function EditorPage() {
  return (
    <>
      <AgentSummary />
      <ErrorBoundary>
        <EditorLayout />
      </ErrorBoundary>
    </>
  );
}
