"use client";

import Link from "next/link";
import { useState } from "react";

const initialWishlist = [
  {
    id: 1,
    name: "Oversized Linen Shirt",
    category: "Fashion",
    price: 1299,
    oldPrice: 1799,
    rating: 4.8,
    reviews: 124,
    image:
      "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&q=80",
    badge: "20% OFF",
  },
  {
    id: 2,
    name: "Minimal Ceramic Vase",
    category: "Home & Living",
    price: 899,
    oldPrice: 1299,
    rating: 4.7,
    reviews: 86,
    image:
      "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=900&q=80",
    badge: "TRENDING",
  },
  {
    id: 3,
    name: "Premium Wireless Headphones",
    category: "Electronics",
    price: 3499,
    oldPrice: 4999,
    rating: 4.9,
    reviews: 241,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
    badge: "BESTSELLER",
  },
  {
    id: 4,
    name: "Rose Glow Face Serum",
    category: "Beauty",
    price: 1199,
    oldPrice: 1599,
    rating: 4.6,
    reviews: 98,
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80",
    badge: "NEW",
  },
];

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState(initialWishlist);
  const [cartMessage, setCartMessage] = useState("");

  const removeFromWishlist = (id) => {
    setWishlist((current) => current.filter((product) => product.id !== id));
  };

  const moveToCart = (product) => {
    setCartMessage(`${product.name} added to your cart.`);

    setTimeout(() => {
      setCartMessage("");
    }, 2500);
  };

  const moveAllToCart = () => {
    if (!wishlist.length) return;

    setCartMessage(`${wishlist.length} items added to your cart.`);

    setTimeout(() => {
      setCartMessage("");
    }, 2500);
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <main className="min-h-screen bg-[#F7ADAD]/20 text-[#800020]">
      {/* Toast */}
      {cartMessage && (
        <div className="fixed right-5 top-5 z-50 rounded-2xl bg-[#800020] px-5 py-4 text-sm font-semibold text-white shadow-2xl">
          {cartMessage}
        </div>
      )}

      {/* Header */}
      <section className="border-b border-[#800020]/10 bg-white/70 px-5 py-12 backdrop-blur-xl md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-4 flex items-center gap-2 text-sm text-[#800020]/60">
            <Link href="/" className="transition hover:text-[#D45060]">
              Home
            </Link>
            <span>/</span>
            <span>Wishlist</span>
          </div>

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-2 text-sm font-bold uppercase tracking-[0.25em] text-[#D45060]">
                Saved for later
              </p>

              <h1 className="text-4xl font-black tracking-tight md:text-6xl">
                My Wishlist
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#800020]/65 md:text-base">
                Keep the pieces you love close. Save your favorites and come
                back whenever you are ready.
              </p>
            </div>

            {wishlist.length > 0 && (
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={moveAllToCart}
                  className="rounded-full bg-[#800020] px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#D45060]"
                >
                  Move All to Cart
                </button>

                <button
                  onClick={clearWishlist}
                  className="rounded-full border border-[#800020]/20 bg-white px-6 py-3 text-sm font-bold text-[#800020] transition hover:border-[#D45060] hover:text-[#D45060]"
                >
                  Clear Wishlist
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Wishlist Content */}
      <section className="px-5 py-10 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          {wishlist.length === 0 ? (
            <EmptyWishlist />
          ) : (
            <>
              {/* Count */}
              <div className="mb-8 flex items-center justify-between">
                <p className="text-sm font-semibold text-[#800020]/65">
                  {wishlist.length}{" "}
                  {wishlist.length === 1 ? "item" : "items"} saved
                </p>

                <Link
                  href="/shop"
                  className="text-sm font-bold text-[#D45060] transition hover:text-[#800020]"
                >
                  Continue Shopping →
                </Link>
              </div>

              {/* Products */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {wishlist.map((product) => (
                  <WishlistCard
                    key={product.id}
                    product={product}
                    onRemove={removeFromWishlist}
                    onMoveToCart={moveToCart}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      {wishlist.length > 0 && (
        <section className="px-5 pb-16 md:px-10 lg:px-16">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#800020] px-6 py-12 text-center text-white shadow-2xl md:px-12">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-[#F7ADAD]">
              Keep exploring
            </p>

            <h2 className="text-3xl font-black md:text-5xl">
              Find something new to love.
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-white/70 md:text-base">
              Discover curated products, fresh arrivals, exclusive deals and
              more from Loom & Leaf.
            </p>

            <Link
              href="/shop"
              className="mt-7 inline-flex rounded-full bg-[#F7ADAD] px-7 py-3.5 text-sm font-black text-[#800020] transition hover:bg-[#D45060] hover:text-white"
            >
              Explore Shop
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}

function WishlistCard({ product, onRemove, onMoveToCart }) {
  const discount = Math.round(
    ((product.oldPrice - product.price) / product.oldPrice) * 100
  );

  return (
    <article className="group overflow-hidden rounded-[1.5rem] border border-[#800020]/10 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#F7ADAD]/20">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />

        {/* Badge */}
        <div className="absolute left-4 top-4 rounded-full bg-[#800020] px-3 py-1.5 text-[10px] font-black tracking-wide text-white">
          {product.badge}
        </div>

        {/* Remove */}
        <button
          onClick={() => onRemove(product.id)}
          aria-label={`Remove ${product.name} from wishlist`}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-lg text-[#800020] shadow-lg backdrop-blur-md transition hover:bg-[#800020] hover:text-white"
        >
          ×
        </button>

        {/* Discount */}
        <div className="absolute bottom-4 left-4 rounded-full bg-[#D45060] px-3 py-1.5 text-xs font-bold text-white">
          {discount}% OFF
        </div>
      </div>

      {/* Details */}
      <div className="p-5">
        <p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-[#D45060]">
          {product.category}
        </p>

        <Link href={`/product/${product.id}`}>
          <h2 className="line-clamp-2 min-h-[48px] text-base font-black leading-6 text-[#800020] transition hover:text-[#D45060]">
            {product.name}
          </h2>
        </Link>

        {/* Rating */}
        <div className="mt-3 flex items-center gap-2">
          <span className="rounded-md bg-[#F7ADAD]/50 px-2 py-1 text-xs font-bold">
            ★ {product.rating}
          </span>

          <span className="text-xs text-[#800020]/50">
            ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="mt-4 flex items-center gap-2">
          <span className="text-xl font-black text-[#800020]">
            ₹{product.price.toLocaleString("en-IN")}
          </span>

          <span className="text-sm text-[#800020]/35 line-through">
            ₹{product.oldPrice.toLocaleString("en-IN")}
          </span>
        </div>

        {/* Action */}
        <button
          onClick={() => onMoveToCart(product)}
          className="mt-5 w-full rounded-xl bg-[#800020] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#D45060]"
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}

function EmptyWishlist() {
  return (
    <div className="flex min-h-[55vh] flex-col items-center justify-center rounded-[2rem] border border-[#800020]/10 bg-white/70 px-6 py-16 text-center shadow-sm backdrop-blur-xl">
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#F7ADAD]/40 text-5xl">
        ♡
      </div>

      <p className="mb-2 text-sm font-bold uppercase tracking-[0.25em] text-[#D45060]">
        Your wishlist
      </p>

      <h2 className="text-3xl font-black md:text-4xl">
        Nothing saved yet
      </h2>

      <p className="mt-4 max-w-md text-sm leading-6 text-[#800020]/60">
        Start exploring Loom & Leaf and save the products you love. They will
        appear here for you whenever you are ready.
      </p>

      <Link
        href="/shop"
        className="mt-7 rounded-full bg-[#800020] px-7 py-3.5 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#D45060]"
      >
        Start Shopping
      </Link>
    </div>
  );
}