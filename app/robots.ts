import type { MetadataRoute } from "next";
import { getSeoSettings } from "@/lib/seo";
import { siteConfig } from "@/config/site.config";

export default function robots(): MetadataRoute.Robots {
  const seo = getSeoSettings();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.company.website;

  if (!seo.robotsIndexable) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/", disallow: "/admin" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
