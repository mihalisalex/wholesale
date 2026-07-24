"use client";

import { useCart } from "@/hooks/useCart";
import { useRetailer } from "@/hooks/useRetailer";
import { formatCurrency, formatNumber } from "@/lib/format";

export function CartButton() {
  const { totals, openDrawer, hasHydrated, state } = useCart();
  const { isLoggedIn } = useRetailer();
  const isEmpty = !hasHydrated || state.items.length === 0;

  return (
    <button
      type="button"
      onClick={openDrawer}
      className="hidden md:flex fixed bottom-8 right-8 z-40 items-center gap-3 rounded-full bg-ink text-cream pl-5 pr-6 py-3.5 shadow-brand hover:-translate-y-0.5 transition-transform duration-300 ease-brand"
      aria-label="Open wholesale order cart"
    >
      <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M4 4h2l2.4 12.4a2 2 0 0 0 2 1.6h7.2a2 2 0 0 0 2-1.6L21 8H7" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="10" cy="21" r="1.4" />
          <circle cx="18" cy="21" r="1.4" />
        </svg>
        {!isEmpty && (
          <span className="absolute -top-1.5 -right-1.5 bg-accent-3 text-white text-[10px] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center">
            {totals.totalPackages}
          </span>
        )}
      </span>
      {isEmpty ? (
        <span className="text-sm font-semibold">Cart</span>
      ) : (
        <span className="text-left leading-tight">
          {isLoggedIn && <span className="block text-sm font-semibold">{formatCurrency(totals.grandTotal)}</span>}
          <span className="block text-[11px] text-cream/60">
            {formatNumber(totals.totalPackages)} pkg · {formatNumber(totals.totalPairs)} pairs
          </span>
        </span>
      )}
    </button>
  );
}
