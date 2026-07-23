import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/Reveal";

const STEPS = [
  { num: "01", title: "Browse the catalog", description: "Filter by category, color, material or collection to find your styles." },
  { num: "02", title: "Add packages to cart", description: "Each product is sold in fixed 8-pair packages — set your quantity per style." },
  { num: "03", title: "Request a quote", description: "Submit your company and shipping details — no account or payment required." },
  { num: "04", title: "Receive your Pro Forma", description: "We email a Pro Forma Invoice PDF within 24 hours, to you and our team." },
  { num: "05", title: "Confirm and pay by transfer", description: "Approve the quote and pay by bank transfer to begin production and shipping." },
];

export function ProcessSteps() {
  return (
    <section id="process" className="py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <SectionHead eyebrow="How It Works" title="From browsing to Pro Forma, in five steps." />
        <ol className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
          {STEPS.map((step, i) => (
            <Reveal key={step.num} delay={i * 0.05}>
              <li className="pt-6 border-t border-ink/10">
                <span className="block font-serif italic text-xl text-gold mb-3.5">{step.num}</span>
                <h3 className="font-serif text-base font-semibold mb-1.5">{step.title}</h3>
                <p className="text-sm text-ink/60">{step.description}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
