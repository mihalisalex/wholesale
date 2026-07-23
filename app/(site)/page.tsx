import type { Metadata } from "next";
import { Hero } from "@/components/marketing/Hero";
import { TrustBar } from "@/components/marketing/TrustBar";
import { CollectionsGrid } from "@/components/marketing/CollectionsGrid";
import { FeaturedStyles } from "@/components/marketing/FeaturedStyles";
import { WhyWholesale } from "@/components/marketing/WhyWholesale";
import { SampleCta } from "@/components/marketing/SampleCta";
import { ProcessSteps } from "@/components/marketing/ProcessSteps";
import { Testimonials } from "@/components/marketing/Testimonials";
import { ContactBlock } from "@/components/marketing/ContactBlock";
import { QuickActionsGrid } from "@/components/mobile/QuickActionsGrid";
import { getSeoSettings } from "@/lib/seo";

export function generateMetadata(): Metadata {
  const seo = getSeoSettings();
  // No explicit `title` here — the root layout's title.template `default`
  // already provides the home page's title without double-applying the template.
  return { description: seo.pages.home.description };
}

export default function HomePage() {
  return (
    <main className="flex flex-col">
      <div className="order-1 md:order-none">
        <Hero />
      </div>
      <QuickActionsGrid />
      <div className="order-3 md:order-none">
        <CollectionsGrid />
      </div>
      <div className="order-4 md:order-none">
        <FeaturedStyles />
      </div>
      <div className="order-5 md:order-none">
        <TrustBar />
      </div>
      <div className="order-6 md:order-none">
        <WhyWholesale />
      </div>
      <div className="order-7 md:order-none">
        <SampleCta />
      </div>
      <div className="order-8 md:order-none">
        <ProcessSteps />
      </div>
      <div className="order-9 md:order-none">
        <Testimonials />
      </div>
      <div className="order-10 md:order-none">
        <ContactBlock />
      </div>
    </main>
  );
}
