"use client";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Check, Clock3, Send, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { platforms, type PlatformId } from "@/data/platforms";
import { pricing, type ServicePackage } from "@/data/pricing";
import { company } from "@/data/company";
import { useLanguage } from "./language-context";
import { PlatformMark } from "./platform-mark";

type Selection = { platform: PlatformId; serviceId: string; pack: ServicePackage };

export function Marketplace() {
  const { locale } = useLanguage();
  const [platformId, setPlatformId] = useState<PlatformId>("instagram");
  const [serviceId, setServiceId] = useState("followers");
  const [selection, setSelection] = useState<Selection | null>(null);
  const services = pricing[platformId];
  useEffect(() => { if (!services.some((item) => item.id === serviceId)) setServiceId(services[0].id); }, [platformId, serviceId, services]);
  const service = useMemo(() => services.find((item) => item.id === serviceId) ?? services[0], [services, serviceId]);
  const platform = platforms.find((item) => item.id === platformId) ?? platforms[0];
  const ar = locale === "ar";
  return <>
    <section id="platforms" className="platform-strip border-y border-border/60 bg-surface/45 py-5">
      <div className="site-container flex items-center gap-3 overflow-x-auto scroll-smooth pb-1 scrollbar-none" role="tablist" aria-label={ar ? "اختر المنصة" : "Choose a platform"}>
        <span className="shrink-0 pe-4 text-xs font-semibold uppercase text-muted-foreground">{ar ? "اختر منصتك" : "Select platform"}</span>
        {platforms.map((item)=><button role="tab" aria-selected={platformId===item.id} key={item.id} className={`platform-tab ${platformId===item.id?"is-active":""}`} onClick={()=>{setPlatformId(item.id); document.getElementById("pricing")?.scrollIntoView({behavior:"smooth"});}}><PlatformMark platform={item} size="sm" /><span>{item.name[locale]}</span></button>)}
      </div>
    </section>
    <section id="services" className="section-shell overflow-hidden"><div id="pricing" className="site-container scroll-mt-24">
      <header className="section-heading grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end"><div><span className="eyebrow">02 — {ar?"سوق الخدمات":"SERVICE MARKETPLACE"}</span><h2>{ar?"اختر. قارن. ابدأ.":"Choose. Compare. Grow."}</h2></div><p>{ar?"تصفح باقات واضحة لكل منصة وخدمة. الأسعار المعروضة تجريبية ويمكن تعديلها من مصدر واحد.":"Explore clear packages for every platform and service. Displayed prices are demo values managed from one source."}</p></header>
      <div className="mt-12 grid gap-8 xl:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="service-sidebar">
          <div className="flex items-center gap-3 border-b border-border p-5"><PlatformMark platform={platform}/><div><span className="data-label">{ar?"الخدمات المتاحة":"Available services"}</span><strong className="block">{platform.name[locale]}</strong></div></div>
          <div className="flex gap-2 overflow-x-auto p-3 xl:grid">{services.map((item,index)=><button key={item.id} onClick={()=>setServiceId(item.id)} className={`service-tab ${service.id===item.id?"is-active":""}`}><span>0{index+1}</span><strong>{item.name[locale]}</strong></button>)}</div>
          <div className="hidden border-t border-border p-5 text-sm leading-6 text-muted-foreground xl:block"><ShieldCheck className="mb-3 size-5 text-primary" />{ar?"تفاصيل واضحة قبل إرسال أي طلب. لا يوجد دفع إلكتروني في هذه المرحلة.":"Clear details before any request. No online payment is available in this phase."}</div>
        </aside>
        <div className="min-w-0"><div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 border-b border-border pb-6"><div className="min-w-0"><span className="data-label">{platform.name[locale]}</span><h3 className="mt-1 truncate font-display text-3xl font-semibold sm:text-4xl">{service.name[locale]}</h3></div><span className="hidden text-sm text-muted-foreground sm:block">{service.description[locale]}</span></div>
          <AnimatePresence mode="wait"><motion.div key={`${platformId}-${service.id}`} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} className="pricing-grid mt-6">
            {service.packages.map((pack,index)=><article key={pack.id} className={`price-card ${pack.popular?"price-card-popular":""}`}>
              {pack.popular&&<span className="popular-label">{ar?"الأكثر اختيارًا":"Most selected"}</span>}
              <div className="flex items-center justify-between"><span className="package-index">0{index+1}</span><Clock3 className="size-4 text-muted-foreground" /></div>
              <div className="mt-9"><strong className="font-display text-4xl font-semibold sm:text-5xl">{pack.amount.toLocaleString(locale==="ar"?"ar-JO":"en-US")}</strong><span className="mt-2 block text-sm text-muted-foreground">{service.unit[locale]}</span></div>
              <div className="my-7 h-px bg-border" />
              <div className="flex items-end justify-between"><span className="text-sm text-muted-foreground">{pack.delivery[locale]}</span><div className="text-end"><sup className="text-muted-foreground">$</sup><strong className="font-display text-3xl">{pack.price.toFixed(2)}</strong></div></div>
              <Button variant={pack.popular?"premium":"glass"} className="mt-6 h-11 w-full rounded-md" onClick={()=>setSelection({platform:platformId,serviceId:service.id,pack})}>{ar?"اطلب الآن":"Order now"}<ArrowUpRight className="rtl:-rotate-90" /></Button>
            </article>)}
          </motion.div></AnimatePresence>
        </div>
      </div>
    </div></section>
    <Dialog open={Boolean(selection)} onOpenChange={(open)=>!open&&setSelection(null)}><DialogContent className="order-modal max-w-xl overflow-hidden border-border bg-surface-raised p-0"><div className="modal-accent"/><div className="p-6 sm:p-8"><DialogHeader className="text-start"><span className="eyebrow w-fit">{ar?"معاينة الطلب":"ORDER PREVIEW"}</span><DialogTitle className="mt-4 font-display text-3xl">{ar?"اختيار ممتاز.":"A strong choice."}</DialogTitle><DialogDescription className="pt-2 text-base leading-7">{ar?"الطلب الإلكتروني سيتوفر قريبًا. يمكنك مراجعة اختيارك والتواصل معنا الآن.":"Online ordering will be available soon. Review your selection and contact us in the meantime."}</DialogDescription></DialogHeader>{selection&&<div className="my-7 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-border bg-border"><div className="bg-surface p-4"><span>{ar?"المنصة":"Platform"}</span><strong>{platforms.find(p=>p.id===selection.platform)?.name[locale]}</strong></div><div className="bg-surface p-4"><span>{ar?"الخدمة":"Service"}</span><strong>{pricing[selection.platform].find(s=>s.id===selection.serviceId)?.name[locale]}</strong></div><div className="bg-surface p-4"><span>{ar?"الكمية":"Amount"}</span><strong>{selection.pack.amount.toLocaleString()}</strong></div><div className="bg-surface p-4"><span>{ar?"السعر التجريبي":"Demo price"}</span><strong>${selection.pack.price.toFixed(2)}</strong></div></div>}<DialogFooter className="gap-2 sm:space-x-0"><Button variant="glass" className="h-11 flex-1" onClick={()=>setSelection(null)}>{ar?"استمر بالتصفح":"Keep browsing"}</Button><Button asChild variant="premium" className="h-11 flex-1"><a href={company.whatsapp} target="_blank" rel="noreferrer"><Send />{ar?"تواصل معنا":"Contact us"}</a></Button></DialogFooter></div></DialogContent></Dialog>
  </>;
}
