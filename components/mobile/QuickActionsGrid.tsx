import Link from "next/link";

const ACTIONS = [
  {
    href: "/catalog",
    label: "Browse Categories",
    sub: "Sneakers, boots, loafers & more",
    icon: (
      <path d="M4 8 12 4l8 4-8 4-8-4Z M4 8v8l8 4 8-4V8 M12 12v8" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    href: "/quick-order",
    label: "Quick Order",
    sub: "Know your SKUs? Order in 60s",
    icon: <path d="M13 3 4 14h6l-1 7 9-11h-6l1-7Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    href: "/#contact",
    label: "Contact Us",
    sub: "Questions before you order",
    icon: (
      <path
        d="M4 5h16v11H8l-4 4V5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
];

export function QuickActionsGrid() {
  return (
    <section className="order-2 md:hidden py-6">
      <div className="px-5 grid grid-cols-2 gap-3">
        {ACTIONS.map((action, i) => (
          <Link
            key={action.href}
            href={action.href}
            className={`bg-white border border-ink/10 rounded-brand p-4 flex flex-col gap-2 active:scale-[0.98] transition-transform ${
              i === ACTIONS.length - 1 ? "col-span-2" : ""
            }`}
          >
            <span className="w-11 h-11 rounded-full bg-cream-dim text-gold flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-6 h-6">
                {action.icon}
              </svg>
            </span>
            <span className="font-serif font-semibold leading-tight">{action.label}</span>
            <span className="text-xs text-ink/55 leading-snug">{action.sub}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
