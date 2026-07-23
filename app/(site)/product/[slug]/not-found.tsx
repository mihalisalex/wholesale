import { Button } from "@/components/ui/Button";

export default function ProductNotFound() {
  return (
    <main className="max-w-[600px] mx-auto px-5 py-32 text-center">
      <h1 className="font-serif text-3xl font-semibold mb-3">Style not found</h1>
      <p className="text-ink/60 mb-8">This product may have been retired from the catalog.</p>
      <Button href="/catalog">Back to Catalog</Button>
    </main>
  );
}
