export type Locale = "ar" | "en";
export type Localized = { ar: string; en: string };

export type PlatformId = "instagram";

export type Platform = {
  id: PlatformId;
  name: Localized;
  short: string;
  accent: "pink" | "cyan" | "red" | "blue" | "neutral" | "sky" | "yellow";
  monogram: string;
};

export const platforms: Platform[] = [
  {
    id: "instagram",
    name: { ar: "إنستغرام", en: "Instagram" },
    short: "IG",
    accent: "pink",
    monogram: "◎",
  },
];
