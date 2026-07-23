"use client";

import Link from "next/link";
import { MegaMenu } from "./MegaMenu";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/hooks/useCart";
import { formatNumber } from "@/lib/format";

const NAV_LINKS = [
  { href: "/quick-order", label: "Quick Order" },
  { href: "/#why", label: "Why Hervé" },
  { href: "/#process", label: "Process" },
  { href: "/#testimonials", label: "Retailers" },
  { href: "/#contact", label: "Contact" },
];

export function Header() {
  const { totals, openDrawer, hasHydrated, state } = useCart();
  const hasItems = hasHydrated && state.items.length > 0;

  return (
    <header className="fixed top-0 left-0 right-0 z-[200] bg-cream/70 backdrop-blur-md backdrop-saturate-150 border-b border-ink/10">
      <div className="absolute left-0 right-0 bottom-[-1px] h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-50" />
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 flex items-center justify-between h-14 md:h-[78px]">
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

          {/* Mobile: primary nav lives in the sticky BottomNav, so the header is just logo + cart. */}
          <button
            type="button"
            onClick={openDrawer}
            aria-label="Open wholesale order cart"
            className="md:hidden relative w-10 h-10 flex items-center justify-center"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.7">
              <path d="M4 4h2l2.4 12.4a2 2 0 0 0 2 1.6h7.2a2 2 0 0 0 2-1.6L21 8H7" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="10" cy="21" r="1.4" />
              <circle cx="18" cy="21" r="1.4" />
            </svg>
            {hasItems && (
              <span className="absolute top-0.5 right-0.5 bg-accent-3 text-white text-[10px] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center">
                {formatNumber(totals.totalPackages)}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
