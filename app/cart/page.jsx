"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const initialCart = [
  {
    id: 1,
    name: "Oversized Linen Shirt",
    category: "Fashion",
    price: 1299,
    oldPrice: 1799,
    quantity: 1,
    color: "Ivory",
    size: "M",
    image:
      "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    name: "Minimal Ceramic Vase",
    category: "Home & Living",
    price: 899,
    oldPrice: 1299,
    quantity: 2,
    color: "Blush",
    size: "Medium",
    image:
      "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    name: "Premium Wireless Headphones",
    category: "Electronics",
    price: 3499,
    oldPrice: 4999,
    quantity: 1,
    color: "Black",
    size: "Standard",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
  },
];

export default function CartPage() {
  const [cart, setCart] = useState(initialCart);
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [couponMessage, setCouponMessage] = useState("");
  const [cartMessage, setCartMessage] = useState("");

  const updateQuantity = (id, action) => {
    setCart((current) =>
      current
        .map((item) => {
          if (item.id !== id) return item;

          const nextQuantity =
            action === "increase"
              ? item.quantity + 1
              : Math.max(1, item.quantity - 1);

          return {
            ...item,
            quantity: nextQuantity,
          };
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCart((current) => current.filter((item) => item.id !== id));

    showCartMessage("Item removed from your cart.");
  };

  const clearCart = () => {
    setCart([]);
    showCartMessage("Your cart has been cleared.");
  };

  const showCartMessage = (message) => {
    setCartMessage(message);

    setTimeout(() => {
      setCartMessage("");
    }, 2200);
  };

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();

    if (!code) {
      setCouponMessage("Enter a coupon code.");
      return;
    }

    if (code === "WELCOME10") {
      setAppliedCoupon(code);
      setCouponMessage("Coupon applied successfully.");
    } else {
      setAppliedCoupon("");
      setCouponMessage("Invalid coupon. Try WELCOME10.");
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon("");
    setCoupon("");
    setCouponMessage("");
  };

  const subtotal = useMemo(
    () =>
      cart.reduce((total, item) => total + item.price * item.quantity, 0),
    [cart]
  );

  const originalTotal = useMemo(
    () =>
      cart.reduce(
        (total, item) => total + item.oldPrice * item.quantity,
        0
      ),
    [cart]
  );

  const productDiscount = originalTotal - subtotal;
  const couponDiscount = appliedCoupon === "WELCOME10" ? subtotal * 0.1 : 0;
  const shipping = subtotal === 0 || subtotal >= 1999 ? 0 : 99;
  const total = subtotal - couponDiscount + shipping;

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <main className="min-h-screen bg-[#F7ADAD]/20 text-[#800020]">
      {/* Toast */}
      {cartMessage && (
        <div className="fixed right-5 top-5 z-50 rounded-2xl bg-[#800020] px-5 py-4 text-sm font-semibold text-white shadow-2xl">
          {cartMessage}
        </div>
      )}

      {/* Header */}
      <section className="border-b border-[#800020]/10 bg-white/70 px-5 py-10 backdrop-blur-xl md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-4 flex items-center gap-2 text-sm text-[#800020]/60">
            <Link href="/" className="transition hover:text-[#D45060]">
              Home
            </Link>
            <span>/</span>
            <span>Cart</span>
          </div>

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="mb-2 text-sm font-bold uppercase tracking-[0.25em] text-[#D45060]">
                Shopping Bag
              </p>

              <h1 className="text-4xl font-black tracking-tight md:text-6xl">
                Your Cart
              </h1>

              <p className="mt-3 text-sm text-[#800020]/60 md:text-base">
                {totalItems === 0
                  ? "Your cart is currently empty."
                  : `${totalItems} ${
                      totalItems === 1 ? "item" : "items"
                    } ready for checkout.`}
              </p>
            </div>

            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="w-fit rounded-full border border-[#800020]/20 bg-white px-5 py-2.5 text-sm font-bold transition hover:border-[#D45060] hover:text-[#D45060]"
              >
                Clear Cart
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main */}
      <section className="px-5 py-10 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          {cart.length === 0 ? (
            <EmptyCart />
          ) : (
            <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
              {/* Cart Items */}
              <div>
                <div className="space-y-5">
                  {cart.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onIncrease={() => updateQuantity(item.id, "increase")}
                      onDecrease={() => updateQuantity(item.id, "decrease")}
                      onRemove={() => removeItem(item.id)}
                    />
                  ))}
                </div>

                {/* Free Shipping Progress */}
                <div className="mt-6 rounded-2xl border border-[#800020]/10 bg-white p-5 shadow-sm">
                  {subtotal >= 1999 ? (
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F7ADAD]/40 text-lg">
                        ✓
                      </div>

                      <div>
                        <p className="text-sm font-black">
                          You unlocked free shipping!
                        </p>
                        <p className="text-xs text-[#800020]/55">
                          Your order qualifies for complimentary delivery.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="mb-3 flex justify-between gap-4 text-sm">
                        <span className="font-semibold">
                          Add ₹{(1999 - subtotal).toLocaleString("en-IN")} more
                          for free shipping
                        </span>

                        <span className="font-black">
                          {Math.min((subtotal / 1999) * 100, 100).toFixed(0)}%
                        </span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-[#F7ADAD]/40">
                        <div
                          className="h-full rounded-full bg-[#D45060] transition-all duration-500"
                          style={{
                            width: `${Math.min(
                              (subtotal / 1999) * 100,
                              100
                            )}%`,
                          }}
                        />
                      </div>
                    </>
                  )}
                </div>

                {/* Continue Shopping */}
                <Link
                  href="/shop"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#D45060] transition hover:text-[#800020]"
                >
                  ← Continue Shopping
                </Link>
              </div>

              {/* Summary */}
              <CartSummary
                subtotal={subtotal}
                originalTotal={originalTotal}
                productDiscount={productDiscount}
                couponDiscount={couponDiscount}
                shipping={shipping}
                total={total}
                coupon={coupon}
                setCoupon={setCoupon}
                appliedCoupon={appliedCoupon}
                couponMessage={couponMessage}
                onApplyCoupon={applyCoupon}
                onRemoveCoupon={removeCoupon}
              />
            </div>
          )}
        </div>
      </section>

      {/* Trust Section */}
      {cart.length > 0 && (
        <section className="px-5 pb-16 md:px-10 lg:px-16">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-3">
            <TrustCard
              icon="↻"
              title="Easy Returns"
              text="Simple return experience on eligible products."
            />

            <TrustCard
              icon="✓"
              title="Secure Checkout"
              text="Your checkout experience is designed with security in mind."
            />

            <TrustCard
              icon="♡"
              title="Curated Quality"
              text="Products selected for the Loom & Leaf experience."
            />
          </div>
        </section>
      )}
    </main>
  );
}

function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}) {
  return (
    <article className="group rounded-[1.5rem] border border-[#800020]/10 bg-white p-4 shadow-sm transition hover:shadow-lg sm:p-5">
      <div className="flex flex-col gap-5 sm:flex-row">
        {/* Image */}
        <Link
          href={`/product/${item.id}`}
          className="h-40 w-full shrink-0 overflow-hidden rounded-2xl bg-[#F7ADAD]/20 sm:h-36 sm:w-32"
        >
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Content */}
        <div className="flex flex-1 flex-col">
          <div className="flex justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D45060]">
                {item.category}
              </p>

              <Link href={`/product/${item.id}`}>
                <h2 className="mt-1 text-lg font-black transition hover:text-[#D45060]">
                  {item.name}
                </h2>
              </Link>
            </div>

            <button
              onClick={onRemove}
              aria-label={`Remove ${item.name}`}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xl text-[#800020]/45 transition hover:bg-[#F7ADAD]/30 hover:text-[#800020]"
            >
              ×
            </button>
          </div>

          <div className="mt-3 flex flex-wrap gap-3 text-xs text-[#800020]/55">
            <span>
              Color: <strong className="text-[#800020]">{item.color}</strong>
            </span>

            <span>
              Size: <strong className="text-[#800020]">{item.size}</strong>
            </span>
          </div>

          <div className="mt-auto flex flex-col justify-between gap-4 pt-5 sm:flex-row sm:items-end">
            {/* Quantity */}
            <div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[#800020]/45">
                Quantity
              </p>

              <div className="flex w-fit items-center overflow-hidden rounded-xl border border-[#800020]/15">
                <button
                  onClick={onDecrease}
                  className="flex h-9 w-9 items-center justify-center text-lg transition hover:bg-[#F7ADAD]/30"
                >
                  −
                </button>

                <span className="flex h-9 w-10 items-center justify-center border-x border-[#800020]/10 text-sm font-bold">
                  {item.quantity}
                </span>

                <button
                  onClick={onIncrease}
                  className="flex h-9 w-9 items-center justify-center text-lg transition hover:bg-[#F7ADAD]/30"
                >
                  +
                </button>
              </div>
            </div>

            {/* Price */}
            <div className="text-left sm:text-right">
              <p className="text-xl font-black">
                ₹{(item.price * item.quantity).toLocaleString("en-IN")}
              </p>

              <p className="text-xs text-[#800020]/35 line-through">
                ₹{(item.oldPrice * item.quantity).toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function CartSummary({
  subtotal,
  originalTotal,
  productDiscount,
  couponDiscount,
  shipping,
  total,
  coupon,
  setCoupon,
  appliedCoupon,
  couponMessage,
  onApplyCoupon,
  onRemoveCoupon,
}) {
  return (
    <aside className="h-fit rounded-[1.75rem] border border-[#800020]/10 bg-white p-6 shadow-xl lg:sticky lg:top-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black">Order Summary</h2>

        <span className="rounded-full bg-[#F7ADAD]/30 px-3 py-1 text-xs font-bold text-[#D45060]">
          Secure
        </span>
      </div>

      {/* Coupon */}
      <div className="mt-7">
        <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#800020]/55">
          Have a coupon?
        </p>

        {appliedCoupon ? (
          <div className="flex items-center justify-between rounded-xl border border-[#D45060]/30 bg-[#F7ADAD]/20 px-4 py-3">
            <div>
              <p className="text-sm font-black">{appliedCoupon}</p>
              <p className="text-xs text-[#D45060]">
                10% discount applied
              </p>
            </div>

            <button
              onClick={onRemoveCoupon}
              className="text-xs font-bold text-[#800020] hover:text-[#D45060]"
            >
              Remove
            </button>
          </div>
        ) : (
          <div className="flex overflow-hidden rounded-xl border border-[#800020]/15">
            <input
              value={coupon}
              onChange={(event) => setCoupon(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") onApplyCoupon();
              }}
              placeholder="WELCOME10"
              className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-[#800020]/30"
            />

            <button
              onClick={onApplyCoupon}
              className="bg-[#800020] px-4 text-sm font-bold text-white transition hover:bg-[#D45060]"
            >
              Apply
            </button>
          </div>
        )}

        {couponMessage && (
          <p className="mt-2 text-xs font-semibold text-[#D45060]">
            {couponMessage}
          </p>
        )}
      </div>

      {/* Pricing */}
      <div className="mt-7 space-y-4 border-t border-[#800020]/10 pt-6">
        <SummaryRow
          label="Original price"
          value={`₹${originalTotal.toLocaleString("en-IN")}`}
        />

        <SummaryRow
          label="Product discount"
          value={`- ₹${productDiscount.toLocaleString("en-IN")}`}
          positive
        />

        {couponDiscount > 0 && (
          <SummaryRow
            label="Coupon discount"
            value={`- ₹${couponDiscount.toLocaleString("en-IN", {
              maximumFractionDigits: 0,
            })}`}
            positive
          />
        )}

        <SummaryRow
          label="Subtotal"
          value={`₹${subtotal.toLocaleString("en-IN")}`}
        />

        <SummaryRow
          label="Shipping"
          value={shipping === 0 ? "FREE" : `₹${shipping}`}
          positive={shipping === 0}
        />
      </div>

      {/* Total */}
      <div className="mt-6 border-t border-[#800020]/10 pt-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#800020]/50">
              Total
            </p>

            <p className="mt-1 text-3xl font-black">
              ₹
              {total.toLocaleString("en-IN", {
                maximumFractionDigits: 0,
              })}
            </p>
          </div>

          <p className="text-xs font-semibold text-[#D45060]">
            Inclusive of taxes
          </p>
        </div>

        <Link
          href="/checkout"
          className="mt-6 flex w-full items-center justify-center rounded-xl bg-[#800020] px-5 py-4 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#D45060]"
        >
          Proceed to Checkout →
        </Link>
      </div>

      {/* Payment */}
      <div className="mt-5 rounded-xl bg-[#F7ADAD]/20 p-4 text-center">
        <p className="text-xs font-semibold text-[#800020]/60">
          Secure checkout • Multiple payment options
        </p>

        <div className="mt-3 flex justify-center gap-2 text-[10px] font-black">
          <span className="rounded bg-white px-2 py-1 shadow-sm">UPI</span>
          <span className="rounded bg-white px-2 py-1 shadow-sm">CARD</span>
          <span className="rounded bg-white px-2 py-1 shadow-sm">COD</span>
        </div>
      </div>
    </aside>
  );
}

function SummaryRow({ label, value, positive = false }) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className="text-[#800020]/60">{label}</span>

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

function TrustCard({ icon, title, text }) {
  return (
    <div className="rounded-2xl border border-[#800020]/10 bg-white p-5 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F7ADAD]/40 text-lg font-bold">
          {icon}
        </div>

        <div>
          <h3 className="text-sm font-black">{title}</h3>
          <p className="mt-1 text-xs leading-5 text-[#800020]/55">{text}</p>
        </div>
      </div>
    </div>
  );
}

function EmptyCart() {
  return (
    <div className="flex min-h-[55vh] flex-col items-center justify-center rounded-[2rem] border border-[#800020]/10 bg-white/70 px-6 py-16 text-center shadow-sm backdrop-blur-xl">
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#F7ADAD]/40 text-5xl">
        🛒
      </div>

      <p className="mb-2 text-sm font-bold uppercase tracking-[0.25em] text-[#D45060]">
        Shopping Bag
      </p>

      <h2 className="text-3xl font-black md:text-4xl">
        Your cart is empty
      </h2>

      <p className="mt-4 max-w-md text-sm leading-6 text-[#800020]/60">
        Looks like you have not added anything yet. Explore our collection and
        find something you love.
      </p>

      <Link
        href="/shop"
        className="mt-7 rounded-full bg-[#800020] px-7 py-3.5 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#D45060]"
      >
        Explore Shop
      </Link>
    </div>
  );
}