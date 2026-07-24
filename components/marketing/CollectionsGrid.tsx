import Link from "next/link";
import Image from "next/image";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/Reveal";

const CATEGORIES: { label: string; category: string; photoUrl: string; description: string }[] = [
  {
    label: "Sneakers",
    category: "sneakers",
    photoUrl: "https://images.unsplash.com/photo-1561282109-3a8f490997cc",
    description: "Minimal leather court sneakers for everyday assortments.",
  },
  {
    label: "Boots",
    category: "boots",
    photoUrl: "https://images.unsplash.com/photo-1777987601677-3059be0e1388",
    description: "Chelsea and heeled ankle boots in leather and suede.",
  },
  {
    label: "Loafers & Flats",
    category: "loafers",
    photoUrl: "https://images.unsplash.com/photo-1777987601447-266e128de448",
    description: "Oxfords, penny loafers and ballet flats.",
  },
  {
    label: "Heels",
    category: "heels",
    photoUrl: "https://images.unsplash.com/photo-1618274158630-bc47a614b3a5",
    description: "Pointed-toe pumps built for evening assortments.",
  },
  {
    label: "Sandals",
    category: "sandals",
    photoUrl: "https://images.unsplash.com/photo-1784821926276-401342334349",
    description: "Heeled strappy sandals for resort and summer lines.",
  },
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
                <div className="relative w-20 h-20 sm:w-full sm:h-36 shrink-0 rounded-brand-sm sm:mb-5 overflow-hidden">
                  <Image
                    src={c.photoUrl}
                    alt={c.label}
                    fill
                    sizes="(max-width: 640px) 80px, (max-width: 1024px) 50vw, 20vw"
                    className="object-cover"
                  />
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
