'use client';

import * as React from 'react';
import { useImageStore } from '@/lib/store';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ShadowControls } from '@/components/controls/ShadowControls';

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

const PRESETS: TransformPreset[] = [
  {
    name: '默认',
    values: {
      perspective: 200,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      translateX: 0,
      translateY: 0,
      scale: 1,
    },
  },
  {
    name: '轻微左倾',
    values: {
      perspective: 1000,
      rotateX: 3,
      rotateY: -5,
      rotateZ: 0,
      translateX: 0,
      translateY: 0,
      scale: 1,
    },
  },
  {
    name: '轻微右倾',
    values: {
      perspective: 1000,
      rotateX: -3,
      rotateY: 5,
      rotateZ: 0,
      translateX: 0,
      translateY: 0,
      scale: 1,
    },
  },
  {
    name: '左侧强透视',
    values: {
      perspective: 800,
      rotateX: 10,
      rotateY: -25,
      rotateZ: 0,
      translateX: 0,
      translateY: 0,
      scale: 1,
    },
  },
  {
    name: '右侧强透视',
    values: {
      perspective: 800,
      rotateX: -10,
      rotateY: 25,
      rotateZ: 0,
      translateX: 0,
      translateY: 0,
      scale: 1,
    },
  },
  {
    name: '左上',
    values: {
      perspective: 1200,
      rotateX: 45,
      rotateY: 0,
      rotateZ: -45,
      translateX: 0,
      translateY: 0,
      scale: 1,
    },
  },
  {
    name: '右上',
    values: {
      perspective: 1200,
      rotateX: 45,
      rotateY: 0,
      rotateZ: 45,
      translateX: 0,
      translateY: 0,
      scale: 1,
    },
  },
  {
    name: '前部深度',
    values: {
      perspective: 1000,
      rotateX: 10,
      rotateY: 0,
      rotateZ: 0,
      translateX: 0,
      translateY: 0,
      scale: 1,
    },
  },
  {
    name: '侧面深度',
    values: {
      perspective: 1000,
      rotateX: 0,
      rotateY: -15,
      rotateZ: 0,
      translateX: 0,
      translateY: 0,
      scale: 1,
    },
  },
  {
    name: '复杂倾斜',
    values: {
      perspective: 900,
      rotateX: 10,
      rotateY: -15,
      rotateZ: 5,
      translateX: 0,
      translateY: 0,
      scale: 1,
    },
  },
  {
    name: '复杂倾斜反向',
    values: {
      perspective: 900,
      rotateX: -10,
      rotateY: 15,
      rotateZ: -5,
      translateX: 0,
      translateY: 0,
      scale: 1,
    },
  },
  {
    name: '左倾斜',
    values: {
      perspective: 800,
      rotateX: 3,
      rotateY: 10,
      rotateZ: -5,
      translateX: 0,
      translateY: 0,
      scale: 1,
    },
  },
  {
    name: '右倾斜',
    values: {
      perspective: 800,
      rotateX: -3,
      rotateY: -10,
      rotateZ: 5,
      translateX: 0,
      translateY: 0,
      scale: 1,
    },
  },
  {
    name: '缩小',
    values: {
      perspective: 900,
      rotateX: 5,
      rotateY: -5,
      rotateZ: 0,
      translateX: 0,
      translateY: 0,
      scale: 1,
    },
  },
  {
    name: '放大',
    values: {
      perspective: 900,
      rotateX: -5,
      rotateY: 5,
      rotateZ: 0,
      translateX: 0,
      translateY: 0,
      scale: 1,
    },
  },
  {
    name: '极致角度',
    values: {
      perspective: 1000,
      rotateX: 10,
      rotateY: 20,
      rotateZ: -15,
      translateX: 0,
      translateY: 0,
      scale: 1,
    },
  },
  {
    name: '极致反向',
    values: {
      perspective: 1000,
      rotateX: -10,
      rotateY: -20,
      rotateZ: 15,
      translateX: 0,
      translateY: 0,
      scale: 1,
    },
  },
];

export function Perspective3DControls() {
  const { perspective3D, setPerspective3D, imageShadow, setImageShadow } = useImageStore();
  const [selectedPresetIndex, setSelectedPresetIndex] = React.useState<number | null>(null);

  React.useEffect(() => {
    const currentIndex = PRESETS.findIndex((preset) => {
      const values = preset.values;
      return (
        Math.abs(values.perspective - perspective3D.perspective) < 10 &&
        Math.abs(values.rotateX - perspective3D.rotateX) < 2 &&
        Math.abs(values.rotateY - perspective3D.rotateY) < 2 &&
        Math.abs(values.rotateZ - perspective3D.rotateZ) < 2 &&
        Math.abs(values.translateX - perspective3D.translateX) < 1 &&
        Math.abs(values.translateY - perspective3D.translateY) < 1 &&
        Math.abs(values.scale - perspective3D.scale) < 0.05
      );
    });
    setSelectedPresetIndex(currentIndex >= 0 ? currentIndex : null);
  }, [perspective3D]);

  const applyPreset = (preset: TransformPreset, index: number) => {
    setPerspective3D(preset.values);
    setSelectedPresetIndex(index);
  };

  const reset = () => {
    setPerspective3D({
      perspective: 200,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      translateX: 0,
      translateY: 0,
      scale: 1,
    });
    setSelectedPresetIndex(0);
  };

  const getTransformStyle = (preset: TransformPreset) => {
    const { rotateX, rotateY, rotateZ, translateX, translateY, scale } = preset.values;
    return {
      transform: `translate(${translateX}%, ${translateY}%) scale(${scale}) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`,
    };
  };

  const getPerspectiveStyle = (preset: TransformPreset) => {
    return {
      perspective: `${preset.values.perspective}px`,
    };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Label className="text-sm font-semibold text-foreground">3D 透视</Label>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={reset}
          className="h-7 px-2 text-xs border border-border/50 hover:border-border"
        >
          重置
        
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-2 overflow-y-auto scroll-m-0 p-1 max-h-64">
        {PRESETS.map((preset, index) => {
          const isSelected = selectedPresetIndex === index;
          return (
            <button
              key={preset.name}
              onClick={() => applyPreset(preset, index)}
              className={cn(
                'flex items-center justify-center bg-secondary w-full aspect-square rounded-sm overflow-hidden transition-all cursor-pointer',
                'hover:opacity-80 active:scale-95',
                isSelected && 'border-2 border-foreground'
              )}
              style={getPerspectiveStyle(preset)}
            >
              <div
                className="w-16 h-16 bg-background"
                style={getTransformStyle(preset)}
              />
            </button>
          );
        })}
      </div>

      {/* Sliders */}
      <div className="space-y-2">
        <Slider
          value={[perspective3D.perspective]}
          onValueChange={(value) => setPerspective3D({ perspective: value[0] })}
          min={50}
          max={1000}
          step={10}
          label="透视"
          valueDisplay={`${perspective3D.perspective}px`}
        />
        <Slider
          value={[perspective3D.rotateX]}
          onValueChange={(value) => setPerspective3D({ rotateX: value[0] })}
          min={-45}
          max={45}
          step={1}
          label="X 轴旋转"
          valueDisplay={`${perspective3D.rotateX}°`}
        />
        <Slider
          value={[perspective3D.rotateY]}
          onValueChange={(value) => setPerspective3D({ rotateY: value[0] })}
          min={-45}
          max={45}
          step={1}
          label="Y 轴旋转"
          valueDisplay={`${perspective3D.rotateY}°`}
        />
        <Slider
          value={[perspective3D.rotateZ]}
          onValueChange={(value) => setPerspective3D({ rotateZ: value[0] })}
          min={-45}
          max={45}
          step={1}
          label="Z 轴旋转"
          valueDisplay={`${perspective3D.rotateZ}°`}
        />
        <Slider
          value={[perspective3D.translateX]}
          onValueChange={(value) => setPerspective3D({ translateX: value[0] })}
          min={-10}
          max={10}
          step={0.5}
          label="X 位移"
          valueDisplay={`${perspective3D.translateX}%`}
        />
        <Slider
          value={[perspective3D.translateY]}
          onValueChange={(value) => setPerspective3D({ translateY: value[0] })}
          min={-10}
          max={10}
          step={0.5}
          label="Y 位移"
          valueDisplay={`${perspective3D.translateY}%`}
        />
      </div>

      <ShadowControls shadow={imageShadow} onShadowChange={setImageShadow} />
    </div>
  );
}

