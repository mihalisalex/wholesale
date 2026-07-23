import { siteConfig } from "@/config/site.config";
import { Button } from "@/components/ui/Button";

export function ContactBlock() {
  return (
    <section id="contact" className="py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 text-center">
        <p className="text-[0.78rem] uppercase tracking-[0.14em] font-bold text-gold mb-3.5">Get In Touch</p>
        <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">Questions before you order?</h2>
        <p className="text-ink/60 max-w-xl mx-auto mb-8">
          Reach our wholesale team directly, or browse the catalog and build your order request online.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <Button href={`mailto:${siteConfig.company.email}`} variant="ghost">
            {siteConfig.company.email}
          </Button>
          <Button href="/catalog">Browse Catalog</Button>
        </div>
        <p className="text-sm text-ink/50">
          {siteConfig.company.address.city}, {siteConfig.company.address.country} · {siteConfig.company.phone}
        </p>
      </div>
    </section>
  );
}
