"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { FilterOptions } from "@/lib/products";
import { formatCurrency } from "@/lib/format";
import type { CatalogFilters } from "./FilterSidebar";

interface MobileFilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  options: FilterOptions;
  filters: CatalogFilters;
  onChange: (filters: CatalogFilters) => void;
  onReset: () => void;
  resultCount: number;
}

function toggleValue(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

export function MobileFilterSheet({ isOpen, onClose, options, filters, onChange, onReset, resultCount }: MobileFilterSheetProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Filter products"
          className="md:hidden fixed inset-0 z-[205] bg-cream flex flex-col"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center justify-between px-5 pt-[calc(1rem+env(safe-area-inset-top))] pb-4 border-b border-ink/10 shrink-0">
            <h2 className="font-serif text-xl font-semibold">Filters</h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close filters"
              className="w-11 h-11 rounded-full flex items-center justify-center hover:bg-ink/5 -mr-2"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-6 space-y-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink/50 mb-3">Gender</p>
              <div className="flex flex-col gap-1">
                {["men", "women"].map((g) => (
                  <label key={g} className="flex items-center gap-3 text-base py-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.gender.includes(g)}
                      onChange={() => onChange({ ...filters, gender: toggleValue(filters.gender, g) })}
                      className="w-6 h-6 accent-gold"
                    />
                    <span className="capitalize">{g}&rsquo;s</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink/50 mb-3">Category</p>
              <div className="flex flex-col gap-1">
                {options.categories.map((c) => (
                  <label key={c} className="flex items-center gap-3 text-base py-2.5 cursor-pointer capitalize">
                    <input
                      type="checkbox"
                      checked={filters.category.includes(c)}
                      onChange={() => onChange({ ...filters, category: toggleValue(filters.category, c) })}
                      className="w-6 h-6 accent-gold"
                    />
                    {c}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink/50 mb-3">Color</p>
              <div className="flex flex-wrap gap-3">
                {options.colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    title={c.name}
                    onClick={() => onChange({ ...filters, color: toggleValue(filters.color, c.name) })}
                    className={`w-11 h-11 rounded-full border-2 transition-transform ${
                      filters.color.includes(c.name) ? "border-gold scale-110" : "border-ink/15"
                    }`}
                    style={{ backgroundColor: c.hex }}
                    aria-pressed={filters.color.includes(c.name)}
                    aria-label={c.name}
                  />
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink/50 mb-3">Material</p>
              <div className="flex flex-col gap-1">
                {options.materials.map((m) => (
                  <label key={m} className="flex items-center gap-3 text-base py-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.material.includes(m)}
                      onChange={() => onChange({ ...filters, material: toggleValue(filters.material, m) })}
                      className="w-6 h-6 accent-gold"
                    />
                    {m}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink/50 mb-3">Size</p>
              <div className="flex flex-wrap gap-2.5">
                {options.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => onChange({ ...filters, size: toggleValue(filters.size, s) })}
                    className={`text-sm px-4 py-2.5 rounded-full border ${
                      filters.size.includes(s) ? "bg-ink text-cream border-ink" : "border-ink/15 text-ink/70"
                    }`}
                  >
                    {s.replace("EU ", "")}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink/50 mb-3">Collection</p>
              <div className="flex flex-col gap-1">
                {options.collections.map((c) => (
                  <label key={c} className="flex items-center gap-3 text-base py-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.collection.includes(c)}
                      onChange={() => onChange({ ...filters, collection: toggleValue(filters.collection, c) })}
                      className="w-6 h-6 accent-gold"
                    />
                    {c}
                  </label>
                ))}
              </div>
            </div>

            <label className="flex items-center gap-3 text-base cursor-pointer">
              <input
                type="checkbox"
                checked={filters.newArrivalsOnly}
                onChange={() => onChange({ ...filters, newArrivalsOnly: !filters.newArrivalsOnly })}
                className="w-6 h-6 accent-gold"
              />
              New Arrivals Only
            </label>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink/50 mb-3">
                Price {formatCurrency(filters.minPrice)} – {formatCurrency(filters.maxPrice)}
              </p>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  inputMode="numeric"
                  min={options.priceRange.min}
                  max={filters.maxPrice}
                  value={filters.minPrice}
                  onChange={(e) => onChange({ ...filters, minPrice: Number(e.target.value) })}
                  className="w-full rounded-brand-sm border border-ink/15 px-3 py-3 text-base"
                />
                <span className="text-ink/40">–</span>
                <input
                  type="number"
                  inputMode="numeric"
                  min={filters.minPrice}
                  max={options.priceRange.max}
                  value={filters.maxPrice}
                  onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
                  className="w-full rounded-brand-sm border border-ink/15 px-3 py-3 text-base"
                />
              </div>
            </div>
          </div>

          <div className="shrink-0 border-t border-ink/10 px-5 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))] flex gap-3 bg-cream">
            <button type="button" onClick={onReset} className="flex-1 rounded-full border border-ink text-ink font-semibold py-3.5">
              Clear all
            </button>
            <button type="button" onClick={onClose} className="flex-1 rounded-full bg-ink text-cream font-semibold py-3.5">
              Show {resultCount} {resultCount === 1 ? "style" : "styles"}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
