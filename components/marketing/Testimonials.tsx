import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/Reveal";
import { GhostMark } from "@/components/ui/GhostMark";

const TESTIMONIALS = [
  {
    quote: "Sample-to-shelf in under six weeks, and the QC pass rate has been flawless across three seasons.",
    author: "Alina Moreau",
    role: "Buyer, Rue Cabot Boutique, Lyon",
  },
  {
    quote: "Building the order online and getting a Pro Forma back the same day cut our lead time in half.",
    author: "Daniel Osei",
    role: "Owner, Kessington Footwear, Accra",
  },
  {
    quote: "Private label setup was painless — our branding was on the insoles by the second production run.",
    author: "Marisol Vega",
    role: "Merchandising Lead, Calle Nueve, Mexico City",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="relative overflow-hidden py-20 md:py-28 bg-cream-dim">
      <GhostMark mark="“" className="hidden lg:block -top-[8%] -left-[1%]" size="clamp(240px, 24vw, 340px)" opacity={0.05} />
      <div className="relative max-w-[1200px] mx-auto px-5 md:px-8">
        <SectionHead eyebrow="Trusted By Retailers" title="What our buyers say." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.author} delay={i * 0.05}>
              <figure className="flex flex-col h-full bg-white border border-ink/10 rounded-brand p-8 shadow-brand">
                <blockquote className="font-serif italic text-lg text-ink mb-6 leading-relaxed">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-auto flex items-center gap-3.5">
                  <span className="w-11 h-11 shrink-0 rounded-full bg-cream-dim flex items-center justify-center font-serif text-sm font-semibold">
                    {t.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                  <span className="text-sm text-ink/50">
                    <strong className="block text-ink font-semibold">{t.author}</strong>
                    {t.role}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
