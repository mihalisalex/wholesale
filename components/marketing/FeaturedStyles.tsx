import { getAllProducts } from "@/lib/products";
import { ProductCard } from "@/components/catalog/ProductCard";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export async function FeaturedStyles() {
  const products = await getAllProducts();
  const featured = products.filter((p) => p.tags.includes("bestseller")).slice(0, 8);

  return (
    <section className="py-20 md:py-28 bg-cream-dim">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <SectionHead
          eyebrow="Featured Styles"
          title="Our top reorders, ready to sample."
          subtitle="A first look at the catalog — full spec sheets, sizing and sample pricing available on every product page."
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6 mb-10">
          {featured.map((product, i) => (
            <Reveal key={product.id} delay={i * 0.04}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>

        <div className="text-center">
          <Button href="/catalog" variant="ghost">
            View Full Catalog
          </Button>
        </div>
      </div>
    </section>
  );
}
