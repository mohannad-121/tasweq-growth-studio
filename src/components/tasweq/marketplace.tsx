"use client";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Heart, Play, Send, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { pricing, type ServicePackage } from "@/data/pricing";
import { company } from "@/data/company";
import { useLanguage } from "./language-context";
type Selection = { serviceId: string; pack: ServicePackage };
const currencies = [
  { code: "JOD", label: "JOD", rate: 1 },
  { code: "USD", label: "USD $", rate: 1.41 },
  { code: "AED", label: "AED", rate: 5.18 },
  { code: "EUR", label: "EUR €", rate: 1.3 },
  { code: "ILS", label: "Palestine (ILS)", rate: 5.15 },
  { code: "SAR", label: "SAR", rate: 5.29 },
] as const;
const serviceMeta = {
  followers: { Icon: Users, unit: "Followers" },
  views: { Icon: Play, unit: "Views" },
  likes: { Icon: Heart, unit: "Likes" },
};
export function Marketplace() {
  const { locale } = useLanguage();
  const ar = locale === "ar";
  const services = pricing.instagram;
  const [serviceId, setServiceId] = useState("followers");
  const [currency, setCurrency] = useState<(typeof currencies)[number]["code"]>("JOD");
  const [selection, setSelection] = useState<Selection | null>(null);
  const service = useMemo(
    () => services.find((s) => s.id === serviceId) ?? services[0],
    [serviceId, services],
  );
  const currencyInfo = currencies.find((item) => item.code === currency) ?? currencies[0];
  const formatPrice = (jod: number) =>
    new Intl.NumberFormat(locale === "ar" ? "ar" : "en", {
      style: "currency",
      currency: currencyInfo.code,
      maximumFractionDigits: 2,
    }).format(jod * currencyInfo.rate);
  const meta = serviceMeta[service.id as keyof typeof serviceMeta];
  const ServiceIcon = meta.Icon;
  return (
    <section id="services" className="pricing-section">
      <div id="pricing" className="site-container scroll-mt-24">
        <header className="pricing-intro">
          <span className="section-index">01 / {ar ? "الخدمات" : "SERVICES"}</span>
          <h2>{ar ? "اختر حضورك التالي." : "Choose your next presence."}</h2>
          <p>
            {ar
              ? "ثلاث خدمات لإنستغرام، بأسعار واضحة بالدينار الأردني."
              : "Three Instagram services with clear Jordanian pricing."}
          </p>
        </header>
        <div className="service-switcher" role="tablist">
          {services.map((item, i) => {
            const { Icon } = serviceMeta[item.id as keyof typeof serviceMeta];
            return (
              <button
                key={item.id}
                role="tab"
                aria-selected={serviceId === item.id}
                className={serviceId === item.id ? "is-active" : ""}
                onClick={() => setServiceId(item.id)}
              >
                <Icon />
                <small>0{i + 1}</small>
                <span>{item.name[locale]}</span>
              </button>
            );
          })}
        </div>
        <div className="package-header">
          <div>
            <span>{ar ? "باقات متاحة" : "AVAILABLE PACKAGES"}</span>
            <h3>
              <ServiceIcon /> {service.name[locale]}
            </h3>
          </div>
          <p>{service.description[locale]}</p>
        </div>
        <div className="currency-picker">
          <div>
            <span>{ar ? "اعرض السعر بعملتك" : "VIEW PRICES IN YOUR CURRENCY"}</span>
            <small>
              {ar
                ? "تحويل تقديري — السعر الرسمي بالدينار الأردني"
                : "Estimated conversion — official pricing is in JOD"}
            </small>
          </div>
          <div className="currency-options" role="group" aria-label="Currency selector">
            {currencies.map((item) => (
              <button
                key={item.code}
                className={currency === item.code ? "is-active" : ""}
                onClick={() => setCurrency(item.code)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={service.id + currency}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="package-list"
          >
            {service.packages.map((pack, i) => (
              <article
                className={`package-tile ${pack.popular ? "is-featured" : ""}`}
                key={pack.id}
              >
                <span className="package-number">0{i + 1}</span>
                <div className="package-amount">
                  <strong>{pack.amount.toLocaleString("en-US")}</strong>
                  <span>
                    <ServiceIcon /> {meta.unit}
                  </span>
                </div>
                <div className="package-price">
                  <strong>{formatPrice(pack.price)}</strong>
                  <small>
                    {currency === "JOD"
                      ? ar
                        ? "السعر الرسمي"
                        : "Official price"
                      : `${pack.price.toFixed(0)} JOD`}
                  </small>
                </div>
                <Button
                  variant={pack.popular ? "premium" : "outline"}
                  onClick={() => setSelection({ serviceId: service.id, pack })}
                >
                  {ar ? "اختر الباقة" : "Select package"}
                  <ArrowUpRight />
                </Button>
              </article>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
      <Dialog open={Boolean(selection)} onOpenChange={(open) => !open && setSelection(null)}>
        <DialogContent className="order-modal">
          <DialogHeader>
            <span className="section-index">{ar ? "ملخص الطلب" : "ORDER SUMMARY"}</span>
            <DialogTitle>{ar ? "اختيارك جاهز." : "Your selection is ready."}</DialogTitle>
            <DialogDescription>
              {ar
                ? "تواصل معنا عبر إنستغرام لإتمام الطلب."
                : "Contact us on Instagram to complete your request."}
            </DialogDescription>
          </DialogHeader>
          {selection && (
            <div className="order-summary">
              <span>{services.find((s) => s.id === selection.serviceId)?.name[locale]}</span>
              <strong>
                {selection.pack.amount.toLocaleString("en-US")}{" "}
                {serviceMeta[selection.serviceId as keyof typeof serviceMeta].unit} ·{" "}
                {formatPrice(selection.pack.price)}
              </strong>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelection(null)}>
              {ar ? "رجوع" : "Back"}
            </Button>
            <Button asChild variant="premium">
              <a href={company.instagramUrl} target="_blank" rel="noreferrer">
                <Send />
                {ar ? "تواصل معنا" : "Contact us"}
              </a>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
