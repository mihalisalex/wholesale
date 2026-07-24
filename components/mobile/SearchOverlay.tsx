"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import type { Product } from "@/types/product";
import { searchProducts } from "@/lib/search";
import { formatCurrency } from "@/lib/format";
import { ProductThumb } from "@/components/product/ProductThumb";
import { PriceLock } from "@/components/ui/PriceLock";
import { useRetailer } from "@/hooks/useRetailer";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
}

export function SearchOverlay({ isOpen, onClose, products }: SearchOverlayProps) {
  const { isLoggedIn } = useRetailer();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- resets transient search text each time the overlay reopens
      setQuery("");
      const t = setTimeout(() => inputRef.current?.focus(), 250);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  const results = query.trim() ? searchProducts(products, query).slice(0, 20) : [];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Search the catalogue"
          className="md:hidden fixed inset-0 z-[205] bg-cream flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center gap-3 px-4 pt-[calc(1rem+env(safe-area-inset-top))] pb-4 border-b border-ink/10">
            <div className="relative flex-1">
              <svg
                viewBox="0 0 24 24"
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <circle cx="10.5" cy="10.5" r="6.5" />
                <path d="M20 20l-4.7-4.7" strokeLinecap="round" />
              </svg>
              <input
                ref={inputRef}
                type="search"
                inputMode="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search SKU, name, color, collection…"
                className="w-full rounded-full border border-ink/15 bg-white pl-11 pr-4 py-3.5 text-base focus:outline-none focus:border-gold"
              />
            </div>
            <button type="button" onClick={onClose} className="text-sm font-semibold text-ink/60 shrink-0 px-1 py-3.5">
              Cancel
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4">
            {query.trim() && results.length === 0 && (
              <p className="text-center text-ink/50 py-16">No styles match &ldquo;{query}&rdquo;.</p>
            )}
            {!query.trim() && <p className="text-center text-ink/40 py-16 text-sm">Start typing to search the catalogue.</p>}
            <div className="space-y-3">
              {results.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-4 bg-white border border-ink/10 rounded-brand p-3"
                >
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
                    <p className="text-xs text-ink/50">{product.sku} · {product.color}</p>
                  </div>
                  {isLoggedIn ? (
                    <p className="text-sm font-semibold shrink-0">{formatCurrency(product.pricePerPackage)}</p>
                  ) : (
                    <PriceLock size="sm" className="shrink-0" asLink={false} />
                  )}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
