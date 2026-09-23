export type Locale = "ar" | "en";
export type Localized = { ar: string; en: string };

export type PlatformId =
  | "instagram"
  | "tiktok"
  | "youtube"
  | "facebook"
  | "x"
  | "telegram"
  | "snapchat";

export type Platform = {
  id: PlatformId;
  name: Localized;
  short: string;
  accent: "pink" | "cyan" | "red" | "blue" | "neutral" | "sky" | "yellow";
  monogram: string;
};

export const platforms: Platform[] = [
  { id: "instagram", name: { ar: "إنستغرام", en: "Instagram" }, short: "IG", accent: "pink", monogram: "◎" },
  { id: "tiktok", name: { ar: "تيك توك", en: "TikTok" }, short: "TT", accent: "cyan", monogram: "♪" },
  { id: "youtube", name: { ar: "يوتيوب", en: "YouTube" }, short: "YT", accent: "red", monogram: "▶" },
  { id: "facebook", name: { ar: "فيسبوك", en: "Facebook" }, short: "FB", accent: "blue", monogram: "f" },
  { id: "x", name: { ar: "إكس", en: "X" }, short: "X", accent: "neutral", monogram: "𝕏" },
  { id: "telegram", name: { ar: "تيليغرام", en: "Telegram" }, short: "TG", accent: "sky", monogram: "➤" },
  { id: "snapchat", name: { ar: "سناب شات", en: "Snapchat" }, short: "SC", accent: "yellow", monogram: "◉" },
];
