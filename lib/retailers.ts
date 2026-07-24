import { eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { retailers } from "@/lib/db/schema";
import { hashPassword } from "@/lib/auth/password";

export type Retailer = typeof retailers.$inferSelect;

export async function getRetailerByEmail(email: string): Promise<Retailer | undefined> {
  const rows = await db.select().from(retailers).where(eq(retailers.email, email.toLowerCase().trim()));
  return rows[0];
}

export async function getRetailerById(id: string): Promise<Retailer | undefined> {
  const rows = await db.select().from(retailers).where(eq(retailers.id, id));
  return rows[0];
}

export interface RegisterRetailerInput {
  email: string;
  password: string;
  companyName: string;
  vatNumber?: string;
  contactName: string;
  phone: string;
  country: string;
  city: string;
  shippingAddress: string;
  preferredShipping: string;
}

export async function createRetailer(input: RegisterRetailerInput): Promise<Retailer> {
  const email = input.email.toLowerCase().trim();
  const existing = await getRetailerByEmail(email);
  if (existing) {
    throw new Error("An account with that email already exists.");
  }
  const passwordHash = await hashPassword(input.password);
  const [retailer] = await db
    .insert(retailers)
    .values({
      email,
      passwordHash,
      companyName: input.companyName,
      vatNumber: input.vatNumber ?? "",
      contactName: input.contactName,
      phone: input.phone,
      country: input.country,
      city: input.city,
      shippingAddress: input.shippingAddress,
      preferredShipping: input.preferredShipping,
    })
    .returning();
  return retailer;
}

export interface RetailerProfileUpdate {
  companyName: string;
  vatNumber?: string;
  contactName: string;
  phone: string;
  country: string;
  city: string;
  shippingAddress: string;
  preferredShipping: string;
}

export async function updateRetailerProfile(id: string, update: RetailerProfileUpdate): Promise<Retailer> {
  const [updated] = await db
    .update(retailers)
    .set({ ...update, vatNumber: update.vatNumber ?? "" })
    .where(eq(retailers.id, id))
    .returning();
  if (!updated) {
    throw new Error(`Retailer with id "${id}" not found.`);
  }
  return updated;
}

/** A retailer's profile is "complete" once every field the order form needs is filled in. */
export function isProfileComplete(retailer: Retailer): boolean {
  return Boolean(
    retailer.companyName && retailer.contactName && retailer.phone && retailer.country && retailer.city && retailer.shippingAddress
  );
}
