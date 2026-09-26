export const formatCurrency = (amount, currency = "INR") => {
  const value = Number(amount) || 0;

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatPrice = (amount) => {
  return formatCurrency(amount, "INR");
};

export const calculateDiscount = (originalPrice, price) => {
  const original = Number(originalPrice) || 0;
  const current = Number(price) || 0;

  if (original <= 0 || current >= original) return 0;

  return Math.round(((original - current) / original) * 100);
};

export const calculateSavings = (originalPrice, price) => {
  const original = Number(originalPrice) || 0;
  const current = Number(price) || 0;

  return Math.max(original - current, 0);
};

export const calculatePercentage = (value, total) => {
  const numericValue = Number(value) || 0;
  const numericTotal = Number(total) || 0;

  if (numericTotal === 0) return 0;

  return Math.round((numericValue / numericTotal) * 100);
};

export const formatDate = (date, options = {}) => {
  if (!date) return "";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    ...options,
  }).format(parsedDate);
};

export const formatDateTime = (date) => {
  if (!date) return "";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(parsedDate);
};

export const truncateText = (text, maxLength = 100) => {
  if (!text) return "";

  if (text.length <= maxLength) return text;

  return `${text.slice(0, maxLength).trim()}...`;
};

export const slugify = (text = "") => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-");
};

export const capitalize = (text = "") => {
  if (!text) return "";

  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const capitalizeWords = (text = "") => {
  if (!text) return "";

  return text
    .split(" ")
    .map((word) => capitalize(word))
    .join(" ");
};

export const clamp = (value, min, max) => {
  return Math.min(Math.max(value, min), max);
};

export const generateId = (prefix = "id") => {
  return `${prefix}-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 9)}`;
};

export const getInitials = (name = "") => {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
};

export const isValidEmail = (email = "") => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const isValidPhone = (phone = "") => {
  return /^[6-9]\d{9}$/.test(phone.replace(/\D/g, ""));
};

export const calculateCartSubtotal = (cart = []) => {
  return cart.reduce(
    (total, item) =>
      total + Number(item.price || 0) * Number(item.quantity || 0),
    0
  );
};

export const calculateCartOriginalTotal = (cart = []) => {
  return cart.reduce(
    (total, item) =>
      total +
      Number(item.originalPrice || item.price || 0) *
        Number(item.quantity || 0),
    0
  );
};

export const calculateCartSavings = (cart = []) => {
  const originalTotal = calculateCartOriginalTotal(cart);
  const subtotal = calculateCartSubtotal(cart);

  return Math.max(originalTotal - subtotal, 0);
};

export const calculateShipping = (
  subtotal,
  freeShippingThreshold = 1499,
  shippingCharge = 99
) => {
  const amount = Number(subtotal) || 0;

  return amount >= freeShippingThreshold ? 0 : shippingCharge;
};

export const calculateOrderTotal = ({
  subtotal = 0,
  discount = 0,
  shipping = 0,
  tax = 0,
}) => {
  return Math.max(
    Number(subtotal) -
      Number(discount) +
      Number(shipping) +
      Number(tax),
    0
  );
};

export const debounce = (callback, delay = 300) => {
  let timeout;

  return (...args) => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

export const scrollToTop = () => {
  if (typeof window === "undefined") return;

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export const getStockStatus = (stock) => {
  const quantity = Number(stock) || 0;

  if (quantity <= 0) {
    return {
      label: "Out of Stock",
      status: "out-of-stock",
    };
  }

  if (quantity <= 5) {
    return {
      label: `Only ${quantity} left`,
      status: "low-stock",
    };
  }

  return {
    label: "In Stock",
    status: "in-stock",
  };
};

export const getRatingStars = (rating = 0) => {
  const value = clamp(Number(rating) || 0, 0, 5);

  return Array.from({ length: 5 }, (_, index) => {
    return index < Math.round(value);
  });
};

export const isBrowser = () => {
  return typeof window !== "undefined";
};