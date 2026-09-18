import type {
  AnimationPreset,
  AnimationTrack,
  Keyframe,
  EasingFunction,
  AnimatableProperties,
} from '@/types/animation';

// Helper to generate unique IDs
let idCounter = 0;
function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${++idCounter}`;
}

// Helper to create a keyframe
function createKeyframe(
  time: number,
  properties: Partial<AnimatableProperties>,
  easing: EasingFunction = 'ease-out'
): Keyframe {
  return {
    id: generateId('kf'),
    time,
    properties,
    easing,
  };
}

// Helper to create a track
function createTrack(
  name: string,
  type: 'transform' | 'opacity',
  keyframes: Keyframe[]
): AnimationTrack {
  return {
    id: generateId('track'),
    name,
    type,
    keyframes,
    isLocked: false,
    isVisible: true,
  };
}

// ============================================
// ANIMATION PRESETS
// Follows Emil Kowalski's animation best practices:
// - ease-out as default easing for entrances
// - ease-in-out for on-screen movement
// - Never animate from scale(0), minimum scale(0.95)
// - Keep entrance animations snappy (800-1200ms)
// - Use cubic/expo easing for snappier feel
// ============================================

export const ANIMATION_PRESETS: AnimationPreset[] = [
  // ============ REVEAL — 3D Entrance Animations ============
  {
    id: 'hero-landing',
    name: '主视觉落地',
    description: '起始向后倾斜，最终放平——经典的 SaaS 首屏入场',
    category: 'reveal',
    duration: 1200,
    tracks: [
      createTrack('Hero Landing', 'transform', [
        createKeyframe(0, { rotateX: 25, scale: 0.95, perspective: 2400 }, 'ease-out'),
        createKeyframe(1200, { rotateX: 0, scale: 1, perspective: 2400 }, 'ease-out-cubic'),
      ]),
      createTrack('Hero Landing Fade', 'opacity', [
        createKeyframe(0, { imageOpacity: 0 }, 'ease-out'),
        createKeyframe(600, { imageOpacity: 1 }, 'ease-out'),
      ]),
    ],
  },
  {
    id: 'slide-in-3d',
    name: '3D 滑入',
    description: '从右侧进入，带 3D 旋转',
    category: 'reveal',
    duration: 1000,
    tracks: [
      createTrack('Slide In 3D', 'transform', [
        createKeyframe(0, { rotateY: 30, translateX: 35, perspective: 2400 }, 'ease-out'),
        createKeyframe(1000, { rotateY: 0, translateX: 0, perspective: 2400 }, 'ease-out-cubic'),
      ]),
      createTrack('Slide In 3D Fade', 'opacity', [
        createKeyframe(0, { imageOpacity: 0 }, 'ease-out'),
        createKeyframe(500, { imageOpacity: 1 }, 'ease-out'),
      ]),
    ],
  },
  {
    id: 'rise-and-settle',
    name: '升起落定',
    description: '从下方升起并落定到位',
    category: 'reveal',
    duration: 1000,
    tracks: [
      createTrack('Rise & Settle', 'transform', [
        createKeyframe(0, { translateY: 25, rotateX: -15, perspective: 2400, scale: 0.97 }, 'ease-out'),
        createKeyframe(1000, { translateY: 0, rotateX: 0, perspective: 2400, scale: 1 }, 'ease-out-cubic'),
      ]),
      createTrack('Rise & Settle Fade', 'opacity', [
        createKeyframe(0, { imageOpacity: 0 }, 'ease-out'),
        createKeyframe(500, { imageOpacity: 1 }, 'ease-out'),
      ]),
    ],
  },
  {
    id: 'drop-in',
    name: '落入',
    description: '从上方倾斜落下并淡入',
    category: 'reveal',
    duration: 1000,
    tracks: [
      createTrack('Drop In', 'transform', [
        createKeyframe(0, { translateY: -20, rotateX: 12, perspective: 2400, scale: 0.97 }, 'ease-out'),
        createKeyframe(1000, { translateY: 0, rotateX: 0, perspective: 2400, scale: 1 }, 'ease-out-cubic'),
      ]),
      createTrack('Drop In Fade', 'opacity', [
        createKeyframe(0, { imageOpacity: 0 }, 'ease-out'),
        createKeyframe(500, { imageOpacity: 1 }, 'ease-out'),
      ]),
    ],
  },

  // ============ SLIDE — Clean Slide Entrances ============
  {
    id: 'slide-up',
    name: '上滑',
    description: '平滑向上淡入',
    category: 'slide',
    duration: 800,
    tracks: [
      createTrack('Slide Up', 'transform', [
        createKeyframe(0, { translateY: 30, perspective: 2400 }, 'ease-out'),
        createKeyframe(800, { translateY: 0, perspective: 2400 }, 'ease-out-cubic'),
      ]),
      createTrack('Slide Up Fade', 'opacity', [
        createKeyframe(0, { imageOpacity: 0 }, 'ease-out'),
        createKeyframe(400, { imageOpacity: 1 }, 'ease-out'),
      ]),
    ],
  },
  {
    id: 'slide-down',
    name: '下滑',
    description: '平滑向下淡入',
    category: 'slide',
    duration: 800,
    tracks: [
      createTrack('Slide Down', 'transform', [
        createKeyframe(0, { translateY: -30, perspective: 2400 }, 'ease-out'),
        createKeyframe(800, { translateY: 0, perspective: 2400 }, 'ease-out-cubic'),
      ]),
      createTrack('Slide Down Fade', 'opacity', [
        createKeyframe(0, { imageOpacity: 0 }, 'ease-out'),
        createKeyframe(400, { imageOpacity: 1 }, 'ease-out'),
      ]),
    ],
  },
  {
    id: 'slide-left',
    name: '左滑',
    description: '从右侧进入，向左滑动',
    category: 'slide',
    duration: 800,
    tracks: [
      createTrack('Slide Left', 'transform', [
        createKeyframe(0, { translateX: 35, perspective: 2400 }, 'ease-out'),
        createKeyframe(800, { translateX: 0, perspective: 2400 }, 'ease-out-cubic'),
      ]),
      createTrack('Slide Left Fade', 'opacity', [
        createKeyframe(0, { imageOpacity: 0 }, 'ease-out'),
        createKeyframe(400, { imageOpacity: 1 }, 'ease-out'),
      ]),
    ],
  },
  {
    id: 'slide-right',
    name: '右滑',
    description: '从左侧进入，向右滑动',
    category: 'slide',
    duration: 800,
    tracks: [
      createTrack('Slide Right', 'transform', [
        createKeyframe(0, { translateX: -35, perspective: 2400 }, 'ease-out'),
        createKeyframe(800, { translateX: 0, perspective: 2400 }, 'ease-out-cubic'),
      ]),
      createTrack('Slide Right Fade', 'opacity', [
        createKeyframe(0, { imageOpacity: 0 }, 'ease-out'),
        createKeyframe(400, { imageOpacity: 1 }, 'ease-out'),
      ]),
    ],
  },

  // ============ FADE — Opacity-focused Entrances ============
  {
    id: 'fade-in',
    name: '淡入',
    description: '简洁干净的淡入',
    category: 'fade',
    duration: 800,
    tracks: [
      createTrack('Fade In', 'opacity', [
        createKeyframe(0, { imageOpacity: 0 }, 'ease-out'),
        createKeyframe(800, { imageOpacity: 1 }, 'ease-out'),
      ]),
    ],
  },
  {
    id: 'fade-scale',
    name: '淡入缩放',
    description: 'Fades in with a subtle scale-up — popular app entrance',
    category: 'fade',
    duration: 800,
    tracks: [
      createTrack('Fade Scale', 'transform', [
        createKeyframe(0, { scale: 0.96, perspective: 2400 }, 'ease-out'),
        createKeyframe(800, { scale: 1, perspective: 2400 }, 'ease-out-cubic'),
      ]),
      createTrack('Fade Scale Opacity', 'opacity', [
        createKeyframe(0, { imageOpacity: 0 }, 'ease-out'),
        createKeyframe(600, { imageOpacity: 1 }, 'ease-out'),
      ]),
    ],
  },
  {
    id: 'fade-rise',
    name: '淡入上升',
    description: '轻微上升的同时淡入——简约而优雅',
    category: 'fade',
    duration: 800,
    tracks: [
      createTrack('Fade Rise', 'transform', [
        createKeyframe(0, { translateY: 12, scale: 0.98, perspective: 2400 }, 'ease-out'),
        createKeyframe(800, { translateY: 0, scale: 1, perspective: 2400 }, 'ease-out-cubic'),
      ]),
      createTrack('Fade Rise Opacity', 'opacity', [
        createKeyframe(0, { imageOpacity: 0 }, 'ease-out'),
        createKeyframe(600, { imageOpacity: 1 }, 'ease-out'),
      ]),
    ],
  },
  {
    id: 'fade-zoom-out',
    name: '淡入缩小',
    description: '从特写开始缩小并淡入',
    category: 'fade',
    duration: 1000,
    tracks: [
      createTrack('Fade Zoom Out', 'transform', [
        createKeyframe(0, { scale: 1.08, perspective: 2400 }, 'ease-out'),
        createKeyframe(1000, { scale: 1, perspective: 2400 }, 'ease-out-cubic'),
      ]),
      createTrack('Fade Zoom Out Opacity', 'opacity', [
        createKeyframe(0, { imageOpacity: 0 }, 'ease-out'),
        createKeyframe(600, { imageOpacity: 1 }, 'ease-out'),
      ]),
    ],
  },

  // ============ FLIP — Card-Flip Rotations ============
  {
    id: 'flip-x',
    name: '水平翻转',
    description: '沿 X 轴完整 180° 翻转，并带缩放下沉',
    category: 'flip',
    duration: 1500,
    tracks: [
      createTrack('Flip X', 'transform', [
        createKeyframe(0, { rotateX: 0, scale: 1, perspective: 2400 }, 'ease-out'),
        createKeyframe(750, { rotateX: 90, scale: 0.95, perspective: 2400 }, 'ease-in'),
        createKeyframe(1500, { rotateX: 180, scale: 1, perspective: 2400 }, 'ease-out'),
      ]),
    ],
  },
  {
    id: 'flip-y',
    name: '垂直翻转',
    description: '沿 Y 轴完整 180° 翻转，并带缩放下沉',
    category: 'flip',
    duration: 1500,
    tracks: [
      createTrack('Flip Y', 'transform', [
        createKeyframe(0, { rotateY: 0, scale: 1, perspective: 2400 }, 'ease-out'),
        createKeyframe(750, { rotateY: 90, scale: 0.95, perspective: 2400 }, 'ease-in'),
        createKeyframe(1500, { rotateY: 180, scale: 1, perspective: 2400 }, 'ease-out'),
      ]),
    ],
  },
  {
    id: 'peek',
    name: '探出',
    description: '旋转以窥视卡片背后，然后回到原位',
    category: 'flip',
    duration: 2000,
    tracks: [
      createTrack('Peek', 'transform', [
        createKeyframe(0, { rotateY: 0, perspective: 2400 }, 'ease-out'),
        createKeyframe(600, { rotateY: 35, perspective: 2400 }, 'ease-out-cubic'),
        createKeyframe(1400, { rotateY: 35, perspective: 2400 }, 'ease-in-out'),
        createKeyframe(2000, { rotateY: 0, perspective: 2400 }, 'ease-out-cubic'),
      ]),
    ],
  },
  {
    id: 'flip-reveal',
    name: '翻转揭示',
    description: '起始为翻转状态，弹跳旋转展开',
    category: 'flip',
    duration: 1200,
    tracks: [
      createTrack('Flip Reveal', 'transform', [
        createKeyframe(0, { rotateY: -90, scale: 0.95, perspective: 2400 }, 'ease-out'),
        createKeyframe(800, { rotateY: 5, scale: 1.02, perspective: 2400 }, 'ease-out-cubic'),
        createKeyframe(1200, { rotateY: 0, scale: 1, perspective: 2400 }, 'ease-in-out'),
      ]),
      createTrack('Flip Reveal Fade', 'opacity', [
        createKeyframe(0, { imageOpacity: 0 }, 'ease-out'),
        createKeyframe(400, { imageOpacity: 1 }, 'ease-out'),
      ]),
    ],
  },

  // ============ PERSPECTIVE — Perspective Shifts & Tilts ============
  {
    id: 'showcase-tilt',
    name: '展示倾斜',
    description: '缓慢平移到产品展示角度',
    category: 'perspective',
    duration: 2500,
    tracks: [
      createTrack('Showcase Tilt', 'transform', [
        createKeyframe(0, { rotateY: 0, rotateX: 0, perspective: 2400 }, 'ease-in-out'),
        createKeyframe(2500, { rotateY: 18, rotateX: 6, perspective: 2400 }, 'ease-in-out'),
      ]),
    ],
  },
  {
    id: 'isometric',
    name: '等距',
    description: '切换到等距视角',
    category: 'perspective',
    duration: 2000,
    tracks: [
      createTrack('Isometric', 'transform', [
        createKeyframe(0, { rotateX: 0, rotateY: 0, scale: 1, perspective: 2400 }, 'ease-in-out'),
        createKeyframe(2000, { rotateX: 22, rotateY: -22, scale: 0.95, perspective: 2400 }, 'ease-in-out'),
      ]),
    ],
  },
  {
    id: 'hover-float',
    name: '悬停浮动',
    description: '轻微的浮动效果——非常适合循环的氛围动画',
    category: 'perspective',
    duration: 3000,
    tracks: [
      createTrack('Hover Float', 'transform', [
        createKeyframe(0, { rotateX: 0, translateY: 0, scale: 1, perspective: 2400 }, 'ease-in-out'),
        createKeyframe(750, { rotateX: 4, translateY: -3, scale: 1.01, perspective: 2400 }, 'ease-in-out'),
        createKeyframe(1500, { rotateX: 0, translateY: 0, scale: 1, perspective: 2400 }, 'ease-in-out'),
        createKeyframe(2250, { rotateX: -4, translateY: 3, scale: 1.01, perspective: 2400 }, 'ease-in-out'),
        createKeyframe(3000, { rotateX: 0, translateY: 0, scale: 1, perspective: 2400 }, 'ease-in-out'),
      ]),
    ],
  },
  {
    id: 'parallax-drift',
    name: '视差漂移',
    description: '缓慢漂移，透视收紧以增强纵深感',
    category: 'perspective',
    duration: 3000,
    tracks: [
      createTrack('Parallax Drift', 'transform', [
        createKeyframe(0, { translateX: -6, perspective: 2400, rotateY: -4 }, 'ease-in-out'),
        createKeyframe(3000, { translateX: 6, perspective: 1600, rotateY: 4 }, 'ease-in-out'),
      ]),
    ],
  },
  {
    id: 'apple-showcase',
    name: 'Apple 展示',
    description: '干净的 Apple 风格产品展示，带倾斜和缩放',
    category: 'perspective',
    duration: 1500,
    tracks: [
      createTrack('Apple Showcase', 'transform', [
        createKeyframe(0, { rotateX: 20, rotateY: -15, scale: 0.96, perspective: 2400 }, 'ease-out'),
        createKeyframe(1500, { rotateX: 5, rotateY: -8, scale: 1, perspective: 2400 }, 'ease-out-cubic'),
      ]),
      createTrack('Apple Showcase Fade', 'opacity', [
        createKeyframe(0, { imageOpacity: 0 }, 'ease-out'),
        createKeyframe(600, { imageOpacity: 1 }, 'ease-out'),
      ]),
    ],
  },

  // ============ ORBIT — 3D Rotational Movements ============
  {
    id: 'orbit-left',
    name: '向左环绕',
    description: '平滑的环绕弧线左移并返回',
    category: 'orbit',
    duration: 2500,
    tracks: [
      createTrack('Orbit Left', 'transform', [
        createKeyframe(0, { rotateY: 0, scale: 1, perspective: 2400 }, 'ease-in-out'),
        createKeyframe(1250, { rotateY: -25, scale: 0.97, perspective: 2400 }, 'ease-in-out'),
        createKeyframe(2500, { rotateY: 0, scale: 1, perspective: 2400 }, 'ease-in-out'),
      ]),
    ],
  },
  {
    id: 'orbit-right',
    name: '向右环绕',
    description: '平滑的环绕弧线右移并返回',
    category: 'orbit',
    duration: 2500,
    tracks: [
      createTrack('Orbit Right', 'transform', [
        createKeyframe(0, { rotateY: 0, scale: 1, perspective: 2400 }, 'ease-in-out'),
        createKeyframe(1250, { rotateY: 25, scale: 0.97, perspective: 2400 }, 'ease-in-out'),
        createKeyframe(2500, { rotateY: 0, scale: 1, perspective: 2400 }, 'ease-in-out'),
      ]),
    ],
  },
  {
    id: 'turntable',
    name: '转盘',
    description: '如转盘展示般完整 360° 旋转',
    category: 'orbit',
    duration: 3000,
    tracks: [
      createTrack('Turntable', 'transform', [
        createKeyframe(0, { rotateY: 0, scale: 0.95, perspective: 2400 }, 'linear'),
        createKeyframe(3000, { rotateY: 360, scale: 0.95, perspective: 2400 }, 'linear'),
      ]),
    ],
  },
  {
    id: 'swing',
    name: '摇摆',
    description: '钟摆式摆动，带轻微旋转',
    category: 'orbit',
    duration: 2000,
    tracks: [
      createTrack('Swing', 'transform', [
        createKeyframe(0, { rotateZ: 0, rotateY: 0, perspective: 2400 }, 'ease-in-out'),
        createKeyframe(500, { rotateZ: -8, rotateY: -10, perspective: 2400 }, 'ease-in-out'),
        createKeyframe(1000, { rotateZ: 0, rotateY: 0, perspective: 2400 }, 'ease-in-out'),
        createKeyframe(1500, { rotateZ: 6, rotateY: 8, perspective: 2400 }, 'ease-in-out'),
        createKeyframe(2000, { rotateZ: 0, rotateY: 0, perspective: 2400 }, 'ease-in-out'),
      ]),
    ],
  },

  // ============ DEPTH — Z-Depth & Scale Effects ============
  {
    id: 'push-away',
    name: '推远',
    description: '透视逐渐收紧，将图像推远',
    category: 'depth',
    duration: 2000,
    tracks: [
      createTrack('Push Away', 'transform', [
        createKeyframe(0, { scale: 1, perspective: 2400, rotateX: 0 }, 'ease-in-out'),
        createKeyframe(2000, { scale: 0.85, perspective: 1600, rotateX: 8 }, 'ease-in-out'),
      ]),
    ],
  },
  {
    id: 'pull-close',
    name: '拉近',
    description: '透视逐渐放松，将图像拉近',
    category: 'depth',
    duration: 1200,
    tracks: [
      createTrack('Pull Close', 'transform', [
        createKeyframe(0, { scale: 0.95, perspective: 1800, rotateX: -4 }, 'ease-out'),
        createKeyframe(1200, { scale: 1.03, perspective: 2400, rotateX: 0 }, 'ease-out-cubic'),
      ]),
    ],
  },
  {
    id: 'dramatic-zoom',
    name: '戏剧化缩放',
    description: '带深度透视变化的戏剧化缩放',
    category: 'depth',
    duration: 1200,
    tracks: [
      createTrack('Dramatic Zoom', 'transform', [
        createKeyframe(0, { scale: 0.95, perspective: 1400 }, 'ease-out'),
        createKeyframe(1200, { scale: 1.08, perspective: 2400 }, 'ease-out-cubic'),
      ]),
      createTrack('Dramatic Zoom Fade', 'opacity', [
        createKeyframe(0, { imageOpacity: 0 }, 'ease-out'),
        createKeyframe(500, { imageOpacity: 1 }, 'ease-out'),
      ]),
    ],
  },
  {
    id: 'breathe-3d',
    name: '呼吸 3D',
    description: '轻柔的呼吸感运动配合 3D 旋转 —— 非常适合循环播放',
    category: 'depth',
    duration: 3000,
    tracks: [
      createTrack('Breathe 3D', 'transform', [
        createKeyframe(0, { scale: 1, rotateX: 0, rotateY: 0, perspective: 2400 }, 'ease-in-out'),
        createKeyframe(1500, { scale: 1.03, rotateX: 2, rotateY: -2, perspective: 2400 }, 'ease-in-out'),
        createKeyframe(3000, { scale: 1, rotateX: 0, rotateY: 0, perspective: 2400 }, 'ease-in-out'),
      ]),
    ],
  },

  // ============ KEN BURNS — Cinematic Pan & Zoom ============
  {
    id: 'kenburns-zoom-in',
    name: '放大',
    description: '缓慢的电影感推近 —— 经典的 Ken Burns 效果',
    category: 'kenburns',
    duration: 4000,
    tracks: [
      createTrack('Ken Burns Zoom In', 'transform', [
        createKeyframe(0, { scale: 1, translateX: 0, translateY: 0, perspective: 2400 }, 'ease-in-out'),
        createKeyframe(4000, { scale: 1.15, translateX: 3, translateY: -2, perspective: 2400 }, 'ease-in-out'),
      ]),
    ],
  },
  {
    id: 'kenburns-zoom-out',
    name: '缩小',
    description: '缓慢拉远，展现完整图片',
    category: 'kenburns',
    duration: 4000,
    tracks: [
      createTrack('Ken Burns Zoom Out', 'transform', [
        createKeyframe(0, { scale: 1.12, translateX: -3, translateY: 2, perspective: 2400 }, 'ease-in-out'),
        createKeyframe(4000, { scale: 1, translateX: 0, translateY: 0, perspective: 2400 }, 'ease-in-out'),
      ]),
    ],
  },
  {
    id: 'kenburns-pan-left',
    name: '向左平移',
    description: '缓慢的电影感左移，带轻微缩放',
    category: 'kenburns',
    duration: 4000,
    tracks: [
      createTrack('Ken Burns Pan Left', 'transform', [
        createKeyframe(0, { translateX: 8, scale: 1.05, perspective: 2400 }, 'ease-in-out'),
        createKeyframe(4000, { translateX: -8, scale: 1.08, perspective: 2400 }, 'ease-in-out'),
      ]),
    ],
  },
  {
    id: 'kenburns-pan-right',
    name: '向右平移',
    description: '缓慢的电影感右移，带轻微缩放',
    category: 'kenburns',
    duration: 4000,
    tracks: [
      createTrack('Ken Burns Pan Right', 'transform', [
        createKeyframe(0, { translateX: -8, scale: 1.05, perspective: 2400 }, 'ease-in-out'),
        createKeyframe(4000, { translateX: 8, scale: 1.08, perspective: 2400 }, 'ease-in-out'),
      ]),
    ],
  },
];

// Get presets by category
export function getPresetsByCategory(category: AnimationPreset['category']): AnimationPreset[] {
  return ANIMATION_PRESETS.filter((preset) => preset.category === category);
}

// Get all preset categories
export function getPresetCategories(): AnimationPreset['category'][] {
  const categories = new Set(ANIMATION_PRESETS.map((p) => p.category));
  return Array.from(categories);
}

// Clone a preset's tracks with new IDs (for applying to timeline)
// Optionally offset keyframe times by startTime and link to a clipId
export function clonePresetTracks(
  preset: AnimationPreset,
  options?: { startTime?: number; clipId?: string }
): AnimationTrack[] {
  const { startTime = 0, clipId } = options || {};

  return preset.tracks.map((track) => ({
    ...track,
    id: generateId('track'),
    clipId,
    originalDuration: preset.duration,
    keyframes: track.keyframes.map((kf) => ({
      ...kf,
      id: generateId('kf'),
      // Offset keyframe time by the clip's start time
      time: kf.time + startTime,
    })),
  }));
}

// Get preset by ID
export function getPresetById(id: string): AnimationPreset | undefined {
  return ANIMATION_PRESETS.find((p) => p.id === id);
}

// Category display names
export const CATEGORY_LABELS: Record<AnimationPreset['category'], string> = {
  reveal: 'Reveal',
  slide: 'Slide',
  fade: 'Fade',
  flip: 'Flip',
  perspective: 'Perspective',
  orbit: 'Orbit',
  depth: 'Depth',
  kenburns: 'Ken Burns',
};
