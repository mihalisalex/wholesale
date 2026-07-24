import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentRetailer } from "@/lib/auth/retailer-session";
import { getOrdersForRetailer } from "@/lib/orders";
import { AccountClient } from "@/components/account/AccountClient";

export const metadata: Metadata = { title: "My Account" };

export default async function AccountPage() {
  const retailer = await getCurrentRetailer();
  if (!retailer) {
    redirect("/login?next=/account");
  }

  const orders = await getOrdersForRetailer(retailer.id);
  // Never send the password hash to the client — it has no use there and
  // would otherwise sit in the page's serialized props.
  const safeRetailer = {
    id: retailer.id,
    email: retailer.email,
    companyName: retailer.companyName,
    vatNumber: retailer.vatNumber,
    contactName: retailer.contactName,
    phone: retailer.phone,
    country: retailer.country,
    city: retailer.city,
    shippingAddress: retailer.shippingAddress,
    preferredShipping: retailer.preferredShipping,
  };

  return (
    <main className="max-w-3xl mx-auto px-5 py-20 md:py-28">
      <p className="text-[0.78rem] uppercase tracking-[0.14em] font-bold text-accent-3 mb-3.5">My Account</p>
      <h1 className="font-serif text-3xl font-semibold mb-8">{retailer.companyName || retailer.email}</h1>

      <AccountClient retailer={safeRetailer} orders={orders} />
    </main>
  );
}
