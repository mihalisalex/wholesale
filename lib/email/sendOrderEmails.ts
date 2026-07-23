import nodemailer from "nodemailer";
import { siteConfig } from "@/config/site.config";
import type { OrderRequestCustomer, OrderRequestLineItem, OrderRequestTotals } from "@/types/order";

interface SendOrderEmailsParams {
  invoiceNumber: string;
  date: string;
  customer: OrderRequestCustomer;
  items: OrderRequestLineItem[];
  totals: OrderRequestTotals;
  currency: string;
  paymentTerms: string;
  pdfBuffer: Buffer;
}

function formatMoney(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount);
}

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error("SMTP is not configured — set SMTP_HOST, SMTP_USER and SMTP_PASS in your environment.");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465,
    auth: { user, pass },
  });
}

function itemsTable(items: OrderRequestLineItem[], currency: string): string {
  const rows = items
    .map(
      (item) => `
        <tr>
          <td style="padding:8px 10px;border-bottom:1px solid #E2E2E8;font-size:13px;">${item.sku}</td>
          <td style="padding:8px 10px;border-bottom:1px solid #E2E2E8;font-size:13px;">${item.name} — ${item.color}</td>
          <td style="padding:8px 10px;border-bottom:1px solid #E2E2E8;font-size:13px;text-align:right;">${item.quantityPackages} pkg / ${item.pairs} pairs</td>
          <td style="padding:8px 10px;border-bottom:1px solid #E2E2E8;font-size:13px;text-align:right;">${formatMoney(item.subtotal, currency)}</td>
        </tr>`
    )
    .join("");

  return `
    <table style="width:100%;border-collapse:collapse;margin-top:12px;">
      <thead>
        <tr style="background:#12131C;color:#fff;">
          <th style="padding:8px 10px;text-align:left;font-size:11px;text-transform:uppercase;">SKU</th>
          <th style="padding:8px 10px;text-align:left;font-size:11px;text-transform:uppercase;">Product</th>
          <th style="padding:8px 10px;text-align:right;font-size:11px;text-transform:uppercase;">Qty</th>
          <th style="padding:8px 10px;text-align:right;font-size:11px;text-transform:uppercase;">Subtotal</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>`;
}

function totalsBlock(totals: OrderRequestTotals, currency: string): string {
  return `
    <table style="width:280px;margin-top:16px;margin-left:auto;font-size:13px;">
      <tr><td style="padding:3px 0;color:#6B6A75;">Total packages</td><td style="padding:3px 0;text-align:right;">${totals.totalPackages}</td></tr>
      <tr><td style="padding:3px 0;color:#6B6A75;">Total pairs</td><td style="padding:3px 0;text-align:right;">${totals.totalPairs}</td></tr>
      <tr><td style="padding:3px 0;color:#6B6A75;">Estimated shipping</td><td style="padding:3px 0;text-align:right;">${formatMoney(totals.estimatedShipping, currency)}</td></tr>
      <tr><td style="padding:8px 0 0;font-weight:bold;border-top:1px solid #12131C;">Grand Total</td><td style="padding:8px 0 0;text-align:right;font-weight:bold;border-top:1px solid #12131C;">${formatMoney(totals.grandTotal, currency)}</td></tr>
    </table>`;
}

function emailShell(heading: string, intro: string, body: string): string {
  return `
    <div style="font-family:Helvetica,Arial,sans-serif;color:#12131C;max-width:600px;margin:0 auto;">
      <h1 style="font-size:20px;margin-bottom:4px;">${heading}</h1>
      <p style="font-size:14px;color:#6B6A75;margin-top:0;">${intro}</p>
      ${body}
      <p style="font-size:11px;color:#6B6A75;margin-top:32px;">
        ${siteConfig.company.name} · ${siteConfig.company.email} · ${siteConfig.company.website}
      </p>
    </div>`;
}

export async function sendOrderEmails(params: SendOrderEmailsParams): Promise<{ companySent: boolean; customerSent: boolean }> {
  const { invoiceNumber, date, customer, items, totals, currency, paymentTerms, pdfBuffer } = params;
  const transporter = getTransporter();
  const from = process.env.SMTP_FROM || siteConfig.company.email;
  const attachments = [
    {
      filename: `ProForma-${invoiceNumber}.pdf`,
      content: pdfBuffer,
      contentType: "application/pdf",
    },
  ];

  const companyHtml = emailShell(
    `New Pro Forma Invoice Request — ${invoiceNumber}`,
    `${customer.companyName} (${customer.contactName}) submitted a wholesale order request on ${date}.`,
    `
      <p style="font-size:13px;"><strong>Contact:</strong> ${customer.contactName} · ${customer.email} · ${customer.phone}</p>
      <p style="font-size:13px;"><strong>Ship to:</strong> ${customer.shippingAddress}, ${customer.city}, ${customer.country}</p>
      ${customer.vatNumber ? `<p style="font-size:13px;"><strong>VAT:</strong> ${customer.vatNumber}</p>` : ""}
      <p style="font-size:13px;"><strong>Preferred shipping:</strong> ${customer.preferredShipping}</p>
      ${customer.notes ? `<p style="font-size:13px;"><strong>Notes:</strong> ${customer.notes}</p>` : ""}
      ${itemsTable(items, currency)}
      ${totalsBlock(totals, currency)}
      <p style="font-size:12px;color:#6B6A75;margin-top:16px;"><strong>Payment terms quoted:</strong> ${paymentTerms}</p>
      <p style="font-size:12px;color:#6B6A75;">The Pro Forma Invoice PDF is attached. This is a quotation request, not a confirmed or paid order.</p>
    `
  );

  const customerHtml = emailShell(
    `Thank you — your Pro Forma Invoice request has been received`,
    `Reference ${invoiceNumber}, dated ${date}. Our team will follow up by email to confirm availability and finalize your order.`,
    `
      ${itemsTable(items, currency)}
      ${totalsBlock(totals, currency)}
      <p style="font-size:12px;color:#6B6A75;margin-top:16px;"><strong>Payment terms:</strong> ${paymentTerms}</p>
      <p style="font-size:12px;color:#6B6A75;">This email and the attached PDF are a Pro Forma Invoice for quotation purposes only — not a confirmed order and no payment has been collected. We'll be in touch to confirm details and arrange payment by bank transfer.</p>
    `
  );

  const [companyResult, customerResult] = await Promise.allSettled([
    transporter.sendMail({
      from,
      to: siteConfig.company.email,
      replyTo: customer.email,
      subject: `New Wholesale Order Request — ${customer.companyName} (${invoiceNumber})`,
      html: companyHtml,
      attachments,
    }),
    transporter.sendMail({
      from,
      to: customer.email,
      subject: `Your Pro Forma Invoice Request — ${invoiceNumber}`,
      html: customerHtml,
      attachments,
    }),
  ]);

  if (companyResult.status === "rejected") {
    console.error("Failed to send company order notification email:", companyResult.reason);
  }
  if (customerResult.status === "rejected") {
    console.error("Failed to send customer confirmation email:", customerResult.reason);
  }

  return {
    companySent: companyResult.status === "fulfilled",
    customerSent: customerResult.status === "fulfilled",
  };
}
