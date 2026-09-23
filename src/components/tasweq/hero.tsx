"use client";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDownLeft, Check, Globe2, Headphones, Layers3, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { copy } from "@/data/content";
import { platforms } from "@/data/platforms";
import { useLanguage } from "./language-context";
import { PlatformMark } from "./platform-mark";

const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
const icons = [Layers3, Globe2, Headphones];

export function Hero() {
  const { t, locale } = useLanguage();
  const reduced = useReducedMotion();
  return (
    <section id="top" className="hero-section relative overflow-hidden pt-28 sm:pt-36">
      <div className="hero-grid" aria-hidden="true" />
      <div className="site-container relative grid min-h-[820px] items-center gap-16 pb-24 lg:min-h-[880px] lg:grid-cols-[.92fr_1.08fr] lg:gap-10">
        <motion.div
          className="relative z-10 max-w-3xl"
          initial={{ opacity: 0, y: reduced ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="eyebrow">
            <span className="status-dot" />
            {t(copy.hero.eyebrow)}
          </div>
          <h1 className="mt-7 max-w-[760px] font-display text-5xl font-semibold leading-[1.03] text-balance sm:text-7xl lg:text-[5.35rem]">
            {t(copy.hero.title)}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
            {t(copy.hero.body)}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button
              variant="premium"
              size="lg"
              className="h-13 rounded-md px-7 text-base"
              onClick={() => go("services")}
            >
              {t(copy.hero.primary)}
              <ArrowDownLeft className="rtl:rotate-90" />
            </Button>
            <Button
              variant="glass"
              size="lg"
              className="h-13 rounded-md px-7 text-base"
              onClick={() => go("pricing")}
            >
              {t(copy.hero.secondary)}
            </Button>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-border/70 pt-6">
            {copy.hero.benefits.map((item, i) => {
              const Icon = icons[i];
              return (
                <span
                  key={item.en}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <Icon className="size-4 text-primary" />
                  {t(item)}
                </span>
              );
            })}
          </div>
        </motion.div>
        <div
          className="hero-visual relative mx-auto aspect-square w-full max-w-[680px]"
          aria-label={
            locale === "ar"
              ? "تصور توضيحي لنمو منصات التواصل"
              : "Illustrative social media growth dashboard"
          }
        >
          <div className="hero-orbit hero-orbit-one" />
          <div className="hero-orbit hero-orbit-two" />
          <motion.div
            className="dashboard-device"
            initial={{ opacity: 0, scale: 0.92, rotateY: -8 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <div className="device-top">
              <span className="flex gap-1">
                <i />
                <i />
                <i />
              </span>
              <span>tasweq.live</span>
              <span className="status-dot" />
            </div>
            <div className="device-content">
              <div className="flex items-start justify-between">
                <div>
                  <span className="data-label">
                    {locale === "ar" ? "نظرة عامة" : "Growth overview"}
                  </span>
                  <strong className="mt-2 block text-3xl">48.2K</strong>
                </div>
                <span className="growth-pill">
                  <TrendingUp /> +24.8%
                </span>
              </div>
              <div className="chart-bars mt-10">
                {[38, 56, 45, 70, 58, 82, 76, 94, 86, 100].map((h, i) => (
                  <motion.i
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: 0.5 + i * 0.04, duration: 0.5 }}
                  />
                ))}
              </div>
              <div className="mt-8 grid grid-cols-3 gap-2">
                {[
                  ["+10K", locale === "ar" ? "متابع" : "Followers"],
                  ["+50K", locale === "ar" ? "مشاهدة" : "Views"],
                  ["+5K", locale === "ar" ? "إعجاب" : "Likes"],
                ].map(([v, l]) => (
                  <div className="metric-cell" key={l}>
                    <strong>{v}</strong>
                    <span>{l}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-between rounded-md border border-border bg-background/40 p-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Check className="size-4 text-platform-cyan" />
                  {locale === "ar" ? "مؤشرات توضيحية" : "Illustrative metrics"}
                </span>
                <span>LIVE</span>
              </div>
            </div>
          </motion.div>
          {platforms.slice(0, 3).map((platform, index) => (
            <motion.div
              key={platform.id}
              className={`float-card float-card-${index + 1}`}
              animate={reduced ? undefined : { y: [0, -9, 0] }}
              transition={{ repeat: Infinity, duration: 4 + index, delay: index * 0.5 }}
            >
              <PlatformMark platform={platform} />
              <div>
                <strong>{platform.name[locale]}</strong>
                <span>
                  {["+10K", "+50K", "+5K"][index]}{" "}
                  {index === 0
                    ? locale === "ar"
                      ? "متابع"
                      : "Followers"
                    : index === 1
                      ? locale === "ar"
                        ? "مشاهدة"
                        : "Views"
                      : locale === "ar"
                        ? "إعجاب"
                        : "Likes"}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
