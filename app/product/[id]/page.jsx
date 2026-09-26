"use client";

import Link from "next/link";
import { use, useState } from "react";

import products from "../../../data/products";

export default function ProductPage({ params }) {
  const { id } = use(params);

  const product =
    products.find((item) => item.id === id) ||
    products.find((item) => item.slug === id);

  if (!product) {
    return <ProductNotFound />;
  }

  const productImage = `/products/${product.slug}.jpg`;

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(
    product.colors?.[0] || ""
  );
  const [selectedSize, setSelectedSize] = useState(
    product.sizes?.[0] || ""
  );
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [addedToCart, setAddedToCart] = useState(false);

  const increaseQuantity = () => {
    setQuantity((current) => Math.min(current + 1, 10));
  };

  const decreaseQuantity = () => {
    setQuantity((current) => Math.max(current - 1, 1));
  };

  const handleAddToCart = () => {
    setAddedToCart(true);

    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

  const galleryImages = [
    productImage,
    productImage,
    productImage,
    productImage,
  ];

  const relatedProducts = products
    .filter((item) => item.id !== product.id)
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-[#F7ADAD]/30 text-[#800020]">
      {/* Breadcrumb */}
      <div className="border-b border-[#800020]/10 bg-white px-6 py-4 md:px-12 lg:px-20">
        <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto whitespace-nowrap text-xs">
          <Link
            href="/"
            className="text-[#800020]/45 transition hover:text-[#D45060]"
          >
            Home
          </Link>

          <span className="text-[#800020]/20">/</span>

          <Link
            href="/shop"
            className="text-[#800020]/45 transition hover:text-[#D45060]"
          >
            Shop
          </Link>

          <span className="text-[#800020]/20">/</span>

          <Link
            href={`/categories/${product.category
              ?.toLowerCase()
              .replace(/\s+/g, "-")}`}
            className="text-[#800020]/45 transition hover:text-[#D45060]"
          >
            {product.category}
          </Link>

          <span className="text-[#800020]/20">/</span>

          <span className="font-medium">{product.name}</span>
        </div>
      </div>

      {/* Product Main Section */}
      <section className="mx-auto max-w-7xl px-6 py-10 md:px-12 lg:px-20">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Product Gallery */}
          <div>
            <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-[#800020]/10 bg-white shadow-sm">
              {/* Discount */}
              {product.discount > 0 && (
                <span className="absolute left-5 top-5 z-20 rounded-full bg-[#D45060] px-4 py-2 text-xs font-bold text-white">
                  {product.discount}% OFF
                </span>
              )}

              {/* Wishlist */}
              <button
                type="button"
                onClick={() => setIsWishlisted((current) => !current)}
                aria-label="Toggle wishlist"
                className={`absolute right-5 top-5 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-[#800020]/10 bg-white/90 text-xl shadow-md backdrop-blur-md transition hover:scale-105 ${
                  isWishlisted
                    ? "text-[#D45060]"
                    : "text-[#800020] hover:text-[#D45060]"
                }`}
              >
                {isWishlisted ? "♥" : "♡"}
              </button>

              {/* Main Image */}
              <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#F7ADAD]/25">
                <div className="absolute h-80 w-80 rounded-full bg-[#D45060]/10 blur-3xl" />

                <img
                  src={galleryImages[selectedImage]}
                  alt={product.name}
                  className="relative z-10 h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />

                {/* Product View Label */}
                <div className="absolute bottom-6 right-6 z-20 rounded-2xl border border-white/60 bg-white/80 px-4 py-3 shadow-lg backdrop-blur-md">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#800020]/50">
                    Product View
                  </p>

                  <p className="mt-1 text-xs font-bold text-[#800020]">
                    {selectedImage + 1} / {galleryImages.length}
                  </p>
                </div>
              </div>
            </div>

            {/* Gallery Thumbnails */}
            <div className="mt-4 grid grid-cols-4 gap-3">
              {galleryImages.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square overflow-hidden rounded-2xl border transition ${
                    selectedImage === index
                      ? "border-[#800020] bg-[#F7ADAD]/50 ring-2 ring-[#800020]/10"
                      : "border-[#800020]/10 bg-white hover:border-[#D45060]"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />

                  {selectedImage === index && (
                    <div className="absolute inset-0 border-2 border-[#800020]/30" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div className="flex flex-col">
            {/* Brand */}
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#D45060]">
              {product.brand}
            </p>

            {/* Name */}
            <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <span className="rounded-lg bg-[#F7ADAD]/50 px-3 py-2 text-sm font-bold">
                {product.rating} ★
              </span>

              <span className="text-sm text-[#800020]/50">
                {product.reviewCount || 0} Ratings & Reviews
              </span>

              <span className="h-1 w-1 rounded-full bg-[#800020]/20" />

              <span className="text-sm font-medium text-green-700">
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            {/* Price */}
            <div className="mt-7 border-y border-[#800020]/10 py-6">
              <div className="flex flex-wrap items-end gap-3">
                <span className="text-4xl font-bold">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>

                {product.originalPrice && (
                  <span className="pb-1 text-lg text-[#800020]/35 line-through">
                    ₹{product.originalPrice.toLocaleString("en-IN")}
                  </span>
                )}

                {product.discount > 0 && (
                  <span className="pb-1 text-sm font-bold text-[#D45060]">
                    {product.discount}% off
                  </span>
                )}
              </div>

              <p className="mt-2 text-xs text-[#800020]/45">
                Inclusive of all applicable taxes
              </p>
            </div>

            {/* Description */}
            <p className="mt-6 text-sm leading-7 text-[#800020]/65">
              {product.description || product.shortDescription}
            </p>

            {/* Color */}
            {product.colors?.length > 0 && (
              <div className="mt-7">
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="text-sm font-bold">Color</h2>

                  <span className="text-xs text-[#800020]/50">
                    {selectedColor}
                  </span>
                </div>

                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`rounded-full border px-5 py-2.5 text-xs font-semibold transition ${
                        selectedColor === color
                          ? "border-[#800020] bg-[#800020] text-white"
                          : "border-[#800020]/15 bg-white hover:border-[#D45060]"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size */}
            {product.sizes?.length > 0 && (
              <div className="mt-7">
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="text-sm font-bold">Size</h2>

                  <button
                    type="button"
                    className="text-xs font-semibold text-[#D45060]"
                  >
                    Size Guide
                  </button>
                </div>

                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`flex h-11 w-11 items-center justify-center rounded-xl border text-xs font-bold transition ${
                        selectedSize === size
                          ? "border-[#800020] bg-[#800020] text-white"
                          : "border-[#800020]/15 bg-white hover:border-[#D45060]"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mt-7">
              <h2 className="mb-3 text-sm font-bold">Quantity</h2>

              <div className="flex w-fit items-center overflow-hidden rounded-full border border-[#800020]/15 bg-white">
                <button
                  type="button"
                  onClick={decreaseQuantity}
                  className="flex h-11 w-11 items-center justify-center text-lg transition hover:bg-[#F7ADAD]/40"
                >
                  −
                </button>

                <span className="flex h-11 w-12 items-center justify-center border-x border-[#800020]/10 text-sm font-bold">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={increaseQuantity}
                  className="flex h-11 w-11 items-center justify-center text-lg transition hover:bg-[#F7ADAD]/40"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className={`rounded-full py-4 text-sm font-bold text-white transition ${
                  product.stock <= 0
                    ? "cursor-not-allowed bg-[#800020]/30"
                    : addedToCart
                    ? "bg-[#D45060]"
                    : "bg-[#800020] hover:bg-[#D45060]"
                }`}
              >
                {product.stock <= 0
                  ? "Out of Stock"
                  : addedToCart
                  ? "✓ Added to Cart"
                  : "Add to Cart"}
              </button>

              <Link
                href={`/checkout?product=${product.id}`}
                className="rounded-full border border-[#800020] bg-white py-4 text-center text-sm font-bold text-[#800020] transition hover:bg-[#F7ADAD]"
              >
                Buy Now
              </Link>
            </div>

            {/* Delivery */}
            <div className="mt-8 rounded-2xl border border-[#800020]/10 bg-white p-5">
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F7ADAD]/50">
                  ⌖
                </div>

                <div className="flex-1">
                  <h3 className="text-sm font-bold">Check Delivery</h3>

                  <p className="mt-1 text-xs leading-5 text-[#800020]/50">
                    Enter your pincode to check delivery availability and
                    estimated delivery date.
                  </p>

                  <div className="mt-3 flex max-w-sm overflow-hidden rounded-full border border-[#800020]/15">
                    <input
                      type="text"
                      maxLength={6}
                      inputMode="numeric"
                      placeholder="Enter pincode"
                      className="min-w-0 flex-1 bg-transparent px-4 py-3 text-xs outline-none"
                    />

                    <button
                      type="button"
                      className="bg-[#800020] px-5 text-xs font-bold text-white transition hover:bg-[#D45060]"
                    >
                      Check
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Offers */}
            <div className="mt-4 rounded-2xl border border-[#D45060]/20 bg-[#F7ADAD]/25 p-5">
              <h3 className="text-sm font-bold">Available Offers</h3>

              <div className="mt-3 space-y-3">
                {product.offers?.length > 0 ? (
                  product.offers.map((offer) => (
                    <div
                      key={offer}
                      className="flex items-start gap-3 text-xs text-[#800020]/70"
                    >
                      <span className="mt-0.5 text-[#D45060]">✓</span>
                      <span>{offer}</span>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="flex items-start gap-3 text-xs text-[#800020]/70">
                      <span className="mt-0.5 text-[#D45060]">✓</span>
                      <span>Free delivery on eligible orders</span>
                    </div>

                    <div className="flex items-start gap-3 text-xs text-[#800020]/70">
                      <span className="mt-0.5 text-[#D45060]">✓</span>
                      <span>Easy returns available</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className="border-y border-[#800020]/10 bg-white px-6 py-12 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex gap-2 overflow-x-auto border-b border-[#800020]/10">
            {[
              ["description", "Description"],
              ["specifications", "Specifications"],
              ["reviews", "Reviews"],
              ["questions", "Questions & Answers"],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setActiveTab(value)}
                className={`whitespace-nowrap border-b-2 px-5 py-4 text-sm font-semibold transition ${
                  activeTab === value
                    ? "border-[#800020] text-[#800020]"
                    : "border-transparent text-[#800020]/45 hover:text-[#D45060]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="py-8">
            {/* Description */}
            {activeTab === "description" && (
              <div className="max-w-3xl">
                <h2 className="text-2xl font-bold">Product Description</h2>

                <p className="mt-4 text-sm leading-7 text-[#800020]/65">
                  {product.description || product.shortDescription}
                </p>

                <p className="mt-4 text-sm leading-7 text-[#800020]/65">
                  Pinnacle focuses on combining modern aesthetics, practical
                  functionality, and a premium shopping experience. This
                  product is part of our carefully curated collection.
                </p>
              </div>
            )}

            {/* Specifications */}
            {activeTab === "specifications" && (
              <div>
                <h2 className="text-2xl font-bold">Specifications</h2>

                {product.specifications?.length > 0 ? (
                  <div className="mt-6 max-w-3xl overflow-hidden rounded-2xl border border-[#800020]/10">
                    {product.specifications.map(([label, value], index) => (
                      <div
                        key={label}
                        className={`grid grid-cols-2 px-5 py-4 text-sm ${
                          index % 2 === 0
                            ? "bg-[#F7ADAD]/20"
                            : "bg-white"
                        }`}
                      >
                        <span className="font-semibold">{label}</span>
                        <span className="text-[#800020]/60">{value}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-5 text-sm text-[#800020]/60">
                    Product specifications will be available soon.
                  </p>
                )}
              </div>
            )}

            {/* Reviews */}
            {activeTab === "reviews" && (
              <Reviews
                rating={product.rating}
                reviews={product.reviewCount || 0}
              />
            )}

            {/* Questions */}
            {activeTab === "questions" && <Questions />}
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="px-6 py-16 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D45060]">
              You May Also Like
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              Related Products
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((item) => (
              <Link
                key={item.id}
                href={`/product/${item.id}`}
                className="group overflow-hidden rounded-3xl border border-[#800020]/10 bg-white p-3 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#F7ADAD]/30">
                  <img
                    src={`/products/${item.slug}.jpg`}
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {item.discount > 0 && (
                    <span className="absolute right-3 top-3 rounded-full bg-[#D45060] px-3 py-1 text-[10px] font-bold text-white">
                      {item.discount}% OFF
                    </span>
                  )}
                </div>

                <div className="p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D45060]">
                    {item.brand}
                  </p>

                  <h3 className="mt-1 min-h-12 font-bold">
                    {item.name}
                  </h3>

                  <div className="mt-2 flex items-center justify-between">
                    <p className="font-bold">
                      ₹{item.price.toLocaleString("en-IN")}
                    </p>

                    <span className="rounded-md bg-[#F7ADAD]/40 px-2 py-1 text-xs font-bold">
                      {item.rating} ★
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

/* ---------------------------------- */
/* Product Not Found                  */
/* ---------------------------------- */

function ProductNotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7ADAD]/30 px-6">
      <div className="w-full max-w-lg rounded-[2rem] border border-[#800020]/10 bg-white p-10 text-center shadow-xl">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#800020] text-2xl font-black text-[#F7ADAD]">
          P
        </div>

        <h1 className="mt-6 text-3xl font-bold text-[#800020]">
          Product Not Found
        </h1>

        <p className="mt-3 text-sm leading-6 text-[#800020]/55">
          Sorry, we couldn't find the product you're looking for.
        </p>

        <Link
          href="/shop"
          className="mt-7 inline-block rounded-full bg-[#800020] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#D45060]"
        >
          Continue Shopping
        </Link>
      </div>
    </main>
  );
}

/* ---------------------------------- */
/* Reviews                            */
/* ---------------------------------- */

function Reviews({ rating, reviews }) {
  return (
    <div>
      <div className="grid gap-8 md:grid-cols-[240px_1fr]">
        <div className="rounded-3xl bg-[#F7ADAD]/30 p-7 text-center">
          <p className="text-5xl font-bold">{rating}</p>

          <div className="mt-2 text-xl text-[#D45060]">
            ★★★★★
          </div>

          <p className="mt-2 text-xs text-[#800020]/50">
            Based on {reviews} reviews
          </p>
        </div>

        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map((stars) => {
            const percentage =
              stars === 5
                ? 72
                : stars === 4
                ? 18
                : stars === 3
                ? 6
                : 3;

            return (
              <div
                key={stars}
                className="flex items-center gap-3 text-xs"
              >
                <span className="w-8">{stars} ★</span>

                <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#F7ADAD]/40">
                  <div
                    className="h-full rounded-full bg-[#D45060]"
                    style={{
                      width: `${percentage}%`,
                    }}
                  />
                </div>

                <span className="w-10 text-right text-[#800020]/45">
                  {percentage}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-10 border-t border-[#800020]/10 pt-8">
        <h3 className="text-xl font-bold">Customer Reviews</h3>

        <div className="mt-5 rounded-2xl border border-[#800020]/10 p-5">
          <div className="text-[#D45060]">
            ★★★★★
          </div>

          <h4 className="mt-2 font-bold">
            Great quality and design
          </h4>

          <p className="mt-2 text-sm leading-6 text-[#800020]/60">
            The product looks premium and feels exactly as expected.
          </p>

          <p className="mt-3 text-xs text-[#800020]/40">
            Verified Purchase
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------- */
/* Questions                          */
/* ---------------------------------- */

function Questions() {
  const questions = [
    {
      question: "Does this product come with a warranty?",
      answer:
        "Yes. Warranty coverage depends on the selected product and is displayed in the specifications section.",
    },
    {
      question: "Is this product eligible for returns?",
      answer:
        "Eligible products can be returned according to the applicable Pinnacle return policy.",
    },
    {
      question: "How long does delivery take?",
      answer:
        "Estimated delivery depends on your location and can be checked using the delivery pincode option.",
    },
  ];

  return (
    <div className="max-w-3xl">
      <h2 className="text-2xl font-bold">
        Questions & Answers
      </h2>

      <div className="mt-6 space-y-4">
        {questions.map((item) => (
          <div
            key={item.question}
            className="rounded-2xl border border-[#800020]/10 p-5"
          >
            <p className="font-semibold">
              Q: {item.question}
            </p>

            <p className="mt-2 text-sm leading-6 text-[#800020]/60">
              A: {item.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}