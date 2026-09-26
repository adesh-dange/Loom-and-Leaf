"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const modalConfig = {
  success: {
    title: "Success",
    message: "Your action has been completed successfully.",
    icon: "✓",
    iconClass: "bg-green-50 text-green-600",
  },
  error: {
    title: "Something went wrong",
    message: "We couldn't complete your request. Please try again.",
    icon: "!",
    iconClass: "bg-red-50 text-red-500",
  },
  warning: {
    title: "Are you sure?",
    message: "This action may affect your account or current data.",
    icon: "!",
    iconClass: "bg-[#F7ADAD]/30 text-[#800020]",
  },
  info: {
    title: "Information",
    message: "Here is some important information for you.",
    icon: "i",
    iconClass: "bg-[#F7ADAD]/30 text-[#800020]",
  },
};

export default function ModalsPage() {
  const [activeModal, setActiveModal] = useState(null);
  const [customModal, setCustomModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [toast, setToast] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2200);
  };

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setActiveModal(null);
        setCustomModal(false);
        setShowDeleteModal(false);
        setShowImageModal(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleCustomSubmit = (event) => {
    event.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      showToast("Please complete all fields.");
      return;
    }

    setCustomModal(false);

    setFormData({
      name: "",
      email: "",
    });

    showToast("Information submitted successfully.");
  };

  const handleDelete = () => {
    setShowDeleteModal(false);
    showToast("Demo action completed.");
  };

  const currentModal = activeModal
    ? modalConfig[activeModal]
    : null;

  return (
    <main className="min-h-screen bg-[#F7ADAD]/15 text-[#800020]">
      {/* HEADER */}
      <section className="border-b border-[#800020]/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#D45060]">
            Loom & Leaf UI
          </p>

          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
            Modals
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-500">
            Reusable modal patterns for confirmations, alerts,
            forms, product previews, and important user actions.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <div className="grid gap-6 md:grid-cols-2">
          {/* STATUS MODALS */}
          <section className="rounded-[2rem] border border-[#800020]/10 bg-white p-6 sm:p-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D45060]">
                Feedback
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                Status Modals
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-400">
                Display success, error, warning, and informational
                feedback.
              </p>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setActiveModal("success")}
                className="rounded-xl bg-[#800020] px-4 py-3 text-xs font-bold text-white transition hover:bg-[#D45060]"
              >
                Success
              </button>

              <button
                type="button"
                onClick={() => setActiveModal("error")}
                className="rounded-xl border border-[#800020]/15 px-4 py-3 text-xs font-bold transition hover:bg-[#F7ADAD]/20"
              >
                Error
              </button>

              <button
                type="button"
                onClick={() => setActiveModal("warning")}
                className="rounded-xl border border-[#800020]/15 px-4 py-3 text-xs font-bold transition hover:bg-[#F7ADAD]/20"
              >
                Warning
              </button>

              <button
                type="button"
                onClick={() => setActiveModal("info")}
                className="rounded-xl border border-[#800020]/15 px-4 py-3 text-xs font-bold transition hover:bg-[#F7ADAD]/20"
              >
                Information
              </button>
            </div>
          </section>

          {/* ACTION MODALS */}
          <section className="rounded-[2rem] border border-[#800020]/10 bg-white p-6 sm:p-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D45060]">
                Actions
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                Action Modals
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-400">
                Reusable confirmation and interaction patterns.
              </p>
            </div>

            <div className="mt-7 grid gap-3">
              <button
                type="button"
                onClick={() => setShowDeleteModal(true)}
                className="rounded-xl border border-red-200 px-4 py-3 text-xs font-bold text-red-500 transition hover:bg-red-50"
              >
                Delete Confirmation
              </button>

              <button
                type="button"
                onClick={() => setCustomModal(true)}
                className="rounded-xl bg-[#800020] px-4 py-3 text-xs font-bold text-white transition hover:bg-[#D45060]"
              >
                Open Form Modal
              </button>

              <button
                type="button"
                onClick={() => setShowImageModal(true)}
                className="rounded-xl border border-[#800020]/15 px-4 py-3 text-xs font-bold transition hover:bg-[#F7ADAD]/20"
              >
                Product Preview
              </button>
            </div>
          </section>
        </div>

        {/* DESIGN NOTES */}
        <section className="mt-6 rounded-[2rem] bg-[#800020] p-7 text-white sm:p-9">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F7ADAD]">
                Backdrop
              </p>

              <h3 className="mt-2 text-lg font-bold">
                Focused interaction
              </h3>

              <p className="mt-2 text-sm leading-6 text-white/55">
                A dark translucent backdrop keeps attention on the
                active modal.
              </p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F7ADAD]">
                Motion
              </p>

              <h3 className="mt-2 text-lg font-bold">
                Smooth transitions
              </h3>

              <p className="mt-2 text-sm leading-6 text-white/55">
                Modals animate into view and can be dismissed with
                the close button or Escape key.
              </p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F7ADAD]">
                Responsive
              </p>

              <h3 className="mt-2 text-lg font-bold">
                Mobile friendly
              </h3>

              <p className="mt-2 text-sm leading-6 text-white/55">
                Modal content adapts to smaller screens without
                changing the interaction pattern.
              </p>
            </div>
          </div>
        </section>
      </section>

      {/* STATUS MODAL */}
      <AnimatePresence>
        {currentModal && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#800020]/70 p-5 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              className="w-full max-w-md rounded-[2rem] bg-white p-7 shadow-2xl sm:p-9"
              initial={{
                opacity: 0,
                y: 25,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 20,
                scale: 0.95,
              }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-50 text-xl text-gray-500 transition hover:bg-[#F7ADAD]/30 hover:text-[#800020]"
                >
                  ×
                </button>
              </div>

              <div className="text-center">
                <div
                  className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold ${currentModal.iconClass}`}
                >
                  {currentModal.icon}
                </div>

                <h2 className="mt-5 text-2xl font-bold">
                  {currentModal.title}
                </h2>

                <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-gray-500">
                  {currentModal.message}
                </p>

                <div className="mt-7 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="flex-1 rounded-xl border border-[#800020]/15 px-5 py-3 text-xs font-bold transition hover:bg-[#F7ADAD]/20"
                  >
                    Close
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveModal(null);
                      showToast("Action confirmed.");
                    }}
                    className="flex-1 rounded-xl bg-[#800020] px-5 py-3 text-xs font-bold text-white transition hover:bg-[#D45060]"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FORM MODAL */}
      <AnimatePresence>
        {customModal && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#800020]/70 p-5 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCustomModal(false)}
          >
            <motion.div
              className="w-full max-w-lg rounded-[2rem] bg-white p-7 shadow-2xl sm:p-9"
              initial={{
                opacity: 0,
                y: 25,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 20,
                scale: 0.95,
              }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D45060]">
                    Quick form
                  </p>

                  <h2 className="mt-2 text-2xl font-bold">
                    Get in Touch
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setCustomModal(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-50 text-xl text-gray-500"
                >
                  ×
                </button>
              </div>

              <form
                onSubmit={handleCustomSubmit}
                className="mt-7 space-y-5"
              >
                <div>
                  <label className="mb-2 block text-xs font-bold text-gray-500">
                    Name
                  </label>

                  <input
                    value={formData.name}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        name: event.target.value,
                      })
                    }
                    placeholder="Enter your name"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:border-[#D45060] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold text-gray-500">
                    Email
                  </label>

                  <input
                    type="email"
                    value={formData.email}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        email: event.target.value,
                      })
                    }
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:border-[#D45060] focus:bg-white"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setCustomModal(false)}
                    className="flex-1 rounded-xl border border-[#800020]/15 px-5 py-3.5 text-xs font-bold transition hover:bg-[#F7ADAD]/20"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="flex-1 rounded-xl bg-[#800020] px-5 py-3.5 text-xs font-bold text-white transition hover:bg-[#D45060]"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DELETE MODAL */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#800020]/70 p-5 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDeleteModal(false)}
          >
            <motion.div
              className="w-full max-w-md rounded-[2rem] bg-white p-7 shadow-2xl sm:p-9"
              initial={{
                opacity: 0,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
              }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-2xl text-red-500">
                !
              </div>

              <div className="mt-5 text-center">
                <h2 className="text-2xl font-bold">
                  Delete Account?
                </h2>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                  This is a demo confirmation modal. In a real
                  application, deleting an account would permanently
                  remove the user's account and associated data.
                </p>
              </div>

              <div className="mt-7 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 rounded-xl border border-[#800020]/15 px-5 py-3.5 text-xs font-bold transition hover:bg-[#F7ADAD]/20"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleDelete}
                  className="flex-1 rounded-xl bg-red-500 px-5 py-3.5 text-xs font-bold text-white transition hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PRODUCT PREVIEW MODAL */}
      <AnimatePresence>
        {showImageModal && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#800020]/80 p-5 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowImageModal(false)}
          >
            <motion.div
              className="w-full max-w-3xl overflow-hidden rounded-[2rem] bg-white shadow-2xl"
              initial={{
                opacity: 0,
                y: 30,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 20,
                scale: 0.96,
              }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="relative flex min-h-[350px] items-center justify-center bg-[#F7ADAD]/20 p-10 sm:min-h-[450px]">
                <button
                  type="button"
                  onClick={() => setShowImageModal(false)}
                  className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl shadow-sm"
                >
                  ×
                </button>

                <div className="text-center">
                  <div className="mx-auto flex h-44 w-44 items-center justify-center rounded-[2rem] bg-[#800020] shadow-2xl sm:h-56 sm:w-56">
                    <div className="text-white">
                      <div className="text-6xl">◈</div>

                      <p className="mt-3 text-xs font-bold uppercase tracking-[0.3em] text-[#F7ADAD]">
                        Loom & Leaf
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D45060]">
                  Featured product
                </p>

                <div className="mt-2 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                  <div>
                    <h2 className="text-2xl font-bold">
                      Classic Oversized Jacket
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                      Premium everyday fashion with a modern
                      silhouette.
                    </p>
                  </div>

                  <p className="text-xl font-bold">
                    ₹2,499
                  </p>
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowImageModal(false);
                      showToast("Added to wishlist.");
                    }}
                    className="flex-1 rounded-xl border border-[#800020]/15 px-5 py-3.5 text-xs font-bold transition hover:bg-[#F7ADAD]/20"
                  >
                    ♡ Wishlist
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setShowImageModal(false);
                      showToast("Product added to cart.");
                    }}
                    className="flex-1 rounded-xl bg-[#800020] px-5 py-3.5 text-xs font-bold text-white transition hover:bg-[#D45060]"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
            className="fixed bottom-6 left-1/2 z-[200] rounded-full bg-[#800020] px-6 py-3 text-sm font-semibold text-white shadow-2xl"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}