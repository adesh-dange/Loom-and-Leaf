"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const categories = [
  "Fashion",
  "Electronics",
  "Home & Living",
  "Beauty",
];

export default function Hero()  {
  return (
    <section className="relative min-h-[calc(100vh-76px)] overflow-hidden bg-[#F7ADAD]/30">
      {/* BACKGROUND SHAPES */}
      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#D45060]/10 blur-3xl" />
      <div className="absolute -bottom-40 -right-32 h-[30rem] w-[30rem] rounded-full bg-[#800020]/10 blur-3xl" />

      <div className="relative mx-auto grid min-h-[calc(100vh-76px)] max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:px-10 lg:py-20">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          {/* LABEL */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#800020]/10 bg-white/70 px-4 py-2 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-[#D45060]" />

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#800020]">
              Curated for you
            </span>
          </div>

          {/*  */}
          <h1 className="max-w-3xl text-5xl font-bold leading-[1.02] tracking-tight text-[#800020] sm:text-6xl lg:text-7xl xl:text-8xl">
            Discover
            <br />
            <span className="text-[#D45060]">what feels</span>
            <br />
            like you.
          </h1>

          {/* DESCRIPTION */}
          <p className="mt-7 max-w-xl text-base leading-8 text-[#800020]/65 sm:text-lg">
            Explore thoughtfully curated products across fashion, technology,
            beauty, and home living. A premium shopping experience designed
            around discovery.
          </p>

          {/* ACTIONS */}
          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/shop"
              className="rounded-full bg-[#800020] px-7 py-4 text-sm font-bold text-white shadow-xl shadow-[#800020]/20 transition hover:-translate-y-1 hover:bg-[#D45060]"
            >
              Explore Collection
            </Link>

            <Link
              href="/deals"
              className="rounded-full border border-[#800020]/15 bg-white/70 px-7 py-4 text-sm font-bold text-[#800020] backdrop-blur-md transition hover:-translate-y-1 hover:bg-white"
            >
              View Deals
            </Link>
          </div>

          {/* CATEGORY LINKS */}
          <div className="mt-10">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#800020]/40">
              Explore
            </p>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const slug = category.toLowerCase().replaceAll(" ", "-");

                return (
                  <Link
                    key={category}
                    href={`/categories/${slug}`}
                    className="rounded-full border border-[#800020]/10 bg-white/50 px-4 py-2 text-xs font-semibold text-[#800020]/70 transition hover:border-[#D45060]/30 hover:bg-[#D45060] hover:text-white"
                  >
                    {category}
                  </Link>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* RIGHT VISUAL */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.15 }}
          className="relative mx-auto h-[500px] w-full max-w-[560px] lg:h-[620px]"
        >
          {/* OUTER RING */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute left-1/2 top-1/2 h-[430px] w-[430px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#800020]/10 sm:h-[500px] sm:w-[500px]"
          />

          {/* INNER RING */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute left-1/2 top-1/2 h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#D45060]/30 sm:h-[390px] sm:w-[390px]"
          />

          {/* MAIN PRODUCT SHAPE */}
          <motion.div
            animate={{
              y: [0, -18, 0],
              rotate: [6, 2, 6],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-1/2 top-1/2 flex h-72 w-60 -translate-x-1/2 -translate-y-1/2 rotate-6 items-center justify-center rounded-[5rem] bg-[#800020] shadow-2xl shadow-[#800020]/30 sm:h-80 sm:w-64"
          >
            <div className="absolute inset-4 rounded-[4rem] border border-white/10" />

            <div className="relative text-center text-white">
              <p className="text-7xl font-bold tracking-tight">L</p>

              <div className="mx-auto mt-2 h-px w-14 bg-[#F7ADAD]" />

              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#F7ADAD]">
                Loom
              </p>

              <p className="mt-1 text-xs uppercase tracking-[0.3em] text-white/60">
                & Leaf
              </p>
            </div>
          </motion.div>

          {/* FLOATING CARD 1 */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-0 top-24 rounded-2xl border border-white/70 bg-white/80 p-4 shadow-xl backdrop-blur-xl sm:left-2"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D45060]">
              New arrivals
            </p>

            <p className="mt-1 text-sm font-bold text-[#800020]">
              Just dropped
            </p>
          </motion.div>

          {/* FLOATING CARD 2 */}
          <motion.div
            animate={{ y: [0, 14, 0] }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-24 right-0 rounded-2xl border border-white/70 bg-white/80 p-4 shadow-xl backdrop-blur-xl"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D45060]">
              Premium picks
            </p>

            <p className="mt-1 text-sm font-bold text-[#800020]">
              Made to discover
            </p>
          </motion.div>

          {/* FLOATING DOT */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute right-16 top-16 h-5 w-5 rounded-full bg-[#D45060] shadow-lg shadow-[#D45060]/40"
          />

          {/* FLOATING DOT */}
          <motion.div
            animate={{
              scale: [1, 1.25, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-20 left-20 h-3 w-3 rounded-full bg-[#800020]"
          />
        </motion.div>
      </div>

      {/* BOTTOM STATS */}
      <div className="relative border-t border-[#800020]/10 bg-white/50 backdrop-blur-md">
        <div className="mx-auto grid max-w-7xl grid-cols-2 px-6 py-5 sm:grid-cols-4 lg:px-10">
          <div className="border-r border-[#800020]/10 px-4 text-center sm:px-6">
            <p className="text-xl font-bold text-[#800020]">4+</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-[#800020]/40">
              Categories
            </p>
          </div>

          <div className="px-4 text-center sm:border-r sm:border-[#800020]/10 sm:px-6">
            <p className="text-xl font-bold text-[#800020]">100+</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-[#800020]/40">
              Products
            </p>
          </div>

          <div className="hidden border-r border-[#800020]/10 px-6 text-center sm:block">
            <p className="text-xl font-bold text-[#800020]">24/7</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-[#800020]/40">
              Shopping
            </p>
          </div>

          <div className="hidden px-6 text-center sm:block">
            <p className="text-xl font-bold text-[#800020]">100%</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-[#800020]/40">
              Experience
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}