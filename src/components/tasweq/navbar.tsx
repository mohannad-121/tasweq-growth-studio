"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Languages, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandMark } from "./brand-mark";
import { useLanguage } from "./language-context";
import { copy } from "@/data/content";

const links = [
  ["home", "top"],
  ["services", "services"],
  ["pricing", "pricing"],
  ["process", "process"],
  ["faq", "faq"],
  ["contact", "contact"],
] as const;
const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export function Navbar() {
  const { locale, setLocale, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6">
      <nav
        className={`nav-shell mx-auto grid max-w-[1480px] grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-3 py-2.5 transition-all duration-300 sm:flex ${scrolled ? "nav-scrolled" : ""}`}
        aria-label={locale === "ar" ? "التنقل الرئيسي" : "Main navigation"}
      >
        <button
          className="min-w-0 cursor-pointer"
          onClick={() => go("top")}
          aria-label="Tasweq home"
        >
          <BrandMark />
        </button>
        <div className="mx-auto hidden items-center gap-1 xl:flex">
          {links.map(([key, id]) => (
            <button key={key} onClick={() => go(id)} className="nav-link">
              {t(copy.nav[key])}
            </button>
          ))}
        </div>
        <div className="ms-auto flex shrink-0 items-center gap-1.5">
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full"
            onClick={() => setLocale(locale === "ar" ? "en" : "ar")}
            aria-label={locale === "ar" ? "Switch to English" : "التبديل إلى العربية"}
          >
            <Languages />
            {locale === "ar" ? "EN" : "AR"}
          </Button>
          <Button
            variant="premium"
            size="sm"
            className="hidden rounded-full sm:inline-flex"
            onClick={() => go("pricing")}
          >
            {t(copy.nav.start)}
            <ArrowUpRight className="rtl:-rotate-90" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full xl:hidden"
            onClick={() => setOpen(true)}
            aria-label={t(copy.nav.menu)}
          >
            <Menu />
          </Button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="flex items-center justify-between">
              <BrandMark />
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={() => setOpen(false)}
                aria-label={t(copy.nav.close)}
              >
                <X />
              </Button>
            </div>
            <div className="mt-12 grid gap-1">
              {links.map(([key, id], index) => (
                <motion.button
                  initial={{ opacity: 0, x: locale === "ar" ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.035 }}
                  key={key}
                  onClick={() => {
                    go(id);
                    setOpen(false);
                  }}
                  className="mobile-menu-link"
                >
                  <span>0{index + 1}</span>
                  {t(copy.nav[key])}
                </motion.button>
              ))}
            </div>
            <Button
              variant="premium"
              size="lg"
              className="mt-auto h-12 w-full rounded-md"
              onClick={() => {
                go("pricing");
                setOpen(false);
              }}
            >
              {t(copy.nav.start)}
              <ArrowUpRight className="rtl:-rotate-90" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
