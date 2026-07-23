import { getAllCollections } from "@/lib/collections";
import { CollectionsManager } from "@/components/admin/CollectionsManager";

export default function AdminCollectionsPage() {
  const collections = getAllCollections();

  return (
    <div>
      <p className="text-[0.72rem] uppercase tracking-wider font-bold text-gold mb-2">Catalog</p>
      <h1 className="font-serif text-2xl font-semibold mb-8">Collections</h1>
      <CollectionsManager collections={collections} />
    </div>
  );
}
