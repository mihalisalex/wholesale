import { formatCurrency, formatNumber } from "@/lib/format";

interface CartTotalsProps {
  totalPackages: number;
  totalPairs: number;
  grandTotal: number;
}

export function CartTotals({ totalPackages, totalPairs, grandTotal }: CartTotalsProps) {
  return (
    <dl className="space-y-2 text-sm">
      <div className="flex justify-between text-ink/60">
        <dt>Total packages</dt>
        <dd>{formatNumber(totalPackages)}</dd>
      </div>
      <div className="flex justify-between text-ink/60">
        <dt>Total pairs</dt>
        <dd>{formatNumber(totalPairs)}</dd>
      </div>
      <div className="flex justify-between text-lg font-serif font-semibold text-ink pt-2 border-t border-ink/10">
        <dt>Grand total</dt>
        <dd>{formatCurrency(grandTotal)}</dd>
      </div>
    </dl>
  );
}
