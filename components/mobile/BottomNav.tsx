"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/hooks/useCart";

interface BottomNavProps {
  onSearchClick: () => void;
}

const itemClasses = (active: boolean) =>
  `flex flex-1 flex-col items-center justify-center gap-1 py-2 px-0.5 text-[0.64rem] leading-tight text-center font-semibold ${
    active ? "text-gold" : "text-ink/55"
  }`;

export function BottomNav({ onSearchClick }: BottomNavProps) {
  const pathname = usePathname();
  const { totals, openDrawer, hasHydrated, state } = useCart();
  const hasItems = hasHydrated && state.items.length > 0;

  const isHome = pathname === "/";
  const isCatalog = pathname === "/catalog";
  const isQuickOrder = pathname === "/quick-order";

  return (
    <nav
      aria-label="Primary"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-cream/95 backdrop-blur-md border-t border-ink/10 flex items-stretch"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <Link href="/" className={itemClasses(isHome)} aria-current={isHome ? "page" : undefined}>
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.7">
          <path d="M4 11.5 12 4l8 7.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 10v9a1 1 0 0 0 1 1h4v-6h2v6h4a1 1 0 0 0 1-1v-9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Home
      </Link>

      <Link href="/quick-order" className={itemClasses(isQuickOrder)} aria-current={isQuickOrder ? "page" : undefined}>
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.7">
          <path d="M13 3 4 14h6l-1 7 9-11h-6l1-7Z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Quick Order
      </Link>

      <Link href="/catalog" className={itemClasses(isCatalog)} aria-current={isCatalog ? "page" : undefined}>
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.7">
          <path d="M4 8 12 4l8 4-8 4-8-4Z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 8v8l8 4 8-4V8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 12v8" strokeLinecap="round" />
        </svg>
        Catalogue
      </Link>

      <button type="button" onClick={onSearchClick} className={itemClasses(false)}>
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.7">
          <circle cx="10.5" cy="10.5" r="6.5" />
          <path d="M20 20l-4.7-4.7" strokeLinecap="round" />
        </svg>
        Search
      </button>

      <button type="button" onClick={openDrawer} className={`${itemClasses(false)} relative`} aria-label="Open wholesale order cart">
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.7">
          <path d="M4 4h2l2.4 12.4a2 2 0 0 0 2 1.6h7.2a2 2 0 0 0 2-1.6L21 8H7" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="10" cy="21" r="1.4" />
          <circle cx="18" cy="21" r="1.4" />
        </svg>
        Order
        {hasItems && (
          <span className="absolute top-0 right-[22%] bg-accent-3 text-white text-[10px] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center">
            {totals.totalPackages}
          </span>
        )}
      </button>
    </nav>
  );
}
