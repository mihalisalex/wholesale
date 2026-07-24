"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Product } from "@/types/product";
import { ProductThumb } from "@/components/product/ProductThumb";
import { QuantityStepper } from "@/components/product/QuantityStepper";
import { PriceLock } from "@/components/ui/PriceLock";
import { useRetailer } from "@/hooks/useRetailer";
import { formatCurrency, formatPricePerPair } from "@/lib/format";

interface QuickViewModalProps {
  product: Product | null;
  quantity: number;
  onQuantityChange: (next: number) => void;
  onClose: () => void;
}

export function QuickViewModal({ product, quantity, onQuantityChange, onClose }: QuickViewModalProps) {
  const { isLoggedIn } = useRetailer();

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            className="fixed inset-0 bg-ink/50 z-[215]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${product.name} quick view`}
            className="fixed inset-x-0 bottom-0 md:inset-0 z-[220] md:flex md:items-center md:justify-center md:p-4"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="bg-cream rounded-t-brand md:rounded-brand shadow-brand w-full md:max-w-md md:mx-auto max-h-[88vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full aspect-square bg-cream-dim" style={{ background: `linear-gradient(160deg, ${product.colorHex}18, #fff)` }}>
                <ProductThumb
                  image={product.images[0]}
                  sizes="(max-width: 768px) 100vw, 448px"
                  imgClassName="w-full h-full object-cover"
                  fallbackClassName="w-full h-full p-12 text-ink"
                />
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close quick view"
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow-brand"
                >
                  ✕
                </button>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs uppercase tracking-wide text-ink/40">{product.collection}</span>
                  <span className="text-xs text-ink/30">·</span>
                  <span className="text-xs uppercase tracking-wide text-ink/40">{product.sku}</span>
                </div>
                <h2 className="font-serif text-xl font-semibold mb-1">{product.name}</h2>
                <p className="text-sm text-ink/50 mb-3">{product.color} · {product.material}</p>
                <p className="text-sm text-ink/70 mb-5">{product.description}</p>

                <div className="flex items-center justify-between bg-cream-dim rounded-brand-sm p-4">
                  <div>
                    {isLoggedIn ? (
                      <>
                        <p className="font-serif text-lg font-semibold">{formatCurrency(product.pricePerPackage)}</p>
                        <p className="text-xs text-ink/50">
                          / package ({product.packageSize} pairs) · {formatPricePerPair(product.pricePerPackage, product.packageSize)}
                        </p>
                      </>
                    ) : (
                      <PriceLock />
                    )}
                  </div>
                  <QuantityStepper value={quantity} onChange={onQuantityChange} min={0} />
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
