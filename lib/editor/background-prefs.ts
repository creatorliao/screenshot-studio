/**
 * 背景面板的本地偏好：最近使用、收藏、上次停留的分类。
 *
 * 全部走 localStorage，不引入后端（对齐 `04-方案` 模块 3 第 4 条：
 * "复用现有 localStorage 偏好写法（hooks/useCustomPresets.ts 已有类似设施），不做后端"）。
 *
 * 注意：`blob:` 开头的自定义上传背景**不入库** —— objectURL 在刷新后失效，
 * 存进去只会得到一条点不开的死记录。
 */

export type BackgroundRefType = "gradient" | "solid" | "image";

export interface BackgroundRef {
  /** 与 `backgroundConfig.type` 对齐 */
  type: BackgroundRefType;
  /** 与 `backgroundConfig.value` 对齐，例如 `magic:mesh_aurora` / `#ff0000` / 图片路径 */
  value: string;
  /** 面板上显示的名字 —— 改造前 318 个候选连 title 都没有 */
  label: string;
}

const RECENT_KEY = "screenshotstudio-bg-recent";
const FAVORITES_KEY = "screenshotstudio-bg-favorites";
const TAB_KEY = "screenshotstudio-bg-tab";
const RECENT_LIMIT = 12;

function readList(key: string): BackgroundRef[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is BackgroundRef =>
        !!item &&
        typeof item.value === "string" &&
        typeof item.label === "string" &&
        typeof item.type === "string" &&
        !item.value.startsWith("blob:"),
    );
  } catch {
    return [];
  }
}

function writeList(key: string, list: BackgroundRef[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(list));
  } catch {
    // 隐私模式/配额满：偏好存不下不影响主流程
  }
}

export function isPersistableBackground(ref: BackgroundRef): boolean {
  return !ref.value.startsWith("blob:");
}

export function loadRecentBackgrounds(): BackgroundRef[] {
  return readList(RECENT_KEY);
}

export function pushRecentBackground(ref: BackgroundRef): BackgroundRef[] {
  if (!isPersistableBackground(ref)) return loadRecentBackgrounds();
  const rest = loadRecentBackgrounds().filter((item) => item.value !== ref.value);
  const next = [ref, ...rest].slice(0, RECENT_LIMIT);
  writeList(RECENT_KEY, next);
  return next;
}

export function loadFavoriteBackgrounds(): BackgroundRef[] {
  return readList(FAVORITES_KEY);
}

export function toggleFavoriteBackground(ref: BackgroundRef): BackgroundRef[] {
  if (!isPersistableBackground(ref)) return loadFavoriteBackgrounds();
  const current = loadFavoriteBackgrounds();
  const exists = current.some((item) => item.value === ref.value);
  const next = exists
    ? current.filter((item) => item.value !== ref.value)
    : [ref, ...current];
  writeList(FAVORITES_KEY, next);
  return next;
}

export type BackgroundTab = "solid" | "gradient" | "image" | "effects";

export function loadBackgroundTab(fallback: BackgroundTab): BackgroundTab {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(TAB_KEY);
    if (raw === "solid" || raw === "gradient" || raw === "image" || raw === "effects") {
      return raw;
    }
  } catch {
    // 忽略
  }
  return fallback;
}

export function saveBackgroundTab(tab: BackgroundTab): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(TAB_KEY, tab);
  } catch {
    // 忽略
  }
}

/**
 * 把常量表的 key 变成人能读的名字。
 *
 * 渐变的 key 本身就是描述性的（`magic_aurora`、`vibrant_orange_pink`），
 * 所以直接按词拆开首字母大写即可 —— 这比"什么都没有"强得多，也让搜索有意义。
 * 已知不足：这些名字是英文。要真正中文化需要给 214 条渐变逐条起名，
 * 属独立工作量，本次不做（见执行记录「已知不足」）。
 */
export function humanizeGradientKey(key: string): string {
  return key
    .replace(/^(magic|mesh)_/, "")
    .split("_")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
