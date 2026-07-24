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

interface HeaderProps {
  retailer: { companyName: string } | null;
}

export function Header({ retailer }: HeaderProps) {
  const { totals, openDrawer, hasHydrated, state } = useCart();
  const hasItems = hasHydrated && state.items.length > 0;

  return (
    <header className="fixed top-0 left-0 right-0 z-[200] bg-cream/80 backdrop-blur-xl backdrop-saturate-150 border-b border-ink/10">
      <div className="max-w-[1240px] mx-auto px-5 md:px-8 grid grid-cols-[auto_1fr_auto] items-center gap-4 h-14 md:h-[78px]">
        <Link href="/" className="flex items-baseline gap-2" aria-label="Hervé Footwear home">
          <span className="font-serif text-xl md:text-2xl tracking-wide">HERVÉ</span>
          <span className="hidden sm:inline text-[0.6rem] uppercase tracking-[0.2em] text-ink/40 font-medium">Footwear</span>
        </Link>

        <nav className="hidden md:flex items-center justify-center gap-8" aria-label="Primary">
          <MegaMenu />
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-sm font-medium text-ink/70 hover:text-ink transition-colors py-1 after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-px after:bg-accent-3 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-4">
          <Link
            href={retailer ? "/account" : "/login"}
            className="hidden md:inline-flex text-sm font-medium text-ink/70 hover:text-ink transition-colors"
          >
            {retailer ? retailer.companyName || "My Account" : "Log in"}
          </Link>
          <Button href="/catalog" size="sm" className="hidden md:inline-flex">
            Browse Catalog
          </Button>

          {/* Mobile: primary nav lives in the sticky BottomNav, so the header is just logo + account + cart. */}
          <Link
            href={retailer ? "/account" : "/login"}
            aria-label={retailer ? "My account" : "Log in"}
            className="md:hidden relative w-10 h-10 flex items-center justify-center"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.7">
              <circle cx="12" cy="8" r="3.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4.5 20a7.5 7.5 0 0 1 15 0" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>

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
