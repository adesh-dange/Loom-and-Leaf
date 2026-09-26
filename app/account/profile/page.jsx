"use client";

import Link from "next/link";
import { useState } from "react";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  const [profile, setProfile] = useState({
    firstName: "Adesh",
    lastName: "Dange",
    email: "adesh@example.com",
    phone: "+91 98765 43210",
    dateOfBirth: "2003-05-15",
    gender: "Prefer not to say",
  });

  const updateField = (field, value) => {
    setProfile((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSave = (event) => {
    event.preventDefault();

    setIsEditing(false);
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <main className="min-h-screen bg-[#F7ADAD]/20 text-[#800020]">
      {/* Success Toast */}
      {saved && (
        <div className="fixed right-5 top-5 z-50 flex items-center gap-3 rounded-2xl bg-[#800020] px-5 py-4 text-sm font-semibold text-white shadow-2xl">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
            ✓
          </span>
          Profile updated successfully.
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

            <span>Profile</span>
          </div>

          <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#D45060]">
            Personal Information
          </p>

          <h1 className="mt-2 text-4xl font-black tracking-tight md:text-5xl">
            My Profile
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-[#800020]/60 md:text-base">
            Manage your personal information and account details.
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
                  {profile.firstName.charAt(0)}
                  {profile.lastName.charAt(0)}
                </div>

                <div className="min-w-0">
                  <h2 className="truncate text-lg font-black">
                    {profile.firstName} {profile.lastName}
                  </h2>

                  <p className="mt-1 truncate text-xs text-[#800020]/50">
                    {profile.email}
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
                  active
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

            {/* Main Content */}
            <div className="space-y-7">
              {/* Profile Hero */}
              <section className="overflow-hidden rounded-[2rem] bg-[#800020] p-7 text-white shadow-xl md:p-9">
                <div className="flex flex-col items-center gap-6 sm:flex-row">
                  <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-4 border-[#F7ADAD]/40 bg-[#D45060] text-3xl font-black">
                    {profile.firstName.charAt(0)}
                    {profile.lastName.charAt(0)}
                  </div>

                  <div className="text-center sm:text-left">
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#F7ADAD]">
                      Account Profile
                    </p>

                    <h2 className="mt-2 text-3xl font-black">
                      {profile.firstName} {profile.lastName}
                    </h2>

                    <p className="mt-2 text-sm text-white/65">
                      {profile.email}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsEditing((current) => !current)}
                    className="rounded-full bg-[#F7ADAD] px-6 py-3 text-sm font-black text-[#800020] transition hover:bg-[#D45060] hover:text-white sm:ml-auto"
                  >
                    {isEditing ? "Cancel Editing" : "Edit Profile"}
                  </button>
                </div>
              </section>

              {/* Personal Details */}
              <form
                onSubmit={handleSave}
                className="rounded-[1.75rem] border border-[#800020]/10 bg-white p-6 shadow-sm md:p-8"
              >
                <div className="flex items-center justify-between border-b border-[#800020]/10 pb-5">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#D45060]">
                      Personal Details
                    </p>

                    <h2 className="mt-1 text-2xl font-black">
                      Basic Information
                    </h2>
                  </div>

                  {!isEditing && (
                    <span className="rounded-full bg-[#F7ADAD]/30 px-4 py-2 text-[10px] font-black text-[#800020]/60">
                      VIEW MODE
                    </span>
                  )}
                </div>

                <div className="mt-7 grid gap-5 sm:grid-cols-2">
                  <ProfileInput
                    label="First Name"
                    value={profile.firstName}
                    disabled={!isEditing}
                    required
                    onChange={(value) =>
                      updateField("firstName", value)
                    }
                  />

                  <ProfileInput
                    label="Last Name"
                    value={profile.lastName}
                    disabled={!isEditing}
                    required
                    onChange={(value) =>
                      updateField("lastName", value)
                    }
                  />

                  <ProfileInput
                    label="Email Address"
                    type="email"
                    value={profile.email}
                    disabled={!isEditing}
                    required
                    onChange={(value) => updateField("email", value)}
                  />

                  <ProfileInput
                    label="Phone Number"
                    type="tel"
                    value={profile.phone}
                    disabled={!isEditing}
                    onChange={(value) => updateField("phone", value)}
                  />

                  <ProfileInput
                    label="Date of Birth"
                    type="date"
                    value={profile.dateOfBirth}
                    disabled={!isEditing}
                    onChange={(value) =>
                      updateField("dateOfBirth", value)
                    }
                  />

                  <div>
                    <label className="text-xs font-bold text-[#800020]/70">
                      Gender
                    </label>

                    <select
                      value={profile.gender}
                      disabled={!isEditing}
                      onChange={(event) =>
                        updateField("gender", event.target.value)
                      }
                      className={`mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
                        isEditing
                          ? "border-[#800020]/10 bg-white focus:border-[#D45060]"
                          : "cursor-not-allowed border-[#800020]/5 bg-[#F7ADAD]/10 text-[#800020]/55"
                      }`}
                    >
                      <option>Prefer not to say</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                {isEditing && (
                  <div className="mt-8 flex flex-col-reverse gap-3 border-t border-[#800020]/10 pt-6 sm:flex-row sm:justify-end">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="rounded-xl border border-[#800020]/15 bg-white px-6 py-3 text-sm font-bold transition hover:border-[#D45060] hover:text-[#D45060]"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="rounded-xl bg-[#800020] px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#D45060]"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </form>

              {/* Verification */}
              <section className="rounded-[1.75rem] border border-[#800020]/10 bg-white p-6 shadow-sm md:p-8">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#D45060]">
                    Account Verification
                  </p>

                  <h2 className="mt-1 text-2xl font-black">
                    Contact Information
                  </h2>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <VerificationCard
                    icon="✉"
                    title="Email Address"
                    value={profile.email}
                  />

                  <VerificationCard
                    icon="☎"
                    title="Phone Number"
                    value={profile.phone}
                  />
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
                      Password & Account Security
                    </h2>

                    <p className="mt-1 text-xs leading-5 text-[#800020]/50">
                      Keep your account secure by reviewing your password and
                      account settings.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      alert("Password change flow coming soon.")
                    }
                    className="w-fit rounded-full border border-[#800020]/15 px-5 py-2.5 text-xs font-bold transition hover:border-[#D45060] hover:text-[#D45060]"
                  >
                    Change Password
                  </button>
                </div>
              </section>

              {/* Danger Zone */}
              <section className="rounded-[1.75rem] border border-red-200 bg-red-50 p-6 md:p-8">
                <p className="text-xs font-bold uppercase tracking-widest text-red-500">
                  Account Management
                </p>

                <h2 className="mt-1 text-xl font-black text-red-700">
                  Delete Account
                </h2>

                <p className="mt-2 max-w-2xl text-xs leading-5 text-red-600/70">
                  Account deletion is not connected to a real backend in this
                  frontend project. This section represents where the real
                  account management flow would be implemented.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    alert("Account deletion flow coming soon.")
                  }
                  className="mt-5 rounded-full border border-red-300 bg-white px-5 py-2.5 text-xs font-bold text-red-600 transition hover:bg-red-100"
                >
                  Delete Account
                </button>
              </section>

              {/* Back */}
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
    </main>
  );
}

function ProfileInput({
  label,
  value,
  onChange,
  type = "text",
  disabled = false,
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
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        className={`mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
          disabled
            ? "cursor-not-allowed border-[#800020]/5 bg-[#F7ADAD]/10 text-[#800020]/55"
            : "border-[#800020]/10 bg-white focus:border-[#D45060]"
        }`}
      />
    </label>
  );
}

function VerificationCard({ icon, title, value }) {
  return (
    <div className="rounded-2xl border border-[#800020]/10 bg-[#F7ADAD]/10 p-5">
      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-lg shadow-sm">
          {icon}
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold uppercase tracking-widest text-[#800020]/40">
            {title}
          </p>

          <p className="mt-1 truncate text-sm font-black">{value}</p>
        </div>

        <span className="shrink-0 rounded-full bg-green-50 px-3 py-1 text-[10px] font-black text-green-700">
          Verified
        </span>
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