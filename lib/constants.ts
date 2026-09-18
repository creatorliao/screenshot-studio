// Default canvas dimensions
export const DEFAULT_CANVAS_WIDTH = 1920;
export const DEFAULT_CANVAS_HEIGHT = 1080;

// Image upload limits
export const MAX_IMAGE_SIZE = 100 * 1024 * 1024; // 100MB
export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

// Text defaults
export const DEFAULT_TEXT_FONT_SIZE = 48;
export const DEFAULT_TEXT_COLOR = "#000000";
export const DEFAULT_FONT_FAMILY = "Arial";

// Canvas defaults
export const CANVAS_BACKGROUND_COLOR = "#ffffff";

// Aspect Ratio Presets
export interface AspectRatioPreset {
  id: string;
  name: string;
  category: string;
  width: number;
  height: number;
  ratio: string; // e.g., "1:1", "4:5", "9:16"
  description?: string;
}

export const ASPECT_RATIO_PRESETS: AspectRatioPreset[] = [
  // Instagram Formats
  {
    id: "instagram-square",
    name: "Instagram 方形",
    category: "Instagram",
    width: 1080,
    height: 1080,
    ratio: "1:1",
    description: "适合 Instagram 信息流帖子",
  },
  {
    id: "instagram-portrait",
    name: "Instagram 竖版",
    category: "Instagram",
    width: 1080,
    height: 1350,
    ratio: "4:5",
    description: "适用于 Instagram 信息流的竖版格式",
  },
  {
    id: "instagram-landscape",
    name: "Instagram 横版",
    category: "Instagram",
    width: 1080,
    height: 566,
    ratio: "1.91:1",
    description: "适用于 Instagram 信息流的横版格式",
  },
  {
    id: "instagram-story",
    name: "Instagram 快拍",
    category: "Instagram",
    width: 1080,
    height: 1920,
    ratio: "9:16",
    description: "全屏竖版快拍与 Reels",
  },
  {
    id: "instagram-reel",
    name: "Instagram Reel",
    category: "Instagram",
    width: 1080,
    height: 1920,
    ratio: "9:16",
    description: "适合 Reels 的竖版视频格式",
  },
  
  // Common Social Media
  {
    id: "facebook-post",
    name: "Facebook 帖子",
    category: "Facebook",
    width: 1200,
    height: 630,
    ratio: "1.91:1",
    description: "Facebook 标准帖子尺寸",
  },
  {
    id: "twitter-post",
    name: "Twitter/X 推文",
    category: "Twitter",
    width: 1200,
    height: 675,
    ratio: "16:9",
    description: "Twitter 标准帖子尺寸",
  },
  {
    id: "youtube-thumbnail",
    name: "YouTube 缩略图",
    category: "YouTube",
    width: 1280,
    height: 720,
    ratio: "16:9",
    description: "YouTube 视频缩略图尺寸",
  },
  
  // Standard Formats
  {
    id: "custom",
    name: "自定义",
    category: "Custom",
    width: 1920,
    height: 1080,
    ratio: "16:9",
    description: "自定义尺寸",
  },
  {
    id: "square",
    name: "正方形",
    category: "Standard",
    width: 1080,
    height: 1080,
    ratio: "1:1",
    description: "方形格式",
  },
  {
    id: "portrait-4-3",
    name: "竖版 4:3",
    category: "Standard",
    width: 1200,
    height: 1600,
    ratio: "3:4",
    description: "竖版格式 3:4",
  },
  {
    id: "landscape-16-9",
    name: "横版 16:9",
    category: "Standard",
    width: 1920,
    height: 1080,
    ratio: "16:9",
    description: "宽屏横向格式",
  },
  {
    id: "landscape-21-9",
    name: "超宽 21:9",
    category: "Standard",
    width: 2560,
    height: 1080,
    ratio: "21:9",
    description: "超宽格式",
  },
];

export const DEFAULT_ASPECT_RATIO = ASPECT_RATIO_PRESETS.find(p => p.id === "custom") || ASPECT_RATIO_PRESETS[0];
