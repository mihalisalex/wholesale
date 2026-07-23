import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllProducts, getProductBySlug, getRelatedProducts } from "@/lib/products";
import { Gallery } from "@/components/product/Gallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { RelatedProducts } from "@/components/product/RelatedProducts";

export async function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };
  // Plain strings here (not `{ absolute: ... }`) so the root layout's
  // title.template still applies its " — Hervé Footwear" suffix.
  return {
    title: product.metaTitle || product.name,
    description: product.metaDescription || product.description,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);

  return (
    <main>
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <Gallery images={product.images} colorHex={product.colorHex} />
          <ProductInfo product={product} />
        </div>
      </div>
      <RelatedProducts products={related} />
    </main>
  );
}
