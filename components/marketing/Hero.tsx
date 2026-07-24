"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

const MARQUEE_WORDS = ["Sneakers", "Boots", "Loafers", "Sandals", "Heels", "Wholesale"];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-8 md:pt-12">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-[20%] -right-[10%] w-[700px] h-[700px] rounded-full bg-gold/[0.22] blur-[80px]" />
        <div className="absolute -bottom-[15%] -left-[8%] w-[500px] h-[500px] rounded-full bg-accent-2/[0.18] blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-8 grid grid-cols-1 md:grid-cols-[1.05fr_0.95fr] gap-10 items-center pb-16 md:pb-24">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
          <p className="text-[0.6rem] md:text-[0.78rem] uppercase tracking-[0.14em] font-bold text-gold mb-2.5 md:mb-3.5">Wholesale Footwear · Est. Athens</p>
          <h1 className="font-serif text-[1.65rem] md:text-6xl font-semibold leading-[1.15] md:leading-[1.08] mb-3 md:mb-5">
            Build your order,
            <br />
            request a <span className="italic text-gold">quote</span>.
          </h1>
          <p className="text-sm md:text-lg text-ink/60 max-w-[46ch] mb-6 md:mb-8">
            Browse the Hervé Footwear catalog, add 8-pair wholesale packages to your cart, and submit a Pro Forma
            Invoice request in minutes — no account, no checkout, no online payment.
          </p>
          <div className="flex flex-wrap gap-4 mb-11">
            <Button href="/catalog">Browse Catalog</Button>
            <Button href="/quick-order" variant="ghost">
              Quick Order
            </Button>
          </div>
          <ul className="flex gap-8 pt-6 border-t border-ink/10 text-sm text-ink/60">
            <li>
              <strong className="block font-serif text-2xl text-ink">8</strong>pairs / package
            </li>
            <li>
              <strong className="block font-serif text-2xl text-ink">16</strong>styles live
            </li>
            <li>
              <strong className="block font-serif text-2xl text-ink">24h</strong>quote turnaround
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex justify-center"
        >
          <div className="relative w-full h-[360px] max-w-[460px] bg-ink rounded-brand p-3 shadow-brand rotate-2 overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1551851363-65f4f9107b97"
              alt="Shelves of leather footwear ready for wholesale order"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 460px"
              className="object-cover rounded-brand-sm"
            />
          </div>

          <div
            className="absolute top-[6%] -left-[6%] flex items-center gap-2 glass-card rounded-full px-[18px] py-2.5 text-xs font-semibold shadow-brand"
            style={{ animation: "float 5s ease-in-out infinite" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold" /> Private Label Ready
          </div>
          <div
            className="hidden md:flex absolute bottom-[8%] -right-[8%] items-center gap-2 glass-card rounded-full px-[18px] py-2.5 text-xs font-semibold shadow-brand"
            style={{ animation: "float 5s ease-in-out infinite 1.5s" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent-2" /> FOB &amp; DDP Shipping
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
