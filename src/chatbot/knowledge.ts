import { company } from "@/data/company";
import { faqs } from "@/data/faq";
import { type Locale } from "@/data/platforms";
import { pricing } from "@/data/pricing";

const normalize = (text: string) =>
  text
    .toLowerCase()
    .replace(/[أإآ]/g, "ا")
    .replace(/[?!,.]/g, " ")
    .replace(/[\s\-_]+/g, " ")
    .trim();

const normalizeArabicDigits = (text: string) =>
  text.replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit))).replace(/[kK]/g, "000");

const parseAmount = (input: string): number | undefined => {
  const text = normalizeArabicDigits(normalize(input));
  const match = text.match(/(\d{1,3}(?:,\d{3})+|\d+)(?:\s*(?:k|الف|آلاف|alaf|thousand))?/i);
  if (!match) return undefined;

  const base = Number(match[1].replace(/,/g, ""));
  if (!Number.isFinite(base)) return undefined;
  if ([10000, 30000, 50000, 100000].includes(base)) return base;

  const amount = base * 1000;
  return [10000, 30000, 50000, 100000].includes(amount) ? amount : undefined;
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

const instagramLink = company.instagramUrl;

const nextStep = (locale: Locale) =>
  locale === "ar"
    ? `\n\nجاهز تبدأ؟ راسلنا على إنستغرام 📩 ${instagramLink}`
    : `\n\nReady to get started? Message us on Instagram 📩 ${instagramLink}`;

const packageList = (locale: Locale) =>
  pricing.instagram
    .map((category) => {
      const items = category.packages
        .map((pack) => `${pack.amount.toLocaleString()} = ${pack.price} JOD`)
        .join(" • ");
      return `${category.name[locale]}: ${items}`;
    })
    .join("\n");

export function answerFromKnowledge(input: string, locale: Locale): string {
  const query = normalizeArabicDigits(normalize(input));
  const isArabic = locale === "ar";
  const isGreeting = /^(hi|hello|hey|مرحبا|اهلا|السلام عليكم|هلا)/.test(query);

  if (isGreeting) {
    return isArabic
      ? `يا أهلًا وسهلًا! 👋🌟 سعيدين بوجودك في تسويق.\n\nاسألني عن الأسعار أو اكتب متابعين، مشاهدات، أو لايكات، وسأرشدك بسرعة ✨\n\nمثال: كم سعر 10K متابع؟ أو كيف أطلب الخدمة؟ 💬${nextStep(locale)}`
      : `Hello and welcome! 👋🌟 We’re happy you’re here.\n\nAsk about pricing, followers, views, or likes and I’ll guide you quickly ✨\n\nTry: “What is the price of 10K followers?” or “How do I request a service?” 💬${nextStep(locale)}`;
  }

  if (query.includes("thank") || query.includes("شكرا") || query.includes("مشكور")) {
    return isArabic
      ? `العفو! 😊✨ أنا موجود في أي وقت لمساعدتك. إذا أردت السعر أو الخطوة التالية، فقط اكتب لي ما تحتاجه 💬${nextStep(locale)}`
      : `You’re very welcome! 😊✨ I’m here whenever you need help. Tell me what you need and I’ll point you to the right next step 💬${nextStep(locale)}`;
  }

  if (query.includes("خدمات") || query.includes("services") || query.includes("offer")) {
    return isArabic
      ? `خدماتنا الحالية مخصصة لإنستغرام 📱✨\n\n👥 متابعين\n▶️ مشاهدات\n❤️ لايكات\n\nاكتب اسم الخدمة والكمية التي تريدها، مثل: 30K مشاهدات. وسأظهر لك السعر مباشرة 💡${nextStep(locale)}`
      : `Our current services are for Instagram 📱✨\n\n👥 Followers\n▶️ Views\n❤️ Likes\n\nType the service and quantity you want—for example, “30K views”—and I’ll show the price right away 💡${nextStep(locale)}`;
  }

  const amount = parseAmount(query);
  const foundService = Object.entries(serviceMap).find(([key]) => query.includes(key));
  const serviceId = foundService ? serviceMap[foundService[0]] : undefined;

  if (amount && serviceId) {
    const category = pricing.instagram.find((item) => item.id === serviceId);
    const pack = category?.packages.find((item) => item.amount === amount);
    if (category && pack) {
      const amountText = amount.toLocaleString();
      return isArabic
        ? `سعر ${amountText} ${category.unit.ar} هو ${pack.price} دينار أردني 💰✨\n\nهذا السعر ظاهر في قائمة الباقات، ويمكنك استخدام مُحوّل العملة في الموقع لرؤية قيمة تقريبية بعملتك 💱\n\nإذا أردت الطلب أو لديك سؤال قبل البدء، نحن قريبون منك 🤝${nextStep(locale)}`
        : `The price for ${amountText} ${category.unit.en} is ${pack.price} JOD 💰✨\n\nThis is the price shown in the packages. You can use the currency switcher on the site to see an approximate amount in your currency 💱\n\nIf you’d like to order or have a question first, we’re here for you 🤝${nextStep(locale)}`;
    }
  }

  if (
    query.includes("سعر") ||
    query.includes("اسعار") ||
    query.includes("price") ||
    query.includes("pricing") ||
    query.includes("cost")
  ) {
    return isArabic
      ? `أكيد! هذه نظرة سريعة على أسعار إنستغرام 💰\n\n${packageList(locale)}\n\nللسعر الدقيق، اكتب لي الخدمة والكمية—مثل: 50K لايكات ✨\nيمكنك أيضًا فتح قسم الأسعار في الموقع واستخدام مُحوّل العملة 💱${nextStep(locale)}`
      : `Of course! Here is a quick look at Instagram pricing 💰\n\n${packageList(locale)}\n\nFor an exact answer, tell me the service and amount—such as: 50K likes ✨\nYou can also open the pricing section and use the currency switcher 💱${nextStep(locale)}`;
  }

  if (
    query.includes("تواصل") ||
    query.includes("انستغرام") ||
    query.includes("instagram") ||
    query.includes("contact") ||
    query.includes("support") ||
    query.includes("دعم") ||
    query.includes("رابط") ||
    query.includes("link")
  ) {
    return isArabic
      ? `يسعدنا تواصلك معنا! 💛📩\n\nحساب تسويق الرسمي على إنستغرام هو ${company.instagramHandle}\n${instagramLink}\n\nافتح الرابط، أرسل لنا رسالة، واذكر الخدمة أو الكمية التي ترغب بها. فريقنا سيساعدك بكل سرور ✨`
      : `We’d love to hear from you! 💛📩\n\nTasweq’s official Instagram account is ${company.instagramHandle}\n${instagramLink}\n\nOpen the link, send us a message, and mention the service or quantity you want. Our team will be happy to help ✨`;
  }

  if (
    query.includes("اطلب") ||
    query.includes("طلب") ||
    query.includes("كيف ابدا") ||
    query.includes("how do i") ||
    query.includes("order") ||
    query.includes("start")
  ) {
    return isArabic
      ? `بدء طلبك سهل جدًا 🌟\n\n1. اختر الخدمة التي تناسبك: متابعين 👥 أو مشاهدات ▶️ أو لايكات ❤️\n2. حدّد الكمية وشاهد السعر في قسم الأسعار 💱\n3. أرسل لنا رسالة على إنستغرام مع طلبك 📩\n\nمثال للرسالة: “أريد 10K مشاهدات”. سنكمل معك الخطوات بوضوح 🤝${nextStep(locale)}`
      : `Getting started is easy 🌟\n\n1. Choose your service: followers 👥, views ▶️, or likes ❤️\n2. Pick an amount and check the price in the pricing section 💱\n3. Send us a message on Instagram with your request 📩\n\nExample: “I want 10K views.” We’ll guide you through the next steps clearly 🤝${nextStep(locale)}`;
  }

  if (query.includes("منصة") || query.includes("platform") || query.includes("supported")) {
    return isArabic
      ? `حاليًا خدمات تسويق مخصصة لإنستغرام فقط 📱✨\n\nيمكنني مساعدتك في متابعين، مشاهدات، ولايكات إنستغرام. اكتب ما تحتاجه وسأعرض لك الخيار المناسب 💛${nextStep(locale)}`
      : `Tasweq currently focuses on Instagram only 📱✨\n\nI can help with Instagram followers, views, and likes. Tell me what you need and I’ll point you to the right option 💛${nextStep(locale)}`;
  }

  const matchingFaq = faqs.find((item) => {
    const questionWords = normalize(`${item.question.ar} ${item.question.en}`)
      .split(" ")
      .filter((word) => word.length > 2);
    return questionWords.some((word) => query.includes(word));
  });

  if (matchingFaq) return `${matchingFaq.answer[locale]}${nextStep(locale)}`;

  return isArabic
    ? `أهلًا! 😊 أقدر أساعدك بكل ما يخص خدمات إنستغرام في تسويق.\n\nجرّب أن تكتب: “أسعار المتابعين” 👥، “10K مشاهدات” ▶️، “50K لايكات” ❤️، أو “كيف أتواصل معكم؟” 📩\n\nكل الردود هنا سريعة ومحلية ولا تحتاج أي API ✨${nextStep(locale)}`
    : `Hi! 😊 I can help with anything about Tasweq’s Instagram services.\n\nTry: “followers prices” 👥, “10K views” ▶️, “50K likes” ❤️, or “How can I contact you?” 📩\n\nEvery reply here is quick, built in locally, and needs no API ✨${nextStep(locale)}`;
}
