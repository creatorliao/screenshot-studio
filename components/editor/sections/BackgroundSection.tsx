'use client';

import * as React from 'react';
import { useImageStore } from '@/lib/store';
import { useDropzone } from 'react-dropzone';
import { useResponsiveCanvasDimensions } from '@/hooks/useAspectRatioDimensions';
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_SIZE } from '@/lib/constants';
import {
  backgroundCategories,
  getBackgroundThumbnailUrl,
} from '@/lib/r2-backgrounds';
import { gradientColors, type GradientKey } from '@/lib/constants/gradient-colors';
import {
  meshGradients,
  magicGradients,
  type MeshGradientKey,
  type MagicGradientKey,
} from '@/lib/constants/mesh-gradients';
import { ColorPicker } from '@/components/ui/color-picker';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { SectionWrapper } from './SectionWrapper';
import {
  Cancel01Icon,
  CheckmarkBadge01Icon,
  Image01Icon,
  Search01Icon,
  ShuffleIcon,
  StarIcon,
} from 'hugeicons-react';
import { cn } from '@/lib/utils';
import { CachedImage } from '@/components/ui/cached-image';
import {
  type BackgroundRef,
  type BackgroundTab,
  humanizeGradientKey,
  loadBackgroundTab,
  loadFavoriteBackgrounds,
  loadRecentBackgrounds,
  pushRecentBackground,
  saveBackgroundTab,
  toggleFavoriteBackground,
} from '@/lib/editor/background-prefs';

// Shadow overlay IDs
const OVERLAY_SHADOW_IDS = [
  '023', '001', '002', '007', '017', '019', '031', '037', '041', '050',
  '053', '057', '063', '064', '082', '083', '088', '097', '099'
];
const OVERLAY_SHADOW_URLS = OVERLAY_SHADOW_IDS.map((id) => `/overlay-shadow/${id}.webp`);

// Category display names (ordered)
// `demo` 原本不在这个列表里，导致 `r2-backgrounds.ts` 里已定义的 11 张图
// 在界面上永远不可达（见 02-调查 §2.3）。现在补回来。
const CATEGORY_ORDER = ['assets', 'mac', 'radiant', 'mesh', 'demo', 'raycast', 'paper', 'pattern'] as const;
const CATEGORY_LABELS: Record<string, string> = {
  assets: '抽象',
  mac: 'macOS 桌面',
  radiant: '光晕',
  mesh: '网格',
  demo: '示例',
  raycast: 'Raycast',
  paper: '纸感',
  pattern: '图案',
};

type GradientGroup = 'classic' | 'magic' | 'mesh';

const TAB_OPTIONS: { id: BackgroundTab; label: string }[] = [
  { id: 'solid', label: '纯色' },
  { id: 'gradient', label: '渐变' },
  { id: 'image', label: '图片' },
  { id: 'effects', label: '特效' },
];

const GRADIENT_GROUP_OPTIONS: { id: GradientGroup; label: string }[] = [
  { id: 'classic', label: '经典' },
  { id: 'magic', label: '魔法' },
  { id: 'mesh', label: '网格' },
];

const SOLID_PRESETS = [
  '#ffffff', '#000000', '#f5f5f5', '#1e1e1e',
  '#7dd4ad', '#4168d0', '#c850c0', '#ff6b35',
];

interface SwatchProps {
  label: string;
  /** CSS background（渐变/纯色） */
  style?: React.CSSProperties;
  /** 图片类用缩略图 */
  imageSrc?: string;
  selected: boolean;
  favorite: boolean;
  onSelect: () => void;
  onToggleFavorite: () => void;
  /** 大预览（图片类）还是紧凑色块（渐变类） */
  size?: 'compact' | 'large';
}

/**
 * 统一的候选卡片。
 *
 * 改造前每个候选是 32px 无名色块、hover 只放大 5%、选中态有两套语言
 * （图片=加边框、渐变=变圆+放大），而且连 `title` 都没有 ——
 * 用户面对 318 个候选只能靠肉眼猜。现在：≥56px、常显名字、选中打勾、
 * 收藏用星标，全面板只有这一种选中语言。
 */
function Swatch({
  label,
  style,
  imageSrc,
  selected,
  favorite,
  onSelect,
  onToggleFavorite,
  size = 'compact',
}: SwatchProps) {
  return (
    <div className="relative group/swatch">
      <button
        type="button"
        onClick={onSelect}
        title={label}
        aria-pressed={selected}
        className={cn(
          // `relative` 是必需的：CachedImage 内部用 next/image 的 fill，
          // 需要一个已定位的父元素（否则 next/image 会打印
          // "has fill and parent element with invalid position" 且图片铺不满）；
          // 同时它也是下面选中对勾 absolute inset-0 的定位基准。
          'relative w-full overflow-hidden rounded-lg border transition-all duration-150 cursor-pointer',
          size === 'large' ? 'aspect-square' : 'aspect-square',
          selected
            ? 'border-foreground/40 ring-2 ring-foreground/25'
            : 'border-foreground/10 hover:border-foreground/25',
        )}
      >
        {imageSrc ? (
          <CachedImage
            src={imageSrc}
            alt={label}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="block w-full h-full" style={style} />
        )}
        {selected && (
          <span className="absolute inset-0 flex items-center justify-center bg-background/25">
            <CheckmarkBadge01Icon size={18} className="text-foreground drop-shadow" />
          </span>
        )}
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite();
        }}
        aria-label={favorite ? `取消收藏 ${label}` : `收藏 ${label}`}
        title={favorite ? '取消收藏' : '收藏'}
        className={cn(
          'absolute top-1 right-1 z-10 rounded-md p-0.5 transition-opacity',
          'bg-background/70 backdrop-blur-sm',
          favorite
            ? 'opacity-100 text-foreground'
            : 'opacity-0 group-hover/swatch:opacity-100 text-muted-foreground hover:text-foreground',
        )}
      >
        <StarIcon size={12} />
      </button>

      <span
        className={cn(
          'mt-1 block truncate text-center text-[10px] leading-tight',
          selected ? 'font-semibold text-foreground' : 'text-muted-foreground',
        )}
        title={label}
      >
        {label}
      </span>
    </div>
  );
}

/**
 * 背景面板。
 *
 * 改造前：11 个分组纵向堆叠、全部 defaultOpen、共 318 个可点目标，挤在约 212px
 * 宽的长条里；渐变色块 32px 且无 alt/title/aria-label；两个横向画廊分别需要横滚
 * 4.7 屏和 10.7 屏，而 `scrollbar-hide` 把滚动条彻底隐藏；没有搜索、没有收藏、
 * 没有"最近使用"；切走 Tab 再回来折叠状态与滚动位置都不对。
 *
 * 现在：一次只显示一类（分类 Tab）+ 搜索 + 最近/收藏 + 命名 + 统一选中态，
 * 背景自己的调整（不透明度/模糊/颗粒）也搬进来了 —— 改造前"背景模糊与颗粒"在
 * 「设计 → 颜色滤镜」里，背景不透明度则完全没有 UI。
 *
 * 对应 `04-方案_导入引导与信息架构重排.md` 模块 3。
 */
export function BackgroundSection() {
  const {
    backgroundConfig,
    imageOverlays,
    backgroundBlur,
    backgroundNoise,
    setBackgroundType,
    setBackgroundValue,
    setBackgroundOpacity,
    setBackgroundBlur,
    setBackgroundNoise,
    addImageOverlay,
    removeImageOverlay,
  } = useImageStore();

  const responsiveDimensions = useResponsiveCanvasDimensions();
  const [bgUploadError, setBgUploadError] = React.useState<string | null>(null);
  const [tab, setTab] = React.useState<BackgroundTab>('gradient');
  const [gradientGroup, setGradientGroup] = React.useState<GradientGroup>('classic');
  const [imageCategory, setImageCategory] = React.useState<string>(CATEGORY_ORDER[0]);
  const [query, setQuery] = React.useState('');
  const [recent, setRecent] = React.useState<BackgroundRef[]>([]);
  const [favorites, setFavorites] = React.useState<BackgroundRef[]>([]);
  const [shadowOpacity, setShadowOpacity] = React.useState(50);
  /** 上一张自定义上传背景，用于"删除"时真正回退（改造前会强行设成某个橙色渐变） */
  const previousBackgroundRef = React.useRef<{ type: string; value: string } | null>(null);

  // 偏好只在客户端读取，避免 SSR/CSR 不一致
  React.useEffect(() => {
    setTab(loadBackgroundTab('gradient'));
    setRecent(loadRecentBackgrounds());
    setFavorites(loadFavoriteBackgrounds());
  }, []);

  const handleTabChange = React.useCallback((next: BackgroundTab) => {
    setTab(next);
    saveBackgroundTab(next);
    setQuery('');
  }, []);

  const rememberBackground = React.useCallback((ref: BackgroundRef) => {
    setRecent(pushRecentBackground(ref));
  }, []);

  const handleToggleFavorite = React.useCallback((ref: BackgroundRef) => {
    setFavorites(toggleFavoriteBackground(ref));
  }, []);

  const favoriteValues = React.useMemo(
    () => new Set(favorites.map((item) => item.value)),
    [favorites],
  );

  const applyBackground = React.useCallback(
    (ref: BackgroundRef) => {
      // 记住"上一步是什么"，供删除自定义背景时回退
      previousBackgroundRef.current = {
        type: backgroundConfig.type,
        value: backgroundConfig.value,
      };
      setBackgroundType(ref.type);
      setBackgroundValue(ref.value);
      rememberBackground(ref);
    },
    [backgroundConfig.type, backgroundConfig.value, rememberBackground, setBackgroundType, setBackgroundValue],
  );

  const validateFile = (file: File): string | null => {
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      return '不支持这种文件格式，请使用 PNG、JPG 或 WebP';
    }
    if (file.size > MAX_IMAGE_SIZE) {
      return `文件太大了，单个最大 ${MAX_IMAGE_SIZE / 1024 / 1024}MB`;
    }
    return null;
  };

  const onBgDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const validationError = validateFile(file);
        if (validationError) {
          setBgUploadError(validationError);
          return;
        }
        setBgUploadError(null);
        previousBackgroundRef.current = {
          type: backgroundConfig.type,
          value: backgroundConfig.value,
        };
        const blobUrl = URL.createObjectURL(file);
        setBackgroundValue(blobUrl);
        setBackgroundType('image');
      }
    },
    [backgroundConfig.type, backgroundConfig.value, setBackgroundValue, setBackgroundType]
  );

  const {
    getRootProps: getBgRootProps,
    getInputProps: getBgInputProps,
  } = useDropzone({
    onDrop: onBgDrop,
    // 改造前这里是 `{ 'image/*': ALLOWED_IMAGE_TYPES.map(t => t.split('/')[1]) }`，
    // 即"通配 MIME + 扩展名"的非法组合 —— react-dropzone 会打印
    // `Skipped "image/*" because an invalid file extension was provided.`
    // 并把该条整条丢弃，等于 accept 形同虚设（任何类型都会进 onDrop，
    // 只靠下面的 validateFile 兜底）。这里按 MIME 正确声明。
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/webp': ['.webp'],
    },
    maxSize: MAX_IMAGE_SIZE,
    multiple: false,
  });

  // Overlay helpers
  const getFullCanvasOverlay = () => {
    const canvasWidth = responsiveDimensions.width || 1920;
    const canvasHeight = responsiveDimensions.height || 1080;
    return {
      x: canvasWidth / 2,
      y: canvasHeight / 2,
      size: Math.max(canvasWidth, canvasHeight),
    };
  };

  const handleAddShadow = (shadowUrl: string, opacityPercent: number) => {
    // Remove any existing shadows first (only one shadow at a time)
    imageOverlays.forEach((overlay) => {
      if (typeof overlay.src === 'string' && overlay.src.includes('overlay-shadow')) {
        removeImageOverlay(overlay.id);
      }
    });

    // Add the new shadow
    const { x, y, size } = getFullCanvasOverlay();
    addImageOverlay({
      src: shadowUrl,
      position: { x, y },
      size,
      rotation: 0,
      opacity: opacityPercent / 100,
      flipX: false,
      flipY: false,
      isVisible: true,
    });
  };

  const handleRemoveShadows = () => {
    imageOverlays.forEach((overlay) => {
      if (typeof overlay.src === 'string' && overlay.src.includes('overlay-shadow')) {
        removeImageOverlay(overlay.id);
      }
    });
  };

  // Get current active shadow
  const currentShadow = imageOverlays.find(
    (overlay) => typeof overlay.src === 'string' && overlay.src.includes('overlay-shadow')
  );

  const shuffleMagicGradient = () => {
    const keys = Object.keys(magicGradients) as MagicGradientKey[];
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    setGradientGroup('magic');
    applyBackground({
      type: 'gradient',
      value: `magic:${randomKey}`,
      label: humanizeGradientKey(randomKey),
    });
  };

  const availableCategories = React.useMemo(
    () => CATEGORY_ORDER.filter((cat) => backgroundCategories[cat]?.length > 0),
    [],
  );

  const normalizedQuery = query.trim().toLowerCase();

  const gradientItems = React.useMemo(() => {
    const source: { key: string; value: string; css: string }[] =
      gradientGroup === 'classic'
        ? (Object.keys(gradientColors) as GradientKey[]).map((key) => ({
            key,
            value: key,
            css: gradientColors[key],
          }))
        : gradientGroup === 'magic'
          ? (Object.keys(magicGradients) as MagicGradientKey[]).map((key) => ({
              key,
              value: `magic:${key}`,
              css: magicGradients[key],
            }))
          : (Object.keys(meshGradients) as MeshGradientKey[]).map((key) => ({
              key,
              value: `mesh:${key}`,
              css: meshGradients[key],
            }));

    return source.map((item) => ({
      ...item,
      label: humanizeGradientKey(item.key),
    }));
  }, [gradientGroup]);

  const filteredGradients = React.useMemo(() => {
    if (!normalizedQuery) return gradientItems;
    return gradientItems.filter(
      (item) =>
        item.label.toLowerCase().includes(normalizedQuery) ||
        item.key.toLowerCase().includes(normalizedQuery),
    );
  }, [gradientItems, normalizedQuery]);

  const imageItems = React.useMemo(() => {
    const paths = backgroundCategories[imageCategory] ?? [];
    return paths.map((path, idx) => ({
      value: path,
      label: `${CATEGORY_LABELS[imageCategory] ?? imageCategory} ${idx + 1}`,
    }));
  }, [imageCategory]);

  const filteredImages = React.useMemo(() => {
    if (!normalizedQuery) return imageItems;
    return imageItems.filter((item) => item.label.toLowerCase().includes(normalizedQuery));
  }, [imageItems, normalizedQuery]);

  const currentValue = backgroundConfig.value ?? '';
  const currentType = backgroundConfig.type;

  const customImageValue =
    currentType === 'image' && currentValue.startsWith('blob:') ? currentValue : null;

  return (
    <>
      <SectionWrapper title="背景" defaultOpen={true}>
        <div className="space-y-3">
          {/* 分类 Tab：一次只显示一类，替代改造前 11 组全部展开的纵向长条 */}
          <div className="grid grid-cols-4 gap-1 rounded-lg bg-foreground/[0.04] p-1">
            {TAB_OPTIONS.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => handleTabChange(option.id)}
                aria-pressed={tab === option.id}
                className={cn(
                  'rounded-md px-1 py-1.5 text-xs font-medium transition-colors cursor-pointer',
                  tab === option.id
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* 搜索：318 个候选的必要配套（改造前完全没有） */}
          {(tab === 'gradient' || tab === 'image') && (
            <div className="relative">
              <Search01Icon
                size={13}
                className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={tab === 'gradient' ? '搜索渐变名称…' : '搜索图片编号…'}
                className="h-8 pl-7 pr-2 text-xs"
              />
            </div>
          )}

          {/* 最近使用 + 收藏：改造前不存在，找"上次那个颜色"只能重新肉眼扫一遍 */}
          {favorites.length > 0 && (
            <div>
              <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                收藏
              </p>
              <div className="grid grid-cols-4 gap-2">
                {favorites.slice(0, 8).map((ref) => (
                  <Swatch
                    key={`fav-${ref.value}`}
                    label={ref.label}
                    style={ref.type === 'gradient' ? { background: resolveGradientCss(ref.value) } : ref.type === 'solid' ? { background: ref.value } : undefined}
                    imageSrc={ref.type === 'image' ? getBackgroundThumbnailUrl(ref.value) : undefined}
                    selected={currentValue === ref.value}
                    favorite
                    onSelect={() => applyBackground(ref)}
                    onToggleFavorite={() => handleToggleFavorite(ref)}
                  />
                ))}
              </div>
            </div>
          )}

          {recent.length > 0 && (
            <div>
              <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                最近使用
              </p>
              <div className="grid grid-cols-4 gap-2">
                {recent.slice(0, 8).map((ref) => (
                  <Swatch
                    key={`recent-${ref.value}`}
                    label={ref.label}
                    style={ref.type === 'gradient' ? { background: resolveGradientCss(ref.value) } : ref.type === 'solid' ? { background: ref.value } : undefined}
                    imageSrc={ref.type === 'image' ? getBackgroundThumbnailUrl(ref.value) : undefined}
                    selected={currentValue === ref.value}
                    favorite={favoriteValues.has(ref.value)}
                    onSelect={() => applyBackground(ref)}
                    onToggleFavorite={() => handleToggleFavorite(ref)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ── 纯色 ───────────────────────────────────────────── */}
          {tab === 'solid' && (
            <div className="space-y-3">
              <div className="grid grid-cols-4 gap-2">
                {SOLID_PRESETS.map((color) => (
                  <Swatch
                    key={color}
                    label={color.toUpperCase()}
                    style={{ background: color }}
                    selected={currentType === 'solid' && currentValue === color}
                    favorite={favoriteValues.has(color)}
                    onSelect={() =>
                      applyBackground({ type: 'solid', value: color, label: color.toUpperCase() })
                    }
                    onToggleFavorite={() =>
                      handleToggleFavorite({ type: 'solid', value: color, label: color.toUpperCase() })
                    }
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <ColorPicker
                  color={currentType === 'solid' && currentValue.startsWith('#') ? currentValue : '#7dd4ad'}
                  onChange={(newColor) => {
                    applyBackground({ type: 'solid', value: newColor, label: newColor.toUpperCase() });
                  }}
                  className="h-9 flex-1 rounded-md"
                />
                <button
                  type="button"
                  onClick={() =>
                    applyBackground({ type: 'solid', value: 'transparent', label: '透明' })
                  }
                  className={cn(
                    'flex h-9 flex-1 items-center justify-center gap-1.5 rounded-md border text-xs transition-colors cursor-pointer',
                    currentType === 'solid' && currentValue === 'transparent'
                      ? 'border-foreground/30 bg-foreground/[0.08] text-foreground'
                      : 'border-foreground/10 bg-foreground/[0.04] text-muted-foreground hover:border-foreground/20 hover:text-foreground',
                  )}
                >
                  <span
                    className="h-3.5 w-3.5 rounded-full border border-foreground/20"
                    style={{
                      background:
                        'repeating-conic-gradient(#808080 0% 25%, #fff 0% 50%) 50% / 6px 6px',
                    }}
                  />
                  透明
                </button>
              </div>
            </div>
          )}

          {/* ── 渐变 ───────────────────────────────────────────── */}
          {tab === 'gradient' && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="grid flex-1 grid-cols-3 gap-1 rounded-lg bg-foreground/[0.04] p-1">
                  {GRADIENT_GROUP_OPTIONS.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setGradientGroup(option.id)}
                      aria-pressed={gradientGroup === option.id}
                      className={cn(
                        'rounded-md px-1 py-1 text-[11px] font-medium transition-colors cursor-pointer',
                        gradientGroup === option.id
                          ? 'bg-background text-foreground shadow-sm'
                          : 'text-muted-foreground hover:text-foreground',
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                {gradientGroup === 'magic' && (
                  <button
                    type="button"
                    onClick={shuffleMagicGradient}
                    title="随机换一个魔法渐变"
                    className="flex shrink-0 items-center gap-1 rounded-md border border-foreground/10 bg-foreground/[0.04] px-2 py-1.5 text-[10px] text-muted-foreground transition-colors hover:bg-foreground/[0.08] hover:text-foreground cursor-pointer"
                  >
                    随机
                    <ShuffleIcon size={12} />
                  </button>
                )}
              </div>

              <p className="text-[10px] text-muted-foreground">
                共 {gradientItems.length} 个，当前显示 {filteredGradients.length} 个
              </p>

              <div className="grid grid-cols-3 gap-2">
                {filteredGradients.map((item) => (
                  <Swatch
                    key={`grad-${item.value}`}
                    label={item.label}
                    style={{ background: item.css }}
                    selected={currentType === 'gradient' && currentValue === item.value}
                    favorite={favoriteValues.has(item.value)}
                    onSelect={() =>
                      applyBackground({ type: 'gradient', value: item.value, label: item.label })
                    }
                    onToggleFavorite={() =>
                      handleToggleFavorite({ type: 'gradient', value: item.value, label: item.label })
                    }
                  />
                ))}
              </div>

              {filteredGradients.length === 0 && (
                <p className="py-6 text-center text-xs text-muted-foreground">
                  没有匹配「{query}」的渐变
                </p>
              )}
            </div>
          )}

          {/* ── 图片 ───────────────────────────────────────────── */}
          {tab === 'image' && (
            <div className="space-y-3">
              <div className="flex flex-wrap gap-1">
                {availableCategories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setImageCategory(category)}
                    aria-pressed={imageCategory === category}
                    className={cn(
                      'rounded-md border px-2 py-1 text-[11px] font-medium transition-colors cursor-pointer',
                      imageCategory === category
                        ? 'border-foreground/30 bg-foreground/[0.08] text-foreground'
                        : 'border-foreground/10 bg-foreground/[0.04] text-muted-foreground hover:border-foreground/20 hover:text-foreground',
                    )}
                  >
                    {CATEGORY_LABELS[category] ?? category}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2">
                {filteredImages.map((item) => (
                  <Swatch
                    key={`img-${item.value}`}
                    label={item.label}
                    imageSrc={getBackgroundThumbnailUrl(item.value)}
                    selected={currentType === 'image' && currentValue === item.value}
                    favorite={favoriteValues.has(item.value)}
                    onSelect={() =>
                      applyBackground({ type: 'image', value: item.value, label: item.label })
                    }
                    onToggleFavorite={() =>
                      handleToggleFavorite({ type: 'image', value: item.value, label: item.label })
                    }
                    size="large"
                  />
                ))}
              </div>

              {filteredImages.length === 0 && (
                <p className="py-6 text-center text-xs text-muted-foreground">
                  没有匹配「{query}」的背景图
                </p>
              )}

              {/* 自定义上传 */}
              <div
                {...getBgRootProps()}
                className={cn(
                  'flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed px-3 py-3 transition-colors',
                  customImageValue
                    ? 'border-foreground/30 bg-foreground/[0.06]'
                    : 'border-foreground/15 bg-foreground/[0.02] hover:border-foreground/25 hover:bg-foreground/[0.04]',
                )}
              >
                <input {...getBgInputProps()} />
                <Image01Icon size={14} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {customImageValue ? '重新选择自定义背景图' : '上传自己的背景图'}
                </span>
              </div>

              {customImageValue && (
                <div className="relative aspect-video overflow-hidden rounded-md border border-foreground/10 bg-foreground/[0.04]">
                  <img src={customImageValue} alt="当前自定义背景" className="h-full w-full object-cover" />
                  <button
                    type="button"
                    aria-label="移除自定义背景"
                    title="移除自定义背景（回到上一张背景）"
                    className="absolute right-2 top-2 rounded-md bg-background/80 p-1 text-foreground transition-colors hover:bg-foreground/10"
                    onClick={() => {
                      // 改造前这里会把背景强行设成 vibrant_orange_pink 渐变，
                      // 而不是回到上传前的状态
                      const previous = previousBackgroundRef.current;
                      if (previous) {
                        setBackgroundType(previous.type as 'gradient' | 'solid' | 'image');
                        setBackgroundValue(previous.value);
                      } else {
                        setBackgroundType('gradient');
                        setBackgroundValue('vibrant_orange_pink');
                      }
                      URL.revokeObjectURL(customImageValue);
                    }}
                  >
                    <Cancel01Icon size={14} />
                  </button>
                </div>
              )}

              {bgUploadError && <p className="text-xs text-destructive">{bgUploadError}</p>}
            </div>
          )}

          {/* ── 特效（阴影） ───────────────────────────────────── */}
          {tab === 'effects' && (
            <div className="space-y-3">
              <p className="text-[10px] text-muted-foreground">
                阴影是叠在画布上的一层图。改造前它的不透明度被硬编码成 0.5，
                要改只能切到「图层」Tab 找到那一层，调一次要跨两个 Tab。
              </p>

              <div className="grid grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={handleRemoveShadows}
                  aria-pressed={!currentShadow}
                  className={cn(
                    'flex aspect-square items-center justify-center rounded-lg border text-xs font-medium transition-colors cursor-pointer',
                    !currentShadow
                      ? 'border-foreground/40 bg-foreground/[0.08] text-foreground ring-2 ring-foreground/25'
                      : 'border-dashed border-foreground/15 text-muted-foreground hover:border-foreground/25 hover:bg-foreground/[0.04]',
                  )}
                >
                  无
                </button>
                {OVERLAY_SHADOW_URLS.map((shadowUrl, index) => {
                  const selected = currentShadow?.src === shadowUrl;
                  return (
                    <div key={shadowUrl} className="relative group/swatch">
                      <button
                        type="button"
                        onClick={() => handleAddShadow(shadowUrl, shadowOpacity)}
                        title={`阴影 ${index + 1}`}
                        aria-pressed={selected}
                        className={cn(
                          // `relative` 是下面选中对勾 absolute inset-0 的定位基准
                          'relative aspect-square w-full overflow-hidden rounded-lg border bg-card transition-colors cursor-pointer',
                          selected
                            ? 'border-foreground/40 ring-2 ring-foreground/25'
                            : 'border-foreground/10 hover:border-foreground/25',
                        )}
                      >
                        <img
                          src={shadowUrl}
                          alt={`阴影 ${index + 1}`}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                        {selected && (
                          <span className="absolute inset-0 flex items-center justify-center bg-background/25">
                            <CheckmarkBadge01Icon size={18} className="text-foreground drop-shadow" />
                          </span>
                        )}
                      </button>
                      <span
                        className={cn(
                          'mt-1 block text-center text-[10px] leading-tight',
                          selected ? 'font-semibold text-foreground' : 'text-muted-foreground',
                        )}
                      >
                        {index + 1}
                      </span>
                    </div>
                  );
                })}
              </div>

              {currentShadow && (
                <Slider
                  value={[Math.round((currentShadow.opacity ?? 0.5) * 100)]}
                  onValueChange={(value) => {
                    setShadowOpacity(value[0]);
                    imageOverlays.forEach((overlay) => {
                      if (typeof overlay.src === 'string' && overlay.src.includes('overlay-shadow')) {
                        useImageStore.getState().updateImageOverlay(overlay.id, {
                          opacity: value[0] / 100,
                        });
                      }
                    });
                  }}
                  min={5}
                  max={100}
                  step={1}
                  label="阴影强度"
                  valueDisplay={`${Math.round((currentShadow.opacity ?? 0.5) * 100)}%`}
                />
              )}
            </div>
          )}

          {/* ── 背景自身的调整 ─────────────────────────────────── */}
          <div className="space-y-2 border-t border-foreground/10 pt-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              背景调整
            </p>
            <Slider
              value={[Math.round((backgroundConfig.opacity ?? 1) * 100)]}
              onValueChange={(value) => setBackgroundOpacity(value[0] / 100)}
              min={0}
              max={100}
              step={1}
              label="不透明度"
              valueDisplay={`${Math.round((backgroundConfig.opacity ?? 1) * 100)}%`}
            />
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
              label="颗粒"
              valueDisplay={`${backgroundNoise}%`}
            />
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}

/** 把 store 里的 value 还原成可渲染的 CSS 背景（用于收藏/最近的小色块）。 */
function resolveGradientCss(value: string): string | undefined {
  if (value.startsWith('magic:')) {
    return magicGradients[value.slice('magic:'.length) as MagicGradientKey];
  }
  if (value.startsWith('mesh:')) {
    return meshGradients[value.slice('mesh:'.length) as MeshGradientKey];
  }
  return gradientColors[value as GradientKey];
}
