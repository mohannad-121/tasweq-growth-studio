import type { Localized, PlatformId } from "./platforms";

export const testimonials: { quote: Localized; name: Localized; role: Localized; platform: PlatformId }[] = [
  { quote: { ar: "عرض الخدمات واضح جدًا، ووصلت للباقة المناسبة بدون تعقيد.", en: "The service selection is remarkably clear. I found the right package without any friction." }, name: { ar: "رأي تجريبي 01", en: "Sample feedback 01" }, role: { ar: "صانع محتوى", en: "Content creator" }, platform: "instagram" },
  { quote: { ar: "أعجبني أن الأسعار والمنصات كلها منظمة في مكان واحد.", en: "I like having every platform and price organized in one focused experience." }, name: { ar: "رأي تجريبي 02", en: "Sample feedback 02" }, role: { ar: "متجر إلكتروني", en: "Online retailer" }, platform: "tiktok" },
  { quote: { ar: "التجربة سريعة والدعم سهل الوصول إليه عند الحاجة.", en: "The experience feels fast, and support is easy to reach when needed." }, name: { ar: "رأي تجريبي 03", en: "Sample feedback 03" }, role: { ar: "مدير علامة", en: "Brand manager" }, platform: "youtube" },
];
