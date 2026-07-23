import type { Product } from "@/types/product";

export function searchProducts(products: Product[], query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter((p) =>
    `${p.name} ${p.sku} ${p.color} ${p.collection} ${p.category} ${p.material} ${p.tags.join(" ")}`
      .toLowerCase()
      .includes(q)
  );
}
