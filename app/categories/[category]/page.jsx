"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useParams } from "next/navigation";

import products from "../../../data/products";
import categories from "../../../data/categories";

export default function CategoryPage() {
  const params = useParams();
  const category = params?.category?.toLowerCase();

  const currentCategory = categories.find(
    (item) => item.slug === category
  );

  const [selectedSubcategory, setSelectedSubcategory] = useState("All");
  const [sortBy, setSortBy] = useState("recommended");
  const [wishlist, setWishlist] = useState([]);

  const categoryProducts = useMemo(() => {
    if (!currentCategory) return [];

    let result = products.filter(
      (product) => product.category === category
    );

    if (selectedSubcategory !== "All") {
      const selectedSlug = selectedSubcategory.toLowerCase();

      result = result.filter(
        (product) =>
          product.subcategory?.toLowerCase() === selectedSlug ||
          product.subcategory
            ?.toLowerCase()
            .replace(/\s+/g, "-") === selectedSlug
      );
    }

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;

      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;

      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;

      case "discount":
        result.sort((a, b) => b.discount - a.discount);
        break;

      default:
        break;
    }

    return result;
  }, [category, currentCategory, selectedSubcategory, sortBy]);

  const toggleWishlist = (id) => {
    setWishlist((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  if (!currentCategory) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7ADAD]/30 px-6">
        <div className="max-w-lg rounded-[2rem] border border-[#800020]/10 bg-white p-10 text-center shadow-xl">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#800020] text-2xl font-black text-[#F7ADAD]">
            P
          </div>

          <h1 className="mt-6 text-3xl font-bold text-[#800020]">
            Category Not Found
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#800020]/60">
            The category you're looking for doesn't exist in the Pinnacle
            collection.
          </p>

          <Link
            href="/categories"
            className="mt-7 inline-block rounded-full bg-[#800020] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#D45060]"
          >
            Back to Categories
          </Link>
        </div>
      </main>
    );
  }

  const subcategories = currentCategory.subcategories || [];

  return (
    <main className="min-h-screen bg-[#F7ADAD]/30 text-[#800020]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#800020] px-6 py-16 text-[#F7ADAD] md:px-12 lg:px-20">
        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#D45060]/30 blur-3xl" />

        <div className="absolute -bottom-40 left-10 h-96 w-96 rounded-full bg-[#F7ADAD]/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-[1fr_280px]">
          <div>
            <div className="mb-5 flex items-center gap-3 text-sm">
              <Link
                href="/"
                className="text-[#F7ADAD]/50 transition hover:text-[#F7ADAD]"
              >
                Home
              </Link>

              <span className="text-[#F7ADAD]/30">/</span>

              <Link
                href="/categories"
                className="text-[#F7ADAD]/50 transition hover:text-[#F7ADAD]"
              >
                Categories
              </Link>

              <span className="text-[#F7ADAD]/30">/</span>

              <span className="text-[#D45060]">
                {currentCategory.name}
              </span>
            </div>

            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#D45060]">
              Pinnacle Collection
            </p>

            <h1 className="mt-3 text-5xl font-bold tracking-tight sm:text-6xl">
              {currentCategory.name}
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#F7ADAD]/70 sm:text-base">
              {currentCategory.description}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              {subcategories.map((subcategory) => {
                const name = subcategory.name || subcategory;

                return (
                  <button
                    key={subcategory.id || subcategory.slug || name}
                    type="button"
                    onClick={() => setSelectedSubcategory(name)}
                    className="rounded-full border border-[#F7ADAD]/15 bg-white/5 px-4 py-2 text-xs font-medium text-[#F7ADAD]/80 backdrop-blur-md transition hover:border-[#D45060]/60 hover:bg-[#D45060]/20"
                  >
                    {name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* CATEGORY IMAGE */}
          <div className="relative mx-auto flex h-64 w-64 items-center justify-center">
            <div className="absolute h-64 w-64 rounded-full border border-[#F7ADAD]/10" />

            <div className="absolute h-48 w-48 rounded-full border border-[#D45060]/30" />

            <div className="relative h-40 w-40 rotate-6 overflow-hidden rounded-[2rem] bg-[#F7ADAD] shadow-2xl transition-transform duration-500 hover:rotate-0 hover:scale-105">
              {currentCategory.image ? (
                <img
                  src={currentCategory.image}
                  alt={currentCategory.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <span className="text-6xl font-black text-[#800020]">
                    {currentCategory.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SUBCATEGORY NAVIGATION */}
      <section className="border-b border-[#800020]/10 bg-white px-6 py-5 md:px-12 lg:px-20">
        <div className="mx-auto flex max-w-7xl items-center gap-3 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => setSelectedSubcategory("All")}
            className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition ${
              selectedSubcategory === "All"
                ? "bg-[#800020] text-white"
                : "bg-[#F7ADAD]/30 text-[#800020]/70 hover:bg-[#F7ADAD]/60"
            }`}
          >
            All {currentCategory.name}
          </button>

          {subcategories.map((subcategory) => {
            const name = subcategory.name || subcategory;

            return (
              <button
                key={subcategory.id || subcategory.slug || name}
                type="button"
                onClick={() => setSelectedSubcategory(name)}
                className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                  selectedSubcategory === name
                    ? "bg-[#800020] text-white"
                    : "bg-[#F7ADAD]/30 text-[#800020]/70 hover:bg-[#F7ADAD]/60"
                }`}
              >
                {name}
              </button>
            );
          })}
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="mx-auto max-w-7xl px-6 py-10 md:px-12 lg:px-20">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#D45060]">
              Curated For You
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {selectedSubcategory === "All"
                ? `Explore ${currentCategory.name}`
                : selectedSubcategory}
            </h2>

            <p className="mt-2 text-sm text-[#800020]/50">
              {categoryProducts.length} products available
            </p>
          </div>

          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className="rounded-full border border-[#800020]/15 bg-white px-5 py-3 text-sm font-medium outline-none"
          >
            <option value="recommended">Recommended</option>
            <option value="price-low">Price: Low → High</option>
            <option value="price-high">Price: High → Low</option>
            <option value="rating">Rating</option>
            <option value="discount">Discount</option>
          </select>
        </div>

        {categoryProducts.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categoryProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlist.includes(product.id)}
                toggleWishlist={toggleWishlist}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-[2rem] border border-[#800020]/10 bg-white p-12 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#F7ADAD]/50 text-2xl font-black">
              P
            </div>

            <h2 className="mt-6 text-2xl font-bold">
              No products found
            </h2>

            <p className="mt-2 text-sm text-[#800020]/50">
              Try another subcategory.
            </p>

            <button
              type="button"
              onClick={() => setSelectedSubcategory("All")}
              className="mt-6 rounded-full bg-[#800020] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#D45060]"
            >
              View All Products
            </button>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="px-6 pb-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#800020] px-8 py-12 text-center text-[#F7ADAD]">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D45060]">
            Pinnacle
          </p>

          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Find something you love.
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#F7ADAD]/60">
            Explore our complete collection and discover products curated for
            every part of your lifestyle.
          </p>

          <Link
            href="/shop"
            className="mt-7 inline-block rounded-full bg-[#D45060] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#F7ADAD] hover:text-[#800020]"
          >
            Explore All Products
          </Link>
        </div>
      </section>
    </main>
  );
}

function ProductCard({ product, isWishlisted, toggleWishlist }) {
  /*
    IMPORTANT:
    Product images are stored inside:

    public/products/

    Example:
    public/products/classic-oversized-jacket.jpg

    The product slug is used to create the exact public URL.
  */
  const image = product?.slug
    ? `/products/${product.slug}.jpg`
    : product?.images?.[0] || null;

  return (
    <article className="group overflow-hidden rounded-3xl border border-[#800020]/10 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#F7ADAD]/35">
        <Link
          href={`/product/${product.id}`}
          className="relative block h-full w-full"
        >
          {image ? (
            <img
              src={image}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <div className="flex h-32 w-32 items-center justify-center rounded-full bg-[#800020] text-3xl font-black text-[#F7ADAD]">
                P
              </div>
            </div>
          )}
        </Link>

        <span className="absolute left-3 top-3 rounded-full bg-[#D45060] px-3 py-1.5 text-[11px] font-bold text-white">
          {product.discount}% OFF
        </span>

        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          aria-label="Toggle wishlist"
          className={`absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/85 text-lg shadow-md backdrop-blur-md transition ${
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
          {product.subcategory}
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
            ({product.reviewCount || 0})
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