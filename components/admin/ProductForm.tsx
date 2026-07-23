"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { ProductLineArt, type ProductArtKey } from "@/components/icons/ProductLineArt";
import type { Product, ProductCategory, ProductGender, StockStatus } from "@/types/product";
import type { Collection } from "@/types/collection";

const ART_OPTIONS: { key: ProductArtKey; label: string }[] = [
  { key: "oxford", label: "Oxford" },
  { key: "chelsea", label: "Chelsea Boot" },
  { key: "penny", label: "Penny Loafer" },
  { key: "court", label: "Court Sneaker" },
  { key: "stiletto", label: "Stiletto Pump" },
  { key: "ballet", label: "Ballet Flat" },
  { key: "ankle", label: "Ankle Boot" },
  { key: "strappy", label: "Strappy Sandal" },
];

const CATEGORIES: ProductCategory[] = ["sneakers", "boots", "loafers", "sandals", "heels"];
const GENDERS: ProductGender[] = ["men", "women", "unisex"];
const STOCK_STATUSES: StockStatus[] = ["in-stock", "low-stock", "made-to-order"];

interface ProductFormValues {
  slug: string;
  sku: string;
  name: string;
  category: ProductCategory;
  collection: string;
  gender: ProductGender;
  description: string;
  color: string;
  colorHex: string;
  material: string;
  sizesText: string;
  pricePerPackage: string;
  art: ProductArtKey;
  tagsText: string;
  stockStatus: StockStatus;
  isNewArrival: boolean;
  createdAt: string;
  packagingInfo: string;
  metaTitle: string;
  metaDescription: string;
}

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function emptyValues(collections: Collection[]): ProductFormValues {
  return {
    slug: "",
    sku: "",
    name: "",
    category: "sneakers",
    collection: collections[0]?.name ?? "",
    gender: "unisex",
    description: "",
    color: "",
    colorHex: "#5B4FE8",
    material: "",
    sizesText: "EU 40, EU 41, EU 42, EU 43, EU 44",
    pricePerPackage: "",
    art: "court",
    tagsText: "",
    stockStatus: "in-stock",
    isNewArrival: false,
    createdAt: todayIso(),
    packagingInfo: "Individually boxed pairs, packed 8 pairs per master carton with barcode labels.",
    metaTitle: "",
    metaDescription: "",
  };
}

function fromProduct(product: Product): ProductFormValues {
  return {
    slug: product.slug,
    sku: product.sku,
    name: product.name,
    category: product.category,
    collection: product.collection,
    gender: product.gender,
    description: product.description,
    color: product.color,
    colorHex: product.colorHex,
    material: product.material,
    sizesText: product.sizes.join(", "),
    pricePerPackage: String(product.pricePerPackage),
    art: (product.images[0]?.art as ProductArtKey) ?? "court",
    tagsText: product.tags.join(", "),
    stockStatus: product.stockStatus,
    isNewArrival: product.isNewArrival,
    createdAt: product.createdAt,
    packagingInfo: product.packagingInfo,
    metaTitle: product.metaTitle ?? "",
    metaDescription: product.metaDescription ?? "",
  };
}

const inputClasses =
  "w-full rounded-brand-sm border border-ink/15 bg-white px-3.5 py-2.5 text-sm focus:outline-none focus:border-gold";
const labelClasses = "block text-xs font-semibold mb-1.5";

interface ProductFormProps {
  initialProduct?: Product;
  collections: Collection[];
}

export function ProductForm({ initialProduct, collections }: ProductFormProps) {
  const router = useRouter();
  const isEditing = Boolean(initialProduct);
  const [values, setValues] = useState<ProductFormValues>(
    initialProduct ? fromProduct(initialProduct) : emptyValues(collections)
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  function update<K extends keyof ProductFormValues>(key: K, value: ProductFormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function slugify(text: string) {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setFormError(null);

    const payload = {
      slug: values.slug || slugify(values.name),
      sku: values.sku,
      name: values.name,
      category: values.category,
      collection: values.collection,
      gender: values.gender,
      description: values.description,
      color: values.color,
      colorHex: values.colorHex,
      material: values.material,
      sizes: values.sizesText.split(",").map((s) => s.trim()).filter(Boolean),
      packageSize: 8 as const,
      pricePerPackage: Number(values.pricePerPackage),
      images: [
        { art: values.art, alt: `${values.name} in ${values.color}, side profile` },
        { art: values.art, alt: `${values.name} in ${values.color}, detail` },
      ],
      tags: values.tagsText.split(",").map((s) => s.trim()).filter(Boolean),
      stockStatus: values.stockStatus,
      isNewArrival: values.isNewArrival,
      createdAt: values.createdAt,
      packagingInfo: values.packagingInfo,
      metaTitle: values.metaTitle || undefined,
      metaDescription: values.metaDescription || undefined,
    };

    try {
      const url = isEditing ? `/api/admin/products/${initialProduct!.id}` : "/api/admin/products";
      const method = isEditing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrors(data.errors ?? {});
        setFormError(data.message ?? "Could not save product.");
        setIsSubmitting(false);
        return;
      }
      router.push("/admin/products");
      router.refresh();
    } catch {
      setFormError("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
      {formError && <p className="text-sm text-accent-3 bg-accent-3/10 rounded-brand-sm px-4 py-3">{formError}</p>}

      <section className="space-y-4">
        <h2 className="font-serif text-lg font-semibold">Basics</h2>
        <div>
          <label className={labelClasses}>Product name</label>
          <input
            className={inputClasses}
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            onBlur={() => !values.slug && update("slug", slugify(values.name))}
          />
          {errors.name && <p className="text-xs text-accent-3 mt-1">{errors.name}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClasses}>Slug (URL)</label>
            <input className={inputClasses} value={values.slug} onChange={(e) => update("slug", e.target.value)} />
            {errors.slug && <p className="text-xs text-accent-3 mt-1">{errors.slug}</p>}
          </div>
          <div>
            <label className={labelClasses}>SKU</label>
            <input className={inputClasses} value={values.sku} onChange={(e) => update("sku", e.target.value)} />
            {errors.sku && <p className="text-xs text-accent-3 mt-1">{errors.sku}</p>}
          </div>
        </div>
        <div>
          <label className={labelClasses}>Description</label>
          <textarea
            rows={3}
            className={inputClasses}
            value={values.description}
            onChange={(e) => update("description", e.target.value)}
          />
          {errors.description && <p className="text-xs text-accent-3 mt-1">{errors.description}</p>}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-lg font-semibold">Classification</h2>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className={labelClasses}>Category</label>
            <select className={inputClasses} value={values.category} onChange={(e) => update("category", e.target.value as ProductCategory)}>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClasses}>Gender</label>
            <select className={inputClasses} value={values.gender} onChange={(e) => update("gender", e.target.value as ProductGender)}>
              {GENDERS.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClasses}>Collection</label>
            <select className={inputClasses} value={values.collection} onChange={(e) => update("collection", e.target.value)}>
              {collections.length === 0 && <option value="">No collections yet</option>}
              {collections.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
            {errors.collection && <p className="text-xs text-accent-3 mt-1">{errors.collection}</p>}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input
            id="isNewArrival"
            type="checkbox"
            checked={values.isNewArrival}
            onChange={(e) => update("isNewArrival", e.target.checked)}
            className="accent-gold"
          />
          <label htmlFor="isNewArrival" className="text-sm">
            Mark as New Arrival
          </label>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-lg font-semibold">Appearance</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClasses}>Color name</label>
            <input className={inputClasses} value={values.color} onChange={(e) => update("color", e.target.value)} />
            {errors.color && <p className="text-xs text-accent-3 mt-1">{errors.color}</p>}
          </div>
          <div>
            <label className={labelClasses}>Color swatch</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={values.colorHex}
                onChange={(e) => update("colorHex", e.target.value)}
                className="w-11 h-10 rounded-brand-sm border border-ink/15 cursor-pointer"
              />
              <input
                className={inputClasses}
                value={values.colorHex}
                onChange={(e) => update("colorHex", e.target.value)}
              />
            </div>
            {errors.colorHex && <p className="text-xs text-accent-3 mt-1">{errors.colorHex}</p>}
          </div>
        </div>
        <div>
          <label className={labelClasses}>Material</label>
          <input className={inputClasses} value={values.material} onChange={(e) => update("material", e.target.value)} />
          {errors.material && <p className="text-xs text-accent-3 mt-1">{errors.material}</p>}
        </div>
        <div>
          <label className={labelClasses}>Gallery style (placeholder art)</label>
          <div className="grid grid-cols-4 gap-3">
            {ART_OPTIONS.map((opt) => (
              <button
                key={opt.key}
                type="button"
                onClick={() => update("art", opt.key)}
                className={`rounded-brand-sm border p-3 text-center transition-colors ${
                  values.art === opt.key ? "border-gold bg-gold/5" : "border-ink/15 bg-white"
                }`}
              >
                <ProductLineArt art={opt.key} className="w-full h-10 text-ink mb-1.5" />
                <span className="text-[0.65rem]">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-lg font-semibold">Wholesale details</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClasses}>Price per package (8 pairs)</label>
            <input
              type="number"
              min={0}
              step={0.01}
              className={inputClasses}
              value={values.pricePerPackage}
              onChange={(e) => update("pricePerPackage", e.target.value)}
            />
            {errors.pricePerPackage && <p className="text-xs text-accent-3 mt-1">{errors.pricePerPackage}</p>}
          </div>
          <div>
            <label className={labelClasses}>Stock status</label>
            <select
              className={inputClasses}
              value={values.stockStatus}
              onChange={(e) => update("stockStatus", e.target.value as StockStatus)}
            >
              {STOCK_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className={labelClasses}>Available sizes (comma-separated)</label>
          <input className={inputClasses} value={values.sizesText} onChange={(e) => update("sizesText", e.target.value)} />
          {errors.sizes && <p className="text-xs text-accent-3 mt-1">{errors.sizes}</p>}
        </div>
        <div>
          <label className={labelClasses}>Packaging info</label>
          <textarea
            rows={2}
            className={inputClasses}
            value={values.packagingInfo}
            onChange={(e) => update("packagingInfo", e.target.value)}
          />
        </div>
        <div>
          <label className={labelClasses}>Tags (comma-separated)</label>
          <input className={inputClasses} value={values.tagsText} onChange={(e) => update("tagsText", e.target.value)} />
        </div>
        <div>
          <label className={labelClasses}>Date added</label>
          <input
            type="date"
            className={inputClasses}
            value={values.createdAt}
            onChange={(e) => update("createdAt", e.target.value)}
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-lg font-semibold">SEO (optional overrides)</h2>
        <div>
          <label className={labelClasses}>Meta title</label>
          <input
            className={inputClasses}
            placeholder={values.name ? `${values.name} — Hervé Footwear Wholesale` : "Defaults to product name"}
            value={values.metaTitle}
            onChange={(e) => update("metaTitle", e.target.value)}
          />
        </div>
        <div>
          <label className={labelClasses}>Meta description</label>
          <textarea
            rows={2}
            className={inputClasses}
            placeholder="Defaults to the product description"
            value={values.metaDescription}
            onChange={(e) => update("metaDescription", e.target.value)}
          />
        </div>
      </section>

      <div className="flex gap-3 pt-2 pb-10">
        <Button type="button" variant="ghost" onClick={() => router.push("/admin/products")}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving…" : isEditing ? "Save Changes" : "Create Product"}
        </Button>
      </div>
    </form>
  );
}
