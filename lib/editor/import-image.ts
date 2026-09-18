import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_SIZE } from "@/lib/constants";
import { useEditorStore, useImageStore } from "@/lib/store";

/** `<input type="file" accept>` 用，与校验规则同源，避免两处各写一份。 */
export const IMPORT_ACCEPT = ALLOWED_IMAGE_TYPES.join(",");

/** 首屏要直说的格式与上限。数据来自 `lib/constants.ts`，不要写死数字。 */
export const IMPORT_FORMAT_HINT = `支持 PNG / JPG / WebP，单个最大 ${Math.round(
  MAX_IMAGE_SIZE / 1024 / 1024,
)}MB`;

export const IMPORT_TYPE_ERROR = "不支持这种文件格式，请使用 PNG、JPG 或 WebP";
export const IMPORT_SIZE_ERROR = `文件太大了，单个最大 ${Math.round(
  MAX_IMAGE_SIZE / 1024 / 1024,
)}MB`;
export const IMPORT_EMPTY_ERROR = "没有读到图片，请换一个文件试试";

/**
 * 统一的导入校验。改造前有 4 套口径：全局只校验第 1 张、`Add Slide` 完全不校验、
 * 贴纸入口不校验、设备屏不校验；错误文案也有 5 种写法。见
 * `docs/01-Projects/R20260915-01-编辑器工作流与信息架构改善/02-调查_现有工作流与信息架构取证.md` §5。
 */
export function validateImageFile(file: File): string | null {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return IMPORT_TYPE_ERROR;
  }
  if (file.size > MAX_IMAGE_SIZE) {
    return IMPORT_SIZE_ERROR;
  }
  return null;
}

export type ImportMode = "auto" | "sticker";

export interface ImportResult {
  /** 真正落地的图片数量 */
  imported: number;
  /** 被跳过的文件名（校验不通过） */
  rejected: string[];
  /** 面向用户的第一条错误；全部成功时为 null */
  error: string | null;
  /** 实际执行的动作，便于调用方给出确认提示 */
  action: "first-import" | "replace-main" | "add-stickers";
}

function addSticker(file: File): void {
  const url = URL.createObjectURL(file);
  useImageStore.getState().addImageOverlay({
    src: url,
    position: { x: 200 + Math.random() * 100, y: 200 + Math.random() * 100 },
    size: 250,
    rotation: 0,
    opacity: 1,
    flipX: false,
    flipY: false,
    isVisible: true,
    isCustom: true,
  });
}

/**
 * 把一批文件导入编辑器 —— 拖拽 / 点击浏览 / 粘贴 / 头部「导入」四条入口共用。
 *
 * 语义（对齐 `04-方案_导入引导与信息架构重排.md` 模块 2 第 3 条）：
 * - **画布空着** → 首次导入：全部进幻灯片，第一张成为主图（与原有拖拽行为一致）。
 * - **画布已有主图** → 默认**替换主图并保留样式**；多余的文件变成贴纸，不静默丢弃。
 * - `mode: "sticker"` → 一律作为贴纸叠加，用于用户显式选择"添加为贴纸"的场景。
 *
 * 返回结果而不是直接弹 toast，让调用方决定提示方式（桌面用 toast，首屏用内联文案）。
 */
export function importImageFiles(
  files: File[],
  options?: { mode?: ImportMode },
): ImportResult {
  const mode = options?.mode ?? "auto";
  const imageFiles = files.filter((f) => f.type.startsWith("image/"));
  if (imageFiles.length === 0) {
    return {
      imported: 0,
      rejected: files.map((f) => f.name),
      error: IMPORT_EMPTY_ERROR,
      action: "add-stickers",
    };
  }

  const accepted: File[] = [];
  const rejected: string[] = [];
  let firstError: string | null = null;
  for (const file of imageFiles) {
    const err = validateImageFile(file);
    if (err) {
      rejected.push(file.name);
      firstError ??= err;
      continue;
    }
    accepted.push(file);
  }

  if (accepted.length === 0) {
    return { imported: 0, rejected, error: firstError, action: "add-stickers" };
  }

  const { uploadedImageUrl, replaceMainImage, addImages } =
    useImageStore.getState();

  // 显式"添加为贴纸"
  if (mode === "sticker") {
    accepted.forEach(addSticker);
    return { imported: accepted.length, rejected, error: firstError, action: "add-stickers" };
  }

  // 画布空着 → 首次导入（多图进幻灯片）
  if (!uploadedImageUrl) {
    addImages(accepted);
    useEditorStore
      .getState()
      .setScreenshot({ src: useImageStore.getState().uploadedImageUrl });
    return { imported: accepted.length, rejected, error: firstError, action: "first-import" };
  }

  // 已有主图 → 换主图并保留样式；其余文件不丢，转成贴纸
  const [primary, ...rest] = accepted;
  replaceMainImage(primary);
  rest.forEach(addSticker);

  return {
    imported: accepted.length,
    rejected,
    error: firstError,
    action: "replace-main",
  };
}
