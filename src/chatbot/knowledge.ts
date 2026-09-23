import { company } from "@/data/company";
import { faqs } from "@/data/faq";
import { platforms, type Locale } from "@/data/platforms";
import { pricing } from "@/data/pricing";

const normalize = (text: string) =>
  text
    .toLowerCase()
    .replace(/[،؟?!,.]/g, " ")
    .replace(/[\s\-_]+/g, " ")
    .replace(/أ|إ|آ/g, "ا")
    .trim();

const normalizeArabicDigits = (text: string) =>
  text.replace(/[٠-٩]/g, (ch) => String("٠١٢٣٤٥٦٧٨٩".indexOf(ch))).replace(/[kK]/g, "000");

const parseAmount = (input: string): number | undefined => {
  const text = normalizeArabicDigits(normalize(input));
  const match =
    text.match(/(\d{1,3}(?:,\d{3})+|\d+)(?:\s*(?:k|الف|آلاف|alaf|thousand))?/i) ??
    text.match(/\b(10000|30000|50000|100000)\b/);

  if (!match) return undefined;

  const raw = match[1].replace(/,/g, "");
  const base = Number(raw || match[0].replace(/\D/g, ""));
  if (!Number.isFinite(base)) return undefined;

  if ([10000, 30000, 50000, 100000].includes(base)) return base;

  const num = base * 1000;
  return [10000, 30000, 50000, 100000].includes(num) ? num : undefined;
};

const serviceMap: Record<string, string> = {
  followers: "followers",
  follower: "followers",
  متابع: "followers",
  متابعين: "followers",
  likes: "likes",
  like: "likes",
  لايك: "likes",
  لايكات: "likes",
  views: "views",
  view: "views",
  مشاهد: "views",
  مشاهدة: "views",
  مشاهدات: "views",
};

export function answerFromKnowledge(input: string, locale: Locale): string {
  const query = normalizeArabicDigits(normalize(input));

  if (
    query.includes("خدمات") ||
    query.includes("services") ||
    query.includes("offer") ||
    query.includes("what do you offer")
  ) {
    const names = pricing.instagram
      .map((item) => item.name[locale])
      .join(locale === "ar" ? "، " : ", ");
    return locale === "ar"
      ? `خدمات إنستغرام المتاحة حاليًا: ${names}.`
      : `Current Instagram services: ${names}.`;
  }

  const amount = parseAmount(query);
  const serviceKey = Object.entries(serviceMap).find(([key]) => query.includes(key));
  const serviceId = serviceKey ? serviceMap[serviceKey[0]] : undefined;

  if (amount && serviceId) {
    const category = pricing.instagram.find((item) => item.id === serviceId);
    const pack = category?.packages.find((item) => item.amount === amount);

    if (category && pack) {
      const priceText = `${pack.price} ${locale === "ar" ? "د.أ" : "JOD"}`;
      return locale === "ar"
        ? `سعر ${amount.toLocaleString("ar-EG")} ${category.unit.ar} على إنستغرام هو ${priceText}.`
        : `The price for ${amount.toLocaleString()} ${category.unit.en} on Instagram is ${priceText}.`;
    }
  }

  if (
    query.includes("تواصل") ||
    query.includes("contact") ||
    query.includes("support") ||
    query.includes("دعم")
  ) {
    return locale === "ar"
      ? `تواصل مع تسويق عبر إنستغرام: ${company.instagramHandle} أو ${company.instagramUrl}.`
      : `Contact Tasweq on Instagram: ${company.instagramHandle} or ${company.instagramUrl}.`;
  }

  if (query.includes("منصة") || query.includes("platform") || query.includes("supported")) {
    return locale === "ar" ? "ندعم حاليًا إنستغرام فقط." : "We currently support Instagram only.";
  }

  const matchingFaq = faqs.find((item) => {
    const questionWords = normalize(item.question.ar + " " + item.question.en)
      .split(" ")
      .filter((word) => word.length > 2);
    return questionWords.some((word) => query.includes(word));
  });

  if (matchingFaq) return matchingFaq.answer[locale];

  return locale === "ar"
    ? "أستطيع مساعدتك بأسعار متابعين، مشاهدات أو لايكات إنستغرام. جرّب: كم سعر 10 آلاف متابع؟"
    : "I can help with Instagram followers, views, or likes pricing. Try: What is the price of 10K Instagram followers?";
}
