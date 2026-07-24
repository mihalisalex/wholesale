import { requireAdminApi } from "@/lib/admin/auth";
import { parseJsonBody } from "@/lib/admin/validate";
import { orderStatusInputSchema } from "@/lib/validation/adminSchemas";
import { getOrderById, updateOrderStatus } from "@/lib/orders";

export const runtime = "nodejs";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;

  const { id } = await params;
  const order = await getOrderById(id);
  if (!order) return Response.json({ success: false, message: "Order not found." }, { status: 404 });
  return Response.json({ success: true, order });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;

  const { id } = await params;
  const { data, error } = await parseJsonBody(request, orderStatusInputSchema);
  if (error) return error;

  try {
    const updated = await updateOrderStatus(id, data.status);
    return Response.json({ success: true, order: updated });
  } catch (err) {
    return Response.json(
      { success: false, message: err instanceof Error ? err.message : "Could not update order." },
      { status: 404 }
    );
  }
}
