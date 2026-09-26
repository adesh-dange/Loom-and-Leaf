"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

const orders = {
  "LL-2026-10482": {
    id: "LL-2026-10482",
    date: "26 Sep 2026",
    status: "Delivered",
    payment: "Paid",
    paymentMethod: "UPI",
    delivery: "26 Sep 2026",
    address: {
      name: "Adesh Dange",
      line1: "123 Green Park",
      line2: "Near Main Road",
      city: "Pune",
      state: "Maharashtra",
      pincode: "411001",
      phone: "+91 98765 43210",
    },
    items: [
      {
        id: 1,
        name: "Oversized Linen Shirt",
        category: "Fashion",
        price: 1299,
        quantity: 1,
        color: "Ivory",
        size: "M",
        image:
          "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: 2,
        name: "Minimal Ceramic Vase",
        category: "Home & Living",
        price: 899,
        quantity: 2,
        color: "Blush",
        size: "Medium",
        image:
          "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=600&q=80",
      },
    ],
    subtotal: 3097,
    discount: 200,
    shipping: 0,
    total: 2897,
  },

  "LL-2026-10371": {
    id: "LL-2026-10371",
    date: "21 Sep 2026",
    status: "Shipped",
    payment: "Paid",
    paymentMethod: "Credit / Debit Card",
    delivery: "29 Sep 2026",
    address: {
      name: "Adesh Dange",
      line1: "123 Green Park",
      line2: "Near Main Road",
      city: "Pune",
      state: "Maharashtra",
      pincode: "411001",
      phone: "+91 98765 43210",
    },
    items: [
      {
        id: 3,
        name: "Premium Wireless Headphones",
        category: "Electronics",
        price: 3499,
        quantity: 1,
        color: "Black",
        size: "Standard",
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
      },
    ],
    subtotal: 3499,
    discount: 0,
    shipping: 0,
    total: 3499,
  },

  "LL-2026-10196": {
    id: "LL-2026-10196",
    date: "12 Sep 2026",
    status: "Processing",
    payment: "Paid",
    paymentMethod: "UPI",
    delivery: "30 Sep 2026",
    address: {
      name: "Adesh Dange",
      line1: "123 Green Park",
      line2: "Near Main Road",
      city: "Pune",
      state: "Maharashtra",
      pincode: "411001",
      phone: "+91 98765 43210",
    },
    items: [
      {
        id: 4,
        name: "Rose Glow Face Serum",
        category: "Beauty",
        price: 1199,
        quantity: 1,
        color: "Rose",
        size: "50ml",
        image:
          "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80",
      },
    ],
    subtotal: 1199,
    discount: 0,
    shipping: 99,
    total: 1298,
  },
};

export default function OrderDetailsPage() {
  const params = useParams();
  const orderId = params?.id;

  const order = orders[orderId];

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const [message, setMessage] = useState("");

  if (!order) {
    return <OrderNotFound />;
  }

  const currentStatus = cancelled ? "Cancelled" : order.status;

  const cancelOrder = () => {
    setCancelled(true);
    setShowCancelModal(false);
    setMessage("Your order has been cancelled successfully.");

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  return (
    <main className="min-h-screen bg-[#F7ADAD]/20 text-[#800020]">
      {/* Toast */}
      {message && (
        <div className="fixed right-5 top-5 z-50 rounded-2xl bg-[#800020] px-5 py-4 text-sm font-semibold text-white shadow-2xl">
          {message}
        </div>
      )}

      {/* Header */}
      <section className="border-b border-[#800020]/10 bg-white/70 px-5 py-10 backdrop-blur-xl md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-5 flex flex-wrap items-center gap-2 text-sm text-[#800020]/60">
            <Link href="/" className="hover:text-[#D45060]">
              Home
            </Link>

            <span>/</span>

            <Link href="/orders" className="hover:text-[#D45060]">
              Orders
            </Link>

            <span>/</span>

            <span>{order.id}</span>
          </div>

          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#D45060]">
                Order Details
              </p>

              <h1 className="mt-2 text-3xl font-black md:text-5xl">
                #{order.id}
              </h1>

              <p className="mt-3 text-sm text-[#800020]/60">
                Placed on {order.date}
              </p>
            </div>

            <StatusBadge status={currentStatus} />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="px-5 py-10 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl space-y-7">
          {/* Delivery Progress */}
          {currentStatus !== "Cancelled" ? (
            <DeliveryProgress status={currentStatus} />
          ) : (
            <CancelledBanner />
          )}

          {/* Main Grid */}
          <div className="grid gap-7 lg:grid-cols-[1fr_380px]">
            {/* Left */}
            <div className="space-y-7">
              {/* Items */}
              <section className="rounded-[1.75rem] border border-[#800020]/10 bg-white p-6 shadow-sm md:p-7">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#D45060]">
                      Your items
                    </p>

                    <h2 className="mt-1 text-2xl font-black">
                      {order.items.length}{" "}
                      {order.items.length === 1 ? "Product" : "Products"}
                    </h2>
                  </div>

                  <Link
                    href="/shop"
                    className="text-xs font-bold text-[#D45060] hover:text-[#800020]"
                  >
                    Shop More →
                  </Link>
                </div>

                <div className="mt-6 divide-y divide-[#800020]/10">
                  {order.items.map((item) => (
                    <OrderItem key={item.id} item={item} />
                  ))}
                </div>
              </section>

              {/* Delivery Address */}
              <section className="rounded-[1.75rem] border border-[#800020]/10 bg-white p-6 shadow-sm md:p-7">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F7ADAD]/35 text-lg">
                    ⌖
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#D45060]">
                      Delivery Address
                    </p>

                    <h2 className="mt-1 text-xl font-black">
                      {order.address.name}
                    </h2>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl bg-[#F7ADAD]/15 p-5 text-sm leading-6 text-[#800020]/70">
                  <p>{order.address.line1}</p>
                  <p>{order.address.line2}</p>
                  <p>
                    {order.address.city}, {order.address.state}{" "}
                    {order.address.pincode}
                  </p>
                  <p className="mt-2 font-semibold">
                    {order.address.phone}
                  </p>
                </div>
              </section>

              {/* Need Help */}
              <section className="rounded-[1.75rem] border border-[#800020]/10 bg-white p-6 shadow-sm md:p-7">
                <p className="text-xs font-bold uppercase tracking-widest text-[#D45060]">
                  Need help?
                </p>

                <h2 className="mt-1 text-xl font-black">
                  Have a question about this order?
                </h2>

                <p className="mt-2 max-w-xl text-sm leading-6 text-[#800020]/55">
                  Contact our support team for help with delivery, returns,
                  exchanges or payments.
                </p>

                <Link
                  href="/contact"
                  className="mt-5 inline-flex rounded-full border border-[#800020]/15 px-5 py-2.5 text-xs font-bold transition hover:border-[#D45060] hover:text-[#D45060]"
                >
                  Contact Support
                </Link>
              </section>
            </div>

            {/* Right */}
            <aside className="h-fit space-y-6 lg:sticky lg:top-6">
              {/* Summary */}
              <OrderSummary order={order} />

              {/* Payment */}
              <PaymentCard order={order} />

              {/* Actions */}
              <OrderActions
                status={currentStatus}
                onCancel={() => setShowCancelModal(true)}
              />
            </aside>
          </div>
        </div>
      </section>

      {/* Cancel Modal */}
      {showCancelModal && (
        <CancelModal
          orderId={order.id}
          onClose={() => setShowCancelModal(false)}
          onConfirm={cancelOrder}
        />
      )}
    </main>
  );
}

function DeliveryProgress({ status }) {
  const steps = [
    {
      title: "Order Confirmed",
      description: "Your order has been confirmed",
    },
    {
      title: "Shipped",
      description: "Your package is on the way",
    },
    {
      title: "Delivered",
      description: "Package delivered successfully",
    },
  ];

  const activeIndex =
    status === "Processing" ? 0 : status === "Shipped" ? 1 : 2;

  return (
    <section className="rounded-[1.75rem] border border-[#800020]/10 bg-white p-6 shadow-sm md:p-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#D45060]">
            Delivery Tracking
          </p>

          <h2 className="mt-1 text-2xl font-black">
            {status === "Delivered"
              ? "Your order has arrived"
              : status === "Shipped"
              ? "Your order is on the way"
              : "Your order is being prepared"}
          </h2>
        </div>

        <div className="text-left sm:text-right">
          <p className="text-xs text-[#800020]/45">
            Estimated Delivery
          </p>

          <p className="mt-1 text-sm font-black">
            {status === "Delivered"
              ? "Delivered"
              : "29 Sep 2026"}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <div className="relative">
          <div className="absolute left-4 right-4 top-4 h-1 rounded-full bg-[#800020]/10" />

          <div
            className="absolute left-4 top-4 h-1 rounded-full bg-[#800020] transition-all duration-700"
            style={{
              width:
                activeIndex === 0
                  ? "0%"
                  : activeIndex === 1
                  ? "50%"
                  : "100%",
              maxWidth: "calc(100% - 32px)",
            }}
          />

          <div className="relative grid grid-cols-3">
            {steps.map((step, index) => {
              const completed = index <= activeIndex;

              return (
                <div
                  key={step.title}
                  className={`flex flex-col ${
                    index === 0
                      ? "items-start"
                      : index === 1
                      ? "items-center"
                      : "items-end"
                  }`}
                >
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-black ring-4 ring-white ${
                      completed
                        ? "bg-[#800020] text-white"
                        : "bg-[#F7ADAD]/30 text-[#800020]/40"
                    }`}
                  >
                    {completed ? "✓" : index + 1}
                  </div>

                  <div
                    className={`mt-3 ${
                      index === 0
                        ? "text-left"
                        : index === 1
                        ? "text-center"
                        : "text-right"
                    }`}
                  >
                    <p
                      className={`text-xs font-black sm:text-sm ${
                        completed
                          ? "text-[#800020]"
                          : "text-[#800020]/35"
                      }`}
                    >
                      {step.title}
                    </p>

                    <p className="mt-1 hidden text-[10px] leading-4 text-[#800020]/40 sm:block">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function OrderItem({ item }) {
  return (
    <div className="flex flex-col gap-4 py-5 first:pt-0 last:pb-0 sm:flex-row sm:items-center">
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

      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#D45060]">
          {item.category}
        </p>

        <Link href={`/product/${item.id}`}>
          <h3 className="mt-1 text-base font-black hover:text-[#D45060]">
            {item.name}
          </h3>
        </Link>

        <div className="mt-2 flex flex-wrap gap-3 text-xs text-[#800020]/50">
          <span>Color: {item.color}</span>
          <span>Size: {item.size}</span>
          <span>Qty: {item.quantity}</span>
        </div>
      </div>

      <div className="sm:text-right">
        <p className="text-lg font-black">
          ₹{(item.price * item.quantity).toLocaleString("en-IN")}
        </p>

        <p className="mt-1 text-xs text-[#800020]/40">
          ₹{item.price.toLocaleString("en-IN")} each
        </p>
      </div>
    </div>
  );
}

function OrderSummary({ order }) {
  return (
    <section className="rounded-[1.75rem] border border-[#800020]/10 bg-white p-6 shadow-xl">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black">Order Summary</h2>

        <span className="rounded-full bg-[#F7ADAD]/30 px-3 py-1 text-[10px] font-black text-[#D45060]">
          {order.payment}
        </span>
      </div>

      <div className="mt-6 space-y-4">
        <SummaryRow
          label="Subtotal"
          value={`₹${order.subtotal.toLocaleString("en-IN")}`}
        />

        {order.discount > 0 && (
          <SummaryRow
            label="Discount"
            value={`- ₹${order.discount.toLocaleString("en-IN")}`}
            positive
          />
        )}

        <SummaryRow
          label="Shipping"
          value={
            order.shipping === 0
              ? "FREE"
              : `₹${order.shipping.toLocaleString("en-IN")}`
          }
          positive={order.shipping === 0}
        />
      </div>

      <div className="mt-6 border-t border-[#800020]/10 pt-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#800020]/45">
              Total Paid
            </p>

            <p className="mt-1 text-3xl font-black">
              ₹{order.total.toLocaleString("en-IN")}
            </p>
          </div>

          <span className="text-xs font-bold text-[#D45060]">INR</span>
        </div>
      </div>
    </section>
  );
}

function PaymentCard({ order }) {
  return (
    <section className="rounded-[1.75rem] border border-[#800020]/10 bg-white p-6 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-widest text-[#D45060]">
        Payment
      </p>

      <h2 className="mt-1 text-xl font-black">Payment Information</h2>

      <div className="mt-5 rounded-2xl bg-[#F7ADAD]/15 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white font-black shadow-sm">
            ✓
          </div>

          <div>
            <p className="text-sm font-black">{order.payment}</p>

            <p className="mt-1 text-xs text-[#800020]/50">
              {order.paymentMethod}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function OrderActions({ status, onCancel }) {
  return (
    <section className="rounded-[1.75rem] border border-[#800020]/10 bg-white p-6 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-widest text-[#D45060]">
        Order Actions
      </p>

      <div className="mt-4 space-y-3">
        {status === "Delivered" && (
          <>
            <button
              onClick={() => alert("Review flow coming soon.")}
              className="w-full rounded-xl bg-[#800020] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#D45060]"
            >
              Write a Review
            </button>

            <button
              onClick={() => alert("Return / exchange flow coming soon.")}
              className="w-full rounded-xl border border-[#800020]/15 bg-white px-4 py-3 text-sm font-bold transition hover:border-[#D45060] hover:text-[#D45060]"
            >
              Return / Exchange
            </button>
          </>
        )}

        {status === "Processing" && (
          <button
            onClick={onCancel}
            className="w-full rounded-xl border border-red-200 bg-white px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-50"
          >
            Cancel Order
          </button>
        )}

        {status === "Shipped" && (
          <>
            <button
              onClick={() => alert("Tracking information coming soon.")}
              className="w-full rounded-xl bg-[#800020] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#D45060]"
            >
              Track Package
            </button>

            <button
              onClick={onCancel}
              className="w-full rounded-xl border border-red-200 bg-white px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-50"
            >
              Cancel Order
            </button>
          </>
        )}

        {status === "Cancelled" && (
          <Link
            href="/shop"
            className="flex w-full items-center justify-center rounded-xl bg-[#800020] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#D45060]"
          >
            Shop Again
          </Link>
        )}

        <button
          onClick={() => window.print()}
          className="w-full rounded-xl border border-[#800020]/15 bg-white px-4 py-3 text-sm font-bold transition hover:border-[#D45060] hover:text-[#D45060]"
        >
          Print Order
        </button>
      </div>
    </section>
  );
}

function SummaryRow({ label, value, positive = false }) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className="text-[#800020]/55">{label}</span>

      <span
        className={`font-bold ${
          positive ? "text-[#D45060]" : "text-[#800020]"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Processing: "bg-[#F7ADAD]/40 text-[#800020]",
    Shipped: "bg-blue-50 text-blue-700",
    Delivered: "bg-green-50 text-green-700",
    Cancelled: "bg-red-50 text-red-600",
  };

  return (
    <span
      className={`w-fit rounded-full px-5 py-2.5 text-xs font-black ${
        styles[status] || styles.Processing
      }`}
    >
      {status}
    </span>
  );
}

function CancelledBanner() {
  return (
    <section className="rounded-[1.75rem] border border-red-200 bg-red-50 p-6">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-red-600 shadow-sm">
          ×
        </div>

        <div>
          <h2 className="text-lg font-black text-red-700">
            Order Cancelled
          </h2>

          <p className="mt-1 text-sm leading-6 text-red-600/75">
            This order has been cancelled. If a payment was completed, the
            refund status would appear here in a real implementation.
          </p>
        </div>
      </div>
    </section>
  );
}

function CancelModal({ orderId, onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#800020]/40 px-5 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-[2rem] bg-white p-7 shadow-2xl">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-2xl text-red-600">
          !
        </div>

        <h2 className="mt-5 text-2xl font-black">
          Cancel this order?
        </h2>

        <p className="mt-3 text-sm leading-6 text-[#800020]/60">
          Are you sure you want to cancel order{" "}
          <strong className="text-[#800020]">#{orderId}</strong>? This action
          is only simulated in this frontend demo.
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row-reverse">
          <button
            onClick={onConfirm}
            className="rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700"
          >
            Yes, Cancel Order
          </button>

          <button
            onClick={onClose}
            className="rounded-xl border border-[#800020]/15 bg-white px-5 py-3 text-sm font-bold transition hover:border-[#D45060] hover:text-[#D45060]"
          >
            Keep Order
          </button>
        </div>
      </div>
    </div>
  );
}

function OrderNotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7ADAD]/20 px-5 text-[#800020]">
      <div className="w-full max-w-lg rounded-[2rem] border border-[#800020]/10 bg-white p-10 text-center shadow-xl">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#F7ADAD]/40 text-3xl">
          📦
        </div>

        <p className="mt-6 text-sm font-bold uppercase tracking-[0.25em] text-[#D45060]">
          Order Not Found
        </p>

        <h1 className="mt-2 text-3xl font-black">
          We couldn't find this order.
        </h1>

        <p className="mt-3 text-sm leading-6 text-[#800020]/55">
          The order ID may be invalid or this demo does not contain details
          for that order.
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/orders"
            className="rounded-full bg-[#800020] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#D45060]"
          >
            Back to Orders
          </Link>

          <Link
            href="/shop"
            className="rounded-full border border-[#800020]/15 bg-white px-6 py-3 text-sm font-bold transition hover:border-[#D45060] hover:text-[#D45060]"
          >
            Shop
          </Link>
        </div>
      </div>
    </main>
  );
}