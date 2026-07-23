import { readJsonFile, writeJsonFile } from "@/lib/admin/data-store";
import type { Product, ProductCategory } from "@/types/product";

const PRODUCTS_FILE = "products.json";

/**
 * Server-only. Reads straight from disk on every call (no in-memory cache)
 * so admin edits made through `/admin/products` show up on the public site
 * immediately, without a restart or rebuild.
 */
function loadProducts(): Product[] {
  return readJsonFile<Product[]>(PRODUCTS_FILE);
}

function saveProducts(products: Product[]): void {
  writeJsonFile(PRODUCTS_FILE, products);
}

export function getAllProducts(): Product[] {
  return loadProducts();
}

export function getProductBySlug(slug: string): Product | undefined {
  return loadProducts().find((p) => p.slug === slug);
}

export function getProductBySku(sku: string): Product | undefined {
  return loadProducts().find((p) => p.sku === sku);
}

export function getProductById(id: string): Product | undefined {
  return loadProducts().find((p) => p.id === id);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return loadProducts()
    .filter((p) => p.id !== product.id && (p.category === product.category || p.collection === product.collection))
    .slice(0, limit);
}

export interface FilterOptions {
  categories: ProductCategory[];
  colors: { name: string; hex: string }[];
  materials: string[];
  sizes: string[];
  collections: string[];
  priceRange: { min: number; max: number };
}

export function getFilterOptions(): FilterOptions {
  const products = loadProducts();
  const categories = Array.from(new Set(products.map((p) => p.category)));
  const colorMap = new Map<string, string>();
  products.forEach((p) => colorMap.set(p.color, p.colorHex));
  const materials = Array.from(new Set(products.map((p) => p.material)));
  const sizes = Array.from(new Set(products.flatMap((p) => p.sizes))).sort();
  const collections = Array.from(new Set(products.map((p) => p.collection)));
  const prices = products.length ? products.map((p) => p.pricePerPackage) : [0];

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

export function createProduct(product: Product): Product {
  const products = loadProducts();
  if (products.some((p) => p.slug === product.slug)) {
    throw new Error(`A product with slug "${product.slug}" already exists.`);
  }
  if (products.some((p) => p.sku === product.sku)) {
    throw new Error(`A product with SKU "${product.sku}" already exists.`);
  }
  products.push(product);
  saveProducts(products);
  return product;
}

export function updateProduct(id: string, updates: Product): Product {
  const products = loadProducts();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) {
    throw new Error(`Product with id "${id}" not found.`);
  }
  const duplicateSlug = products.some((p) => p.id !== id && p.slug === updates.slug);
  if (duplicateSlug) {
    throw new Error(`A product with slug "${updates.slug}" already exists.`);
  }
  const duplicateSku = products.some((p) => p.id !== id && p.sku === updates.sku);
  if (duplicateSku) {
    throw new Error(`A product with SKU "${updates.sku}" already exists.`);
  }
  products[index] = { ...updates, id };
  saveProducts(products);
  return products[index];
}

export function deleteProduct(id: string): void {
  const products = loadProducts();
  const next = products.filter((p) => p.id !== id);
  if (next.length === products.length) {
    throw new Error(`Product with id "${id}" not found.`);
  }
  saveProducts(next);
}
