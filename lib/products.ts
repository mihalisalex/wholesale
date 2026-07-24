import { eq, ne, or, and } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { products } from "@/lib/db/schema";
import type { Product, ProductCategory } from "@/types/product";

export async function getAllProducts(): Promise<Product[]> {
  return db.select().from(products) as Promise<Product[]>;
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const rows = (await db.select().from(products).where(eq(products.slug, slug))) as Product[];
  return rows[0];
}

export async function getProductBySku(sku: string): Promise<Product | undefined> {
  const rows = (await db.select().from(products).where(eq(products.sku, sku))) as Product[];
  return rows[0];
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const rows = (await db.select().from(products).where(eq(products.id, id))) as Product[];
  return rows[0];
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  const rows = (await db
    .select()
    .from(products)
    .where(and(ne(products.id, product.id), or(eq(products.category, product.category), eq(products.collection, product.collection))))) as Product[];
  return rows.slice(0, limit);
}

export interface FilterOptions {
  categories: ProductCategory[];
  colors: { name: string; hex: string }[];
  materials: string[];
  sizes: string[];
  collections: string[];
  priceRange: { min: number; max: number };
}

export async function getFilterOptions(): Promise<FilterOptions> {
  const all = await getAllProducts();
  const categories = Array.from(new Set(all.map((p) => p.category)));
  const colorMap = new Map<string, string>();
  all.forEach((p) => colorMap.set(p.color, p.colorHex));
  const materials = Array.from(new Set(all.map((p) => p.material)));
  const sizes = Array.from(new Set(all.flatMap((p) => p.sizes))).sort();
  const collections = Array.from(new Set(all.map((p) => p.collection)));
  const prices = all.length ? all.map((p) => p.pricePerPackage) : [0];

  return {
    categories,
    colors: Array.from(colorMap, ([name, hex]) => ({ name, hex })),
    materials,
    sizes,
    collections,
    priceRange: { min: Math.min(...prices), max: Math.max(...prices) },
  };
}

// ---- Admin write operations ----

export async function createProduct(product: Product): Promise<Product> {
  const existing = await db.select().from(products).where(or(eq(products.slug, product.slug), eq(products.sku, product.sku)));
  if (existing.some((p) => p.slug === product.slug)) {
    throw new Error(`A product with slug "${product.slug}" already exists.`);
  }
  if (existing.some((p) => p.sku === product.sku)) {
    throw new Error(`A product with SKU "${product.sku}" already exists.`);
  }
  await db.insert(products).values(product);
  return product;
}

export async function updateProduct(id: string, updates: Product): Promise<Product> {
  const existing = await db.select().from(products).where(eq(products.slug, updates.slug));
  if (existing.some((p) => p.id !== id && p.slug === updates.slug)) {
    throw new Error(`A product with slug "${updates.slug}" already exists.`);
  }
  const existingSku = await db.select().from(products).where(eq(products.sku, updates.sku));
  if (existingSku.some((p) => p.id !== id && p.sku === updates.sku)) {
    throw new Error(`A product with SKU "${updates.sku}" already exists.`);
  }
  const next = { ...updates, id };
  await db.update(products).set(next).where(eq(products.id, id));
  return next;
}

export async function deleteProduct(id: string): Promise<void> {
  const deleted = await db.delete(products).where(eq(products.id, id)).returning({ id: products.id });
  if (deleted.length === 0) {
    throw new Error(`Product with id "${id}" not found.`);
  }
}
