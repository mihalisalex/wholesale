"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/types/product";
import type { FilterOptions } from "@/lib/products";
import { searchProducts } from "@/lib/search";
import { formatCurrency, formatNumber, formatPricePerPair } from "@/lib/format";
import { useCart } from "@/hooks/useCart";
import { QuantityStepper } from "@/components/product/QuantityStepper";
import { Button } from "@/components/ui/Button";
import { ProductThumb } from "@/components/product/ProductThumb";
import { OrderModal } from "@/components/order/OrderModal";
import { QuickViewModal } from "./QuickViewModal";
import { MobileFilterSheet } from "@/components/catalog/MobileFilterSheet";
import type { CatalogFilters } from "@/components/catalog/FilterSidebar";

function emptyFilters(options: FilterOptions): CatalogFilters {
  return {
    category: [],
    color: [],
    material: [],
    size: [],
    collection: [],
    gender: [],
    newArrivalsOnly: false,
    minPrice: options.priceRange.min,
    maxPrice: options.priceRange.max,
  };
}

export function QuickOrderClient({ products, options }: { products: Product[]; options: FilterOptions }) {
  const [query, setQuery] = useState("");
  const [isOrderModalOpen, setOrderModalOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isFilterSheetOpen, setFilterSheetOpen] = useState(false);
  const [filters, setFilters] = useState<CatalogFilters>(() => emptyFilters(options));
  const { state, totals, addItem, updateQuantity } = useCart();

  const activeFilterCount =
    filters.category.length +
    filters.color.length +
    filters.material.length +
    filters.size.length +
    filters.collection.length +
    filters.gender.length +
    (filters.newArrivalsOnly ? 1 : 0) +
    (filters.minPrice !== options.priceRange.min ? 1 : 0) +
    (filters.maxPrice !== options.priceRange.max ? 1 : 0);

  const results = useMemo(() => {
    const searched = query.trim() ? searchProducts(products, query) : products;
    return searched.filter((p) => {
      if (filters.category.length && !filters.category.includes(p.category)) return false;
      if (filters.color.length && !filters.color.includes(p.color)) return false;
      if (filters.material.length && !filters.material.includes(p.material)) return false;
      if (filters.size.length && !filters.size.some((s) => p.sizes.includes(s))) return false;
      if (filters.collection.length && !filters.collection.includes(p.collection)) return false;
      if (filters.gender.length && !filters.gender.includes(p.gender)) return false;
      if (filters.newArrivalsOnly && !p.isNewArrival) return false;
      if (p.pricePerPackage < filters.minPrice || p.pricePerPackage > filters.maxPrice) return false;
      return true;
    });
  }, [products, query, filters]);

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
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <p className="text-[0.7rem] uppercase tracking-[0.14em] font-bold text-gold mb-1.5">Repeat Buyers</p>
          <h1 className="font-serif text-xl md:text-4xl font-semibold">Quick Order</h1>
        </div>
        <button
          type="button"
          onClick={() => setFilterSheetOpen(true)}
          className="md:hidden shrink-0 inline-flex items-center gap-2 rounded-full border border-ink/20 px-4 py-2.5 text-sm font-semibold mt-1"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M4 6h16M7 12h10M10 18h4" strokeLinecap="round" />
          </svg>
          Filters
          {activeFilterCount > 0 && (
            <span className="bg-ink text-cream text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

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

      {results.length === 0 && (
        <p className="text-center text-ink/50 py-16">
          {query.trim() ? <>No styles match &ldquo;{query}&rdquo;.</> : "No styles match those filters."}
        </p>
      )}

      <div className="bg-white border border-ink/10 rounded-brand divide-y divide-ink/10 overflow-hidden">
        {results.map((product) => {
          const qty = quantityFor(product.id);
          return (
            <div key={product.id} className="flex items-center gap-3 px-3 py-4">
              <button
                type="button"
                onClick={() => setQuickViewProduct(product)}
                className="flex flex-1 items-center gap-3 min-w-0 text-left active:opacity-70 transition-opacity"
              >
                <div
                  className="relative w-16 h-16 shrink-0 rounded-brand-sm overflow-hidden flex items-center justify-center"
                  style={{ background: `linear-gradient(160deg, ${product.colorHex}18, #fff)` }}
                >
                  <ProductThumb
                    image={product.images[0]}
                    sizes="64px"
                    imgClassName="w-full h-full object-cover"
                    fallbackClassName="w-full h-full p-2 text-ink"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-serif font-semibold text-sm truncate">{product.name}</p>
                  <p className="text-xs text-ink/50 truncate">
                    {product.sku} · {formatCurrency(product.pricePerPackage)}/pkg ·{" "}
                    {formatPricePerPair(product.pricePerPackage, product.packageSize)}
                  </p>
                </div>
              </button>
              <QuantityStepper size="sm" value={qty} onChange={(next) => setQuantity(product, next)} min={0} />
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

      <QuickViewModal
        product={quickViewProduct}
        quantity={quickViewProduct ? quantityFor(quickViewProduct.id) : 0}
        onQuantityChange={(next) => quickViewProduct && setQuantity(quickViewProduct, next)}
        onClose={() => setQuickViewProduct(null)}
      />

      <MobileFilterSheet
        isOpen={isFilterSheetOpen}
        onClose={() => setFilterSheetOpen(false)}
        options={options}
        filters={filters}
        onChange={setFilters}
        onReset={() => setFilters(emptyFilters(options))}
        resultCount={results.length}
      />
    </div>
  );
}
