"use client";

import * as React from "react";
import { Cancel01Icon, Idea01Icon } from "hugeicons-react";
import { useHasRenderableContent } from "@/hooks/use-has-renderable-content";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "screenshotstudio-post-import-hint-dismissed";

/**
 * 导入完成后的「下一步」指引。
 *
 * 用户诉求 R1.4：导入完成后界面要给出"下一步做什么"的指向，而不是把用户丢到
 * 一堆面板里。产品内原本只有推文导入给了流程引导，主路径没有。
 *
 * 设计约束（对齐 `04-方案` §1 P6「引导式导入，但绝不强制」）：
 * - 不做强制向导；老用户第二次进来不该看到 → 关闭状态写 localStorage，永久不再出现。
 * - 只说"去哪"，不加装饰性动效。
 */
export function PostImportHint() {
  const hasContent = useHasRenderableContent();
  const [dismissed, setDismissed] = React.useState(true);

  React.useEffect(() => {
    try {
      setDismissed(window.localStorage.getItem(STORAGE_KEY) === "1");
    } catch {
      // 隐私模式下 localStorage 可能不可用 —— 那就当作已关闭，不打扰用户
      setDismissed(true);
    }
  }, []);

  const handleDismiss = React.useCallback(() => {
    setDismissed(true);
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // 忽略：关掉这一条不需要持久化成功
    }
  }, []);

  if (!hasContent || dismissed) return null;

  return (
    <div
      className={cn(
        "flex items-center gap-2 px-3 py-1.5 shrink-0",
        "bg-foreground/[0.04] border-b border-foreground/10",
        "text-xs text-muted-foreground",
      )}
    >
      <Idea01Icon size={14} className="shrink-0 text-foreground/60" />
      <span className="min-w-0 flex-1 truncate">
        图片已导入。下一步：左侧面板调
        <span className="text-foreground/80"> 背景 </span>与
        <span className="text-foreground/80"> 文字 </span>，右上角
        <span className="text-foreground/80"> 保存 </span>导出。想换图直接点顶部「替换图片」，样式会保留。
      </span>
      <button
        type="button"
        onClick={handleDismiss}
        aria-label="不再显示这条提示"
        title="不再显示"
        className="shrink-0 rounded p-0.5 text-muted-foreground/70 transition-colors hover:text-foreground"
      >
        <Cancel01Icon size={13} />
      </button>
    </div>
  );
}
