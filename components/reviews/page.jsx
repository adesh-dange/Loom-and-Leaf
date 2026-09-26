"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const initialReviews = [
  {
    id: 1,
    name: "Aarav Mehta",
    rating: 5,
    title: "Beautiful quality and design",
    text: "The product looks exactly like the presentation. The quality feels premium and the overall experience was smooth.",
    date: "2 days ago",
    verified: true,
    helpful: 24,
  },
  {
    id: 2,
    name: "Isha Sharma",
    rating: 4,
    title: "Really happy with my purchase",
    text: "The design is elegant and the product feels well made. Delivery experience was also good.",
    date: "1 week ago",
    verified: true,
    helpful: 18,
  },
  {
    id: 3,
    name: "Rohan Patil",
    rating: 5,
    title: "Exactly what I expected",
    text: "Very clean design, good finishing and great overall value. Would definitely explore more products from Loom & Leaf.",
    date: "2 weeks ago",
    verified: true,
    helpful: 31,
  },
  {
    id: 4,
    name: "Ananya Kulkarni",
    rating: 3,
    title: "Good product",
    text: "The product is good overall. The design is nice and the quality is decent for the price.",
    date: "3 weeks ago",
    verified: false,
    helpful: 9,
  },
];

const ratingDistribution = [
  { rating: 5, count: 3, percentage: 75 },
  { rating: 4, count: 1, percentage: 25 },
  { rating: 3, count: 1, percentage: 25 },
  { rating: 2, count: 0, percentage: 0 },
  { rating: 1, count: 0, percentage: 0 },
];

function Stars({ rating, size = "text-sm" }) {
  return (
    <div className={`flex items-center gap-0.5 ${size}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={
            star <= rating ? "text-[#D45060]" : "text-gray-200"
          }
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState(initialReviews);
  const [selectedRating, setSelectedRating] = useState(0);
  const [sortBy, setSortBy] = useState("recent");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [helpfulReviews, setHelpfulReviews] = useState([]);
  const [toast, setToast] = useState("");

  const [newReview, setNewReview] = useState({
    name: "",
    title: "",
    rating: 5,
    text: "",
  });

  const averageRating = useMemo(() => {
    if (!reviews.length) return 0;

    return (
      reviews.reduce((sum, review) => sum + review.rating, 0) /
      reviews.length
    ).toFixed(1);
  }, [reviews]);

  const filteredReviews = useMemo(() => {
    let result =
      selectedRating === 0
        ? [...reviews]
        : reviews.filter((review) => review.rating === selectedRating);

    if (sortBy === "highest") {
      result.sort((a, b) => b.rating - a.rating);
    }

    if (sortBy === "lowest") {
      result.sort((a, b) => a.rating - b.rating);
    }

    if (sortBy === "helpful") {
      result.sort((a, b) => b.helpful - a.helpful);
    }

    return result;
  }, [reviews, selectedRating, sortBy]);

  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2200);
  };

  const markHelpful = (id) => {
    if (helpfulReviews.includes(id)) {
      showToast("You already marked this review as helpful.");
      return;
    }

    setHelpfulReviews((current) => [...current, id]);

    setReviews((current) =>
      current.map((review) =>
        review.id === id
          ? {
              ...review,
              helpful: review.helpful + 1,
            }
          : review
      )
    );

    showToast("Thanks for your feedback.");
  };

  const submitReview = (e) => {
    e.preventDefault();

    if (
      !newReview.name.trim() ||
      !newReview.title.trim() ||
      !newReview.text.trim()
    ) {
      showToast("Please complete all review fields.");
      return;
    }

    const review = {
      id: Date.now(),
      name: newReview.name,
      rating: newReview.rating,
      title: newReview.title,
      text: newReview.text,
      date: "Just now",
      verified: false,
      helpful: 0,
    };

    setReviews((current) => [review, ...current]);

    setNewReview({
      name: "",
      title: "",
      rating: 5,
      text: "",
    });

    setShowReviewForm(false);
    showToast("Your review has been added.");
  };

  return (
    <main className="min-h-screen bg-[#F7ADAD]/20 text-[#800020]">
      {/* HEADER */}
      <section className="border-b border-[#800020]/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#D45060]">
                Customer feedback
              </p>

              <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
                Reviews
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-7 text-gray-500">
                See what customers are saying about their Loom & Leaf
                experience.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowReviewForm(true)}
              className="w-fit rounded-full bg-[#800020] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#D45060]"
            >
              Write a Review
            </button>
          </div>
        </div>
      </section>

      {/* RATING SUMMARY */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          {/* OVERALL */}
          <div className="rounded-[2rem] bg-[#800020] p-7 text-white">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F7ADAD]">
              Overall rating
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
              <Stars rating={Math.round(Number(averageRating))} size="text-lg" />
            </div>

            <p className="mt-4 text-sm text-white/55">
              Based on {reviews.length} customer reviews
            </p>
          </div>

          {/* DISTRIBUTION */}
          <div className="rounded-[2rem] border border-[#800020]/10 bg-white p-7">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">
                Rating breakdown
              </h2>

              {selectedRating > 0 && (
                <button
                  type="button"
                  onClick={() => setSelectedRating(0)}
                  className="text-xs font-bold text-[#D45060]"
                >
                  Clear filter
                </button>
              )}
            </div>

            <div className="mt-6 space-y-4">
              {ratingDistribution.map((item) => (
                <button
                  key={item.rating}
                  type="button"
                  onClick={() =>
                    setSelectedRating(
                      selectedRating === item.rating
                        ? 0
                        : item.rating
                    )
                  }
                  className="flex w-full items-center gap-4 text-left"
                >
                  <span className="w-10 text-xs font-bold">
                    {item.rating} ★
                  </span>

                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-[#D45060] transition-all"
                      style={{
                        width: `${item.percentage}%`,
                      }}
                    />
                  </div>

                  <span className="w-8 text-right text-xs text-gray-400">
                    {item.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-10">
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D45060]">
              Customer voices
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              {selectedRating
                ? `${selectedRating}-star reviews`
                : "All reviews"}
            </h2>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-xl border border-[#800020]/10 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-[#D45060]"
          >
            <option value="recent">Most Recent</option>
            <option value="helpful">Most Helpful</option>
            <option value="highest">Highest Rated</option>
            <option value="lowest">Lowest Rated</option>
          </select>
        </div>

        {filteredReviews.length > 0 ? (
          <div className="space-y-4">
            {filteredReviews.map((review, index) => (
              <motion.article
                key={review.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.35,
                  delay: index * 0.05,
                }}
                className="rounded-[2rem] border border-[#800020]/10 bg-white p-6 shadow-sm sm:p-7"
              >
                <div className="flex flex-col justify-between gap-5 sm:flex-row">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#800020] text-sm font-bold text-[#F7ADAD]">
                      {review.name
                        .split(" ")
                        .map((word) => word[0])
                        .join("")
                        .slice(0, 2)}
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-bold">
                          {review.name}
                        </h3>

                        {review.verified && (
                          <span className="rounded-full bg-[#F7ADAD]/50 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-[#800020]">
                            Verified Purchase
                          </span>
                        )}
                      </div>

                      <div className="mt-1 flex flex-wrap items-center gap-3">
                        <Stars rating={review.rating} />

                        <span className="text-xs text-gray-400">
                          {review.date}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => markHelpful(review.id)}
                    className={`h-fit rounded-full border px-4 py-2 text-xs font-semibold transition ${
                      helpfulReviews.includes(review.id)
                        ? "border-[#800020] bg-[#800020] text-white"
                        : "border-[#800020]/10 text-[#800020] hover:bg-[#F7ADAD]/30"
                    }`}
                  >
                    👍 Helpful · {review.helpful}
                  </button>
                </div>

                <div className="mt-5 pl-0 sm:pl-16">
                  <h4 className="text-lg font-bold">
                    {review.title}
                  </h4>

                  <p className="mt-2 text-sm leading-7 text-gray-500">
                    {review.text}
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
              No reviews found
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Try selecting another rating.
            </p>
          </div>
        )}
      </section>

      {/* REVIEW MODAL */}
      <AnimatePresence>
        {showReviewForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowReviewForm(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#800020]/70 p-5 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-[2rem] bg-white p-6 shadow-2xl sm:p-8"
            >
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#D45060]">
                    Share your experience
                  </p>

                  <h2 className="mt-2 text-2xl font-bold">
                    Write a Review
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setShowReviewForm(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F7ADAD]/30 text-xl"
                >
                  ×
                </button>
              </div>

              <form
                onSubmit={submitReview}
                className="mt-7 space-y-5"
              >
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Your Name
                  </label>

                  <input
                    value={newReview.name}
                    onChange={(e) =>
                      setNewReview({
                        ...newReview,
                        name: e.target.value,
                      })
                    }
                    placeholder="Enter your name"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none focus:border-[#D45060] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Rating
                  </label>

                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        onClick={() =>
                          setNewReview({
                            ...newReview,
                            rating,
                          })
                        }
                        className={`text-3xl transition hover:scale-110 ${
                          rating <= newReview.rating
                            ? "text-[#D45060]"
                            : "text-gray-200"
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Review Title
                  </label>

                  <input
                    value={newReview.title}
                    onChange={(e) =>
                      setNewReview({
                        ...newReview,
                        title: e.target.value,
                      })
                    }
                    placeholder="Give your review a title"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none focus:border-[#D45060] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Your Review
                  </label>

                  <textarea
                    value={newReview.text}
                    onChange={(e) =>
                      setNewReview({
                        ...newReview,
                        text: e.target.value,
                      })
                    }
                    placeholder="Tell us about your experience..."
                    rows={5}
                    className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none focus:border-[#D45060] focus:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-[#800020] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#D45060]"
                >
                  Submit Review
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