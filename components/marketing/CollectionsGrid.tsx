import Link from "next/link";
import Image from "next/image";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/Reveal";
import { GhostMark } from "@/components/ui/GhostMark";

const CATEGORIES: { label: string; initial: string; category: string; photoUrl: string; description: string }[] = [
  {
    label: "Sneakers",
    initial: "S",
    category: "sneakers",
    photoUrl: "https://images.unsplash.com/photo-1561282109-3a8f490997cc",
    description: "Minimal leather court sneakers for everyday assortments.",
  },
  {
    label: "Boots",
    initial: "B",
    category: "boots",
    photoUrl: "https://images.unsplash.com/photo-1777987601677-3059be0e1388",
    description: "Chelsea and heeled ankle boots in leather and suede.",
  },
  {
    label: "Loafers & Flats",
    initial: "L",
    category: "loafers",
    photoUrl: "https://images.unsplash.com/photo-1777987601447-266e128de448",
    description: "Oxfords, penny loafers and ballet flats.",
  },
  {
    label: "Heels",
    initial: "H",
    category: "heels",
    photoUrl: "https://images.unsplash.com/photo-1618274158630-bc47a614b3a5",
    description: "Pointed-toe pumps built for evening assortments.",
  },
  {
    label: "Sandals",
    initial: "S",
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

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
          {CATEGORIES.map((c, i) => (
            <Reveal key={c.category} delay={i * 0.05} className={i === CATEGORIES.length - 1 ? "col-span-2 lg:col-span-1" : undefined}>
              <Link
                href={`/catalog?category=${c.category}`}
                className="group relative block aspect-[3/4] rounded-brand overflow-hidden border border-ink/10 shadow-brand"
              >
                <Image
                  src={c.photoUrl}
                  alt={c.label}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover transition-transform duration-500 ease-brand group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                <GhostMark mark={c.initial} tone="cream" opacity={0.16} className="-bottom-[6%] -right-[4%]" size="clamp(120px, 13vw, 180px)" />
                <div className="absolute inset-x-0 bottom-0 p-4 md:p-6">
                  <h3 className="font-serif text-lg md:text-xl font-semibold text-cream mb-1">{c.label}</h3>
                  <p className="text-xs md:text-sm text-cream/70 leading-snug hidden sm:block">{c.description}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
