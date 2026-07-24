import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site.config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.company.name,
    short_name: "Hervé",
    description: "Wholesale footwear ordering for retailers — browse the catalog and request a Pro Forma Invoice.",
    start_url: "/",
    display: "standalone",
    background_color: "#F7F7F6",
    theme_color: "#0A0A0B",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
