"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const values = [
  {
    number: "01",
    title: "Curated Quality",
    description:
      "Every product experience is designed around thoughtful discovery, clear details, and a premium shopping journey.",
  },
  {
    number: "02",
    title: "Simple Discovery",
    description:
      "From categories to search and product details, Loom & Leaf keeps exploration intuitive and effortless.",
  },
  {
    number: "03",
    title: "Modern Experience",
    description:
      "Immersive visuals, smooth interactions, and responsive layouts bring a contemporary feel to online shopping.",
  },
];

const features = [
  {
    icon: "✦",
    title: "Curated Collections",
    description:
      "Explore thoughtfully organized collections across fashion, beauty, electronics, and home living.",
  },
  {
    icon: "◇",
    title: "Personal Wishlist",
    description:
      "Save products you love and keep your favorite discoveries together in one place.",
  },
  {
    icon: "↗",
    title: "Easy Shopping",
    description:
      "Move smoothly from discovering a product to viewing details, adding it to your cart, and checking out.",
  },
  {
    icon: "∞",
    title: "Designed to Explore",
    description:
      "Every section is created to encourage discovery while keeping the experience clean and intuitive.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-[#800020]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#800020] text-white">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#D45060]/30 blur-3xl" />
        <div className="absolute -bottom-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-[#F7ADAD]/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-8 lg:px-10">
          {/* NAV */}
          <nav className="flex items-center justify-between">
            <Link
              href="/"
              className="text-2xl font-bold tracking-tight sm:text-3xl"
            >
              Loom <span className="text-[#F7ADAD]">&</span> Leaf
            </Link>

            <div className="hidden items-center gap-8 text-sm font-medium md:flex">
              <Link href="/" className="transition hover:text-[#F7ADAD]">
                Home
              </Link>

              <Link href="/shop" className="transition hover:text-[#F7ADAD]">
                Shop
              </Link>

              <Link
                href="/categories/fashion"
                className="transition hover:text-[#F7ADAD]"
              >
                Categories
              </Link>

              <Link
                href="/contact"
                className="transition hover:text-[#F7ADAD]"
              >
                Contact
              </Link>
            </div>

            <Link
              href="/shop"
              className="rounded-full bg-[#F7ADAD] px-5 py-2.5 text-sm font-bold text-[#800020] transition hover:bg-white"
            >
              Explore Shop
            </Link>
          </nav>

          {/* HERO CONTENT */}
          <div className="grid min-h-[650px] items-center gap-12 py-20 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-2xl"
            >
              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.35em] text-[#F7ADAD]">
                About Loom & Leaf
              </p>

              <h1 className="text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl">
                A different way
                <br />
                to <span className="text-[#F7ADAD]">discover.</span>
              </h1>

              <p className="mt-7 max-w-xl text-base leading-8 text-white/75 sm:text-lg">
                Loom & Leaf is a premium e-commerce experience created around
                discovery, thoughtful design, and effortless shopping. We bring
                products and people together through an immersive digital
                experience.
              </p>

              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  href="/shop"
                  className="rounded-full bg-white px-7 py-3.5 text-sm font-bold text-[#800020] transition hover:-translate-y-1 hover:bg-[#F7ADAD]"
                >
                  Start Exploring
                </Link>

                <Link
                  href="/categories/fashion"
                  className="rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-[#F7ADAD] hover:bg-white/10"
                >
                  View Collections
                </Link>
              </div>
            </motion.div>

            {/* ABSTRACT VISUAL */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9 }}
              className="relative mx-auto h-[430px] w-full max-w-[500px]"
            >
              <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20" />

              <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rotate-12 rounded-[3rem] bg-[#F7ADAD] shadow-2xl shadow-black/20" />

              <div className="absolute left-1/2 top-1/2 flex h-48 w-48 -translate-x-1/2 -translate-y-1/2 -rotate-6 items-center justify-center rounded-[2.5rem] bg-[#D45060] shadow-2xl">
                <div className="text-center">
                  <p className="text-6xl font-bold">L</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.35em]">
                    & Leaf
                  </p>
                </div>
              </div>

              <div className="absolute left-3 top-20 rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur-md">
                <p className="text-xs uppercase tracking-widest text-[#F7ADAD]">
                  Discover
                </p>
                <p className="mt-1 text-lg font-bold">Something new</p>
              </div>

              <div className="absolute bottom-16 right-0 rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur-md">
                <p className="text-xs uppercase tracking-widest text-[#F7ADAD]">
                  Curated
                </p>
                <p className="mt-1 text-lg font-bold">For you</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="bg-[#F7ADAD]/30 px-6 py-24 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#D45060]">
              Our story
            </p>

            <h2 className="mt-4 text-4xl font-bold leading-tight text-[#800020] sm:text-5xl">
              Built around the joy of finding something you love.
            </h2>
          </div>

          <div className="space-y-5 text-base leading-8 text-gray-600">
            <p>
              Loom & Leaf was created with one simple idea: shopping should
              feel less like searching through endless pages and more like
              discovering something worth keeping.
            </p>

            <p>
              The experience combines curated collections, detailed product
              pages, smooth interactions, personalized shopping features, and
              an immersive visual language.
            </p>

            <p>
              From the first product you discover to the moment you complete
              your order, every part of Loom & Leaf is designed to feel
              connected, elegant, and easy to navigate.
            </p>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#D45060]">
              What matters to us
            </p>

            <h2 className="mt-4 text-4xl font-bold text-[#800020] sm:text-5xl">
              Designed with intention.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {values.map((value, index) => (
              <motion.div
                key={value.number}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group rounded-3xl border border-[#800020]/10 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-[#D45060]/30 hover:shadow-xl"
              >
                <span className="text-sm font-bold text-[#D45060]">
                  {value.number}
                </span>

                <h3 className="mt-8 text-2xl font-bold text-[#800020]">
                  {value.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-gray-500">
                  {value.description}
                </p>

                <div className="mt-8 h-1 w-10 rounded-full bg-[#D45060] transition-all duration-300 group-hover:w-20" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-[#800020] px-6 py-24 text-white lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#F7ADAD]">
                The experience
              </p>

              <h2 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
                More than a storefront.
              </h2>

              <p className="mt-6 max-w-md leading-8 text-white/65">
                Loom & Leaf combines commerce and experience to make product
                discovery feel natural, visual, and engaging.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F7ADAD] text-xl font-bold text-[#800020]">
                    {feature.icon}
                  </div>

                  <h3 className="mt-6 text-xl font-bold">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-white/60">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#D45060]">
                Explore
              </p>

              <h2 className="mt-3 text-4xl font-bold text-[#800020] sm:text-5xl">
                Find your next favorite.
              </h2>
            </div>

            <Link
              href="/shop"
              className="text-sm font-bold text-[#800020] underline decoration-[#D45060] decoration-2 underline-offset-8 hover:text-[#D45060]"
            >
              Browse everything
            </Link>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Fashion", "/categories/fashion", "01"],
              ["Electronics", "/categories/electronics", "02"],
              ["Home & Living", "/categories/home-living", "03"],
              ["Beauty", "/categories/beauty", "04"],
            ].map(([name, href, number]) => (
              <Link
                key={name}
                href={href}
                className="group relative overflow-hidden rounded-3xl bg-[#F7ADAD]/40 p-7 transition duration-300 hover:-translate-y-2 hover:bg-[#D45060]"
              >
                <span className="text-sm font-bold text-[#D45060] group-hover:text-white/70">
                  {number}
                </span>

                <h3 className="mt-20 text-2xl font-bold text-[#800020] group-hover:text-white">
                  {name}
                </h3>

                <div className="mt-8 flex h-10 w-10 items-center justify-center rounded-full bg-[#800020] text-white transition group-hover:bg-white group-hover:text-[#800020]">
                  →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24 lg:px-10">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#F7ADAD] px-8 py-16 text-center sm:px-12">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#D45060]">
            Your journey starts here
          </p>

          <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-bold leading-tight text-[#800020] sm:text-5xl">
            Discover products that feel made for you.
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#800020]/65">
            Explore the Loom & Leaf collection and experience a new way to
            shop.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/shop"
              className="rounded-full bg-[#800020] px-8 py-3.5 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-[#D45060]"
            >
              Explore Shop
            </Link>

            <Link
              href="/contact"
              className="rounded-full border border-[#800020]/20 bg-white/50 px-8 py-3.5 text-sm font-bold text-[#800020] transition hover:bg-white"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#800020]/10 px-6 py-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-gray-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} Loom & Leaf. All rights reserved.
          </p>

          <div className="flex gap-5">
            <Link href="/shop" className="hover:text-[#800020]">
              Shop
            </Link>

            <Link href="/contact" className="hover:text-[#800020]">
              Contact
            </Link>

            <Link href="/" className="hover:text-[#800020]">
              Home
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}