"use client";

import type { FilterOptions } from "@/lib/products";
import { useRetailer } from "@/hooks/useRetailer";
import { PriceLock } from "@/components/ui/PriceLock";
import { formatCurrency } from "@/lib/format";

export interface CatalogFilters {
  category: string[];
  color: string[];
  material: string[];
  size: string[];
  collection: string[];
  gender: string[];
  newArrivalsOnly: boolean;
  minPrice: number;
  maxPrice: number;
}

interface FilterSidebarProps {
  options: FilterOptions;
  filters: CatalogFilters;
  onChange: (filters: CatalogFilters) => void;
  onReset: () => void;
}

function toggleValue(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

export function FilterSidebar({ options, filters, onChange, onReset }: FilterSidebarProps) {
  const { isLoggedIn } = useRetailer();

  return (
    <aside className="w-full lg:w-64 shrink-0 space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-lg font-semibold">Filters</h2>
        <button type="button" onClick={onReset} className="text-xs text-ink/50 hover:text-gold underline">
          Reset
        </button>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-ink/50 mb-3">Gender</p>
        <div className="flex flex-col gap-2">
          {["men", "women"].map((g) => (
            <label key={g} className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={filters.gender.includes(g)}
                onChange={() => onChange({ ...filters, gender: toggleValue(filters.gender, g) })}
                className="accent-gold"
              />
              <span className="capitalize">{g}&rsquo;s</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-ink/50 mb-3">Category</p>
        <div className="flex flex-col gap-2">
          {options.categories.map((c) => (
            <label key={c} className="flex items-center gap-2 text-sm cursor-pointer capitalize">
              <input
                type="checkbox"
                checked={filters.category.includes(c)}
                onChange={() => onChange({ ...filters, category: toggleValue(filters.category, c) })}
                className="accent-gold"
              />
              {c}
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-ink/50 mb-3">Color</p>
        <div className="flex flex-wrap gap-2">
          {options.colors.map((c) => (
            <button
              key={c.name}
              type="button"
              title={c.name}
              onClick={() => onChange({ ...filters, color: toggleValue(filters.color, c.name) })}
              className={`w-7 h-7 rounded-full border-2 transition-transform ${
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
        <div className="flex flex-col gap-2">
          {options.materials.map((m) => (
            <label key={m} className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={filters.material.includes(m)}
                onChange={() => onChange({ ...filters, material: toggleValue(filters.material, m) })}
                className="accent-gold"
              />
              {m}
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-ink/50 mb-3">Size</p>
        <div className="flex flex-wrap gap-2">
          {options.sizes.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => onChange({ ...filters, size: toggleValue(filters.size, s) })}
              className={`text-xs px-2.5 py-1.5 rounded-full border ${
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
        <div className="flex flex-col gap-2">
          {options.collections.map((c) => (
            <label key={c} className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={filters.collection.includes(c)}
                onChange={() => onChange({ ...filters, collection: toggleValue(filters.collection, c) })}
                className="accent-gold"
              />
              {c}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={filters.newArrivalsOnly}
            onChange={() => onChange({ ...filters, newArrivalsOnly: !filters.newArrivalsOnly })}
            className="accent-gold"
          />
          New Arrivals Only
        </label>
      </div>

      {isLoggedIn ? (
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-ink/50 mb-3">
            Price {formatCurrency(filters.minPrice)} – {formatCurrency(filters.maxPrice)}
          </p>
          <div className="flex items-center gap-3">
            <input
              type="number"
              min={options.priceRange.min}
              max={filters.maxPrice}
              value={filters.minPrice}
              onChange={(e) => onChange({ ...filters, minPrice: Number(e.target.value) })}
              className="w-full rounded-brand-sm border border-ink/15 px-2 py-1.5 text-sm"
            />
            <span className="text-ink/40">–</span>
            <input
              type="number"
              min={filters.minPrice}
              max={options.priceRange.max}
              value={filters.maxPrice}
              onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
              className="w-full rounded-brand-sm border border-ink/15 px-2 py-1.5 text-sm"
            />
          </div>
        </div>
      ) : (
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-ink/50 mb-2">Price</p>
          <PriceLock size="sm" />
        </div>
      )}
    </aside>
  );
}
