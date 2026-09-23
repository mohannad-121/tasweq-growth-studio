"use client";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Send } from "lucide-react";
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
export function Marketplace() {
  const { locale } = useLanguage();
  const ar = locale === "ar";
  const services = pricing.instagram;
  const [serviceId, setServiceId] = useState("followers");
  const [selection, setSelection] = useState<Selection | null>(null);
  const service = useMemo(
    () => services.find((s) => s.id === serviceId) ?? services[0],
    [serviceId, services],
  );
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
          {services.map((item, i) => (
            <button
              key={item.id}
              role="tab"
              aria-selected={serviceId === item.id}
              className={serviceId === item.id ? "is-active" : ""}
              onClick={() => setServiceId(item.id)}
            >
              <small>0{i + 1}</small>
              <span>{item.name[locale]}</span>
            </button>
          ))}
        </div>
        <div className="package-header">
          <div>
            <span>{ar ? "باقات متاحة" : "AVAILABLE PACKAGES"}</span>
            <h3>{service.name[locale]}</h3>
          </div>
          <p>{service.description[locale]}</p>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={service.id}
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
                  <strong>{pack.amount.toLocaleString(locale === "ar" ? "ar-JO" : "en-US")}</strong>
                  <span>{service.unit[locale]}</span>
                </div>
                <div className="package-price">
                  <strong>
                    {pack.price.toFixed(0)} <small>{ar ? "د.أ" : "JOD"}</small>
                  </strong>
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
                {selection.pack.amount.toLocaleString()} · {selection.pack.price}{" "}
                {ar ? "د.أ" : "JOD"}
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
