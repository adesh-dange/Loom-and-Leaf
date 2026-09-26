const products = [
  {
    id: "classic-oversized-jacket",
    name: "Classic Oversized Jacket",
    slug: "classic-oversized-jacket",
    category: "fashion",
    subcategory: "Clothing",
    brand: "Loom & Leaf",
    price: 2499,
    originalPrice: 3499,
    discount: 29,
    rating: 4.8,
    reviewCount: 128,
    stock: 24,
    badge: "Best Seller",
    featured: true,
    colors: ["Burgundy", "Black", "Cream"],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "/products/jacket-1.jpg",
      "/products/jacket-2.jpg",
      "/products/jacket-3.jpg",
    ],
    shortDescription:
      "A premium oversized jacket designed for effortless everyday style.",
    description:
      "The Classic Oversized Jacket combines a relaxed silhouette with premium detailing. Designed for versatile everyday styling, it features a comfortable fit, clean construction, and timeless appeal.",
    specifications: {
      Material: "Premium Cotton Blend",
      Fit: "Oversized",
      Pattern: "Solid",
      Closure: "Button",
      Occasion: "Casual",
      Care: "Machine Wash",
    },
    tags: ["jacket", "fashion", "oversized", "casual"],
  },

  {
    id: "minimal-leather-wallet",
    name: "Minimal Leather Wallet",
    slug: "minimal-leather-wallet",
    category: "fashion",
    subcategory: "Accessories",
    brand: "Loom & Leaf",
    price: 1899,
    originalPrice: 2499,
    discount: 24,
    rating: 4.7,
    reviewCount: 94,
    stock: 18,
    badge: "Trending",
    featured: true,
    colors: ["Burgundy", "Black", "Tan"],
    sizes: ["One Size"],
    images: [
      "/products/wallet-1.jpg",
      "/products/wallet-2.jpg",
      "/products/wallet-3.jpg",
    ],
    shortDescription:
      "A slim leather wallet built for modern everyday carry.",
    description:
      "A refined minimal wallet with a compact silhouette and practical card storage. Its understated design makes it suitable for everyday use.",
    specifications: {
      Material: "Genuine Leather",
      CardSlots: "8",
      Compartments: "3",
      Closure: "Fold",
      Style: "Minimal",
      Care: "Dry Clean",
    },
    tags: ["wallet", "leather", "accessories", "minimal"],
  },

  {
    id: "aura-wireless-headphones",
    name: "Aura Wireless Headphones",
    slug: "aura-wireless-headphones",
    category: "electronics",
    subcategory: "Audio",
    brand: "Loom & Leaf",
    price: 3299,
    originalPrice: 4499,
    discount: 27,
    rating: 4.6,
    reviewCount: 216,
    stock: 31,
    badge: "Popular",
    featured: true,
    colors: ["Black", "Cream", "Burgundy"],
    sizes: ["One Size"],
    images: [
      "/products/headphones-1.jpg",
      "/products/headphones-2.jpg",
      "/products/headphones-3.jpg",
    ],
    shortDescription:
      "Wireless headphones with immersive sound and comfortable all-day wear.",
    description:
      "Aura Wireless Headphones are designed for music, calls, and everyday entertainment with a comfortable over-ear design and wireless connectivity.",
    specifications: {
      Connectivity: "Bluetooth 5.3",
      Battery: "40 Hours",
      Charging: "USB-C",
      Microphone: "Built-in",
      Driver: "40mm",
      Controls: "Touch",
    },
    tags: ["headphones", "wireless", "audio", "bluetooth"],
  },

  {
    id: "luna-ceramic-vase",
    name: "Luna Ceramic Vase",
    slug: "luna-ceramic-vase",
    category: "home-living",
    subcategory: "Decor",
    brand: "Loom & Leaf",
    price: 1899,
    originalPrice: 2399,
    discount: 21,
    rating: 4.9,
    reviewCount: 76,
    stock: 12,
    badge: "New",
    featured: true,
    colors: ["Cream", "Blush", "Burgundy"],
    sizes: ["Small", "Medium"],
    images: [
      "/products/vase-1.jpg",
      "/products/vase-2.jpg",
      "/products/vase-3.jpg",
    ],
    shortDescription:
      "A sculptural ceramic vase created for elegant modern interiors.",
    description:
      "The Luna Ceramic Vase adds a refined decorative touch to modern spaces. Its soft silhouette and premium ceramic finish work beautifully with flowers or as a standalone piece.",
    specifications: {
      Material: "Ceramic",
      Finish: "Matte",
      Shape: "Sculptural",
      Usage: "Indoor",
      Height: "24 cm",
      Care: "Hand Wash",
    },
    tags: ["vase", "ceramic", "decor", "home"],
  },

  {
    id: "minimal-glow-serum",
    name: "Minimal Glow Serum",
    slug: "minimal-glow-serum",
    category: "beauty",
    subcategory: "Skincare",
    brand: "Loom & Leaf",
    price: 1399,
    originalPrice: 1799,
    discount: 22,
    rating: 4.5,
    reviewCount: 143,
    stock: 42,
    badge: "Bestseller",
    featured: true,
    colors: ["Clear"],
    sizes: ["30ml", "50ml"],
    images: [
      "/products/serum-1.jpg",
      "/products/serum-2.jpg",
      "/products/serum-3.jpg",
    ],
    shortDescription:
      "A lightweight everyday serum designed for a fresh, radiant look.",
    description:
      "Minimal Glow Serum features a lightweight formula designed to fit easily into a simple daily skincare routine.",
    specifications: {
      Volume: "30ml",
      SkinType: "All Skin Types",
      Texture: "Lightweight",
      Finish: "Natural",
      Usage: "Daily",
      "Cruelty Free": "Yes",
    },
    tags: ["serum", "skincare", "beauty", "glow"],
  },

  {
    id: "essential-cotton-shirt",
    name: "Essential Cotton Shirt",
    slug: "essential-cotton-shirt",
    category: "fashion",
    subcategory: "Clothing",
    brand: "Loom & Leaf",
    price: 1699,
    originalPrice: 2199,
    discount: 23,
    rating: 4.4,
    reviewCount: 87,
    stock: 35,
    badge: "New",
    featured: false,
    colors: ["White", "Burgundy", "Black"],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "/products/shirt-1.jpg",
      "/products/shirt-2.jpg",
      "/products/shirt-3.jpg",
    ],
    shortDescription:
      "A clean everyday cotton shirt with a relaxed modern fit.",
    description:
      "Designed for everyday versatility, the Essential Cotton Shirt offers a clean silhouette and breathable construction.",
    specifications: {
      Material: "100% Cotton",
      Fit: "Relaxed",
      Pattern: "Solid",
      Collar: "Spread",
      Sleeve: "Full Sleeve",
      Care: "Machine Wash",
    },
    tags: ["shirt", "cotton", "fashion", "casual"],
  },

  {
    id: "urban-crossbody-bag",
    name: "Urban Crossbody Bag",
    slug: "urban-crossbody-bag",
    category: "fashion",
    subcategory: "Bags",
    brand: "Loom & Leaf",
    price: 2199,
    originalPrice: 2999,
    discount: 27,
    rating: 4.6,
    reviewCount: 63,
    stock: 21,
    badge: "Trending",
    featured: false,
    colors: ["Black", "Burgundy", "Tan"],
    sizes: ["One Size"],
    images: [
      "/products/bag-1.jpg",
      "/products/bag-2.jpg",
      "/products/bag-3.jpg",
    ],
    shortDescription:
      "A compact crossbody bag designed for everyday essentials.",
    description:
      "The Urban Crossbody Bag combines practical storage with a clean contemporary design suitable for daily use.",
    specifications: {
      Material: "Vegan Leather",
      Closure: "Zip",
      Compartments: "4",
      Strap: "Adjustable",
      Usage: "Everyday",
      Style: "Crossbody",
    },
    tags: ["bag", "crossbody", "accessories", "fashion"],
  },

  {
    id: "pulse-smartwatch",
    name: "Pulse Smartwatch",
    slug: "pulse-smartwatch",
    category: "electronics",
    subcategory: "Wearables",
    brand: "Loom & Leaf",
    price: 4999,
    originalPrice: 6499,
    discount: 23,
    rating: 4.5,
    reviewCount: 174,
    stock: 16,
    badge: "Featured",
    featured: true,
    colors: ["Black", "Silver", "Burgundy"],
    sizes: ["One Size"],
    images: [
      "/products/smartwatch-1.jpg",
      "/products/smartwatch-2.jpg",
      "/products/smartwatch-3.jpg",
    ],
    shortDescription:
      "A modern smartwatch with fitness tracking and smart notifications.",
    description:
      "Pulse Smartwatch combines everyday connectivity with activity tracking, notifications, and a modern display.",
    specifications: {
      Display: "AMOLED",
      Connectivity: "Bluetooth",
      Battery: "7 Days",
      WaterResistance: "5 ATM",
      Tracking: "Activity & Sleep",
      Charging: "Magnetic",
    },
    tags: ["smartwatch", "wearable", "fitness", "electronics"],
  },

  {
    id: "nova-portable-speaker",
    name: "Nova Portable Speaker",
    slug: "nova-portable-speaker",
    category: "electronics",
    subcategory: "Audio",
    brand: "Loom & Leaf",
    price: 2299,
    originalPrice: 2999,
    discount: 23,
    rating: 4.4,
    reviewCount: 91,
    stock: 28,
    badge: "Popular",
    featured: false,
    colors: ["Black", "Cream"],
    sizes: ["One Size"],
    images: [
      "/products/speaker-1.jpg",
      "/products/speaker-2.jpg",
      "/products/speaker-3.jpg",
    ],
    shortDescription:
      "Compact wireless speaker with rich sound for everyday listening.",
    description:
      "Nova is a portable Bluetooth speaker designed for convenient listening at home, outdoors, or while travelling.",
    specifications: {
      Connectivity: "Bluetooth 5.2",
      Battery: "18 Hours",
      Charging: "USB-C",
      Waterproof: "IPX5",
      Output: "20W",
      Microphone: "Built-in",
    },
    tags: ["speaker", "bluetooth", "audio", "portable"],
  },

  {
    id: "serene-table-lamp",
    name: "Serene Table Lamp",
    slug: "serene-table-lamp",
    category: "home-living",
    subcategory: "Lighting",
    brand: "Loom & Leaf",
    price: 2499,
    originalPrice: 3299,
    discount: 24,
    rating: 4.7,
    reviewCount: 58,
    stock: 14,
    badge: "New",
    featured: false,
    colors: ["Cream", "Burgundy"],
    sizes: ["Standard"],
    images: [
      "/products/lamp-1.jpg",
      "/products/lamp-2.jpg",
      "/products/lamp-3.jpg",
    ],
    shortDescription:
      "A warm minimalist table lamp for calm contemporary spaces.",
    description:
      "Serene Table Lamp features a refined silhouette and warm ambient lighting that works beautifully in bedrooms, living rooms, and workspaces.",
    specifications: {
      Material: "Metal & Fabric",
      Light: "Warm White",
      Power: "12W",
      Switch: "Touch",
      Usage: "Indoor",
      Style: "Minimal",
    },
    tags: ["lamp", "lighting", "home", "decor"],
  },

  {
    id: "cloud-soft-cushion",
    name: "Cloud Soft Cushion",
    slug: "cloud-soft-cushion",
    category: "home-living",
    subcategory: "Soft Furnishings",
    brand: "Loom & Leaf",
    price: 899,
    originalPrice: 1199,
    discount: 25,
    rating: 4.6,
    reviewCount: 72,
    stock: 46,
    badge: "Value Pick",
    featured: false,
    colors: ["Blush", "Cream", "Burgundy"],
    sizes: ["18 × 18 inch"],
    images: [
      "/products/cushion-1.jpg",
      "/products/cushion-2.jpg",
      "/products/cushion-3.jpg",
    ],
    shortDescription:
      "A soft decorative cushion with a comfortable premium feel.",
    description:
      "Cloud Soft Cushion adds warmth and texture to your living space with a soft finish and versatile neutral-inspired palette.",
    specifications: {
      Material: "Cotton Blend",
      Filling: "Polyester",
      Size: "18 × 18 inch",
      Cover: "Removable",
      Wash: "Machine Wash",
      Usage: "Indoor",
    },
    tags: ["cushion", "home", "decor", "soft furnishings"],
  },

  {
    id: "pure-hydration-moisturizer",
    name: "Pure Hydration Moisturizer",
    slug: "pure-hydration-moisturizer",
    category: "beauty",
    subcategory: "Skincare",
    brand: "Loom & Leaf",
    price: 1199,
    originalPrice: 1599,
    discount: 25,
    rating: 4.6,
    reviewCount: 109,
    stock: 38,
    badge: "Bestseller",
    featured: false,
    colors: ["Clear"],
    sizes: ["50ml", "100ml"],
    images: [
      "/products/moisturizer-1.jpg",
      "/products/moisturizer-2.jpg",
      "/products/moisturizer-3.jpg",
    ],
    shortDescription:
      "A lightweight daily moisturizer for soft, hydrated skin.",
    description:
      "Pure Hydration Moisturizer is designed as a simple everyday skincare essential with a lightweight texture.",
    specifications: {
      Volume: "50ml",
      SkinType: "All Skin Types",
      Texture: "Cream",
      Finish: "Natural",
      Usage: "Daily",
      "Cruelty Free": "Yes",
    },
    tags: ["moisturizer", "skincare", "beauty", "hydration"],
  },

  {
    id: "silk-touch-lip-tint",
    name: "Silk Touch Lip Tint",
    slug: "silk-touch-lip-tint",
    category: "beauty",
    subcategory: "Makeup",
    brand: "Loom & Leaf",
    price: 799,
    originalPrice: 999,
    discount: 20,
    rating: 4.5,
    reviewCount: 82,
    stock: 29,
    badge: "Trending",
    featured: false,
    colors: ["Rose", "Burgundy", "Nude"],
    sizes: ["4ml"],
    images: [
      "/products/lip-tint-1.jpg",
      "/products/lip-tint-2.jpg",
      "/products/lip-tint-3.jpg",
    ],
    shortDescription:
      "A lightweight lip tint with a soft natural-looking finish.",
    description:
      "Silk Touch Lip Tint delivers buildable color in a lightweight formula designed for everyday wear.",
    specifications: {
      Volume: "4ml",
      Finish: "Natural",
      Texture: "Liquid",
      Wear: "Long Lasting",
      Applicator: "Doe Foot",
      "Cruelty Free": "Yes",
    },
    tags: ["lip tint", "makeup", "beauty", "lip"],
  },

  {
    id: "everyday-tote-bag",
    name: "Everyday Canvas Tote",
    slug: "everyday-canvas-tote",
    category: "fashion",
    subcategory: "Bags",
    brand: "Loom & Leaf",
    price: 1299,
    originalPrice: 1699,
    discount: 24,
    rating: 4.3,
    reviewCount: 54,
    stock: 40,
    badge: "Everyday Pick",
    featured: false,
    colors: ["Cream", "Burgundy", "Black"],
    sizes: ["One Size"],
    images: [
      "/products/tote-1.jpg",
      "/products/tote-2.jpg",
      "/products/tote-3.jpg",
    ],
    shortDescription:
      "A spacious canvas tote designed for everyday essentials.",
    description:
      "The Everyday Canvas Tote offers a spacious interior with a minimal design suitable for college, work, shopping, and travel.",
    specifications: {
      Material: "Heavy Cotton Canvas",
      Closure: "Open",
      Compartments: "2",
      Handle: "Shoulder",
      Usage: "Everyday",
      Care: "Spot Clean",
    },
    tags: ["tote", "bag", "canvas", "fashion"],
  },

  {
    id: "arc-mechanical-keyboard",
    name: "Arc Mechanical Keyboard",
    slug: "arc-mechanical-keyboard",
    category: "electronics",
    subcategory: "Computer Accessories",
    brand: "Loom & Leaf",
    price: 3999,
    originalPrice: 4999,
    discount: 20,
    rating: 4.7,
    reviewCount: 121,
    stock: 19,
    badge: "Editor's Pick",
    featured: true,
    colors: ["Black", "Cream"],
    sizes: ["75%"],
    images: [
      "/products/keyboard-1.jpg",
      "/products/keyboard-2.jpg",
      "/products/keyboard-3.jpg",
    ],
    shortDescription:
      "A compact mechanical keyboard designed for work and creative setups.",
    description:
      "Arc Mechanical Keyboard combines a compact layout with tactile mechanical switches and a clean desktop aesthetic.",
    specifications: {
      Layout: "75%",
      Connectivity: "USB-C / Bluetooth",
      Switches: "Mechanical",
      Backlight: "RGB",
      Battery: "Up to 60 Hours",
      Compatibility: "Windows / macOS",
    },
    tags: ["keyboard", "mechanical", "computer", "electronics"],
  },
];

export const categories = [
  {
    id: "fashion",
    name: "Fashion",
    slug: "fashion",
    description:
      "Modern essentials, clothing, and accessories designed for everyday style.",
    image: "/images/categories/fashion.jpg",
  },
  {
    id: "electronics",
    name: "Electronics",
    slug: "electronics",
    description:
      "Smart everyday technology and accessories for work, entertainment, and life.",
    image: "/images/categories/electronics.jpg",
  },
  {
    id: "home-living",
    name: "Home & Living",
    slug: "home-living",
    description:
      "Thoughtfully designed pieces for comfortable and contemporary spaces.",
    image: "/images/categories/home-living.jpg",
  },
  {
    id: "beauty",
    name: "Beauty",
    slug: "beauty",
    description:
      "Simple everyday beauty and skincare essentials.",
    image: "/images/categories/beauty.jpg",
  },
];

export const featuredProducts = products.filter(
  (product) => product.featured
);

export const getProductById = (id) =>
  products.find((product) => product.id === id);

export const getProductsByCategory = (category) =>
  products.filter(
    (product) =>
      product.category.toLowerCase() === category.toLowerCase()
  );

export const searchProducts = (query) => {
  const search = query.toLowerCase().trim();

  if (!search) return products;

  return products.filter((product) => {
    const searchableText = [
      product.name,
      product.category,
      product.subcategory,
      product.brand,
      product.shortDescription,
      product.description,
      ...product.tags,
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(search);
  });
};

export default products;