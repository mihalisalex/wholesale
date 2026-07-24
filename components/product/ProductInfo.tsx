"use client";

import { useState } from "react";
import type { Product } from "@/types/product";
import { QuantityStepper } from "./QuantityStepper";
import { StickyMobileAddBar } from "./StickyMobileAddBar";
import { Button } from "@/components/ui/Button";
import { PriceLock } from "@/components/ui/PriceLock";
import { useCart } from "@/hooks/useCart";
import { useRetailer } from "@/hooks/useRetailer";
import { formatCurrency, formatPricePerPair, pairsForPackages } from "@/lib/format";
import { buildProductInquiryMessage, buildWhatsAppLink } from "@/lib/contact";

const STOCK_LABEL: Record<Product["stockStatus"], string> = {
  "in-stock": "In Stock",
  "low-stock": "Low Stock",
  "made-to-order": "Made to Order",
};

const STOCK_DOT: Record<Product["stockStatus"], string> = {
  "in-stock": "bg-accent-2",
  "low-stock": "bg-accent-3",
  "made-to-order": "bg-gold",
};

export function ProductInfo({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const { addItem } = useCart();
  const { isLoggedIn } = useRetailer();

  const pairs = pairsForPackages(quantity, product.packageSize);
  const total = quantity * product.pricePerPackage;

  function handleAdd() {
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
      quantity
    );
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs uppercase tracking-wide text-ink/40">{product.collection}</span>
        <span className="text-xs text-ink/30">·</span>
        <span className="text-xs uppercase tracking-wide text-ink/40">{product.sku}</span>
      </div>

      <h1 className="font-serif text-3xl md:text-4xl font-semibold mb-3">{product.name}</h1>

      <div className="flex items-center gap-2 mb-5">
        <span className="w-4 h-4 rounded-full border border-ink/15" style={{ backgroundColor: product.colorHex }} />
        <span className="text-sm text-ink/60">{product.color}</span>
        <span className="text-ink/30">·</span>
        <span className="flex items-center gap-1.5 text-sm text-ink/60">
          <span className={`w-1.5 h-1.5 rounded-full ${STOCK_DOT[product.stockStatus]}`} />
          {STOCK_LABEL[product.stockStatus]}
        </span>
      </div>

      <a
        href={buildWhatsAppLink(buildProductInquiryMessage(product))}
        target="_blank"
        rel="noopener noreferrer"
        className="md:hidden inline-flex items-center gap-2 text-sm font-semibold text-accent-2 mb-5"
      >
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.6-1.3A9 9 0 1 0 12 3Z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Ask about this product on WhatsApp
      </a>

      <p className="text-ink/60 mb-6 max-w-prose">{product.description}</p>

      <dl className="grid grid-cols-2 gap-y-3 gap-x-6 text-sm mb-6 border-y border-ink/10 py-5">
        <div>
          <dt className="text-ink/40 text-xs uppercase tracking-wide mb-0.5">Material</dt>
          <dd>{product.material}</dd>
        </div>
        <div>
          <dt className="text-ink/40 text-xs uppercase tracking-wide mb-0.5">Package Size</dt>
          <dd>{product.packageSize} pairs / package</dd>
        </div>
        <div className="col-span-2">
          <dt className="text-ink/40 text-xs uppercase tracking-wide mb-0.5">Available Sizes</dt>
          <dd>{product.sizes.join(", ")}</dd>
        </div>
        <div className="col-span-2">
          <dt className="text-ink/40 text-xs uppercase tracking-wide mb-0.5">Packaging</dt>
          <dd>{product.packagingInfo}</dd>
        </div>
      </dl>

      <div className="flex flex-wrap gap-2 mb-8">
        {product.tags.map((tag) => (
          <span key={tag} className="text-xs bg-cream-dim text-ink/60 rounded-full px-3 py-1 capitalize">
            {tag}
          </span>
        ))}
      </div>

      <div className="bg-cream-dim rounded-brand p-6">
        <div className="flex items-baseline justify-between mb-4">
          {isLoggedIn ? (
            <>
              <span className="font-serif text-2xl font-semibold">{formatCurrency(product.pricePerPackage)}</span>
              <span className="text-sm text-ink/50 text-right">
                / package (8 pairs)
                <br />
                {formatPricePerPair(product.pricePerPackage, product.packageSize)}
              </span>
            </>
          ) : (
            <PriceLock />
          )}
        </div>

        <div className="flex items-center justify-between mb-5">
          <QuantityStepper value={quantity} onChange={setQuantity} />
          <div className="text-right text-sm">
            {isLoggedIn ? (
              <p className="font-semibold">{formatCurrency(total)}</p>
            ) : (
              <PriceLock size="sm" />
            )}
            <p className="text-ink/50">
              {quantity} pkg · {pairs} pairs
            </p>
          </div>
        </div>

        <Button onClick={handleAdd} className="w-full">
          {justAdded ? "Added to Cart ✓" : "Add to Cart"}
        </Button>
      </div>

      <StickyMobileAddBar
        quantity={quantity}
        onQuantityChange={setQuantity}
        total={total}
        showTotal={isLoggedIn}
        justAdded={justAdded}
        onAdd={handleAdd}
      />
    </div>
  );
}
