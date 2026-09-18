'use client';

import * as React from 'react';
import { useImageStore, useEditorStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { getBackgroundCSS } from '@/lib/constants/backgrounds';
import { aspectRatios } from '@/lib/constants/aspect-ratios';
import { SectionWrapper } from './SectionWrapper';

interface TransformPreset {
  name: string;
  values: {
    perspective: number;
    rotateX: number;
    rotateY: number;
    rotateZ: number;
    translateX: number;
    translateY: number;
    scale: number;
  };
}

interface PresetCategory {
  /**
   * 稳定标识。**不要**用 `name` 做 key / 比较 / defaultOpen 判据 ——
   * `name` 是展示文案（会被汉化或改词），一旦按它做逻辑匹配，改文案就会静默失效。
   * 参见 `docs/01-Projects/R20260915-01-编辑器工作流与信息架构改善/03-分析报告_现状诊断.md` §5.2。
   */
  id: string;
  name: string;
  presets: TransformPreset[];
}

const PRESET_CATEGORIES: PresetCategory[] = [
  {
    id: 'popular',
    name: '热门',
    presets: [
      { name: '默认', values: { perspective: 2400, rotateX: 0, rotateY: 0, rotateZ: 0, translateX: 0, translateY: 0, scale: 1 } },
      { name: 'SaaS 首屏', values: { perspective: 2400, rotateX: 8, rotateY: -6, rotateZ: 0, translateX: 0, translateY: -2, scale: 0.98 } },
      { name: '产品图', values: { perspective: 2000, rotateX: 5, rotateY: 12, rotateZ: 0, translateX: 3, translateY: -1, scale: 0.97 } },
      { name: '应用预览', values: { perspective: 2400, rotateX: 12, rotateY: -10, rotateZ: 0, translateX: -2, translateY: -3, scale: 0.96 } },
      { name: '简洁角度', values: { perspective: 2400, rotateX: 6, rotateY: 8, rotateZ: -2, translateX: 2, translateY: -1, scale: 0.98 } },
      { name: '落地页', values: { perspective: 1800, rotateX: 15, rotateY: 0, rotateZ: 0, translateX: 0, translateY: -5, scale: 0.95 } },
    ],
  },
  {
    id: 'basic',
    name: '基础',
    presets: [
      { name: '左倾', values: { perspective: 2400, rotateX: 0, rotateY: 0, rotateZ: -8, translateX: 0, translateY: 0, scale: 0.95 } },
      { name: '右倾', values: { perspective: 2400, rotateX: 0, rotateY: 0, rotateZ: 8, translateX: 0, translateY: 0, scale: 0.95 } },
      { name: '轻微左倾', values: { perspective: 2400, rotateX: 3, rotateY: -8, rotateZ: 0, translateX: -2, translateY: 0, scale: 1 } },
      { name: '轻微右倾', values: { perspective: 2400, rotateX: 3, rotateY: 8, rotateZ: 0, translateX: 2, translateY: 0, scale: 1 } },
      { name: '后仰', values: { perspective: 2400, rotateX: -15, rotateY: 0, rotateZ: 0, translateX: 0, translateY: 5, scale: 0.98 } },
      { name: '前倾', values: { perspective: 2400, rotateX: 18, rotateY: 0, rotateZ: 0, translateX: 0, translateY: -4, scale: 0.97 } },
    ],
  },
  {
    id: 'dramatic',
    name: '戏剧感',
    presets: [
      { name: '左侧强透视', values: { perspective: 2400, rotateX: 10, rotateY: -20, rotateZ: 8, translateX: -4, translateY: -2, scale: 0.95 } },
      { name: '右侧强透视', values: { perspective: 2400, rotateX: 10, rotateY: 20, rotateZ: -8, translateX: 4, translateY: -2, scale: 0.95 } },
      { name: '主视觉居左', values: { perspective: 1800, rotateX: 8, rotateY: -25, rotateZ: 5, translateX: -6, translateY: 0, scale: 0.92 } },
      { name: '主视觉居右', values: { perspective: 1800, rotateX: 8, rotateY: 25, rotateZ: -5, translateX: 6, translateY: 0, scale: 0.92 } },
      { name: '展示左', values: { perspective: 1500, rotateX: 15, rotateY: -30, rotateZ: 5, translateX: -10, translateY: -3, scale: 0.88 } },
      { name: '展示右', values: { perspective: 1500, rotateX: 15, rotateY: 30, rotateZ: -5, translateX: 10, translateY: -3, scale: 0.88 } },
    ],
  },
  {
    id: 'perspective',
    name: '透视',
    presets: [
      { name: '俯视', values: { perspective: 2400, rotateX: 40, rotateY: 0, rotateZ: 0, translateX: 0, translateY: -5, scale: 0.95 } },
      { name: '自下而上', values: { perspective: 2400, rotateX: -35, rotateY: 0, rotateZ: 0, translateX: 0, translateY: 8, scale: 0.95 } },
      { name: '平放', values: { perspective: 2400, rotateX: 55, rotateY: 0, rotateZ: 0, translateX: 0, translateY: -12, scale: 0.8 } },
      { name: '杂志', values: { perspective: 2400, rotateX: 58, rotateY: 8, rotateZ: 38, translateX: 0, translateY: -8, scale: 0.82 } },
      { name: '等距左', values: { perspective: 2400, rotateX: 45, rotateY: 0, rotateZ: -45, translateX: 0, translateY: -5, scale: 0.9 } },
      { name: '等距右', values: { perspective: 2400, rotateX: 38.4, rotateY: -6.4, rotateZ: 25, translateX: 0, translateY: -5.8, scale: 0.9 } },
      { name: '等距顶部', values: { perspective: 2400, rotateX: 50, rotateY: 0, rotateZ: 45, translateX: 0, translateY: -8, scale: 0.85 } },
      { name: '台面左倾', values: { perspective: 2400, rotateX: 55, rotateY: 10, rotateZ: -35, translateX: 0, translateY: -10, scale: 0.8 } },
    ],
  },
  {
    id: 'scale',
    name: '缩放',
    presets: [
      { name: '中心缩放', values: { perspective: 2400, rotateX: 0, rotateY: 0, rotateZ: 0, translateX: 0, translateY: 0, scale: 1.2 } },
      { name: '左侧缩放', values: { perspective: 2400, rotateX: 0, rotateY: 8, rotateZ: 0, translateX: 15, translateY: 0, scale: 1.15 } },
      { name: '右侧缩放', values: { perspective: 2400, rotateX: 0, rotateY: -8, rotateZ: 0, translateX: -15, translateY: 0, scale: 1.15 } },
      { name: '顶部缩放', values: { perspective: 2400, rotateX: 5, rotateY: 0, rotateZ: 0, translateX: 0, translateY: 12, scale: 1.15 } },
      { name: '底部缩放', values: { perspective: 2400, rotateX: -5, rotateY: 0, rotateZ: 0, translateX: 0, translateY: -12, scale: 1.15 } },
    ],
  },
  {
    id: 'half-section',
    name: '半区',
    presets: [
      { name: '左半部', values: { perspective: 2400, rotateX: 0, rotateY: 12, rotateZ: -2, translateX: 20, translateY: 0, scale: 1.25 } },
      { name: '右半部', values: { perspective: 2400, rotateX: 0, rotateY: -12, rotateZ: 2, translateX: -20, translateY: 0, scale: 1.25 } },
      { name: '上半部', values: { perspective: 2400, rotateX: 10, rotateY: 0, rotateZ: 0, translateX: 0, translateY: 18, scale: 1.25 } },
      { name: '下半部', values: { perspective: 2400, rotateX: -10, rotateY: 0, rotateZ: 0, translateX: 0, translateY: -18, scale: 1.25 } },
    ],
  },
  {
    id: 'float',
    name: '悬浮',
    presets: [
      { name: '向上浮动', values: { perspective: 2400, rotateX: 12, rotateY: 0, rotateZ: 0, translateX: 0, translateY: -10, scale: 1.05 } },
      { name: '向下浮动', values: { perspective: 2400, rotateX: -8, rotateY: 0, rotateZ: 0, translateX: 0, translateY: 10, scale: 1.05 } },
      { name: '悬停左移', values: { perspective: 2000, rotateX: 5, rotateY: -15, rotateZ: 3, translateX: -8, translateY: -5, scale: 1.02 } },
      { name: '悬停右移', values: { perspective: 2000, rotateX: 5, rotateY: 15, rotateZ: -3, translateX: 8, translateY: -5, scale: 1.02 } },
    ],
  },
];

const ALL_PRESETS = PRESET_CATEGORIES.flatMap((cat) => cat.presets);

export function TransformsGallery() {
  const {
    uploadedImageUrl,
    perspective3D,
    setPerspective3D,
    backgroundConfig,
    backgroundBorderRadius,
    borderRadius,
    imageShadow,
  } = useImageStore();

  const { screenshot } = useEditorStore();

  const selectedAspectRatio = useImageStore((s) => s.selectedAspectRatio);
  const ar = aspectRatios.find((a) => a.id === selectedAspectRatio);
  const cssAspectRatio = ar ? `${ar.width} / ${ar.height}` : '4 / 3';

  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);

  React.useEffect(() => {
    const idx = ALL_PRESETS.findIndex((preset) => {
      const v = preset.values;
      return (
        Math.abs(v.rotateX - perspective3D.rotateX) < 2 &&
        Math.abs(v.rotateY - perspective3D.rotateY) < 2 &&
        Math.abs(v.rotateZ - perspective3D.rotateZ) < 2
      );
    });
    setSelectedIndex(idx >= 0 ? idx : null);
  }, [perspective3D]);

  const getGlobalIndex = (categoryIndex: number, presetIndex: number): number => {
    let index = 0;
    for (let i = 0; i < categoryIndex; i++) {
      index += PRESET_CATEGORIES[i].presets.length;
    }
    return index + presetIndex;
  };

  const applyPreset = (preset: TransformPreset, index: number) => {
    setPerspective3D(preset.values);
    setSelectedIndex(index);
  };

  const previewImageUrl = uploadedImageUrl || screenshot?.src || null;

  // Use the same background CSS as the main canvas
  const backgroundStyle = getBackgroundCSS(backgroundConfig);
  const previewBorderRadius = Math.round(backgroundBorderRadius * 0.15);
  const previewImageRadius = Math.round(Math.min(borderRadius, 20) * 0.3);

  return (
    <div className="space-y-1">
      {PRESET_CATEGORIES.map((category, categoryIndex) => (
        <SectionWrapper
          key={category.id}
          title={category.name}
          defaultOpen={category.id === 'popular'}
        >
          <div className="space-y-2">
            {category.presets.map((preset, presetIndex) => {
              const globalIndex = getGlobalIndex(categoryIndex, presetIndex);
              const isSelected = selectedIndex === globalIndex;
              const { perspective, rotateX, rotateY, rotateZ, translateX, translateY, scale } = preset.values;
              return (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => applyPreset(preset, globalIndex)}
                  className={cn(
                    'relative w-full rounded-md overflow-hidden transition-all duration-200 group/card cursor-pointer',
                    'border',
                    isSelected
                      ? 'border-primary ring-1 ring-foreground/20'
                      : 'border-foreground/10 hover:border-foreground/20'
                  )}
                  style={{ aspectRatio: cssAspectRatio }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      ...backgroundStyle,
                      borderRadius: `${previewBorderRadius}px`,
                    }}
                  />

                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ perspective: `${perspective}px` }}
                  >
                    {previewImageUrl ? (
                      <div
                        className="w-[85%] h-[85%] transition-transform duration-150"
                        style={{
                          transform: `translate(${translateX}%, ${translateY}%) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`,
                          transformOrigin: 'center center',
                        }}
                      >
                        <img
                          src={previewImageUrl}
                          alt={preset.name}
                          className="w-full h-full object-contain"
                          style={{
                            borderRadius: `${previewImageRadius}px`,
                            filter: imageShadow.enabled
                              ? `drop-shadow(${imageShadow.offsetX * 0.15}px ${imageShadow.offsetY * 0.15}px ${(imageShadow.blur + imageShadow.spread) * 0.15}px ${imageShadow.color})`
                              : undefined,
                          }}
                        />
                      </div>
                    ) : (
                      <div
                        className="w-[85%] h-[85%] bg-foreground/[0.08] rounded-md border border-foreground/10"
                        style={{
                          transform: `translate(${translateX}%, ${translateY}%) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`,
                          transformOrigin: 'center center',
                        }}
                      />
                    )}
                  </div>

                  <div className={cn(
                    'absolute bottom-0 inset-x-0 flex justify-center pb-1.5 transition-opacity duration-150',
                    isSelected ? 'opacity-100' : 'opacity-0 group-hover/card:opacity-100'
                  )}>
                    <span className={cn(
                      'px-2 py-0.5 rounded-md text-[10px] font-medium border',
                      isSelected
                        ? 'bg-card text-foreground border-foreground/20'
                        : 'bg-background/90 text-muted-foreground border-foreground/10'
                    )}>
                      {preset.name}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </SectionWrapper>
      ))}

      {!previewImageUrl && (
        <div className="p-3 rounded-md bg-foreground/[0.04] border border-foreground/10 text-center">
          <p className="text-xs text-muted-foreground">
            上传图片以查看变换预览
          
          </p>
        </div>
      )}
    </div>
  );
}
