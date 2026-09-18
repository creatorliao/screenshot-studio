'use client';

import * as React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { useImageStore } from '@/lib/store';
import { IMPORT_FORMAT_HINT, importImageFiles } from '@/lib/editor/import-image';
import {
  isDeviceScreenDropTarget,
  isUploadDropzoneTarget,
} from '@/lib/drop-routing';

/** 设备屏与首屏上传区各自有专用 dropzone，全局这一层要让路。 */
function shouldDeferToLocalDropzone(target: EventTarget | null): boolean {
  return isDeviceScreenDropTarget(target) || isUploadDropzoneTarget(target);
}

interface GlobalDropZoneProps {
  children: React.ReactNode;
}

export function GlobalDropZone({ children }: GlobalDropZoneProps) {
  const [isDraggingOver, setIsDraggingOver] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  /** 拖拽时按住 Shift = 添加为贴纸；默认是替换主图。 */
  const [asSticker, setAsSticker] = React.useState(false);
  const dragCounterRef = React.useRef(0);
  const router = useRouter();
  const pathname = usePathname();

  const isEditorPage = pathname === '/';
  const hasMainImage = useImageStore((s) => !!s.uploadedImageUrl);

  const handleFiles = React.useCallback(
    (files: File[], mode: 'auto' | 'sticker' = 'auto') => {
      const imageFiles = files.filter((f) => f.type.startsWith('image/'));
      if (imageFiles.length === 0) return;

      setIsProcessing(true);
      setError(null);

      // Small delay for the animation to play
      setTimeout(() => {
        const result = importImageFiles(imageFiles, { mode });

        if (result.error && result.imported === 0) {
          setError(result.error);
          setTimeout(() => setError(null), 3000);
        } else if (result.error) {
          // 部分成功：说明被跳过的原因，别让用户以为全都进去了
          setError(`${result.error}（已跳过 ${result.rejected.length} 个文件）`);
          setTimeout(() => setError(null), 3000);
        }

        if (!isEditorPage) {
          router.push('/');
        }

        setIsProcessing(false);
        setIsDraggingOver(false);
        setAsSticker(false);
      }, 300);
    },
    [isEditorPage, router]
  );

  // Global drag events
  React.useEffect(() => {
    const handleDragEnter = (e: DragEvent) => {
      if (shouldDeferToLocalDropzone(e.target)) {
        dragCounterRef.current = 0;
        setIsDraggingOver(false);
        return;
      }
      e.preventDefault();
      dragCounterRef.current++;
      if (e.dataTransfer?.types.includes('Files')) {
        setIsDraggingOver(true);
        setError(null);
      }
    };

    const handleDragOver = (e: DragEvent) => {
      if (shouldDeferToLocalDropzone(e.target)) return;
      e.preventDefault();
      if (e.dataTransfer) {
        e.dataTransfer.dropEffect = 'copy';
      }
      // Shift 是"添加为贴纸"的修饰键，拖动过程中就要让用户看到结果会不同
      setAsSticker(e.shiftKey);
    };

    const handleDragLeave = (e: DragEvent) => {
      if (shouldDeferToLocalDropzone(e.target)) return;
      e.preventDefault();
      dragCounterRef.current--;
      if (dragCounterRef.current <= 0) {
        dragCounterRef.current = 0;
        setIsDraggingOver(false);
        setAsSticker(false);
      }
    };

    const handleDrop = (e: DragEvent) => {
      if (shouldDeferToLocalDropzone(e.target)) {
        dragCounterRef.current = 0;
        setIsDraggingOver(false);
        return;
      }
      e.preventDefault();
      dragCounterRef.current = 0;
      setIsDraggingOver(false);

      const files = Array.from(e.dataTransfer?.files || []);
      if (files.length > 0) {
        handleFiles(files, e.shiftKey ? 'sticker' : 'auto');
      }
    };

    document.addEventListener('dragenter', handleDragEnter);
    document.addEventListener('dragover', handleDragOver);
    document.addEventListener('dragleave', handleDragLeave);
    document.addEventListener('drop', handleDrop);

    return () => {
      document.removeEventListener('dragenter', handleDragEnter);
      document.removeEventListener('dragover', handleDragOver);
      document.removeEventListener('dragleave', handleDragLeave);
      document.removeEventListener('drop', handleDrop);
    };
  }, [handleFiles]);

  // 全局粘贴：编辑器页与营销页共用同一条导入语义。
  // 改造前编辑器页刻意 return（"编辑器有自己的"），结果是空画布上 document 级、
  // 容器级、React onPaste 三处监听同时命中同一次粘贴 → addImages 被调用 2–3 次。
  // 现在由这一处统一处理，CleanUploadState 不再重复注册。
  React.useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      const files: File[] = [];
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.startsWith('image/')) {
          const file = items[i].getAsFile();
          if (file) files.push(file);
        }
      }
      if (files.length > 0) {
        e.preventDefault();
        handleFiles(files);
      }
    };

    document.addEventListener('paste', handlePaste);
    return () => document.removeEventListener('paste', handlePaste);
  }, [handleFiles]);

  return (
    <>
      {children}

      <AnimatePresence>
        {(isDraggingOver || isProcessing) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-none fixed inset-0 z-[9999] flex items-center justify-center"
            style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
          >
            {/* Dark overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/80"
            />

            {/* Drop zone content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative z-10 flex flex-col items-center gap-6"
            >
              {/* Animated dashed border box */}
              <motion.div
                className="w-[420px] h-[280px] rounded-2xl flex flex-col items-center justify-center gap-4"
                style={{
                  border: '2.5px dashed',
                  borderColor: isProcessing ? 'var(--primary)' : 'var(--border)',
                  background: isProcessing
                    ? 'hsl(var(--primary) / 0.05)'
                    : 'hsl(var(--muted) / 0.5)',
                }}
                animate={
                  isProcessing
                    ? {}
                    : {
                        borderColor: [
                          'hsl(var(--border))',
                          'hsl(var(--primary))',
                          'hsl(var(--border))',
                        ],
                      }
                }
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                {isProcessing ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-10 h-10 rounded-full border-2 border-primary border-t-transparent"
                    />
                    <p className="text-sm font-medium text-foreground">正在加载图片...</p>
                  </>
                ) : (
                  <>
                    {/* Animated arrow icon */}
                    <motion.svg
                      width="48"
                      height="48"
                      viewBox="0 0 48 48"
                      fill="none"
                      className="text-primary"
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <path
                        d="M24 6v28M14 24l10 10 10-10"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <line
                        x1="10"
                        y1="42"
                        x2="38"
                        y2="42"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </motion.svg>

                    <div className="text-center">
                      <p className="text-lg font-semibold text-foreground">
                        {asSticker ? '松开即添加为贴纸' : '松开即导入'}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {hasMainImage && !asSticker
                          ? '将替换主图，已调好的背景与文字会保留'
                          : IMPORT_FORMAT_HINT}
                      </p>
                      {hasMainImage ? (
                        <p className="text-xs text-muted-foreground/80 mt-2">
                          按住 Shift 松开 = 添加为贴纸
                        </p>
                      ) : null}
                    </div>
                  </>
                )}
              </motion.div>

              {/* Error message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="px-4 py-2 rounded-lg bg-destructive/10 border border-destructive/20 text-sm text-destructive"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
