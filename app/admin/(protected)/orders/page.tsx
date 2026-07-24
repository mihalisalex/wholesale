import { getAllOrders } from "@/lib/orders";
import { OrdersTable } from "@/components/admin/OrdersTable";

export default async function AdminOrdersPage() {
  const orders = await getAllOrders();
  const newCount = orders.filter((o) => o.status === "new").length;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-[0.72rem] uppercase tracking-wider font-bold text-gold mb-2">Sales</p>
          <h1 className="font-serif text-2xl font-semibold">Orders</h1>
        </div>
      </div>
      <p className="text-sm text-ink/50 mb-6">
        Every Pro Forma Invoice request submitted from the catalog or Quick Order lands here
        {newCount > 0 ? ` — ${newCount} new.` : "."}
      </p>
      <OrdersTable orders={orders} />
    </div>
  );
}
