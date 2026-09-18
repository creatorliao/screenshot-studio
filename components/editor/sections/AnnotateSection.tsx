'use client';

import * as React from 'react';
import { useImageStore } from '@/lib/store';
import type { AnnotationToolType } from '@/lib/store';
import { SectionWrapper } from './SectionWrapper';
import { cn } from '@/lib/utils';
import { ColorPickerIcon, Delete02Icon } from 'hugeicons-react';
import { Slider } from '@/components/ui/slider';

// ── Tool definitions ──────────────────────────────────────────────────────────

const TOOLS: { id: AnnotationToolType; label: string; svg: React.ReactNode }[] = [
  {
    id: 'arrow',
    label: '箭头',
    svg: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M5 15L15 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M15 5L10 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 5L15 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'curved-arrow',
    label: '曲线',
    svg: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M5 14C5 14 6 6 11 6C14 6 15 8 15 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M12.5 6.5L15.5 8L13 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    ),
  },
  {
    id: 'line',
    label: '直线',
    svg: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M5 15L15 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'rectangle',
    label: '矩形',
    svg: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3.5" y="5" width="13" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 'circle',
    label: '圆形',
    svg: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="6.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 'blur',
    label: '模糊',
    svg: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3.5" y="5" width="13" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2.5 2" />
        <path d="M7.5 9h5M7 11h6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
      </svg>
    ),
  },
];

const COLORS = [
  { value: '#ef4444', name: '红色' },
  { value: '#f97316', name: '橙色' },
  { value: '#eab308', name: '黄色' },
  { value: '#22c55e', name: '绿色' },
  { value: '#06b6d4', name: '青色' },
  { value: '#3b82f6', name: '蓝色' },
  { value: '#8b5cf6', name: '紫色' },
  { value: '#ec4899', name: '粉色' },
  { value: '#f43f5e', name: '玫瑰' },
  { value: '#171717', name: '黑色' },
  { value: '#6b7280', name: '灰色' },
  { value: '#ffffff', name: '白色' },
];

// ── Component ─────────────────────────────────────────────────────────────────

export function AnnotateSection() {
  const {
    annotations,
    activeAnnotationTool,
    setActiveAnnotationTool,
    selectedAnnotationId,
    setSelectedAnnotationId,
    clearAnnotations,
    annotationDefaults,
    setAnnotationDefaults,
    updateAnnotation,
    blurRegions,
    updateBlurRegion,
    removeBlurRegion,
    clearBlurRegions,
  } = useImageStore();

  const selectedAnnotation = selectedAnnotationId
    ? annotations.find((a) => a.id === selectedAnnotationId) ?? null
    : null;

  const currentColor = selectedAnnotation?.strokeColor ?? annotationDefaults.strokeColor;
  const currentWidth = selectedAnnotation?.strokeWidth ?? annotationDefaults.strokeWidth;

  const handleToolClick = (toolId: AnnotationToolType) => {
    setActiveAnnotationTool(activeAnnotationTool === toolId ? null : toolId);
    setSelectedAnnotationId(null);
  };

  const handleColorChange = (color: string) => {
    if (selectedAnnotation) {
      updateAnnotation(selectedAnnotation.id, { strokeColor: color });
    }
    setAnnotationDefaults({ strokeColor: color });
  };

  const handleWidthChange = (width: number) => {
    if (selectedAnnotation) {
      updateAnnotation(selectedAnnotation.id, { strokeWidth: width });
    }
    setAnnotationDefaults({ strokeWidth: width });
  };

  const totalItems = annotations.length + blurRegions.length;

  return (
    <SectionWrapper title="绘制与标注" defaultOpen={true}>
      <div className="space-y-3">

        <div className="grid grid-cols-3 gap-1.5 p-1">
          {TOOLS.map((tool) => {
            const isActive = activeAnnotationTool === tool.id;
            return (
              <button
                key={tool.id}
                onClick={() => handleToolClick(tool.id)}
                title={`${tool.label}. Click, then draw on canvas`}
                className={cn(
                  'flex flex-col items-center justify-center gap-1 py-2.5 rounded-md text-[11px] font-medium transition-all duration-150 border',
                  isActive
                    ? 'bg-foreground/[0.1] text-foreground border-foreground/20'
                    : 'bg-foreground/[0.04] text-muted-foreground border-foreground/10 hover:bg-foreground/[0.06] hover:text-foreground'
                )}
              >
                {tool.svg}
                <span className="leading-none">{tool.label}</span>
              </button>
            );
          })}
        </div>

        {activeAnnotationTool && (
          <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-md bg-foreground/[0.04] border border-foreground/10">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="relative inline-flex h-2 w-2 rounded-full bg-foreground/70" />
            </span>
            <span className="text-xs text-muted-foreground">
              {activeAnnotationTool === 'blur'
                ? '在画布上绘制要模糊的区域'
                : `Click and drag on canvas to draw ${activeAnnotationTool}`}
            </span>
          </div>
        )}

        {selectedAnnotation && !activeAnnotationTool && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-foreground/[0.04] border border-foreground/10">
            <div className="w-2.5 h-2.5 rounded-full bg-foreground/50 shrink-0" />
            <span className="text-xs text-muted-foreground">
              编辑  <span className="font-medium capitalize text-foreground">{selectedAnnotation.type}</span>。点击画布以取消选择
            
            </span>
          </div>
        )}

        {activeAnnotationTool !== 'blur' && (
          <div className="space-y-3">
            <div className="space-y-2">
              <span className="text-xs font-medium text-muted-foreground">颜色</span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {COLORS.map(({ value, name }) => (
                  <button
                    key={value}
                    onClick={() => handleColorChange(value)}
                    title={name}
                    className={cn(
                      'w-7 h-7 rounded-full transition-all duration-150 shrink-0',
                      currentColor === value
                        ? 'ring-1 ring-foreground/40 ring-offset-2 ring-offset-background scale-110'
                        : 'hover:scale-110'
                    )}
                    style={{
                      backgroundColor: value,
                      boxShadow: value === '#ffffff'
                        ? 'inset 0 0 0 1.5px color-mix(in srgb, var(--foreground) 20%, transparent)'
                        : '0 1px 2px rgba(0,0,0,0.15)',
                    }}
                  />
                ))}
                <div className="w-px h-5 bg-foreground/10 mx-0.5" />
                <label
                  title="选择任意颜色"
                  className={cn(
                    'relative flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full',
                    'border border-foreground/20 bg-foreground/[0.04] text-muted-foreground',
                    'transition-colors hover:bg-foreground/[0.08] hover:text-foreground'
                  )}
                >
                  <input
                    type="color"
                    value={currentColor}
                    onChange={(e) => handleColorChange(e.target.value)}
                    aria-label="选择任意颜色"
                    className="absolute inset-0 z-20 cursor-pointer opacity-0"
                  />
                  <ColorPickerIcon
                    size={13}
                    className="pointer-events-none relative z-10 mb-0.5"
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1.5 border-t border-background/25"
                    style={{ backgroundColor: currentColor }}
                  />
                </label>
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-medium text-muted-foreground">描边</span>
              <Slider
                value={[currentWidth]}
                onValueChange={(v) => handleWidthChange(v[0])}
                min={1}
                max={24}
                step={1}
                valueDisplay={`${currentWidth}px`}
              />
            </div>
          </div>
        )}

        {blurRegions.length > 0 && (
          <div className="space-y-1.5">
            <span className="text-xs font-medium text-muted-foreground">模糊区域</span>
            {blurRegions.map((region, index) => (
              <div
                key={region.id}
                className="flex items-center gap-2 py-1.5 px-2.5 rounded-md bg-foreground/[0.04] border border-foreground/10"
              >
                <span className="text-[11px] text-muted-foreground shrink-0 w-8">#{index + 1}</span>
                <Slider
                  value={[region.blurAmount]}
                  onValueChange={(v) =>
                    updateBlurRegion(region.id, { blurAmount: v[0] })
                  }
                  min={2}
                  max={30}
                  step={1}
                  valueDisplay={`${region.blurAmount}px`}
                />
                <button
                  onClick={() => removeBlurRegion(region.id)}
                  className="p-1 text-muted-foreground hover:text-destructive transition-colors shrink-0 rounded hover:bg-destructive/10"
                  title="移除"
                >
                  <Delete02Icon size={12} />
                </button>
              </div>
            ))}
          </div>
        )}

        {totalItems > 0 && (
          <div className="flex items-center justify-between pt-2 border-t border-foreground/10">
            <span className="text-xs text-muted-foreground tabular-nums">
              {annotations.length > 0 && `${annotations.length} shape${annotations.length !== 1 ? 's' : ''}`}
              {annotations.length > 0 && blurRegions.length > 0 && ', '}
              {blurRegions.length > 0 && `${blurRegions.length} blur region${blurRegions.length !== 1 ? 's' : ''}`}
            </span>
            <button
              onClick={() => { clearAnnotations(); clearBlurRegions(); }}
              className="text-xs font-medium text-muted-foreground hover:text-destructive transition-colors px-2 py-1 rounded-md hover:bg-destructive/10"
            >
              全部清除
            
            </button>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}
