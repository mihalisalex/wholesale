"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatCurrency, formatPricePerPair } from "@/lib/format";
import type { Product } from "@/types/product";

const STOCK_DOT: Record<Product["stockStatus"], string> = {
  "in-stock": "bg-accent-2",
  "low-stock": "bg-accent-3",
  "made-to-order": "bg-gold",
};

export function ProductsTable({ products }: { products: Product[] }) {
  const router = useRouter();
  const [pendingId, setPendingId] = useState<string | null>(null);

  async function handleDelete(product: Product) {
    if (!confirm(`Delete "${product.name}"? This can't be undone.`)) return;
    setPendingId(product.id);
    try {
      const res = await fetch(`/api/admin/products/${product.id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        alert(data.message ?? "Could not delete product.");
        return;
      }
      router.refresh();
    } finally {
      setPendingId(null);
    }
  }

  if (products.length === 0) {
    return <p className="text-sm text-ink/50 py-10 text-center">No products yet — add your first one.</p>;
  }

  return (
    <div className="bg-white border border-ink/10 rounded-brand overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-ink/10 text-left text-xs uppercase tracking-wide text-ink/40">
            <th className="px-5 py-3 font-medium">Product</th>
            <th className="px-5 py-3 font-medium">SKU</th>
            <th className="px-5 py-3 font-medium">Category</th>
            <th className="px-5 py-3 font-medium">Price</th>
            <th className="px-5 py-3 font-medium">Stock</th>
            <th className="px-5 py-3 font-medium" />
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b border-ink/5 last:border-none hover:bg-cream-dim/50">
              <td className="px-5 py-3">
                <p className="font-medium">{product.name}</p>
                <p className="text-xs text-ink/40">{product.collection}</p>
              </td>
              <td className="px-5 py-3 text-ink/60">{product.sku}</td>
              <td className="px-5 py-3 text-ink/60 capitalize">{product.category}</td>
              <td className="px-5 py-3">
                <p>{formatCurrency(product.pricePerPackage)}</p>
                <p className="text-xs text-ink/40">{formatPricePerPair(product.pricePerPackage, product.packageSize)}</p>
              </td>
              <td className="px-5 py-3">
                <span className="inline-flex items-center gap-1.5 text-xs text-ink/60">
                  <span className={`w-1.5 h-1.5 rounded-full ${STOCK_DOT[product.stockStatus]}`} />
                  {product.stockStatus}
                </span>
              </td>
              <td className="px-5 py-3 text-right whitespace-nowrap">
                <Link href={`/admin/products/${product.id}`} className="text-xs text-gold font-semibold mr-4">
                  Edit
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(product)}
                  disabled={pendingId === product.id}
                  className="text-xs text-accent-3 font-semibold disabled:opacity-50"
                >
                  {pendingId === product.id ? "Deleting…" : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
