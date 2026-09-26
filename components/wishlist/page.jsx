"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const initialItems = [
  {
    id: "p1",
    name: "Classic Oversized Jacket",
    category: "Fashion",
    price: 2499,
    quantity: 1,
    color: "Burgundy",
    size: "M",
  },
  {
    id: "p2",
    name: "Aura Wireless Headphones",
    category: "Electronics",
    price: 3999,
    quantity: 1,
    color: "Black",
    size: null,
  },
  {
    id: "p3",
    name: "Luna Ceramic Vase",
    category: "Home & Living",
    price: 1299,
    quantity: 2,
    color: "Blush",
    size: null,
  },
];

const formatPrice = (price) => `₹${price.toLocaleString("en-IN")}`;

export default function CheckoutPage() {
  const [items] = useState(initialItems);
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  const [paymentMethod, setPaymentMethod] = useState("card");

  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  const [upiId, setUpiId] = useState("");
  const [saveAddress, setSaveAddress] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [errors, setErrors] = useState({});

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = subtotal >= 3000 ? 0 : 99;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + shipping + tax;

  const updateForm = (e) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));
  };

  const validateShipping = () => {
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "address",
      "city",
      "state",
      "pincode",
    ];

    const newErrors = {};

    requiredFields.forEach((field) => {
      if (!formData[field].trim()) {
        newErrors[field] = "This field is required.";
      }
    });

    if (
      formData.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email address.";
    }

    if (
      formData.phone &&
      !/^[0-9]{10}$/.test(formData.phone.replace(/\s/g, ""))
    ) {
      newErrors.phone = "Enter a valid 10-digit phone number.";
    }

    if (
      formData.pincode &&
      !/^[0-9]{6}$/.test(formData.pincode)
    ) {
      newErrors.pincode = "Enter a valid 6-digit PIN code.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const continueToPayment = () => {
    if (validateShipping()) {
      setStep(2);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const validatePayment = () => {
    if (paymentMethod === "card") {
      if (
        !cardData.number.trim() ||
        !cardData.name.trim() ||
        !cardData.expiry.trim() ||
        !cardData.cvv.trim()
      ) {
        return false;
      }

      return true;
    }

    if (paymentMethod === "upi") {
      return upiId.trim().length > 0;
    }

    return true;
  };

  const placeOrder = (e) => {
    e.preventDefault();

    if (!validatePayment()) {
      setErrors({
        payment: "Please complete your payment details.",
      });
      return;
    }

    setErrors({});
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <main className="min-h-screen bg-[#F7ADAD]/20 text-[#800020]">
        <section className="flex min-h-screen items-center justify-center px-6 py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-2xl rounded-[2rem] bg-white px-6 py-14 text-center shadow-xl sm:px-12"
          >
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#F7ADAD] text-4xl text-[#800020]">
              ✓
            </div>

            <p className="mt-8 text-xs font-bold uppercase tracking-[0.3em] text-[#D45060]">
              Order confirmed
            </p>

            <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
              Thank you for your order.
            </h1>

            <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-gray-500">
              Your Loom & Leaf order has been placed successfully. This is a
              frontend checkout demonstration, so no real payment has been
              processed.
            </p>

            <div className="mx-auto mt-8 max-w-md rounded-2xl bg-[#F7ADAD]/30 p-5 text-left">
              <div className="flex justify-between gap-4 text-sm">
                <span className="text-gray-500">Order ID</span>
                <span className="font-bold text-[#800020]">
                  LL-2026-10524
                </span>
              </div>

              <div className="mt-3 flex justify-between gap-4 text-sm">
                <span className="text-gray-500">Total</span>
                <span className="font-bold text-[#800020]">
                  {formatPrice(total)}
                </span>
              </div>

              <div className="mt-3 flex justify-between gap-4 text-sm">
                <span className="text-gray-500">Payment</span>
                <span className="font-bold capitalize text-[#800020]">
                  {paymentMethod === "cod"
                    ? "Cash on Delivery"
                    : paymentMethod === "upi"
                    ? "UPI"
                    : "Card"}
                </span>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/orders"
                className="rounded-full bg-[#800020] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#D45060]"
              >
                View Orders
              </Link>

              <Link
                href="/shop"
                className="rounded-full border border-[#800020]/10 bg-[#F7ADAD]/30 px-7 py-3.5 text-sm font-bold text-[#800020] transition hover:bg-[#F7ADAD]"
              >
                Continue Shopping
              </Link>
            </div>
          </motion.div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7ADAD]/20 text-[#800020]">
      {/* HEADER */}
      <header className="border-b border-[#800020]/10 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight sm:text-3xl"
          >
            Loom <span className="text-[#D45060]">&</span> Leaf
          </Link>

          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">
            <span>🔒</span>
            Secure Checkout
          </div>
        </div>
      </header>

      {/* PROGRESS */}
      <section className="border-b border-[#800020]/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-6 lg:px-10">
          <div className="mx-auto flex max-w-xl items-center">
            <div className="flex items-center gap-3">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${
                  step >= 1
                    ? "bg-[#800020] text-white"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                1
              </div>

              <span className="hidden text-sm font-bold sm:block">
                Delivery
              </span>
            </div>

            <div
              className={`mx-3 h-px flex-1 ${
                step >= 2 ? "bg-[#800020]" : "bg-gray-200"
              }`}
            />

            <div className="flex items-center gap-3">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${
                  step >= 2
                    ? "bg-[#800020] text-white"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                2
              </div>

              <span className="hidden text-sm font-bold sm:block">
                Payment
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* LEFT */}
          <div>
            {step === 1 ? (
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                className="rounded-[2rem] bg-white p-6 shadow-sm sm:p-8"
              >
                <div className="mb-8">
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#D45060]">
                    Step 1
                  </p>

                  <h1 className="mt-2 text-3xl font-bold">
                    Delivery Information
                  </h1>

                  <p className="mt-2 text-sm text-gray-500">
                    Enter the address where you&apos;d like your order
                    delivered.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* NAME */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <InputField
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={updateForm}
                      error={errors.firstName}
                      placeholder="First name"
                    />

                    <InputField
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={updateForm}
                      error={errors.lastName}
                      placeholder="Last name"
                    />
                  </div>

                  {/* CONTACT */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <InputField
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={updateForm}
                      error={errors.email}
                      placeholder="you@example.com"
                    />

                    <InputField
                      label="Phone Number"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={updateForm}
                      error={errors.phone}
                      placeholder="10-digit phone number"
                    />
                  </div>

                  {/* ADDRESS */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold">
                      Address
                    </label>

                    <input
                      name="address"
                      value={formData.address}
                      onChange={updateForm}
                      placeholder="House / Flat / Street / Area"
                      className={`w-full rounded-xl border bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:bg-white focus:ring-2 focus:ring-[#D45060]/10 ${
                        errors.address
                          ? "border-red-300"
                          : "border-gray-200 focus:border-[#D45060]"
                      }`}
                    />

                    {errors.address && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.address}
                      </p>
                    )}
                  </div>

                  <InputField
                    label="Apartment, Suite, etc. (Optional)"
                    name="apartment"
                    value={formData.apartment}
                    onChange={updateForm}
                    placeholder="Apartment, floor, landmark"
                    required={false}
                  />

                  {/* CITY / STATE */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <InputField
                      label="City"
                      name="city"
                      value={formData.city}
                      onChange={updateForm}
                      error={errors.city}
                      placeholder="City"
                    />

                    <InputField
                      label="State"
                      name="state"
                      value={formData.state}
                      onChange={updateForm}
                      error={errors.state}
                      placeholder="State"
                    />
                  </div>

                  {/* PIN / COUNTRY */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <InputField
                      label="PIN Code"
                      name="pincode"
                      value={formData.pincode}
                      onChange={updateForm}
                      error={errors.pincode}
                      placeholder="6-digit PIN"
                    />

                    <div>
                      <label className="mb-2 block text-sm font-semibold">
                        Country
                      </label>

                      <select
                        name="country"
                        value={formData.country}
                        onChange={updateForm}
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:border-[#D45060] focus:bg-white focus:ring-2 focus:ring-[#D45060]/10"
                      >
                        <option>India</option>
                        <option>United States</option>
                        <option>United Kingdom</option>
                        <option>Canada</option>
                        <option>Australia</option>
                      </select>
                    </div>
                  </div>

                  {/* SAVE ADDRESS */}
                  <label className="flex cursor-pointer items-center gap-3 rounded-xl bg-[#F7ADAD]/20 px-4 py-3.5">
                    <input
                      type="checkbox"
                      checked={saveAddress}
                      onChange={(e) => setSaveAddress(e.target.checked)}
                      className="h-4 w-4 accent-[#800020]"
                    />

                    <span className="text-sm font-medium">
                      Save this address for future orders
                    </span>
                  </label>

                  {/* CONTINUE */}
                  <button
                    type="button"
                    onClick={continueToPayment}
                    className="w-full rounded-xl bg-[#800020] px-5 py-4 text-sm font-bold text-white shadow-lg shadow-[#800020]/15 transition hover:-translate-y-0.5 hover:bg-[#D45060]"
                  >
                    Continue to Payment →
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                className="rounded-[2rem] bg-white p-6 shadow-sm sm:p-8"
              >
                <div className="mb-8 flex items-start justify-between gap-5">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#D45060]">
                      Step 2
                    </p>

                    <h1 className="mt-2 text-3xl font-bold">
                      Payment Method
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                      Choose how you&apos;d like to pay for your order.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs font-bold text-[#D45060] hover:text-[#800020]"
                  >
                    Edit Delivery
                  </button>
                </div>

                {/* DELIVERY SUMMARY */}
                <div className="mb-7 rounded-2xl bg-[#F7ADAD]/25 p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#D45060]">
                    Delivering to
                  </p>

                  <p className="mt-2 text-sm font-bold">
                    {formData.firstName} {formData.lastName}
                  </p>

                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    {formData.address}
                    {formData.apartment
                      ? `, ${formData.apartment}`
                      : ""}
                    , {formData.city}, {formData.state} -{" "}
                    {formData.pincode}
                  </p>
                </div>

                {/* PAYMENT METHODS */}
                <div className="space-y-3">
                  <PaymentOption
                    value="card"
                    active={paymentMethod === "card"}
                    onClick={() => {
                      setPaymentMethod("card");
                      setErrors({});
                    }}
                    title="Credit / Debit Card"
                    description="Visa, Mastercard, RuPay and more"
                    icon="▣"
                  />

                  <PaymentOption
                    value="upi"
                    active={paymentMethod === "upi"}
                    onClick={() => {
                      setPaymentMethod("upi");
                      setErrors({});
                    }}
                    title="UPI"
                    description="Pay using your preferred UPI app"
                    icon="⌁"
                  />

                  <PaymentOption
                    value="cod"
                    active={paymentMethod === "cod"}
                    onClick={() => {
                      setPaymentMethod("cod");
                      setErrors({});
                    }}
                    title="Cash on Delivery"
                    description="Pay when your order arrives"
                    icon="₹"
                  />
                </div>

                {/* CARD */}
                <AnimatePresence mode="wait">
                  {paymentMethod === "card" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-6 space-y-5 rounded-2xl border border-[#800020]/10 p-5">
                        <InputField
                          label="Card Number"
                          value={cardData.number}
                          onChange={(e) =>
                            setCardData({
                              ...cardData,
                              number: e.target.value,
                            })
                          }
                          placeholder="1234 5678 9012 3456"
                        />

                        <InputField
                          label="Name on Card"
                          value={cardData.name}
                          onChange={(e) =>
                            setCardData({
                              ...cardData,
                              name: e.target.value,
                            })
                          }
                          placeholder="Name as shown on card"
                        />

                        <div className="grid gap-5 sm:grid-cols-2">
                          <InputField
                            label="Expiry Date"
                            value={cardData.expiry}
                            onChange={(e) =>
                              setCardData({
                                ...cardData,
                                expiry: e.target.value,
                              })
                            }
                            placeholder="MM / YY"
                          />

                          <InputField
                            label="CVV"
                            type="password"
                            value={cardData.cvv}
                            onChange={(e) =>
                              setCardData({
                                ...cardData,
                                cvv: e.target.value,
                              })
                            }
                            placeholder="•••"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {paymentMethod === "upi" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-6 rounded-2xl border border-[#800020]/10 p-5">
                        <InputField
                          label="UPI ID"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="example@upi"
                        />

                        <p className="mt-3 text-xs leading-5 text-gray-400">
                          This is a frontend demonstration. No real UPI
                          transaction will be initiated.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {paymentMethod === "cod" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 rounded-2xl bg-[#F7ADAD]/25 p-5"
                    >
                      <p className="text-sm font-bold">
                        Cash on Delivery selected
                      </p>

                      <p className="mt-2 text-xs leading-6 text-gray-500">
                        You can pay for your order when it is delivered to
                        your address.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {errors.payment && (
                  <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-xs font-semibold text-red-500">
                    {errors.payment}
                  </p>
                )}

                {/* PLACE ORDER */}
                <form onSubmit={placeOrder} className="mt-7">
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-[#800020] px-5 py-4 text-sm font-bold text-white shadow-lg shadow-[#800020]/15 transition hover:-translate-y-0.5 hover:bg-[#D45060]"
                  >
                    Place Order · {formatPrice(total)}
                  </button>
                </form>

                <div className="mt-5 flex items-center justify-center gap-2 text-xs text-gray-400">
                  <span>🔒</span>
                  Your payment information is protected.
                </div>
              </motion.div>
            )}
          </div>

          {/* ORDER SUMMARY */}
          <aside className="lg:sticky lg:top-8 lg:h-fit">
            <div className="rounded-[2rem] bg-white p-6 shadow-sm sm:p-7">
              <h2 className="text-xl font-bold">Order Summary</h2>

              {/* ITEMS */}
              <div className="mt-6 space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3"
                  >
                    <div className="relative flex h-16 w-14 shrink-0 items-center justify-center rounded-xl bg-[#F7ADAD]/30">
                      <div className="flex h-11 w-9 items-center justify-center rounded-xl bg-[#800020]">
                        <span className="text-lg font-bold text-white">
                          L
                        </span>
                      </div>

                      <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#D45060] px-1 text-[9px] font-bold text-white">
                        {item.quantity}
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold">
                        {item.name}
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        {item.color}
                        {item.size ? ` · ${item.size}` : ""}
                      </p>
                    </div>

                    <p className="text-sm font-bold">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              {/* TOTALS */}
              <div className="mt-6 space-y-4 border-t border-[#800020]/10 pt-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-semibold">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? "FREE" : formatPrice(shipping)}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Estimated Tax</span>
                  <span className="font-semibold">
                    {formatPrice(tax)}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-[#800020]/10 pt-6">
                <span className="font-bold">Total</span>

                <span className="text-2xl font-bold">
                  {formatPrice(total)}
                </span>
              </div>

              {/* TRUST */}
              <div className="mt-6 space-y-3 rounded-2xl bg-[#F7ADAD]/20 p-4">
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span className="font-bold text-[#800020]">✓</span>
                  Secure checkout
                </div>

                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span className="font-bold text-[#800020]">✓</span>
                  Easy returns
                </div>

                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span className="font-bold text-[#800020]">✓</span>
                  Curated products
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

/* INPUT COMPONENT */
function InputField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  error,
  required = true,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-semibold text-[#800020]"
      >
        {label}
        {required && <span className="ml-1 text-[#D45060]">*</span>}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full rounded-xl border bg-gray-50 px-4 py-3.5 text-sm text-gray-800 outline-none transition focus:bg-white focus:ring-2 focus:ring-[#D45060]/10 ${
          error
            ? "border-red-300 focus:border-red-400"
            : "border-gray-200 focus:border-[#D45060]"
        }`}
      />

      {error && (
        <p className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

/* PAYMENT OPTION */
function PaymentOption({
  active,
  onClick,
  title,
  description,
  icon,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${
        active
          ? "border-[#800020] bg-[#F7ADAD]/20"
          : "border-gray-200 hover:border-[#D45060]/40"
      }`}
    >
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg font-bold ${
          active
            ? "bg-[#800020] text-[#F7ADAD]"
            : "bg-[#F7ADAD]/30 text-[#800020]"
        }`}
      >
        {icon}
      </div>

      <div className="flex-1">
        <p className="text-sm font-bold text-[#800020]">
          {title}
        </p>

        <p className="mt-1 text-xs text-gray-400">
          {description}
        </p>
      </div>

      <div
        className={`flex h-5 w-5 items-center justify-center rounded-full border ${
          active
            ? "border-[#800020] bg-[#800020]"
            : "border-gray-300"
        }`}
      >
        {active && (
          <span className="h-2 w-2 rounded-full bg-white" />
        )}
      </div>
    </button>
  );
}