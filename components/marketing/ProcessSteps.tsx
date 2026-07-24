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
        <ol className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-x-6 gap-y-12">
          <div className="hidden md:block absolute top-7 left-[10%] right-[10%] h-px bg-ink/10" aria-hidden="true" />
          {STEPS.map((step, i) => (
            <Reveal key={step.num} delay={i * 0.05}>
              <li className="text-center md:text-left">
                <span className="relative z-10 mx-auto md:mx-0 mb-5 flex w-14 h-14 items-center justify-center rounded-full bg-white border border-ink/10 shadow-brand font-serif text-lg font-semibold">
                  {step.num}
                </span>
                <h3 className="font-serif text-base font-semibold mb-1.5">{step.title}</h3>
                <p className="text-sm text-ink/60 max-w-[24ch] mx-auto md:mx-0">{step.description}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
