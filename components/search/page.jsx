"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const products = [
  {
    id: "p1",
    name: "Classic Oversized Jacket",
    category: "Fashion",
    price: 2499,
    oldPrice: 3499,
    rating: 4.8,
    reviews: 128,
    badge: "Bestseller",
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
  },
  {
    id: "p5",
    name: "Minimal Leather Tote",
    category: "Fashion",
    price: 2199,
    oldPrice: 2999,
    rating: 4.7,
    reviews: 81,
    badge: "Popular",
  },
  {
    id: "p6",
    name: "Smart Desk Lamp",
    category: "Electronics",
    price: 1799,
    oldPrice: 2399,
    rating: 4.5,
    reviews: 52,
    badge: "New",
  },
  {
    id: "p7",
    name: "Soft Touch Cushion Set",
    category: "Home & Living",
    price: 999,
    oldPrice: 1499,
    rating: 4.6,
    reviews: 44,
    badge: "Sale",
  },
  {
    id: "p8",
    name: "Rose Petal Skincare Kit",
    category: "Beauty",
    price: 1599,
    oldPrice: 2199,
    rating: 4.8,
    reviews: 97,
    badge: "Bestseller",
  },
];

const popularSearches = [
  "Wireless Headphones",
  "Oversized Jacket",
  "Beauty",
  "Home Decor",
  "New Arrivals",
];

const categories = [
  "All",
  "Fashion",
  "Electronics",
  "Home & Living",
  "Beauty",
];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [wishlist, setWishlist] = useState([]);
  const [toast, setToast] = useState("");

  const filteredProducts = products
    .filter((product) => {
      const searchText = query.toLowerCase().trim();

      const matchesSearch =
        !searchText ||
        product.name.toLowerCase().includes(searchText) ||
        product.category.toLowerCase().includes(searchText);

      const matchesCategory =
        activeCategory === "All" ||
        product.category === activeCategory;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;

      return 0;
    });

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const selectPopularSearch = (value) => {
    setQuery(value);
    setActiveCategory("All");
  };

  const toggleWishlist = (id) => {
    const alreadyWishlisted = wishlist.includes(id);

    setWishlist((current) =>
      alreadyWishlisted
        ? current.filter((item) => item !== id)
        : [...current, id]
    );

    setToast(
      alreadyWishlisted
        ? "Removed from wishlist"
        : "Added to wishlist"
    );

    setTimeout(() => setToast(""), 2000);
  };

  const addToCart = (product) => {
    setToast(`${product.name} added to cart`);
    setTimeout(() => setToast(""), 2000);
  };

  return (
    <main className="min-h-screen bg-white text-[#800020]">
      {/* HEADER */}
      <section className="relative overflow-hidden bg-[#F7ADAD]/30">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#D45060]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#D45060]">
              Discover
            </p>

            <h1 className="mt-4 text-5xl font-bold leading-tight text-[#800020] sm:text-6xl">
              Search the
              <br />
              <span className="text-[#D45060]">collection.</span>
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#800020]/60 sm:text-base">
              Find products, explore categories, and discover something new
              from Loom & Leaf.
            </p>

            {/* SEARCH BAR */}
            <form
              onSubmit={handleSearch}
              className="mx-auto mt-9 flex max-w-2xl items-center gap-3 rounded-2xl border border-[#800020]/10 bg-white p-2 shadow-xl"
            >
              <svg
                width="21"
                height="21"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#800020"
                strokeWidth="2"
                className="ml-3 shrink-0"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-4-4" />
              </svg>

              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products or categories..."
                className="h-12 min-w-0 flex-1 bg-transparent px-2 text-sm text-[#800020] outline-none placeholder:text-[#800020]/35"
              />

              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F7ADAD]/40 text-[#800020] hover:bg-[#F7ADAD]"
                >
                  ×
                </button>
              )}

              <button
                type="submit"
                className="rounded-xl bg-[#800020] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#D45060]"
              >
                Search
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* POPULAR SEARCHES */}
      {!query && (
        <section className="border-b border-[#800020]/10">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-6 py-6 lg:px-10">
            <span className="mr-2 text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
              Popular
            </span>

            {popularSearches.map((search) => (
              <button
                key={search}
                type="button"
                onClick={() => selectPopularSearch(search)}
                className="rounded-full border border-[#800020]/10 bg-white px-4 py-2 text-xs font-semibold text-[#800020]/70 transition hover:border-[#D45060] hover:bg-[#F7ADAD]/30 hover:text-[#800020]"
              >
                {search}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* RESULTS */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        {/* TOOLBAR */}
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            {query ? (
              <>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D45060]">
                  Search results
                </p>

                <h2 className="mt-2 text-3xl font-bold text-[#800020]">
                  Results for &quot;{query}&quot;
                </h2>
              </>
            ) : (
              <>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D45060]">
                  Explore
                </p>

                <h2 className="mt-2 text-3xl font-bold text-[#800020]">
                  Discover products
                </h2>
              </>
            )}

            <p className="mt-2 text-sm text-gray-500">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "product" : "products"} found
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

        {/* CATEGORIES */}
        <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                activeCategory === category
                  ? "bg-[#800020] text-white"
                  : "bg-[#F7ADAD]/30 text-[#800020] hover:bg-[#F7ADAD]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* PRODUCT GRID */}
        {filteredProducts.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product, index) => (
              <motion.article
                key={product.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.06,
                }}
                className="group overflow-hidden rounded-3xl border border-[#800020]/10 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                {/* VISUAL */}
                <div className="relative flex h-64 items-center justify-center overflow-hidden bg-[#F7ADAD]/30">
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#D45060]/10 blur-2xl" />

                  <div className="flex h-44 w-36 rotate-3 items-center justify-center rounded-[3rem] bg-[#800020] shadow-2xl transition duration-500 group-hover:rotate-0 group-hover:scale-105">
                    <div className="text-center text-white">
                      <p className="text-5xl font-bold">L</p>

                      <div className="mx-auto mt-2 h-px w-7 bg-[#F7ADAD]" />

                      <p className="mt-2 text-[8px] uppercase tracking-[0.3em] text-[#F7ADAD]">
                        Loom & Leaf
                      </p>
                    </div>
                  </div>

                  <span className="absolute left-4 top-4 rounded-full bg-[#D45060] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white">
                    {product.badge}
                  </span>

                  <button
                    type="button"
                    onClick={() => toggleWishlist(product.id)}
                    className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-xl shadow backdrop-blur-md ${
                      wishlist.includes(product.id)
                        ? "text-[#D45060]"
                        : "text-[#800020]"
                    }`}
                    aria-label="Toggle wishlist"
                  >
                    {wishlist.includes(product.id) ? "♥" : "♡"}
                  </button>
                </div>

                {/* INFO */}
                <div className="p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D45060]">
                    {product.category}
                  </p>

                  <Link href={`/product/${product.id}`}>
                    <h3 className="mt-2 min-h-[48px] text-lg font-bold leading-6 text-[#800020] transition hover:text-[#D45060]">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="mt-3 flex items-center gap-2">
                    <span className="rounded-md bg-[#F7ADAD]/40 px-2 py-1 text-xs font-bold text-[#800020]">
                      ★ {product.rating}
                    </span>

                    <span className="text-xs text-gray-400">
                      ({product.reviews})
                    </span>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-xl font-bold text-[#800020]">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>

                    <span className="text-sm text-gray-400 line-through">
                      ₹{product.oldPrice.toLocaleString("en-IN")}
                    </span>
                  </div>

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
        ) : (
          /* EMPTY STATE */
          <div className="mt-10 rounded-[2rem] bg-[#F7ADAD]/25 px-6 py-24 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#F7ADAD] text-3xl text-[#800020]">
              ?
            </div>

            <h2 className="mt-6 text-2xl font-bold text-[#800020]">
              No products found
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
              We couldn&apos;t find anything matching your search. Try another
              keyword or explore our categories.
            </p>

            <button
              type="button"
              onClick={() => {
                setQuery("");
                setActiveCategory("All");
              }}
              className="mt-7 rounded-full bg-[#800020] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#D45060]"
            >
              Clear Search
            </button>
          </div>
        )}
      </section>

      {/* DISCOVER CATEGORIES */}
      {!query && (
        <section className="bg-[#800020] px-6 py-20 text-white lg:px-10">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#F7ADAD]">
              Browse collections
            </p>

            <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
              Start exploring.
            </h2>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {categories.slice(1).map((category, index) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className="group rounded-3xl border border-white/10 bg-white/5 p-6 text-left transition hover:-translate-y-1 hover:bg-white/10"
                >
                  <span className="text-xs font-bold text-[#F7ADAD]">
                    0{index + 1}
                  </span>

                  <h3 className="mt-12 text-xl font-bold">{category}</h3>

                  <div className="mt-6 flex h-9 w-9 items-center justify-center rounded-full bg-[#F7ADAD] text-[#800020] transition group-hover:bg-white">
                    →
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TOAST */}
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 20, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          className="fixed bottom-6 left-1/2 z-50 rounded-full bg-[#800020] px-6 py-3 text-sm font-semibold text-white shadow-2xl"
        >
          {toast}
        </motion.div>
      )}
    </main>
  );
}