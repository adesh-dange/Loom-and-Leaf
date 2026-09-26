"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const initialRatings = [
  {
    id: 1,
    product: "Classic Oversized Jacket",
    category: "Fashion",
    rating: 5,
    title: "Premium quality",
    review:
      "The material feels premium and the fit is exactly what I expected.",
    date: "2 days ago",
    verified: true,
  },
  {
    id: 2,
    product: "Aura Wireless Headphones",
    category: "Electronics",
    rating: 4,
    title: "Great sound experience",
    review:
      "Comfortable to wear and the sound quality is really good for everyday use.",
    date: "1 week ago",
    verified: true,
  },
  {
    id: 3,
    product: "Luna Ceramic Vase",
    category: "Home & Living",
    rating: 5,
    title: "Looks beautiful",
    review:
      "The design looks elegant and fits perfectly with my room decor.",
    date: "2 weeks ago",
    verified: true,
  },
  {
    id: 4,
    product: "Minimal Glow Serum",
    category: "Beauty",
    rating: 3,
    title: "Good but expected more",
    review:
      "The packaging is nice and the product is decent for the price.",
    date: "3 weeks ago",
    verified: false,
  },
];

function Stars({ rating, interactive = false, onChange }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type={interactive ? "button" : undefined}
          disabled={!interactive}
          onClick={() => interactive && onChange?.(star)}
          className={`text-xl transition ${
            star <= rating ? "text-[#D45060]" : "text-gray-200"
          } ${interactive ? "hover:scale-110" : ""}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

function RatingBar({ rating, count, total, onClick, active }) {
  const percentage = total ? (count / total) * 100 : 0;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition ${
        active ? "bg-[#F7ADAD]/30" : "hover:bg-gray-50"
      }`}
    >
      <span className="w-12 text-xs font-bold text-[#800020]">
        {rating} ★
      </span>

      <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.7 }}
          className="h-full rounded-full bg-[#D45060]"
        />
      </div>

      <span className="w-7 text-right text-xs text-gray-400">
        {count}
      </span>
    </button>
  );
}

export default function RatingsPage() {
  const [ratings, setRatings] = useState(initialRatings);
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("recent");
  const [showForm, setShowForm] = useState(false);
  const [toast, setToast] = useState("");

  const [newRating, setNewRating] = useState({
    product: "",
    rating: 5,
    title: "",
    review: "",
  });

  const categories = [
    "All",
    ...new Set(initialRatings.map((item) => item.category)),
  ];

  const ratingCounts = useMemo(() => {
    return {
      5: ratings.filter((item) => item.rating === 5).length,
      4: ratings.filter((item) => item.rating === 4).length,
      3: ratings.filter((item) => item.rating === 3).length,
      2: ratings.filter((item) => item.rating === 2).length,
      1: ratings.filter((item) => item.rating === 1).length,
    };
  }, [ratings]);

  const averageRating = useMemo(() => {
    if (!ratings.length) return "0.0";

    return (
      ratings.reduce((total, item) => total + item.rating, 0) /
      ratings.length
    ).toFixed(1);
  }, [ratings]);

  const filteredRatings = useMemo(() => {
    let result = [...ratings];

    if (selectedRating > 0) {
      result = result.filter(
        (item) => item.rating === selectedRating
      );
    }

    if (selectedCategory !== "All") {
      result = result.filter(
        (item) => item.category === selectedCategory
      );
    }

    if (sortBy === "highest") {
      result.sort((a, b) => b.rating - a.rating);
    }

    if (sortBy === "lowest") {
      result.sort((a, b) => a.rating - b.rating);
    }

    return result;
  }, [ratings, selectedRating, selectedCategory, sortBy]);

  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2200);
  };

  const submitRating = (e) => {
    e.preventDefault();

    if (
      !newRating.product.trim() ||
      !newRating.title.trim() ||
      !newRating.review.trim()
    ) {
      showToast("Please complete all fields.");
      return;
    }

    const rating = {
      id: Date.now(),
      product: newRating.product,
      category: "Other",
      rating: newRating.rating,
      title: newRating.title,
      review: newRating.review,
      date: "Just now",
      verified: false,
    };

    setRatings((current) => [rating, ...current]);

    setNewRating({
      product: "",
      rating: 5,
      title: "",
      review: "",
    });

    setShowForm(false);
    showToast("Your rating has been added.");
  };

  const clearFilters = () => {
    setSelectedRating(0);
    setSelectedCategory("All");
  };

  return (
    <main className="min-h-screen bg-[#F7ADAD]/20 text-[#800020]">
      {/* HEADER */}
      <section className="border-b border-[#800020]/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#D45060]">
                Customer experience
              </p>

              <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
                Ratings
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-7 text-gray-500">
                Explore customer ratings across Loom & Leaf products.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="w-fit rounded-full bg-[#800020] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#D45060]"
            >
              Rate a Product
            </button>
          </div>
        </div>
      </section>

      {/* SUMMARY */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          {/* SCORE */}
          <div className="rounded-[2rem] bg-[#800020] p-7 text-white">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F7ADAD]">
              Average rating
            </p>

            <div className="mt-5 flex items-end gap-3">
              <span className="text-6xl font-bold">
                {averageRating}
              </span>

              <span className="pb-2 text-sm text-white/50">
                / 5
              </span>
            </div>

            <div className="mt-3">
              <Stars rating={Math.round(Number(averageRating))} />
            </div>

            <p className="mt-4 text-sm text-white/55">
              {ratings.length} total ratings
            </p>
          </div>

          {/* BREAKDOWN */}
          <div className="rounded-[2rem] border border-[#800020]/10 bg-white p-7">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-xl font-bold">
                  Rating breakdown
                </h2>

                <p className="mt-1 text-xs text-gray-400">
                  Click a rating to filter the results.
                </p>
              </div>

              {(selectedRating > 0 ||
                selectedCategory !== "All") && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-xs font-bold text-[#D45060]"
                >
                  Clear filters
                </button>
              )}
            </div>

            <div className="mt-5 space-y-1">
              {[5, 4, 3, 2, 1].map((rating) => (
                <RatingBar
                  key={rating}
                  rating={rating}
                  count={ratingCounts[rating]}
                  total={ratings.length}
                  active={selectedRating === rating}
                  onClick={() =>
                    setSelectedRating(
                      selectedRating === rating ? 0 : rating
                    )
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FILTERS */}
      <section className="mx-auto max-w-7xl px-6 pb-5 lg:px-10">
        <div className="flex flex-col gap-4 rounded-[2rem] border border-[#800020]/10 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-4 py-2 text-xs font-bold transition ${
                  selectedCategory === category
                    ? "bg-[#800020] text-white"
                    : "bg-[#F7ADAD]/25 text-[#800020] hover:bg-[#F7ADAD]/50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-xl border border-[#800020]/10 bg-white px-4 py-3 text-xs font-semibold outline-none focus:border-[#D45060]"
          >
            <option value="recent">Most Recent</option>
            <option value="highest">Highest Rated</option>
            <option value="lowest">Lowest Rated</option>
          </select>
        </div>
      </section>

      {/* RATING LIST */}
      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-10">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D45060]">
              Ratings
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              {filteredRatings.length}{" "}
              {filteredRatings.length === 1
                ? "rating"
                : "ratings"}
            </h2>
          </div>
        </div>

        {filteredRatings.length > 0 ? (
          <div className="grid gap-4">
            {filteredRatings.map((item, index) => (
              <motion.article
                key={item.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.35,
                  delay: index * 0.04,
                }}
                className="rounded-[2rem] border border-[#800020]/10 bg-white p-6 shadow-sm sm:p-7"
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-lg font-bold">
                        {item.product}
                      </h3>

                      <span className="rounded-full bg-[#F7ADAD]/35 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#800020]">
                        {item.category}
                      </span>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <Stars rating={item.rating} />

                      <span className="rounded-full bg-[#800020] px-3 py-1 text-xs font-bold text-white">
                        {item.rating}.0
                      </span>

                      {item.verified && (
                        <span className="text-xs font-semibold text-[#D45060]">
                          ✓ Verified Purchase
                        </span>
                      )}
                    </div>
                  </div>

                  <span className="text-xs text-gray-400">
                    {item.date}
                  </span>
                </div>

                <div className="mt-5 border-t border-gray-100 pt-5">
                  <h4 className="font-bold">
                    {item.title}
                  </h4>

                  <p className="mt-2 max-w-3xl text-sm leading-7 text-gray-500">
                    {item.review}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="rounded-[2rem] bg-white px-6 py-20 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F7ADAD] text-2xl">
              ★
            </div>

            <h3 className="mt-5 text-xl font-bold">
              No ratings found
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Try changing your filters.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 rounded-full bg-[#800020] px-5 py-3 text-xs font-bold text-white"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>

      {/* ADD RATING MODAL */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowForm(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#800020]/70 p-5 backdrop-blur-sm"
          >
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 20,
                scale: 0.96,
              }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-[2rem] bg-white p-6 shadow-2xl sm:p-8"
            >
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#D45060]">
                    Customer feedback
                  </p>

                  <h2 className="mt-2 text-2xl font-bold">
                    Rate a Product
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F7ADAD]/30 text-xl"
                >
                  ×
                </button>
              </div>

              <form
                onSubmit={submitRating}
                className="mt-7 space-y-5"
              >
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Product Name
                  </label>

                  <input
                    value={newRating.product}
                    onChange={(e) =>
                      setNewRating({
                        ...newRating,
                        product: e.target.value,
                      })
                    }
                    placeholder="Enter product name"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none focus:border-[#D45060] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Your Rating
                  </label>

                  <Stars
                    rating={newRating.rating}
                    interactive
                    onChange={(rating) =>
                      setNewRating({
                        ...newRating,
                        rating,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Rating Title
                  </label>

                  <input
                    value={newRating.title}
                    onChange={(e) =>
                      setNewRating({
                        ...newRating,
                        title: e.target.value,
                      })
                    }
                    placeholder="Example: Excellent product"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none focus:border-[#D45060] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Your Experience
                  </label>

                  <textarea
                    value={newRating.review}
                    onChange={(e) =>
                      setNewRating({
                        ...newRating,
                        review: e.target.value,
                      })
                    }
                    placeholder="Tell us about the product..."
                    rows={5}
                    className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none focus:border-[#D45060] focus:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-[#800020] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#D45060]"
                >
                  Submit Rating
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOAST */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
              x: "-50%",
            }}
            animate={{
              opacity: 1,
              y: 0,
              x: "-50%",
            }}
            exit={{
              opacity: 0,
              y: 20,
              x: "-50%",
            }}
            className="fixed bottom-6 left-1/2 z-[110] rounded-full bg-[#800020] px-6 py-3 text-sm font-semibold text-white shadow-2xl"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}