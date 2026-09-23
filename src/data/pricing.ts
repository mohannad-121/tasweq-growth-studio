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

export const pricing: Record<PlatformId, ServiceCategory[]> = {
  instagram: [
    {
      id: "followers",
      name: { ar: "متابعين", en: "Followers" },
      unit: { ar: "متابع", en: "Followers" },
      description: {
        ar: "باقات واضحة للمتابعين على إنستغرام.",
        en: "Clear Instagram follower package options.",
      },
      packages: [
        {
          id: "followers-10000",
          amount: 10000,
          price: 24,
          delivery: { ar: "يتم تحديدها حسب الطلب", en: "To be confirmed" },
          popular: true,
        },
        {
          id: "followers-30000",
          amount: 30000,
          price: 65,
          delivery: { ar: "يتم تحديدها حسب الطلب", en: "To be confirmed" },
        },
        {
          id: "followers-50000",
          amount: 50000,
          price: 110,
          delivery: { ar: "يتم تحديدها حسب الطلب", en: "To be confirmed" },
        },
        {
          id: "followers-100000",
          amount: 100000,
          price: 200,
          delivery: { ar: "يتم تحديدها حسب الطلب", en: "To be confirmed" },
        },
      ],
    },
    {
      id: "views",
      name: { ar: "مشاهدات", en: "Views" },
      unit: { ar: "مشاهدة", en: "Views" },
      description: {
        ar: "باقات واضحة لمشاهدات إنستغرام.",
        en: "Clear Instagram view package options.",
      },
      packages: [
        {
          id: "views-10000",
          amount: 10000,
          price: 5,
          delivery: { ar: "يتم تحديدها حسب الطلب", en: "To be confirmed" },
          popular: true,
        },
        {
          id: "views-50000",
          amount: 50000,
          price: 20,
          delivery: { ar: "يتم تحديدها حسب الطلب", en: "To be confirmed" },
        },
        {
          id: "views-100000",
          amount: 100000,
          price: 35,
          delivery: { ar: "يتم تحديدها حسب الطلب", en: "To be confirmed" },
        },
      ],
    },
    {
      id: "likes",
      name: { ar: "لايكات", en: "Likes" },
      unit: { ar: "لايك", en: "Likes" },
      description: {
        ar: "باقات واضحة للاعجابات على إنستغرام.",
        en: "Clear Instagram like package options.",
      },
      packages: [
        {
          id: "likes-10000",
          amount: 10000,
          price: 15,
          delivery: { ar: "يتم تحديدها حسب الطلب", en: "To be confirmed" },
          popular: true,
        },
        {
          id: "likes-50000",
          amount: 50000,
          price: 65,
          delivery: { ar: "يتم تحديدها حسب الطلب", en: "To be confirmed" },
        },
        {
          id: "likes-100000",
          amount: 100000,
          price: 100,
          delivery: { ar: "يتم تحديدها حسب الطلب", en: "To be confirmed" },
        },
      ],
    },
  ],
};
