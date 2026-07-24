import type { Metadata } from "next";
import { siteConfig } from "@/config/site.config";

export const metadata: Metadata = { title: "Cookie Policy" };

export default function CookiesPage() {
  return (
    <main className="max-w-[760px] mx-auto px-5 md:px-8 py-20 md:py-28">
      <p className="text-[0.78rem] uppercase tracking-[0.14em] font-bold text-accent-3 mb-3.5">Legal</p>
      <h1 className="font-serif text-3xl md:text-4xl font-semibold mb-8">Cookie Policy</h1>

      <div className="space-y-8 text-sm md:text-base text-ink/70 leading-relaxed">
        <p>Here is exactly what runs in your browser when you visit hervefootwear.com, and why.</p>

        <section>
          <h2 className="font-serif text-xl font-semibold text-ink mb-2.5">Always on (strictly necessary)</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong className="text-ink">Cart storage</strong> — your wholesale order cart is kept in your
              browser&rsquo;s local storage so it survives a page refresh. It never leaves your browser until you
              submit an order request.
            </li>
            <li>
              <strong className="text-ink">Admin session cookie</strong> (<code>{"herve_admin_session"}</code>) — set
              only when someone signs in at <code>/admin</code>, to keep that session authenticated. It isn&rsquo;t
              set for ordinary visitors browsing the catalog.
            </li>
          </ul>
          <p className="mt-3">These require no consent under EU ePrivacy rules, since they&rsquo;re essential to the site working.</p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-ink mb-2.5">Optional (only after you accept)</h2>
          <p>
            If we enable analytics in the future, it will use{" "}
            <a href="https://plausible.io" className="underline hover:text-ink" target="_blank" rel="noopener noreferrer">
              Plausible
            </a>
            , a cookieless, privacy-friendly analytics tool that doesn&rsquo;t track you across sites or collect
            personal data — and even then, it only loads after you click Accept on the cookie banner. If you&rsquo;ve
            already made a choice, you can change it by clearing your browser&rsquo;s site data for this domain.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-ink mb-2.5">Questions</h2>
          <p>
            <a href={`mailto:${siteConfig.company.email}`} className="underline hover:text-ink">
              {siteConfig.company.email}
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
