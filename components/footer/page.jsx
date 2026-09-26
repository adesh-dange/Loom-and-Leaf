"use client";

import Link from "next/link";
import { useState } from "react";

const shopLinks = [
  { name: "Shop All", href: "/shop" },
  { name: "Deals", href: "/deals" },
  { name: "Fashion", href: "/categories/fashion" },
  { name: "Electronics", href: "/categories/electronics" },
  { name: "Home & Living", href: "/categories/home-living" },
  { name: "Beauty", href: "/categories/beauty" },
];

const supportLinks = [
  { name: "My Account", href: "/account" },
  { name: "Orders", href: "/orders" },
  { name: "Wishlist", href: "/wishlist" },
  { name: "Contact Us", href: "/contact" },
  { name: "About Us", href: "/about" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email.trim()) return;

    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="bg-[#800020] text-white">
      {/* NEWSLETTER */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#F7ADAD]">
                Stay in the loop
              </p>

              <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
                Discover what&apos;s new.
              </h2>

              <p className="mt-4 max-w-lg text-sm leading-7 text-white/60">
                Subscribe to receive new collection updates, exclusive offers,
                product discoveries, and more from Loom & Leaf.
              </p>
            </div>

            <div>
              {subscribed ? (
                <div className="rounded-2xl border border-white/10 bg-white/10 px-6 py-5 backdrop-blur-sm">
                  <p className="font-bold text-[#F7ADAD]">
                    You&apos;re subscribed.
                  </p>

                  <p className="mt-1 text-sm text-white/60">
                    Thanks for joining the Loom & Leaf community.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="flex flex-col gap-3 sm:flex-row"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="h-14 flex-1 rounded-xl border border-white/10 bg-white/10 px-5 text-sm text-white outline-none backdrop-blur-sm transition placeholder:text-white/40 focus:border-[#F7ADAD] focus:bg-white/15"
                  />

                  <button
                    type="submit"
                    className="h-14 rounded-xl bg-[#F7ADAD] px-7 text-sm font-bold text-[#800020] transition hover:bg-white"
                  >
                    Subscribe
                  </button>
                </form>
              )}

              <p className="mt-3 text-xs text-white/35">
                By subscribing, you agree to receive updates from Loom & Leaf.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN FOOTER */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
            {/* BRAND */}
            <div>
              <Link
                href="/"
                className="text-3xl font-bold tracking-tight"
              >
                Loom <span className="text-[#F7ADAD]">&</span> Leaf
              </Link>

              <p className="mt-6 max-w-sm text-sm leading-7 text-white/55">
                A premium digital shopping experience designed around
                discovery, thoughtful collections, and effortless shopping.
              </p>

              {/* SOCIALS */}
              <div className="mt-7 flex gap-3">
                <a
                  href="#"
                  aria-label="Instagram"
                  onClick={(e) => e.preventDefault()}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm font-bold transition hover:border-[#F7ADAD] hover:bg-[#F7ADAD] hover:text-[#800020]"
                >
                  IG
                </a>

                <a
                  href="#"
                  aria-label="Facebook"
                  onClick={(e) => e.preventDefault()}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm font-bold transition hover:border-[#F7ADAD] hover:bg-[#F7ADAD] hover:text-[#800020]"
                >
                  f
                </a>

                <a
                  href="#"
                  aria-label="X"
                  onClick={(e) => e.preventDefault()}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm font-bold transition hover:border-[#F7ADAD] hover:bg-[#F7ADAD] hover:text-[#800020]"
                >
                  X
                </a>

                <a
                  href="#"
                  aria-label="LinkedIn"
                  onClick={(e) => e.preventDefault()}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm font-bold transition hover:border-[#F7ADAD] hover:bg-[#F7ADAD] hover:text-[#800020]"
                >
                  in
                </a>
              </div>
            </div>

            {/* SHOP */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[#F7ADAD]">
                Shop
              </h3>

              <ul className="mt-6 space-y-4">
                {shopLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/55 transition hover:text-white"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* SUPPORT */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[#F7ADAD]">
                Support
              </h3>

              <ul className="mt-6 space-y-4">
                {supportLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/55 transition hover:text-white"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* INFORMATION */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[#F7ADAD]">
                Information
              </h3>

              <ul className="mt-6 space-y-4 text-sm text-white/55">
                <li>Secure Shopping</li>
                <li>Easy Returns</li>
                <li>Premium Collections</li>
                <li>Responsive Experience</li>
              </ul>

              <Link
                href="/contact"
                className="mt-7 inline-flex rounded-full border border-white/15 px-5 py-2.5 text-xs font-bold text-white transition hover:border-[#F7ADAD] hover:bg-[#F7ADAD] hover:text-[#800020]"
              >
                Need Help?
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM BAR */}
      <section className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 px-6 py-6 sm:flex-row sm:items-center lg:px-10">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Loom & Leaf. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-5 text-xs text-white/40">
            <button
              type="button"
              className="transition hover:text-white"
            >
              Privacy Policy
            </button>

            <button
              type="button"
              className="transition hover:text-white"
            >
              Terms & Conditions
            </button>

            <button
              type="button"
              className="transition hover:text-white"
            >
              Cookie Policy
            </button>
          </div>
        </div>
      </section>
    </footer>
  );
}