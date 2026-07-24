"use client";

import { ProductThumb } from "@/components/product/ProductThumb";
import { formatCurrency, pairsForPackages } from "@/lib/format";
import { useCart } from "@/hooks/useCart";
import type { CartItem } from "@/types/cart";

export function CartLineItem({ item }: { item: CartItem }) {
  const { updateQuantity, removeItem } = useCart();
  const pairs = pairsForPackages(item.quantityPackages, item.packageSize);
  const subtotal = item.quantityPackages * item.pricePerPackage;

  return (
    <div className="flex gap-4 py-5 border-b border-ink/10">
      <div
        className="relative w-20 h-16 shrink-0 rounded-brand-sm overflow-hidden flex items-center justify-center"
        style={{ background: `${item.colorHex}14` }}
      >
        <ProductThumb
          image={{ art: item.art, alt: item.name, photoUrl: item.photoUrl }}
          imgClassName="w-full h-full object-cover"
          fallbackClassName="w-full h-full p-2 text-ink"
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="font-serif font-semibold text-ink truncate">{item.name}</p>
            <p className="text-xs text-ink/50">{item.sku}</p>
          </div>
          <button
            type="button"
            onClick={() => removeItem(item.productId)}
            className="text-xs text-ink/40 hover:text-accent-3 shrink-0"
            aria-label={`Remove ${item.name} from cart`}
          >
            Remove
          </button>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => updateQuantity(item.productId, item.quantityPackages - 1)}
              className="w-9 h-9 sm:w-7 sm:h-7 rounded-full border border-ink/20 text-ink flex items-center justify-center hover:bg-ink hover:text-cream transition-colors"
              aria-label="Decrease package quantity"
            >
              −
            </button>
            <span className="w-6 text-center text-sm font-semibold">{item.quantityPackages}</span>
            <button
              type="button"
              onClick={() => updateQuantity(item.productId, item.quantityPackages + 1)}
              className="w-9 h-9 sm:w-7 sm:h-7 rounded-full border border-ink/20 text-ink flex items-center justify-center hover:bg-ink hover:text-cream transition-colors"
              aria-label="Increase package quantity"
            >
              +
            </button>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-ink">{formatCurrency(subtotal)}</p>
            <p className="text-xs text-ink/45">
              {item.quantityPackages} pkg · {pairs} pairs
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
