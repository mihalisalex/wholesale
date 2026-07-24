import { pgTable, text, doublePrecision, integer, boolean, jsonb, timestamp, uuid } from "drizzle-orm/pg-core";
import type { ProductImage } from "@/types/product";
import type { OrderRequestCustomer } from "@/types/order";

export const products = pgTable("products", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  sku: text("sku").notNull().unique(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  collection: text("collection").notNull(),
  gender: text("gender").notNull(),
  description: text("description").notNull(),
  color: text("color").notNull(),
  colorHex: text("color_hex").notNull(),
  material: text("material").notNull(),
  sizes: jsonb("sizes").$type<string[]>().notNull(),
  packageSize: integer("package_size").notNull().default(8),
  pricePerPackage: doublePrecision("price_per_package").notNull(),
  images: jsonb("images").$type<ProductImage[]>().notNull(),
  tags: jsonb("tags").$type<string[]>().notNull(),
  stockStatus: text("stock_status").notNull(),
  isNewArrival: boolean("is_new_arrival").notNull().default(false),
  createdAt: text("created_at").notNull(),
  packagingInfo: text("packaging_info").notNull(),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
});

export const collections = pgTable("collections", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
});

export const retailers = pgTable("retailers", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  companyName: text("company_name").notNull().default(""),
  vatNumber: text("vat_number").notNull().default(""),
  contactName: text("contact_name").notNull().default(""),
  phone: text("phone").notNull().default(""),
  country: text("country").notNull().default(""),
  city: text("city").notNull().default(""),
  shippingAddress: text("shipping_address").notNull().default(""),
  preferredShipping: text("preferred_shipping").notNull().default("fob"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const orders = pgTable("orders", {
  id: uuid("id").primaryKey().defaultRandom(),
  invoiceNumber: text("invoice_number").notNull().unique(),
  retailerId: uuid("retailer_id")
    .notNull()
    .references(() => retailers.id),
  status: text("status").notNull().default("new"),
  currency: text("currency").notNull(),
  paymentTerms: text("payment_terms").notNull(),
  customer: jsonb("customer").$type<OrderRequestCustomer>().notNull(),
  totalPackages: integer("total_packages").notNull(),
  totalPairs: integer("total_pairs").notNull(),
  subtotal: doublePrecision("subtotal").notNull(),
  estimatedShipping: doublePrecision("estimated_shipping").notNull(),
  grandTotal: doublePrecision("grand_total").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const orderItems = pgTable("order_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  orderId: uuid("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  sku: text("sku").notNull(),
  name: text("name").notNull(),
  color: text("color").notNull(),
  pricePerPackage: doublePrecision("price_per_package").notNull(),
  quantityPackages: integer("quantity_packages").notNull(),
  packageSize: integer("package_size").notNull(),
  pairs: integer("pairs").notNull(),
  subtotal: doublePrecision("subtotal").notNull(),
});
