"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import categories from "../../data/categories";

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-[#fffafa]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#800020] px-6 py-20 text-white md:px-12 lg:px-20">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#d45060] opacity-30 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-[#f7adad] opacity-20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#f7adad]">
            Discover
          </p>

          <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
            Shop by Category
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-white/75 md:text-lg">
            Explore carefully selected products across fashion, electronics,
            home & living, and beauty.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 lg:px-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
            >
              <Link
                href={`/categories/${category.slug}`}
                className="group block overflow-hidden rounded-3xl border border-[#800020]/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#f7adad]/20">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#800020]/70 via-transparent to-transparent" />

                  <div className="absolute bottom-4 left-4">
                    <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#800020] backdrop-blur">
                      {category.productCount} Products
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-[#800020] transition-colors group-hover:text-[#d45060]">
                    {category.name}
                  </h2>

                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
                    {category.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-sm font-semibold text-[#d45060]">
                      Explore Collection
                    </span>

                    <span className="text-xl text-[#800020] transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mx-auto mb-16 max-w-7xl px-5 md:px-8 lg:px-10">
        <div className="rounded-3xl bg-[#f7adad]/30 p-8 text-center md:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#d45060]">
            Pinnacle Collection
          </p>

          <h2 className="mt-3 text-3xl font-bold text-[#800020] md:text-4xl">
            Find something made for you.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-gray-600">
            Browse our complete collection and discover products selected for
            style, quality, and everyday living.
          </p>

          <Link
            href="/shop"
            className="mt-7 inline-flex rounded-full bg-[#800020] px-7 py-3 text-sm font-semibold text-white transition-all hover:bg-[#d45060] hover:-translate-y-1"
          >
            Shop All Products
          </Link>
        </div>
      </section>
    </main>
  );
}