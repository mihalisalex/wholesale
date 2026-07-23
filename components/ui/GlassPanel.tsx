import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
}

/**
 * The "liquid glass" panel: a frosted card with blurred, colorful gradient
 * blobs bleeding through. Blobs are decorative, absolutely positioned
 * children — pass them in via the `blobs` slot pattern used on the landing
 * page CTA.
 */
export function GlassPanel({ children, className }: GlassPanelProps) {
  return (
    <div className={cn("relative overflow-hidden rounded-[28px] glass-panel shadow-brand", className)}>{children}</div>
  );
}
