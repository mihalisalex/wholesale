import { z } from "zod";
import { siteConfig } from "@/config/site.config";

const shippingValues = siteConfig.shipping.methods.map((m) => m.value) as [string, ...string[]];

export const customerFormSchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  vatNumber: z.string().optional(),
  contactName: z.string().min(2, "Contact person is required"),
  email: z.email("Enter a valid email address"),
  phone: z.string().min(5, "Phone number is required"),
  country: z.string().min(2, "Country is required"),
  city: z.string().min(2, "City is required"),
  shippingAddress: z.string().min(5, "Shipping address is required"),
  notes: z.string().optional(),
  preferredShipping: z.enum(shippingValues),
});

export type CustomerFormValues = z.infer<typeof customerFormSchema>;

const lineItemSchema = z.object({
  sku: z.string().min(1),
  name: z.string().min(1),
  color: z.string().min(1),
  pricePerPackage: z.number().nonnegative(),
  quantityPackages: z.number().int().positive(),
  packageSize: z.number().int().positive(),
  pairs: z.number().int().nonnegative(),
  subtotal: z.number().nonnegative(),
});

export const orderRequestSchema = z.object({
  customer: customerFormSchema,
  items: z.array(lineItemSchema).min(1, "Add at least one product to the cart"),
  totals: z.object({
    totalPackages: z.number().int().nonnegative(),
    totalPairs: z.number().int().nonnegative(),
    subtotal: z.number().nonnegative(),
    estimatedShipping: z.number().nonnegative(),
    grandTotal: z.number().nonnegative(),
  }),
  currency: z.string(),
  sessionId: z.string(),
  paymentTerms: z.string(),
  companyWebsite: z.string().optional(),
  formRenderedAt: z.number(),
});

export type OrderRequestInput = z.infer<typeof orderRequestSchema>;
