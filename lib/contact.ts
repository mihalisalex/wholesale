import { siteConfig } from "@/config/site.config";
import { formatCurrency, pairsForPackages } from "@/lib/format";
import type { CartItem } from "@/types/cart";
import type { Product } from "@/types/product";

function digitsOnly(value: string): string {
  return value.replace(/[^\d]/g, "");
}

export function buildWhatsAppLink(message?: string): string {
  const number = digitsOnly(siteConfig.contact.whatsappNumber);
  const query = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${number}${query}`;
}

export function buildTelLink(): string {
  return `tel:${digitsOnly(siteConfig.company.phone)}`;
}

const WEEKDAY_INDEX: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

export function isWithinBusinessHours(date: Date = new Date()): boolean {
  const { businessHours } = siteConfig.contact;
  const localHour = Number(
    new Intl.DateTimeFormat("en-GB", { hour: "numeric", hour12: false, timeZone: businessHours.timezone }).format(date)
  );
  const weekdayShort = new Intl.DateTimeFormat("en-US", { weekday: "short", timeZone: businessHours.timezone }).format(date);
  const localDay = WEEKDAY_INDEX[weekdayShort] ?? date.getDay();

  return businessHours.days.includes(localDay) && localHour >= businessHours.startHour && localHour < businessHours.endHour;
}

export function buildProductInquiryMessage(product: Pick<Product, "name" | "sku">): string {
  return `Hi, I'm interested in ${product.name} (SKU ${product.sku}). Could you tell me more about availability?`;
}

export function buildCartShareMessage(
  items: CartItem[],
  totals: { totalPackages: number; totalPairs: number; grandTotal: number }
): string {
  const lines = items.map(
    (item) =>
      `- ${item.name} (${item.sku}): ${item.quantityPackages} pkg / ${pairsForPackages(item.quantityPackages, item.packageSize)} pairs`
  );
  return [
    "Hi, here's my current wholesale order:",
    ...lines,
    "",
    `Total: ${totals.totalPackages} packages / ${totals.totalPairs} pairs / ${formatCurrency(totals.grandTotal)}`,
  ].join("\n");
}

export function buildClosedMessage(): string {
  return "Hi, I'd like to get in touch — I see you're closed right now, could you reach out when you're back?";
}
