"use client";

import Link from "next/link";
import { useState } from "react";

const initialPayments = [
  {
    id: 1,
    type: "card",
    brand: "VISA",
    last4: "4242",
    name: "Adesh Dange",
    expiry: "12/28",
    isDefault: true,
  },
  {
    id: 2,
    type: "card",
    brand: "MASTERCARD",
    last4: "8888",
    name: "Adesh Dange",
    expiry: "08/27",
    isDefault: false,
  },
  {
    id: 3,
    type: "upi",
    upiId: "adesh@upi",
    isDefault: false,
  },
];

export default function PaymentsPage() {
  const [payments, setPayments] = useState(initialPayments);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [message, setMessage] = useState("");

  const setDefaultPayment = (id) => {
    setPayments((current) =>
      current.map((payment) => ({
        ...payment,
        isDefault: payment.id === id,
      }))
    );

    showMessage("Default payment method updated.");
  };

  const removePayment = () => {
    if (!selectedPayment) return;

    setPayments((current) =>
      current.filter((payment) => payment.id !== selectedPayment.id)
    );

    setShowDeleteModal(false);
    setSelectedPayment(null);

    showMessage("Payment method removed.");
  };

  const showMessage = (text) => {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  const addPayment = (payment) => {
    setPayments((current) => [
      ...current,
      {
        ...payment,
        id: Date.now(),
        isDefault: current.length === 0,
      },
    ]);

    setShowAddModal(false);
    showMessage("Payment method added successfully.");
  };

  return (
    <main className="min-h-screen bg-[#F7ADAD]/20 text-[#800020]">
      {/* Toast */}
      {message && (
        <div className="fixed right-5 top-5 z-50 flex items-center gap-3 rounded-2xl bg-[#800020] px-5 py-4 text-sm font-semibold text-white shadow-2xl">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
            ✓
          </span>
          {message}
        </div>
      )}

      {/* Header */}
      <section className="border-b border-[#800020]/10 bg-white/70 px-5 py-10 backdrop-blur-xl md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-5 flex flex-wrap items-center gap-2 text-sm text-[#800020]/60">
            <Link href="/" className="transition hover:text-[#D45060]">
              Home
            </Link>

            <span>/</span>

            <Link
              href="/account"
              className="transition hover:text-[#D45060]"
            >
              Account
            </Link>

            <span>/</span>

            <span>Payments</span>
          </div>

          <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#D45060]">
            Payment Preferences
          </p>

          <h1 className="mt-2 text-4xl font-black tracking-tight md:text-5xl">
            Payment Methods
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-[#800020]/60 md:text-base">
            Manage your saved cards and UPI payment methods for faster
            checkout.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="px-5 py-10 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-7 lg:grid-cols-[300px_1fr]">
            {/* Sidebar */}
            <aside className="h-fit rounded-[1.75rem] border border-[#800020]/10 bg-white p-5 shadow-sm lg:sticky lg:top-6">
              <div className="flex items-center gap-4 border-b border-[#800020]/10 pb-5">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#800020] text-xl font-black text-white">
                  AD
                </div>

                <div className="min-w-0">
                  <h2 className="truncate text-lg font-black">
                    Adesh Dange
                  </h2>

                  <p className="mt-1 truncate text-xs text-[#800020]/50">
                    adesh@example.com
                  </p>
                </div>
              </div>

              <nav className="mt-5 space-y-1">
                <AccountNavItem
                  href="/account"
                  icon="⌂"
                  label="Account Overview"
                />

                <AccountNavItem
                  href="/account/profile"
                  icon="◉"
                  label="Profile"
                />

                <AccountNavItem
                  href="/account/addresses"
                  icon="⌖"
                  label="Addresses"
                />

                <AccountNavItem
                  href="/account/payments"
                  icon="▣"
                  label="Payments"
                  active
                />

                <AccountNavItem
                  href="/account/notifications"
                  icon="♢"
                  label="Notifications"
                />

                <AccountNavItem
                  href="/wishlist"
                  icon="♡"
                  label="Wishlist"
                />

                <AccountNavItem
                  href="/orders"
                  icon="▤"
                  label="My Orders"
                />
              </nav>
            </aside>

            {/* Main */}
            <div className="space-y-7">
              {/* Intro */}
              <section className="overflow-hidden rounded-[2rem] bg-[#800020] p-7 text-white shadow-xl md:p-9">
                <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#F7ADAD]">
                      Secure Payments
                    </p>

                    <h2 className="mt-2 text-3xl font-black">
                      Your Payment Methods
                    </h2>

                    <p className="mt-3 max-w-xl text-sm leading-6 text-white/65">
                      Save your preferred payment methods for a faster and
                      smoother checkout experience.
                    </p>
                  </div>

                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-3xl backdrop-blur-xl">
                    ▣
                  </div>
                </div>
              </section>

              {/* Payment Methods */}
              <section className="rounded-[1.75rem] border border-[#800020]/10 bg-white p-6 shadow-sm md:p-8">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#D45060]">
                      Saved Methods
                    </p>

                    <h2 className="mt-1 text-2xl font-black">
                      Your Payments
                    </h2>

                    <p className="mt-1 text-xs text-[#800020]/50">
                      {payments.length} saved payment{" "}
                      {payments.length === 1 ? "method" : "methods"}
                    </p>
                  </div>

                  <button
                    onClick={() => setShowAddModal(true)}
                    className="w-fit rounded-full bg-[#800020] px-5 py-3 text-xs font-bold text-white shadow-md transition hover:bg-[#D45060]"
                  >
                    + Add Payment Method
                  </button>
                </div>

                <div className="mt-7 space-y-4">
                  {payments.length === 0 ? (
                    <EmptyPayments
                      onAdd={() => setShowAddModal(true)}
                    />
                  ) : (
                    payments.map((payment) => (
                      <PaymentCard
                        key={payment.id}
                        payment={payment}
                        onSetDefault={setDefaultPayment}
                        onDelete={(item) => {
                          setSelectedPayment(item);
                          setShowDeleteModal(true);
                        }}
                      />
                    ))
                  )}
                </div>
              </section>

              {/* Security */}
              <section className="rounded-[1.75rem] border border-[#800020]/10 bg-white p-6 shadow-sm md:p-8">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F7ADAD]/35 text-xl">
                    🔒
                  </div>

                  <div className="flex-1">
                    <p className="text-xs font-bold uppercase tracking-widest text-[#D45060]">
                      Security
                    </p>

                    <h2 className="mt-1 text-xl font-black">
                      Your Payment Information Is Protected
                    </h2>

                    <p className="mt-2 text-xs leading-5 text-[#800020]/50">
                      Only limited payment details are displayed. Full card
                      information is never shown on this page.
                    </p>
                  </div>

                  <span className="w-fit rounded-full bg-green-50 px-4 py-2 text-[10px] font-black text-green-700">
                    SECURE
                  </span>
                </div>
              </section>

              {/* Payment Information */}
              <section className="rounded-[1.75rem] border border-[#800020]/10 bg-white p-6 shadow-sm md:p-8">
                <p className="text-xs font-bold uppercase tracking-widest text-[#D45060]">
                  Checkout Information
                </p>

                <h2 className="mt-1 text-xl font-black">
                  Payment Experience
                </h2>

                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  <InfoCard
                    icon="▣"
                    title="Cards"
                    text="Credit and debit cards"
                  />

                  <InfoCard
                    icon="⌁"
                    title="UPI"
                    text="Fast UPI payments"
                  />

                  <InfoCard
                    icon="₹"
                    title="COD"
                    text="Cash on delivery"
                  />
                </div>
              </section>

              <div className="flex justify-center pb-5">
                <Link
                  href="/account"
                  className="text-sm font-bold text-[#D45060] transition hover:text-[#800020]"
                >
                  ← Back to Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Add Payment Modal */}
      {showAddModal && (
        <AddPaymentModal
          onClose={() => setShowAddModal(false)}
          onAdd={addPayment}
        />
      )}

      {/* Delete Modal */}
      {showDeleteModal && selectedPayment && (
        <DeletePaymentModal
          payment={selectedPayment}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedPayment(null);
          }}
          onConfirm={removePayment}
        />
      )}
    </main>
  );
}

function PaymentCard({ payment, onSetDefault, onDelete }) {
  const isUpi = payment.type === "upi";

  return (
    <div className="rounded-2xl border border-[#800020]/10 bg-[#F7ADAD]/10 p-5 transition hover:border-[#D45060]/30">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        {/* Icon / Card Visual */}
        <div
          className={`flex h-20 w-full shrink-0 items-center justify-between rounded-2xl px-5 text-white sm:w-32 ${
            isUpi ? "bg-[#D45060]" : "bg-[#800020]"
          }`}
        >
          <span className="text-lg font-black">
            {isUpi ? "UPI" : payment.brand}
          </span>

          <span className="text-xl">
            {isUpi ? "⌁" : "▣"}
          </span>
        </div>

        {/* Details */}
        <div className="min-w-0 flex-1">
          {isUpi ? (
            <>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#800020]/40">
                UPI ID
              </p>

              <p className="mt-1 text-base font-black">
                {payment.upiId}
              </p>

              <p className="mt-2 text-xs text-[#800020]/50">
                UPI payment method
              </p>
            </>
          ) : (
            <>
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-base font-black">
                  •••• •••• •••• {payment.last4}
                </p>

                {payment.isDefault && (
                  <span className="rounded-full bg-[#800020] px-3 py-1 text-[9px] font-black text-white">
                    DEFAULT
                  </span>
                )}
              </div>

              <p className="mt-2 text-xs text-[#800020]/50">
                {payment.name} • Expires {payment.expiry}
              </p>
            </>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2 sm:justify-end">
          {!payment.isDefault && (
            <button
              onClick={() => onSetDefault(payment.id)}
              className="rounded-full border border-[#800020]/15 bg-white px-4 py-2.5 text-[10px] font-bold transition hover:border-[#D45060] hover:text-[#D45060]"
            >
              Set Default
            </button>
          )}

          <button
            onClick={() => onDelete(payment)}
            className="rounded-full border border-red-200 bg-white px-4 py-2.5 text-[10px] font-bold text-red-600 transition hover:bg-red-50"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

function AddPaymentModal({ onClose, onAdd }) {
  const [type, setType] = useState("card");

  const [form, setForm] = useState({
    brand: "VISA",
    last4: "",
    name: "",
    expiry: "",
    upiId: "",
  });

  const update = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (type === "upi") {
      if (!form.upiId.trim()) return;

      onAdd({
        type: "upi",
        upiId: form.upiId,
      });

      return;
    }

    if (!form.last4 || !form.name || !form.expiry) return;

    onAdd({
      type: "card",
      brand: form.brand,
      last4: form.last4.slice(-4),
      name: form.name,
      expiry: form.expiry,
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#800020]/40 px-5 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[2rem] bg-white p-7 shadow-2xl">
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#D45060]">
              New Payment
            </p>

            <h2 className="mt-1 text-2xl font-black">
              Add Payment Method
            </h2>
          </div>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F7ADAD]/25 text-lg transition hover:bg-[#F7ADAD]/50"
          >
            ×
          </button>
        </div>

        {/* Type */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setType("card")}
            className={`rounded-xl border px-4 py-3 text-sm font-bold transition ${
              type === "card"
                ? "border-[#800020] bg-[#800020] text-white"
                : "border-[#800020]/10 bg-white"
            }`}
          >
            ▣ Card
          </button>

          <button
            type="button"
            onClick={() => setType("upi")}
            className={`rounded-xl border px-4 py-3 text-sm font-bold transition ${
              type === "upi"
                ? "border-[#800020] bg-[#800020] text-white"
                : "border-[#800020]/10 bg-white"
            }`}
          >
            ⌁ UPI
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {type === "card" ? (
            <>
              <label className="block">
                <span className="text-xs font-bold text-[#800020]/70">
                  Card Network
                </span>

                <select
                  value={form.brand}
                  onChange={(event) =>
                    update("brand", event.target.value)
                  }
                  className="mt-2 w-full rounded-xl border border-[#800020]/10 bg-white px-4 py-3 text-sm outline-none focus:border-[#D45060]"
                >
                  <option>VISA</option>
                  <option>MASTERCARD</option>
                  <option>RUPAY</option>
                </select>
              </label>

              <ModalInput
                label="Card Number"
                placeholder="1234 5678 9012 3456"
                inputMode="numeric"
                value={form.last4}
                onChange={(value) =>
                  update(
                    "last4",
                    value.replace(/\D/g, "").slice(0, 16)
                  )
                }
                required
              />

              <ModalInput
                label="Cardholder Name"
                placeholder="Name on card"
                value={form.name}
                onChange={(value) => update("name", value)}
                required
              />

              <ModalInput
                label="Expiry Date"
                placeholder="MM/YY"
                value={form.expiry}
                onChange={(value) => update("expiry", value)}
                required
              />
            </>
          ) : (
            <ModalInput
              label="UPI ID"
              placeholder="example@upi"
              value={form.upiId}
              onChange={(value) => update("upiId", value)}
              required
            />
          )}

          <div className="rounded-xl bg-[#F7ADAD]/15 p-4 text-xs leading-5 text-[#800020]/55">
            This is a frontend-only demo. No real card or payment information
            is processed or stored.
          </div>

          <div className="flex flex-col-reverse gap-3 pt-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-[#800020]/15 px-5 py-3 text-sm font-bold transition hover:border-[#D45060] hover:text-[#D45060]"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-[#800020] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#D45060]"
            >
              Add Payment Method
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DeletePaymentModal({ payment, onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#800020]/40 px-5 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-[2rem] bg-white p-7 shadow-2xl">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-2xl text-red-600">
          !
        </div>

        <h2 className="mt-5 text-2xl font-black">
          Remove payment method?
        </h2>

        <p className="mt-3 text-sm leading-6 text-[#800020]/60">
          Are you sure you want to remove{" "}
          <strong className="text-[#800020]">
            {payment.type === "upi"
              ? payment.upiId
              : `•••• ${payment.last4}`}
          </strong>
          ?
        </p>

        {payment.isDefault && (
          <div className="mt-4 rounded-xl bg-[#F7ADAD]/20 p-4 text-xs font-semibold text-[#800020]/65">
            This is your default payment method. Make another payment method
            default before removing it if required.
          </div>
        )}

        <div className="mt-7 flex flex-col gap-3 sm:flex-row-reverse">
          <button
            onClick={onConfirm}
            className="rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700"
          >
            Remove
          </button>

          <button
            onClick={onClose}
            className="rounded-xl border border-[#800020]/15 bg-white px-5 py-3 text-sm font-bold transition hover:border-[#D45060] hover:text-[#D45060]"
          >
            Keep Payment Method
          </button>
        </div>
      </div>
    </div>
  );
}

function ModalInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  inputMode,
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
        required={required}
        inputMode={inputMode}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-[#800020]/10 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-[#800020]/30 focus:border-[#D45060]"
      />
    </label>
  );
}

function InfoCard({ icon, title, text }) {
  return (
    <div className="rounded-2xl bg-[#F7ADAD]/15 p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white font-black shadow-sm">
        {icon}
      </div>

      <h3 className="mt-4 text-sm font-black">{title}</h3>

      <p className="mt-1 text-xs text-[#800020]/50">{text}</p>
    </div>
  );
}

function EmptyPayments({ onAdd }) {
  return (
    <div className="rounded-2xl border border-dashed border-[#800020]/20 bg-[#F7ADAD]/10 px-6 py-12 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F7ADAD]/35 text-2xl">
        ▣
      </div>

      <h3 className="mt-5 text-xl font-black">
        No payment methods saved
      </h3>

      <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-[#800020]/50">
        Add a card or UPI ID to make future checkout faster.
      </p>

      <button
        onClick={onAdd}
        className="mt-5 rounded-full bg-[#800020] px-6 py-3 text-xs font-bold text-white transition hover:bg-[#D45060]"
      >
        + Add Payment Method
      </button>
    </div>
  );
}

function AccountNavItem({ href, icon, label, active = false }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition ${
        active
          ? "bg-[#800020] text-white shadow-md"
          : "text-[#800020]/65 hover:bg-[#F7ADAD]/25 hover:text-[#800020]"
      }`}
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full text-sm">
        {icon}
      </span>

      <span>{label}</span>
    </Link>
  );
}