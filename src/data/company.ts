import type { Localized } from "./platforms";

export const company = {
  name: "Tasweq",
  arabicName: "تسويق",
  email: "hello@tasweq.example",
  instagram: "https://instagram.com/",
  whatsapp: "https://wa.me/000000000000",
  legal: {
    privacy: "#privacy",
    terms: "#terms",
    refunds: "#refunds",
  },
  description: {
    ar: "تسويق هي منصة لخدمات نمو وتطوير الحضور على منصات التواصل الاجتماعي، تجمع خدمات متعددة في تجربة بسيطة وواضحة.",
    en: "Tasweq brings social media growth services together in one simple, modern experience.",
  } satisfies Localized,
} as const;

export const productFacts: { value: string; label: Localized }[] = [
  { value: "7+", label: { ar: "منصات مدعومة", en: "Supported platforms" } },
  { value: "20+", label: { ar: "فئات خدمات", en: "Service categories" } },
  { value: "AR / EN", label: { ar: "دعم عربي وإنجليزي", en: "Arabic + English" } },
  { value: "Global", label: { ar: "توفر عالمي", en: "Worldwide availability" } },
];
