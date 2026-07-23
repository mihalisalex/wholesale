import type { Product } from "@/types/product";
import { ProductCard } from "@/components/catalog/ProductCard";
import { SectionHead } from "@/components/ui/SectionHead";

export function RelatedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <section className="max-w-[1200px] mx-auto px-5 md:px-8 py-16 md:py-20 border-t border-ink/10">
      <SectionHead eyebrow="You May Also Like" title="Related styles" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
