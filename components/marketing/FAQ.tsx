import { siteConfig } from "@/config/site.config";
import { SectionHead } from "@/components/ui/SectionHead";

export function FAQ() {
  const shippingMethods = siteConfig.shipping.methods.map((m) => m.label).join(", ");

  const items = [
    {
      q: "Do I need an account to place an order?",
      a: "Yes, and it takes under a minute — company name, contact details and shipping address. No card details, ever. Once it's saved, every order after that is a single confirm.",
    },
    {
      q: "What's the minimum order?",
      a: siteConfig.commerce.minOrderPackagesNote,
    },
    {
      q: "How is footwear shipped?",
      a: `We ship on ${shippingMethods} terms. Estimated lead time: ${siteConfig.shipping.estimatedLeadTime}`,
    },
    {
      q: "How do I pay?",
      a: siteConfig.terms.paymentTerms,
    },
    {
      q: "Can I get private label packaging?",
      a: "Yes — your branding on boxes and insoles, with no minimum tooling fee on core styles.",
    },
    {
      q: "How quickly will I get my quote?",
      a: "We email a Pro Forma Invoice PDF within 24 hours of your request, addressed to you and our wholesale team.",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-cream-dim">
      <div className="max-w-[820px] mx-auto px-5 md:px-8">
        <SectionHead eyebrow="FAQ" title="Common questions." center />
        <div>
          {items.map((item) => (
            <details key={item.q} className="group border-b border-ink/10 py-6">
              <summary className="flex items-center justify-between gap-6 cursor-pointer list-none font-serif text-lg font-semibold">
                {item.q}
                <span className="relative shrink-0 w-6 h-6 rounded-full border border-ink/20">
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-px bg-ink" />
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-2.5 bg-ink transition-opacity group-open:opacity-0" />
                </span>
              </summary>
              <p className="mt-4 text-sm md:text-base text-ink/60 leading-relaxed max-w-[64ch]">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
