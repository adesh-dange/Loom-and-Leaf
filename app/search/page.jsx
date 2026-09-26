"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const products = [
  {
    id: 1,
    name: "Classic Everyday Jacket",
    brand: "Loom & Leaf",
    category: "Fashion",
    price: 2499,
    originalPrice: 3499,
    rating: 4.7,
    reviews: 124,
    discount: 29,
  },
  {
    id: 2,
    name: "Wireless Noise Cancelling Headphones",
    brand: "Loom Audio",
    category: "Electronics",
    price: 4999,
    originalPrice: 6999,
    rating: 4.8,
    reviews: 286,
    discount: 29,
  },
  {
    id: 3,
    name: "Minimal Ceramic Table Lamp",
    brand: "Leaf Living",
    category: "Home & Living",
    price: 1799,
    originalPrice: 2499,
    rating: 4.5,
    reviews: 98,
    discount: 28,
  },
  {
    id: 4,
    name: "Hydrating Glow Skincare Set",
    brand: "Loom Beauty",
    category: "Beauty",
    price: 1299,
    originalPrice: 1899,
    rating: 4.6,
    reviews: 173,
    discount: 32,
  },
  {
    id: 5,
    name: "Premium Leather Sneakers",
    brand: "Loom Footwear",
    category: "Fashion",
    price: 3299,
    originalPrice: 4999,
    rating: 4.4,
    reviews: 87,
    discount: 34,
  },
  {
    id: 6,
    name: "Smart Fitness Watch",
    brand: "Loom Tech",
    category: "Electronics",
    price: 3999,
    originalPrice: 5999,
    rating: 4.7,
    reviews: 215,
    discount: 33,
  },
  {
    id: 7,
    name: "Modern Decorative Vase",
    brand: "Leaf Living",
    category: "Home & Living",
    price: 899,
    originalPrice: 1299,
    rating: 4.3,
    reviews: 64,
    discount: 31,
  },
  {
    id: 8,
    name: "Daily Essentials Makeup Kit",
    brand: "Loom Beauty",
    category: "Beauty",
    price: 1599,
    originalPrice: 2299,
    rating: 4.6,
    reviews: 142,
    discount: 30,
  },
  {
    id: 9,
    name: "Premium Cotton Oversized Shirt",
    brand: "Loom & Leaf",
    category: "Fashion",
    price: 1499,
    originalPrice: 2199,
    rating: 4.5,
    reviews: 109,
    discount: 32,
  },
  {
    id: 10,
    name: "Portable Bluetooth Speaker",
    brand: "Loom Audio",
    category: "Electronics",
    price: 2199,
    originalPrice: 2999,
    rating: 4.6,
    reviews: 193,
    discount: 27,
  },
  {
    id: 11,
    name: "Luxury Cushion Set",
    brand: "Leaf Living",
    category: "Home & Living",
    price: 1199,
    originalPrice: 1699,
    rating: 4.4,
    reviews: 76,
    discount: 29,
  },
  {
    id: 12,
    name: "Vitamin C Face Serum",
    brand: "Loom Beauty",
    category: "Beauty",
    price: 799,
    originalPrice: 1199,
    rating: 4.8,
    reviews: 231,
    discount: 33,
  },
];

const popularSearches = [
  "Headphones",
  "Sneakers",
  "Smart Watch",
  "Skincare",
  "Home Decor",
];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [searchedQuery, setSearchedQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("recommended");
  const [wishlist, setWishlist] = useState([]);

  const searchResults = useMemo(() => {
    const searchText = searchedQuery.trim().toLowerCase();

    let results = products.filter((product) => {
      const matchesSearch =
        !searchText ||
        product.name.toLowerCase().includes(searchText) ||
        product.brand.toLowerCase().includes(searchText) ||
        product.category.toLowerCase().includes(searchText);

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesSearch && matchesCategory;
    });

    switch (sortBy) {
      case "price-low":
        results.sort((a, b) => a.price - b.price);
        break;

      case "price-high":
        results.sort((a, b) => b.price - a.price);
        break;

      case "rating":
        results.sort((a, b) => b.rating - a.rating);
        break;

      case "discount":
        results.sort((a, b) => b.discount - a.discount);
        break;

      default:
        break;
    }

    return results;
  }, [searchedQuery, category, sortBy]);

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchedQuery(query);
  };

  const handlePopularSearch = (search) => {
    setQuery(search);
    setSearchedQuery(search);
  };

  const toggleWishlist = (id) => {
    setWishlist((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  return (
    <main className="min-h-screen bg-[#F7ADAD]/30 text-[#800020]">
      {/* Search Hero */}
      <section className="relative overflow-hidden bg-[#800020] px-6 py-16 text-[#F7ADAD] md:px-12 lg:px-20">
        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#D45060]/30 blur-3xl" />
        <div className="absolute -bottom-40 left-0 h-80 w-80 rounded-full bg-[#F7ADAD]/10 blur-3xl" />

        <div className="relative mx-auto max-w-5xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#D45060]">
            Loom & Leaf
          </p>

          <h1 className="mt-3 text-4xl font-bold sm:text-5xl lg:text-6xl">
            What are you looking for?
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#F7ADAD]/65">
            Search products, brands, and categories to discover something
            beautiful.
          </p>

          {/* Search Input */}
          <form
            onSubmit={handleSearch}
            className="mx-auto mt-8 flex max-w-3xl items-center rounded-full border border-white/10 bg-white/10 p-1.5 shadow-2xl backdrop-blur-md"
          >
            <span className="pl-5 text-xl text-[#F7ADAD]/60">⌕</span>

            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search products, brands or categories..."
              className="min-w-0 flex-1 bg-transparent px-4 py-3.5 text-sm text-white outline-none placeholder:text-[#F7ADAD]/40"
            />

            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setSearchedQuery("");
                }}
                className="mr-2 text-lg text-[#F7ADAD]/50 transition hover:text-white"
              >
                ×
              </button>
            )}

            <button
              type="submit"
              className="rounded-full bg-[#D45060] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#F7ADAD] hover:text-[#800020]"
            >
              Search
            </button>
          </form>

          {/* Popular Searches */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <span className="mr-1 text-xs text-[#F7ADAD]/40">
              Popular:
            </span>

            {popularSearches.map((search) => (
              <button
                key={search}
                type="button"
                onClick={() => handlePopularSearch(search)}
                className="rounded-full border border-[#F7ADAD]/10 bg-white/5 px-3 py-1.5 text-xs text-[#F7ADAD]/65 transition hover:border-[#D45060]/50 hover:bg-[#D45060]/20 hover:text-[#F7ADAD]"
              >
                {search}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Search Content */}
      <section className="mx-auto max-w-7xl px-6 py-10 md:px-12 lg:px-20">
        {/* No Search Yet */}
        {!searchedQuery && (
          <div className="mb-12">
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D45060]">
                Explore
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                Discover our collections
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  name: "Fashion",
                  href: "/categories/fashion",
                  letter: "F",
                },
                {
                  name: "Electronics",
                  href: "/categories/electronics",
                  letter: "E",
                },
                {
                  name: "Home & Living",
                  href: "/categories/home-living",
                  letter: "H",
                },
                {
                  name: "Beauty",
                  href: "/categories/beauty",
                  letter: "B",
                },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group rounded-3xl border border-[#800020]/10 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#800020] text-xl font-black text-[#F7ADAD] transition-transform duration-300 group-hover:rotate-6">
                    {item.letter}
                  </div>

                  <h3 className="mt-5 font-bold">{item.name}</h3>

                  <p className="mt-1 text-xs text-[#800020]/50">
                    Explore collection →
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        {searchedQuery && (
          <>
            <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D45060]">
                  Search Results
                </p>

                <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                  Results for "{searchedQuery}"
                </h2>

                <p className="mt-2 text-sm text-[#800020]/50">
                  {searchResults.length} products found
                </p>
              </div>

              <div className="flex gap-3">
                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="rounded-full border border-[#800020]/15 bg-white px-4 py-3 text-xs font-medium outline-none"
                >
                  <option value="All">All Categories</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Home & Living">Home & Living</option>
                  <option value="Beauty">Beauty</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                  className="rounded-full border border-[#800020]/15 bg-white px-4 py-3 text-xs font-medium outline-none"
                >
                  <option value="recommended">Recommended</option>
                  <option value="price-low">Price: Low → High</option>
                  <option value="price-high">Price: High → Low</option>
                  <option value="rating">Rating</option>
                  <option value="discount">Discount</option>
                </select>
              </div>
            </div>

            {searchResults.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {searchResults.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isWishlisted={wishlist.includes(product.id)}
                    toggleWishlist={toggleWishlist}
                  />
                ))}
              </div>
            ) : (
              <NoResults
                query={searchedQuery}
                onClear={() => {
                  setQuery("");
                  setSearchedQuery("");
                  setCategory("All");
                }}
              />
            )}
          </>
        )}

        {/* Initial Product Suggestions */}
        {!searchedQuery && (
          <div>
            <div className="mb-7 flex items-end justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D45060]">
                  Trending
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  Popular products
                </h2>
              </div>

              <Link
                href="/shop"
                className="text-sm font-semibold text-[#D45060] transition hover:text-[#800020]"
              >
                View All →
              </Link>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.slice(0, 8).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isWishlisted={wishlist.includes(product.id)}
                  toggleWishlist={toggleWishlist}
                />
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

function ProductCard({ product, isWishlisted, toggleWishlist }) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-[#800020]/10 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-[#F7ADAD]/35">
        <Link
          href={`/product/${product.id}`}
          className="flex h-full w-full items-center justify-center"
        >
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-[#800020] text-2xl font-black text-[#F7ADAD] shadow-xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
            L&L
          </div>
        </Link>

        <span className="absolute left-3 top-3 rounded-full bg-[#D45060] px-3 py-1.5 text-[10px] font-bold text-white">
          {product.discount}% OFF
        </span>

        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          aria-label="Toggle wishlist"
          className={`absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-lg shadow-md backdrop-blur-md transition ${
            isWishlisted
              ? "text-[#D45060]"
              : "text-[#800020] hover:text-[#D45060]"
          }`}
        >
          {isWishlisted ? "♥" : "♡"}
        </button>

        <Link
          href={`/product/${product.id}`}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 translate-y-14 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        >
          Quick View
        </Link>
      </div>

      <div className="px-2 pb-2 pt-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D45060]">
          {product.brand}
        </p>

        <Link href={`/product/${product.id}`}>
          <h3 className="mt-1 min-h-12 text-sm font-bold leading-6 transition-colors hover:text-[#D45060]">
            {product.name}
          </h3>
        </Link>

        <div className="mt-2 flex items-center gap-2">
          <span className="rounded-md bg-[#F7ADAD]/40 px-2 py-1 text-xs font-bold">
            {product.rating} ★
          </span>

          <span className="text-xs text-[#800020]/45">
            ({product.reviews})
          </span>
        </div>

        <div className="mt-4 flex items-end gap-2">
          <span className="text-lg font-bold">
            ₹{product.price.toLocaleString("en-IN")}
          </span>

          <span className="text-xs text-[#800020]/35 line-through">
            ₹{product.originalPrice.toLocaleString("en-IN")}
          </span>
        </div>

        <button
          type="button"
          className="mt-4 w-full rounded-full bg-[#800020] py-3 text-xs font-semibold text-white transition hover:bg-[#D45060]"
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}

function NoResults({ query, onClear }) {
  return (
    <div className="flex min-h-[420px] flex-col items-center justify-center rounded-[2rem] border border-[#800020]/10 bg-white px-6 text-center">
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#F7ADAD]/50 text-2xl font-black">
        L&L
      </div>

      <h2 className="mt-7 text-2xl font-bold">
        No results found
      </h2>

      <p className="mt-3 max-w-md text-sm leading-6 text-[#800020]/50">
        We couldn't find anything matching "{query}". Try searching for
        another product, brand, or category.
      </p>

      <div className="mt-7 flex flex-wrap justify-center gap-3">
        {popularSearches.slice(0, 3).map((search) => (
          <span
            key={search}
            className="rounded-full bg-[#F7ADAD]/30 px-4 py-2 text-xs font-medium"
          >
            {search}
          </span>
        ))}
      </div>

      <button
        type="button"
        onClick={onClear}
        className="mt-7 rounded-full bg-[#800020] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#D45060]"
      >
        Back to Search
      </button>
    </div>
  );
}