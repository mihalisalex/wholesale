"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/hooks/useCart";
import { OrderForm } from "./OrderForm";
import { OrderReview } from "./OrderReview";
import { OrderConfirmation } from "./OrderConfirmation";
import type { CustomerFormValues } from "@/lib/validation/orderSchema";
import type { OrderRequestPayload, OrderRequestResponse } from "@/types/order";
import { siteConfig } from "@/config/site.config";
import { pairsForPackages } from "@/lib/format";

type Step = "form" | "review" | "confirmed";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OrderModal({ isOpen, onClose }: OrderModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-ink/50 z-[110]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <OrderModalContent onClose={onClose} />
        </>
      )}
    </AnimatePresence>
  );
}

/**
 * Mounted fresh each time the modal opens (parented by `{isOpen && ...}` in
 * OrderModal above), so its step/form state naturally resets on every open
 * without a manual reset effect — and formRenderedAt can be captured with a
 * lazy useState initializer, since that's the one place a one-time impure
 * read (Date.now()) is safe to run exactly once per mount.
 */
function OrderModalContent({ onClose }: { onClose: () => void }) {
  const { state, totals, clearCart } = useCart();
  const [step, setStep] = useState<Step>("form");
  const [customer, setCustomer] = useState<CustomerFormValues | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<OrderRequestResponse | null>(null);
  const [formRenderedAt] = useState(() => Date.now());
  const honeypotRef = useRef<HTMLInputElement>(null);

  async function handleConfirm(paymentTerms: string) {
    if (!customer) return;
    setIsSubmitting(true);

    const payload: OrderRequestPayload = {
      customer,
      items: state.items.map((item) => ({
        sku: item.sku,
        name: item.name,
        color: item.color,
        pricePerPackage: item.pricePerPackage,
        quantityPackages: item.quantityPackages,
        packageSize: item.packageSize,
        pairs: pairsForPackages(item.quantityPackages, item.packageSize),
        subtotal: item.quantityPackages * item.pricePerPackage,
      })),
      totals: {
        totalPackages: totals.totalPackages,
        totalPairs: totals.totalPairs,
        subtotal: totals.grandTotal,
        estimatedShipping: siteConfig.shipping.defaultEstimatedShipping,
        grandTotal: totals.grandTotal + siteConfig.shipping.defaultEstimatedShipping,
      },
      currency: siteConfig.commerce.currency,
      sessionId: state.sessionId,
      paymentTerms,
      companyWebsite: honeypotRef.current?.value || "",
      formRenderedAt,
    };

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as OrderRequestResponse;
      setResult(data);
      if (data.success) clearCart();
    } catch {
      setResult({ success: false, message: "Something went wrong sending your request. Please try again or email us directly." });
    } finally {
      setIsSubmitting(false);
      setStep("confirmed");
    }
  }

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Request a Pro Forma Invoice"
      className="fixed inset-0 z-[120] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="glass-card rounded-brand shadow-brand w-full max-w-lg max-h-[85vh] overflow-y-auto p-7"
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-xl font-semibold">
            {step === "form" && "Request a Pro Forma Invoice"}
            {step === "review" && "Review Your Order"}
            {step === "confirmed" && "Order Request"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-ink/5"
          >
            ✕
          </button>
        </div>

        {/* Honeypot — hidden from real users, left empty; a filled value marks the submission as spam */}
        <input
          ref={honeypotRef}
          type="text"
          name="companyWebsite"
          tabIndex={-1}
          autoComplete="off"
          className="absolute -left-[9999px] w-px h-px overflow-hidden"
          aria-hidden="true"
        />

        {step === "form" && (
          <OrderForm
            defaultValues={customer ?? undefined}
            onCancel={onClose}
            onSubmit={(values) => {
              setCustomer(values);
              setStep("review");
            }}
          />
        )}

        {step === "review" && customer && (
          <OrderReview
            customer={customer}
            items={state.items}
            totals={totals}
            onBack={() => setStep("form")}
            onConfirm={handleConfirm}
            isSubmitting={isSubmitting}
          />
        )}

        {step === "confirmed" && result && (
          <OrderConfirmation
            invoiceNumber={result.invoiceNumber}
            message={result.message}
            isError={!result.success}
            onClose={onClose}
          />
        )}
      </motion.div>
    </motion.div>
  );
}
