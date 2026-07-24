"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface StatCounterProps {
  target: number;
  label: string;
  dark?: boolean;
}

export function StatCounter({ target, label, dark }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1400;
    const start = performance.now();

    let raf: number;
    function step(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [isInView, target]);

  return (
    <div ref={ref} className="text-center">
      <span className={`block font-serif text-5xl md:text-6xl lg:text-7xl font-semibold leading-none ${dark ? "text-cream" : "text-ink"}`}>
        {value}
        <span className="text-accent-3">+</span>
      </span>
      <span className={`block mt-3 text-[0.82rem] uppercase tracking-wider ${dark ? "text-cream/55" : "text-ink/50"}`}>{label}</span>
    </div>
  );
}
