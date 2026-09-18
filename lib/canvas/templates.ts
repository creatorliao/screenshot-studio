import type { Template } from "@/types/canvas";
import { DEFAULT_CANVAS_WIDTH, DEFAULT_CANVAS_HEIGHT } from "@/lib/constants";

export const templates: Template[] = [
  // Solid color templates
  {
    id: "solid-white",
    name: "白色",
    description: "干净的白色背景",
    background: {
      type: "solid",
      color: "#ffffff",
    },
    dimensions: {
      width: DEFAULT_CANVAS_WIDTH,
      height: DEFAULT_CANVAS_HEIGHT,
    },
  },
  {
    id: "solid-black",
    name: "黑色",
    description: "深黑色背景",
    background: {
      type: "solid",
      color: "#000000",
    },
    dimensions: {
      width: DEFAULT_CANVAS_WIDTH,
      height: DEFAULT_CANVAS_HEIGHT,
    },
  },
  {
    id: "solid-gray",
    name: "灰色",
    description: "中性灰背景",
    background: {
      type: "solid",
      color: "#f5f5f5",
    },
    dimensions: {
      width: DEFAULT_CANVAS_WIDTH,
      height: DEFAULT_CANVAS_HEIGHT,
    },
  },
  // Gradient templates
  {
    id: "gradient-blue",
    name: "海风",
    description: "平滑蓝色渐变",
    background: {
      type: "gradient",
      gradient: {
        type: "linear",
        colors: ["#4facfe", "#00f2fe"],
        angle: 135,
      },
    },
    dimensions: {
      width: DEFAULT_CANVAS_WIDTH,
      height: DEFAULT_CANVAS_HEIGHT,
    },
  },
  {
    id: "gradient-purple",
    name: "皇家紫",
    description: "鲜亮紫色渐变",
    background: {
      type: "gradient",
      gradient: {
        type: "linear",
        colors: ["#667eea", "#764ba2"],
        angle: 45,
      },
    },
    dimensions: {
      width: DEFAULT_CANVAS_WIDTH,
      height: DEFAULT_CANVAS_HEIGHT,
    },
  },
  {
    id: "gradient-orange",
    name: "日落辉光",
    description: "暖橙色渐变",
    background: {
      type: "gradient",
      gradient: {
        type: "linear",
        colors: ["#fa709a", "#fee140"],
        angle: 90,
      },
    },
    dimensions: {
      width: DEFAULT_CANVAS_WIDTH,
      height: DEFAULT_CANVAS_HEIGHT,
    },
  },
  // Abstract shapes templates
  {
    id: "shapes-circles",
    name: "圆形",
    description: "抽象圆形图案",
    background: {
      type: "shapes",
      color: "#ffffff",
      shapes: [
        {
          type: "circle",
          x: 200,
          y: 200,
          width: 300,
          height: 300,
          color: "#e0e0e0",
          opacity: 0.5,
        },
        {
          type: "circle",
          x: 1500,
          y: 800,
          width: 400,
          height: 400,
          color: "#d0d0d0",
          opacity: 0.3,
        },
      ],
    },
    dimensions: {
      width: DEFAULT_CANVAS_WIDTH,
      height: DEFAULT_CANVAS_HEIGHT,
    },
  },
  {
    id: "shapes-squares",
    name: "方形",
    description: "几何方形图案",
    background: {
      type: "shapes",
      color: "#f8f9fa",
      shapes: [
        {
          type: "rect",
          x: 100,
          y: 100,
          width: 250,
          height: 250,
          color: "#e9ecef",
          opacity: 0.6,
        },
        {
          type: "rect",
          x: 1600,
          y: 700,
          width: 300,
          height: 300,
          color: "#dee2e6",
          opacity: 0.4,
        },
      ],
    },
    dimensions: {
      width: DEFAULT_CANVAS_WIDTH,
      height: DEFAULT_CANVAS_HEIGHT,
    },
  },
];

export function getTemplateById(id: string): Template | undefined {
  return templates.find((t) => t.id === id);
}
