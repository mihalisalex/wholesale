import { orderRequestSchema } from "@/lib/validation/orderSchema";
import { getProductBySku } from "@/lib/products";
import { generateProForma } from "@/lib/pdf/generateProForma";
import { sendOrderEmails } from "@/lib/email/sendOrderEmails";
import { siteConfig } from "@/config/site.config";
import type { OrderRequestLineItem, OrderRequestResponse } from "@/types/order";

export const runtime = "nodejs";

const MIN_FILL_TIME_MS = 2000;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

// Best-effort, per-instance rate limiting. Not reliable across multiple
// serverless instances — swap for Upstash Redis / Vercel KV if abuse becomes
// a real problem.
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX;
}

function silentOk(): Response {
  const body: OrderRequestResponse = { success: true, message: "Order request received." };
  return Response.json(body, { status: 200 });
}

function invoiceNumber(): string {
  const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const suffix = crypto.randomUUID().slice(0, 6).toUpperCase();
  return `PF-${stamp}-${suffix}`;
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (isRateLimited(ip)) {
      const body: OrderRequestResponse = {
        success: false,
        message: "Too many requests. Please try again later or email us directly.",
      };
      return Response.json(body, { status: 429 });
    }

    let raw: unknown;
    try {
      raw = await request.json();
    } catch {
      const body: OrderRequestResponse = { success: false, message: "Malformed request." };
      return Response.json(body, { status: 400 });
    }

    const parsed = orderRequestSchema.safeParse(raw);
    if (!parsed.success) {
      const errors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path.join(".") || "form";
        if (!errors[key]) errors[key] = issue.message;
      }
      const body: OrderRequestResponse = { success: false, message: "Please check the highlighted fields.", errors };
      return Response.json(body, { status: 422 });
    }

    const order = parsed.data;

    // Honeypot filled in → likely a bot. Return a fake success without doing any real work.
    if (order.companyWebsite && order.companyWebsite.trim().length > 0) {
      return silentOk();
    }

    // Submitted implausibly fast → likely a bot. Same silent no-op.
    if (Date.now() - order.formRenderedAt < MIN_FILL_TIME_MS) {
      return silentOk();
    }

    // Recompute every line item from the authoritative product catalog —
    // client-submitted prices/subtotals are display-only and never trusted.
    const resolvedItems: OrderRequestLineItem[] = [];
    for (const submitted of order.items) {
      const product = getProductBySku(submitted.sku);
      if (!product) {
        const body: OrderRequestResponse = {
          success: false,
          message: `Product ${submitted.sku} is no longer available. Please refresh your cart and try again.`,
        };
        return Response.json(body, { status: 422 });
      }
      const pairs = submitted.quantityPackages * product.packageSize;
      resolvedItems.push({
        sku: product.sku,
        name: product.name,
        color: product.color,
        pricePerPackage: product.pricePerPackage,
        quantityPackages: submitted.quantityPackages,
        packageSize: product.packageSize,
        pairs,
        subtotal: submitted.quantityPackages * product.pricePerPackage,
      });
    }

    const totalPackages = resolvedItems.reduce((sum, i) => sum + i.quantityPackages, 0);
    const totalPairs = resolvedItems.reduce((sum, i) => sum + i.pairs, 0);
    const subtotal = resolvedItems.reduce((sum, i) => sum + i.subtotal, 0);
    const estimatedShipping = siteConfig.shipping.defaultEstimatedShipping;
    const totals = {
      totalPackages,
      totalPairs,
      subtotal,
      estimatedShipping,
      grandTotal: subtotal + estimatedShipping,
    };

    const number = invoiceNumber();
    const date = new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(new Date());

    let pdfBuffer: Buffer;
    try {
      pdfBuffer = await generateProForma({
        invoiceNumber: number,
        date,
        customer: order.customer,
        items: resolvedItems,
        totals,
        currency: order.currency,
        paymentTerms: order.paymentTerms,
      });
    } catch (err) {
      console.error("Pro Forma PDF generation failed:", err);
      const body: OrderRequestResponse = {
        success: false,
        message: "We could not generate your invoice. Please try again or contact us directly.",
      };
      return Response.json(body, { status: 500 });
    }

    try {
      const { companySent, customerSent } = await sendOrderEmails({
        invoiceNumber: number,
        date,
        customer: order.customer,
        items: resolvedItems,
        totals,
        currency: order.currency,
        paymentTerms: order.paymentTerms,
        pdfBuffer,
      });

      if (!companySent) {
        const body: OrderRequestResponse = {
          success: false,
          invoiceNumber: number,
          message: `Your order was received but we could not notify our team automatically. Please email ${siteConfig.company.email} directly and reference ${number}.`,
        };
        return Response.json(body, { status: 502 });
      }

      const message = customerSent
        ? "Your Pro Forma Invoice request has been received. Check your email for a copy of the invoice — our team will follow up shortly."
        : "Your order was received and our team has been notified, but we could not deliver a confirmation email to your address. Please double-check it or contact us directly.";

      const body: OrderRequestResponse = { success: true, invoiceNumber: number, message };
      return Response.json(body, { status: 200 });
    } catch (err) {
      console.error("Order email sending failed:", err);
      const body: OrderRequestResponse = {
        success: false,
        invoiceNumber: number,
        message: `Your order could not be sent automatically. Please email ${siteConfig.company.email} directly and reference ${number}.`,
      };
      return Response.json(body, { status: 502 });
    }
  } catch (err) {
    console.error("Unexpected error handling order request:", err);
    const body: OrderRequestResponse = {
      success: false,
      message: "Something went wrong on our end. Please try again shortly.",
    };
    return Response.json(body, { status: 500 });
  }
}
