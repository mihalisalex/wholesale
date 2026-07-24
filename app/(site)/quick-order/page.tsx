import type { Metadata } from "next";
import { getAllProducts, getFilterOptions } from "@/lib/products";
import { QuickOrderClient } from "@/components/quick-order/QuickOrderClient";

export const metadata: Metadata = {
  title: "Quick Order",
  description: "Already know what you need? Search by SKU or style name and send a Pro Forma Invoice request in under a minute.",
};

export default function QuickOrderPage() {
  const products = getAllProducts();
  const options = getFilterOptions();

  return (
    <main className="max-w-2xl mx-auto px-5 md:px-8 py-10 md:py-16">
      <QuickOrderClient products={products} options={options} />
    </main>
  );
}
