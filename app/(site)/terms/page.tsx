import type { Metadata } from "next";
import { siteConfig } from "@/config/site.config";

export const metadata: Metadata = { title: "Terms of Sale" };

export default function TermsPage() {
  return (
    <main className="max-w-[760px] mx-auto px-5 md:px-8 py-20 md:py-28">
      <p className="text-[0.78rem] uppercase tracking-[0.14em] font-bold text-accent-3 mb-3.5">Legal</p>
      <h1 className="font-serif text-3xl md:text-4xl font-semibold mb-8">Terms of Sale</h1>

      <div className="space-y-8 text-sm md:text-base text-ink/70 leading-relaxed">
        <p>
          These terms govern wholesale orders placed with {siteConfig.company.legalName} (&ldquo;Hervé Footwear&rdquo;,
          &ldquo;we&rdquo;, &ldquo;us&rdquo;) through hervefootwear.com. By submitting an order request, you agree to
          them.
        </p>

        <section>
          <h2 className="font-serif text-xl font-semibold text-ink mb-2.5">1. Wholesale only</h2>
          <p>
            Hervé Footwear sells exclusively to registered retail businesses in fixed {siteConfig.commerce.packageSize}
            -pair packages. {siteConfig.commerce.minOrderPackagesNote} We do not sell to individual consumers.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-ink mb-2.5">2. Quotes and Pro Forma Invoices</h2>
          <p>
            Building an order on this site creates a request only — it is not a confirmed order. We reply with a Pro
            Forma Invoice by email, typically within 24 hours. {siteConfig.terms.termsAndConditions}
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-ink mb-2.5">3. Payment</h2>
          <p>{siteConfig.terms.paymentTerms}</p>
          <p className="mt-3">
            We do not collect card or online payment details through this site. All payment is arranged by bank
            transfer once you confirm a Pro Forma Invoice.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-ink mb-2.5">4. Shipping</h2>
          <p>
            Goods ship {siteConfig.shipping.methods.map((m) => m.label).join(", ")}. Estimated lead time:{" "}
            {siteConfig.shipping.estimatedLeadTime}
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-ink mb-2.5">5. Changes</h2>
          <p>
            We may update these terms from time to time; the version in effect is the one published on this page at
            the time you submit an order request.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-ink mb-2.5">6. Contact</h2>
          <p>
            Questions about an order or these terms:{" "}
            <a href={`mailto:${siteConfig.company.email}`} className="underline hover:text-ink">
              {siteConfig.company.email}
            </a>{" "}
            · {siteConfig.company.phone}
          </p>
        </section>
      </div>
    </main>
  );
}
