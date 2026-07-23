import { cookies } from "next/headers";
import { checkAdminPassword, createSessionToken, SESSION_COOKIE } from "@/lib/admin/auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ success: false, message: "Malformed request." }, { status: 400 });
  }

  if (!body.password || typeof body.password !== "string") {
    return Response.json({ success: false, message: "Password is required." }, { status: 400 });
  }

  let valid: boolean;
  try {
    valid = checkAdminPassword(body.password);
  } catch (err) {
    console.error("Admin auth misconfigured:", err);
    return Response.json(
      { success: false, message: "Admin login is not configured. Set ADMIN_PASSWORD and ADMIN_SESSION_SECRET." },
      { status: 500 }
    );
  }

  if (!valid) {
    return Response.json({ success: false, message: "Incorrect password." }, { status: 401 });
  }

  const store = await cookies();
  store.set(SESSION_COOKIE, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });

  return Response.json({ success: true, message: "Logged in." });
}

export async function DELETE() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  return Response.json({ success: true, message: "Logged out." });
}
