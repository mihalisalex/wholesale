"use client";

import { createContext, type ReactNode } from "react";

interface RetailerContextValue {
  isLoggedIn: boolean;
  companyName: string | null;
}

export const RetailerContext = createContext<RetailerContextValue>({
  isLoggedIn: false,
  companyName: null,
});

export function RetailerProvider({
  retailer,
  children,
}: {
  retailer: { companyName: string } | null;
  children: ReactNode;
}) {
  const value: RetailerContextValue = {
    isLoggedIn: retailer !== null,
    companyName: retailer?.companyName ?? null,
  };

  return <RetailerContext.Provider value={value}>{children}</RetailerContext.Provider>;
}
