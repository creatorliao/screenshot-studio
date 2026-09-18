"use client";

import { useEditorStore, useImageStore } from "@/lib/store";
import {
  hasVisibleMockups,
  shouldRenderSourceImage,
} from "@/lib/device-mockups/layouts";
import type { Mockup } from "@/types/mockup";

type EditorMode = "screenshot" | "browser" | "device";

/**
 * 「画布上到底有没有可渲染内容」—— 全仓唯一判据。
 *
 * 为什么必须收成一个：改造前同一个问题有三套不等价的判据 ——
 *   `EditorCanvas.tsx` 要 `uploadedImageUrl && screenshot.src`；
 *   `EditorHeader.tsx` 只看 `screenshot.src`；
 *   `ClientCanvas.tsx` 又是第三种组合。
 * 主图加载失败时 `screenshot.src` 被清空而 `uploadedImageUrl` 保留，
 * 于是头部认为"有图"、画布却退回空态，用户看到"按钮能点但什么也不发生"。
 * 详见 `docs/01-Projects/R20260915-01-编辑器工作流与信息架构改善/03-分析报告_现状诊断.md` §3 R5。
 *
 * 这里取**最严**的口径（两个 store 都认），因为 `screenshot.src` 才是
 * `ClientCanvas` 真正拿去渲染的那个字段 —— 判据要和"能不能画出东西"对齐。
 */
export function computeHasRenderableContent(args: {
  uploadedImageUrl: string | null;
  screenshotSrc: string | null;
  editorMode: EditorMode;
  mockups: readonly Mockup[];
}): boolean {
  const { uploadedImageUrl, screenshotSrc, editorMode, mockups } = args;

  const hasMainImage =
    !!uploadedImageUrl &&
    !!screenshotSrc &&
    shouldRenderSourceImage(editorMode, mockups);

  const hasDeviceScene =
    editorMode === "device" && hasVisibleMockups(mockups);

  return hasMainImage || hasDeviceScene;
}

export function useHasRenderableContent(): boolean {
  const screenshotSrc = useEditorStore((s) => s.screenshot.src);
  const uploadedImageUrl = useImageStore((s) => s.uploadedImageUrl);
  const editorMode = useImageStore((s) => s.editorMode);
  const mockups = useImageStore((s) => s.mockups);

  return computeHasRenderableContent({
    uploadedImageUrl,
    screenshotSrc,
    editorMode,
    mockups,
  });
}
