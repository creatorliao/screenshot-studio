"use client";

import * as React from "react";
import Link from "next/link";
import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowRight01Icon, Cancel01Icon, SourceCodeIcon } from "hugeicons-react";

const DISMISSED_KEY = "screenshotstudio-code-images-banner-dismissed";

export function CodeImagesBanner() {
  const isMobile = useIsMobile();
  const [isDismissed, setIsDismissed] = React.useState(true);

  React.useEffect(() => {
    setIsDismissed(localStorage.getItem(DISMISSED_KEY) === "true");
  }, []);

  const handleDismiss = () => {
    localStorage.setItem(DISMISSED_KEY, "true");
    setIsDismissed(true);
  };

  if (isMobile || isDismissed) return null;

  return (
    <div className="relative z-50 w-full border-b border-foreground/10 bg-card px-4 py-2">
      <div className="mx-auto flex max-w-7xl items-center justify-center">
        <div className="flex max-w-full min-w-0 items-center justify-center gap-2.5 text-center">
          <span className="inline-flex h-6 shrink-0 items-center rounded-md bg-foreground px-2 text-[10px] font-semibold uppercase tracking-wide text-background">
            新
          
          </span>
          <SourceCodeIcon size={16} aria-hidden="true" className="shrink-0 text-foreground" />
          <p className="truncate text-sm text-foreground">
            <span className="font-medium">代码图片</span>
            <span className="text-muted-foreground">
              {" "}把任意代码片段变成精美的可分享图片，包含 14 款主题和 150+ 背景。
            
            </span>
          </p>
          <Link
            href="/code"
            className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-foreground underline-offset-4 hover:underline"
          >
            试一试
            
            <ArrowRight01Icon size={14} aria-hidden="true" />
          </Link>
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="关闭代码图片公告"
            className="ml-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-foreground/[0.06] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          >
            <Cancel01Icon size={14} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
