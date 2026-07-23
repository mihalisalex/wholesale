import Link from "next/link";
import { getAllProducts } from "@/lib/products";
import { getAllCollections } from "@/lib/collections";
import { formatCurrency } from "@/lib/format";

export default function AdminDashboardPage() {
  const products = getAllProducts();
  const collections = getAllCollections();
  const lowStock = products.filter((p) => p.stockStatus === "low-stock").length;
  const catalogValue = products.reduce((sum, p) => sum + p.pricePerPackage, 0);

  const stats = [
    { label: "Products", value: products.length, href: "/admin/products" },
    { label: "Collections", value: collections.length, href: "/admin/collections" },
    { label: "Low Stock", value: lowStock, href: "/admin/products" },
    { label: "Avg. Package Price", value: formatCurrency(catalogValue / (products.length || 1)), href: "/admin/products" },
  ];

  return (
    <div>
      <p className="text-[0.72rem] uppercase tracking-wider font-bold text-gold mb-2">Dashboard</p>
      <h1 className="font-serif text-2xl font-semibold mb-8">Welcome back</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white border border-ink/10 rounded-brand p-5 hover:border-gold transition-colors"
          >
            <p className="font-serif text-2xl font-semibold">{stat.value}</p>
            <p className="text-xs text-ink/50 mt-1">{stat.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/admin/products/new" className="bg-ink text-cream rounded-brand p-6 hover:bg-ink-soft transition-colors">
          <p className="font-serif text-lg font-semibold mb-1">Add a Product</p>
          <p className="text-sm text-cream/60">Create a new style with pricing, sizes and stock status.</p>
        </Link>
        <Link href="/admin/collections" className="bg-white border border-ink/10 rounded-brand p-6 hover:border-gold transition-colors">
          <p className="font-serif text-lg font-semibold mb-1">Manage Collections</p>
          <p className="text-sm text-ink/50">Add or rename the collections products can belong to.</p>
        </Link>
        <Link href="/admin/seo" className="bg-white border border-ink/10 rounded-brand p-6 hover:border-gold transition-colors">
          <p className="font-serif text-lg font-semibold mb-1">SEO Settings</p>
          <p className="text-sm text-ink/50">Edit page titles, descriptions and defaults.</p>
        </Link>
      </div>
    </div>
  );
}
