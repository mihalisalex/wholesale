"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { customerFormSchema, type CustomerFormValues } from "@/lib/validation/orderSchema";
import { siteConfig } from "@/config/site.config";
import { Button } from "@/components/ui/Button";

interface OrderFormProps {
  defaultValues?: Partial<CustomerFormValues>;
  onSubmit: (values: CustomerFormValues) => void;
  onCancel: () => void;
}

const inputClasses =
  "w-full rounded-brand-sm border border-ink/15 bg-cream px-3.5 py-3 text-sm focus:outline-none focus:border-gold transition-colors";
const labelClasses = "block text-xs font-semibold mb-2";

export function OrderForm({ defaultValues, onSubmit, onCancel }: OrderFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerFormValues>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: { preferredShipping: siteConfig.shipping.methods[0].value, ...defaultValues },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className={labelClasses} htmlFor="companyName">
          Company name
        </label>
        <input id="companyName" className={inputClasses} {...register("companyName")} />
        {errors.companyName && <p className="text-xs text-accent-3 mt-1">{errors.companyName.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClasses} htmlFor="vatNumber">
            VAT number
          </label>
          <input id="vatNumber" className={inputClasses} {...register("vatNumber")} />
        </div>
        <div>
          <label className={labelClasses} htmlFor="contactName">
            Contact person
          </label>
          <input id="contactName" className={inputClasses} {...register("contactName")} />
          {errors.contactName && <p className="text-xs text-accent-3 mt-1">{errors.contactName.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClasses} htmlFor="email">
            Email
          </label>
          <input id="email" type="email" className={inputClasses} {...register("email")} />
          {errors.email && <p className="text-xs text-accent-3 mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label className={labelClasses} htmlFor="phone">
            Phone
          </label>
          <input id="phone" className={inputClasses} {...register("phone")} />
          {errors.phone && <p className="text-xs text-accent-3 mt-1">{errors.phone.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClasses} htmlFor="country">
            Country
          </label>
          <input id="country" className={inputClasses} {...register("country")} />
          {errors.country && <p className="text-xs text-accent-3 mt-1">{errors.country.message}</p>}
        </div>
        <div>
          <label className={labelClasses} htmlFor="city">
            City
          </label>
          <input id="city" className={inputClasses} {...register("city")} />
          {errors.city && <p className="text-xs text-accent-3 mt-1">{errors.city.message}</p>}
        </div>
      </div>

      <div>
        <label className={labelClasses} htmlFor="shippingAddress">
          Shipping address
        </label>
        <textarea id="shippingAddress" rows={2} className={inputClasses} {...register("shippingAddress")} />
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

      <div>
        <label className={labelClasses} htmlFor="notes">
          Notes
        </label>
        <textarea
          id="notes"
          rows={3}
          placeholder="Anything else we should know about this order?"
          className={inputClasses}
          {...register("notes")}
        />
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="button" variant="ghost" onClick={onCancel} className="flex-1">
          Back to Cart
        </Button>
        <Button type="submit" className="flex-1">
          Review Order
        </Button>
      </div>
    </form>
  );
}
