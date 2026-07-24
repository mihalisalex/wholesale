"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Product } from "@/types/product";
import type { FilterOptions } from "@/lib/products";
import { FilterSidebar, type CatalogFilters } from "./FilterSidebar";
import { MobileFilterSheet } from "./MobileFilterSheet";
import { ProductCard } from "./ProductCard";
import { searchProducts } from "@/lib/search";
import { useRetailer } from "@/hooks/useRetailer";

type SortKey = "newest" | "price-asc" | "price-desc" | "alphabetical";

interface CatalogClientProps {
  products: Product[];
  options: FilterOptions;
}

function readList(params: URLSearchParams, key: string): string[] {
  const value = params.get(key);
  return value ? value.split(",").filter(Boolean) : [];
}

export function CatalogClient({ products, options }: CatalogClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLoggedIn } = useRetailer();

  const [isMobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [search, setSearch] = useState(searchParams.get("q") ?? "");
  const [sort, setSort] = useState<SortKey>((searchParams.get("sort") as SortKey) ?? "newest");
  const [filters, setFilters] = useState<CatalogFilters>({
    category: readList(searchParams, "category"),
    color: readList(searchParams, "color"),
    material: readList(searchParams, "material"),
    size: readList(searchParams, "size"),
    collection: readList(searchParams, "collection"),
    gender: readList(searchParams, "gender"),
    newArrivalsOnly: searchParams.get("isNewArrival") === "true",
    minPrice: Number(searchParams.get("minPrice") ?? options.priceRange.min),
    maxPrice: Number(searchParams.get("maxPrice") ?? options.priceRange.max),
  });

  function applyFilters(next: CatalogFilters) {
    setFilters(next);
    syncUrl(next, search, sort);
  }

  function syncUrl(f: CatalogFilters, q: string, s: SortKey) {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (s !== "newest") params.set("sort", s);
    if (f.category.length) params.set("category", f.category.join(","));
    if (f.color.length) params.set("color", f.color.join(","));
    if (f.material.length) params.set("material", f.material.join(","));
    if (f.size.length) params.set("size", f.size.join(","));
    if (f.collection.length) params.set("collection", f.collection.join(","));
    if (f.gender.length) params.set("gender", f.gender.join(","));
    if (f.newArrivalsOnly) params.set("isNewArrival", "true");
    if (f.minPrice !== options.priceRange.min) params.set("minPrice", String(f.minPrice));
    if (f.maxPrice !== options.priceRange.max) params.set("maxPrice", String(f.maxPrice));
    router.replace(`/catalog${params.toString() ? `?${params.toString()}` : ""}`, { scroll: false });
  }

  function resetFilters() {
    const cleared: CatalogFilters = {
      category: [],
      color: [],
      material: [],
      size: [],
      collection: [],
      gender: [],
      newArrivalsOnly: false,
      minPrice: options.priceRange.min,
      maxPrice: options.priceRange.max,
    };
    setFilters(cleared);
    setSearch("");
    syncUrl(cleared, "", sort);
  }

  const filtered = useMemo(() => {
    const searched = search.trim() ? searchProducts(products, search) : products;

    let list = searched.filter((p) => {
      if (filters.category.length && !filters.category.includes(p.category)) return false;
      if (filters.color.length && !filters.color.includes(p.color)) return false;
      if (filters.material.length && !filters.material.includes(p.material)) return false;
      if (filters.size.length && !filters.size.some((s) => p.sizes.includes(s))) return false;
      if (filters.collection.length && !filters.collection.includes(p.collection)) return false;
      if (filters.gender.length && !filters.gender.includes(p.gender)) return false;
      if (filters.newArrivalsOnly && !p.isNewArrival) return false;
      if (p.pricePerPackage < filters.minPrice || p.pricePerPackage > filters.maxPrice) return false;
      return true;
    });

    list = [...list].sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return a.pricePerPackage - b.pricePerPackage;
        case "price-desc":
          return b.pricePerPackage - a.pricePerPackage;
        case "alphabetical":
          return a.name.localeCompare(b.name);
        case "newest":
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    return list;
  }, [products, search, filters, sort]);

  const activeFilterCount =
    filters.category.length +
    filters.color.length +
    filters.material.length +
    filters.size.length +
    filters.collection.length +
    filters.gender.length +
    (filters.newArrivalsOnly ? 1 : 0) +
    (filters.minPrice !== options.priceRange.min ? 1 : 0) +
    (filters.maxPrice !== options.priceRange.max ? 1 : 0);

  return (
    <div className="flex flex-col lg:flex-row gap-10">
      <div className="hidden lg:block">
        <FilterSidebar options={options} filters={filters} onChange={applyFilters} onReset={resetFilters} />
      </div>

      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 md:mb-8">
          <div className="relative flex-1 max-w-sm">
            <input
              type="search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                syncUrl(filters, e.target.value, sort);
              }}
              placeholder="Search by name, SKU or tag…"
              className="w-full rounded-full border border-ink/15 bg-white px-4 py-3 sm:py-2.5 text-base sm:text-sm focus:outline-none focus:border-gold"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 rounded-full border border-ink/20 px-4 py-3 text-sm font-semibold shrink-0"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M4 6h16M7 12h10M10 18h4" strokeLinecap="round" />
              </svg>
              Filters
              {activeFilterCount > 0 && (
                <span className="bg-ink text-cream text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
            <span className="hidden sm:inline text-xs text-ink/50">{filtered.length} styles</span>
            <select
              value={sort}
              onChange={(e) => {
                const next = e.target.value as SortKey;
                setSort(next);
                syncUrl(filters, search, next);
              }}
              className="rounded-full border border-ink/15 bg-white px-3.5 py-2.5 text-sm"
            >
              <option value="newest">Newest</option>
              {isLoggedIn && <option value="price-asc">Price: Low to High</option>}
              {isLoggedIn && <option value="price-desc">Price: High to Low</option>}
              <option value="alphabetical">Alphabetical</option>
            </select>
          </div>
        </div>

        <p className="sm:hidden text-xs text-ink/50 mb-4">{filtered.length} styles</p>

        {filtered.length === 0 ? (
          <div className="py-24 text-center text-ink/50">
            <p className="font-serif text-xl mb-2">No styles match those filters.</p>
            <button type="button" onClick={resetFilters} className="text-gold underline text-sm">
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      <MobileFilterSheet
        isOpen={isMobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        options={options}
        filters={filters}
        onChange={applyFilters}
        onReset={resetFilters}
        resultCount={filtered.length}
      />
    </div>
  );
}
