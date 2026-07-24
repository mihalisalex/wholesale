import Link from "next/link";

const LockIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="5" y="11" width="14" height="9" rx="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * Replaces a $ figure for signed-out visitors. `size="sm"` fits inline rows
 * (cart lines, search results); default fits card/detail price blocks.
 * `asLink={false}` renders inert text instead of a <Link> — required
 * whenever this sits inside another anchor/button (product cards, search
 * results, quick-order rows), since nesting interactive elements is invalid
 * HTML and breaks hydration.
 */
export function PriceLock({
  size = "md",
  className = "",
  asLink = true,
}: {
  size?: "sm" | "md";
  className?: string;
  asLink?: boolean;
}) {
  const classes = `inline-flex items-center gap-1 font-semibold text-ink/45 ${
    asLink ? "hover:text-gold transition-colors" : ""
  } ${size === "sm" ? "text-xs" : "text-sm"} ${className}`;
  const icon = <LockIcon className={size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5"} />;

  if (!asLink) {
    return (
      <span className={classes}>
        {icon}
        Log in for pricing
      </span>
    );
  }

  return (
    <Link href="/login" className={classes}>
      {icon}
      Log in for pricing
    </Link>
  );
}
