import Link from "next/link";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/Reveal";
import { ProductLineArt, type ProductArtKey } from "@/components/icons/ProductLineArt";

const CATEGORIES: { label: string; category: string; art: ProductArtKey; description: string }[] = [
  { label: "Sneakers", category: "sneakers", art: "court", description: "Minimal leather court sneakers for everyday assortments." },
  { label: "Boots", category: "boots", art: "chelsea", description: "Chelsea and heeled ankle boots in leather and suede." },
  { label: "Loafers & Flats", category: "loafers", art: "penny", description: "Oxfords, penny loafers and ballet flats." },
  { label: "Heels", category: "heels", art: "stiletto", description: "Pointed-toe pumps built for evening assortments." },
  { label: "Sandals", category: "sandals", art: "strappy", description: "Heeled strappy sandals for resort and summer lines." },
];

export function CollectionsGrid() {
  return (
    <section id="collections" className="py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <SectionHead
          eyebrow="Catalog"
          title="Five categories, one standard of craft."
          subtitle="Every style is built for retail margins without compromising on materials — full-grain leathers, suede and metallics."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {CATEGORIES.map((c, i) => (
            <Reveal key={c.category} delay={i * 0.05}>
              <Link
                href={`/catalog?category=${c.category}`}
                className="flex sm:block items-center gap-5 sm:gap-0 bg-white border border-ink/10 rounded-brand p-5 sm:p-6 h-full transition-transform duration-300 ease-brand hover:-translate-y-1.5 hover:shadow-brand active:scale-[0.98]"
              >
                <div className="w-20 h-20 sm:w-auto sm:h-auto shrink-0 bg-cream-dim rounded-brand-sm p-3 sm:p-5 sm:mb-5 text-gold">
                  <ProductLineArt art={c.art} className="w-full h-auto" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold mb-1.5">{c.label}</h3>
                  <p className="text-sm text-ink/60">{c.description}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
