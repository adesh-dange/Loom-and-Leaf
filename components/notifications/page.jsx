"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const initialNotifications = [
  {
    id: 1,
    type: "order",
    title: "Order delivered",
    message:
      "Your order LL-2026-10482 has been delivered successfully.",
    time: "2 hours ago",
    date: "Today",
    unread: true,
  },
  {
    id: 2,
    type: "offer",
    title: "A special offer for you",
    message:
      "Get up to 40% off selected products during our latest collection sale.",
    time: "5 hours ago",
    date: "Today",
    unread: true,
  },
  {
    id: 3,
    type: "shipping",
    title: "Your order is on the way",
    message:
      "Your order LL-2026-10371 has been shipped and is moving toward you.",
    time: "Yesterday",
    date: "Yesterday",
    unread: true,
  },
  {
    id: 4,
    type: "wishlist",
    title: "Wishlist update",
    message:
      "One of the products in your wishlist is now available again.",
    time: "2 days ago",
    date: "2 days ago",
    unread: false,
  },
  {
    id: 5,
    type: "account",
    title: "Profile updated",
    message:
      "Your profile information was successfully updated.",
    time: "4 days ago",
    date: "4 days ago",
    unread: false,
  },
  {
    id: 6,
    type: "offer",
    title: "New arrivals are here",
    message:
      "Discover the latest products curated for the Loom & Leaf collection.",
    time: "1 week ago",
    date: "1 week ago",
    unread: false,
  },
];

const notificationTypes = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "order",
    label: "Orders",
  },
  {
    value: "shipping",
    label: "Shipping",
  },
  {
    value: "offer",
    label: "Offers",
  },
  {
    value: "wishlist",
    label: "Wishlist",
  },
  {
    value: "account",
    label: "Account",
  },
];

function NotificationIcon({ type }) {
  const icons = {
    order: "📦",
    shipping: "🚚",
    offer: "✦",
    wishlist: "♡",
    account: "◉",
  };

  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F7ADAD]/30 text-xl">
      {icons[type] || "•"}
    </div>
  );
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(
    initialNotifications
  );

  const [activeType, setActiveType] = useState("all");
  const [toast, setToast] = useState("");

  const [preferences, setPreferences] = useState({
    orderUpdates: true,
    shippingUpdates: true,
    offers: true,
    wishlistUpdates: true,
    accountUpdates: true,
  });

  const [channels, setChannels] = useState({
    email: true,
    push: true,
    sms: false,
  });

  const unreadCount = notifications.filter(
    (notification) => notification.unread
  ).length;

  const filteredNotifications = useMemo(() => {
    if (activeType === "all") {
      return notifications;
    }

    return notifications.filter(
      (notification) => notification.type === activeType
    );
  }, [activeType, notifications]);

  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2200);
  };

  const markAsRead = (id) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? { ...notification, unread: false }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        unread: false,
      }))
    );

    showToast("All notifications marked as read.");
  };

  const deleteNotification = (id) => {
    setNotifications((current) =>
      current.filter((notification) => notification.id !== id)
    );

    showToast("Notification removed.");
  };

  const clearAll = () => {
    setNotifications([]);
    showToast("All notifications cleared.");
  };

  const togglePreference = (key) => {
    setPreferences((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  const toggleChannel = (key) => {
    setChannels((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

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
              Notifications
            </span>
          </div>

          <div className="mt-7 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#D45060]">
                Stay updated
              </p>

              <h1 className="mt-2 text-4xl font-bold">
                Notifications
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-7 text-gray-500">
                Stay informed about your orders, offers, wishlist,
                and account activity.
              </p>
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllAsRead}
                className="w-fit rounded-full bg-[#800020] px-5 py-3 text-xs font-bold text-white transition hover:bg-[#D45060]"
              >
                Mark all as read
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          {/* SIDEBAR */}
          <aside className="h-fit rounded-[2rem] border border-[#800020]/10 bg-white p-4">
            <div className="mb-4 px-3 py-4">
              <p className="text-xs font-bold uppercase tracking-wider text-[#D45060]">
                Account
              </p>

              <h2 className="mt-2 text-lg font-bold">
                Settings
              </h2>
            </div>

            <nav className="space-y-1">
              <Link
                href="/account"
                className="block rounded-xl px-4 py-3 text-sm font-semibold text-gray-500 transition hover:bg-[#F7ADAD]/20 hover:text-[#800020]"
              >
                Account Overview
              </Link>

              <Link
                href="/account/profile"
                className="block rounded-xl px-4 py-3 text-sm font-semibold text-gray-500 transition hover:bg-[#F7ADAD]/20 hover:text-[#800020]"
              >
                Profile
              </Link>

              <Link
                href="/account/addresses"
                className="block rounded-xl px-4 py-3 text-sm font-semibold text-gray-500 transition hover:bg-[#F7ADAD]/20 hover:text-[#800020]"
              >
                Addresses
              </Link>

              <Link
                href="/account/payments"
                className="block rounded-xl px-4 py-3 text-sm font-semibold text-gray-500 transition hover:bg-[#F7ADAD]/20 hover:text-[#800020]"
              >
                Payments
              </Link>

              <Link
                href="/account/notifications"
                className="flex items-center justify-between rounded-xl bg-[#800020] px-4 py-3 text-sm font-bold text-white"
              >
                <span>Notifications</span>

                {unreadCount > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#D45060] px-1.5 text-[10px] text-white">
                    {unreadCount}
                  </span>
                )}
              </Link>
            </nav>
          </aside>

          {/* MAIN */}
          <div className="space-y-6">
            {/* NOTIFICATION LIST */}
            <section className="rounded-[2rem] border border-[#800020]/10 bg-white p-5 sm:p-7">
              <div className="flex flex-col justify-between gap-5 border-b border-gray-100 pb-6 sm:flex-row sm:items-center">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D45060]">
                    Activity
                  </p>

                  <h2 className="mt-2 text-2xl font-bold">
                    Your Notifications
                  </h2>

                  <p className="mt-1 text-sm text-gray-400">
                    {unreadCount > 0
                      ? `${unreadCount} unread notification${
                          unreadCount > 1 ? "s" : ""
                        }`
                      : "You're all caught up."}
                  </p>
                </div>

                {notifications.length > 0 && (
                  <button
                    type="button"
                    onClick={clearAll}
                    className="text-xs font-bold text-[#D45060] transition hover:text-[#800020]"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* FILTERS */}
              <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
                {notificationTypes.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setActiveType(type.value)}
                    className={`whitespace-nowrap rounded-full px-4 py-2.5 text-xs font-bold transition ${
                      activeType === type.value
                        ? "bg-[#800020] text-white"
                        : "bg-[#F7ADAD]/25 text-[#800020] hover:bg-[#F7ADAD]/50"
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>

              {/* LIST */}
              <div className="mt-6">
                {filteredNotifications.length > 0 ? (
                  <div className="divide-y divide-gray-100">
                    <AnimatePresence mode="popLayout">
                      {filteredNotifications.map(
                        (notification, index) => (
                          <motion.article
                            layout
                            key={notification.id}
                            initial={{
                              opacity: 0,
                              y: 10,
                            }}
                            animate={{
                              opacity: 1,
                              y: 0,
                            }}
                            exit={{
                              opacity: 0,
                              x: -20,
                            }}
                            transition={{
                              duration: 0.25,
                              delay: index * 0.03,
                            }}
                            className={`relative flex gap-4 py-5 first:pt-0 last:pb-0 ${
                              notification.unread
                                ? "bg-[#F7ADAD]/10"
                                : ""
                            }`}
                          >
                            <NotificationIcon
                              type={notification.type}
                            />

                            <div className="min-w-0 flex-1">
                              <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                                <div className="flex items-center gap-2">
                                  <h3 className="text-sm font-bold">
                                    {notification.title}
                                  </h3>

                                  {notification.unread && (
                                    <span className="h-2 w-2 rounded-full bg-[#D45060]" />
                                  )}
                                </div>

                                <span className="shrink-0 text-[11px] text-gray-400">
                                  {notification.time}
                                </span>
                              </div>

                              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                                {notification.message}
                              </p>

                              <div className="mt-3 flex flex-wrap items-center gap-4">
                                {notification.unread && (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      markAsRead(
                                        notification.id
                                      )
                                    }
                                    className="text-[11px] font-bold text-[#D45060]"
                                  >
                                    Mark as read
                                  </button>
                                )}

                                <button
                                  type="button"
                                  onClick={() =>
                                    deleteNotification(
                                      notification.id
                                    )
                                  }
                                  className="text-[11px] font-semibold text-gray-400 transition hover:text-red-500"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </motion.article>
                        )
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <div className="py-16 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F7ADAD]/30 text-2xl">
                      ✓
                    </div>

                    <h3 className="mt-5 text-lg font-bold">
                      No notifications
                    </h3>

                    <p className="mt-2 text-sm text-gray-400">
                      {notifications.length === 0
                        ? "You're all caught up for now."
                        : "There are no notifications in this category."}
                    </p>

                    {notifications.length > 0 &&
                      activeType !== "all" && (
                        <button
                          type="button"
                          onClick={() => setActiveType("all")}
                          className="mt-5 rounded-full bg-[#800020] px-5 py-3 text-xs font-bold text-white"
                        >
                          View All
                        </button>
                      )}
                  </div>
                )}
              </div>
            </section>

            {/* NOTIFICATION PREFERENCES */}
            <section className="rounded-[2rem] border border-[#800020]/10 bg-white p-6 sm:p-8">
              <div className="border-b border-gray-100 pb-6">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D45060]">
                  Preferences
                </p>

                <h2 className="mt-2 text-xl font-bold">
                  Notification Preferences
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                  Choose which updates you want to receive.
                </p>
              </div>

              <div className="mt-2 divide-y divide-gray-100">
                {[
                  {
                    key: "orderUpdates",
                    title: "Order Updates",
                    description:
                      "Get updates when your order is confirmed, packed, or delivered.",
                  },
                  {
                    key: "shippingUpdates",
                    title: "Shipping Updates",
                    description:
                      "Receive tracking and delivery notifications.",
                  },
                  {
                    key: "offers",
                    title: "Offers & Promotions",
                    description:
                      "Stay informed about discounts, deals, and new collections.",
                  },
                  {
                    key: "wishlistUpdates",
                    title: "Wishlist Updates",
                    description:
                      "Know when wishlist products are back in stock or on sale.",
                  },
                  {
                    key: "accountUpdates",
                    title: "Account Activity",
                    description:
                      "Receive important security and account notifications.",
                  },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between gap-5 py-5"
                  >
                    <div>
                      <h3 className="text-sm font-bold">
                        {item.title}
                      </h3>

                      <p className="mt-1 max-w-xl text-xs leading-5 text-gray-400">
                        {item.description}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        togglePreference(item.key)
                      }
                      aria-label={`Toggle ${item.title}`}
                      className={`relative h-7 w-12 shrink-0 rounded-full transition ${
                        preferences[item.key]
                          ? "bg-[#800020]"
                          : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition ${
                          preferences[item.key]
                            ? "left-6"
                            : "left-1"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* DELIVERY CHANNELS */}
            <section className="rounded-[2rem] border border-[#800020]/10 bg-white p-6 sm:p-8">
              <div className="border-b border-gray-100 pb-6">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D45060]">
                  Delivery channels
                </p>

                <h2 className="mt-2 text-xl font-bold">
                  How should we notify you?
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                  Select the channels you want to use for notifications.
                </p>
              </div>

              <div className="mt-2 divide-y divide-gray-100">
                {[
                  {
                    key: "email",
                    title: "Email",
                    description:
                      "Receive notifications at your registered email address.",
                    icon: "✉",
                  },
                  {
                    key: "push",
                    title: "Push Notifications",
                    description:
                      "Receive real-time notifications on supported devices.",
                    icon: "◉",
                  },
                  {
                    key: "sms",
                    title: "SMS",
                    description:
                      "Receive important updates through text messages.",
                    icon: "▣",
                  },
                ].map((channel) => (
                  <div
                    key={channel.key}
                    className="flex items-center justify-between gap-5 py-5"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F7ADAD]/25 text-lg">
                        {channel.icon}
                      </div>

                      <div>
                        <h3 className="text-sm font-bold">
                          {channel.title}
                        </h3>

                        <p className="mt-1 text-xs text-gray-400">
                          {channel.description}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        toggleChannel(channel.key)
                      }
                      className={`relative h-7 w-12 shrink-0 rounded-full transition ${
                        channels[channel.key]
                          ? "bg-[#800020]"
                          : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition ${
                          channels[channel.key]
                            ? "left-6"
                            : "left-1"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* PRIVACY INFO */}
            <section className="rounded-[2rem] bg-[#800020] p-6 text-white sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-lg">
                  🔒
                </div>

                <div>
                  <h2 className="font-bold">
                    Your notification privacy
                  </h2>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-white/60">
                    You control which promotional and account
                    notifications you receive. Important service
                    notifications related to your orders may still
                    be shown when necessary.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>

      {/* TOAST */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
              x: "-50%",
            }}
            animate={{
              opacity: 1,
              y: 0,
              x: "-50%",
            }}
            exit={{
              opacity: 0,
              y: 20,
              x: "-50%",
            }}
            className="fixed bottom-6 left-1/2 z-[100] rounded-full bg-[#800020] px-6 py-3 text-sm font-semibold text-white shadow-2xl"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}