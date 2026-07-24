import Link from "next/link";
import { siteConfig } from "@/config/site.config";
import { GhostMark } from "@/components/ui/GhostMark";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-cream/75 pt-24 md:pt-28">
      <GhostMark tone="cream" className="hidden lg:block -top-[18%] -right-[4%]" size="clamp(260px, 26vw, 360px)" />
      <div className="relative max-w-[1240px] mx-auto px-5 md:px-8 grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-10 md:gap-12 pb-16 border-b border-cream/10">
        <div>
          <Link href="/" className="flex items-baseline gap-2">
            <span className="font-serif text-2xl tracking-wide text-cream">HERVÉ</span>
            <span className="text-[0.6rem] uppercase tracking-[0.2em] text-cream/40 font-medium">Footwear</span>
          </Link>
          <p className="text-sm mt-4 max-w-[32ch] leading-relaxed">
            Wholesale footwear for independent boutiques and retail chains — create a free retailer account and
            request a Pro Forma Invoice in minutes.
          </p>
        </div>

        <div>
          <h4 className="text-cream text-[0.78rem] uppercase tracking-[0.1em] font-semibold mb-5">Site</h4>
          <nav className="flex flex-col gap-3 text-sm">
            <Link href="/catalog" className="hover:text-cream transition-colors">
              Catalog
            </Link>
            <Link href="/quick-order" className="hover:text-cream transition-colors">
              Quick Order
            </Link>
            <Link href="/#why" className="hover:text-cream transition-colors">
              Why Hervé
            </Link>
            <Link href="/#process" className="hover:text-cream transition-colors">
              Process
            </Link>
            <Link href="/#testimonials" className="hover:text-cream transition-colors">
              Retailers
            </Link>
            <Link href="/login" className="hover:text-cream transition-colors">
              Log In
            </Link>
            <Link href="/register" className="hover:text-cream transition-colors">
              Create Account
            </Link>
          </nav>
        </div>

        <div>
          <h4 className="text-cream text-[0.78rem] uppercase tracking-[0.1em] font-semibold mb-5">Company</h4>
          <nav className="flex flex-col gap-3 text-sm">
            <a href={`mailto:${siteConfig.company.email}`} className="hover:text-cream transition-colors">
              {siteConfig.company.email}
            </a>
            <span>{siteConfig.company.phone}</span>
            <span>
              {siteConfig.company.address.city}, {siteConfig.company.address.country}
            </span>
          </nav>
        </div>

        <div>
          <h4 className="text-cream text-[0.78rem] uppercase tracking-[0.1em] font-semibold mb-5">How Ordering Works</h4>
          <p className="text-sm leading-relaxed">
            Browse the catalog, add 8-pair packages to your cart, and submit a request. We&rsquo;ll email you a Pro Forma
            Invoice — payment is arranged manually by bank transfer, no online payment collected.
          </p>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-5 md:px-8 flex flex-col md:flex-row justify-between gap-3 py-7 text-xs text-cream/50">
        <p>
          © {new Date().getFullYear()} {siteConfig.company.name}. All rights reserved.
        </p>
        <nav className="flex gap-4">
          <Link href="/terms" className="hover:text-cream/80 transition-colors">
            Terms
          </Link>
          <Link href="/privacy" className="hover:text-cream/80 transition-colors">
            Privacy
          </Link>
          <Link href="/cookies" className="hover:text-cream/80 transition-colors">
            Cookies
          </Link>
        </nav>
        <p>Wholesale only — quotation requests, not an online store.</p>
      </div>
    </footer>
  );
}
