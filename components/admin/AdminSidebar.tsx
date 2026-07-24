"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/cn";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/collections", label: "Collections" },
  { href: "/admin/seo", label: "SEO" },
  { href: "/admin/settings", label: "Settings" },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="w-full md:w-56 shrink-0 md:min-h-screen bg-ink text-cream md:sticky md:top-0 flex md:flex-col">
      <div className="p-6">
        <Link href="/admin" className="font-serif text-lg font-semibold text-cream">
          Hervé <em className="italic text-gold-soft">Admin</em>
        </Link>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "block rounded-brand-sm px-3 py-2.5 text-sm transition-colors",
                isActive ? "bg-gold text-white" : "text-cream/70 hover:bg-white/10 hover:text-cream"
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 space-y-1 border-t border-white/10">
        <Link href="/" target="_blank" className="block rounded-brand-sm px-3 py-2.5 text-sm text-cream/70 hover:bg-white/10 hover:text-cream">
          View Site ↗
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="w-full text-left rounded-brand-sm px-3 py-2.5 text-sm text-cream/70 hover:bg-white/10 hover:text-cream"
        >
          Log Out
        </button>
      </div>
    </aside>
  );
}
