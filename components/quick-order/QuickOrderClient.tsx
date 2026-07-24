"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/types/product";
import { searchProducts } from "@/lib/search";
import { formatCurrency, formatNumber } from "@/lib/format";
import { useCart } from "@/hooks/useCart";
import { QuantityStepper } from "@/components/product/QuantityStepper";
import { Button } from "@/components/ui/Button";
import { ProductThumb } from "@/components/product/ProductThumb";
import { OrderModal } from "@/components/order/OrderModal";

export function QuickOrderClient({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const [isOrderModalOpen, setOrderModalOpen] = useState(false);
  const { state, totals, addItem, updateQuantity } = useCart();

  const results = useMemo(() => (query.trim() ? searchProducts(products, query).slice(0, 30) : []), [products, query]);

  function quantityFor(productId: string): number {
    return state.items.find((i) => i.productId === productId)?.quantityPackages ?? 0;
  }

  function setQuantity(product: Product, next: number) {
    if (next <= 0) {
      updateQuantity(product.id, 0);
      return;
    }
    const current = quantityFor(product.id);
    if (current === 0) {
      addItem(
        {
          productId: product.id,
          slug: product.slug,
          name: product.name,
          sku: product.sku,
          art: product.images[0]?.art ?? "",
          photoUrl: product.images[0]?.photoUrl,
          color: product.color,
          colorHex: product.colorHex,
          pricePerPackage: product.pricePerPackage,
          packageSize: product.packageSize,
        },
        next,
        { openDrawer: false }
      );
    } else {
      updateQuantity(product.id, next);
    }
  }

  const hasItems = state.items.length > 0;

  return (
    <div className="pb-40 md:pb-0">
      <div className="relative mb-6">
        <svg
          viewBox="0 0 24 24"
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/40"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
        >
          <circle cx="10.5" cy="10.5" r="6.5" />
          <path d="M20 20l-4.7-4.7" strokeLinecap="round" />
        </svg>
        <input
          type="search"
          inputMode="search"
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by SKU or product name…"
          className="w-full rounded-full border border-ink/15 bg-white pl-12 pr-4 py-4 text-base focus:outline-none focus:border-gold"
        />
      </div>

      {!query.trim() && (
        <p className="text-center text-ink/50 py-16">Know what you need? Search a SKU or style name to add it straight to your order.</p>
      )}
      {query.trim() && results.length === 0 && <p className="text-center text-ink/50 py-16">No styles match &ldquo;{query}&rdquo;.</p>}

      <div className="space-y-3">
        {results.map((product) => {
          const qty = quantityFor(product.id);
          return (
            <div key={product.id} className="bg-white border border-ink/10 rounded-brand p-4">
              <div className="flex items-center gap-4">
                <div
                  className="relative w-16 h-16 shrink-0 rounded-brand-sm overflow-hidden flex items-center justify-center"
                  style={{ background: `linear-gradient(160deg, ${product.colorHex}18, #fff)` }}
                >
                  <ProductThumb
                    image={product.images[0]}
                    imgClassName="w-full h-full object-cover"
                    fallbackClassName="w-full h-full p-2.5 text-ink"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-serif font-semibold truncate">{product.name}</p>
                  <p className="text-xs text-ink/50 mb-1">
                    {product.sku} · {product.color}
                  </p>
                  <p className="text-sm font-semibold">{formatCurrency(product.pricePerPackage)} / pkg</p>
                </div>
                {qty === 0 && (
                  <button
                    type="button"
                    onClick={() => setQuantity(product, 1)}
                    className="shrink-0 rounded-full bg-ink text-cream font-semibold text-sm px-5 py-3 active:scale-95 transition-transform"
                  >
                    Add
                  </button>
                )}
              </div>
              {qty > 0 && (
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-ink/10">
                  <span className="text-sm text-ink/50">In your order</span>
                  <QuantityStepper value={qty} onChange={(next) => setQuantity(product, next)} min={0} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile: dedicated sticky summary bar. Desktop already has the global floating cart button/drawer for this. */}
      {hasItems && (
        <div
          className="md:hidden fixed bottom-16 left-0 right-0 z-30 bg-cream/95 backdrop-blur-md border-t border-ink/10 px-5 py-4"
          style={{ paddingBottom: "calc(1rem + env(safe-area-inset-bottom))" }}
        >
          <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
            <div className="flex-1 flex items-baseline justify-between sm:justify-start sm:gap-4 text-sm">
              <span className="text-ink/60">
                {formatNumber(totals.totalPackages)} pkg · {formatNumber(totals.totalPairs)} pairs
              </span>
              <span className="font-serif text-lg font-semibold">{formatCurrency(totals.grandTotal)}</span>
            </div>
            <Button onClick={() => setOrderModalOpen(true)} className="w-full sm:w-auto shrink-0">
              Request Pro Forma Invoice
            </Button>
          </div>
        </div>
      )}

      <OrderModal isOpen={isOrderModalOpen} onClose={() => setOrderModalOpen(false)} />
    </div>
  );
}
