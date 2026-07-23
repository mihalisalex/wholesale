import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "@/app/(site)/globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"], weight: ["500", "600", "700"] });

export const metadata: Metadata = {
  title: "Admin — Hervé Footwear",
  robots: { index: false, follow: false },
};

/**
 * A separate root layout for `/admin/*` (Next.js "multiple root layouts"
 * pattern via route groups) — deliberately does NOT render the public
 * site's Header/Footer/CartProvider/CartRoot from app/(site)/layout.tsx.
 */
export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
