"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function ProductCard({
  product,
  onAddToCart,
  onToggleWishlist,
  isWishlisted = false,
}) {
  if (!product) return null;

  const {
    id,
    name,
    category,
    price,
    oldPrice,
    rating = 0,
    reviews = 0,
    badge,
    image,
    description,
  } = product;

  const discount =
    oldPrice && oldPrice > price
      ? Math.round(((oldPrice - price) / oldPrice) * 100)
      : 0;

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (onToggleWishlist) {
      onToggleWishlist(product);
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="group overflow-hidden rounded-3xl border border-[#800020]/10 bg-white shadow-sm transition-shadow duration-300 hover:shadow-2xl"
    >
      {/* PRODUCT IMAGE */}
      <Link
        href={`/product/${id}`}
        className="relative block h-72 overflow-hidden bg-[#F7ADAD]/30"
      >
        {/* Background decoration */}
        <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#D45060]/10 blur-2xl" />

        <div className="absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-[#800020]/10 blur-3xl" />

        {/* Product visual */}
        {image ? (
          <img
            src={image}
            alt={name}
            className="relative z-10 h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="relative flex h-full items-center justify-center">
            <div className="flex h-48 w-40 rotate-3 items-center justify-center rounded-[3rem] bg-[#800020] shadow-2xl shadow-[#800020]/20 transition duration-500 group-hover:rotate-0 group-hover:scale-105">
              <div className="text-center text-white">
                <p className="text-6xl font-bold">L</p>

                <div className="mx-auto mt-2 h-px w-8 bg-[#F7ADAD]" />

                <p className="mt-2 text-[8px] uppercase tracking-[0.3em] text-[#F7ADAD]">
                  Loom & Leaf
                </p>
              </div>
            </div>
          </div>
        )}

        {/* BADGE */}
        {badge && (
          <span className="absolute left-4 top-4 z-20 rounded-full bg-[#D45060] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
            {badge}
          </span>
        )}

        {/* DISCOUNT */}
        {discount > 0 && (
          <span className="absolute bottom-4 left-4 z-20 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold text-[#800020] shadow-sm backdrop-blur-md">
            {discount}% OFF
          </span>
        )}

        {/* WISHLIST */}
        <button
          type="button"
          onClick={handleWishlist}
          aria-label={
            isWishlisted ? "Remove from wishlist" : "Add to wishlist"
          }
          className={`absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-xl shadow-md backdrop-blur-md transition hover:scale-110 ${
            isWishlisted ? "text-[#D45060]" : "text-[#800020]"
          }`}
        >
          {isWishlisted ? "♥" : "♡"}
        </button>

        {/* QUICK VIEW */}
        <div className="absolute bottom-4 right-4 z-20 translate-y-3 rounded-full bg-[#800020] px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-white opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          View Product
        </div>
      </Link>

      {/* PRODUCT INFORMATION */}
      <div className="p-5">
        {/* CATEGORY */}
        {category && (
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D45060]">
            {category}
          </p>
        )}

        {/* NAME */}
        <Link href={`/product/${id}`}>
          <h3 className="mt-2 min-h-[52px] text-lg font-bold leading-6 text-[#800020] transition-colors hover:text-[#D45060]">
            {name}
          </h3>
        </Link>

        {/* DESCRIPTION */}
        {description && (
          <p className="mt-2 line-clamp-2 text-xs leading-5 text-gray-400">
            {description}
          </p>
        )}

        {/* RATING */}
        <div className="mt-4 flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-md bg-[#F7ADAD]/40 px-2 py-1">
            <span className="text-xs font-bold text-[#800020]">
              ★ {rating}
            </span>
          </div>

          <span className="text-xs text-gray-400">
            {reviews} {reviews === 1 ? "review" : "reviews"}
          </span>
        </div>

        {/* PRICE */}
        <div className="mt-4 flex items-end gap-2">
          <span className="text-xl font-bold text-[#800020]">
            ₹{Number(price || 0).toLocaleString("en-IN")}
          </span>

          {oldPrice && oldPrice > price && (
            <span className="pb-0.5 text-sm text-gray-400 line-through">
              ₹{Number(oldPrice).toLocaleString("en-IN")}
            </span>
          )}
        </div>

        {/* ADD TO CART */}
        <button
          type="button"
          onClick={handleAddToCart}
          className="mt-5 w-full rounded-xl bg-[#800020] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#D45060] active:scale-[0.98]"
        >
          Add to Cart
        </button>
      </div>
    </motion.article>
  );
}