'use client';

import * as React from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Camera01Icon,
  ClipboardIcon,
  CommandIcon,
  Globe02Icon,
  ImageUpload01Icon,
  Loading03Icon,
} from 'hugeicons-react';
import { Moon, Sun } from 'lucide-react';
import { MAX_IMAGE_SIZE } from '@/lib/constants';
import { useImageStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SegmentedControl } from '@/components/ui/segmented-control';
import { getBackgroundCSS } from '@/lib/constants/backgrounds';
import { IMPORT_FORMAT_HINT, importImageFiles } from '@/lib/editor/import-image';

const TRANSITION_DURATION = 400; // ms
type ColorScheme = 'light' | 'dark';

function extractImageUrl(style: React.CSSProperties): string | null {
  const bg = style.backgroundImage;
  if (!bg || typeof bg !== 'string') return null;
  const match = bg.match(/url\(([^)]+)\)/);
  if (!match) return null;
  return match[1].replace(/['"]/g, '');
}

function preloadImage(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => resolve(url);
    img.onerror = () => reject(new Error(`Failed to load: ${url}`));
    img.src = url;
  });
}

/**
 * 首屏（空画布）导入区。
 *
 * 改造要点（对齐 `04-方案_导入引导与信息架构重排.md` 模块 1）：
 * 1. 标题改成动宾结构的大标题「把图片放进来」，不再是"一个加号 + 一行小字 + 一个
 *    URL 框"混在一起让人猜。
 * 2. 三个**带文字**的并列入口：选择文件 / 网页截图 / 粘贴或拖放。网页截图的 URL
 *    输入框改成点开才出现（渐进披露），不再和主入口抢注意力。
 * 3. 补上改造前完全缺失的信息：支持的格式与大小上限、导入后能做什么。
 * 4. 导入语义统一走 `importImageFiles`，与拖拽 / 粘贴 / 头部「导入」一致 ——
 *    改造前"空态拖图不重置样式、空态 URL 抓图 setImage() 全量重置"，同样叫
 *    "第一次导入"却两种结果。
 * 5. 粘贴只由 `GlobalDropZone` 一处监听（改造前这里有 document + 容器 + React
 *    三层，同一次粘贴会把图导入 2–3 次）；拖放用 `data-upload-dropzone` 让全局层
 *    让路，避免同一张图既成主图又成贴纸。
 */
export function CleanUploadState() {
  const [isDragActive, setIsDragActive] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [screenshotUrl, setScreenshotUrl] = React.useState('');
  const [colorScheme, setColorScheme] = React.useState<ColorScheme>('light');
  const [isCapturing, setIsCapturing] = React.useState(false);
  const [urlPanelOpen, setUrlPanelOpen] = React.useState(false);
  const [pasteHintVisible, setPasteHintVisible] = React.useState(false);

  const { backgroundConfig } = useImageStore();
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Crossfade state
  const backgroundStyle = React.useMemo(
    () => getBackgroundCSS(backgroundConfig),
    [backgroundConfig]
  );
  const [activeLayer, setActiveLayer] = React.useState<'a' | 'b'>('a');
  const [layerAStyle, setLayerAStyle] = React.useState<React.CSSProperties>(backgroundStyle);
  const [layerBStyle, setLayerBStyle] = React.useState<React.CSSProperties>(backgroundStyle);
  const [showTransition, setShowTransition] = React.useState(false);
  const prevConfigRef = React.useRef(backgroundConfig);
  const isFirstRender = React.useRef(true);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout>>(undefined);

  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      setLayerAStyle(backgroundStyle);
      setLayerBStyle(backgroundStyle);
      return;
    }

    const prev = prevConfigRef.current;
    const changed =
      prev.type !== backgroundConfig.type ||
      prev.value !== backgroundConfig.value;

    if (!changed) {
      if (activeLayer === 'a') setLayerAStyle(backgroundStyle);
      else setLayerBStyle(backgroundStyle);
      return;
    }

    prevConfigRef.current = backgroundConfig;
    let cancelled = false;

    const applyNewBackground = (style: React.CSSProperties) => {
      if (cancelled) return;
      if (activeLayer === 'a') {
        setLayerBStyle(style);
        setShowTransition(true);
        requestAnimationFrame(() => { if (!cancelled) setActiveLayer('b'); });
      } else {
        setLayerAStyle(style);
        setShowTransition(true);
        requestAnimationFrame(() => { if (!cancelled) setActiveLayer('a'); });
      }
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setShowTransition(false), TRANSITION_DURATION + 50);
    };

    if (backgroundConfig.type === 'image') {
      const url = extractImageUrl(backgroundStyle);
      if (url) {
        preloadImage(url)
          .then((loadedUrl) => {
            applyNewBackground({ ...backgroundStyle, backgroundImage: `url(${loadedUrl})` });
          })
          .catch(() => applyNewBackground(backgroundStyle));
        return () => { cancelled = true; if (timeoutRef.current) clearTimeout(timeoutRef.current); };
      }
    }

    applyNewBackground(backgroundStyle);
    return () => { cancelled = true; if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [backgroundConfig, backgroundStyle, activeLayer]);

  /** 统一入口：校验、导入语义、错误文案都走同一处。 */
  const runImport = React.useCallback((files: File[]) => {
    if (files.length === 0) return;
    const result = importImageFiles(files);
    if (result.error) {
      setError(
        result.rejected.length > 1
          ? `${result.error}（已跳过 ${result.rejected.length} 个文件）`
          : result.error,
      );
      return;
    }
    setError(null);
  }, []);

  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      runImport(acceptedFiles);
    },
    [runImport]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive: dropzoneActive,
    open,
  } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
    },
    maxSize: MAX_IMAGE_SIZE,
    multiple: true,
    noClick: true,
    onDragEnter: () => { setIsDragActive(true); setError(null); },
    onDragLeave: () => setIsDragActive(false),
    onDropRejected: (rejectedFiles) => {
      if (rejectedFiles.length > 0) {
        // 让统一校验给出文案，避免这里再维护第三套说法
        const first = rejectedFiles[0]?.file;
        const result = first
          ? importImageFiles([first])
          : null;
        setError(result?.error ?? '文件导入失败，请重试');
      }
    },
  });

  // Auto-focus the container so paste events work immediately
  React.useEffect(() => {
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, []);

  const handlePasteEntryClick = React.useCallback(() => {
    containerRef.current?.focus();
    setPasteHintVisible(true);
    window.setTimeout(() => setPasteHintVisible(false), 4000);
  }, []);

  const handleCaptureScreenshot = async () => {
    if (!screenshotUrl.trim()) {
      setError('请输入网址');
      return;
    }
    let finalUrl = screenshotUrl.trim();
    if (!finalUrl.match(/^https?:\/\//i)) {
      finalUrl = `https://${finalUrl}`;
    }
    setIsCapturing(true);
    setError(null);
    try {
      const response = await fetch('/api/screenshot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: finalUrl, deviceType: 'desktop', colorScheme }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || '截图失败');
      let base64Data = data.screenshot.trim();
      if (base64Data.includes(',')) base64Data = base64Data.split(',')[1];
      base64Data = base64Data.replace(/\s/g, '');
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'image/png' });
      const file = new File([blob], `screenshot-${colorScheme}.png`, { type: 'image/png' });
      // 与拖拽/粘贴/头部「导入」同一条语义：首次导入不重置用户已调好的样式
      runImport([file]);
      setScreenshotUrl('');
      setUrlPanelOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : '截图失败');
    } finally {
      setIsCapturing(false);
    }
  };

  const active = isDragActive || dropzoneActive;

  return (
    <div
      ref={containerRef}
      {...getRootProps()}
      // 让 GlobalDropZone 对落在本区域内的拖放让路（见 lib/drop-routing.ts）
      data-upload-dropzone=""
      tabIndex={0}
      className="relative w-full h-full flex items-center justify-center outline-none overflow-hidden"
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          ...layerAStyle,
          transition: showTransition ? `opacity ${TRANSITION_DURATION}ms ease-in-out` : undefined,
          opacity: activeLayer === 'a' ? (layerAStyle.opacity ?? 1) : 0,
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          ...layerBStyle,
          transition: showTransition ? `opacity ${TRANSITION_DURATION}ms ease-in-out` : undefined,
          opacity: activeLayer === 'b' ? (layerBStyle.opacity ?? 1) : 0,
          zIndex: 0,
        }}
      />
      <input {...getInputProps()} />

      <div
        className={cn(
          'relative z-10 w-full max-w-[520px] mx-6 rounded-2xl px-7 py-7',
          'bg-background/60 backdrop-blur-md border border-foreground/12',
          'shadow-[0_8px_40px_-12px_rgba(0,0,0,0.45)]',
          'transition-transform duration-100 ease-out',
          active && 'scale-[1.01] border-foreground/30',
        )}
      >
        <h2 className="text-xl font-semibold tracking-tight text-foreground text-center">
          把图片放进来
        </h2>
        <p className="mt-1.5 text-center text-sm text-foreground/60">
          导入后可以调整画幅、背景和文字，最后导出成 PNG / JPEG / WebP
        </p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <button
            type="button"
            onClick={open}
            className={cn(
              'flex flex-col items-center justify-center gap-2 rounded-xl px-3 py-4 cursor-pointer',
              'bg-foreground/[0.06] border border-foreground/12 text-foreground',
              'transition-colors duration-150 hover:bg-foreground/[0.1] hover:border-foreground/20',
              'active:scale-[0.98]'
            )}
          >
            <ImageUpload01Icon size={20} className="shrink-0" />
            <span className="text-sm font-medium">选择文件</span>
          </button>

          <button
            type="button"
            onClick={() => setUrlPanelOpen((v) => !v)}
            aria-expanded={urlPanelOpen}
            className={cn(
              'flex flex-col items-center justify-center gap-2 rounded-xl px-3 py-4 cursor-pointer',
              'border text-foreground transition-colors duration-150 active:scale-[0.98]',
              urlPanelOpen
                ? 'bg-foreground/[0.12] border-foreground/25'
                : 'bg-foreground/[0.06] border-foreground/12 hover:bg-foreground/[0.1] hover:border-foreground/20'
            )}
          >
            <Globe02Icon size={20} className="shrink-0" />
            <span className="text-sm font-medium">网页截图</span>
          </button>

          <button
            type="button"
            onClick={handlePasteEntryClick}
            className={cn(
              'flex flex-col items-center justify-center gap-2 rounded-xl px-3 py-4 cursor-pointer',
              'bg-foreground/[0.06] border border-foreground/12 text-foreground',
              'transition-colors duration-150 hover:bg-foreground/[0.1] hover:border-foreground/20',
              'active:scale-[0.98]'
            )}
          >
            <ClipboardIcon size={20} className="shrink-0" />
            <span className="text-sm font-medium">粘贴或拖放</span>
          </button>
        </div>

        {urlPanelOpen && (
          <div className="mt-3 flex items-center gap-2 w-full">
            <div className="flex flex-1 min-w-0 items-center gap-0 h-10 rounded-xl bg-background/50 border border-foreground/15 focus-within:border-foreground/30 focus-within:ring-1 focus-within:ring-foreground/20 transition-[border-color,box-shadow]">
              <Globe02Icon size={14} className="shrink-0 ml-3 text-foreground/45" />
              <Input
                type="url"
                placeholder="输入网站 URL..."
                value={screenshotUrl}
                onChange={(e) => setScreenshotUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCaptureScreenshot()}
                disabled={isCapturing}
                autoFocus
                className="h-full flex-1 min-w-0 border-0 bg-transparent px-2 text-xs text-foreground/90 placeholder:text-foreground/35 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-transparent"
              />
              <div className="h-4 w-px shrink-0 bg-foreground/15" />
              <SegmentedControl
                size="sm"
                value={colorScheme}
                onChange={(value) => setColorScheme(value as ColorScheme)}
                className={cn(
                  'mx-1 shrink-0 h-7 w-[58px] border-0 bg-transparent p-0.5',
                  isCapturing && 'pointer-events-none opacity-60'
                )}
                indicatorClassName="bg-foreground/20 shadow-none"
                options={[
                  { id: 'light', icon: <Sun className="h-3 w-3" />, ariaLabel: '浅色' },
                  { id: 'dark', icon: <Moon className="h-3 w-3" />, ariaLabel: '深色' },
                ]}
              />
            </div>

            <Button
              onClick={handleCaptureScreenshot}
              disabled={isCapturing}
              variant="outline"
              size="icon"
              className="size-10 shrink-0 rounded-xl border-foreground/15 bg-background/35 text-foreground/80 backdrop-blur-md hover:bg-background/45 hover:text-foreground hover:border-foreground/25"
            >
              {isCapturing ? (
                <Loading03Icon size={16} className="animate-spin" />
              ) : (
                <Camera01Icon size={16} />
              )}
            </Button>
          </div>
        )}

        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-foreground/50">
          <span>{IMPORT_FORMAT_HINT}</span>
          <span className="inline-flex items-center gap-1">
            <kbd className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-foreground/10 border border-foreground/20 text-foreground/70 font-medium">
              <CommandIcon size={10} />
              V
            </kbd>
            <span>粘贴</span>
          </span>
        </div>

        {pasteHintVisible && !active && (
          <p className="mt-2 text-center text-xs text-foreground/60">
            现在按 ⌘V / Ctrl+V 粘贴，或把文件拖到此处
          </p>
        )}

        {active && (
          <p className="mt-3 text-center text-sm font-medium text-foreground/85">
            松开即导入
          </p>
        )}

        {error && (
          <div className="mt-3 text-center text-sm text-destructive bg-background/70 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-destructive/30">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
