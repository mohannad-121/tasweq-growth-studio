import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Check, Instagram } from "lucide-react";
import { Navbar } from "@/components/tasweq/navbar";
import { Hero } from "@/components/tasweq/hero";
import { Marketplace } from "@/components/tasweq/marketplace";
import { Chatbot } from "@/components/tasweq/chatbot";
import { BrandMark } from "@/components/tasweq/brand-mark";
import { LanguageProvider, useLanguage } from "@/components/tasweq/language-context";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { company } from "@/data/company";
import { faqs } from "@/data/faq";
export const Route = createFileRoute("/")({ component: Index });
function Index() {
  return (
    <LanguageProvider>
      <PageContent />
    </LanguageProvider>
  );
}
function PageContent() {
  const { locale, setLocale } = useLanguage();
  const ar = locale === "ar";
  const why = [
    {
      ar: "أسعار واضحة",
      en: "Clear pricing",
      textAr: "خيارات واضحة بلا تعقيد.",
      textEn: "Straightforward options, without a maze.",
    },
    {
      ar: "إنستغرام فقط",
      en: "Instagram only",
      textAr: "ثلاث خدمات، بتركيز كامل.",
      textEn: "Three focused services, nothing extra.",
    },
    {
      ar: "تواصل مباشر",
      en: "Direct contact",
      textAr: "نبدأ المحادثة من المكان الذي يهمك.",
      textEn: "Start the conversation where it matters.",
    },
  ];
  const steps = [
    { ar: "اختر الخدمة", en: "Choose the service" },
    { ar: "حدد الباقة", en: "Pick a package" },
    { ar: "تواصل معنا", en: "Contact Tasweq" },
  ];
  return (
    <div className="app-shell" dir={ar ? "rtl" : "ltr"}>
      <Navbar />
      <main>
        <Hero />
        <Marketplace />
        <section className="editorial-section">
          <div className="site-container why-layout">
            <div className="why-statement">
              <span className="section-index">02 / {ar ? "لماذا تسويق" : "WHY TASWEQ"}</span>
              <h2>
                {ar
                  ? "الحضور ليس رقماً. إنه الانطباع الذي تتركه."
                  : "Presence is not a number. It’s the impression you leave."}
              </h2>
            </div>
            <div className="why-notes">
              {why.map((item, i) => (
                <article key={item.en}>
                  <span>0{i + 1}</span>
                  <h3>{item[locale]}</h3>
                  <p>{ar ? item.textAr : item.textEn}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="yellow-moment">
          <div className="site-container yellow-inner">
            <span className="yellow-stamp">TASWEQ / EST. SOCIAL</span>
            <h2>{ar ? "كل شيء يبدأ بحضور أقوى." : "Everything starts with a bigger presence."}</h2>
            <p>{ar ? "من إنستغرام، وإليه." : "Built around Instagram, and nothing else."}</p>
            <Button
              className="yellow-button"
              onClick={() =>
                document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              {ar ? "شاهد الباقات" : "Explore packages"}
              <ArrowUpRight />
            </Button>
            <BrandMark className="yellow-watermark" />
          </div>
        </section>
        <section id="process" className="process-section">
          <div className="site-container">
            <header className="split-heading">
              <span className="section-index">03 / {ar ? "كيف تعمل" : "HOW IT WORKS"}</span>
              <h2>
                {ar
                  ? "خطوات واضحة، من الاختيار إلى التواصل."
                  : "A clear route from choosing to connecting."}
              </h2>
            </header>
            <div className="process-line">
              {steps.map((step, i) => (
                <article key={step.en}>
                  <span>0{i + 1}</span>
                  <h3>{step[locale]}</h3>
                  <p>
                    {ar
                      ? [
                          "اختر متابعين أو مشاهدات أو لايكات.",
                          "راجع الكمية والسعر بالدينار الأردني.",
                          "أكمل طلبك عبر إنستغرام.",
                        ][i]
                      : [
                          "Select followers, views, or likes.",
                          "Review your quantity and JOD price.",
                          "Complete your request on Instagram.",
                        ][i]}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="showcase-section">
          <div className="site-container showcase-layout">
            <div className="showcase-copy">
              <span className="section-index">04 / INSTAGRAM</span>
              <h2>{ar ? "مظهرٌ أصلي، مصمم لتسويق." : "A visual language made for Tasweq."}</h2>
              <p>
                {ar
                  ? "تصوّر خدمات المتابعين والمشاهدات واللايكات بلغة بصرية واضحة، لا بنسخة من واجهة إنستغرام."
                  : "An original, Tasweq-led visual language for followers, views, and likes—not a copy of Instagram’s interface."}
              </p>
            </div>
            <div className="showcase-art">
              <video
                className="showcase-video showcase-video-main"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              >
                <source src="/gemini_generated_video_b84a3ec9.mp4" type="video/mp4" />
              </video>
              <video
                className="showcase-video showcase-video-float"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              >
                <source src="/gemini_generated_video_d5b234bb.mp4" type="video/mp4" />
              </video>
              <div className="reel-card">
                <span>01 / REEL</span>
                <div className="reel-play">▶</div>
                <b>{ar ? "مشاهدات بحجم أكبر" : "Views at a larger scale"}</b>
              </div>
              <div className="post-stack">
                <div>
                  <Check /> <b>10K</b>
                  <small>{ar ? "متابعين" : "Followers"}</small>
                </div>
                <div>
                  <Instagram /> <b>50K</b>
                  <small>{ar ? "مشاهدات" : "Views"}</small>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="faq" className="faq-section">
          <div className="site-container faq-layout">
            <header>
              <span className="section-index">05 / FAQ</span>
              <h2>{ar ? "أسئلة واضحة. إجابات مباشرة." : "Straight questions. Direct answers."}</h2>
            </header>
            <Accordion type="single" collapsible className="faq-list">
              {faqs.map((item, i) => (
                <AccordionItem key={item.question.en} value={`item-${i}`}>
                  <AccordionTrigger>{item.question[locale]}</AccordionTrigger>
                  <AccordionContent>{item.answer[locale]}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
        <section id="contact" className="contact-section">
          <div className="site-container contact-inner">
            <div>
              <span className="section-index">06 / START</span>
              <h2>{ar ? "جاهز لحضور أكبر؟" : "Ready for a bigger presence?"}</h2>
            </div>
            <Button asChild variant="premium" size="lg">
              <a href={company.instagramUrl} target="_blank" rel="noreferrer">
                <Instagram />
                {ar ? "ابدأ الآن" : "Get Started"}
              </a>
            </Button>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="site-container footer-top">
          <BrandMark />
          <p>{ar ? "تسويق لخدمات إنستغرام." : "Tasweq for Instagram services."}</p>
          <a href={company.instagramUrl} target="_blank" rel="noreferrer">
            {company.instagramHandle} <ArrowUpRight />
          </a>
        </div>
        <div className="site-container footer-bottom">
          <span>© 2026 Tasweq</span>
          <div className="footer-lang-toggle">
            <button className={ar ? "active" : ""} onClick={() => setLocale("ar")}>
              ع
            </button>
            <button className={!ar ? "active" : ""} onClick={() => setLocale("en")}>
              EN
            </button>
          </div>
        </div>
      </footer>
      <Chatbot />
    </div>
  );
}
