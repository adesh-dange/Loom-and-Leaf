"use client";

import { useCallback, useMemo, useState } from "react";
import productsData, {
  getProductById,
  getProductsByCategory,
  searchProducts as searchProductsData,
} from "../data/products";

export default function useProducts() {
  const [products, setProducts] = useState(productsData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Frontend-only project: using local mock data for now.
      await new Promise((resolve) => setTimeout(resolve, 300));
      setProducts(productsData);
    } catch (err) {
      setError("Unable to load products.");
    } finally {
      setLoading(false);
    }
  }, []);

  const getProduct = useCallback((id) => {
    return getProductById(id);
  }, []);

  const getByCategory = useCallback((category) => {
    return getProductsByCategory(category);
  }, []);

  const search = useCallback((query) => {
    return searchProductsData(query);
  }, []);

  const featuredProducts = useMemo(
    () => products.filter((product) => product.featured),
    [products]
  );

  const availableProducts = useMemo(
    () => products.filter((product) => product.stock > 0),
    [products]
  );

  const outOfStockProducts = useMemo(
    () => products.filter((product) => product.stock <= 0),
    [products]
  );

  const getProductsByPriceRange = useCallback(
    (min = 0, max = Infinity) => {
      return products.filter(
        (product) =>
          Number(product.price) >= min &&
          Number(product.price) <= max
      );
    },
    [products]
  );

  const getProductsByRating = useCallback(
    (minimumRating = 0) => {
      return products.filter(
        (product) => Number(product.rating || 0) >= minimumRating
      );
    },
    [products]
  );

  const getProductsBySubcategory = useCallback(
    (subcategory) => {
      if (!subcategory) return [];

      return products.filter(
        (product) =>
          product.subcategory?.toLowerCase() ===
          subcategory.toLowerCase()
      );
    },
    [products]
  );

  const getProductsByBrand = useCallback(
    (brand) => {
      if (!brand) return [];

      return products.filter(
        (product) =>
          product.brand?.toLowerCase() === brand.toLowerCase()
      );
    },
    [products]
  );

  const sortProducts = useCallback(
    (productList = products, sortBy = "default") => {
      const sorted = [...productList];

      switch (sortBy) {
        case "price-low":
          return sorted.sort(
            (a, b) => Number(a.price) - Number(b.price)
          );

        case "price-high":
          return sorted.sort(
            (a, b) => Number(b.price) - Number(a.price)
          );

        case "rating":
          return sorted.sort(
            (a, b) =>
              Number(b.rating || 0) - Number(a.rating || 0)
          );

        case "discount":
          return sorted.sort(
            (a, b) =>
              Number(b.discount || 0) - Number(a.discount || 0)
          );

        case "name":
          return sorted.sort((a, b) =>
            a.name.localeCompare(b.name)
          );

        case "newest":
          return sorted.reverse();

        default:
          return sorted;
      }
    },
    [products]
  );

  return {
    products,
    setProducts,

    loading,
    error,

    fetchProducts,

    getProduct,
    getByCategory,
    search,

    featuredProducts,
    availableProducts,
    outOfStockProducts,

    getProductsByPriceRange,
    getProductsByRating,
    getProductsBySubcategory,
    getProductsByBrand,

    sortProducts,

    productCount: products.length,
  };
}