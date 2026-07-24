import crypto from "node:crypto";
import { cookies } from "next/headers";
import { getRetailerById, type Retailer } from "@/lib/retailers";

/**
 * Signed (HMAC-SHA256) cookie session for retailer accounts — same pattern
 * as lib/admin/auth.ts, but keyed to a retailer id instead of a shared
 * password, and signed with its own secret so a leak of one doesn't affect
 * the other.
 */

export const SESSION_COOKIE = "herve_retailer_session";
const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

function getSecret(): string {
  const secret = process.env.RETAILER_SESSION_SECRET;
  if (!secret) {
    throw new Error("RETAILER_SESSION_SECRET is not set. Add it to .env.local.");
  }
  return secret;
}

function sign(payload: string): string {
  return crypto.createHmac("sha256", getSecret()).update(payload).digest("hex");
}

export function createSessionToken(retailerId: string): string {
  const expiresAt = Date.now() + SESSION_TTL_MS;
  const payload = `${retailerId}.${expiresAt}`;
  const signature = sign(payload);
  return `${payload}.${signature}`;
}

export function readRetailerIdFromToken(token: string | undefined | null): string | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [retailerId, expiresAtRaw, signature] = parts;

  const expiresAt = Number(expiresAtRaw);
  if (!Number.isFinite(expiresAt) || expiresAt < Date.now()) return null;

  const expected = sign(`${retailerId}.${expiresAtRaw}`);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return null;
  if (!crypto.timingSafeEqual(a, b)) return null;

  return retailerId;
}

/** Server Components / API routes: the logged-in retailer for the current request, if any. */
export async function getCurrentRetailer(): Promise<Retailer | null> {
  const store = await cookies();
  const retailerId = readRetailerIdFromToken(store.get(SESSION_COOKIE)?.value);
  if (!retailerId) return null;
  const retailer = await getRetailerById(retailerId);
  return retailer ?? null;
}
