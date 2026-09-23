import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/tasweq/navbar";
import { Hero } from "@/components/tasweq/hero";
import { Marketplace } from "@/components/tasweq/marketplace";
import { Chatbot } from "@/components/tasweq/chatbot";
import { LanguageProvider, useLanguage } from "@/components/tasweq/language-context";
import { company } from "@/data/company";
import { copy } from "@/data/content";
import { pricing } from "@/data/pricing";
import { faqs } from "@/data/faq";
import {
  ArrowUpRight,
  Check,
  Instagram,
  MessageCircleMore,
  Sparkles,
  Star,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <LanguageProvider>
      <PageContent />
    </LanguageProvider>
  );
}

function PageContent() {
  const { locale, t } = useLanguage();
  const ar = locale === "ar";

  const whyItems = [
    {
      title: { ar: "أسعار واضحة", en: "Clear pricing" },
      text: {
        ar: "لا تعقيد في الباقات، فقط خيارات مباشرة ومباشرة.",
        en: "No complicated package maze—just direct, easy-to-understand options.",
      },
    },
    {
      title: { ar: "تجربة إنستغرام فقط", en: "Instagram-first" },
      text: {
        ar: "نركز على ما يهم فعليًا: متابعين، مشاهدات، ولايكات.",
        en: "We focus only on what matters most: followers, views, and likes.",
      },
    },
    {
      title: { ar: "تواصل مباشر", en: "Direct support" },
      text: {
        ar: "تواصلك يمر مباشرة عبر إنستغرام لفهم الطلب بسرعة وإتمامه.",
        en: "You can connect directly on Instagram so your request stays simple and fast.",
      },
    },
  ];

  const steps = [
    { ar: "اختر الخدمة", en: "Choose a service" },
    { ar: "اختر الباقة", en: "Choose your package" },
    { ar: "تواصل مع تسويق", en: "Contact Tasweq" },
  ];

  const trustPoints = [
    { ar: "خدمات إنستغرام فقط", en: "Instagram-only focus" },
    { ar: "أسعار موثقة", en: "Documented pricing" },
    { ar: "واجهة عربية/إنجليزية", en: "Arabic / English experience" },
  ];

  return (
    <div className="app-shell" dir={ar ? "rtl" : "ltr"}>
      <Navbar />
      <main className="main-shell">
        <Hero />

        <section id="services" className="section-shell">
          <div className="site-container">
            <div className="section-heading">
              <div>
                <span className="eyebrow">{ar ? "01 — الخدمات" : "01 — SERVICES"}</span>
                <h2>
                  {ar
                    ? "خدمات إنستغرام بأسعار واضحة."
                    : "Instagram services with straightforward pricing."}
                </h2>
              </div>
              <p>
                {ar
                  ? "تصفح باقات المتابعين والمشاهدات والإعجابات، ثم تواصل مباشرة عبر إنستغرام."
                  : "Browse follower, view, and like packages, then contact us directly on Instagram."}
              </p>
            </div>
          </div>
          <Marketplace />
        </section>

        <section className="section-shell">
          <div className="site-container">
            <div className="section-heading mb-8">
              <div>
                <span className="eyebrow">{copy.why.eyebrow[locale]}</span>
                <h2>{t(copy.why.title)}</h2>
              </div>
              <p>{t(copy.why.description)}</p>
            </div>

            <div className="why-grid">
              {whyItems.map((item, index) => (
                <article
                  key={item.title[locale]}
                  className={`why-card card-sheen ${index === 0 ? "is-featured" : ""}`}
                >
                  <div className="card-kicker">0{index + 1}</div>
                  <h3>{item.title[locale]}</h3>
                  <p>{item.text[locale]}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="section-shell section-soft">
          <div className="site-container">
            <div className="section-heading compact">
              <div>
                <span className="eyebrow">{ar ? "02 — كيف تعمل" : "02 — HOW IT WORKS"}</span>
                <h2>{t(copy.process.title)}</h2>
              </div>
              <p>{t(copy.process.subtitle)}</p>
            </div>

            <div className="steps-grid">
              {steps.map((step, index) => (
                <div key={step[locale]} className="step-card">
                  <div className="step-number">0{index + 1}</div>
                  <div className="step-icon">
                    <Sparkles size={18} />
                  </div>
                  <h3>{step[locale]}</h3>
                  <p>
                    {index === 0
                      ? ar
                        ? "حدد الخدمة التي تحتاجها على إنستغرام."
                        : "Pick the Instagram service you need."
                      : index === 1
                        ? ar
                          ? "اختر الكمية المناسبة ثم راجع السعر مباشرة."
                          : "Choose the package size and review the price clearly."
                        : ar
                          ? "تواصل معنا عبر إنستغرام لإتمام الطلب."
                          : "Contact Tasweq on Instagram to complete your request."}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell">
          <div className="site-container">
            <div className="section-heading mb-8">
              <div>
                <span className="eyebrow">{t(copy.showcase.eyebrow)}</span>
                <h2>{t(copy.showcase.title)}</h2>
              </div>
            </div>

            <div className="showcase-grid">
              <div className="showcase-main">
                <div className="showcase-profile">
                  <div className="profile-top">
                    <div className="profile-avatar">ت</div>
                    <div>
                      <strong>{company.name}</strong>
                      <span>{company.instagramHandle}</span>
                    </div>
                    <button className="follow-pill">{ar ? "متابعة" : "Follow"}</button>
                  </div>

                  <div className="profile-stats">
                    <div>
                      <strong>24K</strong>
                      <span>{ar ? "متابعين" : "Followers"}</span>
                    </div>
                    <div>
                      <strong>86%</strong>
                      <span>{ar ? "نسبة تفاعل" : "Engagement"}</span>
                    </div>
                    <div>
                      <strong>4.8</strong>
                      <span>{ar ? "تقييم" : "Rating"}</span>
                    </div>
                  </div>

                  <div className="showcase-grid-mini">
                    <div className="mini-tile tall" />
                    <div className="mini-tile" />
                    <div className="mini-tile" />
                    <div className="mini-tile wide" />
                  </div>
                </div>
              </div>

              <div className="showcase-side">
                <div className="analytics-card highlight">
                  <div className="metric-header">
                    <span>{ar ? "نظرة عامة" : "Overview"}</span>
                    <span className="live-dot">LIVE</span>
                  </div>
                  <strong>+10K</strong>
                  <div className="bars-row">
                    {[34, 58, 42, 70, 88, 66, 94].map((value, rowIndex) => (
                      <span key={rowIndex} style={{ height: `${value}%` }} />
                    ))}
                  </div>
                  <small>
                    {ar ? "نماذج مصورة للعرض التوضيحي" : "Illustrative visual examples"}
                  </small>
                </div>

                <div className="analytics-card">
                  <div className="metric-header">
                    <span>{ar ? "رؤية سريعة" : "Snapshot"}</span>
                    <TrendingUp size={16} />
                  </div>
                  <strong>+50K</strong>
                  <small>{ar ? "مشاهدة" : "Views"}</small>
                </div>

                <div className="analytics-card">
                  <div className="metric-header">
                    <span>{ar ? "إعجابات" : "Likes"}</span>
                    <Star size={16} />
                  </div>
                  <strong>+10K</strong>
                  <small>{ar ? "إعجاب" : "Likes"}</small>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell section-soft">
          <div className="site-container">
            <div className="section-heading compact">
              <div>
                <span className="eyebrow">{t(copy.testimonials.eyebrow)}</span>
                <h2>{t(copy.testimonials.title)}</h2>
              </div>
            </div>

            <div className="trust-grid">
              {trustPoints.map((point) => (
                <div key={point[locale]} className="trust-card">
                  <Check className="trust-icon" />
                  <span>{point[locale]}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="section-shell">
          <div className="site-container faq-layout">
            <div className="section-heading compact">
              <div>
                <span className="eyebrow">FAQ</span>
                <h2>{ar ? "الأسئلة الشائعة" : "Frequently asked questions"}</h2>
              </div>
            </div>

            <div className="faq-list">
              {faqs.map((item) => (
                <div key={item.question[locale]} className="faq-item">
                  <h3>{item.question[locale]}</h3>
                  <p>{item.answer[locale]}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section-shell">
          <div className="site-container">
            <div className="cta-panel">
              <div className="cta-copy">
                <span className="eyebrow">{t(copy.cta.eyebrow)}</span>
                <h2>{t(copy.cta.title)}</h2>
                <p>{t(copy.cta.body)}</p>
              </div>

              <div className="cta-actions">
                <Button asChild variant="premium" size="lg" className="rounded-full">
                  <a href={company.instagramUrl} target="_blank" rel="noreferrer">
                    <Instagram className="size-4" />
                    {t(copy.cta.primary)}
                  </a>
                </Button>
                <Button
                  variant="glass"
                  size="lg"
                  className="rounded-full"
                  onClick={() =>
                    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  {ar ? "شاهد الأسعار" : "View pricing"}
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="site-container footer-grid">
          <div>
            <div className="brand-lockup">
              <span className="brand-glyph" aria-hidden="true">
                <i />
                <b>ت</b>
              </span>
              <div>
                <strong>
                  {company.name} / {company.arabicName}
                </strong>
              </div>
            </div>
            <p>{t(copy.footer.description)}</p>
          </div>

          <div>
            <h4>{ar ? "التنقل" : "Navigation"}</h4>
            <ul>
              <li>
                <a href="#top">{t(copy.nav.home)}</a>
              </li>
              <li>
                <a href="#services">{t(copy.nav.services)}</a>
              </li>
              <li>
                <a href="#pricing">{t(copy.nav.pricing)}</a>
              </li>
              <li>
                <a href="#process">{t(copy.nav.process)}</a>
              </li>
              <li>
                <a href="#faq">{t(copy.nav.faq)}</a>
              </li>
            </ul>
          </div>

          <div>
            <h4>{t(copy.footer.services)}</h4>
            <ul>
              <li>{ar ? "متابعين" : "Followers"}</li>
              <li>{ar ? "مشاهدات" : "Views"}</li>
              <li>{ar ? "لايكات" : "Likes"}</li>
            </ul>
          </div>

          <div>
            <h4>{t(copy.footer.instagram)}</h4>
            <ul>
              <li>
                <a href={company.instagramUrl} target="_blank" rel="noreferrer">
                  {company.instagramHandle}
                </a>
              </li>
              <li>
                <a href="#contact">{t(copy.nav.contact)}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="site-container footer-bottom">
          <span>© 2026 Tasweq</span>
          <div className="footer-lang-toggle">
            <button onClick={() => (document.documentElement.dir = "rtl")}>
              {ar ? "AR" : "ع"}
            </button>
            <button onClick={() => (document.documentElement.dir = "ltr")}>
              {ar ? "EN" : "E"}
            </button>
          </div>
        </div>
      </footer>

      <Chatbot />
    </div>
  );
}
