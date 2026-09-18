import { defineRouting } from "next-intl/routing";

export const locales = [
  "en",
  "es",
  "fr",
  "de",
  "ja",
  "pt",
  "ko",
  "zh",
] as const;

export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  ja: "日本語",
  pt: "Português",
  ko: "한국어",
  zh: "简体中文",
};

export const routing = defineRouting({
  locales,
  // 界面文案已就地汉化，故默认语言设为简体中文：
  // 根路径 `/` 直接以中文呈现，<html lang="zh"> 亦与之相符。
  defaultLocale: "zh",
  localePrefix: "as-needed",
});
