import { Metadata } from 'next';
import Link from 'next/link';
import { CodeImageEditorLoader } from '@/components/code-image/CodeImageEditorLoader';
import { OG_DEFAULTS } from '@/lib/seo/metadata';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const metadata: Metadata = {
  title: '代码转图片：创建精美的代码截图',
  description:
    '把代码变成可分享的图片。14 款主题，外加渐变、图片和图案背景，导出清晰的 PNG。免费、无需注册、无水印。',
  keywords: [
    'code to image',
    'code snippet screenshot',
    'code screenshot generator',
    'ray.so alternative',
    'carbon alternative',
    'carbon.now.sh alternative',
    'code to png',
    'syntax highlighting screenshot',
    'beautiful code screenshots',
    'code image generator free',
    'share code as image',
    'code snippet generator',
  ],
  openGraph: {
    ...OG_DEFAULTS,
    title: '代码转图片：创建精美的代码截图',
    description:
      '把代码变成精美、可分享的图片。14 款主题、渐变、图片和窗口边框。免费，无需注册。',
    url: '/code',
  },
  alternates: {
    canonical: '/code',
  },
};

const faqs = [
  {
    question: '这个代码转图片工具免费吗？',
    answer:
      '是的。所有主题、背景和导出选项都免费，无需注册，也没有水印。',
  },
  {
    question: '包含多少种语法主题？',
    answer:
      '14 种配色主题（午夜、糖果、日落等），每种都可搭配专属渐变、Screenshot Studio 的渐变与图片背景之一，或简单的图案。',
  },
  {
    question: '可以导出透明背景吗？',
    answer:
      '可以。导出前关闭背景开关，PNG 就会保留透明底色。',
  },
  {
    question: '我可以使用哪些类型的背景？',
    answer:
      '可以选主题自带的渐变、数十款渐变预设之一、真实图片背景，或简单的网格、圆点、线条图案，全部在背景选择器中完成。',
  },
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Screenshot Studio - Code to Image',
      applicationCategory: 'DesignApplication',
      operatingSystem: 'Web Browser',
      description:
        'Free tool that turns code into a beautiful, shareable image with syntax themes, gradient backgrounds, and window styles.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList: [
        '14 syntax highlighting themes',
        'Gradient, image, and pattern backgrounds',
        'Resizable window frame with macOS or no title bar',
        'Transparent background export',
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
  ],
};

export default function CodeImagePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <CodeImageEditorLoader />
      <section className="bg-background px-6 pt-16 pb-48">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-3 text-2xl font-semibold tracking-[-0.02em] text-foreground">
            代码转图片生成器
          
          </h1>
          <p className="mb-10 text-muted-foreground">
            粘贴代码片段，选择主题和背景，几秒内导出清晰的 PNG。无需注册、没有水印，一切都在浏览器中运行。
          
          </p>
          <Accordion type="single" collapsible>
            {faqs.map((faq) => (
              <AccordionItem key={faq.question} value={faq.question}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <p className="mt-10 text-sm text-muted-foreground">
            从其他工具换过来？看看它与{' '}
            <Link href="/compare/carbon" className="underline">Carbon</Link>
            {' '}和{' '}
            <Link href="/compare/ray-so" className="underline">Ray.so</Link>，或浏览{' '}
            <Link href="/features/code-snippets" className="underline">
              代码片段功能
            
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
