"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setMessage(
      "Demo login successful. Real authentication will be connected later."
    );

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  return (
    <main className="min-h-screen bg-[#F7ADAD]/20 text-[#800020]">
      {/* Toast */}
      {message && (
        <div className="fixed right-5 top-5 z-50 max-w-sm rounded-2xl bg-[#800020] px-5 py-4 text-sm font-semibold text-white shadow-2xl">
          {message}
        </div>
      )}

      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left Visual Section */}
        <section className="relative hidden overflow-hidden bg-[#800020] lg:flex">
          {/* Decorative shapes */}
          <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[#D45060]/40 blur-3xl" />
          <div className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-[#F7ADAD]/30 blur-3xl" />

          <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">
            {/* Logo */}
            <Link
              href="/"
              className="text-3xl font-black tracking-tight text-white"
            >
              Loom <span className="text-[#F7ADAD]">&</span> Leaf
            </Link>

            {/* Main Content */}
            <div className="max-w-xl">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#F7ADAD]">
                Welcome Back
              </p>

              <h1 className="mt-5 text-5xl font-black leading-[1.05] text-white xl:text-6xl">
                Your world of
                <span className="block text-[#F7ADAD]">
                  beautiful finds.
                </span>
              </h1>

              <p className="mt-6 max-w-md text-base leading-7 text-white/65">
                Sign in to access your wishlist, orders, saved preferences and
                personalized Loom & Leaf experience.
              </p>

              {/* Feature Cards */}
              <div className="mt-10 grid grid-cols-3 gap-3">
                <FeatureCard
                  icon="♡"
                  title="Wishlist"
                  text="Save favorites"
                />

                <FeatureCard
                  icon="▤"
                  title="Orders"
                  text="Track purchases"
                />

                <FeatureCard
                  icon="♢"
                  title="Offers"
                  text="Exclusive deals"
                />
              </div>
            </div>

            {/* Bottom */}
            <div className="flex items-center justify-between text-xs text-white/45">
              <span>© 2026 Loom & Leaf</span>
              <span>Premium shopping experience</span>
            </div>
          </div>
        </section>

        {/* Right Login Section */}
        <section className="flex min-h-screen items-center justify-center px-5 py-10 md:px-10">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="mb-10 lg:hidden">
              <Link
                href="/"
                className="text-3xl font-black tracking-tight"
              >
                Loom <span className="text-[#D45060]">&</span> Leaf
              </Link>
            </div>

            {/* Heading */}
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#D45060]">
                Welcome Back
              </p>

              <h2 className="mt-2 text-4xl font-black tracking-tight md:text-5xl">
                Sign In
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#800020]/55">
                Enter your details to continue to your Loom & Leaf account.
              </p>
            </div>

            {/* Login Card */}
            <div className="mt-8 rounded-[2rem] border border-[#800020]/10 bg-white p-6 shadow-xl md:p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="text-xs font-bold text-[#800020]/70"
                  >
                    Email Address
                  </label>

                  <div className="relative mt-2">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#800020]/35">
                      ✉
                    </span>

                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(event) =>
                        updateField("email", event.target.value)
                      }
                      placeholder="you@example.com"
                      required
                      autoComplete="email"
                      className="w-full rounded-xl border border-[#800020]/10 bg-[#F7ADAD]/10 py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-[#800020]/30 focus:border-[#D45060] focus:bg-white"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-xs font-bold text-[#800020]/70"
                    >
                      Password
                    </label>

                    <Link
                      href="#"
                      onClick={(event) => event.preventDefault()}
                      className="text-xs font-bold text-[#D45060] transition hover:text-[#800020]"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  <div className="relative mt-2">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#800020]/35">
                      🔒
                    </span>

                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={(event) =>
                        updateField("password", event.target.value)
                      }
                      placeholder="Enter your password"
                      required
                      autoComplete="current-password"
                      className="w-full rounded-xl border border-[#800020]/10 bg-[#F7ADAD]/10 py-3.5 pl-11 pr-12 text-sm outline-none transition placeholder:text-[#800020]/30 focus:border-[#D45060] focus:bg-white"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((current) => !current)
                      }
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                      className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-sm text-[#800020]/45 transition hover:bg-[#F7ADAD]/30 hover:text-[#800020]"
                    >
                      {showPassword ? "◉" : "○"}
                    </button>
                  </div>
                </div>

                {/* Remember */}
                <div className="flex items-center">
                  <label className="flex cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(event) =>
                        setRememberMe(event.target.checked)
                      }
                      className="h-4 w-4 accent-[#800020]"
                    />

                    <span className="text-xs text-[#800020]/60">
                      Remember me
                    </span>
                  </label>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-xl bg-[#800020] px-5 py-4 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#D45060]"
                >
                  Sign In →
                </button>
              </form>

              {/* Divider */}
              <div className="my-7 flex items-center gap-4">
                <div className="h-px flex-1 bg-[#800020]/10" />

                <span className="text-[10px] font-bold uppercase tracking-widest text-[#800020]/35">
                  or continue with
                </span>

                <div className="h-px flex-1 bg-[#800020]/10" />
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setMessage("Google login is a frontend demo.")
                  }
                  className="flex items-center justify-center gap-2 rounded-xl border border-[#800020]/10 bg-white px-4 py-3 text-xs font-bold transition hover:border-[#D45060] hover:bg-[#F7ADAD]/10"
                >
                  <span className="font-black">G</span>
                  Google
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setMessage("Apple login is a frontend demo.")
                  }
                  className="flex items-center justify-center gap-2 rounded-xl border border-[#800020]/10 bg-white px-4 py-3 text-xs font-bold transition hover:border-[#D45060] hover:bg-[#F7ADAD]/10"
                >
                  <span className="text-base">●</span>
                  Apple
                </button>
              </div>
            </div>

            {/* Register */}
            <div className="mt-7 text-center">
              <p className="text-sm text-[#800020]/55">
                Don't have an account?
              </p>

              <Link
                href="/register"
                className="mt-2 inline-flex font-bold text-[#D45060] transition hover:text-[#800020]"
              >
                Create an Account →
              </Link>
            </div>

            {/* Footer Links */}
            <div className="mt-10 flex justify-center gap-5 text-[10px] font-semibold text-[#800020]/35">
              <Link
                href="/about"
                className="transition hover:text-[#D45060]"
              >
                About
              </Link>

              <span>•</span>

              <Link
                href="/contact"
                className="transition hover:text-[#D45060]"
              >
                Contact
              </Link>

              <span>•</span>

              <Link
                href="/"
                className="transition hover:text-[#D45060]"
              >
                Home
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function FeatureCard({ icon, title, text }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F7ADAD]/15 text-sm text-[#F7ADAD]">
        {icon}
      </div>

      <p className="mt-3 text-xs font-black text-white">{title}</p>

      <p className="mt-1 text-[10px] text-white/40">{text}</p>
    </div>
  );
}