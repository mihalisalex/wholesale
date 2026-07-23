"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

const MEN_LINKS = [
  { label: "Sneakers", category: "sneakers" },
  { label: "Loafers & Oxfords", category: "loafers" },
  { label: "Boots", category: "boots" },
];

const WOMEN_LINKS = [
  { label: "Heels", category: "heels" },
  { label: "Flats", category: "loafers" },
  { label: "Sandals", category: "sandals" },
  { label: "Boots", category: "boots" },
];

interface MegaMenuProps {
  onNavigate?: () => void;
}

export function MegaMenu({ onNavigate }: MegaMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setIsOpen(false);
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  function handleLinkClick() {
    setIsOpen(false);
    onNavigate?.();
  }

  return (
    <div ref={rootRef} className="relative w-full md:w-auto">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((v) => !v);
        }}
        aria-haspopup="true"
        aria-expanded={isOpen}
        className="flex items-center justify-between w-full md:w-auto gap-1.5 py-3.5 md:py-1 text-sm font-medium border-b md:border-b-0 border-ink/10"
      >
        Collections
        <svg
          viewBox="0 0 12 8"
          className={`w-2.5 h-2.5 transition-transform duration-300 ease-brand ${isOpen ? "rotate-180" : ""}`}
        >
          <path d="M1 1l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="static md:absolute md:top-[calc(100%+20px)] md:left-1/2 md:-translate-x-1/2 w-full md:w-[560px] py-4 md:py-7 md:px-7 grid grid-cols-2 md:grid-cols-[1fr_1fr_1.1fr] gap-6 md:gap-7 md:rounded-brand md:glass-card md:shadow-brand z-50"
          >
            <div>
              <p className="text-[0.72rem] uppercase tracking-wider font-bold text-ink/50 mb-3">Men&rsquo;s</p>
              <div className="flex flex-col">
                {MEN_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    href={`/catalog?gender=men&category=${link.category}`}
                    onClick={handleLinkClick}
                    className="py-2 text-sm border-b border-ink/5 last:border-none hover:text-gold"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[0.72rem] uppercase tracking-wider font-bold text-ink/50 mb-3">Women&rsquo;s</p>
              <div className="flex flex-col">
                {WOMEN_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    href={`/catalog?gender=women&category=${link.category}`}
                    onClick={handleLinkClick}
                    className="py-2 text-sm border-b border-ink/5 last:border-none hover:text-gold"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="hidden md:block rounded-brand-sm p-5 text-white bg-gradient-to-br from-gold to-accent-2">
              <p className="text-[0.72rem] uppercase tracking-wider font-bold text-white/85 mb-2">New This Season</p>
              <p className="font-serif text-base font-semibold mb-1.5">Full Catalog</p>
              <p className="text-xs text-white/85 mb-4">Sixteen styles across men&rsquo;s and women&rsquo;s, ready to sample.</p>
              <Link
                href="/catalog"
                onClick={handleLinkClick}
                className="inline-flex items-center rounded-full bg-white text-ink text-xs font-semibold px-4 py-2 hover:bg-white/85 transition-colors"
              >
                View Catalog
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
