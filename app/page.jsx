import Link from "next/link";
import products from "../data/products";

export default function HomePage() {
  const featuredProducts = products.slice(0, 4);

  return (
    <main className="min-h-screen bg-[#F7ADAD] text-[#800020]">
      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center overflow-hidden px-6 py-20 md:px-12 lg:px-20">
        <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#D45060]/20 blur-3xl" />
        <div className="absolute -right-32 bottom-20 h-96 w-96 rounded-full bg-[#800020]/10 blur-3xl" />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-2">
          {/* Hero Content */}
          <div className="max-w-2xl">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.35em] text-[#D45060]">
              Premium Shopping Experience
            </p>

            <h1 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Discover
              <span className="block text-[#D45060]">Something</span>
              Beautiful.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-[#800020]/75 sm:text-lg">
              Welcome to Pinnacle — a modern shopping experience designed
              around beautiful products, effortless discovery, and premium
              interaction.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/shop"
                className="rounded-full bg-[#800020] px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#D45060] hover:shadow-xl"
              >
                Shop Now
              </Link>

              <Link
                href="/categories"
                className="rounded-full border border-[#800020]/30 bg-white/30 px-7 py-3.5 text-sm font-semibold text-[#800020] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/50"
              >
                Explore Categories
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-8 border-t border-[#800020]/15 pt-7">
              <div>
                <p className="text-2xl font-bold">100+</p>
                <p className="text-xs uppercase tracking-wider text-[#800020]/60">
                  Products
                </p>
              </div>

              <div>
                <p className="text-2xl font-bold">4.8★</p>
                <p className="text-xs uppercase tracking-wider text-[#800020]/60">
                  Average Rating
                </p>
              </div>

              <div>
                <p className="text-2xl font-bold">24/7</p>
                <p className="text-xs uppercase tracking-wider text-[#800020]/60">
                  Shopping
                </p>
              </div>
            </div>
          </div>

          {/* Hero Product Visual */}
          <div className="relative mx-auto flex h-[420px] w-full max-w-[520px] items-center justify-center sm:h-[520px]">
            <div className="absolute h-72 w-72 rounded-full bg-[#D45060]/25 blur-3xl sm:h-96 sm:w-96" />

            <div className="absolute h-80 w-80 rounded-full border border-[#800020]/10 sm:h-96 sm:w-96" />
            <div className="absolute h-64 w-64 rounded-full border border-[#D45060]/20 sm:h-80 sm:w-80" />

            <div className="relative z-10 flex h-72 w-56 rotate-[-8deg] items-center justify-center overflow-hidden rounded-[2rem] border border-white/50 bg-white/30 shadow-2xl backdrop-blur-xl transition-transform duration-500 hover:rotate-0 hover:scale-105 sm:h-80 sm:w-64">
              <div className="absolute inset-4 rounded-[1.5rem] border border-white/40" />

              <img
                src="/products/aura-wireless-headphones.jpg"
                alt="Aura Wireless Headphones"
                className="relative z-10 h-full w-full object-cover p-7"
              />
            </div>

            <div className="absolute right-2 top-16 rounded-2xl border border-white/50 bg-white/40 px-4 py-3 shadow-lg backdrop-blur-md sm:right-8">
              <p className="text-xs text-[#800020]/60">Trending</p>
              <p className="font-bold">New Arrivals</p>
            </div>

            <div className="absolute bottom-16 left-2 rounded-2xl border border-white/50 bg-white/40 px-4 py-3 shadow-lg backdrop-blur-md sm:left-4">
              <p className="text-xs text-[#800020]/60">Special Offer</p>
              <p className="font-bold text-[#D45060]">Up to 60% OFF</p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#800020]/50">
            Scroll
          </span>
          <div className="h-8 w-px bg-[#800020]/30" />
        </div>
      </section>

      {/* Featured Categories */}
      <section className="bg-white px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex items-end justify-between gap-5">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#D45060]">
                Explore
              </p>

              <h2 className="mt-2 text-3xl font-bold text-[#800020] sm:text-4xl">
                Featured Categories
              </h2>
            </div>

            <Link
              href="/shop"
              className="hidden text-sm font-semibold text-[#D45060] transition-colors hover:text-[#800020] sm:block"
            >
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              "Fashion",
              "Electronics",
              "Home & Living",
              "Beauty",
            ].map((category) => (
              <Link
                key={category}
                href={`/categories/${category
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className="group rounded-3xl border border-[#800020]/10 bg-[#F7ADAD]/30 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-[#D45060]/30 hover:bg-[#F7ADAD]/60 hover:shadow-xl"
              >
                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#800020] text-xl font-bold text-[#F7ADAD] transition-transform duration-300 group-hover:rotate-6">
                  {category.charAt(0)}
                </div>

                <h3 className="font-bold text-[#800020]">{category}</h3>

                <p className="mt-1 text-sm text-[#800020]/60">
                  Discover collection
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-[#F7ADAD]/40 px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#D45060]">
              Curated Collection
            </p>

            <h2 className="mt-2 text-3xl font-bold text-[#800020] sm:text-4xl">
              Featured Products
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="group overflow-hidden rounded-3xl border border-white/60 bg-white/60 p-4 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                {/* Actual Product Image */}
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#F7ADAD]/40">
                  <img
                    src={`/products/${product.slug}.jpg`}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {product.discount && (
                    <span className="absolute right-3 top-3 rounded-full bg-[#D45060] px-3 py-1.5 text-[10px] font-bold text-white shadow-md">
                      {product.discount}% OFF
                    </span>
                  )}
                </div>

                <div className="px-1 pb-1 pt-5">
                  <p className="text-xs uppercase tracking-wider text-[#D45060]">
                    {product.brand}
                  </p>

                  <h3 className="mt-1 min-h-12 font-bold text-[#800020]">
                    {product.name}
                  </h3>

                  <div className="mt-3 flex items-center justify-between gap-3">
                    <div>
                      <span className="font-bold text-[#800020]">
                        ₹{product.price.toLocaleString("en-IN")}
                      </span>

                      {product.originalPrice && (
                        <span className="ml-2 text-xs text-[#800020]/40 line-through">
                          ₹{product.originalPrice.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>

                    <span className="rounded-full bg-[#D45060]/10 px-3 py-1 text-xs font-semibold text-[#D45060]">
                      View
                    </span>
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <span className="rounded-md bg-[#F7ADAD]/50 px-2 py-1 text-xs font-bold text-[#800020]">
                      {product.rating} ★
                    </span>

                    <span className="text-xs text-[#800020]/45">
                      ({product.reviewCount})
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Section */}
      <section className="px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#800020] px-8 py-14 text-[#F7ADAD] shadow-2xl md:px-14">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#D45060]">
                Limited Time
              </p>

              <h2 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">
                Discover.
                <br />
                Shop.
                <br />
                Experience.
              </h2>

              <p className="mt-5 max-w-lg text-sm leading-6 text-[#F7ADAD]/70">
                Explore our latest collections and discover products curated
                for your everyday lifestyle.
              </p>

              <Link
                href="/deals"
                className="mt-7 inline-block rounded-full bg-[#D45060] px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#F7ADAD] hover:text-[#800020]"
              >
                Explore Deals
              </Link>
            </div>

            <div className="relative flex min-h-64 items-center justify-center">
              <div className="absolute h-64 w-64 rounded-full border border-[#F7ADAD]/10" />
              <div className="absolute h-48 w-48 rounded-full border border-[#D45060]/30" />

              <div className="relative h-48 w-40 rotate-6 overflow-hidden rounded-[2rem] bg-[#F7ADAD] shadow-2xl">
                <img
                  src="/products/luna-ceramic-vase.jpg"
                  alt="Luna Ceramic Vase"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-[#F7ADAD] px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#D45060]">
            Stay Connected
          </p>

          <h2 className="mt-3 text-3xl font-bold text-[#800020] sm:text-4xl">
            Join the Pinnacle community
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#800020]/65">
            Get updates about new arrivals, special offers, and curated
            collections.
          </p>

          <form className="mx-auto mt-7 flex max-w-xl flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="min-h-12 flex-1 rounded-full border border-[#800020]/15 bg-white/60 px-5 text-sm text-[#800020] outline-none backdrop-blur-md transition focus:border-[#D45060]"
            />

            <button
              type="submit"
              className="min-h-12 rounded-full bg-[#800020] px-7 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#D45060]"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}