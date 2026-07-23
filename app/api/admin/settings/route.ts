import { requireAdminApi } from "@/lib/admin/auth";
import { parseJsonBody } from "@/lib/admin/validate";
import { siteSettingsSchema } from "@/lib/validation/adminSchemas";
import { getSiteSettings, saveSiteSettings } from "@/lib/site-settings";

export const runtime = "nodejs";

export async function GET() {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;
  return Response.json({ success: true, settings: getSiteSettings() });
}

export async function PUT(request: Request) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;

  const { data, error } = await parseJsonBody(request, siteSettingsSchema);
  if (error) return error;

  const saved = saveSiteSettings(data);
  return Response.json({ success: true, settings: saved });
}
