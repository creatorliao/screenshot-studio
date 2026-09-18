'use client';

import * as React from 'react';
import { useImageStore, type ImageFilters } from '@/lib/store';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { SegmentedControl } from '@/components/ui/segmented-control';
import { SectionWrapper } from './SectionWrapper';
import { RotateClockwiseIcon } from 'hugeicons-react';

type FilterTarget = 'foreground' | 'background';

export function SettingsSection() {
  const {
    imageFilters,
    backgroundBorderRadius,
    backgroundBlur,
    backgroundNoise,
    setImageFilter,
    resetImageFilters,
    setBackgroundBorderRadius,
    setBackgroundBlur,
    setBackgroundNoise,
  } = useImageStore();

  const [filterTarget, setFilterTarget] = React.useState<FilterTarget>('foreground');

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

  const isBackgroundFiltersModified = backgroundBlur !== 0 || backgroundNoise !== 0;

  const resetBackgroundFilters = () => {
    setBackgroundBlur(0);
    setBackgroundNoise(0);
  };

  return (
    <>
      <SectionWrapper title="颜色滤镜" defaultOpen={false}>
        <div className="space-y-3">
          <SegmentedControl
            value={filterTarget}
            onChange={(id) => setFilterTarget(id as FilterTarget)}
            options={[
              { id: 'foreground', label: '图片' },
              { id: 'background', label: '背景' },
            ]}
          />

          {filterTarget === 'foreground' && (
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
          )}

          {filterTarget === 'background' && (
            <div className="space-y-2">
              <Slider
                value={[backgroundBlur]}
                onValueChange={(value) => setBackgroundBlur(value[0])}
                min={0}
                max={50}
                step={1}
                label="模糊"
                valueDisplay={`${backgroundBlur}px`}
              />
              <Slider
                value={[backgroundNoise]}
                onValueChange={(value) => setBackgroundNoise(value[0])}
                min={0}
                max={100}
                step={1}
                label="噪点"
                valueDisplay={`${backgroundNoise}%`}
              />

              {isBackgroundFiltersModified && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetBackgroundFilters}
                  className="w-full h-8 text-xs text-muted-foreground hover:text-foreground"
                >
                  <RotateClockwiseIcon size={14} className="mr-2" />
                  重置背景滤镜
                
                </Button>
              )}
            </div>
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
