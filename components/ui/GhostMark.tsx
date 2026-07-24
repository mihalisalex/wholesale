import { cn } from "@/lib/cn";

interface GhostMarkProps {
  /** The character(s) rendered as a giant low-opacity watermark. */
  mark?: string;
  /** Positioning classes — GhostMark itself is `absolute`, position it via inset/top/left/etc. */
  className?: string;
  /** Any valid CSS font-size value; defaults to a large responsive clamp. */
  size?: string;
  /** Tone matches the section background: "ink" for light sections, "cream" for dark ones. */
  tone?: "ink" | "cream";
  opacity?: number;
}

/**
 * The brand's recurring "typography as imagery" watermark — a huge, barely-there
 * serif letterform used in place of decorative photography across marketing
 * sections (hero, dark bands, category cards, final CTA).
 */
export function GhostMark({ mark = "H", className, size = "clamp(220px, 26vw, 380px)", tone = "ink", opacity = 0.035 }: GhostMarkProps) {
  const color = tone === "cream" ? `rgba(247, 247, 246, ${opacity})` : `rgba(10, 10, 11, ${opacity})`;

  return (
    <span
      className={cn("absolute font-serif leading-none select-none pointer-events-none", className)}
      style={{ fontSize: size, color }}
      aria-hidden="true"
    >
      {mark}
    </span>
  );
}
