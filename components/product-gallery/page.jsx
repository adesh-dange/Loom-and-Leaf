"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductGallery({
  images = [],
  productName = "Product",
}) {
  const fallbackImages = [
    {
      id: 1,
      src: null,
      alt: `${productName} front view`,
    },
    {
      id: 2,
      src: null,
      alt: `${productName} detail view`,
    },
    {
      id: 3,
      src: null,
      alt: `${productName} side view`,
    },
    {
      id: 4,
      src: null,
      alt: `${productName} lifestyle view`,
    },
  ];

  const galleryImages =
    images.length > 0
      ? images.map((image, index) => ({
          id: index + 1,
          src: typeof image === "string" ? image : image.src,
          alt:
            typeof image === "string"
              ? `${productName} view ${index + 1}`
              : image.alt || `${productName} view ${index + 1}`,
        }))
      : fallbackImages;

  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  const activeImage = galleryImages[activeIndex];

  return (
    <>
      <div className="w-full">
        <div className="grid gap-4 lg:grid-cols-[90px_1fr]">
          {/* THUMBNAILS */}
          <div className="order-2 flex gap-3 overflow-x-auto lg:order-1 lg:flex-col">
            {galleryImages.map((image, index) => (
              <button
                key={image.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`View image ${index + 1}`}
                className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-2 transition-all duration-200 ${
                  activeIndex === index
                    ? "border-[#800020] shadow-md"
                    : "border-transparent bg-[#F7ADAD]/30 hover:border-[#D45060]/50"
                }`}
              >
                {image.src ? (
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[#F7ADAD]/30">
                    <div className="flex h-12 w-10 items-center justify-center rounded-xl bg-[#800020]">
                      <span className="text-lg font-bold text-white">L</span>
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* MAIN IMAGE */}
          <div className="order-1 lg:order-2">
            <div className="group relative aspect-square overflow-hidden rounded-[2rem] bg-[#F7ADAD]/30">
              {/* Background decoration */}
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#D45060]/10 blur-3xl" />

              <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-[#800020]/10 blur-3xl" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="relative flex h-full w-full items-center justify-center"
                >
                  {activeImage.src ? (
                    <img
                      src={activeImage.src}
                      alt={activeImage.alt}
                      onClick={() => setZoomed(true)}
                      className={`h-full w-full object-cover transition duration-500 ${
                        zoomed ? "cursor-zoom-out" : "cursor-zoom-in"
                      }`}
                    />
                  ) : (
                    <div
                      onClick={() => setZoomed(true)}
                      className="flex h-full w-full cursor-zoom-in items-center justify-center"
                    >
                      <motion.div
                        animate={{
                          y: [0, -8, 0],
                          rotate: [3, 0, 3],
                        }}
                        transition={{
                          duration: 5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="relative flex h-64 w-52 items-center justify-center rounded-[4rem] bg-[#800020] shadow-2xl shadow-[#800020]/20 sm:h-72 sm:w-56"
                      >
                        <div className="absolute inset-5 rounded-[3.5rem] border border-white/10" />

                        <div className="relative text-center text-white">
                          <p className="text-7xl font-bold">L</p>

                          <div className="mx-auto mt-2 h-px w-12 bg-[#F7ADAD]" />

                          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#F7ADAD]">
                            Loom
                          </p>

                          <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-white/60">
                            & Leaf
                          </p>
                        </div>
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* IMAGE COUNTER */}
              <div className="absolute bottom-5 left-5 rounded-full bg-white/90 px-4 py-2 text-xs font-bold text-[#800020] shadow-sm backdrop-blur-md">
                {activeIndex + 1} / {galleryImages.length}
              </div>

              {/* ZOOM BUTTON */}
              <button
                type="button"
                onClick={() => setZoomed(true)}
                aria-label="Zoom product image"
                className="absolute bottom-5 right-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[#800020] shadow-md backdrop-blur-md transition hover:bg-[#800020] hover:text-white"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-4-4" />
                  <path d="M11 8v6M8 11h6" />
                </svg>
              </button>

              {/* PREVIOUS */}
              {galleryImages.length > 1 && (
                <button
                  type="button"
                  onClick={() =>
                    setActiveIndex(
                      (activeIndex - 1 + galleryImages.length) %
                        galleryImages.length
                    )
                  }
                  aria-label="Previous image"
                  className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#800020] opacity-0 shadow-md backdrop-blur-md transition group-hover:opacity-100 hover:bg-[#800020] hover:text-white"
                >
                  ←
                </button>
              )}

              {/* NEXT */}
              {galleryImages.length > 1 && (
                <button
                  type="button"
                  onClick={() =>
                    setActiveIndex(
                      (activeIndex + 1) % galleryImages.length
                    )
                  }
                  aria-label="Next image"
                  className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#800020] opacity-0 shadow-md backdrop-blur-md transition group-hover:opacity-100 hover:bg-[#800020] hover:text-white"
                >
                  →
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ZOOM MODAL */}
      <AnimatePresence>
        {zoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomed(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#800020]/80 p-5 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-[90vh] w-full max-w-5xl items-center justify-center overflow-hidden rounded-[2rem] bg-[#F7ADAD]/20"
            >
              {activeImage.src ? (
                <img
                  src={activeImage.src}
                  alt={activeImage.alt}
                  className="max-h-[85vh] max-w-full object-contain"
                />
              ) : (
                <div className="flex h-[70vh] w-full items-center justify-center">
                  <div className="flex h-72 w-60 items-center justify-center rounded-[5rem] bg-[#800020] shadow-2xl">
                    <div className="text-center text-white">
                      <p className="text-8xl font-bold">L</p>

                      <div className="mx-auto mt-3 h-px w-16 bg-[#F7ADAD]" />

                      <p className="mt-4 text-sm font-semibold uppercase tracking-[0.4em] text-[#F7ADAD]">
                        Loom
                      </p>

                      <p className="mt-1 text-xs uppercase tracking-[0.3em] text-white/60">
                        & Leaf
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={() => setZoomed(false)}
                aria-label="Close image preview"
                className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white text-xl font-bold text-[#800020] shadow-lg transition hover:bg-[#F7ADAD]"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}