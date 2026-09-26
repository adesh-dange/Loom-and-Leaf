"use client";

import Link from "next/link";
import { useState } from "react";

const accountMenu = [
  {
    title: "Profile",
    description: "Personal information and preferences",
    href: "/account/profile",
    icon: "◉",
  },
  {
    title: "Addresses",
    description: "Manage your delivery addresses",
    href: "/account/addresses",
    icon: "⌖",
  },
  {
    title: "Payments",
    description: "Saved payment methods",
    href: "/account/payments",
    icon: "▣",
  },
  {
    title: "Notifications",
    description: "Manage alerts and updates",
    href: "/account/notifications",
    icon: "♢",
  },
];

const recentOrders = [
  {
    id: "LL-2026-10482",
    date: "26 Sep 2026",
    status: "Delivered",
    total: 2897,
    items: 2,
  },
  {
    id: "LL-2026-10371",
    date: "21 Sep 2026",
    status: "Shipped",
    total: 3499,
    items: 1,
  },
  {
    id: "LL-2026-10196",
    date: "12 Sep 2026",
    status: "Processing",
    total: 1298,
    items: 1,
  },
];

export default function AccountPage() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogout = () => {
    setShowLogoutModal(false);
    setMessage("You have been logged out successfully.");

    setTimeout(() => {
      setMessage("");
    }, 2500);
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
      <section className="border-b border-[#800020]/10 bg-white/70 px-5 py-12 backdrop-blur-xl md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-5 flex items-center gap-2 text-sm text-[#800020]/60">
            <Link href="/" className="transition hover:text-[#D45060]">
              Home
            </Link>

            <span>/</span>

            <span>Account</span>
          </div>

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-2 text-sm font-bold uppercase tracking-[0.25em] text-[#D45060]">
                My Space
              </p>

              <h1 className="text-4xl font-black tracking-tight md:text-6xl">
                My Account
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#800020]/65 md:text-base">
                Manage your profile, orders, addresses, payments and shopping
                preferences from one place.
              </p>
            </div>

            <button
              onClick={() => setShowLogoutModal(true)}
              className="w-fit rounded-full border border-[#800020]/15 bg-white px-6 py-3 text-sm font-bold transition hover:border-red-300 hover:text-red-600"
            >
              Log Out
            </button>
          </div>
        </div>
      </section>

      {/* Account Content */}
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
                  active
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
              {/* Welcome */}
              <section className="overflow-hidden rounded-[2rem] bg-[#800020] p-7 text-white shadow-xl md:p-9">
                <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#F7ADAD]">
                      Welcome back
                    </p>

                    <h2 className="mt-2 text-3xl font-black md:text-4xl">
                      Hello, Adesh.
                    </h2>

                    <p className="mt-3 max-w-xl text-sm leading-6 text-white/65">
                      Everything you need to manage your Loom & Leaf shopping
                      experience is right here.
                    </p>
                  </div>

                  <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-4xl backdrop-blur-xl">
                    ♡
                  </div>
                </div>
              </section>

              {/* Quick Stats */}
              <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <AccountStat
                  value="3"
                  label="Total Orders"
                  href="/orders"
                />

                <AccountStat
                  value="1"
                  label="Active Order"
                  href="/orders"
                />

                <AccountStat
                  value="4"
                  label="Wishlist Items"
                  href="/wishlist"
                />

                <AccountStat
                  value="2"
                  label="Saved Addresses"
                  href="/account/addresses"
                />
              </section>

              {/* Account Settings */}
              <section>
                <div className="mb-5">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#D45060]">
                    Account Settings
                  </p>

                  <h2 className="mt-1 text-2xl font-black">
                    Manage Your Account
                  </h2>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {accountMenu.map((item) => (
                    <AccountMenuCard key={item.href} item={item} />
                  ))}
                </div>
              </section>

              {/* Recent Orders */}
              <section className="rounded-[1.75rem] border border-[#800020]/10 bg-white p-6 shadow-sm md:p-7">
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#D45060]">
                      Purchase History
                    </p>

                    <h2 className="mt-1 text-2xl font-black">
                      Recent Orders
                    </h2>
                  </div>

                  <Link
                    href="/orders"
                    className="text-xs font-bold text-[#D45060] transition hover:text-[#800020]"
                  >
                    View All Orders →
                  </Link>
                </div>

                <div className="mt-6 overflow-hidden rounded-2xl border border-[#800020]/10">
                  <div className="hidden grid-cols-[1.4fr_1fr_1fr_1fr_auto] gap-4 bg-[#F7ADAD]/15 px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-[#800020]/45 md:grid">
                    <span>Order</span>
                    <span>Date</span>
                    <span>Status</span>
                    <span>Total</span>
                    <span />
                  </div>

                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="grid gap-3 border-t border-[#800020]/10 px-5 py-5 first:border-t-0 md:grid-cols-[1.4fr_1fr_1fr_1fr_auto] md:items-center md:gap-4"
                    >
                      <div>
                        <p className="text-sm font-black">{order.id}</p>
                        <p className="mt-1 text-xs text-[#800020]/45">
                          {order.items}{" "}
                          {order.items === 1 ? "item" : "items"}
                        </p>
                      </div>

                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#800020]/35 md:hidden">
                          Date
                        </p>
                        <p className="mt-1 text-xs font-semibold md:mt-0">
                          {order.date}
                        </p>
                      </div>

                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#800020]/35 md:hidden">
                          Status
                        </p>
                        <span
                          className={`mt-1 inline-flex rounded-full px-3 py-1 text-[10px] font-black md:mt-0 ${
                            order.status === "Delivered"
                              ? "bg-green-50 text-green-700"
                              : order.status === "Shipped"
                              ? "bg-blue-50 text-blue-700"
                              : "bg-[#F7ADAD]/40 text-[#800020]"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>

                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#800020]/35 md:hidden">
                          Total
                        </p>
                        <p className="mt-1 text-sm font-black md:mt-0">
                          ₹{order.total.toLocaleString("en-IN")}
                        </p>
                      </div>

                      <Link
                        href={`/orders/${order.id}`}
                        className="w-fit rounded-full border border-[#800020]/15 px-4 py-2 text-[10px] font-bold transition hover:border-[#D45060] hover:text-[#D45060]"
                      >
                        Details
                      </Link>
                    </div>
                  ))}
                </div>
              </section>

              {/* Shopping Shortcuts */}
              <section>
                <div className="mb-5">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#D45060]">
                    Quick Access
                  </p>

                  <h2 className="mt-1 text-2xl font-black">
                    Continue Shopping
                  </h2>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <QuickCard
                    href="/wishlist"
                    icon="♡"
                    title="Wishlist"
                    text="View your saved favorites."
                  />

                  <QuickCard
                    href="/deals"
                    icon="%"
                    title="Deals"
                    text="Explore current offers."
                  />

                  <QuickCard
                    href="/shop"
                    icon="⌕"
                    title="Explore Shop"
                    text="Discover something new."
                  />
                </div>
              </section>

              {/* Account Notice */}
              <section className="rounded-[1.75rem] border border-[#800020]/10 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F7ADAD]/35 text-lg">
                    🔒
                  </div>

                  <div className="flex-1">
                    <h3 className="text-sm font-black">
                      Your Account & Privacy
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-[#800020]/55">
                      Manage your personal information and account preferences
                      from the settings above.
                    </p>
                  </div>

                  <Link
                    href="/account/profile"
                    className="w-fit rounded-full border border-[#800020]/15 px-5 py-2.5 text-xs font-bold transition hover:border-[#D45060] hover:text-[#D45060]"
                  >
                    Manage Profile
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>

      {/* Logout Modal */}
      {showLogoutModal && (
        <LogoutModal
          onClose={() => setShowLogoutModal(false)}
          onConfirm={handleLogout}
        />
      )}
    </main>
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

function AccountStat({ value, label, href }) {
  return (
    <Link
      href={href}
      className="rounded-[1.5rem] border border-[#800020]/10 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <p className="text-3xl font-black">{value}</p>

      <p className="mt-1 text-xs font-semibold text-[#800020]/50">
        {label}
      </p>

      <span className="mt-4 block text-[10px] font-bold text-[#D45060]">
        View →
      </span>
    </Link>
  );
}

function AccountMenuCard({ item }) {
  return (
    <Link
      href={item.href}
      className="group rounded-[1.5rem] border border-[#800020]/10 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#D45060]/30 hover:shadow-lg"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F7ADAD]/35 text-lg font-bold transition group-hover:bg-[#800020] group-hover:text-white">
          {item.icon}
        </div>

        <div className="flex-1">
          <h3 className="text-base font-black transition group-hover:text-[#D45060]">
            {item.title}
          </h3>

          <p className="mt-1 text-xs leading-5 text-[#800020]/50">
            {item.description}
          </p>

          <span className="mt-4 block text-[10px] font-bold text-[#D45060]">
            Manage →
          </span>
        </div>
      </div>
    </Link>
  );
}

function QuickCard({ href, icon, title, text }) {
  return (
    <Link
      href={href}
      className="group rounded-[1.5rem] border border-[#800020]/10 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F7ADAD]/35 text-lg font-black transition group-hover:bg-[#800020] group-hover:text-white">
        {icon}
      </div>

      <h3 className="mt-4 text-base font-black">{title}</h3>

      <p className="mt-1 text-xs leading-5 text-[#800020]/50">{text}</p>

      <span className="mt-4 block text-[10px] font-bold text-[#D45060]">
        Explore →
      </span>
    </Link>
  );
}

function LogoutModal({ onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#800020]/40 px-5 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-[2rem] bg-white p-7 shadow-2xl">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F7ADAD]/35 text-2xl">
          ⇥
        </div>

        <h2 className="mt-5 text-2xl font-black">Log out?</h2>

        <p className="mt-3 text-sm leading-6 text-[#800020]/60">
          Are you sure you want to log out of your Loom & Leaf account?
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row-reverse">
          <button
            onClick={onConfirm}
            className="rounded-xl bg-[#800020] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#D45060]"
          >
            Yes, Log Out
          </button>

          <button
            onClick={onClose}
            className="rounded-xl border border-[#800020]/15 bg-white px-5 py-3 text-sm font-bold transition hover:border-[#D45060] hover:text-[#D45060]"
          >
            Stay Logged In
          </button>
        </div>
      </div>
    </div>
  );
}