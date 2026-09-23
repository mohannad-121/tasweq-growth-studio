import { company } from "@/data/company";
import { faqs } from "@/data/faq";
import { platforms, type Locale } from "@/data/platforms";
import { pricing } from "@/data/pricing";

const normalize = (text: string) => text.toLowerCase().replace(/[،؟?!,.lv]/g, " ").replace(/أ|إ|آ/g, "ا").trim();
const names: Record<string, string> = { انستقرام: "instagram", انستغرام: "instagram", instagram: "instagram", تيكتوك: "tiktok", "تيك توك": "tiktok", tiktok: "tiktok", يوتيوب: "youtube", youtube: "youtube", فيسبوك: "facebook", facebook: "facebook", تويتر: "x", twitter: "x", telegram: "telegram", تيليغرام: "telegram", سناب: "snapchat", snapchat: "snapchat" };
const serviceWords: Record<string, string> = { متابع: "followers", followers: "followers", follower: "followers", لايك: "likes", اعجاب: "likes", likes: "likes", مشاهد: "views", views: "views", reels: "reels", ريلز: "reels", ستوري: "stories", story: "stories", تعليق: "comments", comments: "comments", مشترك: "subscribers", subscribers: "subscribers", مشارك: "shares", shares: "shares", اعضاء: "members", members: "members" };

export function answerFromKnowledge(input: string, locale: Locale): string {
  const query = normalize(input);
  const platformEntry = Object.entries(names).find(([key]) => query.includes(key));
  const platform = platformEntry ? platforms.find((item) => item.id === platformEntry[1]) : undefined;
  const serviceEntry = Object.entries(serviceWords).find(([key]) => query.includes(key));
  const amountMatch = query.match(/(50|25|10|5|1)\s*(?:k|الف|آلاف)?|\b(1000|5000|10000|25000|50000)\b/);
  const rawAmount = amountMatch?.[0] ?? "";
  const amount = rawAmount.includes("50") ? 50000 : rawAmount.includes("25") ? 25000 : rawAmount.includes("10") ? 10000 : rawAmount.includes("5") ? 5000 : rawAmount ? 1000 : undefined;

  if (platform && (query.includes("خدمات") || query.includes("services"))) {
    const list = pricing[platform.id].map((item) => item.name[locale]).join(locale === "ar" ? "، " : ", ");
    return locale === "ar" ? `خدمات ${platform.name.ar} المتاحة حاليًا: ${list}.` : `Current ${platform.name.en} services: ${list}.`;
  }
  if (platform && serviceEntry && amount) {
    const category = pricing[platform.id].find((item) => item.id === serviceEntry[1] || (serviceEntry[1] === "views" && item.id.includes("views")));
    const pack = category?.packages.find((item) => item.amount === amount);
    if (category && pack) return locale === "ar" ? `باقة ${amount.toLocaleString("ar")} ${category.unit.ar} على ${platform.name.ar} سعرها التجريبي $${pack.price.toFixed(2)}. الطلب الإلكتروني سيتوفر قريبًا.` : `The demo price for ${amount.toLocaleString()} ${category.unit.en} on ${platform.name.en} is $${pack.price.toFixed(2)}. Online ordering is coming soon.`;
  }
  if (query.includes("منص") || query.includes("platform")) {
    return locale === "ar" ? `ندعم ${platforms.map((item) => item.name.ar).join("، ")}.` : `We support ${platforms.map((item) => item.name.en).join(", ")}.`;
  }
  if (query.includes("تواصل") || query.includes("دعم") || query.includes("contact") || query.includes("support")) {
    return locale === "ar" ? `يسعدنا مساعدتك. تواصل عبر إنستغرام أو واتساب، أو راسلنا على ${company.email}.` : `We’re happy to help. Reach us on Instagram or WhatsApp, or email ${company.email}.`;
  }
  const matchingFaq = faqs.find((item) => normalize(item.question.ar).split(" ").some((word) => word.length > 4 && query.includes(word)) || normalize(item.question.en).split(" ").some((word) => word.length > 5 && query.includes(word)));
  if (matchingFaq) return matchingFaq.answer[locale];
  return locale === "ar" ? "أقدر أساعدك بأسعار منصة وخدمة محددة، أو أعرض المنصات والخدمات المتوفرة. جرّب: كم سعر 10 آلاف متابع إنستغرام؟" : "I can help with a specific platform and service price, supported platforms, or available services. Try: What is the price of 10K Instagram followers?";
}
