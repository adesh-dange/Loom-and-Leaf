"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

const CART_STORAGE_KEY = "loom-leaf-cart";

const getStoredCart = () => {
  if (typeof window === "undefined") return [];

  try {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    return storedCart ? JSON.parse(storedCart) : [];
  } catch {
    return [];
  }
};

export default function useCart() {
  const [cart, setCart] = useState(getStoredCart);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = useCallback((product, quantity = 1, options = {}) => {
    if (!product?.id) return;

    setCart((currentCart) => {
      const existingItemIndex = currentCart.findIndex(
        (item) =>
          item.id === product.id &&
          item.selectedColor === (options.color || null) &&
          item.selectedSize === (options.size || null)
      );

      if (existingItemIndex !== -1) {
        return currentCart.map((item, index) =>
          index === existingItemIndex
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity,
          selectedColor: options.color || null,
          selectedSize: options.size || null,
        },
      ];
    });
  }, []);

  const removeFromCart = useCallback((productId, options = {}) => {
    setCart((currentCart) =>
      currentCart.filter(
        (item) =>
          !(
            item.id === productId &&
            item.selectedColor === (options.color || null) &&
            item.selectedSize === (options.size || null)
          )
      )
    );
  }, []);

  const updateQuantity = useCallback(
    (productId, quantity, options = {}) => {
      if (quantity <= 0) {
        removeFromCart(productId, options);
        return;
      }

      setCart((currentCart) =>
        currentCart.map((item) =>
          item.id === productId &&
          item.selectedColor === (options.color || null) &&
          item.selectedSize === (options.size || null)
            ? {
                ...item,
                quantity,
              }
            : item
        )
      );
    },
    [removeFromCart]
  );

  const increaseQuantity = useCallback(
    (productId, options = {}) => {
      setCart((currentCart) =>
        currentCart.map((item) =>
          item.id === productId &&
          item.selectedColor === (options.color || null) &&
          item.selectedSize === (options.size || null)
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      );
    },
    []
  );

  const decreaseQuantity = useCallback(
    (productId, options = {}) => {
      setCart((currentCart) =>
        currentCart
          .map((item) =>
            item.id === productId &&
            item.selectedColor === (options.color || null) &&
            item.selectedSize === (options.size || null)
              ? {
                  ...item,
                  quantity: item.quantity - 1,
                }
              : item
          )
          .filter((item) => item.quantity > 0)
      );
    },
    []
  );

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const isInCart = useCallback(
    (productId, options = {}) =>
      cart.some(
        (item) =>
          item.id === productId &&
          item.selectedColor === (options.color || null) &&
          item.selectedSize === (options.size || null)
      ),
    [cart]
  );

  const getCartItem = useCallback(
    (productId, options = {}) =>
      cart.find(
        (item) =>
          item.id === productId &&
          item.selectedColor === (options.color || null) &&
          item.selectedSize === (options.size || null)
      ),
    [cart]
  );

  const itemCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart]
  );

  const subtotal = useMemo(
    () =>
      cart.reduce(
        (total, item) => total + Number(item.price || 0) * item.quantity,
        0
      ),
    [cart]
  );

  const originalTotal = useMemo(
    () =>
      cart.reduce(
        (total, item) =>
          total +
          Number(item.originalPrice || item.price || 0) * item.quantity,
        0
      ),
    [cart]
  );

  const savings = useMemo(
    () => Math.max(originalTotal - subtotal, 0),
    [originalTotal, subtotal]
  );

  return {
    cart,
    setCart,

    addToCart,
    removeFromCart,
    updateQuantity,
    increaseQuantity,
    decreaseQuantity,
    clearCart,

    isInCart,
    getCartItem,

    itemCount,
    subtotal,
    originalTotal,
    savings,
  };
}