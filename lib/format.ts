import { siteConfig } from "@/config/site.config";

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: siteConfig.commerce.currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(d);
}

export function pairsForPackages(quantityPackages: number, packageSize: number = siteConfig.commerce.packageSize): number {
  return quantityPackages * packageSize;
}

export function pricePerPair(pricePerPackage: number, packageSize: number = siteConfig.commerce.packageSize): number {
  return pricePerPackage / packageSize;
}

export function formatPricePerPair(pricePerPackage: number, packageSize: number = siteConfig.commerce.packageSize): string {
  return `${formatCurrency(pricePerPair(pricePerPackage, packageSize))} / pair`;
}
