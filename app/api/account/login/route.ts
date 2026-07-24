import { cookies } from "next/headers";
import { parseJsonBody } from "@/lib/admin/validate";
import { loginSchema } from "@/lib/validation/accountSchema";
import { getRetailerByEmail } from "@/lib/retailers";
import { verifyPassword } from "@/lib/auth/password";
import { createSessionToken, SESSION_COOKIE } from "@/lib/auth/retailer-session";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const { data, error } = await parseJsonBody(request, loginSchema);
  if (error) return error;

  const retailer = await getRetailerByEmail(data.email);
  if (!retailer) {
    return Response.json({ success: false, message: "Incorrect email or password." }, { status: 401 });
  }

  const valid = await verifyPassword(data.password, retailer.passwordHash);
  if (!valid) {
    return Response.json({ success: false, message: "Incorrect email or password." }, { status: 401 });
  }

  const store = await cookies();
  store.set(SESSION_COOKIE, createSessionToken(retailer.id), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 30 * 24 * 60 * 60,
  });

  return Response.json({ success: true, message: "Logged in." });
}
