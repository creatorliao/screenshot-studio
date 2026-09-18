'use client';

import * as React from 'react';
import { useImageStore, type ImageFilters } from '@/lib/store';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { SectionWrapper } from './SectionWrapper';
import { RotateClockwiseIcon } from 'hugeicons-react';

export function SettingsSection() {
  const {
    imageFilters,
    backgroundBorderRadius,
    setImageFilter,
    resetImageFilters,
    setBackgroundBorderRadius,
  } = useImageStore();

  const foregroundFilters: { key: keyof ImageFilters; label: string; min: number; max: number; defaultValue: number; suffix: string }[] = [
    { key: 'brightness', label: '亮度', min: 0, max: 200, defaultValue: 100, suffix: '' },
    { key: 'contrast', label: '对比度', min: 0, max: 200, defaultValue: 100, suffix: '' },
    { key: 'saturate', label: '饱和度', min: 0, max: 200, defaultValue: 100, suffix: '' },
    { key: 'grayscale', label: '灰度', min: 0, max: 100, defaultValue: 0, suffix: '' },
    { key: 'sepia', label: '棕褐色', min: 0, max: 100, defaultValue: 0, suffix: '' },
    { key: 'hueRotate', label: '色相', min: 0, max: 360, defaultValue: 0, suffix: '°' },
    { key: 'blur', label: '模糊', min: 0, max: 20, defaultValue: 0, suffix: 'px' },
    { key: 'invert', label: '反色', min: 0, max: 100, defaultValue: 0, suffix: '' },
  ];

  const isFiltersModified = Object.entries(imageFilters).some(([key, value]) => {
    const filter = foregroundFilters.find((f) => f.key === key);
    return filter && value !== filter.defaultValue;
  });

  return (
    <>
      {/*
        这里只保留「图片」滤镜。
        改造前它有一个 图片 / 背景 的二选一，把"背景模糊/噪点"也放在这里 ——
        于是"调背景"这件事被切在两个 Tab 里：背景本身在「BG」，背景的模糊与颗粒
        却在「设计 → 颜色滤镜」。现在背景的模糊/颗粒/不透明度统一收进背景面板
        （见 `04-方案` 模块 3 第 6 条）。
      */}
      <SectionWrapper title="颜色滤镜" defaultOpen={false}>
        <div className="space-y-2">
          {foregroundFilters.map((filter) => (
            <Slider
              key={filter.key}
              value={[imageFilters[filter.key]]}
              onValueChange={(value) => setImageFilter(filter.key, value[0])}
              min={filter.min}
              max={filter.max}
              step={1}
              label={filter.label}
              valueDisplay={`${imageFilters[filter.key]}${filter.suffix}`}
            />
          ))}

          {isFiltersModified && (
            <Button
              variant="outline"
              size="sm"
              onClick={resetImageFilters}
              className="w-full h-8 text-xs text-muted-foreground hover:text-foreground"
            >
              <RotateClockwiseIcon size={14} className="mr-2" />
              重置所有滤镜
            </Button>
          )}
        </div>
      </SectionWrapper>

      <SectionWrapper title="画布" defaultOpen={false}>
        <Slider
          value={[backgroundBorderRadius]}
          onValueChange={(value) => setBackgroundBorderRadius(value[0])}
          min={0}
          max={100}
          step={1}
          label="圆角"
          valueDisplay={`${backgroundBorderRadius}px`}
        />
      </SectionWrapper>
    </>
  );
}
