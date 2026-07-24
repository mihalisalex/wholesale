"use client";

import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import { formatCurrency, formatDate, formatPricePerPair } from "@/lib/format";
import type { StoredOrder } from "@/types/order";

const STATUS_LABEL: Record<StoredOrder["status"], string> = {
  new: "New",
  reviewed: "Reviewed",
};

const STATUS_DOT: Record<StoredOrder["status"], string> = {
  new: "bg-accent-3",
  reviewed: "bg-accent-2",
};

export function OrdersTable({ orders }: { orders: StoredOrder[] }) {
  const router = useRouter();
  const [openId, setOpenId] = useState<string | null>(null);
  const [pendingId, setPendingId] = useState<string | null>(null);

  async function toggleReviewed(order: StoredOrder) {
    setPendingId(order.id);
    try {
      const nextStatus = order.status === "new" ? "reviewed" : "new";
      const res = await fetch(`/api/admin/orders/${order.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      if (!res.ok) {
        const data = await res.json();
        alert(data.message ?? "Could not update order.");
        return;
      }
      router.refresh();
    } finally {
      setPendingId(null);
    }
  }

  if (orders.length === 0) {
    return (
      <p className="text-sm text-ink/50 py-10 text-center">
        No order requests yet — they&rsquo;ll show up here as soon as someone submits one from the catalog or Quick
        Order.
      </p>
    );
  }

  return (
    <div className="bg-white border border-ink/10 rounded-brand overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-ink/10 text-left text-xs uppercase tracking-wide text-ink/40">
            <th className="px-5 py-3 font-medium">Invoice</th>
            <th className="px-5 py-3 font-medium">Customer</th>
            <th className="px-5 py-3 font-medium">Date</th>
            <th className="px-5 py-3 font-medium">Total</th>
            <th className="px-5 py-3 font-medium">Status</th>
            <th className="px-5 py-3 font-medium" />
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            const isOpen = openId === order.id;
            return (
              <Fragment key={order.id}>
                <tr
                  onClick={() => setOpenId(isOpen ? null : order.id)}
                  className="border-b border-ink/5 last:border-none hover:bg-cream-dim/50 cursor-pointer"
                >
                  <td className="px-5 py-3 font-medium">{order.invoiceNumber}</td>
                  <td className="px-5 py-3">
                    <p className="font-medium">{order.customer.companyName}</p>
                    <p className="text-xs text-ink/40">{order.customer.contactName}</p>
                  </td>
                  <td className="px-5 py-3 text-ink/60 whitespace-nowrap">{formatDate(order.createdAt)}</td>
                  <td className="px-5 py-3">
                    <p className="font-medium">{formatCurrency(order.totals.grandTotal)}</p>
                    <p className="text-xs text-ink/40">
                      {order.totals.totalPackages} pkg · {order.totals.totalPairs} pairs
                    </p>
                  </td>
                  <td className="px-5 py-3">
                    <span className="inline-flex items-center gap-1.5 text-xs text-ink/60">
                      <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[order.status]}`} />
                      {STATUS_LABEL[order.status]}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right whitespace-nowrap">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleReviewed(order);
                      }}
                      disabled={pendingId === order.id}
                      className="text-xs text-gold font-semibold disabled:opacity-50"
                    >
                      {pendingId === order.id ? "Saving…" : order.status === "new" ? "Mark Reviewed" : "Mark New"}
                    </button>
                  </td>
                </tr>
                {isOpen && (
                  <tr className="border-b border-ink/5 last:border-none bg-cream-dim/40">
                    <td colSpan={6} className="px-5 py-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-xs font-semibold uppercase tracking-wide text-ink/50 mb-2">Customer</h4>
                          <dl className="text-sm space-y-1">
                            <div className="flex gap-2">
                              <dt className="text-ink/50 shrink-0">Email:</dt>
                              <dd className="truncate">{order.customer.email}</dd>
                            </div>
                            <div className="flex gap-2">
                              <dt className="text-ink/50 shrink-0">Phone:</dt>
                              <dd>{order.customer.phone}</dd>
                            </div>
                            <div className="flex gap-2">
                              <dt className="text-ink/50 shrink-0">Address:</dt>
                              <dd>
                                {order.customer.shippingAddress}, {order.customer.city}, {order.customer.country}
                              </dd>
                            </div>
                            {order.customer.vatNumber && (
                              <div className="flex gap-2">
                                <dt className="text-ink/50 shrink-0">VAT:</dt>
                                <dd>{order.customer.vatNumber}</dd>
                              </div>
                            )}
                            <div className="flex gap-2">
                              <dt className="text-ink/50 shrink-0">Shipping:</dt>
                              <dd>{order.customer.preferredShipping}</dd>
                            </div>
                            {order.customer.notes && (
                              <div className="flex gap-2">
                                <dt className="text-ink/50 shrink-0">Notes:</dt>
                                <dd>{order.customer.notes}</dd>
                              </div>
                            )}
                          </dl>
                        </div>

                        <div>
                          <h4 className="text-xs font-semibold uppercase tracking-wide text-ink/50 mb-2">Line Items</h4>
                          <div className="space-y-2">
                            {order.items.map((item) => (
                              <div key={item.sku} className="flex justify-between text-sm border-b border-ink/10 pb-2 last:border-none">
                                <div className="min-w-0">
                                  <p className="font-medium truncate">{item.name}</p>
                                  <p className="text-xs text-ink/45">
                                    {item.sku} · {item.color} · {item.quantityPackages} pkg · {item.pairs} pairs
                                  </p>
                                </div>
                                <div className="text-right shrink-0 pl-3">
                                  <p className="font-medium">{formatCurrency(item.subtotal)}</p>
                                  <p className="text-xs text-ink/40">{formatPricePerPair(item.pricePerPackage, item.packageSize)}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
