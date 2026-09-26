const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "/api";

const request = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  let data = null;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error(
      data?.message || "Something went wrong. Please try again."
    );
  }

  return data;
};

export const api = {
  get: (endpoint, options = {}) =>
    request(endpoint, {
      method: "GET",
      ...options,
    }),

  post: (endpoint, body, options = {}) =>
    request(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
      ...options,
    }),

  put: (endpoint, body, options = {}) =>
    request(endpoint, {
      method: "PUT",
      body: JSON.stringify(body),
      ...options,
    }),

  patch: (endpoint, body, options = {}) =>
    request(endpoint, {
      method: "PATCH",
      body: JSON.stringify(body),
      ...options,
    }),

  delete: (endpoint, options = {}) =>
    request(endpoint, {
      method: "DELETE",
      ...options,
    }),
};

// Product APIs
export const productApi = {
  getAll: () => api.get("/products"),

  getById: (id) => api.get(`/products/${id}`),

  getByCategory: (category) =>
    api.get(`/products/category/${category}`),

  search: (query) =>
    api.get(`/products/search?q=${encodeURIComponent(query)}`),
};

// Category APIs
export const categoryApi = {
  getAll: () => api.get("/categories"),

  getBySlug: (slug) =>
    api.get(`/categories/${slug}`),
};

// Cart APIs
export const cartApi = {
  get: () => api.get("/cart"),

  add: (productId, quantity = 1) =>
    api.post("/cart", {
      productId,
      quantity,
    }),

  update: (productId, quantity) =>
    api.put(`/cart/${productId}`, {
      quantity,
    }),

  remove: (productId) =>
    api.delete(`/cart/${productId}`),

  clear: () =>
    api.delete("/cart"),
};

// Wishlist APIs
export const wishlistApi = {
  get: () => api.get("/wishlist"),

  add: (productId) =>
    api.post("/wishlist", {
      productId,
    }),

  remove: (productId) =>
    api.delete(`/wishlist/${productId}`),
};

// Authentication APIs
export const authApi = {
  login: (credentials) =>
    api.post("/auth/login", credentials),

  register: (userData) =>
    api.post("/auth/register", userData),

  logout: () =>
    api.post("/auth/logout"),

  me: () =>
    api.get("/auth/me"),
};

// Order APIs
export const orderApi = {
  getAll: () =>
    api.get("/orders"),

  getById: (id) =>
    api.get(`/orders/${id}`),

  create: (orderData) =>
    api.post("/orders", orderData),

  cancel: (id) =>
    api.patch(`/orders/${id}/cancel`),
};

export default api;