"use client";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { copy } from "@/data/content";
import { useLanguage } from "./language-context";
const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
export function Hero() {
  const { t, locale } = useLanguage();
  const reduced = useReducedMotion();
  const ar = locale === "ar";
  return (
    <section id="top" className="hero-section">
      <video
        className="hero-background-video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>
      <div className="hero-video-overlay" aria-hidden="true" />
      <div className="hero-noise" aria-hidden="true" />
      <div className="site-container hero-layout">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: reduced ? 0 : 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="hero-label">{ar ? "تسويق لإنستغرام" : "INSTAGRAM, REIMAGINED"}</span>
          <h1>{t(copy.hero.title)}</h1>
          <p>{t(copy.hero.body)}</p>
          <div className="hero-actions">
            <Button variant="premium" size="lg" onClick={() => go("pricing")}>
              {t(copy.hero.primary)}
              <ArrowDownLeft className="rtl:rotate-90" />
            </Button>
            <button className="text-action" onClick={() => go("process")}>
              {t(copy.hero.secondary)} <ArrowUpRight />
            </button>
          </div>
          <div className="hero-note">Followers · Views · Likes</div>
        </motion.div>
      </div>
    </section>
  );
}
