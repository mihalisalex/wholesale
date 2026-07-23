"use client";

import { useState } from "react";
import Link from "next/link";
import { MegaMenu } from "./MegaMenu";
import { Button } from "@/components/ui/Button";

const NAV_LINKS = [
  { href: "/#why", label: "Why Hervé" },
  { href: "/#process", label: "Process" },
  { href: "/#testimonials", label: "Retailers" },
  { href: "/#contact", label: "Contact" },
];

export function Header() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-[200] bg-cream/70 backdrop-blur-md backdrop-saturate-150 border-b border-ink/10">
      <div className="absolute left-0 right-0 bottom-[-1px] h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-50" />
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 flex items-center justify-between h-[78px]">
        <Link href="/" className="flex items-center gap-2 font-serif text-xl font-semibold" aria-label="Hervé Footwear home">
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
            <circle cx="15" cy="15" r="14.25" stroke="currentColor" strokeWidth="1" />
            <path
              d="M9 19.5c1.5-6 2.2-9.6 6-9.6 2.6 0 3 2.1 5.4 2.1 1.1 0 1.8-.4 2.4-1"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>
          <span>
            Hervé <em className="italic text-gold">Footwear</em>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-9" aria-label="Primary">
          <MegaMenu />
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium hover:text-gold transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Button href="/catalog" size="sm" className="hidden md:inline-flex">
            Browse Catalog
          </Button>
          <button
            type="button"
            className="md:hidden w-8 h-8 flex flex-col justify-center gap-1.5"
            aria-expanded={isMobileOpen}
            aria-controls="mobile-nav"
            aria-label="Toggle menu"
            onClick={() => setIsMobileOpen((v) => !v)}
          >
            <span className="h-px bg-ink" />
            <span className="h-px bg-ink" />
            <span className="h-px bg-ink" />
          </button>
        </div>
      </div>

      {isMobileOpen && (
        <nav id="mobile-nav" className="md:hidden border-t border-ink/10 bg-cream px-5 pb-5 max-h-[calc(100vh-78px)] overflow-y-auto">
          <MegaMenu onNavigate={() => setIsMobileOpen(false)} />
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileOpen(false)}
              className="block py-3.5 text-sm font-medium border-b border-ink/10"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/catalog"
            onClick={() => setIsMobileOpen(false)}
            className="block mt-4 text-center rounded-full bg-ink text-cream py-3 text-sm font-semibold"
          >
            Browse Catalog
          </Link>
        </nav>
      )}
    </header>
  );
}
