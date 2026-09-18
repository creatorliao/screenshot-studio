"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useImageStore } from "@/lib/store";
import confetti from 'canvas-confetti';
import { toast } from 'sonner';
import {
  exportSlideshowVideo,
  exportAnimationVideo,
  preloadFFmpeg,
  isExportAborted,
  type VideoExportOptions,
} from "@/lib/export-slideshow-video";
import { isFFmpegLoaded } from "@/lib/export/ffmpeg-encoder";
import { useExportProgress } from "@/hooks/useExportProgress";
import { isMp4Supported, type VideoFormat, type VideoQuality } from "@/lib/export/video-encoder";

type ExportMode = "slideshow" | "animation";

const FORMAT_OPTIONS: { value: VideoFormat; label: string; description: string }[] = [
  { value: "mp4", label: "MP4（H.264）", description: "兼容性最佳，文件更小" },
  { value: "webm", label: "WebM (VP8)", description: "开放格式，针对网页优化" },
];

const QUALITY_OPTIONS: { value: VideoQuality; label: string; bitrate: string }[] = [
  { value: "high", label: "高", bitrate: "25 Mbps" },
  { value: "medium", label: "中等", bitrate: "10 Mbps" },
  { value: "low", label: "低", bitrate: "5 Mbps" },
];

const EXPORT_MESSAGES = [
  "正在截取帧...",
  "正在合成你的作品...",
  "正在细致编码像素...",
  "就快好了，请稍候...",
  "正在打磨成片...",
];

function ExportProgressView({ progress, format }: { progress: number; format: string }) {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (progress < 20) setMessageIndex(0);
    else if (progress < 40) setMessageIndex(1);
    else if (progress < 60) setMessageIndex(2);
    else if (progress < 85) setMessageIndex(3);
    else setMessageIndex(4);
  }, [progress]);

  const roundedProgress = Math.round(progress);

  return (
    <div className="flex flex-col items-center py-8 space-y-6">
      {/* Film reel loader */}
      <style>{`
        .film-loader {
          width: 80px;
          height: 70px;
          border: 5px solid var(--primary);
          padding: 0 8px;
          box-sizing: border-box;
          background:
            linear-gradient(var(--primary) 0 0) 0 0/8px 20px,
            linear-gradient(var(--primary) 0 0) 100% 0/8px 20px,
            radial-gradient(farthest-side, var(--primary) 90%, #0000) 0 5px/8px 8px content-box,
            var(--accent);
          background-repeat: no-repeat;
          animation: filmLoad 2s infinite linear;
        }
        @keyframes filmLoad {
          25% { background-position: 0 0, 100% 100%, 100% calc(100% - 5px); }
          50% { background-position: 0 100%, 100% 100%, 0 calc(100% - 5px); }
          75% { background-position: 0 100%, 100% 0, 100% 5px; }
        }
      `}</style>
      <div className="film-loader" />

      {/* Percentage */}
      <span className="text-2xl font-bold text-primary tabular-nums">{roundedProgress}%</span>

      {/* Progress bar */}
      <div className="w-full">
        <div className="h-1.5 bg-accent rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-200 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Status message */}
      <p className="text-sm text-muted-foreground">
        {EXPORT_MESSAGES[messageIndex]}
      </p>

      {/* Format tag */}
      <div className="px-3 py-1 rounded-full bg-accent border border-border/50">
        <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">
          导出为  {format.toUpperCase()}
        </span>
      </div>
    </div>
  );
}

export function ExportSlideshowDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const { slideshow, setSlideshow, timeline, slides, animationClips } = useImageStore();
  const { active: exporting, progress, abort } = useExportProgress();
  const [format, setFormat] = useState<VideoFormat>("mp4");
  const [quality, setQuality] = useState<VideoQuality>("high");
  const [mp4Supported, setMp4Supported] = useState(true);

  const hasAnimation = timeline.tracks.length > 0 || animationClips.length > 0;
  const hasSlides = slides.length > 1;
  const [exportMode, setExportMode] = useState<ExportMode>("animation");

  useEffect(() => {
    setMp4Supported(isMp4Supported());
  }, []);

  // Preload FFmpeg WASM when dialog opens (hides 2-5s load behind UI interaction)
  useEffect(() => {
    if (open && !isFFmpegLoaded()) {
      preloadFFmpeg().catch(() => {});
    }
  }, [open]);

  // Sync export mode when dialog opens
  useEffect(() => {
    if (open) {
      if (hasAnimation) {
        setExportMode("animation");
      } else {
        setExportMode("slideshow");
      }
    }
  }, [open, hasAnimation]);

  const handleExport = async () => {
    try {
      const options: VideoExportOptions = { format, quality };
      let result;
      if (exportMode === "animation") {
        result = await exportAnimationVideo(options);
      } else {
        result = await exportSlideshowVideo(options);
      }
      if (result.format !== format) {
        console.info(`Exported as ${result.format} (${format} not supported)`);
      }

      // Confetti on successful video export
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });

      toast.success('视频导出成功！', {
        description: `已保存为 ${result.format.toUpperCase()}`,
      });
    } catch (error) {
      // User cancelled — not a failure, no error toast.
      if (isExportAborted(error)) {
        return;
      }
      console.error('Video export failed:', error);
      toast.error('视频导出失败', {
        description: error instanceof Error ? error.message : 'Please try again.',
        duration: 1500,
      });
    } finally {
      onOpenChange(false);
    }
  };

  // Closing the dialog while an export is running cancels it.
  const handleOpenChange = (next: boolean) => {
    if (!next && exporting) {
      abort();
      toast('导出已取消', { id: 'export-cancelled', duration: 1500 });
    }
    onOpenChange(next);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        {exporting ? (
          /* ---- Fun export progress view ---- */
          <div>
            <DialogHeader>
              <DialogTitle>正在导出视频</DialogTitle>
              <DialogDescription>
                稍等片刻，我们正在渲染你的作品
              
              </DialogDescription>
            </DialogHeader>
            <ExportProgressView progress={progress} format={format} />
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleOpenChange(false)}
            >
              取消
            
            </Button>
          </div>
        ) : (
          /* ---- Settings view ---- */
          <>
            <DialogHeader>
              <DialogTitle>导出视频</DialogTitle>
              <DialogDescription>
                配置视频导出设置
              
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-5 pt-2">
              {/* Export Mode Selection */}
              {(hasAnimation || hasSlides) && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/90">导出类型</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setExportMode("animation")}
                      className={`
                        relative p-3 rounded-lg border text-left transition-all
                        ${exportMode === "animation"
                          ? "border-primary/50 bg-primary/10"
                          : "border-border bg-card hover:border-border/80"
                        }
                      `}
                    >
                      <div className="font-medium text-sm text-foreground/90">动画</div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {(timeline.duration / 1000).toFixed(1)}秒视频
                      
                      </div>
                    </button>
                    <button
                      onClick={() => setExportMode("slideshow")}
                      className={`
                        relative p-3 rounded-lg border text-left transition-all
                        ${exportMode === "slideshow"
                          ? "border-primary/50 bg-primary/10"
                          : "border-border bg-card hover:border-border/80"
                        }
                      `}
                    >
                      <div className="font-medium text-sm text-foreground/90">幻灯片</div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {slides.length > 0 ? `共 ${slides.length} 张幻灯片` : '单张图片'}
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* Format Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/90">格式</label>
                <div className="grid grid-cols-2 gap-2">
                  {FORMAT_OPTIONS.map((opt) => {
                    const isDisabled = opt.value === "mp4" && !mp4Supported;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => !isDisabled && setFormat(opt.value)}
                        disabled={isDisabled}
                        className={`
                          relative p-3 rounded-lg border text-left transition-all
                          ${format === opt.value
                            ? "border-primary/50 bg-primary/10"
                            : "border-border bg-card hover:border-border/80"
                          }
                          ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                        `}
                      >
                        <div className="font-medium text-sm text-foreground/90">{opt.label}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{opt.description}</div>
                        {isDisabled && (
                          <div className="text-xs text-amber-400 mt-1">浏览器不受支持</div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quality Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/90">质量</label>
                <div className="flex gap-2">
                  {QUALITY_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setQuality(opt.value)}
                      className={`
                        flex-1 py-2 px-3 rounded-lg border text-center transition-all
                        ${quality === opt.value
                          ? "border-primary/50 bg-primary/10"
                          : "border-border bg-card hover:border-border/80"
                        }
                      `}
                    >
                      <div className="font-medium text-sm text-foreground/90">{opt.label}</div>
                      <div className="text-xs text-muted-foreground">{opt.bitrate}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Slide Duration */}
              {exportMode === "slideshow" && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/90">
                    幻灯片时长
                  
                  </label>
                  <div className="flex items-center gap-3">
                    <Input
                      type="number"
                      min={0.5}
                      max={30}
                      step={0.5}
                      value={slideshow.defaultDuration}
                      onChange={(e) =>
                        setSlideshow({ defaultDuration: Number(e.target.value) || 3 })
                      }
                      className="flex-1"
                    />
                    <span className="text-sm text-muted-foreground">每张幻灯片秒数</span>
                  </div>
                </div>
              )}

              {/* Animation Duration Info */}
              {exportMode === "animation" && (
                <div className="p-3 rounded-lg bg-card border border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground/70">动画时长</span>
                    <span className="text-sm font-medium text-foreground/90">
                      {(timeline.duration / 1000).toFixed(1)} 秒
                    
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    在时间轴控件中调整时长
                  
                  </p>
                </div>
              )}

              {/* Export Button */}
              <Button
                onClick={handleExport}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                size="lg"
              >
                导出为  {format.toUpperCase()}
              </Button>

              {/* Info */}
              {!mp4Supported && format === "webm" && (
                <p className="text-xs text-muted-foreground text-center">
                  MP4 导出需要支持 WebCodecs 的浏览器（Chrome 94+、Edge 94+）
                
                </p>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
