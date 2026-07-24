import { Button } from "@/components/ui/Button";
import { GhostMark } from "@/components/ui/GhostMark";

export default function NotFound() {
  return (
    <main className="relative overflow-hidden max-w-[760px] mx-auto px-5 py-32 text-center">
      <GhostMark className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" size="clamp(220px, 30vw, 320px)" />
      <div className="relative">
        <p className="text-[0.78rem] uppercase tracking-[0.14em] font-bold text-accent-3 mb-3.5">404</p>
        <h1 className="font-serif text-3xl md:text-4xl font-semibold mb-4">Page not found.</h1>
        <p className="text-ink/60 max-w-[46ch] mx-auto mb-8">
          The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved. Try the catalog, or head back home.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button href="/catalog">Browse Catalog</Button>
          <Button href="/" variant="ghost">
            Back Home
          </Button>
        </div>
      </div>
    </main>
  );
}
