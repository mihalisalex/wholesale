import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site.config";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <main className="max-w-[760px] mx-auto px-5 md:px-8 py-20 md:py-28">
      <p className="text-[0.78rem] uppercase tracking-[0.14em] font-bold text-accent-3 mb-3.5">Legal</p>
      <h1 className="font-serif text-3xl md:text-4xl font-semibold mb-8">Privacy Policy</h1>

      <div className="space-y-8 text-sm md:text-base text-ink/70 leading-relaxed">
        <p>
          {siteConfig.company.legalName} (&ldquo;Hervé Footwear&rdquo;, &ldquo;we&rdquo;) is the data controller for
          information collected through hervefootwear.com, based in {siteConfig.company.address.city},{" "}
          {siteConfig.company.address.country}.
        </p>

        <section>
          <h2 className="font-serif text-xl font-semibold text-ink mb-2.5">What we collect</h2>
          <p>When you submit an order request, we collect:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Company name and VAT number (if provided)</li>
            <li>Contact name, email address and phone number</li>
            <li>Country, city and shipping address</li>
            <li>The products and quantities in your request, and any notes you add</li>
          </ul>
          <p className="mt-3">
            We do not collect payment card details anywhere on this site — payment is arranged separately by bank
            transfer after a Pro Forma Invoice is confirmed. Your shopping cart itself is stored only in your
            browser&rsquo;s local storage and is never sent to us until you submit a request.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-ink mb-2.5">How we use it</h2>
          <p>
            Solely to respond to your request, prepare and email a Pro Forma Invoice, and communicate with you about
            an order. We don&rsquo;t sell or rent your information, and we don&rsquo;t use it for marketing without
            asking you first.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-ink mb-2.5">Where it&rsquo;s stored</h2>
          <p>
            Order requests are stored on our servers and sent by email (via our SMTP provider) to our wholesale team
            and to you, as a copy of your request. We keep order records for as long as reasonably needed for
            accounting and business purposes.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-ink mb-2.5">Cookies and analytics</h2>
          <p>
            See our{" "}
            <Link href="/cookies" className="underline hover:text-ink">
              Cookie Policy
            </Link>{" "}
            for what runs in your browser and when.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-ink mb-2.5">Your rights</h2>
          <p>
            Under EU/UK data protection law you can ask us to access, correct, or delete the personal data we hold
            about you, or ask us to restrict how we use it. Contact us at{" "}
            <a href={`mailto:${siteConfig.company.email}`} className="underline hover:text-ink">
              {siteConfig.company.email}
            </a>{" "}
            and we&rsquo;ll respond within a reasonable time.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-ink mb-2.5">Contact</h2>
          <p>
            {siteConfig.company.legalName}, {siteConfig.company.address.city},{" "}
            {siteConfig.company.address.country} ·{" "}
            <a href={`mailto:${siteConfig.company.email}`} className="underline hover:text-ink">
              {siteConfig.company.email}
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
