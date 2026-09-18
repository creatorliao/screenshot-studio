export const DEVICE_SCREEN_DROPZONE_SELECTOR = "[data-device-screen-dropzone]";

/**
 * 首屏上传区自己的 dropzone。
 *
 * 为什么要显式仲裁：`CleanUploadState` 的 dropzone 与 `GlobalDropZone` 的
 * document 级 drop 都会响应同一次拖放，两边都没有 stopPropagation 或"已处理"标记，
 * 于是同一张图被消费两次（先成为主图，300ms 后又变成一张贴纸）。
 * 设备屏早就有同类仲裁（见 `isDeviceScreenDropTarget`），这里沿用同一套模式。
 */
export const UPLOAD_DROPZONE_SELECTOR = "[data-upload-dropzone]";

interface ClosestTarget extends EventTarget {
  closest: (selector: string) => unknown;
}

function hasClosest(target: EventTarget | null): target is ClosestTarget {
  return typeof (target as Partial<ClosestTarget> | null)?.closest === "function";
}

export function isDeviceScreenDropTarget(target: EventTarget | null): boolean {
  return hasClosest(target) && Boolean(target.closest(DEVICE_SCREEN_DROPZONE_SELECTOR));
}

export function isUploadDropzoneTarget(target: EventTarget | null): boolean {
  return hasClosest(target) && Boolean(target.closest(UPLOAD_DROPZONE_SELECTOR));
}
