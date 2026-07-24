"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { GhostMark } from "@/components/ui/GhostMark";

const MARQUEE_WORDS = ["Sneakers", "Boots", "Loafers", "Sandals", "Heels", "Wholesale"];

const HERO_STATS = [
  { value: "15", label: "Years in Trade" },
  { value: "32", label: "Countries Served" },
  { value: "480+", label: "Retail Partners" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-8 md:pt-16">
      <GhostMark className="hidden md:block top-[6%] right-[2%]" />

      <div className="relative z-10 max-w-[1240px] mx-auto px-5 md:px-8 grid grid-cols-1 md:grid-cols-[1.05fr_0.95fr] gap-12 md:gap-16 items-center pb-16 md:pb-28">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
          <p className="flex items-center gap-2.5 text-[0.68rem] md:text-[0.78rem] uppercase tracking-[0.14em] font-bold text-accent-3 mb-4">
            <span className="w-4 h-px bg-accent-3" aria-hidden="true" />
            Wholesale Footwear · Est. Athens
          </p>
          <h1 className="font-serif text-[2.5rem] sm:text-6xl md:text-[4.6rem] font-semibold leading-[1.02] tracking-tight mb-5 md:mb-7 text-balance">
            Build your order,
            <br />
            request a <span className="text-accent-3">quote</span>.
          </h1>
          <p className="text-base md:text-lg text-ink/60 max-w-[46ch] mb-8 md:mb-10 leading-relaxed">
            Browse the Hervé Footwear catalog, add 8-pair wholesale packages to your cart, and submit a Pro Forma
            Invoice request in minutes — free retailer account, no checkout, no online payment.
          </p>
          <div className="flex flex-wrap gap-4 mb-12 md:mb-14">
            <Button href="/catalog">Browse Catalog</Button>
            <Button href="/quick-order" variant="ghost">
              Quick Order
            </Button>
          </div>
          <ul className="flex gap-8 md:gap-12 pt-7 border-t border-ink/10">
            {HERO_STATS.map((stat) => (
              <li key={stat.label}>
                <strong className="block font-serif text-3xl md:text-4xl font-semibold leading-none mb-1.5">{stat.value}</strong>
                <span className="text-[0.8rem] text-ink/55">{stat.label}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-[380px] sm:h-[440px] md:h-[520px]"
        >
          <div className="absolute left-[4%] top-[6%] w-[86%] h-[82%] rounded-brand overflow-hidden shadow-brand -rotate-2">
            <Image
              src="/images/marketing/hero-shelves.jpg"
              alt="Shelves of leather footwear ready for wholesale order"
              fill
              priority
              sizes="(max-width: 768px) 90vw, 44vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent" />
          </div>

          <div className="absolute top-[8%] right-0 w-[62%] max-w-[260px] glass-card rounded-brand-sm p-5 shadow-brand">
            <div className="flex items-center justify-between text-xs text-ink/55 mb-3.5">
              <span>Order #HF-2291</span>
              <span className="flex items-center gap-1.5 font-semibold text-ink">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-2" /> Confirmed
              </span>
            </div>
            <div className="flex items-end gap-1.5 h-14 mb-3.5">
              {[40, 65, 50, 85, 60, 95, 70].map((h, i) => (
                <span key={i} className="flex-1 rounded-t bg-gradient-to-t from-accent-3/20 to-accent-3/70" style={{ height: `${h}%` }} />
              ))}
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-ink/55">This Season</span>
              <span className="font-serif text-lg font-semibold">96 pkgs</span>
            </div>
          </div>

          <div
            className="absolute bottom-[6%] -left-[2%] sm:left-0 flex items-center gap-2.5 glass-card rounded-full pl-3 pr-5 py-2.5 shadow-brand"
            style={{ animation: "float 5s ease-in-out infinite" }}
          >
            <span className="w-8 h-8 rounded-full bg-ink flex items-center justify-center shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-3" />
            </span>
            <span className="text-xs font-semibold">Private Label Ready</span>
          </div>
        </motion.div>
      </div>

      <div className="border-y border-ink/10 bg-ink overflow-hidden">
        <div className="flex w-max animate-scroll-left">
          {[...MARQUEE_WORDS, ...MARQUEE_WORDS].map((word, i) => (
            <span key={i} className="font-serif italic text-2xl text-cream/60 px-10 py-4 whitespace-nowrap">
              {word}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
