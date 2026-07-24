import { cookies } from "next/headers";
import { SESSION_COOKIE } from "@/lib/auth/retailer-session";

export const runtime = "nodejs";

export async function DELETE() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  return Response.json({ success: true, message: "Logged out." });
}
