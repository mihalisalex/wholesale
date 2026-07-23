"use client";

import { useState } from "react";
import type { Product } from "@/types/product";
import { BottomNav } from "./BottomNav";
import { FloatingContactButtons } from "./FloatingContactButtons";
import { SearchOverlay } from "./SearchOverlay";

export function MobileChrome({ products }: { products: Product[] }) {
  const [isSearchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <BottomNav onSearchClick={() => setSearchOpen(true)} />
      <FloatingContactButtons />
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setSearchOpen(false)} products={products} />
    </>
  );
}
