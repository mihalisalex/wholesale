"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/hooks/useCart";
import { CartLineItem } from "./CartLineItem";
import { CartTotals } from "./CartTotals";
import { Button } from "@/components/ui/Button";
import { buildCartShareMessage, buildWhatsAppLink } from "@/lib/contact";

interface CartDrawerProps {
  onRequestInvoice: () => void;
}

export function CartDrawer({ onRequestInvoice }: CartDrawerProps) {
  const { state, isDrawerOpen, closeDrawer, totals, hasHydrated } = useCart();
  const isEmpty = !hasHydrated || state.items.length === 0;

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-ink/40 z-[205]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            aria-hidden="true"
          />
          <motion.aside
            role="dialog"
            aria-label="Wholesale order cart"
            className="fixed top-0 right-0 h-full w-full max-w-md bg-cream z-[210] shadow-brand flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-ink/10">
              <h2 className="font-serif text-xl font-semibold">Wholesale Order Cart</h2>
              <button
                type="button"
                onClick={closeDrawer}
                aria-label="Close cart"
                className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-ink/5"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6">
              {isEmpty ? (
                <div className="py-16 text-center text-ink/50">
                  <p>Your cart is empty.</p>
                  <p className="text-sm mt-1">Browse the catalog and add packages to get started.</p>
                </div>
              ) : (
                state.items.map((item) => <CartLineItem key={item.productId} item={item} />)
              )}
            </div>

            {!isEmpty && (
              <div className="px-6 py-5 border-t border-ink/10 space-y-3">
                <CartTotals {...totals} />
                <Button
                  className="w-full"
                  onClick={() => {
                    closeDrawer();
                    onRequestInvoice();
                  }}
                >
                  Request Pro Forma Invoice
                </Button>
                <a
                  href={buildWhatsAppLink(buildCartShareMessage(state.items, totals))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full rounded-full border border-ink/15 text-ink font-semibold py-3 text-sm hover:border-accent-2 hover:text-accent-2 transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.6-1.3A9 9 0 1 0 12 3Z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Share via WhatsApp
                </a>
                <p className="text-xs text-ink/40 text-center">No payment collected here — this submits a quotation request.</p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
