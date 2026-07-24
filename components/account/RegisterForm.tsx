"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { registerSchema, type RegisterInput } from "@/lib/validation/accountSchema";
import { siteConfig } from "@/config/site.config";
import { Button } from "@/components/ui/Button";

const inputClasses =
  "w-full rounded-brand-sm border border-ink/15 bg-white px-3.5 py-3 text-sm focus:outline-none focus:border-gold transition-colors";
const labelClasses = "block text-xs font-semibold mb-2";

export function RegisterForm() {
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { preferredShipping: siteConfig.shipping.methods[0].value },
  });

  async function onSubmit(values: RegisterInput) {
    setIsSubmitting(true);
    setFormError(null);
    try {
      const res = await fetch("/api/account/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setFormError(data.message || "Could not create account.");
        setIsSubmitting(false);
        return;
      }
      router.push("/account");
      router.refresh();
    } catch {
      setFormError("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClasses} htmlFor="email">
            Email
          </label>
          <input id="email" type="email" autoComplete="email" className={inputClasses} {...register("email")} />
          {errors.email && <p className="text-xs text-accent-3 mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label className={labelClasses} htmlFor="password">
            Password
          </label>
          <input id="password" type="password" autoComplete="new-password" className={inputClasses} {...register("password")} />
          {errors.password && <p className="text-xs text-accent-3 mt-1">{errors.password.message}</p>}
        </div>
      </div>

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

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Creating account…" : "Create Account"}
      </Button>
    </form>
  );
}
