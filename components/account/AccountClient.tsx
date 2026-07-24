"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileUpdateSchema, type ProfileUpdateInput } from "@/lib/validation/accountSchema";
import { siteConfig } from "@/config/site.config";
import { formatCurrency, formatDate } from "@/lib/format";
import { Button } from "@/components/ui/Button";
import type { StoredOrder } from "@/types/order";

export interface SafeRetailer {
  id: string;
  email: string;
  companyName: string;
  vatNumber: string;
  contactName: string;
  phone: string;
  country: string;
  city: string;
  shippingAddress: string;
  preferredShipping: string;
}

const inputClasses =
  "w-full rounded-brand-sm border border-ink/15 bg-white px-3.5 py-3 text-sm focus:outline-none focus:border-gold transition-colors";
const labelClasses = "block text-xs font-semibold mb-2";

const STATUS_LABEL: Record<StoredOrder["status"], string> = { new: "Received", reviewed: "Reviewed" };

export function AccountClient({ retailer, orders }: { retailer: SafeRetailer; orders: StoredOrder[] }) {
  const router = useRouter();
  const [savedMessage, setSavedMessage] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileUpdateInput>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: retailer,
  });

  async function onSubmit(values: ProfileUpdateInput) {
    setIsSubmitting(true);
    setFormError(null);
    setSavedMessage(null);
    try {
      const res = await fetch("/api/account/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setFormError(data.message || "Could not save changes.");
        setIsSubmitting(false);
        return;
      }
      setSavedMessage("Saved.");
      router.refresh();
    } catch {
      setFormError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleLogout() {
    setIsLoggingOut(true);
    await fetch("/api/account/session", { method: "DELETE" });
    router.push("/");
    router.refresh();
  }

  return (
    <div className="space-y-14">
      <section>
        <h2 className="font-serif text-xl font-semibold mb-1">Saved Details</h2>
        <p className="text-sm text-ink/50 mb-6">
          Kept on file so requesting a Pro Forma Invoice is a single confirm from here on.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-w-xl">
          <p className="text-sm text-ink/50">{retailer.email}</p>

          <div>
            <label className={labelClasses} htmlFor="companyName">
              Company name
            </label>
            <input id="companyName" autoComplete="organization" className={inputClasses} {...register("companyName")} />
            {errors.companyName && <p className="text-xs text-accent-3 mt-1">{errors.companyName.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClasses} htmlFor="vatNumber">
                VAT number
              </label>
              <input id="vatNumber" autoComplete="off" className={inputClasses} {...register("vatNumber")} />
            </div>
            <div>
              <label className={labelClasses} htmlFor="contactName">
                Contact person
              </label>
              <input id="contactName" autoComplete="name" className={inputClasses} {...register("contactName")} />
              {errors.contactName && <p className="text-xs text-accent-3 mt-1">{errors.contactName.message}</p>}
            </div>
          </div>

          <div>
            <label className={labelClasses} htmlFor="phone">
              Phone
            </label>
            <input id="phone" type="tel" autoComplete="tel" className={inputClasses} {...register("phone")} />
            {errors.phone && <p className="text-xs text-accent-3 mt-1">{errors.phone.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClasses} htmlFor="country">
                Country
              </label>
              <input id="country" autoComplete="country-name" className={inputClasses} {...register("country")} />
              {errors.country && <p className="text-xs text-accent-3 mt-1">{errors.country.message}</p>}
            </div>
            <div>
              <label className={labelClasses} htmlFor="city">
                City
              </label>
              <input id="city" autoComplete="address-level2" className={inputClasses} {...register("city")} />
              {errors.city && <p className="text-xs text-accent-3 mt-1">{errors.city.message}</p>}
            </div>
          </div>

          <div>
            <label className={labelClasses} htmlFor="shippingAddress">
              Shipping address
            </label>
            <textarea
              id="shippingAddress"
              rows={2}
              autoComplete="street-address"
              className={inputClasses}
              {...register("shippingAddress")}
            />
            {errors.shippingAddress && <p className="text-xs text-accent-3 mt-1">{errors.shippingAddress.message}</p>}
          </div>

          <div>
            <label className={labelClasses} htmlFor="preferredShipping">
              Preferred shipping method
            </label>
            <select id="preferredShipping" className={inputClasses} {...register("preferredShipping")}>
              {siteConfig.shipping.methods.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>

          {formError && <p className="text-sm text-accent-3">{formError}</p>}
          {savedMessage && <p className="text-sm text-accent-2">{savedMessage}</p>}

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving…" : "Save Changes"}
          </Button>
        </form>
      </section>

      <section>
        <h2 className="font-serif text-xl font-semibold mb-1">Order Requests</h2>
        <p className="text-sm text-ink/50 mb-6">
          {orders.length === 0 ? "You haven't requested a Pro Forma Invoice yet." : `${orders.length} request${orders.length === 1 ? "" : "s"} so far.`}
        </p>

        {orders.length > 0 && (
          <div className="bg-white border border-ink/10 rounded-brand overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-ink/10 text-left text-xs uppercase tracking-wide text-ink/40">
                  <th className="px-5 py-3 font-medium">Invoice</th>
                  <th className="px-5 py-3 font-medium">Date</th>
                  <th className="px-5 py-3 font-medium">Total</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-ink/5 last:border-none">
                    <td className="px-5 py-3 font-medium">{order.invoiceNumber}</td>
                    <td className="px-5 py-3 text-ink/60 whitespace-nowrap">{formatDate(order.createdAt)}</td>
                    <td className="px-5 py-3">{formatCurrency(order.totals.grandTotal)}</td>
                    <td className="px-5 py-3 text-ink/60">{STATUS_LABEL[order.status]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <button type="button" onClick={handleLogout} disabled={isLoggingOut} className="text-sm text-ink/50 underline hover:text-ink">
        {isLoggingOut ? "Logging out…" : "Log out"}
      </button>
    </div>
  );
}
