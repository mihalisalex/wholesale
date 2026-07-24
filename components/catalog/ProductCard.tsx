import Link from "next/link";
import { ProductThumb } from "@/components/product/ProductThumb";
import { formatCurrency, formatPricePerPair } from "@/lib/format";
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

function sizeRange(sizes: string[]): string {
  if (sizes.length === 0) return "";
  const numeric = sizes.map((s) => ({ raw: s, n: parseInt(s.replace(/[^\d]/g, ""), 10) })).sort((a, b) => a.n - b.n);
  const prefix = numeric[0].raw.replace(/[\d]+$/, "").trim();
  return `${prefix} ${numeric[0].n}–${numeric[numeric.length - 1].n}`;
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block bg-white border border-ink/10 rounded-brand overflow-hidden transition-transform duration-300 ease-brand hover:-translate-y-1.5 hover:shadow-brand"
    >
      <div
        className="relative aspect-[4/3] sm:aspect-square overflow-hidden"
        style={{ background: `linear-gradient(160deg, ${product.colorHex}14, #fff)` }}
      >
        {product.isNewArrival && (
          <span className="absolute top-4 left-4 z-10 text-[0.65rem] font-bold uppercase tracking-wide bg-ink text-cream rounded-full px-2.5 py-1">
            New
          </span>
        )}
        <span className="absolute top-4 right-4 z-10 text-[0.65rem] font-bold uppercase tracking-wide bg-white/80 text-ink rounded-full px-2.5 py-1">
          {product.gender === "men" ? "Men's" : product.gender === "women" ? "Women's" : "Unisex"}
        </span>
        <ProductThumb
          image={product.images[0]}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          imgClassName="w-full h-full object-cover transition-transform duration-500 ease-brand group-hover:scale-105"
          fallbackClassName="w-full h-full p-8 sm:p-6 text-ink"
        />
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between mb-1">
          <p className="text-[0.68rem] uppercase tracking-wide text-ink/40">{product.collection}</p>
          <span className="text-[0.6rem] font-bold uppercase tracking-wide text-accent-3">Wholesale</span>
        </div>
        <h3 className="font-serif text-lg sm:text-base font-semibold mb-1 group-hover:text-gold transition-colors">{product.name}</h3>
        <p className="text-sm sm:text-xs text-ink/55 mb-1">{product.material}</p>
        <p className="text-[0.7rem] text-ink/45 mb-3">Sizes {sizeRange(product.sizes)}</p>
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-1.5 text-ink/60">
            <span className={`w-1.5 h-1.5 rounded-full ${STOCK_DOT[product.stockStatus]}`} />
            {STOCK_LABEL[product.stockStatus]}
          </span>
          <span className="text-right">
            <span className="block font-serif text-lg sm:text-base font-semibold leading-tight">
              {formatCurrency(product.pricePerPackage)}
            </span>
            <span className="block text-[0.68rem] text-ink/45 leading-tight">{formatPricePerPair(product.pricePerPackage, product.packageSize)}</span>
          </span>
        </div>
        <p className="text-[0.7rem] text-ink/40 mt-1">MOQ: 1 package (8 pairs)</p>
      </div>
    </Link>
  );
}
