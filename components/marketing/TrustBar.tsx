import { StatCounter } from "@/components/ui/StatCounter";
import { GhostMark } from "@/components/ui/GhostMark";

const STATS = [
  { target: 15, label: "Years in Trade" },
  { target: 32, label: "Countries Served" },
  { target: 480, label: "Retail Partners" },
  { target: 16, label: "Styles Live" },
];

export function TrustBar() {
  return (
    <section aria-label="Company statistics" className="relative overflow-hidden py-20 md:py-28 bg-ink">
      <GhostMark tone="cream" className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" size="clamp(280px, 30vw, 420px)" />
      <div className="relative max-w-[1200px] mx-auto px-5 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-y-14 gap-x-8 md:gap-6">
        {STATS.map((stat) => (
          <StatCounter key={stat.label} dark {...stat} />
        ))}
      </div>
    </section>
  );
}
