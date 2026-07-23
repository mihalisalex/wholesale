import { requireAdminApi } from "@/lib/admin/auth";
import { parseJsonBody } from "@/lib/admin/validate";
import { collectionInputSchema } from "@/lib/validation/adminSchemas";
import { getAllCollections, createCollection } from "@/lib/collections";
import type { Collection } from "@/types/collection";

export const runtime = "nodejs";

export async function GET() {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;
  return Response.json({ success: true, collections: getAllCollections() });
}

export async function POST(request: Request) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;

  const { data, error } = await parseJsonBody(request, collectionInputSchema);
  if (error) return error;

  const collection: Collection = { ...data, id: crypto.randomUUID() };
  try {
    createCollection(collection);
  } catch (err) {
    return Response.json(
      { success: false, message: err instanceof Error ? err.message : "Could not create collection." },
      { status: 409 }
    );
  }
  return Response.json({ success: true, collection }, { status: 201 });
}
