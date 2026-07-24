import { parseJsonBody } from "@/lib/admin/validate";
import { profileUpdateSchema } from "@/lib/validation/accountSchema";
import { getCurrentRetailer } from "@/lib/auth/retailer-session";
import { updateRetailerProfile } from "@/lib/retailers";

export const runtime = "nodejs";

export async function PATCH(request: Request) {
  const retailer = await getCurrentRetailer();
  if (!retailer) {
    return Response.json({ success: false, message: "Please log in." }, { status: 401 });
  }

  const { data, error } = await parseJsonBody(request, profileUpdateSchema);
  if (error) return error;

  const updated = await updateRetailerProfile(retailer.id, data);
  return Response.json({
    success: true,
    retailer: {
      id: updated.id,
      email: updated.email,
      companyName: updated.companyName,
      vatNumber: updated.vatNumber,
      contactName: updated.contactName,
      phone: updated.phone,
      country: updated.country,
      city: updated.city,
      shippingAddress: updated.shippingAddress,
      preferredShipping: updated.preferredShipping,
    },
  });
}
