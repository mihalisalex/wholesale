import Link from "next/link";
import { ProductLineArt, type ProductArtKey } from "@/components/icons/ProductLineArt";
import { formatCurrency } from "@/lib/format";
import type { Product } from "@/types/product";

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

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block bg-white border border-ink/10 rounded-brand overflow-hidden transition-transform duration-300 ease-brand hover:-translate-y-1.5 hover:shadow-brand"
    >
      <div className="relative p-8 sm:p-6" style={{ background: `linear-gradient(160deg, ${product.colorHex}14, #fff)` }}>
        {product.isNewArrival && (
          <span className="absolute top-4 left-4 text-[0.65rem] font-bold uppercase tracking-wide bg-ink text-cream rounded-full px-2.5 py-1">
            New
          </span>
        )}
        <span className="absolute top-4 right-4 text-[0.65rem] font-bold uppercase tracking-wide bg-white/80 text-ink rounded-full px-2.5 py-1">
          {product.gender === "men" ? "Men's" : product.gender === "women" ? "Women's" : "Unisex"}
        </span>
        <ProductLineArt art={product.images[0]?.art as ProductArtKey} className="w-full h-40 sm:h-28 text-ink" />
      </div>
      <div className="p-5">
        <p className="text-[0.68rem] uppercase tracking-wide text-ink/40 mb-1">{product.collection}</p>
        <h3 className="font-serif text-lg sm:text-base font-semibold mb-1 group-hover:text-gold transition-colors">{product.name}</h3>
        <p className="text-sm sm:text-xs text-ink/55 mb-3">{product.material}</p>
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-1.5 text-ink/60">
            <span className={`w-1.5 h-1.5 rounded-full ${STOCK_DOT[product.stockStatus]}`} />
            {STOCK_LABEL[product.stockStatus]}
          </span>
          <span className="font-serif text-lg sm:text-base font-semibold">{formatCurrency(product.pricePerPackage)}</span>
        </div>
        <p className="text-[0.7rem] text-ink/40 mt-1">per 8-pair package</p>
      </div>
    </Link>
  );
}
