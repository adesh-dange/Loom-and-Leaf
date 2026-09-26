"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

const initialCartItems = [
  {
    id: "p1",
    name: "Classic Oversized Jacket",
    category: "Fashion",
    price: 2499,
    oldPrice: 3499,
    quantity: 1,
    color: "Burgundy",
    size: "M",
  },
  {
    id: "p2",
    name: "Aura Wireless Headphones",
    category: "Electronics",
    price: 3999,
    oldPrice: 5499,
    quantity: 1,
    color: "Black",
    size: null,
  },
  {
    id: "p3",
    name: "Luna Ceramic Vase",
    category: "Home & Living",
    price: 1299,
    oldPrice: 1799,
    quantity: 2,
    color: "Blush",
    size: null,
  },
];

const formatPrice = (price) => `₹${price.toLocaleString("en-IN")}`;

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [message, setMessage] = useState("");

  const updateQuantity = (id, change) => {
    setCartItems((items) =>
      items
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: Math.max(1, item.quantity + change),
              }
            : item
        )
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const originalTotal = cartItems.reduce(
    (total, item) => total + item.oldPrice * item.quantity,
    0
  );

  const productSavings = originalTotal - subtotal;
  const couponDiscount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const shipping = subtotal >= 3000 || subtotal === 0 ? 0 : 99;
  const total = subtotal - couponDiscount + shipping;
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "WELCOME10") {
      setCouponApplied(true);
      setMessage("Coupon applied successfully.");
    } else {
      setCouponApplied(false);
      setMessage("Try coupon code WELCOME10.");
    }
  };

  return (
    <main className="min-h-screen bg-[#F7ADAD]/20 text-[#800020]">
      {/* HEADER */}
      <section className="border-b border-[#800020]/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#D45060]">
                Your shopping bag
              </p>

              <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
                Shopping Cart
              </h1>

              <p className="mt-3 text-sm text-gray-500">
                {totalItems}{" "}
                {totalItems === 1 ? "item" : "items"} in your cart
              </p>
            </div>

            <Link
              href="/shop"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-[#800020]/10 bg-white px-5 py-3 text-sm font-bold text-[#800020] transition hover:bg-[#F7ADAD]/30"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </section>

      {/* CART CONTENT */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        {cartItems.length > 0 ? (
          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            {/* ITEMS */}
            <div>
              <div className="overflow-hidden rounded-[2rem] border border-[#800020]/10 bg-white shadow-sm">
                <div className="hidden border-b border-[#800020]/10 px-6 py-4 text-xs font-bold uppercase tracking-[0.15em] text-gray-400 sm:grid sm:grid-cols-[1fr_110px_120px]">
                  <span>Product</span>
                  <span className="text-center">Quantity</span>
                  <span className="text-right">Total</span>
                </div>

                <div className="divide-y divide-[#800020]/10">
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.35,
                        delay: index * 0.05,
                      }}
                      className="p-5 sm:p-6"
                    >
                      <div className="grid gap-5 sm:grid-cols-[1fr_110px_120px] sm:items-center">
                        {/* PRODUCT */}
                        <div className="flex gap-4">
                          <Link
                            href={`/product/${item.id}`}
                            className="flex h-28 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#F7ADAD]/30"
                          >
                            <div className="flex h-20 w-16 items-center justify-center rounded-[1.5rem] bg-[#800020] shadow-lg">
                              <span className="text-3xl font-bold text-white">
                                L
                              </span>
                            </div>
                          </Link>

                          <div className="min-w-0 flex-1">
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D45060]">
                              {item.category}
                            </p>

                            <Link href={`/product/${item.id}`}>
                              <h2 className="mt-1 text-base font-bold text-[#800020] transition hover:text-[#D45060] sm:text-lg">
                                {item.name}
                              </h2>
                            </Link>

                            <div className="mt-2 space-y-1 text-xs text-gray-500">
                              {item.color && (
                                <p>
                                  Color:{" "}
                                  <span className="font-semibold text-gray-700">
                                    {item.color}
                                  </span>
                                </p>
                              )}

                              {item.size && (
                                <p>
                                  Size:{" "}
                                  <span className="font-semibold text-gray-700">
                                    {item.size}
                                  </span>
                                </p>
                              )}
                            </div>

                            <div className="mt-3 flex items-center gap-2">
                              <span className="font-bold text-[#800020]">
                                {formatPrice(item.price)}
                              </span>

                              <span className="text-xs text-gray-400 line-through">
                                {formatPrice(item.oldPrice)}
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              className="mt-3 text-xs font-semibold text-gray-400 transition hover:text-[#D45060]"
                            >
                              Remove
                            </button>
                          </div>
                        </div>

                        {/* QUANTITY */}
                        <div className="flex items-center justify-between sm:justify-center">
                          <span className="text-xs font-semibold text-gray-400 sm:hidden">
                            Quantity
                          </span>

                          <div className="flex items-center overflow-hidden rounded-xl border border-[#800020]/10">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, -1)}
                              className="flex h-9 w-9 items-center justify-center text-[#800020] transition hover:bg-[#F7ADAD]/30"
                            >
                              −
                            </button>

                            <span className="flex h-9 w-9 items-center justify-center border-x border-[#800020]/10 text-sm font-bold">
                              {item.quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, 1)}
                              className="flex h-9 w-9 items-center justify-center text-[#800020] transition hover:bg-[#F7ADAD]/30"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* ITEM TOTAL */}
                        <div className="flex items-center justify-between sm:block sm:text-right">
                          <span className="text-xs font-semibold text-gray-400 sm:hidden">
                            Item Total
                          </span>

                          <p className="font-bold text-[#800020]">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* SAVINGS */}
              <div className="mt-5 rounded-2xl border border-[#D45060]/20 bg-[#F7ADAD]/30 px-5 py-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold text-[#800020]">
                      You&apos;re saving {formatPrice(productSavings)}
                    </p>

                    <p className="mt-1 text-xs text-[#800020]/55">
                      Discounts are already reflected in your product prices.
                    </p>
                  </div>

                  <span className="hidden text-2xl text-[#D45060] sm:block">
                    ✓
                  </span>
                </div>
              </div>
            </div>

            {/* SUMMARY */}
            <aside className="lg:sticky lg:top-24 lg:h-fit">
              <div className="rounded-[2rem] border border-[#800020]/10 bg-white p-6 shadow-sm sm:p-7">
                <h2 className="text-xl font-bold text-[#800020]">
                  Order Summary
                </h2>

                {/* COUPON */}
                <div className="mt-6 border-b border-[#800020]/10 pb-6">
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-gray-400">
                    Have a coupon?
                  </p>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      placeholder="Enter code"
                      disabled={couponApplied}
                      className="min-w-0 flex-1 rounded-xl border border-[#800020]/10 bg-gray-50 px-4 py-3 text-sm text-[#800020] uppercase outline-none transition focus:border-[#D45060] focus:bg-white disabled:opacity-60"
                    />

                    <button
                      type="button"
                      onClick={applyCoupon}
                      className="rounded-xl bg-[#800020] px-4 py-3 text-xs font-bold text-white transition hover:bg-[#D45060]"
                    >
                      Apply
                    </button>
                  </div>

                  <p className="mt-2 text-[10px] text-gray-400">
                    Demo coupon: WELCOME10
                  </p>

                  {message && (
                    <p
                      className={`mt-2 text-xs font-semibold ${
                        couponApplied
                          ? "text-[#D45060]"
                          : "text-gray-500"
                      }`}
                    >
                      {message}
                    </p>
                  )}
                </div>

                {/* PRICE BREAKDOWN */}
                <div className="space-y-4 border-b border-[#800020]/10 py-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-semibold text-[#800020]">
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Product savings</span>
                    <span className="font-semibold text-[#D45060]">
                      −{formatPrice(productSavings)}
                    </span>
                  </div>

                  {couponApplied && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">
                        Coupon discount
                      </span>

                      <span className="font-semibold text-[#D45060]">
                        −{formatPrice(couponDiscount)}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Shipping</span>

                    <span
                      className={`font-semibold ${
                        shipping === 0
                          ? "text-[#D45060]"
                          : "text-[#800020]"
                      }`}
                    >
                      {shipping === 0
                        ? "FREE"
                        : formatPrice(shipping)}
                    </span>
                  </div>
                </div>

                {/* TOTAL */}
                <div className="flex items-end justify-between py-6">
                  <div>
                    <p className="text-base font-bold text-[#800020]">
                      Total
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      Inclusive of applicable taxes
                    </p>
                  </div>

                  <p className="text-2xl font-bold text-[#800020]">
                    {formatPrice(total)}
                  </p>
                </div>

                {/* CHECKOUT */}
                <Link
                  href="/checkout"
                  className="flex w-full items-center justify-center rounded-xl bg-[#800020] px-5 py-4 text-sm font-bold text-white shadow-lg shadow-[#800020]/15 transition hover:-translate-y-0.5 hover:bg-[#D45060]"
                >
                  Proceed to Checkout
                </Link>

                <div className="mt-5 flex items-center justify-center gap-2 text-xs text-gray-400">
                  <span>🔒</span>
                  Secure checkout experience
                </div>
              </div>

              {/* FREE SHIPPING */}
              {subtotal < 3000 && (
                <div className="mt-4 rounded-2xl border border-[#800020]/10 bg-[#F7ADAD]/30 p-5">
                  <p className="text-sm font-bold text-[#800020]">
                    Add{" "}
                    {formatPrice(3000 - subtotal)} more for free shipping.
                  </p>

                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-white">
                    <div
                      className="h-full rounded-full bg-[#D45060]"
                      style={{
                        width: `${Math.min(
                          (subtotal / 3000) * 100,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              )}

              {subtotal >= 3000 && (
                <div className="mt-4 rounded-2xl border border-[#D45060]/20 bg-[#F7ADAD]/30 p-5">
                  <p className="text-sm font-bold text-[#800020]">
                    ✓ You qualify for free shipping.
                  </p>
                </div>
              )}
            </aside>
          </div>
        ) : (
          /* EMPTY CART */
          <div className="rounded-[2rem] bg-white px-6 py-24 text-center shadow-sm">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#F7ADAD] text-4xl text-[#800020]">
              🛍
            </div>

            <h2 className="mt-7 text-3xl font-bold text-[#800020]">
              Your cart is empty
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-gray-500">
              Looks like you haven&apos;t added anything to your cart yet.
              Explore our collections and find something you love.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/shop"
                className="rounded-full bg-[#800020] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#D45060]"
              >
                Explore Shop
              </Link>

              <Link
                href="/deals"
                className="rounded-full border border-[#800020]/10 bg-[#F7ADAD]/30 px-7 py-3.5 text-sm font-bold text-[#800020] transition hover:bg-[#F7ADAD]"
              >
                View Deals
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* TRUST STRIP */}
      <section className="border-t border-[#800020]/10 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 px-6 py-8 sm:grid-cols-3 lg:px-10">
          <div className="border-b border-[#800020]/10 px-5 py-5 text-center sm:border-b-0 sm:border-r">
            <p className="text-sm font-bold text-[#800020]">
              Secure Shopping
            </p>

            <p className="mt-1 text-xs text-gray-400">
              Safe & protected checkout
            </p>
          </div>

          <div className="border-b border-[#800020]/10 px-5 py-5 text-center sm:border-b-0 sm:border-r">
            <p className="text-sm font-bold text-[#800020]">
              Easy Returns
            </p>

            <p className="mt-1 text-xs text-gray-400">
              Simple return experience
            </p>
          </div>

          <div className="px-5 py-5 text-center">
            <p className="text-sm font-bold text-[#800020]">
              Curated Products
            </p>

            <p className="mt-1 text-xs text-gray-400">
              Thoughtfully selected for you
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}