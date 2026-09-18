import { Metadata } from "next";
import { LandingPage } from "@/components/landing/LandingPage";

export const metadata: Metadata = {
  title: "截图模型生成器",
  description:
    "几秒内制作截图模型。浏览器边框、设备模型、100+ 渐变背景、3D 效果、动画和视频导出。免费，无需注册。",
  keywords: [
    "screenshot beautifier",
    "screenshot mockup maker",
    "beautify screenshots online",
    "screenshot background editor",
    "image presentation tool",
    "pika style alternative",
    "shots.so alternative",
    "browser window mockup",
    "safari browser mockup generator",
    "chrome browser frame generator",
    "screenshot wrapper online",
    "tweet to screenshot",
    "code snippet to image",
  ],
  openGraph: {
    title: "Screenshot Studio - 截图模型生成器",
    description:
      "把截图变成专业图形。100+ 背景、浏览器模型、3D 效果、动画和视频导出。无需注册。",
    url: "/landing",
  },
  alternates: {
    canonical: "/landing",
  },
};

// How It Works - 3 steps
const howItWorks = [
  {
    step: 1,
    title: "拖入你的图片",
    description: "把任意截图或照片拖进编辑器即可开始。",
  },
  {
    step: 2,
    title: "美化",
    description: "几次点击即可添加背景、阴影、边框和文字。",
  },
  {
    step: 3,
    title: "导出",
    description: "几秒钟下载一张可直接分享的精美图片。",
  },
];

// Video testimonials
const videoTestimonials = [
  {
    videoId: "NAS4BEP2KtA",
    startTime: 3562,
    endTime: 3768,
  },
  {
    videoId: "29S4pv64Tbg",
    startTime: 222,
  },
];

export default function LandingPageRoute() {
  return (
    <LandingPage
      heroTitle="漂亮的图片。毫不费力。"
      heroSubtitle="截图，随时可发布。"
      heroDescription="免费的浏览器编辑器，让你的截图、推文和代码看起来更专业。浏览器模型、3D 效果等。"
      ctaLabel="打开编辑器"
      ctaHref="/"
      howItWorks={howItWorks}
      videoTestimonials={videoTestimonials}
      videoTestimonialsTitle="创作者喜爱 Screenshot Studio"
      brandName="Screenshot Studio"
    />
  );
}
