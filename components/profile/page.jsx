"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const initialProfile = {
  firstName: "Adesh",
  lastName: "Dange",
  email: "adesh@example.com",
  phone: "+91 98765 43210",
  dateOfBirth: "2003-06-15",
  gender: "Prefer not to say",
};

export default function ProfilePage() {
  const [profile, setProfile] = useState(initialProfile);
  const [editing, setEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [toast, setToast] = useState("");

  const [passwords, setPasswords] = useState({
    current: "",
    newPassword: "",
    confirm: "",
  });

  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const saveProfile = (e) => {
    e.preventDefault();
    setEditing(false);
    showToast("Profile updated successfully.");
  };

  const changePassword = (e) => {
    e.preventDefault();

    if (
      !passwords.current ||
      !passwords.newPassword ||
      !passwords.confirm
    ) {
      showToast("Please complete all password fields.");
      return;
    }

    if (passwords.newPassword !== passwords.confirm) {
      showToast("New passwords do not match.");
      return;
    }

    setPasswords({
      current: "",
      newPassword: "",
      confirm: "",
    });

    setShowPasswordForm(false);
    showToast("Password changed successfully.");
  };

  const initials =
    `${profile.firstName.charAt(0)}${profile.lastName.charAt(0)}`.toUpperCase();

  return (
    <main className="min-h-screen bg-[#F7ADAD]/15 text-[#800020]">
      {/* HEADER */}
      <section className="border-b border-[#800020]/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <Link
              href="/account"
              className="transition hover:text-[#D45060]"
            >
              My Account
            </Link>

            <span>/</span>

            <span className="font-semibold text-[#800020]">
              Profile
            </span>
          </div>

          <div className="mt-7">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#D45060]">
              Personal information
            </p>

            <h1 className="mt-2 text-4xl font-bold">
              Profile
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-7 text-gray-500">
              Manage your personal information and account security.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          {/* SIDEBAR */}
          <aside className="h-fit rounded-[2rem] border border-[#800020]/10 bg-white p-4">
            <div className="mb-4 px-3 py-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#800020] text-xl font-bold text-white">
                {initials}
              </div>

              <h2 className="mt-4 font-bold">
                {profile.firstName} {profile.lastName}
              </h2>

              <p className="mt-1 truncate text-xs text-gray-400">
                {profile.email}
              </p>
            </div>

            <nav className="space-y-1">
              <Link
                href="/account"
                className="flex items-center rounded-xl px-4 py-3 text-sm font-semibold text-gray-500 transition hover:bg-[#F7ADAD]/20 hover:text-[#800020]"
              >
                Account Overview
              </Link>

              <Link
                href="/account/profile"
                className="flex items-center rounded-xl bg-[#800020] px-4 py-3 text-sm font-bold text-white"
              >
                Profile
              </Link>

              <Link
                href="/account/addresses"
                className="flex items-center rounded-xl px-4 py-3 text-sm font-semibold text-gray-500 transition hover:bg-[#F7ADAD]/20 hover:text-[#800020]"
              >
                Addresses
              </Link>

              <Link
                href="/account/payments"
                className="flex items-center rounded-xl px-4 py-3 text-sm font-semibold text-gray-500 transition hover:bg-[#F7ADAD]/20 hover:text-[#800020]"
              >
                Payments
              </Link>

              <Link
                href="/account/notifications"
                className="flex items-center rounded-xl px-4 py-3 text-sm font-semibold text-gray-500 transition hover:bg-[#F7ADAD]/20 hover:text-[#800020]"
              >
                Notifications
              </Link>
            </nav>
          </aside>

          {/* MAIN CONTENT */}
          <div className="space-y-6">
            {/* PROFILE CARD */}
            <motion.section
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-[2rem] border border-[#800020]/10 bg-white p-6 sm:p-8"
            >
              <div className="flex flex-col justify-between gap-5 border-b border-gray-100 pb-6 sm:flex-row sm:items-center">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D45060]">
                    Account details
                  </p>

                  <h2 className="mt-2 text-2xl font-bold">
                    Personal Information
                  </h2>

                  <p className="mt-1 text-sm text-gray-400">
                    Keep your profile information up to date.
                  </p>
                </div>

                {!editing && (
                  <button
                    type="button"
                    onClick={() => setEditing(true)}
                    className="rounded-full bg-[#800020] px-5 py-3 text-xs font-bold text-white transition hover:bg-[#D45060]"
                  >
                    Edit Profile
                  </button>
                )}
              </div>

              <form
                onSubmit={saveProfile}
                className="mt-7 grid gap-5 sm:grid-cols-2"
              >
                <div>
                  <label className="mb-2 block text-xs font-bold text-gray-500">
                    First Name
                  </label>

                  <input
                    name="firstName"
                    value={profile.firstName}
                    onChange={handleChange}
                    disabled={!editing}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:border-[#D45060] focus:bg-white disabled:cursor-not-allowed disabled:text-gray-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold text-gray-500">
                    Last Name
                  </label>

                  <input
                    name="lastName"
                    value={profile.lastName}
                    onChange={handleChange}
                    disabled={!editing}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:border-[#D45060] focus:bg-white disabled:cursor-not-allowed disabled:text-gray-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold text-gray-500">
                    Email Address
                  </label>

                  <input
                    name="email"
                    type="email"
                    value={profile.email}
                    onChange={handleChange}
                    disabled={!editing}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:border-[#D45060] focus:bg-white disabled:cursor-not-allowed disabled:text-gray-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold text-gray-500">
                    Phone Number
                  </label>

                  <input
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    disabled={!editing}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:border-[#D45060] focus:bg-white disabled:cursor-not-allowed disabled:text-gray-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold text-gray-500">
                    Date of Birth
                  </label>

                  <input
                    name="dateOfBirth"
                    type="date"
                    value={profile.dateOfBirth}
                    onChange={handleChange}
                    disabled={!editing}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:border-[#D45060] focus:bg-white disabled:cursor-not-allowed disabled:text-gray-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold text-gray-500">
                    Gender
                  </label>

                  <select
                    name="gender"
                    value={profile.gender}
                    onChange={handleChange}
                    disabled={!editing}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:border-[#D45060] focus:bg-white disabled:cursor-not-allowed disabled:text-gray-500"
                  >
                    <option>Prefer not to say</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>

                {editing && (
                  <div className="flex flex-col gap-3 border-t border-gray-100 pt-5 sm:col-span-2 sm:flex-row sm:justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        setProfile(initialProfile);
                        setEditing(false);
                      }}
                      className="rounded-full border border-[#800020]/15 px-6 py-3 text-xs font-bold transition hover:bg-[#F7ADAD]/20"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="rounded-full bg-[#800020] px-6 py-3 text-xs font-bold text-white transition hover:bg-[#D45060]"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </form>
            </motion.section>

            {/* EMAIL VERIFICATION */}
            <section className="rounded-[2rem] border border-[#800020]/10 bg-white p-6 sm:p-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600">
                    ✓
                  </div>

                  <div>
                    <h3 className="font-bold">
                      Email verified
                    </h3>

                    <p className="mt-1 text-sm text-gray-400">
                      Your email address has been successfully verified.
                    </p>
                  </div>
                </div>

                <span className="rounded-full bg-green-50 px-4 py-2 text-xs font-bold text-green-700">
                  Verified
                </span>
              </div>
            </section>

            {/* SECURITY */}
            <section className="rounded-[2rem] border border-[#800020]/10 bg-white p-6 sm:p-8">
              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D45060]">
                    Account security
                  </p>

                  <h2 className="mt-2 text-xl font-bold">
                    Password & Security
                  </h2>

                  <p className="mt-1 text-sm text-gray-400">
                    Protect your account with a strong password.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowPasswordForm((current) => !current)
                  }
                  className="rounded-full border border-[#800020]/15 px-5 py-3 text-xs font-bold transition hover:bg-[#F7ADAD]/20"
                >
                  {showPasswordForm
                    ? "Close"
                    : "Change Password"}
                </button>
              </div>

              {showPasswordForm && (
                <motion.form
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  onSubmit={changePassword}
                  className="mt-7 grid gap-5 border-t border-gray-100 pt-7"
                >
                  <div>
                    <label className="mb-2 block text-xs font-bold text-gray-500">
                      Current Password
                    </label>

                    <input
                      type="password"
                      value={passwords.current}
                      onChange={(e) =>
                        setPasswords({
                          ...passwords,
                          current: e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none focus:border-[#D45060] focus:bg-white"
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-xs font-bold text-gray-500">
                        New Password
                      </label>

                      <input
                        type="password"
                        value={passwords.newPassword}
                        onChange={(e) =>
                          setPasswords({
                            ...passwords,
                            newPassword: e.target.value,
                          })
                        }
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none focus:border-[#D45060] focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-bold text-gray-500">
                        Confirm New Password
                      </label>

                      <input
                        type="password"
                        value={passwords.confirm}
                        onChange={(e) =>
                          setPasswords({
                            ...passwords,
                            confirm: e.target.value,
                          })
                        }
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none focus:border-[#D45060] focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="rounded-full bg-[#800020] px-6 py-3 text-xs font-bold text-white transition hover:bg-[#D45060]"
                    >
                      Update Password
                    </button>
                  </div>
                </motion.form>
              )}

              {!showPasswordForm && (
                <div className="mt-6 flex items-center gap-3 rounded-2xl bg-[#F7ADAD]/15 p-4">
                  <div className="text-lg">🔒</div>

                  <div>
                    <p className="text-sm font-bold">
                      Password protected
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      Your password is securely stored.
                    </p>
                  </div>
                </div>
              )}
            </section>

            {/* DANGER ZONE */}
            <section className="rounded-[2rem] border border-red-100 bg-white p-6 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-500">
                Danger zone
              </p>

              <h2 className="mt-2 text-xl font-bold">
                Delete Account
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                Deleting your account is permanent in a real
                application. This frontend project only simulates
                the account-management experience.
              </p>

              <button
                type="button"
                onClick={() =>
                  showToast(
                    "Account deletion is disabled in this demo."
                  )
                }
                className="mt-5 rounded-full border border-red-200 px-5 py-3 text-xs font-bold text-red-500 transition hover:bg-red-50"
              >
                Delete Account
              </button>
            </section>
          </div>
        </div>
      </section>

      {/* TOAST */}
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 20, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 20, x: "-50%" }}
          className="fixed bottom-6 left-1/2 z-[100] rounded-full bg-[#800020] px-6 py-3 text-sm font-semibold text-white shadow-2xl"
        >
          {toast}
        </motion.div>
      )}
    </main>
  );
}