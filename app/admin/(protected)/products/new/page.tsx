import { getAllCollections } from "@/lib/collections";
import { ProductForm } from "@/components/admin/ProductForm";

export default function NewProductPage() {
  const collections = getAllCollections();

  return (
    <div>
      <p className="text-[0.72rem] uppercase tracking-wider font-bold text-gold mb-2">Products</p>
      <h1 className="font-serif text-2xl font-semibold mb-8">Add a Product</h1>
      <ProductForm collections={collections} />
    </div>
  );
}
