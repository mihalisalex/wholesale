import type { Metadata } from "next";
import { getAllProducts } from "@/lib/products";
import { QuickOrderClient } from "@/components/quick-order/QuickOrderClient";

export const metadata: Metadata = {
  title: "Quick Order",
  description: "Already know what you need? Search by SKU or style name and send a Pro Forma Invoice request in under a minute.",
};

export default function QuickOrderPage() {
  const products = getAllProducts();

  return (
    <main className="max-w-2xl mx-auto px-5 md:px-8 py-10 md:py-16">
      <div className="mb-5">
        <p className="text-[0.7rem] uppercase tracking-[0.14em] font-bold text-gold mb-1.5">Repeat Buyers</p>
        <h1 className="font-serif text-xl md:text-4xl font-semibold">Quick Order</h1>
      </div>
      <QuickOrderClient products={products} />
    </main>
  );
}
