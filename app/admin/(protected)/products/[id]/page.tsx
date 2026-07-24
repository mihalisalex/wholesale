import { notFound } from "next/navigation";
import { getProductById } from "@/lib/products";
import { getAllCollections } from "@/lib/collections";
import { ProductForm } from "@/components/admin/ProductForm";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) notFound();

  const collections = await getAllCollections();

  return (
    <div>
      <p className="text-[0.72rem] uppercase tracking-wider font-bold text-gold mb-2">Products</p>
      <h1 className="font-serif text-2xl font-semibold mb-8">Edit {product.name}</h1>
      <ProductForm initialProduct={product} collections={collections} />
    </div>
  );
}
