"use client";

import { createContext, useContext, useMemo } from "react";
import useCart from "../hooks/useCart";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const cart = useCart();

  const value = useMemo(
    () => ({
      ...cart,
    }),
    [cart]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCartContext must be used inside a CartProvider"
    );
  }

  return context;
}

export default CartContext;