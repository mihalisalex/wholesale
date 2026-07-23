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
import { getSeoSettings } from "@/lib/seo";

export function generateMetadata(): Metadata {
  const seo = getSeoSettings();
  // No explicit `title` here — the root layout's title.template `default`
  // already provides the home page's title without double-applying the template.
  return { description: seo.pages.home.description };
}

export default function HomePage() {
  return (
    <main>
      <Hero />
      <TrustBar />
      <CollectionsGrid />
      <FeaturedStyles />
      <WhyWholesale />
      <SampleCta />
      <ProcessSteps />
      <Testimonials />
      <ContactBlock />
    </main>
  );
}
