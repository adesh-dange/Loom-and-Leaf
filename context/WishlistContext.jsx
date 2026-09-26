"use client";

import { createContext, useContext, useMemo } from "react";
import useWishlist from "../hooks/useWishlist";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const wishlist = useWishlist();

  const value = useMemo(
    () => ({
      ...wishlist,
    }),
    [wishlist]
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlistContext() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error(
      "useWishlistContext must be used inside a WishlistProvider"
    );
  }

  return context;
}

export default WishlistContext;