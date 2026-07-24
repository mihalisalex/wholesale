import { requireAdminApi } from "@/lib/admin/auth";
import { parseJsonBody } from "@/lib/admin/validate";
import { productInputSchema } from "@/lib/validation/adminSchemas";
import { getAllProducts, createProduct } from "@/lib/products";
import type { Product } from "@/types/product";

export const runtime = "nodejs";

export async function GET() {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;
  return Response.json({ success: true, products: await getAllProducts() });
}

export async function POST(request: Request) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;

  const { data, error } = await parseJsonBody(request, productInputSchema);
  if (error) return error;

  const product: Product = { ...data, id: crypto.randomUUID() };
  try {
    await createProduct(product);
  } catch (err) {
    return Response.json(
      { success: false, message: err instanceof Error ? err.message : "Could not create product." },
      { status: 409 }
    );
  }
  return Response.json({ success: true, product }, { status: 201 });
}
