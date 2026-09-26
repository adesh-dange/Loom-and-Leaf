"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

const contactCards = [
  {
    icon: "✉",
    title: "Email Us",
    description: "For general questions, product queries, and support.",
    value: "hello@loomandleaf.com",
  },
  {
    icon: "⌖",
    title: "Visit Us",
    description: "Our digital showroom is always open for you.",
    value: "Online Store · Available Worldwide",
  },
  {
    icon: "◷",
    title: "Support Hours",
    description: "Our support team is available to help.",
    value: "Monday – Saturday · 9 AM – 6 PM",
  },
];

const topics = [
  "General Enquiry",
  "Order Support",
  "Product Information",
  "Returns & Refunds",
  "Partnership",
  "Other",
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "General Enquiry",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);

    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        topic: "General Enquiry",
        message: "",
      });
    }, 100);
  };

  return (
    <main className="min-h-screen bg-white text-[#800020]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#800020] text-white">
        <div className="absolute -right-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-[#D45060]/30 blur-3xl" />

        <div className="absolute -bottom-48 -left-40 h-[30rem] w-[30rem] rounded-full bg-[#F7ADAD]/20 blur-3xl" />

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
                href="/about"
                className="transition hover:text-[#F7ADAD]"
              >
                About
              </Link>

              <Link
                href="/contact"
                className="text-[#F7ADAD]"
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
          <div className="grid min-h-[500px] items-center gap-12 py-20 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-2xl"
            >
              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.35em] text-[#F7ADAD]">
                Get in touch
              </p>

              <h1 className="text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl">
                We would love
                <br />
                to hear <span className="text-[#F7ADAD]">from you.</span>
              </h1>

              <p className="mt-7 max-w-xl text-base leading-8 text-white/75 sm:text-lg">
                Have a question about a product, an order, or your Loom & Leaf
                experience? Send us a message and our team will be happy to
                help.
              </p>
            </motion.div>

            {/* HERO VISUAL */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative mx-auto h-[350px] w-full max-w-[450px]"
            >
              <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20" />

              <div className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rotate-12 rounded-[3rem] bg-[#F7ADAD]" />

              <div className="absolute left-1/2 top-1/2 flex h-40 w-40 -translate-x-1/2 -translate-y-1/2 -rotate-6 items-center justify-center rounded-[2.5rem] bg-[#D45060] shadow-2xl">
                <div className="text-center">
                  <p className="text-5xl font-bold">L</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.3em]">
                    & Leaf
                  </p>
                </div>
              </div>

              <div className="absolute left-0 top-12 rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur-md">
                <p className="text-xs uppercase tracking-widest text-[#F7ADAD]">
                  Questions?
                </p>
                <p className="mt-1 font-bold">We are here.</p>
              </div>

              <div className="absolute bottom-8 right-0 rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur-md">
                <p className="text-xs uppercase tracking-widest text-[#F7ADAD]">
                  Let&apos;s talk
                </p>
                <p className="mt-1 font-bold">Anytime.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CONTACT CARDS */}
      <section className="bg-[#F7ADAD]/30 px-6 py-20 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {contactCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
              className="rounded-3xl border border-[#800020]/10 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#800020] text-xl text-[#F7ADAD]">
                {card.icon}
              </div>

              <h2 className="mt-6 text-xl font-bold text-[#800020]">
                {card.title}
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                {card.description}
              </p>

              <p className="mt-5 text-sm font-bold text-[#D45060]">
                {card.value}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="px-6 py-24 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.8fr_1.2fr]">
          {/* LEFT */}
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#D45060]">
              Send us a message
            </p>

            <h2 className="mt-4 text-4xl font-bold leading-tight text-[#800020] sm:text-5xl">
              Let&apos;s start a conversation.
            </h2>

            <p className="mt-6 max-w-md text-base leading-8 text-gray-500">
              Whether you need help with an order or simply want to know more
              about Loom & Leaf, send us a message using the form.
            </p>

            <div className="mt-10 rounded-3xl bg-[#800020] p-7 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F7ADAD]">
                Quick help
              </p>

              <p className="mt-4 text-lg font-semibold">
                Looking for order information?
              </p>

              <p className="mt-2 text-sm leading-6 text-white/60">
                You can view your recent orders and their current status from
                your account.
              </p>

              <Link
                href="/orders"
                className="mt-6 inline-flex rounded-full bg-[#F7ADAD] px-5 py-3 text-sm font-bold text-[#800020] transition hover:bg-white"
              >
                View Orders
              </Link>
            </div>
          </div>

          {/* FORM */}
          <div className="rounded-[2rem] border border-[#800020]/10 bg-white p-6 shadow-xl sm:p-9">
            {submitted ? (
              <div className="flex min-h-[520px] flex-col items-center justify-center text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#F7ADAD] text-3xl text-[#800020]">
                  ✓
                </div>

                <h2 className="mt-7 text-3xl font-bold text-[#800020]">
                  Message sent!
                </h2>

                <p className="mt-4 max-w-md text-sm leading-7 text-gray-500">
                  Thank you for reaching out to Loom & Leaf. Your message has
                  been received. Our support experience will be connected to a
                  real backend in a future version.
                </p>

                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 rounded-full bg-[#800020] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#D45060]"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* NAME + EMAIL */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-semibold text-[#800020]"
                    >
                      Full Name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-800 outline-none transition focus:border-[#D45060] focus:bg-white focus:ring-2 focus:ring-[#D45060]/20"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-semibold text-[#800020]"
                    >
                      Email Address
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-800 outline-none transition focus:border-[#D45060] focus:bg-white focus:ring-2 focus:ring-[#D45060]/20"
                    />
                  </div>
                </div>

                {/* TOPIC */}
                <div>
                  <label
                    htmlFor="topic"
                    className="mb-2 block text-sm font-semibold text-[#800020]"
                  >
                    What can we help with?
                  </label>

                  <select
                    id="topic"
                    name="topic"
                    value={formData.topic}
                    onChange={handleChange}
                    className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-800 outline-none transition focus:border-[#D45060] focus:bg-white focus:ring-2 focus:ring-[#D45060]/20"
                  >
                    {topics.map((topic) => (
                      <option key={topic} value={topic}>
                        {topic}
                      </option>
                    ))}
                  </select>
                </div>

                {/* MESSAGE */}
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-semibold text-[#800020]"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help..."
                    required
                    rows={7}
                    className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-800 outline-none transition focus:border-[#D45060] focus:bg-white focus:ring-2 focus:ring-[#D45060]/20"
                  />
                </div>

                {/* SUBMIT */}
                <button
                  type="submit"
                  className="w-full rounded-xl bg-[#800020] px-5 py-4 text-sm font-bold text-white shadow-lg shadow-[#800020]/20 transition hover:-translate-y-0.5 hover:bg-[#D45060] active:translate-y-0"
                >
                  Send Message
                </button>

                <p className="text-center text-xs leading-5 text-gray-400">
                  This is currently a frontend demonstration. Messages are not
                  sent to a real support server.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ CTA */}
      <section className="px-6 pb-24 lg:px-10">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-[#F7ADAD] px-8 py-14 text-center sm:px-12">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#D45060]">
            Need something else?
          </p>

          <h2 className="mt-4 text-3xl font-bold text-[#800020] sm:text-4xl">
            Explore Loom & Leaf.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#800020]/60">
            Discover our collections, learn more about our story, or continue
            shopping.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-4">
            <Link
              href="/about"
              className="rounded-full bg-[#800020] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#D45060]"
            >
              About Us
            </Link>

            <Link
              href="/shop"
              className="rounded-full bg-white px-7 py-3.5 text-sm font-bold text-[#800020] transition hover:-translate-y-0.5"
            >
              Shop Now
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
            <Link href="/" className="hover:text-[#800020]">
              Home
            </Link>

            <Link href="/shop" className="hover:text-[#800020]">
              Shop
            </Link>

            <Link href="/about" className="hover:text-[#800020]">
              About
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}