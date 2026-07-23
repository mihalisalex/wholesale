import { Suspense } from "react";
import type { Metadata } from "next";
import { getAllProducts, getFilterOptions } from "@/lib/products";
import { CatalogClient } from "@/components/catalog/CatalogClient";
import { getSeoSettings } from "@/lib/seo";

export function generateMetadata(): Metadata {
  const seo = getSeoSettings();
  return { title: seo.pages.catalog.title, description: seo.pages.catalog.description };
}

export default function CatalogPage() {
  const products = getAllProducts();
  const options = getFilterOptions();

  return (
    <main className="max-w-[1200px] mx-auto px-5 md:px-8 py-14 md:py-20">
      <div className="mb-10">
        <p className="text-[0.78rem] uppercase tracking-[0.14em] font-bold text-gold mb-2">Catalog</p>
        <h1 className="font-serif text-3xl md:text-4xl font-semibold">Full Wholesale Catalog</h1>
      </div>
      <Suspense fallback={<div className="py-24 text-center text-ink/40">Loading catalog…</div>}>
        <CatalogClient products={products} options={options} />
      </Suspense>
    </main>
  );
}
