"use client";

import { useState } from "react";
import type { CustomerFormValues } from "@/lib/validation/orderSchema";
import type { CartItem } from "@/types/cart";
import { siteConfig } from "@/config/site.config";
import { formatCurrency, pairsForPackages } from "@/lib/format";
import { Button } from "@/components/ui/Button";

interface OrderReviewProps {
  customer: CustomerFormValues;
  items: CartItem[];
  totals: { totalPackages: number; totalPairs: number; grandTotal: number };
  onBack: () => void;
  onConfirm: (paymentTerms: string) => void;
  isSubmitting: boolean;
}

export function OrderReview({ customer, items, totals, onBack, onConfirm, isSubmitting }: OrderReviewProps) {
  const [paymentTerms, setPaymentTerms] = useState<string>(siteConfig.terms.paymentTerms);
  const shippingLabel = siteConfig.shipping.methods.find((m) => m.value === customer.preferredShipping)?.label;

  return (
    <div className="space-y-6">
      <section>
        <h3 className="text-xs font-semibold uppercase tracking-wide text-ink/50 mb-3">Customer</h3>
        <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
          <p>
            <span className="text-ink/50">Company: </span>
            {customer.companyName}
          </p>
          <p>
            <span className="text-ink/50">Contact: </span>
            {customer.contactName}
          </p>
          <p>
            <span className="text-ink/50">Email: </span>
            {customer.email}
          </p>
          <p>
            <span className="text-ink/50">Phone: </span>
            {customer.phone}
          </p>
          <p>
            <span className="text-ink/50">Location: </span>
            {customer.city}, {customer.country}
          </p>
          <p>
            <span className="text-ink/50">Shipping: </span>
            {shippingLabel}
          </p>
        </div>
      </section>

      <section>
        <h3 className="text-xs font-semibold uppercase tracking-wide text-ink/50 mb-3">Products</h3>
        <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
          {items.map((item) => (
            <div key={item.productId} className="flex justify-between text-sm border-b border-ink/10 pb-2">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-xs text-ink/50">
                  {item.sku} · {item.quantityPackages} pkg · {pairsForPackages(item.quantityPackages, item.packageSize)} pairs
                </p>
              </div>
              <p className="font-medium">{formatCurrency(item.quantityPackages * item.pricePerPackage)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="text-sm space-y-1">
        <div className="flex justify-between text-ink/60">
          <span>Total packages / pairs</span>
          <span>
            {totals.totalPackages} / {totals.totalPairs}
          </span>
        </div>
        <div className="flex justify-between text-ink/60">
          <span>Estimated shipping</span>
          <span>{siteConfig.shipping.estimatedLeadTime}</span>
        </div>
        <div className="flex justify-between font-serif text-lg font-semibold pt-2 border-t border-ink/10">
          <span>Grand total</span>
          <span>{formatCurrency(totals.grandTotal)}</span>
        </div>
      </section>

      <section>
        <label className="block text-xs font-semibold uppercase tracking-wide text-ink/50 mb-2" htmlFor="paymentTerms">
          Payment terms
        </label>
        <textarea
          id="paymentTerms"
          rows={2}
          value={paymentTerms}
          onChange={(e) => setPaymentTerms(e.target.value)}
          className="w-full rounded-brand-sm border border-ink/15 bg-cream px-3.5 py-3 text-sm focus:outline-none focus:border-gold"
        />
      </section>

      <div className="flex gap-3 pt-2">
        <Button type="button" variant="ghost" onClick={onBack} className="flex-1" disabled={isSubmitting}>
          Back
        </Button>
        <Button type="button" onClick={() => onConfirm(paymentTerms)} className="flex-1" disabled={isSubmitting}>
          {isSubmitting ? "Sending…" : "Send Order Request"}
        </Button>
      </div>
    </div>
  );
}
