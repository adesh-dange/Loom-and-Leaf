"use client";

import { useState } from "react";

const defaultCategories = [
  "All Products",
  "Fashion",
  "Electronics",
  "Home & Living",
  "Beauty",
];

export default function Filters({
  categories = defaultCategories,
  onFilterChange,
}) {
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [priceRange, setPriceRange] = useState(10000);
  const [selectedRating, setSelectedRating] = useState(0);
  const [sortBy, setSortBy] = useState("featured");
  const [inStock, setInStock] = useState(false);
  const [discountOnly, setDiscountOnly] = useState(false);

  const updateFilter = (updates) => {
    const nextFilters = {
      category: selectedCategory,
      maxPrice: priceRange,
      rating: selectedRating,
      sortBy,
      inStock,
      discountOnly,
      ...updates,
    };

    if (onFilterChange) {
      onFilterChange(nextFilters);
    }
  };

  const handleCategory = (category) => {
    setSelectedCategory(category);
    updateFilter({ category });
  };

  const handlePrice = (value) => {
    const price = Number(value);

    setPriceRange(price);
    updateFilter({ maxPrice: price });
  };

  const handleRating = (rating) => {
    setSelectedRating(rating);
    updateFilter({ rating });
  };

  const handleSort = (value) => {
    setSortBy(value);
    updateFilter({ sortBy: value });
  };

  const resetFilters = () => {
    setSelectedCategory("All Products");
    setPriceRange(10000);
    setSelectedRating(0);
    setSortBy("featured");
    setInStock(false);
    setDiscountOnly(false);

    if (onFilterChange) {
      onFilterChange({
        category: "All Products",
        maxPrice: 10000,
        rating: 0,
        sortBy: "featured",
        inStock: false,
        discountOnly: false,
      });
    }
  };

  return (
    <aside className="w-full rounded-3xl border border-[#800020]/10 bg-white p-6 shadow-sm">
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-[#800020]/10 pb-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D45060]">
            Refine
          </p>

          <h2 className="mt-1 text-xl font-bold text-[#800020]">
            Filters
          </h2>
        </div>

        <button
          type="button"
          onClick={resetFilters}
          className="text-xs font-bold text-[#D45060] transition hover:text-[#800020]"
        >
          Reset
        </button>
      </div>

      {/* CATEGORY */}
      <div className="border-b border-[#800020]/10 py-6">
        <h3 className="text-sm font-bold text-[#800020]">Category</h3>

        <div className="mt-4 space-y-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => handleCategory(category)}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition ${
                selectedCategory === category
                  ? "bg-[#800020] font-bold text-white"
                  : "text-[#800020]/65 hover:bg-[#F7ADAD]/30 hover:text-[#800020]"
              }`}
            >
              <span>{category}</span>

              {selectedCategory === category && (
                <span className="text-[#F7ADAD]">✓</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* PRICE */}
      <div className="border-b border-[#800020]/10 py-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#800020]">
            Maximum Price
          </h3>

          <span className="rounded-full bg-[#F7ADAD]/40 px-3 py-1 text-xs font-bold text-[#800020]">
            ₹{priceRange.toLocaleString("en-IN")}
          </span>
        </div>

        <input
          type="range"
          min="500"
          max="10000"
          step="500"
          value={priceRange}
          onChange={(e) => handlePrice(e.target.value)}
          className="mt-5 w-full accent-[#800020]"
        />

        <div className="mt-2 flex justify-between text-[10px] font-medium text-gray-400">
          <span>₹500</span>
          <span>₹10,000+</span>
        </div>
      </div>

      {/* RATING */}
      <div className="border-b border-[#800020]/10 py-6">
        <h3 className="text-sm font-bold text-[#800020]">
          Customer Rating
        </h3>

        <div className="mt-4 space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              type="button"
              onClick={() =>
                handleRating(selectedRating === rating ? 0 : rating)
              }
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                selectedRating === rating
                  ? "bg-[#F7ADAD]/40"
                  : "hover:bg-[#F7ADAD]/20"
              }`}
            >
              <span
                className={`flex h-5 w-5 items-center justify-center rounded border text-xs ${
                  selectedRating === rating
                    ? "border-[#800020] bg-[#800020] text-white"
                    : "border-gray-300 text-transparent"
                }`}
              >
                ✓
              </span>

              <span className="text-[#D45060]">
                {"★".repeat(rating)}
                <span className="text-gray-300">
                  {"★".repeat(5 - rating)}
                </span>
              </span>

              <span className="text-xs text-gray-500">
                & above
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* AVAILABILITY */}
      <div className="border-b border-[#800020]/10 py-6">
        <h3 className="text-sm font-bold text-[#800020]">
          Availability
        </h3>

        <label className="mt-4 flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 transition hover:bg-[#F7ADAD]/20">
          <span className="text-sm text-[#800020]/70">
            In Stock Only
          </span>

          <button
            type="button"
            role="switch"
            aria-checked={inStock}
            onClick={() => {
              const value = !inStock;
              setInStock(value);
              updateFilter({ inStock: value });
            }}
            className={`relative h-6 w-11 rounded-full transition ${
              inStock ? "bg-[#800020]" : "bg-gray-200"
            }`}
          >
            <span
              className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${
                inStock ? "left-6" : "left-1"
              }`}
            />
          </button>
        </label>

        <label className="mt-2 flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 transition hover:bg-[#F7ADAD]/20">
          <span className="text-sm text-[#800020]/70">
            Discounted Products
          </span>

          <button
            type="button"
            role="switch"
            aria-checked={discountOnly}
            onClick={() => {
              const value = !discountOnly;
              setDiscountOnly(value);
              updateFilter({ discountOnly: value });
            }}
            className={`relative h-6 w-11 rounded-full transition ${
              discountOnly ? "bg-[#800020]" : "bg-gray-200"
            }`}
          >
            <span
              className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${
                discountOnly ? "left-6" : "left-1"
              }`}
            />
          </button>
        </label>
      </div>

      {/* SORT */}
      <div className="py-6">
        <h3 className="text-sm font-bold text-[#800020]">
          Sort By
        </h3>

        <select
          value={sortBy}
          onChange={(e) => handleSort(e.target.value)}
          className="mt-4 w-full rounded-xl border border-[#800020]/10 bg-[#F7ADAD]/20 px-4 py-3 text-sm font-semibold text-[#800020] outline-none transition focus:border-[#D45060] focus:ring-2 focus:ring-[#D45060]/10"
        >
          <option value="featured">Featured</option>
          <option value="newest">Newest</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
          <option value="discount">Biggest Discount</option>
        </select>
      </div>

      {/* APPLY */}
      <button
        type="button"
        onClick={() =>
          updateFilter({
            category: selectedCategory,
            maxPrice: priceRange,
            rating: selectedRating,
            sortBy,
            inStock,
            discountOnly,
          })
        }
        className="w-full rounded-xl bg-[#800020] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#800020]/15 transition hover:bg-[#D45060] active:scale-[0.98]"
      >
        Apply Filters
      </button>
    </aside>
  );
}