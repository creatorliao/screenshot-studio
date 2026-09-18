import Image from "next/image";

export function ProductOverview(): React.JSX.Element {
  return (
    <section className="border-y border-border bg-background">
      <div className="mx-auto w-full max-w-6xl px-6 py-14 md:py-16 lg:py-20">
        <div className="flex flex-col items-center gap-10 md:flex-row md:items-stretch md:gap-0 lg:gap-0">
          <div className="hidden w-full shrink-0 justify-center md:flex md:w-[30%] md:justify-start md:pr-12 lg:w-[28%] lg:pr-16">
            <Image
              src="/logo-mark.png"
              alt="Screenshot Studio"
              width={256}
              height={256}
              className="h-60 w-60 self-end object-contain lg:h-64 lg:w-64"
              priority
            />
          </div>

          <div
            className="hidden w-px shrink-0 self-stretch bg-border md:block"
            aria-hidden="true"
          />

          <div className="min-w-0 flex-1 text-left md:pl-12 lg:pl-16">
            <h2
              className="max-w-4xl text-[28px] leading-[34px] font-semibold tracking-[-0.03em] sm:text-[40px] sm:leading-[46px] md:text-[48px] md:leading-[54px]"
              style={{
                fontFamily:
                  'Inter, "Inter Fallback", Arial, Helvetica, sans-serif',
              }}
            >
              <span className="landing-heading block md:whitespace-nowrap">
                Screenshot Studio？
              
              </span>
            </h2>
            <div className="mt-6 max-w-2xl space-y-2 text-[15px] leading-normal text-muted-foreground md:text-base">
              <p>
                Screenshot Studio 是一款免费、开源的截图编辑器，完全在你的浏览器中运行。它把原始截图变成可以直接发布的图片。无需注册、无水印、无需安装。
              
              </p>
              <p>
                拖入一张截图、推文或代码片段。添加 Safari 或 Chrome 边框、渐变背景、3D 透视和动画。导出 PNG、JPG 或视频，用于社交、文档和演示。
              
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
