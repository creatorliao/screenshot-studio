"use client";

import * as React from "react";
import { LeftEditPanel } from "./LeftEditPanel";
import { RightSettingsPanel } from "./RightSettingsPanel";
import { UnifiedRightPanel } from "./unified-right-panel";
import { EditorContent } from "./EditorContent";
import { EditorCanvas } from "@/components/canvas/EditorCanvas";
import { EditorStoreSync } from "@/components/canvas/EditorStoreSync";
import { EditorHeader } from "./EditorHeader";
import { PostImportHint } from "./PostImportHint";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Settings02Icon, VideoReplayIcon } from "hugeicons-react";
import { useAutosaveDraft } from "@/hooks/useAutosaveDraft";
import { MobileBanner } from "./MobileBanner";
import { CodeImagesBanner } from "./CodeImagesBanner";
import { TimelineEditor } from "@/components/timeline";
import { useImageStore } from "@/lib/store";
import { trackEditorOpen } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { useHasRenderableContent } from "@/hooks/use-has-renderable-content";

function EditorMain() {
  const isMobile = useIsMobile();
  const [mobileSheetOpen, setMobileSheetOpen] = React.useState(false);
  const {
    showTimeline,
    toggleTimeline,
    showTemplates,
    setShowTemplates,
  } = useImageStore();

  // enable autosave
  useAutosaveDraft();

  // 全仓统一判据，见 hooks/use-has-renderable-content.ts
  const hasContent = useHasRenderableContent();

  React.useEffect(() => {
    document.body.style.overflow = "hidden";
    trackEditorOpen();
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Templates overlay lives in UnifiedRightPanel, which only mounts when the
  // sheet is open. Opening Templates from the header must open the sheet too.
  React.useEffect(() => {
    if (isMobile && showTemplates) {
      setMobileSheetOpen(true);
    }
  }, [isMobile, showTemplates]);

  const handleMobileSheetOpenChange = (open: boolean): void => {
    setMobileSheetOpen(open);
    if (!open) {
      setShowTemplates(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <EditorStoreSync />

      <MobileBanner />
      <CodeImagesBanner />

      <EditorHeader />

      <PostImportHint />

      {isMobile && hasContent && (
        <div className="bg-background border-b border-foreground/10 flex items-center justify-end px-3 py-2 z-10 shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMobileSheetOpen(true)}
            className="h-8 gap-1.5 rounded-md px-2.5 text-xs text-muted-foreground hover:text-foreground hover:bg-foreground/[0.06] border border-foreground/10 bg-foreground/[0.04]"
          >
            <Settings02Icon size={15} />
            <span>设置</span>
          </Button>
        </div>
      )}

      <div className="flex-1 flex overflow-hidden">
        {/*
          空画布时收起左右两个属性面板。
          改造前它们照常全量渲染（左 9 个区块、右 34 个 3D 预设），控件可点但什么
          都不会发生 —— 用户进来看到的是"一个已经开好的编辑器和一堆控件"，而不是
          "请先放一张图"。见 `03-分析报告_现状诊断.md` §3 R1。
        */}
        {!isMobile && hasContent && <LeftEditPanel />}

        <div className="flex-1 flex flex-col overflow-hidden bg-background relative min-w-0">
          <div
            className={cn(
              "flex-1 flex items-center justify-center overflow-y-auto overflow-x-hidden relative min-h-0",
              // Dock space for the Animate chip so portrait stages don't sit under it
              hasContent && !showTimeline && !isMobile && "pb-14"
            )}
          >
            <EditorContent>
              <EditorCanvas />
            </EditorContent>

            {hasContent && !showTimeline && !isMobile && (
              <button
                type="button"
                onClick={toggleTimeline}
                className={cn(
                  'absolute bottom-3 left-1/2 z-20 -translate-x-1/2',
                  'inline-flex h-9 cursor-pointer items-center gap-2 rounded-md px-4',
                  'bg-card text-sm font-medium text-foreground',
                  'border border-foreground/10',
                  'shadow-lg',
                  'transition-all duration-150 ease-out',
                  'hover:bg-muted hover:border-foreground/15',
                  'active:scale-[0.98]'
                )}
              >
                <VideoReplayIcon size={15} className="text-foreground" />
                <span>动画</span>
              </button>
            )}
          </div>

          {hasContent && showTimeline && !isMobile && <TimelineEditor />}
        </div>

        {!isMobile && hasContent && <RightSettingsPanel />}

        {isMobile && (
          <Sheet open={mobileSheetOpen} onOpenChange={handleMobileSheetOpenChange}>
            <SheetContent
              side="left"
              showCloseButton={false}
              className="h-full w-full max-w-[min(100%,460px)] gap-0 overflow-hidden p-0 sm:max-w-[min(100%,460px)]"
            >
              <SheetTitle className="sr-only">编辑器设置</SheetTitle>
              <UnifiedRightPanel
                onClose={() => handleMobileSheetOpenChange(false)}
              />
            </SheetContent>
          </Sheet>
        )}
      </div>
    </div>
  );
}

export function EditorLayout() {
  return <EditorMain />;
}
