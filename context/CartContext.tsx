"use client";

import { createContext, useEffect, useMemo, useReducer, useState, type ReactNode } from "react";
import type { CartAction, CartItem, CartState } from "@/types/cart";
import { createSessionId, loadCart, saveCart } from "@/lib/cart-storage";

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "HYDRATE":
      return action.payload;
    case "ADD_ITEM": {
      const { item, quantityPackages } = action.payload;
      const existing = state.items.find((i) => i.productId === item.productId);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.productId === item.productId
              ? { ...i, quantityPackages: i.quantityPackages + quantityPackages }
              : i
          ),
        };
      }
      const newItem: CartItem = { ...item, quantityPackages };
      return { ...state, items: [...state.items, newItem] };
    }
    case "UPDATE_QUANTITY": {
      const { productId, quantityPackages } = action.payload;
      if (quantityPackages <= 0) {
        return { ...state, items: state.items.filter((i) => i.productId !== productId) };
      }
      return {
        ...state,
        items: state.items.map((i) => (i.productId === productId ? { ...i, quantityPackages } : i)),
      };
    }
    case "REMOVE_ITEM":
      return { ...state, items: state.items.filter((i) => i.productId !== action.payload.productId) };
    case "CLEAR_CART":
      return { ...state, items: [] };
    default:
      return state;
  }
}

function emptyState(): CartState {
  return { version: 1, sessionId: "", items: [] };
}

interface CartContextValue {
  state: CartState;
  hasHydrated: boolean;
  isDrawerOpen: boolean;
  totals: { totalPackages: number; totalPairs: number; grandTotal: number };
  addItem: (item: Omit<CartItem, "quantityPackages">, quantityPackages: number) => void;
  updateQuantity: (productId: string, quantityPackages: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
}

export const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, emptyState);
  const [hasHydrated, setHasHydrated] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  // One-time seed from localStorage on mount. This can't be read during
  // render (server has no localStorage, and reading it there would produce
  // an SSR/client markup mismatch), so the empty-state render on mount is
  // intentional and briefly true on the client before this effect runs.
  useEffect(() => {
    const persisted = loadCart();
    dispatch({
      type: "HYDRATE",
      payload: persisted ?? { version: 1, sessionId: createSessionId(), items: [] },
    });
    // eslint-disable-next-line react-hooks/set-state-in-effect -- required for SSR-safe localStorage hydration, see comment above
    setHasHydrated(true);
  }, []);

  useEffect(() => {
    if (!hasHydrated) return;
    saveCart(state);
  }, [state, hasHydrated]);

  const totals = useMemo(() => {
    const totalPackages = state.items.reduce((sum, i) => sum + i.quantityPackages, 0);
    const totalPairs = state.items.reduce((sum, i) => sum + i.quantityPackages * i.packageSize, 0);
    const grandTotal = state.items.reduce((sum, i) => sum + i.quantityPackages * i.pricePerPackage, 0);
    return { totalPackages, totalPairs, grandTotal };
  }, [state.items]);

  const value: CartContextValue = {
    state,
    hasHydrated,
    isDrawerOpen,
    totals,
    addItem: (item, quantityPackages) => {
      dispatch({ type: "ADD_ITEM", payload: { item, quantityPackages } });
      setDrawerOpen(true);
    },
    updateQuantity: (productId, quantityPackages) =>
      dispatch({ type: "UPDATE_QUANTITY", payload: { productId, quantityPackages } }),
    removeItem: (productId) => dispatch({ type: "REMOVE_ITEM", payload: { productId } }),
    clearCart: () => dispatch({ type: "CLEAR_CART" }),
    openDrawer: () => setDrawerOpen(true),
    closeDrawer: () => setDrawerOpen(false),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
