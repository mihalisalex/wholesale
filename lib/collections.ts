import { eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { collections } from "@/lib/db/schema";
import type { Collection } from "@/types/collection";

export async function getAllCollections(): Promise<Collection[]> {
  return db.select().from(collections);
}

export async function getCollectionById(id: string): Promise<Collection | undefined> {
  const rows = await db.select().from(collections).where(eq(collections.id, id));
  return rows[0];
}

export async function createCollection(collection: Collection): Promise<Collection> {
  const existing = await db.select().from(collections).where(eq(collections.slug, collection.slug));
  if (existing.length > 0) {
    throw new Error(`A collection with slug "${collection.slug}" already exists.`);
  }
  await db.insert(collections).values(collection);
  return collection;
}

export async function updateCollection(id: string, updates: Collection): Promise<Collection> {
  const current = await getCollectionById(id);
  if (!current) {
    throw new Error(`Collection with id "${id}" not found.`);
  }
  const duplicate = await db.select().from(collections).where(eq(collections.slug, updates.slug));
  if (duplicate.some((c) => c.id !== id)) {
    throw new Error(`A collection with slug "${updates.slug}" already exists.`);
  }
  const next = { ...updates, id };
  await db.update(collections).set(next).where(eq(collections.id, id));
  return next;
}

export async function deleteCollection(id: string): Promise<void> {
  const deleted = await db.delete(collections).where(eq(collections.id, id)).returning({ id: collections.id });
  if (deleted.length === 0) {
    throw new Error(`Collection with id "${id}" not found.`);
  }
}
