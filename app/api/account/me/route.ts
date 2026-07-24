import { getCurrentRetailer } from "@/lib/auth/retailer-session";
import { isProfileComplete } from "@/lib/retailers";

export const runtime = "nodejs";

export async function GET() {
  const retailer = await getCurrentRetailer();
  if (!retailer) {
    return Response.json({ success: true, retailer: null });
  }

  return Response.json({
    success: true,
    retailer: {
      companyName: retailer.companyName,
      vatNumber: retailer.vatNumber,
      contactName: retailer.contactName,
      email: retailer.email,
      phone: retailer.phone,
      country: retailer.country,
      city: retailer.city,
      shippingAddress: retailer.shippingAddress,
      preferredShipping: retailer.preferredShipping,
      profileComplete: isProfileComplete(retailer),
    },
  });
}
