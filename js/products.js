const products = [
  {
    id: "p1",
    name: "Royal Statuario Polished Marble Tile",
    category: "tiles",
    subCategory: "Floor Tiles",
    brand: "Kajaria",
    price: 180, // Price in sq.ft.
    priceUnit: "sq.ft",
    availability: "in-stock",
    rating: 4.9,
    reviews: 42,
    image: "images/products/statuario_marble.svg",
    gallery: [
      "images/products/statuario_marble.svg",
      "images/products/statuario_marble_detail.svg",
      "images/products/statuario_living.svg"
    ],
    description: "Experience the timeless luxury of Italian marble with the Royal Statuario Polished Tile. Features clean white backgrounds with signature grey veining that elevates any living room or high-end showroom.",
    features: [
      "Ultra-glossy polished finish",
      "Double charge vitrified durability",
      "Stain resistant nano-coating",
      "Perfect rectified edges for seamless jointing"
    ],
    specifications: {
      Material: "Vitrified Porcelain",
      Finish: "High Gloss Polished",
      Dimensions: "800mm x 1600mm",
      Thickness: "9mm",
      Warranty: "10 Years Limited",
      Origin: "India"
    },
    colors: ["Classic White", "Statuario Gold"],
    isNew: true,
    isPopular: true
  },
  {
    id: "p2",
    name: "Aura Premium Gold Rain Shower System",
    category: "showers",
    subCategory: "Luxury Bathroom Solutions",
    brand: "Jaquar",
    price: 34999,
    priceUnit: "piece",
    availability: "in-stock",
    rating: 4.8,
    reviews: 28,
    image: "images/products/gold_shower.svg",
    gallery: [
      "images/products/gold_shower.svg",
      "images/products/gold_shower_detail.svg"
    ],
    description: "Transform your daily shower into a sensory escape with the Aura Rain Shower. Coated in a premium PVD gold finish, it features multiple spray patterns and integrated thermostat controls.",
    features: [
      "Premium PVD gold anti-corrosion coating",
      "Anti-clogging silicon nozzles",
      "Integrated thermostatic temperature controller",
      "Eco-smart water-saving aerator"
    ],
    specifications: {
      Material: "Solid Brass",
      Finish: "Polished Gold PVD",
      Dimensions: "300mm x 300mm Overhead",
      Pressure: "1.5 Bar - 5.0 Bar",
      Warranty: "10 Years",
      Origin: "India"
    },
    colors: ["Brushed Gold", "Chrome Steel", "Matte Black"],
    isNew: true,
    isPopular: true
  },
  {
    id: "p3",
    name: "Cascade Matte Black Tall Basin Mixer",
    category: "faucets",
    subCategory: "Faucets",
    brand: "Cera",
    price: 6899,
    priceUnit: "piece",
    availability: "in-stock",
    rating: 4.6,
    reviews: 19,
    image: "images/products/black_mixer.svg",
    gallery: [
      "images/products/black_mixer.svg"
    ],
    description: "An elegant waterfall-flow basin mixer designed for countertop wash basins. The matte black finish offers a minimalist, contemporary look suitable for modern residential and hospitality interiors.",
    features: [
      "Waterfall aerator for smooth splash-free stream",
      "Hardwearing ceramic cartridge tested for 500,000 cycles",
      "High arch design perfect for table-top wash basins"
    ],
    specifications: {
      Material: "Virgin Brass Alloy",
      Finish: "Matte Black Electroplated",
      Height: "310mm",
      Warranty: "7 Years",
      Origin: "India"
    },
    colors: ["Matte Black", "Rose Gold", "Chrome"],
    isNew: false,
    isPopular: true
  },
  {
    id: "p4",
    name: "Emperor Emerald Designer Wall Tile",
    category: "tiles",
    subCategory: "Wall Tiles",
    brand: "Somany",
    price: 145,
    priceUnit: "sq.ft",
    availability: "made-to-order",
    rating: 4.7,
    reviews: 15,
    image: "images/products/emerald_tile.svg",
    gallery: [
      "images/products/emerald_tile.svg",
      "images/products/emerald_tile_room.svg"
    ],
    description: "Featuring deep emerald tones with metallic gold leaf overlays, the Emperor Emerald tile creates majestic feature walls in premium master bathrooms, hotel receptions, and luxury salons.",
    features: [
      "Intricate gold lining detailing",
      "Waterproof glazed ceramic structure",
      "Scratch-resistant glazed coating",
      "Vibrant high-definition print quality"
    ],
    specifications: {
      Material: "Glazed Ceramic",
      Finish: "Satin with Gold Decors",
      Dimensions: "300mm x 900mm",
      Thickness: "8.5mm",
      Warranty: "5 Years",
      Origin: "India"
    },
    colors: ["Emerald Green", "Royal Sapphire"],
    isNew: true,
    isPopular: false
  },
  {
    id: "p5",
    name: "Volcanic Rock Countertop Wash Basin",
    category: "wash-basins",
    subCategory: "Wash Basins",
    brand: "Hindware",
    price: 12500,
    priceUnit: "piece",
    availability: "in-stock",
    rating: 4.9,
    reviews: 31,
    image: "images/products/rock_basin.svg",
    gallery: [
      "images/products/rock_basin.svg",
      "images/products/rock_basin_detail.svg"
    ],
    description: "Carved from natural lava stone and polished internally, this countertop basin retains its rugged volcanic texture on the outside while presenting a smooth, easy-to-clean bowl inside.",
    features: [
      "Individually hand-carved unique patterns",
      "Stain-proof resin sealer inside",
      "Standard waste outlet compatibility",
      "Resistant to high impact and heat"
    ],
    specifications: {
      Material: "Natural Volcanic Stone",
      Finish: "Rough Outer, Polished Inner",
      Dimensions: "450mm x 400mm x 150mm",
      Weight: "14 kg",
      Warranty: "5 Years",
      Origin: "Indonesia"
    },
    colors: ["Basalt Grey", "Charcoal Black"],
    isNew: false,
    isPopular: true
  },
  {
    id: "p6",
    name: "Integra Smart Wall-Hung Sanitary Closet",
    category: "sanitaryware",
    subCategory: "Sanitaryware",
    brand: "Cera",
    price: 45000,
    priceUnit: "piece",
    availability: "in-stock",
    rating: 4.8,
    reviews: 12,
    image: "images/products/smart_closet.svg",
    gallery: [
      "images/products/smart_closet.svg"
    ],
    description: "The next generation of luxury bathroom comfort. The Integra Smart Closet features automatic flushing, a heated seat, warm air drying, and intuitive remote control operation.",
    features: [
      "Intelligent radar automatic lid open/close",
      "Triple action cyclone wash down flush",
      "Heated ergonomic seat with temp presets",
      "Built-in deodorizer and carbon air filter"
    ],
    specifications: {
      Material: "Vitreous China",
      Finish: "Nano-ceramic Glaze White",
      Dimensions: "380mm x 540mm x 350mm",
      Voltage: "220V AC",
      Warranty: "5 Years Electronics, 10 Years Ceramic",
      Origin: "South Korea"
    },
    colors: ["Classic White"],
    isNew: true,
    isPopular: true
  },
  {
    id: "p7",
    name: "Luxury Rose Gold Double-Bowl Kitchen Sink",
    category: "kitchen-sinks",
    subCategory: "Kitchen Sinks",
    brand: "Jaquar",
    price: 18999,
    priceUnit: "piece",
    availability: "made-to-order",
    rating: 4.7,
    reviews: 9,
    image: "images/products/rosegold_sink.svg",
    gallery: [
      "images/products/rosegold_sink.svg"
    ],
    description: "Handcrafted 16-gauge stainless steel kitchen sink coated with nano-PVD technology in luxurious Rose Gold. Engineered with sound-dampening pads and a commercial-grade brushed finish.",
    features: [
      "16-Gauge heavy-duty SUS304 steel",
      "SoundGuard noise insulation undercoating",
      "X-channel drainage grooves for quick drying",
      "Scratch-resistant sandblasted finish"
    ],
    specifications: {
      Material: "304 Stainless Steel",
      Finish: "Rose Gold PVD Matte",
      Dimensions: "820mm x 450mm x 220mm",
      Thickness: "1.5mm",
      Warranty: "Lifetime Warranty against rust",
      Origin: "India"
    },
    colors: ["Rose Gold", "Stainless Chrome", "Dark Gunmetal"],
    isNew: true,
    isPopular: false
  },
  {
    id: "p8",
    name: "Minimalist Brass Robe Hook & Towel Ring Set",
    category: "accessories",
    subCategory: "Bathroom Accessories",
    brand: "Parryware",
    price: 3200,
    priceUnit: "set",
    availability: "in-stock",
    rating: 4.5,
    reviews: 23,
    image: "images/products/bathroom_set.svg",
    gallery: [
      "images/products/bathroom_set.svg"
    ],
    description: "A sleek, minimalist solid brass bathroom accessory bundle, featuring a robe hook, towel ring, and a toilet roll holder matching modern luxury brass hardware designs.",
    features: [
      "Corrosion-resistant finish layers",
      "Concealed wall mounting screws for clean look",
      "Solid heavy brass weight feel"
    ],
    specifications: {
      Material: "Solid Brass",
      Finish: "Brushed Champagne Gold",
      Installation: "Wall Mounted",
      Warranty: "3 Years",
      Origin: "India"
    },
    colors: ["Champagne Gold", "Chrome", "Matte Black"],
    isNew: false,
    isPopular: false
  },
  {
    id: "p9",
    name: "Duragres Grandeur Slate Effect Tiles",
    category: "tiles",
    subCategory: "Floor Tiles",
    brand: "Duragres",
    price: 135,
    priceUnit: "sq.ft",
    availability: "in-stock",
    rating: 4.7,
    reviews: 14,
    image: "images/products/slate_tile.svg",
    gallery: [
      "images/products/slate_tile.svg"
    ],
    description: "Capturing the rugged elegance of mountain slate, these glazed vitrified tiles have a matte structured texture offering extreme skid resistance and rustic premium styling for patio and bathroom floors.",
    features: [
      "Textured anti-skid surface (R11 rated)",
      "High break strength vitrified body",
      "Rich shade variation for realistic natural look"
    ],
    specifications: {
      Material: "Vitrified Ceramic",
      Finish: "Structured Matte Slate",
      Dimensions: "600mm x 1200mm",
      Thickness: "9.5mm",
      Warranty: "10 Years",
      Origin: "India"
    },
    colors: ["Charcoal Grey", "Earth Brown"],
    isNew: false,
    isPopular: false
  },
  {
    id: "p10",
    name: "Onyx Gold Hexagonal Designer Wall Accent",
    category: "tiles",
    subCategory: "Designer Tiles",
    brand: "Orientbell",
    price: 240,
    priceUnit: "sq.ft",
    availability: "made-to-order",
    rating: 4.9,
    reviews: 8,
    image: "images/products/onyx_hex.svg",
    gallery: [
      "images/products/onyx_hex.svg"
    ],
    description: "Stunning hexagonal mosaics displaying translucent orange-gold onyx patterns. Features crystalline glazes that reflect light dramatically, giving bathrooms a signature imperial design.",
    features: [
      "Translucent onyx gemstone print",
      "Interlocking mesh backing for quick installation",
      "Mirror gloss protective crystal glaze"
    ],
    specifications: {
      Material: "Glazed Vitrified Mosaic",
      Finish: "Crystalline Glossy",
      Dimensions: "300mm x 300mm Sheet",
      Warranty: "5 Years",
      Origin: "India"
    },
    colors: ["Onyx Amber", "Pearl White"],
    isNew: true,
    isPopular: true
  },
  {
    id: "p11",
    name: "Verona Classic Pedestal Basin",
    category: "wash-basins",
    subCategory: "Wash Basins",
    brand: "Johnson",
    price: 9500,
    priceUnit: "piece",
    availability: "in-stock",
    rating: 4.6,
    reviews: 17,
    image: "images/products/pedestal_basin.svg",
    gallery: [
      "images/products/pedestal_basin.svg"
    ],
    description: "An elegant, fluted classical column pedestal basin crafted from high-density vitreous clay. Incorporates a deep splashless bowl and wide deck space for soaps and faucets.",
    features: [
      "Heavy fluted pedestal support",
      "Stain-resistant easy-wipe glazed surface",
      "Rear overflow hole integrated"
    ],
    specifications: {
      Material: "Vitreous China Clay",
      Finish: "Pure White High Gloss",
      Dimensions: "550mm x 450mm x 850mm",
      Warranty: "10 Years",
      Origin: "India"
    },
    colors: ["Ivory White", "Sterling Silver"],
    isNew: false,
    isPopular: false
  },
  {
    id: "p12",
    name: "Fortress Integrated Smart Sensor Faucet",
    category: "faucets",
    subCategory: "Faucets",
    brand: "Hindware",
    price: 14999,
    priceUnit: "piece",
    availability: "in-stock",
    rating: 4.7,
    reviews: 21,
    image: "images/products/sensor_faucet.svg",
    gallery: [
      "images/products/sensor_faucet.svg"
    ],
    description: "Touchless automatic faucet featuring rapid response infrared sensors and dual-power battery/electric system. Perfect for sanitarily conscious commercial spaces and high-traffic smart homes.",
    features: [
      "Intelligent 0.5-second response sensor",
      "Lead-free brass internal body",
      "Dual supply power (4x AA batteries and AC adaptor included)"
    ],
    specifications: {
      Material: "Solid Brass",
      Finish: "Polished Chrome",
      SensorRange: "10cm - 18cm Adjustable",
      Warranty: "5 Years",
      Origin: "Japan"
    },
    colors: ["Polished Chrome", "Matte Black"],
    isNew: true,
    isPopular: true
  }
];

// Helper to filter and search products
function getProducts(filters = {}) {
  let filtered = [...products];

  // Filter by Category
  if (filters.category && filters.category !== 'all') {
    filtered = filtered.filter(p => p.category === filters.category);
  }

  // Filter by Brand
  if (filters.brand && filters.brand.length > 0) {
    filtered = filtered.filter(p => filters.brand.includes(p.brand));
  }

  // Filter by Price Range
  if (filters.priceMin !== undefined && filters.priceMax !== undefined) {
    filtered = filtered.filter(p => p.price >= filters.priceMin && p.price <= filters.priceMax);
  }

  // Filter by Availability
  if (filters.availability && filters.availability.length > 0) {
    filtered = filtered.filter(p => filters.availability.includes(p.availability));
  }

  // Live Text Search
  if (filters.searchQuery) {
    const q = filters.searchQuery.toLowerCase().trim();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      (p.subCategory && p.subCategory.toLowerCase().includes(q)) ||
      (p.specifications.Material && p.specifications.Material.toLowerCase().includes(q))
    );
  }

  // Sorting
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'popular':
        filtered.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
        break;
    }
  }

  return filtered;
}

// Make available globally or as module
if (typeof window !== 'undefined') {
  window.productsDatabase = products;
  window.getFilteredProducts = getProducts;
}
