import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SectionHeadProps {
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
  center?: boolean;
  light?: boolean;
  className?: string;
}

export function SectionHead({ eyebrow, title, subtitle, center, light, className }: SectionHeadProps) {
  return (
    <div className={cn("max-w-xl mb-14", center && "mx-auto text-center", className)}>
      <p className="text-[0.78rem] uppercase tracking-[0.14em] font-bold mb-3.5 text-accent-3">{eyebrow}</p>
      <h2 className={cn("font-serif text-3xl md:text-4xl font-semibold", light ? "text-cream" : "text-ink")}>{title}</h2>
      {subtitle && <p className={cn("mt-4 text-base", light ? "text-cream/70" : "text-ink/60")}>{subtitle}</p>}
    </div>
  );
}
