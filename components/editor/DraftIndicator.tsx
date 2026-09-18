"use client";

import {
  Loading03Icon,
  CheckmarkCircle02Icon,
  Clock01Icon,
  Delete02Icon,
} from "hugeicons-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
import { formatDistanceToNow } from "date-fns";

interface DraftIndicatorProps {
  isSaving: boolean;
  lastSaved: Date | null;
  onClearDraft: () => Promise<void>;
}

export function DraftIndicator({
  isSaving,
  lastSaved,
  onClearDraft,
}: DraftIndicatorProps) {
  const getStatusText = () => {
    if (isSaving) return "Saving...";
    if (lastSaved)
      return `Saved ${formatDistanceToNow(lastSaved, { addSuffix: true })}`;
    return "No changes";
  };

  const getIcon = () => {
    if (isSaving) {
      return <Loading03Icon size={12} className="animate-spin" />;
    }
    if (lastSaved) {
      return <CheckmarkCircle02Icon size={12} />;
    }
    return <Clock01Icon size={12} />;
  };

  return (
    <div className="flex items-center gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              {getIcon()}
              <span className="hidden sm:inline">{getStatusText()}</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{getStatusText()}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {lastSaved && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-xs text-destructive hover:text-primary  hover:bg-secondary/10"
            >
              <Delete02Icon size={12} className="mr-1" />
              <span className="hidden sm:inline">清除草稿</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>删除草稿？</AlertDialogTitle>
              <AlertDialogDescription>
                这将永久删除你保存的草稿并清空当前画布。此操作无法撤销。
              
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>取消</AlertDialogCancel>
              <AlertDialogAction
                onClick={onClearDraft}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                删除草稿
              
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
