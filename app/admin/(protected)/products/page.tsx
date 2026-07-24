import Link from "next/link";
import { getAllProducts } from "@/lib/products";
import { ProductsTable } from "@/components/admin/ProductsTable";
import { Button } from "@/components/ui/Button";

export default async function AdminProductsPage() {
  const products = [...(await getAllProducts())].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-[0.72rem] uppercase tracking-wider font-bold text-gold mb-2">Catalog</p>
          <h1 className="font-serif text-2xl font-semibold">Products</h1>
        </div>
        <Button href="/admin/products/new" size="sm">
          Add Product
        </Button>
      </div>
      <ProductsTable products={products} />
      <p className="text-xs text-ink/40 mt-4">
        Changes here apply to the live catalog immediately —{" "}
        <Link href="/catalog" target="_blank" className="underline">
          view the public catalog
        </Link>
        .
      </p>
    </div>
  );
}
