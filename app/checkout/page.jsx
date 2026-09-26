"use client";

import Link from "next/link";
import { useState } from "react";

const initialItems = [
  {
    id: 1,
    name: "Oversized Linen Shirt",
    price: 1299,
    quantity: 1,
    color: "Ivory",
    size: "M",
    image:
      "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 2,
    name: "Minimal Ceramic Vase",
    price: 899,
    quantity: 2,
    color: "Blush",
    size: "Medium",
    image:
      "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=500&q=80",
  },
];

export default function CheckoutPage() {
  const [items] = useState(initialItems);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [sameAsBilling, setSameAsBilling] = useState(true);
  const [placed, setPlaced] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    pincode: "",
  });

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = subtotal >= 1999 ? 0 : 99;
  const discount = subtotal >= 2000 ? 200 : 0;
  const total = subtotal + shipping - discount;

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setPlaced(true);
  };

  if (placed) {
    return <OrderSuccess />;
  }

  return (
    <main className="min-h-screen bg-[#F7ADAD]/20 text-[#800020]">
      {/* Header */}
      <header className="border-b border-[#800020]/10 bg-white/80 px-5 py-6 backdrop-blur-xl md:px-10 lg:px-16">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="text-2xl font-black tracking-tight">
            Loom <span className="text-[#D45060]">&</span> Leaf
          </Link>

          <div className="flex items-center gap-2 text-xs font-bold text-[#800020]/55">
            <span className="hidden sm:inline">Secure Checkout</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F7ADAD]/40">
              🔒
            </span>
          </div>
        </div>
      </header>

      {/* Progress */}
      <section className="border-b border-[#800020]/10 bg-white/50 px-5 py-5 md:px-10 lg:px-16">
        <div className="mx-auto flex max-w-7xl items-center justify-center">
          <CheckoutStep number="1" label="Cart" active completed />
          <CheckoutLine active />
          <CheckoutStep number="2" label="Checkout" active />
          <CheckoutLine />
          <CheckoutStep number="3" label="Confirmation" />
        </div>
      </section>

      {/* Content */}
      <section className="px-5 py-10 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#D45060]">
              Almost there
            </p>

            <h1 className="mt-2 text-4xl font-black md:text-5xl">
              Complete Your Order
            </h1>

            <p className="mt-3 text-sm text-[#800020]/60 md:text-base">
              Enter your details and choose your preferred payment method.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid gap-8 lg:grid-cols-[1fr_390px]">
              {/* Left */}
              <div className="space-y-6">
                {/* Contact */}
                <CheckoutCard
                  number="01"
                  title="Contact Information"
                  description="We will use these details for order updates."
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input
                      label="First Name"
                      required
                      value={form.firstName}
                      onChange={(value) => updateField("firstName", value)}
                      placeholder="Adesh"
                    />

                    <Input
                      label="Last Name"
                      required
                      value={form.lastName}
                      onChange={(value) => updateField("lastName", value)}
                      placeholder="Dange"
                    />

                    <Input
                      label="Email Address"
                      type="email"
                      required
                      value={form.email}
                      onChange={(value) => updateField("email", value)}
                      placeholder="you@example.com"
                    />

                    <Input
                      label="Phone Number"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(value) => updateField("phone", value)}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </CheckoutCard>

                {/* Shipping */}
                <CheckoutCard
                  number="02"
                  title="Shipping Address"
                  description="Where should we deliver your order?"
                >
                  <div className="space-y-4">
                    <Input
                      label="Address"
                      required
                      value={form.address}
                      onChange={(value) => updateField("address", value)}
                      placeholder="House no., street, area"
                    />

                    <Input
                      label="Apartment, Suite, etc."
                      value={form.apartment}
                      onChange={(value) => updateField("apartment", value)}
                      placeholder="Apartment, floor, landmark"
                    />

                    <div className="grid gap-4 sm:grid-cols-2">
                      <Input
                        label="City"
                        required
                        value={form.city}
                        onChange={(value) => updateField("city", value)}
                        placeholder="Pune"
                      />

                      <Input
                        label="State"
                        required
                        value={form.state}
                        onChange={(value) => updateField("state", value)}
                        placeholder="Maharashtra"
                      />

                      <Input
                        label="PIN Code"
                        type="text"
                        required
                        value={form.pincode}
                        onChange={(value) => updateField("pincode", value)}
                        placeholder="411001"
                      />
                    </div>

                    <label className="flex cursor-pointer items-center gap-3 pt-1 text-sm">
                      <input
                        type="checkbox"
                        checked={sameAsBilling}
                        onChange={(event) =>
                          setSameAsBilling(event.target.checked)
                        }
                        className="h-4 w-4 accent-[#800020]"
                      />

                      <span className="text-[#800020]/70">
                        Billing address is same as shipping address
                      </span>
                    </label>
                  </div>
                </CheckoutCard>

                {/* Payment */}
                <CheckoutCard
                  number="03"
                  title="Payment Method"
                  description="Choose how you want to pay."
                >
                  <div className="space-y-3">
                    <PaymentOption
                      value="upi"
                      selected={paymentMethod === "upi"}
                      onSelect={setPaymentMethod}
                      title="UPI"
                      description="Google Pay, PhonePe, Paytm and more"
                      icon="⌁"
                    />

                    <PaymentOption
                      value="card"
                      selected={paymentMethod === "card"}
                      onSelect={setPaymentMethod}
                      title="Credit / Debit Card"
                      description="Visa, Mastercard, RuPay and more"
                      icon="▣"
                    />

                    <PaymentOption
                      value="cod"
                      selected={paymentMethod === "cod"}
                      onSelect={setPaymentMethod}
                      title="Cash on Delivery"
                      description="Pay when your order arrives"
                      icon="₹"
                    />
                  </div>

                  {paymentMethod === "upi" && (
                    <div className="mt-5 rounded-2xl bg-[#F7ADAD]/20 p-5">
                      <label className="text-xs font-bold uppercase tracking-widest text-[#800020]/55">
                        UPI ID
                      </label>

                      <input
                        type="text"
                        placeholder="example@upi"
                        className="mt-2 w-full rounded-xl border border-[#800020]/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#D45060]"
                      />
                    </div>
                  )}

                  {paymentMethod === "card" && (
                    <div className="mt-5 space-y-4 rounded-2xl bg-[#F7ADAD]/20 p-5">
                      <Input
                        label="Card Number"
                        placeholder="1234 5678 9012 3456"
                      />

                      <div className="grid gap-4 sm:grid-cols-2">
                        <Input label="Expiry Date" placeholder="MM / YY" />
                        <Input label="CVV" type="password" placeholder="•••" />
                      </div>

                      <Input
                        label="Cardholder Name"
                        placeholder="Name on card"
                      />
                    </div>
                  )}

                  {paymentMethod === "cod" && (
                    <div className="mt-5 rounded-2xl bg-[#F7ADAD]/20 p-5 text-sm leading-6 text-[#800020]/65">
                      Pay in cash when your order is delivered to your
                      address. Additional COD charges may apply in a real
                      checkout implementation.
                    </div>
                  )}
                </CheckoutCard>

                {/* Notes */}
                <CheckoutCard
                  number="04"
                  title="Order Notes"
                  description="Optional instructions for your order."
                >
                  <textarea
                    rows={4}
                    placeholder="Add delivery instructions or special requests..."
                    className="w-full resize-none rounded-xl border border-[#800020]/10 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-[#800020]/30 focus:border-[#D45060]"
                  />
                </CheckoutCard>
              </div>

              {/* Right Summary */}
              <aside className="h-fit lg:sticky lg:top-6">
                <OrderSummary
                  items={items}
                  subtotal={subtotal}
                  shipping={shipping}
                  discount={discount}
                  total={total}
                />

                <div className="mt-5 rounded-2xl border border-[#800020]/10 bg-white p-5 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F7ADAD]/40">
                      ✓
                    </div>

                    <div>
                      <h3 className="text-sm font-black">
                        Secure & Protected
                      </h3>

                      <p className="mt-1 text-xs leading-5 text-[#800020]/55">
                        Your information is handled securely during the
                        checkout experience.
                      </p>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

function CheckoutCard({ number, title, description, children }) {
  return (
    <section className="rounded-[1.75rem] border border-[#800020]/10 bg-white p-6 shadow-sm md:p-7">
      <div className="mb-6 flex items-start gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#800020] text-xs font-black text-white">
          {number}
        </span>

        <div>
          <h2 className="text-xl font-black">{title}</h2>

          <p className="mt-1 text-xs text-[#800020]/50">{description}</p>
        </div>
      </div>

      {children}
    </section>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold text-[#800020]/70">
        {label}
        {required && <span className="ml-1 text-[#D45060]">*</span>}
      </span>

      <input
        type={type}
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        placeholder={placeholder}
        required={required}
        className="mt-2 w-full rounded-xl border border-[#800020]/10 bg-[#F7ADAD]/10 px-4 py-3 text-sm outline-none transition placeholder:text-[#800020]/30 focus:border-[#D45060] focus:bg-white"
      />
    </label>
  );
}

function PaymentOption({
  value,
  selected,
  onSelect,
  title,
  description,
  icon,
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${
        selected
          ? "border-[#800020] bg-[#F7ADAD]/15 shadow-sm"
          : "border-[#800020]/10 bg-white hover:border-[#D45060]/50"
      }`}
    >
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-lg font-black ${
          selected
            ? "bg-[#800020] text-white"
            : "bg-[#F7ADAD]/30 text-[#800020]"
        }`}
      >
        {icon}
      </div>

      <div className="flex-1">
        <p className="text-sm font-black">{title}</p>
        <p className="mt-1 text-xs text-[#800020]/50">{description}</p>
      </div>

      <div
        className={`flex h-5 w-5 items-center justify-center rounded-full border ${
          selected
            ? "border-[#800020] bg-[#800020]"
            : "border-[#800020]/20"
        }`}
      >
        {selected && (
          <span className="h-2 w-2 rounded-full bg-white" />
        )}
      </div>
    </button>
  );
}

function OrderSummary({
  items,
  subtotal,
  shipping,
  discount,
  total,
}) {
  return (
    <div className="rounded-[1.75rem] border border-[#800020]/10 bg-white p-6 shadow-xl">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black">Order Summary</h2>

        <Link
          href="/cart"
          className="text-xs font-bold text-[#D45060] hover:text-[#800020]"
        >
          Edit Cart
        </Link>
      </div>

      {/* Items */}
      <div className="mt-6 space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[#F7ADAD]/20">
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover"
              />

              <span className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#800020] text-[9px] font-bold text-white">
                {item.quantity}
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold">{item.name}</p>

              <p className="mt-1 text-xs text-[#800020]/45">
                {item.color} • {item.size}
              </p>
            </div>

            <p className="text-sm font-black">
              ₹{(item.price * item.quantity).toLocaleString("en-IN")}
            </p>
          </div>
        ))}
      </div>

      {/* Pricing */}
      <div className="mt-6 space-y-4 border-t border-[#800020]/10 pt-6">
        <div className="flex justify-between text-sm">
          <span className="text-[#800020]/55">Subtotal</span>
          <span className="font-bold">
            ₹{subtotal.toLocaleString("en-IN")}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-[#800020]/55">Discount</span>
            <span className="font-bold text-[#D45060]">
              - ₹{discount.toLocaleString("en-IN")}
            </span>
          </div>
        )}

        <div className="flex justify-between text-sm">
          <span className="text-[#800020]/55">Shipping</span>
          <span
            className={`font-bold ${
              shipping === 0 ? "text-[#D45060]" : ""
            }`}
          >
            {shipping === 0 ? "FREE" : `₹${shipping}`}
          </span>
        </div>
      </div>

      {/* Total */}
      <div className="mt-6 border-t border-[#800020]/10 pt-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#800020]/45">
              Total
            </p>

            <p className="mt-1 text-3xl font-black">
              ₹{total.toLocaleString("en-IN")}
            </p>
          </div>

          <span className="text-xs font-semibold text-[#D45060]">
            INR
          </span>
        </div>

        <button
          type="submit"
          form=""
          className="hidden"
          aria-hidden="true"
        />

        <p className="mt-4 text-center text-[11px] leading-5 text-[#800020]/45">
          By placing your order, you agree to the applicable terms and
          conditions.
        </p>

        {/* This button submits the parent form */}
        <button
          onClick={() => {
            const form = document.querySelector("form");
            if (form) form.requestSubmit();
          }}
          className="mt-5 flex w-full items-center justify-center rounded-xl bg-[#800020] px-5 py-4 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#D45060]"
        >
          Place Order →
        </button>
      </div>
    </div>
  );
}

function CheckoutStep({ number, label, active, completed }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-black ${
          completed || active
            ? "bg-[#800020] text-white"
            : "border border-[#800020]/15 bg-white text-[#800020]/40"
        }`}
      >
        {completed ? "✓" : number}
      </div>

      <span
        className={`hidden text-xs font-bold sm:block ${
          active ? "text-[#800020]" : "text-[#800020]/35"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

function CheckoutLine({ active = false }) {
  return (
    <div
      className={`mx-2 h-px w-8 sm:mx-4 sm:w-14 ${
        active ? "bg-[#800020]" : "bg-[#800020]/10"
      }`}
    />
  );
}

function OrderSuccess() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7ADAD]/20 px-5 text-[#800020]">
      <div className="w-full max-w-2xl rounded-[2rem] border border-[#800020]/10 bg-white p-8 text-center shadow-2xl md:p-14">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#F7ADAD]/40 text-4xl text-[#800020]">
          ✓
        </div>

        <p className="mt-7 text-sm font-bold uppercase tracking-[0.25em] text-[#D45060]">
          Order Confirmed
        </p>

        <h1 className="mt-3 text-4xl font-black md:text-5xl">
          Thank you for shopping with us.
        </h1>

        <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-[#800020]/60">
          Your order has been placed successfully. This frontend demo
          simulates the checkout experience and does not process a real
          payment or create a real order.
        </p>

        <div className="mx-auto mt-7 max-w-sm rounded-2xl bg-[#F7ADAD]/20 p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-[#800020]/45">
            Demo Order ID
          </p>

          <p className="mt-2 text-lg font-black">LL-2026-10482</p>
        </div>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/orders"
            className="rounded-full bg-[#800020] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#D45060]"
          >
            View Orders
          </Link>

          <Link
            href="/shop"
            className="rounded-full border border-[#800020]/15 bg-white px-7 py-3.5 text-sm font-bold transition hover:border-[#D45060] hover:text-[#D45060]"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}