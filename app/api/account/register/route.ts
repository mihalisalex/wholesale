import { cookies } from "next/headers";
import { parseJsonBody } from "@/lib/admin/validate";
import { registerSchema } from "@/lib/validation/accountSchema";
import { createRetailer } from "@/lib/retailers";
import { createSessionToken, SESSION_COOKIE } from "@/lib/auth/retailer-session";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const { data, error } = await parseJsonBody(request, registerSchema);
  if (error) return error;

  let retailer;
  try {
    retailer = await createRetailer(data);
  } catch (err) {
    return Response.json(
      { success: false, message: err instanceof Error ? err.message : "Could not create account." },
      { status: 409 }
    );
  }

  const store = await cookies();
  store.set(SESSION_COOKIE, createSessionToken(retailer.id), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 30 * 24 * 60 * 60,
  });

  return Response.json({ success: true, message: "Account created." }, { status: 201 });
}
