import { readJsonFile, writeJsonFile } from "@/lib/admin/data-store";
import type { Collection } from "@/types/collection";

const COLLECTIONS_FILE = "collections.json";

function loadCollections(): Collection[] {
  return readJsonFile<Collection[]>(COLLECTIONS_FILE);
}

function saveCollections(collections: Collection[]): void {
  writeJsonFile(COLLECTIONS_FILE, collections);
}

export function getAllCollections(): Collection[] {
  return loadCollections();
}

export function getCollectionById(id: string): Collection | undefined {
  return loadCollections().find((c) => c.id === id);
}

export function createCollection(collection: Collection): Collection {
  const collections = loadCollections();
  if (collections.some((c) => c.slug === collection.slug)) {
    throw new Error(`A collection with slug "${collection.slug}" already exists.`);
  }
  collections.push(collection);
  saveCollections(collections);
  return collection;
}

export function updateCollection(id: string, updates: Collection): Collection {
  const collections = loadCollections();
  const index = collections.findIndex((c) => c.id === id);
  if (index === -1) {
    throw new Error(`Collection with id "${id}" not found.`);
  }
  const duplicateSlug = collections.some((c) => c.id !== id && c.slug === updates.slug);
  if (duplicateSlug) {
    throw new Error(`A collection with slug "${updates.slug}" already exists.`);
  }
  collections[index] = { ...updates, id };
  saveCollections(collections);
  return collections[index];
}

export function deleteCollection(id: string): void {
  const collections = loadCollections();
  const next = collections.filter((c) => c.id !== id);
  if (next.length === collections.length) {
    throw new Error(`Collection with id "${id}" not found.`);
  }
  saveCollections(next);
}
