import type { Localized, PlatformId } from "./platforms";

export type ServicePackage = {
  id: string;
  amount: number;
  price: number;
  delivery: Localized;
  popular?: boolean;
};

export type ServiceCategory = {
  id: string;
  name: Localized;
  unit: Localized;
  description: Localized;
  packages: ServicePackage[];
};

const packageSet = (prefix: string, prices: number[]): ServicePackage[] =>
  [1000, 5000, 10000, 25000, 50000].map((amount, index) => ({
    id: `${prefix}-${amount}`,
    amount,
    price: prices[index],
    popular: index === 2,
    delivery: index < 2 ? { ar: "بدء سريع", en: "Fast start" } : { ar: "تسليم تدريجي", en: "Gradual delivery" },
  }));

export const pricing: Record<PlatformId, ServiceCategory[]> = {
  instagram: [
    { id: "followers", name: { ar: "متابعون", en: "Followers" }, unit: { ar: "متابع", en: "Followers" }, description: { ar: "باقات مرنة لتوسيع حضور حسابك.", en: "Flexible packages to expand your account presence." }, packages: packageSet("ig-f", [4.99, 14.99, 24.99, 49.99, 79.99]) },
    { id: "likes", name: { ar: "إعجابات", en: "Likes" }, unit: { ar: "إعجاب", en: "Likes" }, description: { ar: "دعم تفاعل منشوراتك بأحجام مختلفة.", en: "Support post engagement at different scales." }, packages: packageSet("ig-l", [2.99, 8.99, 14.99, 29.99, 49.99]) },
    { id: "views", name: { ar: "مشاهدات", en: "Views" }, unit: { ar: "مشاهدة", en: "Views" }, description: { ar: "مشاهدات للمحتوى والفيديو.", en: "Views for content and video." }, packages: packageSet("ig-v", [1.99, 5.99, 9.99, 19.99, 34.99]) },
    { id: "reels", name: { ar: "مشاهدات ريلز", en: "Reels Views" }, unit: { ar: "مشاهدة", en: "Views" }, description: { ar: "باقات مخصصة لمقاطع ريلز.", en: "Packages made for Reels." }, packages: packageSet("ig-r", [2.49, 7.99, 12.99, 24.99, 42.99]) },
    { id: "stories", name: { ar: "مشاهدات ستوري", en: "Story Views" }, unit: { ar: "مشاهدة", en: "Views" }, description: { ar: "تعزيز وصول القصص.", en: "Extend story reach." }, packages: packageSet("ig-s", [3.49, 10.99, 18.99, 37.99, 62.99]) },
    { id: "comments", name: { ar: "تعليقات", en: "Comments" }, unit: { ar: "تعليق", en: "Comments" }, description: { ar: "خيارات تفاعل للمحتوى.", en: "Engagement options for content." }, packages: packageSet("ig-c", [8.99, 34.99, 59.99, 119.99, 199.99]) },
  ],
  tiktok: [
    { id: "followers", name: { ar: "متابعون", en: "Followers" }, unit: { ar: "متابع", en: "Followers" }, description: { ar: "باقات نمو لحساب تيك توك.", en: "Growth packages for TikTok accounts." }, packages: packageSet("tt-f", [5.99, 18.99, 29.99, 59.99, 94.99]) },
    { id: "likes", name: { ar: "إعجابات", en: "Likes" }, unit: { ar: "إعجاب", en: "Likes" }, description: { ar: "تعزيز تفاعل الفيديو.", en: "Boost video engagement." }, packages: packageSet("tt-l", [2.49, 7.49, 11.99, 22.99, 39.99]) },
    { id: "views", name: { ar: "مشاهدات فيديو", en: "Video Views" }, unit: { ar: "مشاهدة", en: "Views" }, description: { ar: "حزم مشاهدة مرنة.", en: "Flexible video view bundles." }, packages: packageSet("tt-v", [1.49, 4.49, 7.99, 14.99, 24.99]) },
    { id: "shares", name: { ar: "مشاركات", en: "Shares" }, unit: { ar: "مشاركة", en: "Shares" }, description: { ar: "توسيع انتشار الفيديو.", en: "Extend video distribution." }, packages: packageSet("tt-s", [4.99, 15.99, 27.99, 54.99, 89.99]) },
  ],
  youtube: [
    { id: "subscribers", name: { ar: "مشتركون", en: "Subscribers" }, unit: { ar: "مشترك", en: "Subscribers" }, description: { ar: "باقات لقنوات يوتيوب.", en: "Packages for YouTube channels." }, packages: packageSet("yt-s", [9.99, 34.99, 59.99, 119.99, 199.99]) },
    { id: "views", name: { ar: "مشاهدات", en: "Views" }, unit: { ar: "مشاهدة", en: "Views" }, description: { ar: "دعم وصول الفيديو.", en: "Support video reach." }, packages: packageSet("yt-v", [4.99, 14.99, 24.99, 49.99, 79.99]) },
    { id: "likes", name: { ar: "إعجابات", en: "Likes" }, unit: { ar: "إعجاب", en: "Likes" }, description: { ar: "باقات تفاعل للفيديو.", en: "Video engagement packages." }, packages: packageSet("yt-l", [5.99, 19.99, 34.99, 69.99, 109.99]) },
  ],
  facebook: [
    { id: "followers", name: { ar: "متابعون", en: "Followers" }, unit: { ar: "متابع", en: "Followers" }, description: { ar: "نمو الصفحات والحسابات.", en: "Growth for pages and profiles." }, packages: packageSet("fb-f", [6.99, 22.99, 39.99, 79.99, 129.99]) },
    { id: "likes", name: { ar: "إعجابات", en: "Likes" }, unit: { ar: "إعجاب", en: "Likes" }, description: { ar: "دعم التفاعل على المحتوى.", en: "Support content engagement." }, packages: packageSet("fb-l", [3.99, 11.99, 19.99, 39.99, 64.99]) },
    { id: "views", name: { ar: "مشاهدات فيديو", en: "Video Views" }, unit: { ar: "مشاهدة", en: "Views" }, description: { ar: "حزم مشاهدة للفيديو.", en: "Video view bundles." }, packages: packageSet("fb-v", [2.99, 8.99, 14.99, 29.99, 49.99]) },
  ],
  x: [
    { id: "followers", name: { ar: "متابعون", en: "Followers" }, unit: { ar: "متابع", en: "Followers" }, description: { ar: "توسيع حضور حسابك على إكس.", en: "Expand your presence on X." }, packages: packageSet("x-f", [8.99, 29.99, 49.99, 99.99, 164.99]) },
    { id: "likes", name: { ar: "إعجابات", en: "Likes" }, unit: { ar: "إعجاب", en: "Likes" }, description: { ar: "دعم تفاعل المنشورات.", en: "Support post engagement." }, packages: packageSet("x-l", [3.99, 12.99, 21.99, 44.99, 74.99]) },
    { id: "views", name: { ar: "مشاهدات", en: "Views" }, unit: { ar: "مشاهدة", en: "Views" }, description: { ar: "رفع وصول المحتوى.", en: "Increase content reach." }, packages: packageSet("x-v", [1.99, 5.99, 9.99, 19.99, 32.99]) },
  ],
  telegram: [
    { id: "members", name: { ar: "أعضاء", en: "Members" }, unit: { ar: "عضو", en: "Members" }, description: { ar: "باقات للقنوات والمجموعات.", en: "Packages for channels and groups." }, packages: packageSet("tg-m", [5.99, 19.99, 34.99, 69.99, 114.99]) },
    { id: "views", name: { ar: "مشاهدات", en: "Views" }, unit: { ar: "مشاهدة", en: "Views" }, description: { ar: "دعم وصول منشورات القناة.", en: "Support channel post reach." }, packages: packageSet("tg-v", [1.99, 5.99, 9.99, 19.99, 34.99]) },
  ],
  snapchat: [
    { id: "followers", name: { ar: "متابعون", en: "Followers" }, unit: { ar: "متابع", en: "Followers" }, description: { ar: "خيارات نمو لسناب شات.", en: "Growth options for Snapchat." }, packages: packageSet("sc-f", [7.99, 27.99, 47.99, 94.99, 154.99]) },
    { id: "views", name: { ar: "مشاهدات", en: "Views" }, unit: { ar: "مشاهدة", en: "Views" }, description: { ar: "دعم مشاهدات القصص.", en: "Support story views." }, packages: packageSet("sc-v", [3.99, 12.99, 21.99, 44.99, 74.99]) },
  ],
};
