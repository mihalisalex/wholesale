import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";

declare global {
  var __pgClient: ReturnType<typeof postgres> | undefined;
}

function createClient() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set. Add your Neon connection string to .env.local.");
  }
  return postgres(connectionString, { max: 1 });
}

// Reuse the same connection across hot reloads in dev instead of opening a
// new one on every file edit; each serverless invocation in production still
// gets its own module instance as usual.
const client = global.__pgClient ?? createClient();
if (process.env.NODE_ENV !== "production") global.__pgClient = client;

export const db = drizzle(client, { schema });
