const offers = [
  {
    id: "offer-welcome10",
    code: "WELCOME10",
    title: "Welcome Offer",
    description: "Get 10% off on your first order.",
    discountType: "percentage",
    discountValue: 10,
    maxDiscount: 500,
    minOrderValue: 999,
    category: "all",
    applicableTo: "new-users",
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    usageLimit: 1,
    active: true,
    featured: true,
  },
  {
    id: "offer-fashion15",
    code: "FASHION15",
    title: "Fashion Edit",
    description: "Save 15% on selected fashion products.",
    discountType: "percentage",
    discountValue: 15,
    maxDiscount: 750,
    minOrderValue: 1499,
    category: "fashion",
    applicableTo: "all-users",
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    usageLimit: null,
    active: true,
    featured: true,
  },
  {
    id: "offer-electronics500",
    code: "TECH500",
    title: "Tech Savings",
    description: "Get ₹500 off on eligible electronics orders.",
    discountType: "flat",
    discountValue: 500,
    maxDiscount: 500,
    minOrderValue: 4999,
    category: "electronics",
    applicableTo: "all-users",
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    usageLimit: null,
    active: true,
    featured: true,
  },
  {
    id: "offer-home20",
    code: "HOME20",
    title: "Home Refresh",
    description: "Enjoy 20% off on selected home & living products.",
    discountType: "percentage",
    discountValue: 20,
    maxDiscount: 1000,
    minOrderValue: 1999,
    category: "home-living",
    applicableTo: "all-users",
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    usageLimit: null,
    active: true,
    featured: false,
  },
  {
    id: "offer-beauty15",
    code: "BEAUTY15",
    title: "Beauty Essentials",
    description: "Get 15% off on selected beauty products.",
    discountType: "percentage",
    discountValue: 15,
    maxDiscount: 600,
    minOrderValue: 999,
    category: "beauty",
    applicableTo: "all-users",
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    usageLimit: null,
    active: true,
    featured: false,
  },
  {
    id: "offer-flat300",
    code: "SAVE300",
    title: "Flat ₹300 Off",
    description: "Save ₹300 on orders above ₹2999.",
    discountType: "flat",
    discountValue: 300,
    maxDiscount: 300,
    minOrderValue: 2999,
    category: "all",
    applicableTo: "all-users",
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    usageLimit: null,
    active: true,
    featured: false,
  },
  {
    id: "offer-freeship",
    code: "FREESHIP",
    title: "Free Shipping",
    description: "Get free shipping on orders above ₹1499.",
    discountType: "shipping",
    discountValue: 0,
    maxDiscount: 999,
    minOrderValue: 1499,
    category: "all",
    applicableTo: "all-users",
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    usageLimit: null,
    active: true,
    featured: false,
  },
  {
    id: "offer-premium25",
    code: "PREMIUM25",
    title: "Premium Collection",
    description: "Get 25% off selected premium products.",
    discountType: "percentage",
    discountValue: 25,
    maxDiscount: 1500,
    minOrderValue: 4999,
    category: "all",
    applicableTo: "premium-products",
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    usageLimit: null,
    active: true,
    featured: true,
  },
];

export const activeOffers = offers.filter((offer) => offer.active);

export const featuredOffers = activeOffers.filter(
  (offer) => offer.featured
);

export const getOfferByCode = (code) =>
  activeOffers.find(
    (offer) => offer.code.toLowerCase() === code.toLowerCase()
  );

export const getOffersByCategory = (category) =>
  activeOffers.filter(
    (offer) =>
      offer.category === "all" ||
      offer.category === category
  );

export const validateOffer = (code, orderValue, category = "all") => {
  const offer = getOfferByCode(code);

  if (!offer) {
    return {
      valid: false,
      message: "Invalid or expired offer code.",
    };
  }

  if (orderValue < offer.minOrderValue) {
    return {
      valid: false,
      message: `Minimum order value is ₹${offer.minOrderValue}.`,
    };
  }

  if (
    offer.category !== "all" &&
    category !== "all" &&
    offer.category !== category
  ) {
    return {
      valid: false,
      message: "This offer is not applicable to this category.",
    };
  }

  return {
    valid: true,
    offer,
    message: `${offer.code} applied successfully.`,
  };
};

export const calculateDiscount = (offer, orderValue) => {
  if (!offer || orderValue < offer.minOrderValue) return 0;

  if (offer.discountType === "percentage") {
    const discount = (orderValue * offer.discountValue) / 100;

    return Math.min(discount, offer.maxDiscount);
  }

  if (offer.discountType === "flat") {
    return Math.min(offer.discountValue, orderValue);
  }

  return 0;
};

export default offers;