import { z } from "zod";
import { siteConfig } from "@/config/site.config";

const shippingValues = siteConfig.shipping.methods.map((m) => m.value) as [string, ...string[]];

export const registerSchema = z.object({
  email: z.email("Enter a valid email address"),
  password: z.string().min(8, "Use at least 8 characters"),
  companyName: z.string().min(2, "Company name is required"),
  vatNumber: z.string().optional(),
  contactName: z.string().min(2, "Contact person is required"),
  phone: z.string().min(5, "Phone number is required"),
  country: z.string().min(2, "Country is required"),
  city: z.string().min(2, "City is required"),
  shippingAddress: z.string().min(5, "Shipping address is required"),
  preferredShipping: z.enum(shippingValues),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const profileUpdateSchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  vatNumber: z.string().optional(),
  contactName: z.string().min(2, "Contact person is required"),
  phone: z.string().min(5, "Phone number is required"),
  country: z.string().min(2, "Country is required"),
  city: z.string().min(2, "City is required"),
  shippingAddress: z.string().min(5, "Shipping address is required"),
  preferredShipping: z.enum(shippingValues),
});

export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>;
