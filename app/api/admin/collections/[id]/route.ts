import { requireAdminApi } from "@/lib/admin/auth";
import { parseJsonBody } from "@/lib/admin/validate";
import { collectionInputSchema } from "@/lib/validation/adminSchemas";
import { updateCollection, deleteCollection } from "@/lib/collections";
import type { Collection } from "@/types/collection";

export const runtime = "nodejs";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;

  const { id } = await params;
  const { data, error } = await parseJsonBody(request, collectionInputSchema);
  if (error) return error;

  const collection: Collection = { ...data, id };
  try {
    const updated = updateCollection(id, collection);
    return Response.json({ success: true, collection: updated });
  } catch (err) {
    return Response.json(
      { success: false, message: err instanceof Error ? err.message : "Could not update collection." },
      { status: 409 }
    );
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;

  const { id } = await params;
  try {
    deleteCollection(id);
    return Response.json({ success: true, message: "Collection deleted." });
  } catch (err) {
    return Response.json(
      { success: false, message: err instanceof Error ? err.message : "Could not delete collection." },
      { status: 404 }
    );
  }
}
