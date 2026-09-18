"use client";

import { useState } from "react";
import Link from "next/link";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  title?: string;
  faqs?: FAQItem[];
  ctaLabel?: string;
  ctaHref?: string;
}

const defaultFAQs: FAQItem[] = [
  {
    question: "Screenshot Studio 真的免费吗？",
    answer:
      "是的。Screenshot Studio 100% 免费，没有隐藏费用。无限次导出、全部功能、无水印，无需注册。",
  },
  {
    question: "需要注册账号吗？",
    answer:
      "不需要。打开编辑器即可开始创作。你的作品会自动保存在浏览器中，并支持无限次撤销/重做。",
  },
  {
    question: "有哪些边框和样式可用？",
    answer:
      "macOS 与 Windows 浏览器边框、Arc 风格圆角边框、Polaroid 边框、3D 透视变换，以及可自定义的阴影（模糊、扩散、颜色均可调）。",
  },
  {
    question: "支持哪些导出格式？",
    answer:
      "带透明通道的 PNG 或 JPG。最高可导出 5x 分辨率，在任何平台上都清晰锐利。",
  },
  {
    question: "我的数据会存储在你们的服务器上吗？",
    answer:
      "不会。编辑在浏览器中运行，导入的图片不会为了编辑而上传。只有导出压缩会把成品图片发送到服务器，服务器在内存中重新压缩后返回，并不存储。",
  },
];

function FAQItemRow({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}): React.JSX.Element {
  return (
    <div
      className={`mb-3 overflow-hidden rounded-2xl ring-1 transition-[background-color,box-shadow,ring-color] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
        isOpen
          ? "bg-muted ring-ring/15 shadow-[var(--card-edge-shadow)]"
          : "bg-card ring-border shadow-[var(--card-edge-shadow)] hover:ring-ring/15"
      }`}
    >
      <button
        type="button"
        onClick={onClick}
        aria-expanded={isOpen}
        className="group relative flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-5 text-left transition-transform duration-200 ease-out active:scale-[0.99] touch-manipulation sm:px-6 sm:py-5"
      >
        <span
          className={`min-w-0 text-[16px] leading-snug font-semibold tracking-tight transition-colors duration-200 sm:text-[17px] ${
            isOpen ? "text-foreground" : "text-foreground"
          }`}
        >
          {question}
        </span>

        <div
          className={`flex size-8 shrink-0 items-center justify-center rounded-full ring-1 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] sm:size-9 ${
            isOpen
              ? "scale-[1.04] rotate-45 bg-primary ring-primary"
              : "bg-foreground/[0.04] ring-border group-hover:bg-foreground/[0.08] group-hover:scale-[1.04]"
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            className={`size-4 transition-colors duration-300 ${
              isOpen ? "stroke-primary-foreground" : "stroke-muted-foreground"
            }`}
            fill="none"
            strokeWidth="1.8"
            strokeLinecap="round"
            aria-hidden
          >
            <path d="M12 5v14" />
            <path d="M5 12h14" />
          </svg>
        </div>
      </button>

      <div
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="max-w-3xl px-5 pb-5 text-[14.5px] leading-relaxed text-muted-foreground sm:px-6 sm:pb-6 sm:text-[15px]">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
}

export function FAQ({
  // 这两个默认值是函数参数的默认值，汉化 codemod 的四个收集通道都不覆盖，
  // 于是页面上曾渲染出「常见 Questions .」这种中英拼接。
  title = "问题",
  faqs = defaultFAQs,
  ctaLabel = "打开编辑器",
  ctaHref = "/",
}: FAQProps) {
  const [openId, setOpenId] = useState<number | null>(null);
  const items = faqs.slice(0, 5);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section
      id="faq"
      aria-label="常见问题"
      className="w-full bg-background px-6 py-16 sm:py-20 md:py-24"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 lg:flex-row lg:gap-20">
        <div className="h-fit lg:sticky lg:top-32 lg:w-[36%]">
          <h2
            className="landing-heading text-[28px] leading-[34px] font-semibold tracking-[-0.03em] sm:text-[36px] sm:leading-[42px] md:text-[44px] md:leading-[50px]"
            style={{
              fontFamily:
                'Inter, "Inter Fallback", Arial, Helvetica, sans-serif',
            }}
          >
            常见
            
            <br />
            {title}.
          </h2>
          <p className="mt-5 max-w-[300px] text-pretty text-[15px] leading-relaxed text-muted-foreground md:text-base">
            关于 Screenshot Studio、导出以及它如何在浏览器中运行的快速解答。
          
          </p>
        </div>

        <div className="flex flex-col lg:w-[64%]">
          <div className="flex flex-col">
            {items.map((item, idx) => (
              <FAQItemRow
                key={item.question}
                question={item.question}
                answer={item.answer}
                isOpen={openId === idx}
                onClick={() => setOpenId(openId === idx ? null : idx)}
              />
            ))}
          </div>

          <div className="mt-8 flex flex-col items-start justify-between gap-5 rounded-2xl bg-card p-6 ring-1 ring-border shadow-[var(--card-edge-shadow)] sm:flex-row sm:items-center sm:p-7">
            <div>
              <h3 className="text-[17px] font-semibold tracking-tight text-foreground">
                准备好开始创作了吗？
              
              </h3>
              <p className="mt-1.5 text-sm text-muted-foreground">
                加入成千上万创作者的行列，一起制作精美的图片。
              
              </p>
            </div>
            <Link
              href={ctaHref}
              className="inline-flex h-10 shrink-0 items-center justify-center rounded-md bg-[var(--nav-cta-bg)] px-5 text-sm font-medium text-[var(--nav-cta-fg)] shadow-sm [text-shadow:var(--nav-cta-text-shadow)] transition-all duration-200 hover:shadow-[var(--nav-cta-hover-shadow)] active:scale-[0.98]"
            >
              {ctaLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
