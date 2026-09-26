"use client";

import Link from "next/link";
import { useState } from "react";

const initialNotifications = [
  {
    id: 1,
    type: "order",
    title: "Order Delivered",
    message:
      "Your order LL-2026-10482 has been delivered successfully.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    type: "offer",
    title: "Exclusive Offer",
    message:
      "Enjoy 10% off your next purchase with code WELCOME10.",
    time: "Yesterday",
    read: false,
  },
  {
    id: 3,
    type: "wishlist",
    title: "Price Drop",
    message:
      "An item from your wishlist is now available at a lower price.",
    time: "2 days ago",
    read: true,
  },
  {
    id: 4,
    type: "shipping",
    title: "Order Shipped",
    message:
      "Your order LL-2026-10371 is on its way.",
    time: "3 days ago",
    read: true,
  },
  {
    id: 5,
    type: "account",
    title: "Profile Updated",
    message:
      "Your account information was successfully updated.",
    time: "5 days ago",
    read: true,
  },
];

const initialPreferences = {
  orderUpdates: true,
  shippingUpdates: true,
  promotionalOffers: true,
  wishlistAlerts: true,
  priceDropAlerts: true,
  accountActivity: true,
  emailNotifications: true,
  pushNotifications: true,
};

export default function NotificationsPage() {
  const [notifications, setNotifications] =
    useState(initialNotifications);

  const [preferences, setPreferences] =
    useState(initialPreferences);

  const [saved, setSaved] = useState(false);

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const markAsRead = (id) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications((current) =>
      current.filter((notification) => notification.id !== id)
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const togglePreference = (key) => {
    setPreferences((current) => ({
      ...current,
      [key]: !current[key],
    }));

    setSaved(false);
  };

  const savePreferences = () => {
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
          Notification preferences saved.
        </div>
      )}

      {/* Header */}
      <section className="border-b border-[#800020]/10 bg-white/70 px-5 py-10 backdrop-blur-xl md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-5 flex flex-wrap items-center gap-2 text-sm text-[#800020]/60">
            <Link
              href="/"
              className="transition hover:text-[#D45060]"
            >
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

            <span>Notifications</span>
          </div>

          <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#D45060]">
            Stay Updated
          </p>

          <h1 className="mt-2 text-4xl font-black tracking-tight md:text-5xl">
            Notifications
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-[#800020]/60 md:text-base">
            Stay informed about your orders, offers, wishlist activity and
            account updates.
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
                />

                <AccountNavItem
                  href="/account/notifications"
                  icon="♢"
                  label="Notifications"
                  active
                  badge={unreadCount}
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
              {/* Notification Hero */}
              <section className="overflow-hidden rounded-[2rem] bg-[#800020] p-7 text-white shadow-xl md:p-9">
                <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#F7ADAD]">
                      Notification Center
                    </p>

                    <h2 className="mt-2 text-3xl font-black">
                      Never Miss an Update
                    </h2>

                    <p className="mt-3 max-w-xl text-sm leading-6 text-white/65">
                      Get important updates about your purchases, deliveries,
                      offers and account activity.
                    </p>
                  </div>

                  <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-3xl backdrop-blur-xl">
                    ♢

                    {unreadCount > 0 && (
                      <span className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#D45060] text-[10px] font-black text-white">
                        {unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </section>

              {/* Notifications */}
              <section className="rounded-[1.75rem] border border-[#800020]/10 bg-white p-6 shadow-sm md:p-8">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#D45060]">
                      Recent Activity
                    </p>

                    <h2 className="mt-1 text-2xl font-black">
                      Your Notifications
                    </h2>

                    <p className="mt-1 text-xs text-[#800020]/50">
                      {unreadCount > 0
                        ? `${unreadCount} unread ${
                            unreadCount === 1
                              ? "notification"
                              : "notifications"
                          }`
                        : "You're all caught up"}
                    </p>
                  </div>

                  {notifications.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllAsRead}
                          className="rounded-full border border-[#800020]/15 bg-white px-4 py-2.5 text-[10px] font-bold transition hover:border-[#D45060] hover:text-[#D45060]"
                        >
                          Mark All Read
                        </button>
                      )}

                      <button
                        onClick={clearNotifications}
                        className="rounded-full border border-red-200 bg-white px-4 py-2.5 text-[10px] font-bold text-red-600 transition hover:bg-red-50"
                      >
                        Clear All
                      </button>
                    </div>
                  )}
                </div>

                <div className="mt-7">
                  {notifications.length === 0 ? (
                    <EmptyNotifications />
                  ) : (
                    <div className="space-y-3">
                      {notifications.map((notification) => (
                        <NotificationCard
                          key={notification.id}
                          notification={notification}
                          onRead={markAsRead}
                          onDelete={deleteNotification}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </section>

              {/* Preferences */}
              <section className="rounded-[1.75rem] border border-[#800020]/10 bg-white p-6 shadow-sm md:p-8">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#D45060]">
                    Notification Preferences
                  </p>

                  <h2 className="mt-1 text-2xl font-black">
                    Choose What You Receive
                  </h2>

                  <p className="mt-2 text-xs leading-5 text-[#800020]/50">
                    Control which notifications appear in your Loom & Leaf
                    account.
                  </p>
                </div>

                <div className="mt-7 divide-y divide-[#800020]/10">
                  <PreferenceGroup
                    title="Order Updates"
                    description="Get updates when your order is confirmed, processed or delivered."
                  >
                    <Toggle
                      enabled={preferences.orderUpdates}
                      onChange={() =>
                        togglePreference("orderUpdates")
                      }
                    />
                  </PreferenceGroup>

                  <PreferenceGroup
                    title="Shipping Updates"
                    description="Receive delivery and shipment tracking updates."
                  >
                    <Toggle
                      enabled={preferences.shippingUpdates}
                      onChange={() =>
                        togglePreference("shippingUpdates")
                      }
                    />
                  </PreferenceGroup>

                  <PreferenceGroup
                    title="Promotional Offers"
                    description="Receive exclusive offers, discounts and seasonal promotions."
                  >
                    <Toggle
                      enabled={preferences.promotionalOffers}
                      onChange={() =>
                        togglePreference("promotionalOffers")
                      }
                    />
                  </PreferenceGroup>

                  <PreferenceGroup
                    title="Wishlist Alerts"
                    description="Get notified about changes related to products saved to your wishlist."
                  >
                    <Toggle
                      enabled={preferences.wishlistAlerts}
                      onChange={() =>
                        togglePreference("wishlistAlerts")
                      }
                    />
                  </PreferenceGroup>

                  <PreferenceGroup
                    title="Price Drop Alerts"
                    description="Know when a saved product becomes available at a lower price."
                  >
                    <Toggle
                      enabled={preferences.priceDropAlerts}
                      onChange={() =>
                        togglePreference("priceDropAlerts")
                      }
                    />
                  </PreferenceGroup>

                  <PreferenceGroup
                    title="Account Activity"
                    description="Receive important updates about your account and profile."
                  >
                    <Toggle
                      enabled={preferences.accountActivity}
                      onChange={() =>
                        togglePreference("accountActivity")
                      }
                    />
                  </PreferenceGroup>
                </div>

                <div className="mt-7 flex justify-end border-t border-[#800020]/10 pt-6">
                  <button
                    onClick={savePreferences}
                    className="rounded-xl bg-[#800020] px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#D45060]"
                  >
                    Save Preferences
                  </button>
                </div>
              </section>

              {/* Delivery Channels */}
              <section className="rounded-[1.75rem] border border-[#800020]/10 bg-white p-6 shadow-sm md:p-8">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#D45060]">
                    Delivery Channels
                  </p>

                  <h2 className="mt-1 text-2xl font-black">
                    How Should We Notify You?
                  </h2>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <ChannelCard
                    icon="✉"
                    title="Email Notifications"
                    description="Receive updates in your email inbox."
                    enabled={preferences.emailNotifications}
                    onChange={() =>
                      togglePreference("emailNotifications")
                    }
                  />

                  <ChannelCard
                    icon="♢"
                    title="Push Notifications"
                    description="Receive notifications directly on your device."
                    enabled={preferences.pushNotifications}
                    onChange={() =>
                      togglePreference("pushNotifications")
                    }
                  />
                </div>
              </section>

              {/* Privacy */}
              <section className="rounded-[1.75rem] border border-[#800020]/10 bg-white p-6 shadow-sm md:p-8">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F7ADAD]/35 text-xl">
                    🔒
                  </div>

                  <div className="flex-1">
                    <p className="text-xs font-bold uppercase tracking-widest text-[#D45060]">
                      Privacy
                    </p>

                    <h2 className="mt-1 text-xl font-black">
                      Notification Privacy
                    </h2>

                    <p className="mt-2 text-xs leading-5 text-[#800020]/50">
                      Notification preferences are simulated locally in this
                      frontend project. No real notification service is
                      connected.
                    </p>
                  </div>
                </div>
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

function NotificationCard({
  notification,
  onRead,
  onDelete,
}) {
  const notificationStyles = {
    order: {
      icon: "✓",
      background: "bg-green-50",
      color: "text-green-700",
    },
    offer: {
      icon: "%",
      background: "bg-[#F7ADAD]/30",
      color: "text-[#D45060]",
    },
    wishlist: {
      icon: "♡",
      background: "bg-[#F7ADAD]/30",
      color: "text-[#800020]",
    },
    shipping: {
      icon: "→",
      background: "bg-blue-50",
      color: "text-blue-700",
    },
    account: {
      icon: "◉",
      background: "bg-purple-50",
      color: "text-purple-700",
    },
  };

  const style =
    notificationStyles[notification.type] ||
    notificationStyles.account;

  return (
    <div
      className={`group rounded-2xl border p-4 transition ${
        notification.read
          ? "border-[#800020]/10 bg-white"
          : "border-[#D45060]/25 bg-[#F7ADAD]/10"
      }`}
    >
      <div className="flex gap-4">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${style.background} ${style.color} text-lg font-black`}
        >
          {style.icon}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col justify-between gap-2 sm:flex-row">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-black">
                {notification.title}
              </h3>

              {!notification.read && (
                <span className="h-2 w-2 rounded-full bg-[#D45060]" />
              )}
            </div>

            <span className="text-[10px] font-semibold text-[#800020]/40">
              {notification.time}
            </span>
          </div>

          <p className="mt-2 text-xs leading-5 text-[#800020]/55">
            {notification.message}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {!notification.read && (
              <button
                onClick={() => onRead(notification.id)}
                className="rounded-full border border-[#800020]/15 bg-white px-3 py-1.5 text-[10px] font-bold transition hover:border-[#D45060] hover:text-[#D45060]"
              >
                Mark as Read
              </button>
            )}

            <button
              onClick={() => onDelete(notification.id)}
              className="rounded-full border border-red-200 bg-white px-3 py-1.5 text-[10px] font-bold text-red-600 transition hover:bg-red-50"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PreferenceGroup({
  title,
  description,
  children,
}) {
  return (
    <div className="flex items-center justify-between gap-5 py-5 first:pt-0 last:pb-0">
      <div>
        <h3 className="text-sm font-black">{title}</h3>

        <p className="mt-1 max-w-2xl text-xs leading-5 text-[#800020]/50">
          {description}
        </p>
      </div>

      {children}
    </div>
  );
}

function ChannelCard({
  icon,
  title,
  description,
  enabled,
  onChange,
}) {
  return (
    <div className="rounded-2xl border border-[#800020]/10 bg-[#F7ADAD]/10 p-5">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-lg shadow-sm">
          {icon}
        </div>

        <div className="flex-1">
          <h3 className="text-sm font-black">{title}</h3>

          <p className="mt-1 text-xs leading-5 text-[#800020]/50">
            {description}
          </p>
        </div>

        <Toggle enabled={enabled} onChange={onChange} />
      </div>
    </div>
  );
}

function Toggle({ enabled, onChange }) {
  return (
    <button
      type="button"
      onClick={onChange}
      aria-label={enabled ? "Disable notification" : "Enable notification"}
      aria-pressed={enabled}
      className={`relative h-7 w-12 shrink-0 rounded-full transition ${
        enabled ? "bg-[#800020]" : "bg-[#800020]/15"
      }`}
    >
      <span
        className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition ${
          enabled ? "left-6" : "left-1"
        }`}
      />
    </button>
  );
}

function EmptyNotifications() {
  return (
    <div className="rounded-2xl border border-dashed border-[#800020]/20 bg-[#F7ADAD]/10 px-6 py-12 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F7ADAD]/35 text-2xl">
        ♢
      </div>

      <h3 className="mt-5 text-xl font-black">
        You're all caught up
      </h3>

      <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-[#800020]/50">
        You don't have any notifications right now. New order updates,
        offers and account activity will appear here.
      </p>

      <Link
        href="/shop"
        className="mt-5 inline-flex rounded-full bg-[#800020] px-6 py-3 text-xs font-bold text-white transition hover:bg-[#D45060]"
      >
        Continue Shopping
      </Link>
    </div>
  );
}

function AccountNavItem({
  href,
  icon,
  label,
  active = false,
  badge,
}) {
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

      <span className="flex-1">{label}</span>

      {badge > 0 && (
        <span
          className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[9px] font-black ${
            active
              ? "bg-[#D45060] text-white"
              : "bg-[#F7ADAD] text-[#800020]"
          }`}
        >
          {badge}
        </span>
      )}
    </Link>
  );
}