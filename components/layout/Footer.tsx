import Link from "next/link";
import { siteConfig } from "@/config/site.config";

export function Footer() {
  return (
    <footer className="bg-ink text-cream/75 pt-20">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-10 pb-14 border-b border-cream/10">
        <div>
          <Link href="/" className="font-serif text-xl font-semibold text-cream">
            Hervé <em className="italic text-gold-soft">Footwear</em>
          </Link>
          <p className="text-sm mt-3.5 max-w-[32ch]">
            Wholesale footwear for independent boutiques and retail chains — browse the catalog and request a Pro Forma
            Invoice, no account required.
          </p>
        </div>

        <div>
          <h4 className="text-cream text-[0.82rem] uppercase tracking-wider mb-4">Site</h4>
          <nav className="flex flex-col gap-1.5 text-sm">
            <Link href="/catalog" className="hover:text-gold-soft">
              Catalog
            </Link>
            <Link href="/#why" className="hover:text-gold-soft">
              Why Hervé
            </Link>
            <Link href="/#process" className="hover:text-gold-soft">
              Process
            </Link>
            <Link href="/#testimonials" className="hover:text-gold-soft">
              Retailers
            </Link>
          </nav>
        </div>

        <div>
          <h4 className="text-cream text-[0.82rem] uppercase tracking-wider mb-4">Company</h4>
          <nav className="flex flex-col gap-1.5 text-sm">
            <a href={`mailto:${siteConfig.company.email}`} className="hover:text-gold-soft">
              {siteConfig.company.email}
            </a>
            <span>{siteConfig.company.phone}</span>
            <span>
              {siteConfig.company.address.city}, {siteConfig.company.address.country}
            </span>
          </nav>
        </div>

        <div>
          <h4 className="text-cream text-[0.82rem] uppercase tracking-wider mb-4">How Ordering Works</h4>
          <p className="text-sm">
            Browse the catalog, add 8-pair packages to your cart, and submit a request. We&rsquo;ll email you a Pro Forma
            Invoice — payment is arranged manually by bank transfer, no online payment collected.
          </p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-5 md:px-8 flex flex-col md:flex-row justify-between gap-2 py-6 text-xs">
        <p>
          © {new Date().getFullYear()} {siteConfig.company.name}. All rights reserved.
        </p>
        <p>Wholesale only — quotation requests, not an online store.</p>
      </div>
    </footer>
  );
}
