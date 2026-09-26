"use client";

import Link from "next/link";
import { useState } from "react";

const initialAddresses = [
  {
    id: 1,
    type: "Home",
    name: "Adesh Dange",
    phone: "+91 98765 43210",
    line1: "123 Green Park",
    line2: "Near Main Road",
    city: "Pune",
    state: "Maharashtra",
    pincode: "411001",
    isDefault: true,
  },
  {
    id: 2,
    type: "Work",
    name: "Adesh Dange",
    phone: "+91 98765 43210",
    line1: "Tech Park, Building 4",
    line2: "Hinjewadi Phase 1",
    city: "Pune",
    state: "Maharashtra",
    pincode: "411057",
    isDefault: false,
  },
];

const emptyAddress = {
  type: "Home",
  name: "",
  phone: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  pincode: "",
  isDefault: false,
};

export default function AddressesPage() {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyAddress);
  const [message, setMessage] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const openAddForm = () => {
    setEditingId(null);
    setForm({
      ...emptyAddress,
      isDefault: addresses.length === 0,
    });
    setIsFormOpen(true);
  };

  const openEditForm = (address) => {
    setEditingId(address.id);
    setForm({ ...address });
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setForm(emptyAddress);
  };

  const showMessage = (text) => {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (editingId) {
      setAddresses((current) =>
        current.map((address) =>
          address.id === editingId
            ? {
                ...form,
                id: editingId,
              }
            : form.isDefault
            ? { ...address, isDefault: false }
            : address
        )
      );

      showMessage("Address updated successfully.");
    } else {
      const newAddress = {
        ...form,
        id: Date.now(),
      };

      setAddresses((current) =>
        form.isDefault
          ? [
              ...current.map((address) => ({
                ...address,
                isDefault: false,
              })),
              newAddress,
            ]
          : [...current, newAddress]
      );

      showMessage("New address added successfully.");
    }

    closeForm();
  };

  const setDefaultAddress = (id) => {
    setAddresses((current) =>
      current.map((address) => ({
        ...address,
        isDefault: address.id === id,
      }))
    );

    showMessage("Default address updated.");
  };

  const deleteAddress = () => {
    if (!deleteId) return;

    const addressToDelete = addresses.find(
      (address) => address.id === deleteId
    );

    const remaining = addresses.filter(
      (address) => address.id !== deleteId
    );

    if (addressToDelete?.isDefault && remaining.length > 0) {
      remaining[0].isDefault = true;
    }

    setAddresses(remaining);
    setDeleteId(null);

    showMessage("Address deleted successfully.");
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

            <span>Addresses</span>
          </div>

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#D45060]">
                Delivery Information
              </p>

              <h1 className="mt-2 text-4xl font-black tracking-tight md:text-5xl">
                My Addresses
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#800020]/60 md:text-base">
                Save and manage your delivery addresses for a faster checkout
                experience.
              </p>
            </div>

            <button
              onClick={openAddForm}
              className="w-fit rounded-full bg-[#800020] px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#D45060]"
            >
              + Add New Address
            </button>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="px-5 py-10 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-7 lg:grid-cols-[300px_1fr]">
            {/* Sidebar */}
            <aside className="h-fit rounded-[1.75rem] border border-[#800020]/10 bg-white p-5 shadow-sm lg:sticky lg:top-6">
              <div className="flex items-center gap-4 border-b border-[#800020]/10 pb-5">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#800020] text-xl font-black text-white">
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
                  active
                />

                <AccountNavItem
                  href="/account/payments"
                  icon="▣"
                  label="Payments"
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
            <div>
              {addresses.length === 0 ? (
                <EmptyAddresses onAdd={openAddForm} />
              ) : (
                <>
                  <div className="mb-6 flex items-end justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-[#D45060]">
                        Saved Addresses
                      </p>

                      <h2 className="mt-1 text-2xl font-black">
                        {addresses.length}{" "}
                        {addresses.length === 1
                          ? "Address"
                          : "Addresses"}
                      </h2>
                    </div>
                  </div>

                  <div className="grid gap-5 xl:grid-cols-2">
                    {addresses.map((address) => (
                      <AddressCard
                        key={address.id}
                        address={address}
                        onEdit={() => openEditForm(address)}
                        onDelete={() => setDeleteId(address.id)}
                        onSetDefault={() =>
                          setDefaultAddress(address.id)
                        }
                      />
                    ))}

                    {/* Add Card */}
                    <button
                      onClick={openAddForm}
                      className="group flex min-h-[280px] flex-col items-center justify-center rounded-[1.75rem] border-2 border-dashed border-[#800020]/15 bg-white/50 p-7 text-center transition hover:border-[#D45060] hover:bg-white"
                    >
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F7ADAD]/35 text-2xl transition group-hover:bg-[#800020] group-hover:text-white">
                        +
                      </div>

                      <h3 className="mt-4 text-base font-black">
                        Add Another Address
                      </h3>

                      <p className="mt-2 max-w-xs text-xs leading-5 text-[#800020]/50">
                        Save another delivery location for convenient
                        checkout.
                      </p>
                    </button>
                  </div>
                </>
              )}

              {/* Info */}
              <section className="mt-7 rounded-[1.75rem] border border-[#800020]/10 bg-white p-6 shadow-sm md:p-7">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F7ADAD]/35 text-lg">
                    ⓘ
                  </div>

                  <div>
                    <h3 className="text-sm font-black">
                      About saved addresses
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-[#800020]/55">
                      Your default address will be automatically selected
                      during checkout. You can change your default address at
                      any time.
                    </p>
                  </div>
                </div>
              </section>

              {/* Back */}
              <div className="flex justify-center py-7">
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

      {/* Address Form Modal */}
      {isFormOpen && (
        <AddressFormModal
          form={form}
          editing={Boolean(editingId)}
          onChange={updateField}
          onClose={closeForm}
          onSubmit={handleSubmit}
        />
      )}

      {/* Delete Modal */}
      {deleteId && (
        <DeleteModal
          onClose={() => setDeleteId(null)}
          onConfirm={deleteAddress}
        />
      )}
    </main>
  );
}

function AddressCard({
  address,
  onEdit,
  onDelete,
  onSetDefault,
}) {
  return (
    <article
      className={`relative rounded-[1.75rem] border bg-white p-6 shadow-sm transition hover:shadow-lg ${
        address.isDefault
          ? "border-[#800020]/25"
          : "border-[#800020]/10"
      }`}
    >
      {/* Default badge */}
      {address.isDefault && (
        <div className="absolute right-5 top-5 rounded-full bg-[#800020] px-3 py-1.5 text-[10px] font-black text-white">
          DEFAULT
        </div>
      )}

      {/* Type */}
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F7ADAD]/35 text-lg">
          {address.type === "Home" ? "⌂" : "▣"}
        </div>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#D45060]">
            Delivery Address
          </p>

          <h3 className="mt-1 text-lg font-black">{address.type}</h3>
        </div>
      </div>

      {/* Address */}
      <div className="mt-6 space-y-1 text-sm leading-6 text-[#800020]/70">
        <p className="font-black text-[#800020]">{address.name}</p>

        <p>{address.line1}</p>

        {address.line2 && <p>{address.line2}</p>}

        <p>
          {address.city}, {address.state} - {address.pincode}
        </p>

        <p className="pt-1 font-semibold">{address.phone}</p>
      </div>

      {/* Actions */}
      <div className="mt-6 flex flex-wrap gap-2 border-t border-[#800020]/10 pt-5">
        <button
          onClick={onEdit}
          className="rounded-full border border-[#800020]/15 bg-white px-4 py-2 text-xs font-bold transition hover:border-[#D45060] hover:text-[#D45060]"
        >
          Edit
        </button>

        <button
          onClick={onDelete}
          className="rounded-full border border-red-200 bg-white px-4 py-2 text-xs font-bold text-red-600 transition hover:bg-red-50"
        >
          Delete
        </button>

        {!address.isDefault && (
          <button
            onClick={onSetDefault}
            className="rounded-full bg-[#800020] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#D45060]"
          >
            Make Default
          </button>
        )}
      </div>
    </article>
  );
}

function AddressFormModal({
  form,
  editing,
  onChange,
  onClose,
  onSubmit,
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#800020]/40 px-5 py-6 backdrop-blur-sm">
      <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] bg-white p-6 shadow-2xl md:p-8">
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-5 border-b border-[#800020]/10 pb-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#D45060]">
              {editing ? "Update Address" : "New Address"}
            </p>

            <h2 className="mt-1 text-2xl font-black">
              {editing ? "Edit Address" : "Add New Address"}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F7ADAD]/25 text-xl transition hover:bg-[#800020] hover:text-white"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="mt-6 space-y-5">
          {/* Address Type */}
          <div>
            <label className="text-xs font-bold text-[#800020]/70">
              Address Type
            </label>

            <div className="mt-2 flex gap-3">
              {["Home", "Work", "Other"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => onChange("type", type)}
                  className={`rounded-full px-5 py-2.5 text-xs font-bold transition ${
                    form.type === type
                      ? "bg-[#800020] text-white"
                      : "border border-[#800020]/15 bg-white text-[#800020]/65 hover:border-[#D45060]"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormInput
              label="Full Name"
              value={form.name}
              required
              placeholder="Adesh Dange"
              onChange={(value) => onChange("name", value)}
            />

            <FormInput
              label="Phone Number"
              value={form.phone}
              type="tel"
              required
              placeholder="+91 98765 43210"
              onChange={(value) => onChange("phone", value)}
            />
          </div>

          <FormInput
            label="Address"
            value={form.line1}
            required
            placeholder="House no., building, street"
            onChange={(value) => onChange("line1", value)}
          />

          <FormInput
            label="Apartment, Suite, Landmark"
            value={form.line2}
            placeholder="Apartment, floor, landmark"
            onChange={(value) => onChange("line2", value)}
          />

          <div className="grid gap-4 sm:grid-cols-3">
            <FormInput
              label="City"
              value={form.city}
              required
              placeholder="Pune"
              onChange={(value) => onChange("city", value)}
            />

            <FormInput
              label="State"
              value={form.state}
              required
              placeholder="Maharashtra"
              onChange={(value) => onChange("state", value)}
            />

            <FormInput
              label="PIN Code"
              value={form.pincode}
              required
              placeholder="411001"
              onChange={(value) => onChange("pincode", value)}
            />
          </div>

          {/* Default */}
          <label className="flex cursor-pointer items-center gap-3 rounded-xl bg-[#F7ADAD]/15 p-4">
            <input
              type="checkbox"
              checked={form.isDefault}
              onChange={(event) =>
                onChange("isDefault", event.target.checked)
              }
              className="h-4 w-4 accent-[#800020]"
            />

            <div>
              <p className="text-sm font-bold">Make this my default address</p>

              <p className="mt-1 text-xs text-[#800020]/50">
                This address will be selected automatically at checkout.
              </p>
            </div>
          </label>

          {/* Buttons */}
          <div className="flex flex-col-reverse gap-3 border-t border-[#800020]/10 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-[#800020]/15 bg-white px-6 py-3 text-sm font-bold transition hover:border-[#D45060] hover:text-[#D45060]"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-[#800020] px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-[#D45060]"
            >
              {editing ? "Save Changes" : "Add Address"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function FormInput({
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
        required={required}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-xl border border-[#800020]/10 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-[#800020]/30 focus:border-[#D45060]"
      />
    </label>
  );
}

function EmptyAddresses({ onAdd }) {
  return (
    <div className="flex min-h-[45vh] flex-col items-center justify-center rounded-[2rem] border border-[#800020]/10 bg-white/70 px-6 py-16 text-center shadow-sm">
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#F7ADAD]/40 text-4xl">
        ⌖
      </div>

      <p className="mt-6 text-sm font-bold uppercase tracking-[0.25em] text-[#D45060]">
        Delivery Addresses
      </p>

      <h2 className="mt-2 text-3xl font-black">
        No saved addresses
      </h2>

      <p className="mt-3 max-w-md text-sm leading-6 text-[#800020]/55">
        Add a delivery address to make your checkout experience faster and
        easier.
      </p>

      <button
        onClick={onAdd}
        className="mt-7 rounded-full bg-[#800020] px-7 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-[#D45060]"
      >
        + Add Your First Address
      </button>
    </div>
  );
}

function DeleteModal({ onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-[#800020]/40 px-5 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-[2rem] bg-white p-7 shadow-2xl">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-2xl text-red-600">
          !
        </div>

        <h2 className="mt-5 text-2xl font-black">
          Delete this address?
        </h2>

        <p className="mt-3 text-sm leading-6 text-[#800020]/60">
          This address will be removed from your saved addresses. This action
          is only simulated in this frontend project.
        </p>

        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            onClick={onClose}
            className="rounded-xl border border-[#800020]/15 bg-white px-5 py-3 text-sm font-bold transition hover:border-[#D45060] hover:text-[#D45060]"
          >
            Keep Address
          </button>

          <button
            onClick={onConfirm}
            className="rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700"
          >
            Delete Address
          </button>
        </div>
      </div>
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