"use client";

import { useState } from "react";
import { CartButton } from "./CartButton";
import { CartDrawer } from "./CartDrawer";
import { OrderModal } from "@/components/order/OrderModal";

export function CartRoot() {
  const [isOrderModalOpen, setOrderModalOpen] = useState(false);

  return (
    <>
      <CartButton />
      <CartDrawer onRequestInvoice={() => setOrderModalOpen(true)} />
      <OrderModal isOpen={isOrderModalOpen} onClose={() => setOrderModalOpen(false)} />
    </>
  );
}
