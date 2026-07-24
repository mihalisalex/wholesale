import { eq, desc } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { orders, orderItems } from "@/lib/db/schema";
import type { OrderStatus, StoredOrder } from "@/types/order";

function toStoredOrder(
  order: typeof orders.$inferSelect,
  items: (typeof orderItems.$inferSelect)[]
): StoredOrder {
  return {
    id: order.id,
    invoiceNumber: order.invoiceNumber,
    createdAt: order.createdAt.toISOString(),
    status: order.status as OrderStatus,
    customer: order.customer,
    items: items.map((i) => ({
      sku: i.sku,
      name: i.name,
      color: i.color,
      pricePerPackage: i.pricePerPackage,
      quantityPackages: i.quantityPackages,
      packageSize: i.packageSize,
      pairs: i.pairs,
      subtotal: i.subtotal,
    })),
    totals: {
      totalPackages: order.totalPackages,
      totalPairs: order.totalPairs,
      subtotal: order.subtotal,
      estimatedShipping: order.estimatedShipping,
      grandTotal: order.grandTotal,
    },
    currency: order.currency,
    paymentTerms: order.paymentTerms,
  };
}

export async function getAllOrders(): Promise<StoredOrder[]> {
  const orderRows = await db.select().from(orders).orderBy(desc(orders.createdAt));
  const itemRows = await db.select().from(orderItems);
  return orderRows.map((o) => toStoredOrder(o, itemRows.filter((i) => i.orderId === o.id)));
}

export async function getOrdersForRetailer(retailerId: string): Promise<StoredOrder[]> {
  const orderRows = await db.select().from(orders).where(eq(orders.retailerId, retailerId)).orderBy(desc(orders.createdAt));
  const itemRows = await db.select().from(orderItems);
  return orderRows.map((o) => toStoredOrder(o, itemRows.filter((i) => i.orderId === o.id)));
}

export async function getOrderById(id: string): Promise<StoredOrder | undefined> {
  const orderRows = await db.select().from(orders).where(eq(orders.id, id));
  const order = orderRows[0];
  if (!order) return undefined;
  const items = await db.select().from(orderItems).where(eq(orderItems.orderId, id));
  return toStoredOrder(order, items);
}

export interface CreateOrderInput {
  invoiceNumber: string;
  retailerId: string;
  status: OrderStatus;
  customer: StoredOrder["customer"];
  items: StoredOrder["items"];
  totals: StoredOrder["totals"];
  currency: string;
  paymentTerms: string;
}

export async function createOrder(input: CreateOrderInput): Promise<StoredOrder> {
  const [order] = await db
    .insert(orders)
    .values({
      invoiceNumber: input.invoiceNumber,
      retailerId: input.retailerId,
      status: input.status,
      currency: input.currency,
      paymentTerms: input.paymentTerms,
      customer: input.customer,
      totalPackages: input.totals.totalPackages,
      totalPairs: input.totals.totalPairs,
      subtotal: input.totals.subtotal,
      estimatedShipping: input.totals.estimatedShipping,
      grandTotal: input.totals.grandTotal,
    })
    .returning();

  if (input.items.length > 0) {
    await db.insert(orderItems).values(input.items.map((item) => ({ ...item, orderId: order.id })));
  }

  return toStoredOrder(
    order,
    input.items.map((item) => ({ ...item, id: "", orderId: order.id }))
  );
}

export async function updateOrderStatus(id: string, status: OrderStatus): Promise<StoredOrder> {
  const [updated] = await db.update(orders).set({ status }).where(eq(orders.id, id)).returning();
  if (!updated) {
    throw new Error(`Order with id "${id}" not found.`);
  }
  const items = await db.select().from(orderItems).where(eq(orderItems.orderId, id));
  return toStoredOrder(updated, items);
}
