"use client";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDownLeft, ArrowUpRight, Heart, Play, Users } from "lucide-react";
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
        <motion.div
          className="hero-art"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.14 }}
          aria-label={ar ? "تصور لخدمات إنستغرام" : "Instagram service illustration"}
        >
          <div className="sun-disc" />
          <div className="art-ring ring-a" />
          <div className="art-ring ring-b" />
          <div className="hero-video-frame">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Tasweq Instagram showcase"
            >
              <source src="/hero.mp4" type="video/mp4" />
            </video>
          </div>
          <motion.div
            className="signal-card card-followers"
            animate={reduced ? undefined : { y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
          >
            <Users />
            <div>
              <b>10K</b>
              <small>Followers</small>
            </div>
          </motion.div>
          <motion.div
            className="signal-card card-views"
            animate={reduced ? undefined : { y: [0, 7, 0] }}
            transition={{ repeat: Infinity, duration: 4.6 }}
          >
            <Play />
            <div>
              <b>50K</b>
              <small>Views</small>
            </div>
          </motion.div>
          <div className="signal-card card-likes">
            <Heart />
            <div>
              <b>10K</b>
              <small>Likes</small>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
