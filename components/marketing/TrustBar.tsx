import { StatCounter } from "@/components/ui/StatCounter";

const STATS = [
  { target: 15, label: "Years in Trade" },
  { target: 32, label: "Countries Served" },
  { target: 480, label: "Retail Partners" },
  { target: 16, label: "Styles Live" },
];

export function TrustBar() {
  return (
    <section aria-label="Company statistics" className="py-14 md:py-16">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
        {STATS.map((stat) => (
          <StatCounter key={stat.label} {...stat} />
        ))}
      </div>
    </section>
  );
}
