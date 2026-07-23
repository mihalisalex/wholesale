import { requireAdminApi } from "@/lib/admin/auth";
import { parseJsonBody } from "@/lib/admin/validate";
import { seoSettingsSchema } from "@/lib/validation/adminSchemas";
import { getSeoSettings, saveSeoSettings } from "@/lib/seo";

export const runtime = "nodejs";

export async function GET() {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;
  return Response.json({ success: true, seo: getSeoSettings() });
}

export async function PUT(request: Request) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;

  const { data, error } = await parseJsonBody(request, seoSettingsSchema);
  if (error) return error;

  const saved = saveSeoSettings(data);
  return Response.json({ success: true, seo: saved });
}
