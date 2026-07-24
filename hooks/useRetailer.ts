"use client";

import { useContext } from "react";
import { RetailerContext } from "@/context/RetailerContext";

export function useRetailer() {
  return useContext(RetailerContext);
}
