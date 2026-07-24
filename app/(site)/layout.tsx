import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartRoot } from "@/components/cart/CartRoot";
import { MobileChrome } from "@/components/mobile/MobileChrome";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { Analytics } from "@/components/layout/Analytics";
import { siteConfig } from "@/config/site.config";
import { getSeoSettings } from "@/lib/seo";
import { getAllProducts } from "@/lib/products";
import { getCurrentRetailer } from "@/lib/auth/retailer-session";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"], weight: ["500", "600", "700"] });

const seo = getSeoSettings();

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: { template: seo.titleTemplate, default: seo.pages.home.title },
  description: seo.defaultDescription,
  robots: seo.robotsIndexable ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: { images: [seo.defaultOgImage] },
  ...(seo.twitterHandle ? { twitter: { card: "summary_large_image", site: seo.twitterHandle } } : {}),
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const products = await getAllProducts();
  const retailer = await getCurrentRetailer();

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: siteConfig.company.name,
              description:
                "Wholesale footwear supplier offering premium sneakers, boots, loafers, heels and sandals to retailers and boutiques.",
              url: siteConfig.company.website,
              email: siteConfig.company.email,
              makesOffer: {
                "@type": "Offer",
                itemOffered: { "@type": "ProductGroup", name: "Wholesale Footwear Catalog", category: "Footwear" },
                businessFunction: "http://purl.org/goodrelations/v1#Sell",
                eligibleCustomerType: "http://purl.org/goodrelations/v1#Reseller",
              },
            }),
          }}
        />
      </head>
      <body className="font-sans">
        <CartProvider>
          <Header retailer={retailer ? { companyName: retailer.companyName } : null} />
          <div className="pt-14 md:pt-[78px]">
            {children}
            <Footer />
          </div>
          <div className="pb-20 md:hidden" aria-hidden="true" />
          <CartRoot />
          <MobileChrome products={products} />
          <CookieConsent />
          <Analytics />
        </CartProvider>
      </body>
    </html>
  );
}
