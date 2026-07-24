import { SectionHead } from "@/components/ui/SectionHead";
import { GhostMark } from "@/components/ui/GhostMark";

const FEATURES = [
  {
    title: "8-Pair Packages",
    description: "Every product is sold in fixed 8-pair wholesale packages — simple, predictable case-pack math.",
    icon: (
      <>
        <rect x="8" y="8" width="24" height="24" rx="4" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <path d="M14 20h12M20 14v12" stroke="currentColor" strokeWidth="1.4" />
      </>
    ),
  },
  {
    title: "Private Label",
    description: "Your branding on boxes and insoles, no minimum tooling fees on core styles.",
    icon: <path d="M8 28 L20 10 L32 28 Z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />,
  },
  {
    title: "Instant Quotation",
    description: "Build your order online and receive a Pro Forma Invoice by email within 24 hours.",
    icon: (
      <>
        <circle cx="20" cy="20" r="12" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <path d="M20 13v7l5 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: "Quality Certified",
    description: "Every batch is QC-inspected against ISO 9001 standards before it leaves the factory.",
    icon: (
      <>
        <path d="M20 6 L34 13 V22 C34 29 28 34 20 36 C12 34 6 29 6 22 V13 Z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M14 20l4 4 8-8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    title: "Global Shipping",
    description: "FOB, EXW or DDP terms to 32 countries, with freight-forwarder partners on file.",
    icon: (
      <>
        <circle cx="20" cy="20" r="14" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <path d="M6 20h28M20 6c4 4 6 9 6 14s-2 10-6 14c-4-4-6-9-6-14s2-10 6-14z" fill="none" stroke="currentColor" strokeWidth="1.2" />
      </>
    ),
  },
  {
    title: "Your Details, Saved",
    description: "Create a free account once — every Pro Forma Invoice request after that is a single confirm.",
    icon: (
      <>
        <circle cx="15" cy="15" r="5" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="27" cy="15" r="5" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <path d="M6 33c1-6 6-9 9-9s5 1 6 3c1-2 3-3 6-3s8 3 9 9" fill="none" stroke="currentColor" strokeWidth="1.4" />
      </>
    ),
  },
];

export function WhyWholesale() {
  return (
    <section id="why" className="relative overflow-hidden py-20 md:py-28 bg-ink text-cream">
      <GhostMark tone="cream" className="hidden lg:block -bottom-[12%] -left-[3%]" size="clamp(240px, 24vw, 340px)" />
      <div className="relative max-w-[1200px] mx-auto px-5 md:px-8">
        <SectionHead eyebrow="Why Wholesale With Us" title="Everything a retail buyer actually asks for." light />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="bg-white/[0.04] border border-cream/10 rounded-brand p-8 md:p-9 transition-all duration-300 ease-brand hover:-translate-y-1.5 hover:bg-white/[0.07] hover:border-cream/20"
            >
              <span className="inline-flex w-14 h-14 rounded-brand-sm bg-cream/10 items-center justify-center mb-6">
                <svg viewBox="0 0 40 40" className="w-7 h-7 text-accent-3">
                  {f.icon}
                </svg>
              </span>
              <h3 className="font-serif text-lg font-semibold text-cream mb-2">{f.title}</h3>
              <p className="text-sm text-cream/60 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
