# Hervé Footwear — Wholesale Ordering Platform

A B2B wholesale showroom, not a consumer store: retailers browse the catalog, build an
order in 8-pair packages, and submit a **Pro Forma Invoice request**. No checkout, no
payment gateway, no customer accounts — the site emails a PDF quotation to both the
business and the customer, and payment/production is arranged manually afterward.

## Stack

Next.js (App Router) · React · TypeScript · Tailwind CSS v3 · Framer Motion ·
`@react-pdf/renderer` · Nodemailer · Zod · react-hook-form

## Getting started

```bash
npm install
cp .env.local.example .env.local   # then fill in real SMTP credentials
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The dev/build scripts run on **webpack**, not Turbopack (`next dev --webpack` /
`next build --webpack` in `package.json`) — this was a deliberate choice for this
environment, not a Next.js requirement; revert to plain `next dev` / `next build` freely
elsewhere.

## Admin dashboard

`/admin` — manage products, collections, SEO and business settings without touching code.

- **Auth**: a single shared password, no user accounts. Set `ADMIN_PASSWORD` and
  `ADMIN_SESSION_SECRET` in `.env.local` (generate the secret with `openssl rand -hex 32`
  or similar — it signs the login session cookie). Visiting `/admin` without a valid
  session redirects to `/admin/login`; the dashboard itself has its own layout (no public
  header/footer/cart) and is marked `noindex`.
- **Products** (`/admin/products`) — full CRUD: pricing, sizes, stock status, category,
  gender, collection, color/material, tags, packaging info, and optional per-product SEO
  title/description. Changes write straight to `data/products.json` and show up on the
  live catalog **immediately** — no rebuild or restart needed.
- **Collections** (`/admin/collections`) — add/rename/delete the named collections
  products can belong to (`data/collections.json`), also live immediately.
- **SEO** (`/admin/seo`) — global title template/description/OG image/robots toggle, plus
  per-page title/description for the home and catalog pages (`data/seo.json`), live
  immediately since metadata generation is server-only.
- **Settings** (`/admin/settings`) — company info, banking details (IBAN/SWIFT/bank
  name), currency, tax rate, shipping methods, and the terms & conditions / payment terms
  text shown on the Pro Forma PDF and in both order emails (`data/site-settings.json`,
  loaded through `config/site.config.ts`). This one file is a plain static JSON import
  rather than a live filesystem read, because it's also imported by a few client
  components (currency formatting, the order form's shipping dropdown) — so **settings
  changes apply on the next dev-server recompile automatically, and on the next
  build/restart in production**, not instantly like products/collections/SEO.

**Persistence caveat**: all admin writes go straight to the `data/*.json` files on disk.
That works great locally and on any traditionally-hosted Node server (a VPS, etc.), but
won't persist on a stateless/serverless host's production runtime (e.g. Vercel) — swap in
a real database or a service like Vercel KV before deploying there.

Every placeholder value in `data/site-settings.json` is marked `REPLACE ME` — fill those
in (via `/admin/settings` or by hand) before taking real orders.

## Email setup

Order emails send via SMTP through Nodemailer (`lib/email/sendOrderEmails.ts`). Set these
in `.env.local` (see `.env.local.example`):

```
SMTP_HOST=smtp.yourprovider.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=orders@hervefootwear.com
SMTP_PASS=your-smtp-password-or-app-token
SMTP_FROM="Hervé Footwear <orders@hervefootwear.com>"
```

Works with any provider — a company mailbox, a Gmail app password, or an SMTP relay from
Postmark/SendGrid/etc. Without these set, order submission still validates, recomputes
totals, and generates the PDF correctly, but fails gracefully at the send step with a
message pointing the customer to email the company directly (see `app/api/order/route.ts`).

For local testing without real credentials, a free Ethereal test account
(https://ethereal.email) works as a drop-in SMTP target — you'll see sent emails in
Ethereal's inbox rather than a real one.

## Product data

Catalog lives in [`data/products.json`](data/products.json) — seeded with 16 products (8
archetypes × 2 colorways) typed against [`types/product.ts`](types/product.ts). No
database; manage entries through `/admin/products`, or edit the JSON file directly.

Product imagery is placeholder line-art (`components/icons/ProductLineArt.tsx`),
matching the brand's existing minimalist icon style since no real photography exists yet.
To swap in real photos: replace `Product.images` entries with real image paths and update
`ProductLineArt` usages in `components/product/Gallery.tsx` and
`components/catalog/ProductCard.tsx` to render `<img>`/`next/image` instead.

## How an order request works

1. `/catalog` — search, filter, sort → `/product/[slug]` — gallery, package quantity
   stepper, add to cart
2. Cart state lives in `context/CartContext.tsx` (React Context + `localStorage`, no
   accounts, no backend cart)
3. Cart drawer → "Request Pro Forma Invoice" → `components/order/OrderModal.tsx`
   (form → review → confirmation)
4. Submit posts to `app/api/order/route.ts`, which **recomputes every price server-side**
   from `data/products.json` (client-submitted prices are display-only and never trusted),
   generates the PDF (`lib/pdf/generateProForma.tsx`), and emails both the company and the
   customer with the PDF attached (`lib/email/sendOrderEmails.ts`)
5. A basic honeypot field + minimum-fill-time check + in-memory per-IP rate limit guard
   the endpoint, since there's no auth to lean on. The rate limit is best-effort and
   per-instance — swap in Upstash Redis/Vercel KV if this ever needs to hold up under
   real abuse.

## What's intentionally not here

Stripe/PayPal, credit cards, online payment, user accounts/login, inventory management,
order history — per the brief, this is a quotation tool, not a store.

## Legacy static site

The original static marketing page this project replaced is archived, unmodified, in
[`legacy-static/`](legacy-static/) for reference.
