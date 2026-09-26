"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

const featuredProducts = [
  {
    id: "p1",
    name: "Classic Oversized Jacket",
    category: "Fashion",
    price: 2499,
    oldPrice: 3499,
    rating: 4.8,
    reviews: 128,
    badge: "Bestseller",
    description:
      "A refined oversized jacket designed with a clean silhouette and everyday versatility.",
    colors: ["Burgundy", "Blush", "Black"],
  },
  {
    id: "p2",
    name: "Aura Wireless Headphones",
    category: "Electronics",
    price: 3999,
    oldPrice: 5499,
    rating: 4.7,
    reviews: 94,
    badge: "Trending",
    description:
      "Immersive wireless headphones combining a minimal design with an effortless listening experience.",
    colors: ["Burgundy", "Rose", "Black"],
  },
  {
    id: "p3",
    name: "Luna Ceramic Vase",
    category: "Home & Living",
    price: 1299,
    oldPrice: 1799,
    rating: 4.9,
    reviews: 76,
    badge: "New",
    description:
      "A sculptural ceramic vase created to add a soft contemporary touch to your space.",
    colors: ["Blush", "Cream", "Burgundy"],
  },
  {
    id: "p4",
    name: "Velvet Glow Beauty Set",
    category: "Beauty",
    price: 1899,
    oldPrice: 2499,
    rating: 4.6,
    reviews: 63,
    badge: "Popular",
    description:
      "A carefully curated beauty set for an elegant everyday self-care routine.",
    colors: ["Rose", "Blush", "Burgundy"],
  },
];

const categories = [
  {
    name: "Fashion",
    href: "/categories/fashion",
    count: "32 Products",
  },
  {
    name: "Electronics",
    href: "/categories/electronics",
    count: "28 Products",
  },
  {
    name: "Home & Living",
    href: "/categories/home-living",
    count: "24 Products",
  },
  {
    name: "Beauty",
    href: "/categories/beauty",
    count: "19 Products",
  },
];

function formatPrice(price) {
  return `₹${price.toLocaleString("en-IN")}`;
}

export default function ProductPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState("");

  const filteredProducts =
    activeCategory === "All"
      ? [...featuredProducts]
      : featuredProducts.filter(
          (product) => product.category === activeCategory
        );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  const toggleWishlist = (id) => {
    setWishlist((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );

    setToast(
      wishlist.includes(id)
        ? "Removed from wishlist"
        : "Added to wishlist"
    );

    setTimeout(() => setToast(""), 2200);
  };

  const addToCart = (product) => {
    setCart((current) => [...current, product.id]);
    setToast(`${product.name} added to cart`);

    setTimeout(() => setToast(""), 2200);
  };

  return (
    <main className="min-h-screen bg-white text-[#800020]">
      {/* PAGE HEADER */}
      <section className="relative overflow-hidden bg-[#F7ADAD]/30">
        <div className="absolute -right-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-[#D45060]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#D45060]">
              Loom & Leaf Collection
            </p>

            <h1 className="mt-4 text-5xl font-bold leading-tight text-[#800020] sm:text-6xl">
              Discover products
              <br />
              worth <span className="text-[#D45060]">keeping.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-[#800020]/60 sm:text-lg">
              Explore our curated collection of fashion, electronics, home
              essentials, and beauty products designed around modern living.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CATEGORY STRIP */}
      <section className="border-b border-[#800020]/10 bg-white">
        <div className="mx-auto max-w-7xl overflow-x-auto px-6 lg:px-10">
          <div className="flex min-w-max gap-3 py-5">
            <button
              type="button"
              onClick={() => setActiveCategory("All")}
              className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${
                activeCategory === "All"
                  ? "bg-[#800020] text-white"
                  : "bg-[#F7ADAD]/30 text-[#800020] hover:bg-[#F7ADAD]"
              }`}
            >
              All Products
            </button>

            {categories.map((category) => (
              <button
                key={category.name}
                type="button"
                onClick={() => setActiveCategory(category.name)}
                className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${
                  activeCategory === category.name
                    ? "bg-[#800020] text-white"
                    : "bg-[#F7ADAD]/30 text-[#800020] hover:bg-[#F7ADAD]"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        {/* TOOLBAR */}
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-bold text-[#800020]">
                {sortedProducts.length}
              </span>{" "}
              products
            </p>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-xl border border-[#800020]/10 bg-white px-4 py-3 text-sm font-semibold text-[#800020] outline-none focus:border-[#D45060]"
          >
            <option value="featured">Sort: Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>

        {/* PRODUCT GRID */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sortedProducts.map((product, index) => (
            <motion.article
              key={product.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.45,
                delay: index * 0.08,
              }}
              className="group overflow-hidden rounded-3xl border border-[#800020]/10 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* PRODUCT VISUAL */}
              <div className="relative flex h-72 items-center justify-center overflow-hidden bg-[#F7ADAD]/30">
                <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-[#D45060]/10" />

                <div className="relative flex h-48 w-40 rotate-3 items-center justify-center rounded-[3rem] bg-[#800020] shadow-2xl shadow-[#800020]/20 transition duration-500 group-hover:rotate-0 group-hover:scale-105">
                  <div className="text-center text-white">
                    <p className="text-5xl font-bold">L</p>
                    <div className="mx-auto mt-2 h-px w-8 bg-[#F7ADAD]" />
                    <p className="mt-2 text-[8px] uppercase tracking-[0.3em] text-[#F7ADAD]">
                      Loom & Leaf
                    </p>
                  </div>
                </div>

                {/* BADGE */}
                <span className="absolute left-4 top-4 rounded-full bg-[#D45060] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white">
                  {product.badge}
                </span>

                {/* WISHLIST */}
                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  aria-label="Toggle wishlist"
                  className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-lg shadow-sm backdrop-blur transition ${
                    wishlist.includes(product.id)
                      ? "text-[#D45060]"
                      : "text-[#800020]"
                  }`}
                >
                  {wishlist.includes(product.id) ? "♥" : "♡"}
                </button>
              </div>

              {/* PRODUCT INFO */}
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#D45060]">
                  {product.category}
                </p>

                <Link href={`/product/${product.id}`}>
                  <h2 className="mt-2 min-h-[48px] text-lg font-bold text-[#800020] transition hover:text-[#D45060]">
                    {product.name}
                  </h2>
                </Link>

                {/* RATING */}
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-sm font-bold text-[#800020]">
                    ★ {product.rating}
                  </span>

                  <span className="text-xs text-gray-400">
                    ({product.reviews})
                  </span>
                </div>

                {/* PRICE */}
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-xl font-bold text-[#800020]">
                    {formatPrice(product.price)}
                  </span>

                  <span className="text-sm text-gray-400 line-through">
                    {formatPrice(product.oldPrice)}
                  </span>
                </div>

                {/* ACTION */}
                <button
                  type="button"
                  onClick={() => addToCart(product)}
                  className="mt-5 w-full rounded-xl bg-[#800020] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#D45060]"
                >
                  Add to Cart
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        {/* EMPTY STATE */}
        {sortedProducts.length === 0 && (
          <div className="rounded-3xl border border-[#800020]/10 bg-[#F7ADAD]/20 py-20 text-center">
            <p className="text-4xl">◌</p>

            <h2 className="mt-4 text-2xl font-bold text-[#800020]">
              No products found
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Try exploring another collection.
            </p>

            <button
              type="button"
              onClick={() => setActiveCategory("All")}
              className="mt-6 rounded-full bg-[#800020] px-6 py-3 text-sm font-bold text-white"
            >
              View All Products
            </button>
          </div>
        )}
      </section>

      {/* CATEGORY DISCOVERY */}
      <section className="bg-[#800020] px-6 py-20 text-white lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#F7ADAD]">
              Explore more
            </p>

            <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
              Shop by category.
            </h2>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category, index) => (
              <Link
                key={category.name}
                href={category.href}
                className="group rounded-3xl border border-white/10 bg-white/5 p-6 transition duration-300 hover:-translate-y-1 hover:bg-white/10"
              >
                <span className="text-xs font-bold text-[#F7ADAD]">
                  0{index + 1}
                </span>

                <h3 className="mt-10 text-xl font-bold">
                  {category.name}
                </h3>

                <p className="mt-2 text-xs text-white/50">
                  {category.count}
                </p>

                <div className="mt-6 flex h-9 w-9 items-center justify-center rounded-full bg-[#F7ADAD] text-[#800020] transition group-hover:bg-white">
                  →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-[#F7ADAD] px-8 py-14 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#D45060]">
            Keep discovering
          </p>

          <h2 className="mx-auto mt-4 max-w-2xl text-4xl font-bold text-[#800020]">
            Your next favorite product might be one click away.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#800020]/60">
            Explore more collections, discover new arrivals, and find products
            that fit your everyday life.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-4">
            <Link
              href="/deals"
              className="rounded-full bg-[#800020] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#D45060]"
            >
              View Deals
            </Link>

            <Link
              href="/wishlist"
              className="rounded-full bg-white px-7 py-3.5 text-sm font-bold text-[#800020] transition hover:-translate-y-0.5"
            >
              My Wishlist
            </Link>
          </div>
        </div>
      </section>

      {/* TOAST */}
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 20, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 20, x: "-50%" }}
          className="fixed bottom-6 left-1/2 z-50 rounded-full bg-[#800020] px-6 py-3 text-sm font-semibold text-white shadow-2xl"
        >
          {toast}
        </motion.div>
      )}
    </main>
  );
}