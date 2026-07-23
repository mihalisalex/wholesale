import crypto from "node:crypto";
import { cookies } from "next/headers";

/**
 * Minimal single-admin auth: one shared password (env var), a signed
 * (HMAC-SHA256) cookie session with an expiry. No user accounts/roles —
 * this gates the admin dashboard only, the public site never has a login.
 */

export const SESSION_COOKIE = "herve_admin_session";
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is not set. Add it to .env.local before using the admin dashboard.");
  }
  return secret;
}

function sign(payload: string): string {
  return crypto.createHmac("sha256", getSecret()).update(payload).digest("hex");
}

export function createSessionToken(): string {
  const expiresAt = Date.now() + SESSION_TTL_MS;
  const signature = sign(String(expiresAt));
  return `${expiresAt}.${signature}`;
}

export function isValidSessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const [expiresAtRaw, signature] = token.split(".");
  if (!expiresAtRaw || !signature) return false;

  const expiresAt = Number(expiresAtRaw);
  if (!Number.isFinite(expiresAt) || expiresAt < Date.now()) return false;

  const expected = sign(expiresAtRaw);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export function checkAdminPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    throw new Error("ADMIN_PASSWORD is not set. Add it to .env.local before using the admin dashboard.");
  }
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

/** Server Components / layouts: check whether the current request is an authenticated admin session. */
export async function isAdminSession(): Promise<boolean> {
  const store = await cookies();
  return isValidSessionToken(store.get(SESSION_COOKIE)?.value);
}

/**
 * Route Handlers: call at the top of every `/api/admin/*` handler and
 * return its result immediately if non-null. Page navigation is separately
 * guarded by `app/admin/(protected)/layout.tsx`'s redirect, but direct API
 * calls need their own check too.
 */
export async function requireAdminApi(): Promise<Response | null> {
  const authed = await isAdminSession();
  if (!authed) {
    return Response.json({ success: false, message: "Unauthorized." }, { status: 401 });
  }
  return null;
}
