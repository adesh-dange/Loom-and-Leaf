"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import products from "../../data/products";

const categories = [
  "All",
  "Fashion",
  "Electronics",
  "Home & Living",
  "Beauty",
];

const priceRanges = [
  { label: "Under ₹1,000", min: 0, max: 999 },
  { label: "₹1,000 – ₹2,500", min: 1000, max: 2500 },
  { label: "₹2,500 – ₹5,000", min: 2500, max: 5000 },
  { label: "₹5,000+", min: 5000, max: Infinity },
];

/* =========================================================
   SHOP PRODUCTS
   Ensures Everyday Canvas Tote is always available
========================================================= */

const everydayCanvasTote = {
  id: "everyday-tote-bag",
  name: "Everyday Canvas Tote",
  slug: "everyday-tote-bag",
  category: "Fashion",
  subcategory: "Bags",
  brand: "Pinnacle",
  price: 1499,
  originalPrice: 1999,
  discount: 25,
  rating: 4.6,
  reviewCount: 128,
  stock: 18,
  badge: "Bestseller",
  featured: true,
  colors: ["Natural", "Black", "Burgundy"],
  sizes: ["One Size"],
  images: ["/products/everyday-tote-bag.jpg"],
  shortDescription:
    "A versatile everyday canvas tote designed for style, comfort and daily use.",
  description:
    "A premium everyday canvas tote with a spacious interior and minimal design. Perfect for college, work, shopping and casual everyday use.",
  specifications: {
    Material: "Premium Canvas",
    Closure: "Open Top",
    Capacity: "Large",
    "Handle Type": "Dual Handle",
  },
  tags: ["tote", "bag", "canvas", "fashion", "everyday"],
};

const shopProducts = (() => {
  const source = Array.isArray(products) ? [...products] : [];

  const existingTote = source.find(
    (product) =>
      product?.id === "everyday-tote-bag" ||
      product?.slug === "everyday-tote-bag" ||
      product?.name?.toLowerCase() === "everyday canvas tote"
  );

  if (!existingTote) {
    source.push(everydayCanvasTote);
  }

  return source;
})();

/* =========================================================
   SHOP PAGE
========================================================= */

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [sortBy, setSortBy] = useState("recommended");
  const [showFilters, setShowFilters] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [search, setSearch] = useState("");

  /* =====================================================
     PRICE FILTER
  ===================================================== */

  const togglePrice = (label) => {
    setSelectedPrices((current) =>
      current.includes(label)
        ? current.filter((item) => item !== label)
        : [...current, label]
    );
  };

  /* =====================================================
     WISHLIST
  ===================================================== */

  const toggleWishlist = (id) => {
    setWishlist((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  /* =====================================================
     CLEAR FILTERS
  ===================================================== */

  const clearFilters = () => {
    setSelectedCategory("All");
    setSelectedPrices([]);
    setSelectedRating(0);
    setSearch("");
  };

  /* =====================================================
     FILTER + SEARCH + SORT
  ===================================================== */

  const filteredProducts = useMemo(() => {
    let result = [...shopProducts];

    /* Category */

    if (selectedCategory !== "All") {
      result = result.filter(
        (product) =>
          product?.category?.toLowerCase() ===
          selectedCategory.toLowerCase()
      );
    }

    /* Price */

    if (selectedPrices.length > 0) {
      result = result.filter((product) =>
        selectedPrices.some((rangeLabel) => {
          const range = priceRanges.find(
            (item) => item.label === rangeLabel
          );

          return (
            range &&
            Number(product?.price || 0) >= range.min &&
            Number(product?.price || 0) <= range.max
          );
        })
      );
    }

    /* Rating */

    if (selectedRating > 0) {
      result = result.filter(
        (product) => Number(product?.rating || 0) >= selectedRating
      );
    }

    /* Search */

    if (search.trim()) {
      const query = search.toLowerCase().trim();

      result = result.filter((product) => {
        const tags = Array.isArray(product?.tags)
          ? product.tags
          : [];

        return (
          product?.name?.toLowerCase().includes(query) ||
          product?.brand?.toLowerCase().includes(query) ||
          product?.category?.toLowerCase().includes(query) ||
          product?.subcategory?.toLowerCase().includes(query) ||
          product?.description?.toLowerCase().includes(query) ||
          tags.some((tag) =>
            String(tag).toLowerCase().includes(query)
          )
        );
      });
    }

    /* Sort */

    switch (sortBy) {
      case "price-low":
        result.sort(
          (a, b) =>
            Number(a?.price || 0) - Number(b?.price || 0)
        );
        break;

      case "price-high":
        result.sort(
          (a, b) =>
            Number(b?.price || 0) - Number(a?.price || 0)
        );
        break;

      case "rating":
        result.sort(
          (a, b) =>
            Number(b?.rating || 0) - Number(a?.rating || 0)
        );
        break;

      case "discount":
        result.sort(
          (a, b) =>
            Number(b?.discount || 0) -
            Number(a?.discount || 0)
        );
        break;

      case "popular":
        result.sort(
          (a, b) =>
            Number(b?.reviewCount || b?.reviews || 0) -
            Number(a?.reviewCount || a?.reviews || 0)
        );
        break;

      case "newest":
        result.reverse();
        break;

      default:
        break;
    }

    return result;
  }, [
    selectedCategory,
    selectedPrices,
    selectedRating,
    sortBy,
    search,
  ]);

  return (
    <main className="min-h-screen bg-[#F7ADAD]/30 text-[#800020]">

      {/* =================================================
          HEADER
      ================================================= */}

      <section className="relative overflow-hidden bg-[#800020] px-6 py-16 text-[#F7ADAD] md:px-12 lg:px-20">

        <div className="absolute -right-20 -top-32 h-72 w-72 rounded-full bg-[#D45060]/30 blur-3xl" />

        <div className="absolute -bottom-40 left-10 h-80 w-80 rounded-full bg-[#F7ADAD]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">

          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#D45060]">
            Pinnacle Collection
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Shop Everything
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-[#F7ADAD]/70 sm:text-base">
            Discover carefully curated products across fashion,
            electronics, home & living, and beauty.
          </p>

          {/* Search */}

          <div className="mt-8 max-w-2xl">

            <div className="flex items-center rounded-full border border-white/10 bg-white/10 p-1.5 backdrop-blur-md">

              <span className="pl-4 text-lg text-[#F7ADAD]/60">
                ⌕
              </span>

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search products, brands or categories..."
                className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-[#F7ADAD]/50"
              />

              <button
                type="button"
                onClick={() => setSearch(search.trim())}
                className="rounded-full bg-[#D45060] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#F7ADAD] hover:text-[#800020]"
              >
                Search
              </button>

            </div>

          </div>

        </div>

      </section>

      {/* =================================================
          CATEGORIES
      ================================================= */}

      <section className="border-b border-[#800020]/10 bg-white px-6 py-5 md:px-12 lg:px-20">

        <div className="mx-auto flex max-w-7xl gap-3 overflow-x-auto pb-1">

          {categories.map((category) => (

            <button
              key={category}
              type="button"
              onClick={() =>
                setSelectedCategory(category)
              }
              className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-[#800020] text-white shadow-md"
                  : "bg-[#F7ADAD]/30 text-[#800020]/70 hover:bg-[#F7ADAD]/60"
              }`}
            >
              {category}
            </button>

          ))}

        </div>

      </section>

      {/* =================================================
          MAIN SHOP
      ================================================= */}

      <section className="mx-auto max-w-7xl px-6 py-8 md:px-12 lg:px-20">

        <div className="flex gap-8">

          {/* Desktop Filters */}

          <aside className="hidden w-64 shrink-0 lg:block">

            <FilterPanel
              selectedPrices={selectedPrices}
              togglePrice={togglePrice}
              selectedRating={selectedRating}
              setSelectedRating={setSelectedRating}
              clearFilters={clearFilters}
            />

          </aside>

          {/* Product Area */}

          <div className="min-w-0 flex-1">

            {/* Toolbar */}

            <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-[#800020]/10 bg-white/70 p-4 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">

              <div>

                <p className="text-sm font-semibold text-[#800020]">
                  {filteredProducts.length} Products
                </p>

                <p className="mt-1 text-xs text-[#800020]/50">
                  Discover your next favorite product
                </p>

              </div>

              <div className="flex gap-3">

                <button
                  type="button"
                  onClick={() => setShowFilters(true)}
                  className="rounded-full border border-[#800020]/15 px-4 py-2.5 text-sm font-semibold lg:hidden"
                >
                  Filters
                </button>

                <select
                  value={sortBy}
                  onChange={(event) =>
                    setSortBy(event.target.value)
                  }
                  className="rounded-full border border-[#800020]/15 bg-white px-4 py-2.5 text-sm font-medium text-[#800020] outline-none"
                >
                  <option value="recommended">
                    Recommended
                  </option>

                  <option value="popular">
                    Popularity
                  </option>

                  <option value="newest">
                    Newest
                  </option>

                  <option value="price-low">
                    Price: Low → High
                  </option>

                  <option value="price-high">
                    Price: High → Low
                  </option>

                  <option value="rating">
                    Rating
                  </option>

                  <option value="discount">
                    Discount
                  </option>

                </select>

              </div>

            </div>

            {/* Active Filters */}

            {(selectedCategory !== "All" ||
              selectedPrices.length > 0 ||
              selectedRating > 0 ||
              search) && (

              <div className="mb-6 flex flex-wrap items-center gap-2">

                <span className="mr-1 text-xs font-semibold uppercase tracking-wider text-[#800020]/50">
                  Active:
                </span>

                {selectedCategory !== "All" && (
                  <FilterChip
                    label={selectedCategory}
                    onRemove={() =>
                      setSelectedCategory("All")
                    }
                  />
                )}

                {selectedPrices.map((price) => (
                  <FilterChip
                    key={price}
                    label={price}
                    onRemove={() => togglePrice(price)}
                  />
                ))}

                {selectedRating > 0 && (
                  <FilterChip
                    label={`${selectedRating}★ & above`}
                    onRemove={() =>
                      setSelectedRating(0)
                    }
                  />
                )}

                {search && (
                  <FilterChip
                    label={`"${search}"`}
                    onRemove={() => setSearch("")}
                  />
                )}

                <button
                  type="button"
                  onClick={clearFilters}
                  className="ml-1 text-xs font-semibold text-[#D45060] hover:text-[#800020]"
                >
                  Clear All
                </button>

              </div>

            )}

            {/* Products */}

            {filteredProducts.length > 0 ? (

              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

                {filteredProducts.map((product) => (

                  <ProductCard
                    key={product.id}
                    product={product}
                    isWishlisted={wishlist.includes(
                      product.id
                    )}
                    toggleWishlist={toggleWishlist}
                  />

                ))}

              </div>

            ) : (

              <EmptyResults
                clearFilters={clearFilters}
              />

            )}

          </div>

        </div>

      </section>

      {/* =================================================
          MOBILE FILTER
      ================================================= */}

      {showFilters && (

        <div className="fixed inset-0 z-50 lg:hidden">

          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setShowFilters(false)}
            className="absolute inset-0 bg-[#800020]/40 backdrop-blur-sm"
          />

          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-[2rem] bg-white p-6 shadow-2xl">

            <div className="mx-auto mb-6 h-1 w-12 rounded-full bg-[#800020]/15" />

            <div className="mb-5 flex items-center justify-between">

              <h2 className="text-xl font-bold">
                Filters
              </h2>

              <button
                type="button"
                onClick={() => setShowFilters(false)}
                className="rounded-full bg-[#F7ADAD]/40 px-3 py-1.5 text-sm"
              >
                Close
              </button>

            </div>

            <FilterPanel
              selectedPrices={selectedPrices}
              togglePrice={togglePrice}
              selectedRating={selectedRating}
              setSelectedRating={setSelectedRating}
              clearFilters={clearFilters}
            />

            <button
              type="button"
              onClick={() => setShowFilters(false)}
              className="mt-7 w-full rounded-full bg-[#800020] py-3.5 text-sm font-semibold text-white"
            >
              Show {filteredProducts.length} Products
            </button>

          </div>

        </div>

      )}

    </main>
  );
}

/* =========================================================
   FILTER PANEL
========================================================= */

function FilterPanel({
  selectedPrices,
  togglePrice,
  selectedRating,
  setSelectedRating,
  clearFilters,
}) {
  return (
    <div className="rounded-3xl border border-[#800020]/10 bg-white p-6">

      <div className="mb-7 flex items-center justify-between">

        <h2 className="font-bold">
          Filters
        </h2>

        <button
          type="button"
          onClick={clearFilters}
          className="text-xs font-semibold text-[#D45060] hover:text-[#800020]"
        >
          Clear
        </button>

      </div>

      {/* Price */}

      <div className="border-b border-[#800020]/10 pb-6">

        <h3 className="mb-4 text-sm font-bold">
          Price
        </h3>

        <div className="space-y-3">

          {priceRanges.map((range) => (

            <label
              key={range.label}
              className="flex cursor-pointer items-center gap-3 text-sm text-[#800020]/70"
            >

              <input
                type="checkbox"
                checked={selectedPrices.includes(
                  range.label
                )}
                onChange={() =>
                  togglePrice(range.label)
                }
                className="h-4 w-4 accent-[#800020]"
              />

              {range.label}

            </label>

          ))}

        </div>

      </div>

      {/* Rating */}

      <div className="pt-6">

        <h3 className="mb-4 text-sm font-bold">
          Customer Rating
        </h3>

        <div className="space-y-3">

          {[4, 3, 2, 1].map((rating) => (

            <button
              key={rating}
              type="button"
              onClick={() =>
                setSelectedRating(
                  selectedRating === rating
                    ? 0
                    : rating
                )
              }
              className={`flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm transition ${
                selectedRating === rating
                  ? "bg-[#F7ADAD]/40 font-semibold"
                  : "hover:bg-[#F7ADAD]/20"
              }`}
            >

              <span className="text-[#D45060]">

                {"★".repeat(rating)}

                <span className="text-[#800020]/15">
                  {"★".repeat(5 - rating)}
                </span>

              </span>

              <span>
                {rating}+ & above
              </span>

            </button>

          ))}

        </div>

      </div>

    </div>
  );
}

/* =========================================================
   PRODUCT CARD
========================================================= */

function ProductCard({
  product,
  isWishlisted,
  toggleWishlist,
}) {
  const image =
  product?.id === "everyday-tote-bag"
    ? "/products/everyday-tote-bag.jpg"
    : product?.slug
      ? `/products/${product.slug}.jpg`
      : product?.images?.[0] || null;

  return (
    <article className="group overflow-hidden rounded-3xl border border-[#800020]/10 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

      {/* Product Image */}

      <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#F7ADAD]/35">

        <Link
          href={`/product/${product.id}`}
          className="block h-full w-full"
        >

          {image ? (

            <img
              src={image}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src =
                  "/images/placeholder.jpg";
              }}
            />

          ) : (

            <div className="flex h-full w-full items-center justify-center">

              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-[#800020] text-2xl font-black text-[#F7ADAD]">
                P
              </div>

            </div>

          )}

        </Link>

        {/* Discount */}

        {Number(product?.discount || 0) > 0 && (

          <span className="absolute left-3 top-3 rounded-full bg-[#D45060] px-3 py-1.5 text-[11px] font-bold text-white shadow-md">
            {product.discount}% OFF
          </span>

        )}

        {/* Wishlist */}

        <button
          type="button"
          onClick={() =>
            toggleWishlist(product.id)
          }
          aria-label={
            isWishlisted
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
          className={`absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-white/80 text-lg shadow-sm backdrop-blur-md transition-all hover:scale-110 ${
            isWishlisted
              ? "text-[#D45060]"
              : "text-[#800020] hover:text-[#D45060]"
          }`}
        >
          {isWishlisted ? "♥" : "♡"}
        </button>

        {/* Quick View */}

        <Link
          href={`/product/${product.id}`}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 translate-y-14 rounded-full bg-white/95 px-5 py-2.5 text-xs font-semibold text-[#800020] opacity-0 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-[#D45060] hover:text-white"
        >
          Quick View
        </Link>

      </div>

      {/* Product Information */}

      <div className="px-2 pb-2 pt-5">

        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D45060]">
          {product?.brand || "Pinnacle"}
        </p>

        <Link href={`/product/${product.id}`}>

          <h3 className="mt-1 min-h-12 text-sm font-bold leading-6 text-[#800020] transition-colors hover:text-[#D45060]">
            {product?.name}
          </h3>

        </Link>

        {/* Rating */}

        <div className="mt-2 flex items-center gap-2">

          <span className="rounded-md bg-[#F7ADAD]/40 px-2 py-1 text-xs font-bold text-[#800020]">
            {product?.rating || 0} ★
          </span>

          <span className="text-xs text-[#800020]/45">
            ({product?.reviewCount ?? product?.reviews ?? 0})
          </span>

        </div>

        {/* Price */}

        <div className="mt-4 flex flex-wrap items-end gap-2">

          <span className="text-lg font-bold text-[#800020]">
            ₹{Number(product?.price || 0).toLocaleString("en-IN")}
          </span>

          {product?.originalPrice && (

            <span className="text-xs text-[#800020]/35 line-through">
              ₹
              {Number(product.originalPrice).toLocaleString(
                "en-IN"
              )}
            </span>

          )}

        </div>

        {/* Stock */}

        {product?.stock !== undefined && (

          <p
            className={`mt-2 text-[10px] font-semibold ${
              product.stock <= 5
                ? "text-[#D45060]"
                : "text-[#800020]/45"
            }`}
          >
            {product.stock <= 5
              ? `Only ${product.stock} left`
              : "In stock"}
          </p>

        )}

        {/* Add To Cart */}

        <button
          type="button"
          className="mt-4 w-full rounded-full bg-[#800020] py-3 text-xs font-semibold text-white transition-all duration-300 hover:bg-[#D45060]"
        >
          Add to Cart
        </button>

      </div>

    </article>
  );
}

/* =========================================================
   FILTER CHIP
========================================================= */

function FilterChip({ label, onRemove }) {
  return (
    <button
      type="button"
      onClick={onRemove}
      className="flex items-center gap-2 rounded-full bg-[#800020] px-3 py-1.5 text-xs font-medium text-white"
    >
      {label}

      <span className="text-[#F7ADAD]">
        ×
      </span>
    </button>
  );
}

/* =========================================================
   EMPTY RESULTS
========================================================= */

function EmptyResults({ clearFilters }) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border border-[#800020]/10 bg-white p-8 text-center">

      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#F7ADAD]/50 text-2xl font-black text-[#800020]">
        P
      </div>

      <h2 className="mt-6 text-2xl font-bold">
        No products found
      </h2>

      <p className="mt-2 max-w-md text-sm leading-6 text-[#800020]/50">
        We couldn't find products matching your
        current filters. Try changing your search
        or removing some filters.
      </p>

      <button
        type="button"
        onClick={clearFilters}
        className="mt-6 rounded-full bg-[#800020] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#D45060]"
      >
        Clear Filters
      </button>

    </div>
  );
}