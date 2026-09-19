"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { NewTwitterIcon } from "hugeicons-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Download04Icon,
  Copy01Icon,
  AspectRatioIcon,
  Add01Icon,
  Video01Icon,
  Delete02Icon,
  ArrowTurnBackwardIcon,
  ArrowTurnForwardIcon,
  Download01Icon,
  RefreshIcon,
  MagicWand01Icon,
  GridIcon,
  RulerIcon,
  FileZipIcon,
  ImageUpload01Icon,
} from "hugeicons-react";
import { toast } from "sonner";
import { useImageStore } from "@/lib/store";
import { IMPORT_ACCEPT, importImageFiles } from "@/lib/editor/import-image";
import { useExport } from "@/hooks/useExport";
import { useBatchExport } from "@/hooks/useBatchExport";
import { aspectRatios } from "@/lib/constants/aspect-ratios";
import { AspectRatioPicker } from "@/components/aspect-ratio/aspect-ratio-picker";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { CopyProgressDialog } from "@/components/canvas/dialogs/CopyProgressDialog";
import { BatchExportProgressDialog } from "@/components/canvas/dialogs/BatchExportProgressDialog";
import { ExportSlideshowDialog } from "@/lib/export-slideshow-dialog";
import { ImageExportProgressView } from "@/components/canvas/dialogs/ImageProgressView";
import {
  FormatSelector,
  QualityPresetSelector,
  ScaleSlider,
} from "@/components/export";
import { cn } from "@/lib/utils";
import { GitHubStarButton } from "@/components/ui/github-star-button";
import { FeedbackWidget } from "@/components/FeedbackWidget";
import { useIsMobile } from "@/hooks/use-mobile";
import { useHasRenderableContent } from "@/hooks/use-has-renderable-content";

export function EditorHeader() {
  const isMobile = useIsMobile();
  const {
    selectedAspectRatio,
    slides,
    uploadedImageUrl,
    clearImage,
    timeline,
    animationClips,
    resetCanvasSettings,
    showTemplates,
    setShowTemplates,
    showRulers,
    showGrid,
    rulerInterval,
    toggleRulers,
    toggleGrid,
    setRulerInterval,
  } = useImageStore();
  const [aspectRatioOpen, setAspectRatioOpen] = React.useState(false);
  const [exportOpen, setExportOpen] = React.useState(false);
  const [exportSlideshowOpen, setExportSlideshowOpen] = React.useState(false);
  const [exportError, setExportError] = React.useState<string | null>(null);
  const importInputRef = React.useRef<HTMLInputElement | null>(null);

  /**
   * 常驻的「导入 / 替换图片」入口。
   * 改造前头部 12 个控件里没有任何一个叫"导入/上传/打开"，唯一的导入 UI 绑在
   * "空画布"状态上、有图即消失 —— 用户拿不到一个稳定的"我要导入"入口。
   * 见 `03-分析报告_现状诊断.md` §3 R1。
   */
  const handleImportFiles = React.useCallback((files: File[]) => {
    if (files.length === 0) return;
    const result = importImageFiles(files);

    if (result.error && result.imported === 0) {
      toast.error(result.error);
      return;
    }
    if (result.error) {
      toast.warning(`${result.error}（已跳过 ${result.rejected.length} 个文件）`);
    }
    if (result.imported === 0) return;

    if (result.action === "replace-main") {
      toast.success("已替换主图，背景与文字等样式保留");
    } else if (result.action === "add-stickers") {
      toast.success(`已添加 ${result.imported} 张为贴纸`);
    } else {
      toast.success(`已导入 ${result.imported} 张图片`);
    }
  }, []);

  const currentAspectRatio = aspectRatios.find(
    (ar) => ar.id === selectedAspectRatio,
  );
  // 全仓统一判据（改造前这里只看 screenshot.src，与画布口径不一致）
  const hasImage = useHasRenderableContent();

  // Undo/redo state
  const [canUndo, setCanUndo] = React.useState(false);
  const [canRedo, setCanRedo] = React.useState(false);
  const showHistoryControls = hasImage || canUndo || canRedo;

  React.useEffect(() => {
    const updateTemporalState = () => {
      const { pastStates, futureStates } = useImageStore.temporal.getState();
      setCanUndo(pastStates.length > 0);
      setCanRedo(futureStates.length > 0);
    };
    updateTemporalState();
    const unsubscribe = useImageStore.temporal.subscribe(updateTemporalState);
    return unsubscribe;
  }, []);

  const handleUndo = React.useCallback(() => {
    const { undo, pastStates } = useImageStore.temporal.getState();
    if (pastStates.length > 0) undo();
  }, []);

  const handleRedo = React.useCallback(() => {
    const { redo, futureStates } = useImageStore.temporal.getState();
    if (futureStates.length > 0) redo();
  }, []);

  const showVideoExport =
    slides.length > 0 ||
    timeline.tracks.length > 0 ||
    animationClips.length > 0;

  const {
    copyImage,
    isExporting,
    isCopying,
    progress,
    copyProgress,
    settings: exportSettings,
    exportImage,
    updateScale,
    updateFormat,
    updateQualityPreset,
  } = useExport(selectedAspectRatio);

  const { isBatchExporting, batchProgress, exportAllSlides } = useBatchExport(
    selectedAspectRatio,
    exportSettings,
  );

  const handleExport = async () => {
    setExportError(null);
    try {
      await exportImage();
      setExportOpen(false);
    } catch (err) {
      setExportError(
        err instanceof Error ? err.message : "Export failed. Please try again.",
      );
    }
  };

  const handleExportAll = async () => {
    setExportOpen(false);
    await exportAllSlides();
  };

  const formatLabel =
    exportSettings.format === "jpeg"
      ? "JPEG"
      : exportSettings.format === "webp"
        ? "WebP"
        : "PNG";

  return (
    <>
      <header
        className={cn(
          "h-16 bg-background border-b border-foreground/10 grid grid-cols-[1fr_auto_1fr] items-center shrink-0",
          isMobile ? "gap-1 px-2" : "gap-3 px-4"
        )}
      >
        <div className="flex items-center h-8 justify-self-start min-w-0">
          <Link
            href="/landing"
            className="flex items-center gap-2.5 h-8 hover:opacity-80 transition-opacity shrink-0"
          >
            <Image
              src="/logo-mark.png"
              alt="Screenshot Studio"
              width={32}
              height={32}
              className="h-8 w-8"
              priority
            />
            <span className="hidden sm:inline font-semibold text-foreground text-sm tracking-tight leading-none">
              Screenshot Studio
            </span>
          </Link>

          <div
            className={cn(
              "h-4 w-px bg-foreground/10 shrink-0",
              isMobile ? "mx-1.5" : "mx-2.5"
            )}
            aria-hidden
          />

          {/* 常驻导入入口：空画布叫「导入」，有图叫「替换图片」 */}
          <input
            ref={importInputRef}
            type="file"
            accept={IMPORT_ACCEPT}
            multiple
            className="hidden"
            onChange={(e) => {
              handleImportFiles(Array.from(e.target.files ?? []));
              // 允许连续选择同一个文件
              e.target.value = "";
            }}
          />
          <button
            type="button"
            onClick={() => importInputRef.current?.click()}
            aria-label={hasImage ? "替换图片" : "导入图片"}
            title={
              hasImage
                ? "替换主图（保留已调好的背景、文字与样式）"
                : "导入图片（也可直接拖拽或粘贴）"
            }
            className={cn(
              "inline-flex items-center gap-1.5 h-8 rounded-md shrink-0 cursor-pointer",
              "text-sm font-medium leading-none transition-colors duration-150",
              isMobile ? "px-2" : "px-2.5",
              "bg-foreground/[0.06] text-foreground border border-foreground/10",
              "hover:bg-foreground/[0.1] hover:border-foreground/15",
              "active:scale-[0.97]"
            )}
          >
            <ImageUpload01Icon size={14} className="shrink-0" />
            {!isMobile ? <span>{hasImage ? "替换图片" : "导入"}</span> : null}
          </button>

          <button
            type="button"
            onClick={() => setShowTemplates(!showTemplates)}
            aria-expanded={showTemplates}
            aria-label="模板"
            className={cn(
              "inline-flex items-center gap-1.5 h-8 px-2 rounded-md shrink-0 cursor-pointer",
              "text-sm font-medium leading-none transition-colors duration-150",
              showTemplates
                ? "text-foreground hover:text-foreground/70"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <MagicWand01Icon size={14} className="shrink-0" />
            {!isMobile ? <span>模板</span> : null}
          </button>
        </div>

        <div
          className={cn(
            "flex items-center justify-center justify-self-center",
            isMobile ? "gap-1" : "gap-2.5"
          )}
        >
          {showHistoryControls ? (
            <div className="flex items-center gap-1">
              <button
                onClick={handleUndo}
                disabled={!canUndo}
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-md shrink-0 cursor-pointer",
                  "text-muted-foreground transition-all duration-150",
                  canUndo
                    ? "hover:text-foreground active:scale-95"
                    : "opacity-40 cursor-not-allowed",
                )}
                title="撤销（Cmd+Z）"
              >
                <ArrowTurnBackwardIcon size={16} />
              </button>
              <button
                onClick={handleRedo}
                disabled={!canRedo}
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-md shrink-0 cursor-pointer",
                  "text-muted-foreground transition-all duration-150",
                  canRedo
                    ? "hover:text-foreground active:scale-95"
                    : "opacity-40 cursor-not-allowed",
                )}
                title="重做（Cmd+Shift+Z）"
              >
                <ArrowTurnForwardIcon size={16} />
              </button>
            </div>
          ) : null}

          {hasImage && !isMobile ? (
            <div className="w-px h-4 bg-foreground/10 shrink-0" aria-hidden />
          ) : null}

          {hasImage && !isMobile ? (
            <div className="flex items-center gap-1">
              <button
                onClick={toggleRulers}
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-md shrink-0 cursor-pointer transition-all duration-150 active:scale-95",
                  showRulers
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
                title="切换标尺"
              >
                <RulerIcon size={15} />
              </button>
              {showRulers ? (
                <select
                  value={rulerInterval}
                  onChange={(e) => setRulerInterval(Number(e.target.value))}
                  className="h-8 px-1.5 text-[11px] rounded-md bg-muted text-foreground border-0 outline-none cursor-pointer shrink-0"
                  title="标尺间隔"
                >
                  <option value={25}>25px</option>
                  <option value={50}>50px</option>
                  <option value={100}>100px</option>
                  <option value={200}>200px</option>
                </select>
              ) : null}
              <button
                onClick={toggleGrid}
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-md shrink-0 cursor-pointer transition-all duration-150 active:scale-95",
                  showGrid
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
                title="切换网格"
              >
                <GridIcon size={15} />
              </button>
            </div>
          ) : null}

          {hasImage && !isMobile ? (
            <div className="w-px h-4 bg-foreground/10 shrink-0" aria-hidden />
          ) : null}

          <div className="flex items-center gap-1">
            <Popover open={aspectRatioOpen} onOpenChange={setAspectRatioOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "h-8 gap-1.5 rounded-md text-muted-foreground hover:text-foreground shrink-0",
                    isMobile ? "px-1.5" : "px-2.5"
                  )}
                >
                  <AspectRatioIcon size={15} />
                  <span className="text-xs leading-none">
                    {currentAspectRatio
                      ? `${currentAspectRatio.width}:${currentAspectRatio.height}`
                      : "自动"}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="p-0 w-[420px]"
                align="center"
                sideOffset={8}
                collisionPadding={16}
              >
                <AspectRatioPicker onSelect={() => setAspectRatioOpen(false)} />
              </PopoverContent>
            </Popover>

            {slides.length > 0 && !isMobile ? (
              <label className="cursor-pointer inline-flex shrink-0">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.length) {
                      useImageStore
                        .getState()
                        .addImages(Array.from(e.target.files));
                    }
                  }}
                />
                <span className="h-8 inline-flex items-center justify-center gap-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted text-xs leading-none transition-all font-medium px-2.5">
                  <Add01Icon size={14} />
                  <span>添加幻灯片</span>
                </span>
              </label>
            ) : null}
          </div>

          <div className="w-px h-4 bg-foreground/10 shrink-0" aria-hidden />

          <div className={cn("flex items-center", isMobile ? "gap-1" : "gap-1.5")}>
            <Button
              onClick={() => copyImage()}
              disabled={!hasImage || isExporting || isCopying}
              variant="ghost"
              size="sm"
              aria-label="复制"
              className={cn(
                "h-8 gap-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-transparent dark:hover:bg-transparent text-xs leading-none shrink-0",
                isMobile ? "px-1.5" : "px-2.5"
              )}
            >
              <Copy01Icon size={15} />
              {!isMobile ? <span>复制</span> : null}
            </Button>

            <Popover
              open={exportOpen}
              onOpenChange={isExporting ? undefined : setExportOpen}
            >
              <PopoverTrigger asChild>
                <Button
                  disabled={!hasImage}
                  size="sm"
                  aria-label="保存"
                  className={cn(
                    "h-8 gap-1.5 rounded-md text-xs font-medium leading-none shrink-0",
                    isMobile ? "px-2" : "px-3"
                  )}
                >
                  <Download04Icon size={15} />
                  {!isMobile ? <span>保存</span> : null}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-[340px] p-0"
                align="center"
                sideOffset={8}
                collisionPadding={16}
                onPointerDownOutside={
                  isExporting ? (e) => e.preventDefault() : undefined
                }
              >
                {isExporting ? (
                  <div className="p-5">
                    <p className="text-sm font-medium text-foreground mb-1">
                      正在导出...
                    
                    </p>
                    <p className="text-xs text-muted-foreground mb-4">
                      正在渲染你的作品
                    
                    </p>
                    <ImageExportProgressView
                      progress={progress}
                      format={exportSettings.format}
                    />
                  </div>
                ) : (
                  <div className="p-4 space-y-4">
                    <FormatSelector
                      format={exportSettings.format}
                      onFormatChange={updateFormat}
                    />
                    <QualityPresetSelector
                      qualityPreset={exportSettings.qualityPreset}
                      format={exportSettings.format}
                      onQualityPresetChange={updateQualityPreset}
                    />
                    <ScaleSlider
                      scale={exportSettings.scale}
                      onScaleChange={updateScale}
                    />

                    {exportError && (
                      <div className="text-xs text-destructive bg-destructive/10 p-2.5 rounded-md border border-destructive/20">
                        {exportError}
                      </div>
                    )}

                    <Button
                      onClick={handleExport}
                      disabled={isExporting}
                      className="w-full h-10 text-sm font-semibold rounded-md transition-all"
                    >
                      <Download01Icon size={16} className="mr-2" />
                      导出为  {formatLabel}
                    </Button>

                    {slides.length > 1 && (
                      <Button
                        onClick={handleExportAll}
                        disabled={isExporting || isBatchExporting}
                        variant="outline"
                        className="w-full h-10 text-sm font-semibold rounded-md transition-all"
                      >
                        <FileZipIcon size={16} className="mr-2" />
                        全部导出（{slides.length})
                      </Button>
                    )}
                  </div>
                )}
              </PopoverContent>
            </Popover>

            {hasImage && showVideoExport && !isMobile ? (
              <Button
                onClick={() => setExportSlideshowOpen(true)}
                size="sm"
                className="h-8 gap-1.5 rounded-md text-xs font-medium leading-none px-3 shrink-0"
              >
                <Video01Icon size={14} />
                <span>导出视频</span>
              </Button>
            ) : null}
          </div>

          {(hasImage || uploadedImageUrl) && !isMobile ? (
            <>
              <div className="w-px h-4 bg-foreground/10 shrink-0" aria-hidden />
              <div className="flex items-center gap-1">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button
                      type="button"
                      className={cn(
                        "inline-flex h-8 shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-md px-2.5",
                        "text-xs font-medium leading-none text-muted-foreground transition-[color,background-color,transform] duration-150",
                        "hover:bg-muted hover:text-foreground active:scale-[0.98]",
                      )}
                      aria-label="重新开始"
                      title="重置设计与动画"
                    >
                      <RefreshIcon size={14} />
                      <span>重新开始</span>
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="sm:max-w-[420px]">
                    <AlertDialogHeader>
                      <div className="mx-auto flex size-10 items-center justify-center rounded-full bg-destructive/10 text-destructive sm:mx-0">
                        <RefreshIcon aria-hidden="true" size={18} />
                      </div>
                      <AlertDialogTitle>重新开始？</AlertDialogTitle>
                      <AlertDialogDescription>
                        这会重置当前设计、叠加层与动画。你上传的素材会保留，且此操作可以撤销。
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>取消</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={resetCanvasSettings}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:ring-destructive/30"
                      >
                        重新开始
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                {hasImage ? (
                  <Button
                    onClick={clearImage}
                    variant="ghost"
                    size="sm"
                    className="h-8 gap-1.5 px-2.5 text-xs leading-none text-muted-foreground hover:text-destructive hover:bg-transparent dark:hover:bg-transparent shrink-0"
                  >
                    <Delete02Icon size={14} />
                    <span>移除</span>
                  </Button>
                ) : null}
              </div>
            </>
          ) : null}
        </div>

        <div className="flex items-center gap-1 justify-self-end">
          {!isMobile ? <FeedbackWidget /> : null}
          {!isMobile ? <GitHubStarButton compact /> : null}
          <a
            href="https://x.com/code_kartik"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-9 h-9 rounded-md text-muted-foreground transition-[color,filter] duration-150 hover:text-foreground "
          >
            <NewTwitterIcon className="h-[18px] w-[18px]" />
          </a>
        </div>
      </header>

      <CopyProgressDialog open={isCopying} progress={copyProgress} />

      <BatchExportProgressDialog
        open={isBatchExporting}
        batchProgress={batchProgress}
        format={exportSettings.format}
      />

      <ExportSlideshowDialog
        open={exportSlideshowOpen}
        onOpenChange={setExportSlideshowOpen}
      />
    </>
  );
}
