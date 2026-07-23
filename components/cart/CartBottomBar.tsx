"use client";

import { useCart } from "@/hooks/useCart";
import { formatCurrency, formatNumber } from "@/lib/format";

export function CartBottomBar() {
  const { totals, openDrawer, hasHydrated, state } = useCart();
  const isEmpty = !hasHydrated || state.items.length === 0;

  if (isEmpty) return null;

  return (
    <button
      type="button"
      onClick={openDrawer}
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex items-center justify-between bg-ink text-cream px-5 py-4 shadow-[0_-10px_30px_-10px_rgba(18,19,28,0.4)]"
      aria-label="Open wholesale order cart"
    >
      <span className="text-sm">
        <span className="font-semibold">{formatNumber(totals.totalPackages)} packages</span>
        <span className="text-cream/60"> · {formatNumber(totals.totalPairs)} pairs</span>
      </span>
      <span className="font-serif font-semibold">{formatCurrency(totals.grandTotal)}</span>
    </button>
  );
}
