import { z } from "zod";

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const HEX_RE = /^#[0-9A-Fa-f]{6}$/;

export const productInputSchema = z.object({
  slug: z.string().min(1).regex(SLUG_RE, "Use lowercase letters, numbers and hyphens only"),
  sku: z.string().min(1),
  name: z.string().min(1),
  category: z.enum(["sneakers", "boots", "loafers", "sandals", "heels"]),
  collection: z.string().min(1),
  gender: z.enum(["men", "women", "unisex"]),
  description: z.string().min(1),
  color: z.string().min(1),
  colorHex: z.string().regex(HEX_RE, "Use a hex color like #5B4FE8"),
  material: z.string().min(1),
  sizes: z.array(z.string().min(1)).min(1, "Add at least one size"),
  packageSize: z.literal(8),
  pricePerPackage: z.number().nonnegative(),
  images: z
    .array(z.object({ art: z.string().min(1), alt: z.string().min(1), photoUrl: z.string().optional() }))
    .min(1, "Pick at least one placeholder style icon"),
  tags: z.array(z.string().min(1)),
  stockStatus: z.enum(["in-stock", "low-stock", "made-to-order"]),
  isNewArrival: z.boolean(),
  createdAt: z.string().min(1),
  packagingInfo: z.string().min(1),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
});

export type ProductInput = z.infer<typeof productInputSchema>;

export const collectionInputSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1).regex(SLUG_RE, "Use lowercase letters, numbers and hyphens only"),
  description: z.string().min(1),
});

export type CollectionInput = z.infer<typeof collectionInputSchema>;

const pageSeoSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

export const seoSettingsSchema = z.object({
  siteName: z.string().min(1),
  titleTemplate: z.string().min(1),
  defaultDescription: z.string().min(1),
  defaultOgImage: z.string().min(1),
  twitterHandle: z.string().optional().default(""),
  robotsIndexable: z.boolean(),
  pages: z.object({
    home: pageSeoSchema,
    catalog: pageSeoSchema,
  }),
});

export const siteSettingsSchema = z.object({
  company: z.object({
    name: z.string().min(1),
    legalName: z.string().min(1),
    logoPath: z.string().min(1),
    email: z.email(),
    phone: z.string().min(1),
    website: z.string().min(1),
    address: z.object({
      line1: z.string().min(1),
      city: z.string().min(1),
      postalCode: z.string().min(1),
      country: z.string().min(1),
    }),
    vatNumber: z.string().min(1),
  }),
  banking: z.object({
    bankName: z.string().min(1),
    iban: z.string().min(1),
    swiftBic: z.string().min(1),
    accountHolder: z.string().min(1),
  }),
  commerce: z.object({
    currency: z.string().length(3, "Use a 3-letter currency code, e.g. EUR"),
    currencySymbol: z.string().min(1),
    taxRatePercent: z.number().min(0).max(100),
    packageSize: z.number().int().positive(),
    minOrderPackagesNote: z.string().min(1),
  }),
  shipping: z.object({
    methods: z.array(z.object({ value: z.string().min(1), label: z.string().min(1) })).min(1),
    estimatedLeadTime: z.string().min(1),
    defaultEstimatedShipping: z.number().nonnegative(),
  }),
  terms: z.object({
    paymentTerms: z.string().min(1),
    termsAndConditions: z.string().min(1),
  }),
  contact: z.object({
    whatsappNumber: z.string().min(1),
    businessHours: z.object({
      timezone: z.string().min(1),
      weekdayLabel: z.string().min(1),
      weekendLabel: z.string().min(1),
      startHour: z.number().int().min(0).max(23),
      endHour: z.number().int().min(0).max(23),
      days: z.array(z.number().int().min(0).max(6)),
    }),
  }),
});
