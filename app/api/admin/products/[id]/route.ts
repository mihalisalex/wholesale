import { requireAdminApi } from "@/lib/admin/auth";
import { parseJsonBody } from "@/lib/admin/validate";
import { productInputSchema } from "@/lib/validation/adminSchemas";
import { getProductById, updateProduct, deleteProduct } from "@/lib/products";
import type { Product } from "@/types/product";

export const runtime = "nodejs";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;

  const { id } = await params;
  const product = getProductById(id);
  if (!product) return Response.json({ success: false, message: "Product not found." }, { status: 404 });
  return Response.json({ success: true, product });
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;

  const { id } = await params;
  const { data, error } = await parseJsonBody(request, productInputSchema);
  if (error) return error;

  const product: Product = { ...data, id };
  try {
    const updated = updateProduct(id, product);
    return Response.json({ success: true, product: updated });
  } catch (err) {
    return Response.json(
      { success: false, message: err instanceof Error ? err.message : "Could not update product." },
      { status: 409 }
    );
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;

  const { id } = await params;
  try {
    deleteProduct(id);
    return Response.json({ success: true, message: "Product deleted." });
  } catch (err) {
    return Response.json(
      { success: false, message: err instanceof Error ? err.message : "Could not delete product." },
      { status: 404 }
    );
  }
}
