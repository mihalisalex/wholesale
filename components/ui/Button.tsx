import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost";
type Size = "md" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-transform duration-300 ease-brand hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none disabled:hover:translate-y-0";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-cream hover:bg-gold hover:text-white",
  ghost: "bg-transparent border border-ink text-ink hover:bg-ink hover:text-cream",
};

const sizes: Record<Size, string> = {
  md: "px-7 py-[15px] text-[0.95rem]",
  sm: "px-5 py-[10px] text-[0.85rem]",
};

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  href: string;
}

interface ButtonElementProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  href?: never;
}

export function Button(props: ButtonLinkProps): React.JSX.Element;
export function Button(props: ButtonElementProps): React.JSX.Element;
export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  ...rest
}: (ButtonLinkProps | ButtonElementProps) & { href?: string }) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link href={href} className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
