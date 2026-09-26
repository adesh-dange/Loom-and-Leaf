"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "Deals", href: "/deals" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const categories = [
  { name: "Fashion", href: "/categories/fashion" },
  { name: "Electronics", href: "/categories/electronics" },
  { name: "Home & Living", href: "/categories/home-living" },
  { name: "Beauty", href: "/categories/beauty" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleSearch = (e) => {
    e.preventDefault();

    const trimmedSearch = search.trim();

    if (!trimmedSearch) return;

    window.location.href = `/search?q=${encodeURIComponent(trimmedSearch)}`;
  };

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-[#800020]/10 bg-white/90 shadow-lg backdrop-blur-xl"
            : "bg-white/70 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="flex h-[76px] items-center justify-between gap-4">

            {/* LOGO */}
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="shrink-0 text-2xl font-bold tracking-tight text-[#800020] sm:text-3xl"
            >
              Loom <span className="text-[#D45060]">&</span> Leaf
            </Link>

            {/* DESKTOP NAVIGATION */}
            <nav className="hidden items-center gap-7 lg:flex">
              {navLinks.slice(0, 3).map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-semibold text-[#800020]/80 transition hover:text-[#D45060]"
                >
                  {link.name}
                </Link>
              ))}

              {/* CATEGORIES DROPDOWN */}
              <div
                className="relative"
                onMouseEnter={() => setCategoryOpen(true)}
                onMouseLeave={() => setCategoryOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setCategoryOpen(!categoryOpen)}
                  className="flex items-center gap-1 text-sm font-semibold text-[#800020]/80 transition hover:text-[#D45060]"
                >
                  Categories
                  <span
                    className={`text-xs transition-transform ${
                      categoryOpen ? "rotate-180" : ""
                    }`}
                  >
                    ▾
                  </span>
                </button>

                <AnimatePresence>
                  {categoryOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18 }}
                      className="absolute left-1/2 top-full mt-4 w-64 -translate-x-1/2 overflow-hidden rounded-2xl border border-[#800020]/10 bg-white p-2 shadow-2xl"
                    >
                      {categories.map((category) => (
                        <Link
                          key={category.name}
                          href={category.href}
                          onClick={() => setCategoryOpen(false)}
                          className="block rounded-xl px-4 py-3 text-sm font-medium text-[#800020]/80 transition hover:bg-[#F7ADAD]/30 hover:text-[#800020]"
                        >
                          {category.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {navLinks.slice(3).map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-semibold text-[#800020]/80 transition hover:text-[#D45060]"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* DESKTOP ACTIONS */}
            <div className="hidden items-center gap-2 lg:flex">

              {/* SEARCH */}
              <button
                type="button"
                aria-label="Open search"
                onClick={() => setSearchOpen(!searchOpen)}
                className="flex h-10 w-10 items-center justify-center rounded-full text-[#800020] transition hover:bg-[#F7ADAD]/40"
              >
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-4-4" />
                </svg>
              </button>

              {/* WISHLIST */}
              <Link
                href="/wishlist"
                aria-label="Wishlist"
                className="flex h-10 w-10 items-center justify-center rounded-full text-[#800020] transition hover:bg-[#F7ADAD]/40"
              >
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />
                </svg>
              </Link>

              {/* CART */}
              <Link
                href="/cart"
                aria-label="Cart"
                className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#800020] transition hover:bg-[#F7ADAD]/40"
              >
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M6 8h12l1 12H5L6 8Z" />
                  <path d="M9 8V6a3 3 0 0 1 6 0v2" />
                </svg>

                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#D45060] px-1 text-[9px] font-bold text-white">
                  0
                </span>
              </Link>

              {/* ACCOUNT */}
              <Link
                href="/account"
                aria-label="Account"
                className="ml-1 flex h-10 w-10 items-center justify-center rounded-full bg-[#800020] text-white transition hover:bg-[#D45060]"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21a8 8 0 0 1 16 0" />
                </svg>
              </Link>
            </div>

            {/* MOBILE ACTIONS */}
            <div className="flex items-center gap-1 lg:hidden">
              <Link
                href="/cart"
                aria-label="Cart"
                className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#800020]"
              >
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M6 8h12l1 12H5L6 8Z" />
                  <path d="M9 8V6a3 3 0 0 1 6 0v2" />
                </svg>

                <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#D45060] px-1 text-[9px] font-bold text-white">
                  0
                </span>
              </Link>

              <button
                type="button"
                aria-label="Open menu"
                onClick={() => setMenuOpen(true)}
                className="flex h-10 w-10 items-center justify-center rounded-full text-[#800020]"
              >
                <span className="flex flex-col gap-1.5">
                  <span className="h-0.5 w-5 bg-current" />
                  <span className="h-0.5 w-5 bg-current" />
                  <span className="h-0.5 w-3 bg-current" />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* SEARCH BAR */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden border-t border-[#800020]/10 bg-white"
            >
              <div className="mx-auto max-w-3xl px-4 py-4 sm:px-6">
                <form
                  onSubmit={handleSearch}
                  className="flex items-center gap-3 rounded-2xl border border-[#800020]/10 bg-[#F7ADAD]/20 px-4"
                >
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#800020"
                    strokeWidth="2"
                  >
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-4-4" />
                  </svg>

                  <input
                    autoFocus
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search products, categories..."
                    className="h-12 flex-1 bg-transparent text-sm text-[#800020] outline-none placeholder:text-[#800020]/40"
                  />

                  <button
                    type="submit"
                    className="rounded-xl bg-[#800020] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[#D45060]"
                  >
                    Search
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-[60] bg-[#800020]/40 backdrop-blur-sm lg:hidden"
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed bottom-0 right-0 top-0 z-[70] w-[85%] max-w-sm overflow-y-auto bg-white p-6 shadow-2xl lg:hidden"
            >
              {/* MOBILE HEADER */}
              <div className="flex items-center justify-between">
                <Link
                  href="/"
                  onClick={() => setMenuOpen(false)}
                  className="text-2xl font-bold text-[#800020]"
                >
                  Loom <span className="text-[#D45060]">&</span> Leaf
                </Link>

                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F7ADAD]/30 text-xl text-[#800020]"
                >
                  ×
                </button>
              </div>

              {/* MOBILE NAV */}
              <nav className="mt-10">
                <div className="space-y-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between rounded-xl px-4 py-4 text-base font-semibold text-[#800020] transition hover:bg-[#F7ADAD]/30"
                    >
                      {link.name}
                      <span className="text-[#D45060]">→</span>
                    </Link>
                  ))}
                </div>

                {/* CATEGORIES */}
                <div className="mt-6 border-t border-[#800020]/10 pt-6">
                  <p className="px-4 text-xs font-bold uppercase tracking-[0.2em] text-[#D45060]">
                    Categories
                  </p>

                  <div className="mt-3 space-y-1">
                    {categories.map((category) => (
                      <Link
                        key={category.name}
                        href={category.href}
                        onClick={() => setMenuOpen(false)}
                        className="block rounded-xl px-4 py-3 text-sm font-medium text-[#800020]/70 transition hover:bg-[#F7ADAD]/30 hover:text-[#800020]"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* ACCOUNT ACTIONS */}
                <div className="mt-6 border-t border-[#800020]/10 pt-6">
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      href="/wishlist"
                      onClick={() => setMenuOpen(false)}
                      className="rounded-xl border border-[#800020]/10 px-4 py-3 text-center text-sm font-semibold text-[#800020] transition hover:bg-[#F7ADAD]/20"
                    >
                      Wishlist
                    </Link>

                    <Link
                      href="/account"
                      onClick={() => setMenuOpen(false)}
                      className="rounded-xl bg-[#800020] px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#D45060]"
                    >
                      Account
                    </Link>
                  </div>
                </div>

                {/* MOBILE CTA */}
                <Link
                  href="/shop"
                  onClick={() => setMenuOpen(false)}
                  className="mt-6 block rounded-xl bg-[#D45060] px-5 py-4 text-center text-sm font-bold text-white transition hover:bg-[#800020]"
                >
                  Explore Shop
                </Link>
              </nav>

              {/* MOBILE FOOTER */}
              <div className="mt-12 border-t border-[#800020]/10 pt-6">
                <p className="text-xs leading-5 text-gray-400">
                  Discover thoughtfully curated products with the Loom & Leaf
                  shopping experience.
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* NAVBAR SPACING */}
      <div className="h-[76px]" />
    </>
  );
}