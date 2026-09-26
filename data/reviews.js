const reviews = [
  {
    id: "review-001",
    productId: "classic-oversized-jacket",
    userId: "user-001",
    userName: "Aarav Sharma",
    avatar: "/images/avatars/aarav.jpg",
    rating: 5,
    title: "Exactly what I was looking for",
    comment:
      "The jacket looks premium and fits perfectly. The fabric feels comfortable and the overall quality is excellent.",
    date: "2026-09-18",
    verifiedPurchase: true,
    helpful: 24,
    images: [],
    status: "published",
  },
  {
    id: "review-002",
    productId: "classic-oversized-jacket",
    userId: "user-002",
    userName: "Isha Patil",
    avatar: "/images/avatars/isha.jpg",
    rating: 4,
    title: "Great quality",
    comment:
      "Really liked the design and material. The fit is slightly oversized, but that is expected from the style.",
    date: "2026-09-14",
    verifiedPurchase: true,
    helpful: 16,
    images: [],
    status: "published",
  },
  {
    id: "review-003",
    productId: "minimal-leather-wallet",
    userId: "user-003",
    userName: "Rohan Kulkarni",
    avatar: "/images/avatars/rohan.jpg",
    rating: 5,
    title: "Simple and premium",
    comment:
      "Very clean design with good finishing. It is compact but still has enough space for my everyday cards.",
    date: "2026-09-16",
    verifiedPurchase: true,
    helpful: 19,
    images: [],
    status: "published",
  },
  {
    id: "review-004",
    productId: "aura-wireless-headphones",
    userId: "user-004",
    userName: "Neha Deshmukh",
    avatar: "/images/avatars/neha.jpg",
    rating: 4,
    title: "Good sound and comfortable",
    comment:
      "The headphones are comfortable for long listening sessions. Sound quality is clear and the design looks great.",
    date: "2026-09-12",
    verifiedPurchase: true,
    helpful: 31,
    images: [],
    status: "published",
  },
  {
    id: "review-005",
    productId: "aura-wireless-headphones",
    userId: "user-005",
    userName: "Kabir Joshi",
    avatar: "/images/avatars/kabir.jpg",
    rating: 5,
    title: "Excellent for everyday use",
    comment:
      "Battery life has been great so far and the headphones feel lightweight. Very happy with the purchase.",
    date: "2026-09-09",
    verifiedPurchase: true,
    helpful: 27,
    images: [],
    status: "published",
  },
  {
    id: "review-006",
    productId: "luna-ceramic-vase",
    userId: "user-006",
    userName: "Ananya Mehta",
    avatar: "/images/avatars/ananya.jpg",
    rating: 5,
    title: "Beautiful piece",
    comment:
      "The vase looks even better in person. The finish is elegant and works perfectly with my home decor.",
    date: "2026-09-11",
    verifiedPurchase: true,
    helpful: 14,
    images: [],
    status: "published",
  },
  {
    id: "review-007",
    productId: "minimal-glow-serum",
    userId: "user-007",
    userName: "Meera Shah",
    avatar: "/images/avatars/meera.jpg",
    rating: 4,
    title: "Nice texture",
    comment:
      "The serum has a lightweight texture and absorbs quickly. The packaging also feels premium.",
    date: "2026-09-08",
    verifiedPurchase: true,
    helpful: 22,
    images: [],
    status: "published",
  },
  {
    id: "review-008",
    productId: "essential-cotton-shirt",
    userId: "user-008",
    userName: "Vihaan More",
    avatar: "/images/avatars/vihaan.jpg",
    rating: 5,
    title: "Comfortable everyday shirt",
    comment:
      "Soft fabric, clean stitching and a comfortable fit. Easy to style with almost anything.",
    date: "2026-09-15",
    verifiedPurchase: true,
    helpful: 18,
    images: [],
    status: "published",
  },
  {
    id: "review-009",
    productId: "urban-crossbody-bag",
    userId: "user-009",
    userName: "Sara Khan",
    avatar: "/images/avatars/sara.jpg",
    rating: 4,
    title: "Stylish and practical",
    comment:
      "The bag has a nice premium look and enough space for everyday essentials. The strap is comfortable too.",
    date: "2026-09-07",
    verifiedPurchase: true,
    helpful: 12,
    images: [],
    status: "published",
  },
  {
    id: "review-010",
    productId: "pulse-smartwatch",
    userId: "user-010",
    userName: "Aditya Joshi",
    avatar: "/images/avatars/aditya.jpg",
    rating: 5,
    title: "Looks amazing",
    comment:
      "The display is sharp and the watch looks premium on the wrist. Setup was also very straightforward.",
    date: "2026-09-13",
    verifiedPurchase: true,
    helpful: 26,
    images: [],
    status: "published",
  },
  {
    id: "review-011",
    productId: "nova-portable-speaker",
    userId: "user-011",
    userName: "Siddharth Patil",
    avatar: "/images/avatars/siddharth.jpg",
    rating: 4,
    title: "Great little speaker",
    comment:
      "Compact size with impressive sound for everyday use. The design is minimal and attractive.",
    date: "2026-09-06",
    verifiedPurchase: true,
    helpful: 17,
    images: [],
    status: "published",
  },
  {
    id: "review-012",
    productId: "serene-table-lamp",
    userId: "user-012",
    userName: "Pooja Kulkarni",
    avatar: "/images/avatars/pooja.jpg",
    rating: 5,
    title: "Perfect for my desk",
    comment:
      "The lamp gives my workspace a warm and relaxing look. The design is simple and elegant.",
    date: "2026-09-10",
    verifiedPurchase: true,
    helpful: 21,
    images: [],
    status: "published",
  },
  {
    id: "review-013",
    productId: "cloud-soft-cushion",
    userId: "user-013",
    userName: "Tanvi Jadhav",
    avatar: "/images/avatars/tanvi.jpg",
    rating: 5,
    title: "Very soft and comfortable",
    comment:
      "The cushion is soft, comfortable and looks beautiful on my sofa. Quality is better than expected.",
    date: "2026-09-05",
    verifiedPurchase: true,
    helpful: 15,
    images: [],
    status: "published",
  },
  {
    id: "review-014",
    productId: "pure-hydration-moisturizer",
    userId: "user-014",
    userName: "Riya Desai",
    avatar: "/images/avatars/riya.jpg",
    rating: 4,
    title: "Lightweight moisturizer",
    comment:
      "The texture is lightweight and easy to apply. It works well as part of my daily skincare routine.",
    date: "2026-09-04",
    verifiedPurchase: true,
    helpful: 20,
    images: [],
    status: "published",
  },
  {
    id: "review-015",
    productId: "silk-touch-lip-tint",
    userId: "user-015",
    userName: "Nisha Verma",
    avatar: "/images/avatars/nisha.jpg",
    rating: 5,
    title: "Beautiful finish",
    comment:
      "The color looks natural and the texture feels smooth. The packaging is also very pretty.",
    date: "2026-09-03",
    verifiedPurchase: true,
    helpful: 28,
    images: [],
    status: "published",
  },
  {
    id: "review-016",
    productId: "everyday-tote-bag",
    userId: "user-016",
    userName: "Kavya Patil",
    avatar: "/images/avatars/kavya.jpg",
    rating: 4,
    title: "Perfect everyday tote",
    comment:
      "Spacious enough for daily use and easy to carry. The simple design makes it easy to pair with different outfits.",
    date: "2026-09-02",
    verifiedPurchase: true,
    helpful: 13,
    images: [],
    status: "published",
  },
  {
    id: "review-017",
    productId: "arc-mechanical-keyboard",
    userId: "user-017",
    userName: "Yash Chavan",
    avatar: "/images/avatars/yash.jpg",
    rating: 5,
    title: "Great typing experience",
    comment:
      "The keyboard feels solid and the keys are satisfying to use. The overall build quality is excellent.",
    date: "2026-09-01",
    verifiedPurchase: true,
    helpful: 25,
    images: [],
    status: "published",
  },
];

export const getReviewsByProductId = (productId) =>
  reviews.filter(
    (review) =>
      review.productId === productId && review.status === "published"
  );

export const getAverageRating = (productId) => {
  const productReviews = getReviewsByProductId(productId);

  if (!productReviews.length) return 0;

  const total = productReviews.reduce(
    (sum, review) => sum + review.rating,
    0
  );

  return Number((total / productReviews.length).toFixed(1));
};

export const getRatingBreakdown = (productId) => {
  const productReviews = getReviewsByProductId(productId);

  return [5, 4, 3, 2, 1].map((rating) => {
    const count = productReviews.filter(
      (review) => review.rating === rating
    ).length;

    return {
      rating,
      count,
      percentage: productReviews.length
        ? Math.round((count / productReviews.length) * 100)
        : 0,
    };
  });
};

export const getReviewCount = (productId) =>
  getReviewsByProductId(productId).length;

export default reviews;