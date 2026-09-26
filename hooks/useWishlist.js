"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

const WISHLIST_STORAGE_KEY = "loom-leaf-wishlist";

const getStoredWishlist = () => {
  if (typeof window === "undefined") return [];

  try {
    const storedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
    return storedWishlist ? JSON.parse(storedWishlist) : [];
  } catch {
    return [];
  }
};

export default function useWishlist() {
  const [wishlist, setWishlist] = useState(getStoredWishlist);

  useEffect(() => {
    localStorage.setItem(
      WISHLIST_STORAGE_KEY,
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  const addToWishlist = useCallback((product) => {
    if (!product?.id) return;

    setWishlist((currentWishlist) => {
      const alreadyExists = currentWishlist.some(
        (item) => item.id === product.id
      );

      if (alreadyExists) {
        return currentWishlist;
      }

      return [...currentWishlist, product];
    });
  }, []);

  const removeFromWishlist = useCallback((productId) => {
    setWishlist((currentWishlist) =>
      currentWishlist.filter((item) => item.id !== productId)
    );
  }, []);

  const toggleWishlist = useCallback((product) => {
    if (!product?.id) return;

    setWishlist((currentWishlist) => {
      const exists = currentWishlist.some(
        (item) => item.id === product.id
      );

      if (exists) {
        return currentWishlist.filter(
          (item) => item.id !== product.id
        );
      }

      return [...currentWishlist, product];
    });
  }, []);

  const clearWishlist = useCallback(() => {
    setWishlist([]);
  }, []);

  const isInWishlist = useCallback(
    (productId) =>
      wishlist.some((item) => item.id === productId),
    [wishlist]
  );

  const getWishlistItem = useCallback(
    (productId) =>
      wishlist.find((item) => item.id === productId),
    [wishlist]
  );

  const wishlistCount = useMemo(
    () => wishlist.length,
    [wishlist]
  );

  return {
    wishlist,
    setWishlist,

    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    clearWishlist,

    isInWishlist,
    getWishlistItem,

    wishlistCount,
  };
}