import type { Localized, PlatformId } from "./platforms";

export const testimonials: {
  quote: Localized;
  name: Localized;
  role: Localized;
  platform: PlatformId;
}[] = [
  {
    quote: {
      ar: "عرض الخدمات واضح جدًا، ووصلت للباقة المناسبة دون تعقيد.",
      en: "The service selection is very clear, and I found the right package without unnecessary friction.",
    },
    name: { ar: "تجربة نموذجية", en: "Sample experience" },
    role: { ar: "صاحب حساب", en: "Account owner" },
    platform: "instagram",
  },
  {
    quote: {
      ar: "الأسعار مباشرة وسهلة للفهم، والتواصل مع الخدمة بسيط ومباشر.",
      en: "The pricing is direct and easy to understand, and the communication flow feels simple and straightforward.",
    },
    name: { ar: "تجربة نموذجية", en: "Sample experience" },
    role: { ar: "علامة تجارية", en: "Brand" },
    platform: "instagram",
  },
  {
    quote: {
      ar: "التركيز على إنستغرام فقط يجعل القرار أسهل عند مقارنة الباقات.",
      en: "Focusing only on Instagram makes it much easier to compare packages and choose the right one.",
    },
    name: { ar: "تجربة نموذجية", en: "Sample experience" },
    role: { ar: "محتوى رقمي", en: "Digital creator" },
    platform: "instagram",
  },
];
