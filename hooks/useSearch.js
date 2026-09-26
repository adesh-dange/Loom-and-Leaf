"use client";

import { useCallback, useMemo, useState } from "react";
import products from "../data/products";

export default function useSearch() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");
  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: Infinity,
  });

  const searchProducts = useCallback(
    (searchQuery = query) => {
      const normalizedQuery = searchQuery.trim().toLowerCase();

      let results = products.filter((product) => {
        const matchesQuery =
          !normalizedQuery ||
          product.name?.toLowerCase().includes(normalizedQuery) ||
          product.brand?.toLowerCase().includes(normalizedQuery) ||
          product.category?.toLowerCase().includes(normalizedQuery) ||
          product.subcategory?.toLowerCase().includes(normalizedQuery) ||
          product.shortDescription
            ?.toLowerCase()
            .includes(normalizedQuery) ||
          product.description
            ?.toLowerCase()
            .includes(normalizedQuery) ||
          product.tags?.some((tag) =>
            tag.toLowerCase().includes(normalizedQuery)
          );

        const matchesCategory =
          category === "all" || product.category === category;

        const matchesPrice =
          Number(product.price || 0) >= priceRange.min &&
          Number(product.price || 0) <= priceRange.max;

        return matchesQuery && matchesCategory && matchesPrice;
      });

      switch (sortBy) {
        case "price-low":
          results = [...results].sort(
            (a, b) => Number(a.price) - Number(b.price)
          );
          break;

        case "price-high":
          results = [...results].sort(
            (a, b) => Number(b.price) - Number(a.price)
          );
          break;

        case "rating":
          results = [...results].sort(
            (a, b) => Number(b.rating || 0) - Number(a.rating || 0)
          );
          break;

        case "newest":
          results = [...results].reverse();
          break;

        case "discount":
          results = [...results].sort(
            (a, b) => Number(b.discount || 0) - Number(a.discount || 0)
          );
          break;

        default:
          break;
      }

      return results;
    },
    [query, category, sortBy, priceRange]
  );

  const results = useMemo(
    () => searchProducts(query),
    [searchProducts, query]
  );

  const updateQuery = useCallback((value) => {
    setQuery(value);
  }, []);

  const clearSearch = useCallback(() => {
    setQuery("");
    setCategory("all");
    setSortBy("relevance");
    setPriceRange({
      min: 0,
      max: Infinity,
    });
  }, []);

  const resetFilters = useCallback(() => {
    setCategory("all");
    setSortBy("relevance");
    setPriceRange({
      min: 0,
      max: Infinity,
    });
  }, []);

  const hasSearch = query.trim().length > 0;

  const hasResults = results.length > 0;

  return {
    query,
    setQuery: updateQuery,

    category,
    setCategory,

    sortBy,
    setSortBy,

    priceRange,
    setPriceRange,

    results,
    resultCount: results.length,

    searchProducts,
    clearSearch,
    resetFilters,

    hasSearch,
    hasResults,
  };
}