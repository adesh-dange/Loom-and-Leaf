"use client";

import Link from "next/link";
import { useState } from "react";

const initialOrders = [
  {
    id: "LL-2026-10482",
    date: "26 Sep 2026",
    status: "Delivered",
    payment: "Paid",
    total: 3497,
    items: [
      {
        id: 1,
        name: "Oversized Linen Shirt",
        quantity: 1,
        price: 1299,
        color: "Ivory",
        size: "M",
        image:
          "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=500&q=80",
      },
      {
        id: 2,
        name: "Minimal Ceramic Vase",
        quantity: 2,
        price: 899,
        color: "Blush",
        size: "Medium",
        image:
          "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=500&q=80",
      },
    ],
    delivery: "26 Sep 2026",
  },
  {
    id: "LL-2026-10371",
    date: "21 Sep 2026",
    status: "Shipped",
    payment: "Paid",
    total: 3499,
    items: [
      {
        id: 3,
        name: "Premium Wireless Headphones",
        quantity: 1,
        price: 3499,
        color: "Black",
        size: "Standard",
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80",
      },
    ],
    delivery: "29 Sep 2026",
  },
  {
    id: "LL-2026-10196",
    date: "12 Sep 2026",
    status: "Processing",
    payment: "Paid",
    total: 1199,
    items: [
      {
        id: 4,
        name: "Rose Glow Face Serum",
        quantity: 1,
        price: 1199,
        color: "Rose",
        size: "50ml",
        image:
          "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=500&q=80",
      },
    ],
    delivery: "30 Sep 2026",
  },
];

const filters = ["All", "Processing", "Shipped", "Delivered", "Cancelled"];

export default function OrdersPage() {
  const [orders, setOrders] = useState(initialOrders);
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [cancelMessage, setCancelMessage] = useState("");

  const filteredOrders = orders.filter((order) => {
    const matchesFilter =
      activeFilter === "All" || order.status === activeFilter;

    const searchValue = search.toLowerCase().trim();

    const matchesSearch =
      !searchValue ||
      order.id.toLowerCase().includes(searchValue) ||
      order.items.some((item) =>
        item.name.toLowerCase().includes(searchValue)
      );

    return matchesFilter && matchesSearch;
  });

  const cancelOrder = (orderId) => {
    setOrders((current) =>
      current.map((order) =>
        order.id === orderId
          ? { ...order, status: "Cancelled" }
          : order
      )
    );

    setCancelMessage(`Order ${orderId} has been cancelled.`);

    setTimeout(() => {
      setCancelMessage("");
    }, 2500);
  };

  return (
    <main className="min-h-screen bg-[#F7ADAD]/20 text-[#800020]">
      {/* Toast */}
      {cancelMessage && (
        <div className="fixed right-5 top-5 z-50 rounded-2xl bg-[#800020] px-5 py-4 text-sm font-semibold text-white shadow-2xl">
          {cancelMessage}
        </div>
      )}

      {/* Header */}
      <section className="border-b border-[#800020]/10 bg-white/70 px-5 py-12 backdrop-blur-xl md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-4 flex items-center gap-2 text-sm text-[#800020]/60">
            <Link href="/" className="transition hover:text-[#D45060]">
              Home
            </Link>

            <span>/</span>

            <span>Orders</span>
          </div>

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-2 text-sm font-bold uppercase tracking-[0.25em] text-[#D45060]">
                Your purchases
              </p>

              <h1 className="text-4xl font-black tracking-tight md:text-6xl">
                My Orders
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#800020]/65 md:text-base">
                View your recent purchases, track deliveries and access order
                details.
              </p>
            </div>

            <Link
              href="/shop"
              className="w-fit rounded-full bg-[#800020] px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#D45060]"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </section>

      {/* Controls */}
      <section className="px-5 pt-8 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[1.5rem] border border-[#800020]/10 bg-white p-4 shadow-sm md:p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              {/* Search */}
              <div className="relative w-full lg:max-w-sm">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#800020]/40">
                  ⌕
                </span>

                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search orders..."
                  className="w-full rounded-xl border border-[#800020]/10 bg-[#F7ADAD]/10 py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-[#800020]/35 focus:border-[#D45060]"
                />
              </div>

              {/* Filters */}
              <div className="flex gap-2 overflow-x-auto pb-1">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`whitespace-nowrap rounded-full px-4 py-2.5 text-xs font-bold transition ${
                      activeFilter === filter
                        ? "bg-[#800020] text-white"
                        : "bg-[#F7ADAD]/25 text-[#800020]/65 hover:bg-[#F7ADAD]/50"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Orders */}
      <section className="px-5 py-8 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          {filteredOrders.length === 0 ? (
            <EmptyOrders
              filter={activeFilter}
              search={search}
              onReset={() => {
                setActiveFilter("All");
                setSearch("");
              }}
            />
          ) : (
            <div className="space-y-5">
              {filteredOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onCancel={cancelOrder}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Help */}
      <section className="px-5 pb-16 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-[#800020] px-6 py-10 text-center text-white md:px-12">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#F7ADAD]">
            Need help?
          </p>

          <h2 className="mt-3 text-3xl font-black md:text-4xl">
            Questions about your order?
          </h2>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-white/65">
            Our support team is here to help with delivery, returns, payments
            and other order-related questions.
          </p>

          <Link
            href="/contact"
            className="mt-6 inline-flex rounded-full bg-[#F7ADAD] px-7 py-3.5 text-sm font-black text-[#800020] transition hover:bg-[#D45060] hover:text-white"
          >
            Contact Support
          </Link>
        </div>
      </section>
    </main>
  );
}

function OrderCard({ order, onCancel }) {
  const canCancel =
    order.status === "Processing" || order.status === "Shipped";

  const statusStyles = {
    Processing: "bg-[#F7ADAD]/40 text-[#800020]",
    Shipped: "bg-blue-50 text-blue-700",
    Delivered: "bg-green-50 text-green-700",
    Cancelled: "bg-red-50 text-red-600",
  };

  return (
    <article className="overflow-hidden rounded-[1.75rem] border border-[#800020]/10 bg-white shadow-sm transition hover:shadow-lg">
      {/* Order Header */}
      <div className="border-b border-[#800020]/10 bg-[#F7ADAD]/10 px-5 py-5 md:px-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-4">
            <OrderMeta label="Order ID" value={order.id} />

            <OrderMeta label="Placed On" value={order.date} />

            <OrderMeta
              label="Total"
              value={`₹${order.total.toLocaleString("en-IN")}`}
            />

            <OrderMeta label="Payment" value={order.payment} />
          </div>

          <StatusBadge
            status={order.status}
            className={statusStyles[order.status]}
          />
        </div>
      </div>

      {/* Products */}
      <div className="px-5 py-6 md:px-6">
        <div className="space-y-4">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <Link
                href={`/product/${item.id}`}
                className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-[#F7ADAD]/20"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />
              </Link>

              <div className="flex-1">
                <p className="text-base font-black">{item.name}</p>

                <p className="mt-1 text-xs text-[#800020]/50">
                  {item.color} • {item.size} • Qty {item.quantity}
                </p>

                <p className="mt-2 text-sm font-bold">
                  ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                </p>
              </div>

              <Link
                href={`/product/${item.id}`}
                className="w-fit text-xs font-bold text-[#D45060] transition hover:text-[#800020]"
              >
                View Product →
              </Link>
            </div>
          ))}
        </div>

        {/* Delivery */}
        {order.status !== "Cancelled" && (
          <div className="mt-6 rounded-2xl bg-[#F7ADAD]/15 p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#800020]/45">
                  Estimated Delivery
                </p>

                <p className="mt-1 text-sm font-black">
                  {order.delivery}
                </p>
              </div>

              <OrderProgress status={order.status} />
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3 border-t border-[#800020]/10 px-5 py-4 md:px-6">
        <Link
          href={`/orders/${order.id}`}
          className="rounded-full bg-[#800020] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[#D45060]"
        >
          View Order Details
        </Link>

        {order.status === "Delivered" && (
          <>
            <button
              className="rounded-full border border-[#800020]/15 bg-white px-5 py-2.5 text-xs font-bold transition hover:border-[#D45060] hover:text-[#D45060]"
              onClick={() => alert("Review flow coming soon.")}
            >
              Write a Review
            </button>

            <button
              className="rounded-full border border-[#800020]/15 bg-white px-5 py-2.5 text-xs font-bold transition hover:border-[#D45060] hover:text-[#D45060]"
              onClick={() => alert("Return flow coming soon.")}
            >
              Return / Exchange
            </button>
          </>
        )}

        {canCancel && (
          <button
            onClick={() => onCancel(order.id)}
            className="rounded-full border border-red-200 bg-white px-5 py-2.5 text-xs font-bold text-red-600 transition hover:bg-red-50"
          >
            Cancel Order
          </button>
        )}
      </div>
    </article>
  );
}

function OrderMeta({ label, value }) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-widest text-[#800020]/40">
        {label}
      </p>

      <p className="mt-1 max-w-[150px] truncate text-xs font-black md:text-sm">
        {value}
      </p>
    </div>
  );
}

function StatusBadge({ status, className }) {
  return (
    <span
      className={`w-fit rounded-full px-4 py-2 text-xs font-black ${className}`}
    >
      {status}
    </span>
  );
}

function OrderProgress({ status }) {
  const steps = ["Confirmed", "Shipped", "Delivered"];

  const activeIndex =
    status === "Processing" ? 0 : status === "Shipped" ? 1 : 2;

  return (
    <div className="flex items-center">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-black ${
                index <= activeIndex
                  ? "bg-[#800020] text-white"
                  : "bg-[#800020]/10 text-[#800020]/35"
              }`}
            >
              {index <= activeIndex ? "✓" : index + 1}
            </div>

            <span
              className={`mt-1 hidden text-[9px] font-bold sm:block ${
                index <= activeIndex
                  ? "text-[#800020]"
                  : "text-[#800020]/30"
              }`}
            >
              {step}
            </span>
          </div>

          {index < steps.length - 1 && (
            <div
              className={`mx-1 h-px w-8 sm:w-10 ${
                index < activeIndex
                  ? "bg-[#800020]"
                  : "bg-[#800020]/10"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function EmptyOrders({ filter, search, onReset }) {
  return (
    <div className="flex min-h-[45vh] flex-col items-center justify-center rounded-[2rem] border border-[#800020]/10 bg-white/70 px-6 py-16 text-center shadow-sm">
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#F7ADAD]/40 text-4xl">
        📦
      </div>

      <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#D45060]">
        Orders
      </p>

      <h2 className="mt-2 text-3xl font-black">
        {search
          ? "No matching orders"
          : filter === "All"
          ? "No orders yet"
          : `No ${filter.toLowerCase()} orders`}
      </h2>

      <p className="mt-3 max-w-md text-sm leading-6 text-[#800020]/55">
        {search
          ? "Try searching with another order ID or product name."
          : "Once you place an order, your purchase history and delivery updates will appear here."}
      </p>

      {search || filter !== "All" ? (
        <button
          onClick={onReset}
          className="mt-7 rounded-full bg-[#800020] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#D45060]"
        >
          Reset Filters
        </button>
      ) : (
        <Link
          href="/shop"
          className="mt-7 rounded-full bg-[#800020] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#D45060]"
        >
          Start Shopping
        </Link>
      )}
    </div>
  );
}