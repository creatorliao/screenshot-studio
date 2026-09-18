import { MagicBento, type MagicBentoCard } from "./MagicBento";
import {
  BackgroundsVisual,
  CaptureVisual,
  ExportVisual,
  FramesVisual,
  MotionVisual,
  TransformsVisual,
} from "./BentoCardVisuals";

const FEATURE_CARDS: MagicBentoCard[] = [
  {
    title: "设备边框",
    description: "macOS、Windows、Arc 等",
    label: "边框",
    visual: <FramesVisual />,
  },
  {
    title: "3D 变换",
    description: "30+ 透视预设，倾斜效果逼真。",
    label: "深度",
    visual: <TransformsVisual />,
  },
  {
    title: "精美背景",
    description:
      "100+ 渐变、纯色、图片、模糊和噪点。一键美化。",
    label: "样式",
    visual: <BackgroundsVisual />,
    large: true,
  },
  {
    title: "动画与视频",
    description:
      "20+ 预设，外加时间轴编辑器。可导出 MP4、WebM 或 GIF。",
    label: "动效",
    visual: <MotionVisual />,
    large: true,
  },
  {
    title: "推文与代码片段",
    description: "粘贴推文 URL，或拖入代码。",
    label: "截取",
    visual: <CaptureVisual />,
  },
  {
    title: "高分辨率导出",
    description: "支持最高 5× 的 PNG 或 JPG。",
    label: "导出",
    visual: <ExportVisual />,
  },
];

export function FeaturesBento(): React.JSX.Element {
  return (
    <section className="bg-background px-6 pt-20 pb-4 sm:pt-28 sm:pb-4">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-12 text-center md:mb-14">
          <h2
            className="landing-heading text-[28px] leading-[34px] font-semibold tracking-[-0.03em] sm:text-[36px] sm:leading-[42px] md:text-[44px] md:leading-[50px]"
            style={{
              fontFamily:
                'Inter, "Inter Fallback", Arial, Helvetica, sans-serif',
            }}
          >
            你需要的，全都有。
            
            <br />
            没有多余的。
          
          </h2>
        </div>

        <MagicBento
          cards={FEATURE_CARDS}
          textAutoHide
          enableSpotlight
          enableBorderGlow
          clickEffect
          spotlightRadius={400}
          glowColor="var(--bento-glow-rgb)"
        />
      </div>
    </section>
  );
}
