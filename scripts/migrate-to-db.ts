/**
 * One-time seed: reads the existing data/products.json and
 * data/collections.json and inserts them into Postgres. Safe to re-run —
 * uses upsert (onConflictDoUpdate) keyed on id, so it never duplicates rows.
 *
 * Usage: npx tsx scripts/migrate-to-db.ts
 */
import fs from "node:fs";
import path from "node:path";
import { db } from "../lib/db/client";
import { products, collections } from "../lib/db/schema";
import type { Product } from "../types/product";
import type { Collection } from "../types/collection";

function readJson<T>(filename: string): T {
  const filePath = path.join(process.cwd(), "data", filename);
  return JSON.parse(fs.readFileSync(filePath, "utf-8")) as T;
}

async function main() {
  const productRows = readJson<Product[]>("products.json");
  const collectionRows = readJson<Collection[]>("collections.json");

  for (const c of collectionRows) {
    await db
      .insert(collections)
      .values(c)
      .onConflictDoUpdate({ target: collections.id, set: c });
  }
  console.log(`Seeded ${collectionRows.length} collections.`);

  for (const p of productRows) {
    await db
      .insert(products)
      .values(p)
      .onConflictDoUpdate({ target: products.id, set: p });
  }
  console.log(`Seeded ${productRows.length} products.`);

  process.exit(0);
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
