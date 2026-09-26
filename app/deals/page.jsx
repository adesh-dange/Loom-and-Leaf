"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const deals = [
  {
    id: 1,
    productId: "aura-wireless-headphones",
    image: "aura-wireless-headphones",
    name: "Wireless Noise Cancelling Headphones",
    brand: "Loom Audio",
    category: "Electronics",
    price: 4999,
    originalPrice: 6999,
    discount: 29,
    rating: 4.8,
    reviews: 286,
    stock: 8,
    tag: "Best Deal",
  },
  {
    id: 2,
    productId: "classic-oversized-jacket",
    image: "classic-oversized-jacket",
    name: "Premium Leather Sneakers",
    brand: "Loom Footwear",
    category: "Fashion",
    price: 3299,
    originalPrice: 4999,
    discount: 34,
    rating: 4.4,
    reviews: 87,
    stock: 12,
    tag: "Hot Deal",
  },
  {
    id: 3,
    productId: "minimal-glow-serum",
    image: "minimal-glow-serum",
    name: "Hydrating Glow Skincare Set",
    brand: "Loom Beauty",
    category: "Beauty",
    price: 1299,
    originalPrice: 1899,
    discount: 32,
    rating: 4.6,
    reviews: 173,
    stock: 15,
    tag: "Limited",
  },
  {
    id: 4,
    productId: "luna-ceramic-vase",
    image: "luna-ceramic-vase",
    name: "Modern Decorative Vase",
    brand: "Leaf Living",
    category: "Home & Living",
    price: 899,
    originalPrice: 1299,
    discount: 31,
    rating: 4.3,
    reviews: 64,
    stock: 21,
    tag: "Popular",
  },
  {
    id: 5,
    productId: "pulse-smartwatch",
    image: "pulse-smartwatch",
    name: "Smart Fitness Watch",
    brand: "Loom Tech",
    category: "Electronics",
    price: 3999,
    originalPrice: 5999,
    discount: 33,
    rating: 4.7,
    reviews: 215,
    stock: 9,
    tag: "Flash Deal",
  },
  {
    id: 6,
    productId: "silk-touch-lip-tint",
    image: "silk-touch-lip-tint",
    name: "Daily Essentials Makeup Kit",
    brand: "Loom Beauty",
    category: "Beauty",
    price: 1599,
    originalPrice: 2299,
    discount: 30,
    rating: 4.6,
    reviews: 142,
    stock: 18,
    tag: "Beauty Pick",
  },
  {
    id: 7,
    productId: "classic-oversized-jacket",
    image: "classic-oversized-jacket",
    name: "Classic Everyday Jacket",
    brand: "Loom & Leaf",
    category: "Fashion",
    price: 2499,
    originalPrice: 3499,
    discount: 29,
    rating: 4.7,
    reviews: 124,
    stock: 11,
    tag: "Trending",
  },
  {
    id: 8,
    productId: "cloud-soft-cushion",
    image: "cloud-soft-cushion",
    name: "Luxury Cushion Set",
    brand: "Leaf Living",
    category: "Home & Living",
    price: 1199,
    originalPrice: 1699,
    discount: 29,
    rating: 4.4,
    reviews: 76,
    stock: 16,
    tag: "Home Pick",
  },
];

const categories = [
  "All Deals",
  "Fashion",
  "Electronics",
  "Home & Living",
  "Beauty",
];

export default function DealsPage() {
  const [activeCategory, setActiveCategory] = useState("All Deals");
  const [wishlist, setWishlist] = useState([]);
  const [cartMessage, setCartMessage] = useState("");

  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 31,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((current) => {
        let { hours, minutes, seconds } = current;

        if (seconds > 0) {
          seconds -= 1;
        } else if (minutes > 0) {
          minutes -= 1;
          seconds = 59;
        } else if (hours > 0) {
          hours -= 1;
          minutes = 59;
          seconds = 59;
        } else {
          hours = 2;
          minutes = 31;
          seconds = 45;
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const filteredDeals =
    activeCategory === "All Deals"
      ? deals
      : deals.filter((deal) => deal.category === activeCategory);

  const toggleWishlist = (id) => {
    setWishlist((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const addToCart = (productName) => {
    setCartMessage(`${productName} added to cart.`);

    setTimeout(() => {
      setCartMessage("");
    }, 2500);
  };

  return (
    <main className="min-h-screen bg-[#F7ADAD]/30 text-[#800020]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#800020] px-6 py-16 text-[#F7ADAD] md:px-12 lg:px-20">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#D45060]/30 blur-3xl" />
        <div className="absolute -bottom-40 left-0 h-96 w-96 rounded-full bg-[#F7ADAD]/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_400px]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#D45060]">
              Pinnacle
            </p>

            <h1 className="mt-4 text-5xl font-black leading-tight sm:text-6xl lg:text-7xl">
              Flash
              <span className="block text-[#D45060]">Deals</span>
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-7 text-[#F7ADAD]/65 sm:text-base">
              Discover limited-time offers across fashion, electronics, beauty,
              and home & living.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#deals"
                className="rounded-full bg-[#D45060] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#F7ADAD] hover:text-[#800020]"
              >
                Shop Deals
              </Link>

              <Link
                href="/shop"
                className="rounded-full border border-[#F7ADAD]/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-[#F7ADAD] backdrop-blur-md transition hover:bg-white/10"
              >
                View All Products
              </Link>
            </div>
          </div>

          {/* Countdown */}
          <div className="rounded-[2rem] border border-[#F7ADAD]/10 bg-white/5 p-7 text-center shadow-2xl backdrop-blur-md">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D45060]">
              Flash Sale Ends In
            </p>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <TimeBox value={timeLeft.hours} label="Hours" />
              <TimeBox value={timeLeft.minutes} label="Minutes" />
              <TimeBox value={timeLeft.seconds} label="Seconds" />
            </div>

            <div className="mt-6 rounded-2xl bg-[#D45060]/15 px-4 py-3">
              <p className="text-xs text-[#F7ADAD]/70">
                Limited stock available. Offers may end early.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="border-b border-[#800020]/10 bg-white px-6 py-5 md:px-12 lg:px-20">
        <div className="mx-auto flex max-w-7xl gap-3 overflow-x-auto pb-1">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                activeCategory === category
                  ? "bg-[#800020] text-white shadow-md"
                  : "bg-[#F7ADAD]/30 text-[#800020]/70 hover:bg-[#F7ADAD]/60"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Main Deals */}
      <section
        id="deals"
        className="mx-auto max-w-7xl px-6 py-12 md:px-12 lg:px-20"
      >
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D45060]">
              Limited Time Offers
            </p>

            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
              {activeCategory === "All Deals"
                ? "Today's Best Deals"
                : `${activeCategory} Deals`}
            </h2>

            <p className="mt-2 text-sm text-[#800020]/50">
              {filteredDeals.length} special offers available
            </p>
          </div>

          <div className="rounded-full bg-[#800020] px-5 py-2.5 text-xs font-bold text-white">
            Up to 60% OFF
          </div>
        </div>

        {/* Toast */}
        {cartMessage && (
          <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-[#800020] px-6 py-3 text-sm font-semibold text-white shadow-2xl">
            ✓ {cartMessage}
          </div>
        )}

        {/* Deal Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredDeals.map((deal) => (
            <DealCard
              key={deal.id}
              deal={deal}
              isWishlisted={wishlist.includes(deal.id)}
              toggleWishlist={toggleWishlist}
              addToCart={addToCart}
            />
          ))}
        </div>
      </section>

      {/* Coupon Banner */}
      <section className="px-6 pb-12 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#D45060] px-8 py-10 text-white shadow-xl">
          <div className="flex flex-col items-center justify-between gap-7 md:flex-row">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
                Extra Savings
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                Get 10% OFF your first order
              </h2>

              <p className="mt-2 text-sm text-white/70">
                Use the coupon code at checkout.
              </p>
            </div>

            <div className="rounded-2xl border border-white/20 bg-white/10 px-7 py-4 text-center backdrop-blur-md">
              <p className="text-[10px] uppercase tracking-[0.25em] text-white/60">
                Coupon Code
              </p>

              <p className="mt-1 text-xl font-black tracking-widest">
                WELCOME10
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Deal Categories */}
      <section className="bg-white px-6 py-16 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D45060]">
              Explore Savings
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              Deals by Category
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                name: "Fashion",
                letter: "F",
                href: "/categories/fashion",
                text: "Up to 50% OFF",
              },
              {
                name: "Electronics",
                letter: "E",
                href: "/categories/electronics",
                text: "Up to 60% OFF",
              },
              {
                name: "Home & Living",
                letter: "H",
                href: "/categories/home-living",
                text: "Up to 40% OFF",
              },
              {
                name: "Beauty",
                letter: "B",
                href: "/categories/beauty",
                text: "Up to 45% OFF",
              },
            ].map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="group rounded-3xl border border-[#800020]/10 bg-[#F7ADAD]/20 p-6 transition-all duration-300 hover:-translate-y-2 hover:bg-[#F7ADAD]/50 hover:shadow-xl"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#800020] text-xl font-black text-[#F7ADAD] transition-transform group-hover:rotate-6">
                  {category.letter}
                </div>

                <h3 className="mt-6 font-bold">{category.name}</h3>

                <p className="mt-1 text-sm font-semibold text-[#D45060]">
                  {category.text}
                </p>

                <p className="mt-3 text-xs text-[#800020]/45">
                  Explore deals →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-16 md:px-12 lg:px-20">
        <div className="mx-auto max-w-5xl rounded-[2rem] bg-[#800020] px-8 py-14 text-center text-[#F7ADAD]">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D45060]">
            Pinnacle
          </p>

          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Don't miss the next deal.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#F7ADAD]/60">
            Explore our complete collection and discover more products waiting
            for you.
          </p>

          <Link
            href="/shop"
            className="mt-7 inline-block rounded-full bg-[#D45060] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#F7ADAD] hover:text-[#800020]"
          >
            Continue Shopping
          </Link>
        </div>
      </section>
    </main>
  );
}

function TimeBox({ value, label }) {
  return (
    <div className="rounded-2xl bg-[#F7ADAD]/10 p-4">
      <p className="text-3xl font-black text-[#F7ADAD]">
        {String(value).padStart(2, "0")}
      </p>

      <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-[#F7ADAD]/40">
        {label}
      </p>
    </div>
  );
}

function DealCard({
  deal,
  isWishlisted,
  toggleWishlist,
  addToCart,
}) {
  const imagePath = `/products/${deal.image}.jpg`;

  return (
    <article className="group overflow-hidden rounded-3xl border border-[#800020]/10 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#F7ADAD]/35">
        <Link
          href={`/product/${deal.productId}`}
          className="block h-full w-full"
        >
          <img
            src={imagePath}
            alt={deal.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
        </Link>

        {/* Deal Badge */}
        <span className="absolute left-3 top-3 rounded-full bg-[#D45060] px-3 py-1.5 text-[10px] font-bold text-white shadow-md">
          {deal.tag}
        </span>

        {/* Wishlist */}
        <button
          type="button"
          onClick={() => toggleWishlist(deal.id)}
          aria-label={
            isWishlisted ? "Remove from wishlist" : "Add to wishlist"
          }
          className={`absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-lg shadow-md backdrop-blur-md transition-all duration-300 hover:scale-110 ${
            isWishlisted
              ? "text-[#D45060]"
              : "text-[#800020] hover:text-[#D45060]"
          }`}
        >
          {isWishlisted ? "♥" : "♡"}
        </button>

        {/* Quick View */}
        <Link
          href={`/product/${deal.productId}`}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 translate-y-14 rounded-full bg-white/95 px-5 py-2.5 text-xs font-bold text-[#800020] opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-[#D45060] hover:text-white"
        >
          Quick View
        </Link>
      </div>

      {/* Product Info */}
      <div className="px-2 pb-2 pt-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D45060]">
          {deal.brand}
        </p>

        <Link href={`/product/${deal.productId}`}>
          <h3 className="mt-1 min-h-12 text-sm font-bold leading-6 transition-colors hover:text-[#D45060]">
            {deal.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="mt-2 flex items-center gap-2">
          <span className="rounded-md bg-[#F7ADAD]/40 px-2 py-1 text-xs font-bold">
            {deal.rating} ★
          </span>

          <span className="text-xs text-[#800020]/45">
            ({deal.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="mt-4 flex items-end gap-2">
          <span className="text-lg font-bold">
            ₹{deal.price.toLocaleString("en-IN")}
          </span>

          <span className="text-xs text-[#800020]/35 line-through">
            ₹{deal.originalPrice.toLocaleString("en-IN")}
          </span>

          <span className="text-[10px] font-bold text-[#D45060]">
            {deal.discount}% OFF
          </span>
        </div>

        {/* Stock */}
        <div className="mt-3">
          <div className="flex items-center justify-between text-[10px]">
            <span className="font-semibold text-[#D45060]">
              Limited Stock
            </span>

            <span className="text-[#800020]/45">
              Only {deal.stock} left
            </span>
          </div>

          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#F7ADAD]/50">
            <div
              className="h-full rounded-full bg-[#D45060]"
              style={{
                width: `${Math.min(100, 100 - deal.stock * 3)}%`,
              }}
            />
          </div>
        </div>

        {/* Add To Cart */}
        <button
          type="button"
          onClick={() => addToCart(deal.name)}
          className="mt-4 w-full rounded-full bg-[#800020] py-3 text-xs font-semibold text-white transition hover:bg-[#D45060]"
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}