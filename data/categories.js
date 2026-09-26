const categories = [
  {
    id: "fashion",
    name: "Fashion",
    slug: "fashion",
    description:
      "Modern clothing, accessories, and everyday essentials designed for effortless style.",
    image: "/images/categories/fashion.jpg",
    featured: true,
    productCount: 5,

    subcategories: [
      {
        id: "clothing",
        name: "Clothing",
        slug: "clothing",
        description: "Everyday clothing with a modern silhouette.",
        image: "/images/categories/clothing.jpg",
      },
      {
        id: "accessories",
        name: "Accessories",
        slug: "accessories",
        description: "Minimal accessories designed for everyday use.",
        image: "/images/categories/accessories.jpg",
      },
      {
        id: "bags",
        name: "Bags",
        slug: "bags",
        description: "Functional bags with a clean contemporary design.",
        image: "/images/categories/bags.jpg",
      },
    ],
  },

  {
    id: "electronics",
    name: "Electronics",
    slug: "electronics",
    description:
      "Smart technology and everyday electronics designed for work, entertainment, and modern living.",
    image: "/images/categories/electronics.jpg",
    featured: true,
    productCount: 4,

    subcategories: [
      {
        id: "audio",
        name: "Audio",
        slug: "audio",
        description:
          "Headphones, speakers, and wireless audio essentials.",
        image: "/images/categories/audio.jpg",
      },
      {
        id: "wearables",
        name: "Wearables",
        slug: "wearables",
        description:
          "Smart devices designed to stay connected throughout the day.",
        image: "/images/categories/wearables.jpg",
      },
      {
        id: "computer-accessories",
        name: "Computer Accessories",
        slug: "computer-accessories",
        description:
          "Useful accessories for modern workstations and setups.",
        image: "/images/categories/computer-accessories.jpg",
      },
    ],
  },

  {
    id: "home-living",
    name: "Home & Living",
    slug: "home-living",
    description:
      "Thoughtfully designed pieces that bring comfort, character, and style to contemporary spaces.",
    image: "/images/categories/home-living.jpg",
    featured: true,
    productCount: 3,

    subcategories: [
      {
        id: "decor",
        name: "Decor",
        slug: "decor",
        description:
          "Decorative pieces for refined modern interiors.",
        image: "/images/categories/decor.jpg",
      },
      {
        id: "lighting",
        name: "Lighting",
        slug: "lighting",
        description:
          "Ambient lighting designed for calm and comfortable spaces.",
        image: "/images/categories/lighting.jpg",
      },
      {
        id: "soft-furnishings",
        name: "Soft Furnishings",
        slug: "soft-furnishings",
        description:
          "Soft and comfortable additions for everyday living.",
        image: "/images/categories/soft-furnishings.jpg",
      },
    ],
  },

  {
    id: "beauty",
    name: "Beauty",
    slug: "beauty",
    description:
      "Simple everyday skincare and beauty essentials designed for effortless routines.",
    image: "/images/categories/beauty.jpg",
    featured: true,
    productCount: 3,

    subcategories: [
      {
        id: "skincare",
        name: "Skincare",
        slug: "skincare",
        description:
          "Everyday skincare essentials for simple routines.",
        image: "/images/categories/skincare.jpg",
      },
      {
        id: "makeup",
        name: "Makeup",
        slug: "makeup",
        description:
          "Minimal makeup essentials for everyday looks.",
        image: "/images/categories/makeup.jpg",
      },
    ],
  },
];

export const featuredCategories = categories.filter(
  (category) => category.featured
);

export const getCategoryBySlug = (slug) =>
  categories.find(
    (category) =>
      category.slug.toLowerCase() === slug.toLowerCase()
  );

export const getSubcategoryBySlug = (categorySlug, subcategorySlug) => {
  const category = getCategoryBySlug(categorySlug);

  if (!category) return null;

  return category.subcategories.find(
    (subcategory) =>
      subcategory.slug.toLowerCase() ===
      subcategorySlug.toLowerCase()
  );
};

export const getAllSubcategories = () =>
  categories.flatMap((category) =>
    category.subcategories.map((subcategory) => ({
      ...subcategory,
      category: category.id,
      categoryName: category.name,
    }))
  );

export default categories;