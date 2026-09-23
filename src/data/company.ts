import type { Localized } from "./platforms";

export const company = {
  name: "Tasweq",
  arabicName: "تسويق",
  instagramHandle: "@tasweq.com1",
  instagramUrl: "https://instagram.com/tasweq.com1",
  contact: {
    instagram: {
      handle: "@tasweq.com1",
      url: "https://instagram.com/tasweq.com1",
    },
  },
  legal: {
    privacy: "#privacy",
    terms: "#terms",
    refunds: "#refunds",
  },
  description: {
    ar: "تسويق تقدم خدمات نمو إنستغرام واضحة بأسعار مباشرة وتجربة عربية/إنجليزية مريحة.",
    en: "Tasweq delivers clear Instagram growth services with direct pricing and a smooth Arabic/English experience.",
  } satisfies Localized,
} as const;

export const productFacts: { value: string; label: Localized }[] = [
  { value: "3", label: { ar: "خدمات أساسية", en: "Core services" } },
  { value: "JOD", label: { ar: "سعر بالدينار", en: "Jordanian pricing" } },
  { value: "AR / EN", label: { ar: "واجهة عربية/إنجليزية", en: "Arabic + English" } },
  { value: "IG", label: { ar: "تخصيص إنستغرام", en: "Instagram focus" } },
];
