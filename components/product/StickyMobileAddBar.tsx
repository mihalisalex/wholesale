"use client";

import { QuantityStepper } from "./QuantityStepper";
import { formatCurrency } from "@/lib/format";

interface StickyMobileAddBarProps {
  quantity: number;
  onQuantityChange: (value: number) => void;
  total: number;
  justAdded: boolean;
  onAdd: () => void;
}

export function StickyMobileAddBar({ quantity, onQuantityChange, total, justAdded, onAdd }: StickyMobileAddBarProps) {
  return (
    <div
      className="md:hidden fixed left-0 right-0 bottom-16 z-30 bg-cream/95 backdrop-blur-md border-t border-ink/10 px-4 py-3 flex items-center gap-3"
      style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
    >
      <QuantityStepper value={quantity} onChange={onQuantityChange} />
      <button
        type="button"
        onClick={onAdd}
        className="flex-1 rounded-full bg-ink text-cream font-semibold py-3.5 flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
      >
        {justAdded ? "Added ✓" : `Add Package · ${formatCurrency(total)}`}
      </button>
    </div>
  );
}
