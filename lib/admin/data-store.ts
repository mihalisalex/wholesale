import fs from "node:fs";
import path from "node:path";

/**
 * Minimal filesystem-backed JSON persistence for admin-editable data
 * (products, collections, SEO). Server-only — never import this from a
 * "use client" component or any module that ends up in the client bundle.
 *
 * This intentionally mirrors the project's existing "no database, JSON
 * data" approach rather than introducing a real database: reads/writes hit
 * `data/*.json` directly, so it works anywhere with a writable, persistent
 * filesystem (local dev, a traditional Node server/VPS). It will NOT
 * persist writes on stateless/serverless hosts (e.g. Vercel's production
 * runtime) — swap in a real database or a service like Vercel KV before
 * deploying there.
 */

const DATA_DIR = path.join(process.cwd(), "data");

export function readJsonFile<T>(filename: string): T {
  const filePath = path.join(DATA_DIR, filename);
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

export function writeJsonFile<T>(filename: string, data: T): void {
  const filePath = path.join(DATA_DIR, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n", "utf-8");
}
