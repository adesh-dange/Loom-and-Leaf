"use client";

import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!acceptedTerms) {
      setMessage("Please accept the Terms & Conditions.");
      return;
    }

    setMessage("Account created successfully. Real authentication will be connected later.");
  };

  return (
    <main className="min-h-screen bg-[#F7ADAD] text-[#800020]">
      <div className="min-h-screen flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-6xl overflow-hidden rounded-[2rem] bg-white shadow-2xl">
          <div className="grid min-h-[700px] lg:grid-cols-2">

            {/* LEFT SIDE */}
            <div className="relative hidden overflow-hidden bg-[#800020] p-12 text-white lg:flex lg:flex-col lg:justify-between">
              <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#D45060] opacity-30 blur-3xl" />
              <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-[#F7ADAD] opacity-20 blur-3xl" />

              <div className="relative z-10">
                <Link href="/" className="text-3xl font-bold tracking-tight">
                  Loom <span className="text-[#F7ADAD]">&</span> Leaf
                </Link>

                <div className="mt-24 max-w-md">
                  <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#F7ADAD]">
                    Welcome to the collection
                  </p>

                  <h1 className="text-5xl font-bold leading-tight">
                    Create your
                    <br />
                    <span className="text-[#F7ADAD]">Loom & Leaf</span>
                    <br />
                    account.
                  </h1>

                  <p className="mt-6 text-base leading-7 text-white/75">
                    Save your favorite products, track orders, manage your
                    account, and enjoy a more personalized shopping experience.
                  </p>
                </div>
              </div>

              <div className="relative z-10 grid grid-cols-3 gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
                  <p className="text-2xl font-bold">01</p>
                  <p className="mt-1 text-xs text-white/60">Wishlist</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
                  <p className="text-2xl font-bold">02</p>
                  <p className="mt-1 text-xs text-white/60">Orders</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
                  <p className="text-2xl font-bold">03</p>
                  <p className="mt-1 text-xs text-white/60">Offers</p>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center justify-center px-6 py-10 sm:px-10 lg:px-14">
              <div className="w-full max-w-md">

                {/* Mobile Logo */}
                <div className="mb-8 text-center lg:hidden">
                  <Link
                    href="/"
                    className="text-3xl font-bold tracking-tight text-[#800020]"
                  >
                    Loom <span className="text-[#D45060]">&</span> Leaf
                  </Link>
                </div>

                <div className="mb-8">
                  <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#D45060]">
                    Get started
                  </p>

                  <h2 className="text-4xl font-bold tracking-tight text-[#800020]">
                    Create account
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-gray-500">
                    Join Loom & Leaf and make your shopping experience
                    effortless.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">

                  {/* Name */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#800020]">
                      Full Name
                    </label>

                    <input
                      type="text"
                      placeholder="Enter your full name"
                      required
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-800 outline-none transition focus:border-[#D45060] focus:bg-white focus:ring-2 focus:ring-[#D45060]/20"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#800020]">
                      Email Address
                    </label>

                    <input
                      type="email"
                      placeholder="Enter your email"
                      required
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-800 outline-none transition focus:border-[#D45060] focus:bg-white focus:ring-2 focus:ring-[#D45060]/20"
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#800020]">
                      Password
                    </label>

                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        required
                        minLength={6}
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 pr-20 text-sm text-gray-800 outline-none transition focus:border-[#D45060] focus:bg-white focus:ring-2 focus:ring-[#D45060]/20"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#D45060] hover:text-[#800020]"
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#800020]">
                      Confirm Password
                    </label>

                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        required
                        minLength={6}
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 pr-20 text-sm text-gray-800 outline-none transition focus:border-[#D45060] focus:bg-white focus:ring-2 focus:ring-[#D45060]/20"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#D45060] hover:text-[#800020]"
                      >
                        {showConfirmPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                  </div>

                  {/* Terms */}
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      className="mt-1 h-4 w-4 accent-[#800020]"
                    />

                    <p className="text-xs leading-5 text-gray-500">
                      I agree to the{" "}
                      <button
                        type="button"
                        className="font-semibold text-[#800020] hover:text-[#D45060]"
                      >
                        Terms & Conditions
                      </button>{" "}
                      and{" "}
                      <button
                        type="button"
                        className="font-semibold text-[#800020] hover:text-[#D45060]"
                      >
                        Privacy Policy
                      </button>
                      .
                    </p>
                  </div>

                  {/* Message */}
                  {message && (
                    <div className="rounded-xl border border-[#D45060]/20 bg-[#F7ADAD]/30 px-4 py-3 text-sm text-[#800020]">
                      {message}
                    </div>
                  )}

                  {/* Create Account */}
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-[#800020] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#800020]/20 transition hover:-translate-y-0.5 hover:bg-[#6b001b] active:translate-y-0"
                  >
                    Create Account
                  </button>

                  {/* Divider */}
                  <div className="flex items-center gap-4">
                    <div className="h-px flex-1 bg-gray-200" />
                    <span className="text-xs font-medium text-gray-400">
                      OR
                    </span>
                    <div className="h-px flex-1 bg-gray-200" />
                  </div>

                  {/* Social */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setMessage("Google registration is a frontend demo.")
                      }
                      className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:border-[#D45060] hover:bg-[#F7ADAD]/20"
                    >
                      <span className="font-bold text-[#800020]">G</span>
                      Google
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setMessage("Apple registration is a frontend demo.")
                      }
                      className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:border-[#D45060] hover:bg-[#F7ADAD]/20"
                    >
                      <span className="text-lg"></span>
                      Apple
                    </button>
                  </div>
                </form>

                {/* Login */}
                <p className="mt-8 text-center text-sm text-gray-500">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-bold text-[#800020] transition hover:text-[#D45060]"
                  >
                    Sign in
                  </Link>
                </p>

                {/* Footer */}
                <div className="mt-8 flex justify-center gap-5 text-xs text-gray-400">
                  <Link href="/" className="hover:text-[#800020]">
                    Home
                  </Link>

                  <Link href="/about" className="hover:text-[#800020]">
                    About
                  </Link>

                  <Link href="/contact" className="hover:text-[#800020]">
                    Contact
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}