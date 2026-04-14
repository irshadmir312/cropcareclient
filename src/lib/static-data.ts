// Static product data - works on any hosting (Vercel, Netlify, etc.)
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  company: string;
  usage: string;
  category: string;
  imageUrl: string;
  inStock: boolean;
  featured: boolean;
  cropIds: string;
}

// We use simple string IDs that don't change between environments
const CROP_ID_APPLE = 'crop_apple';
const CROP_ID_WALNUT = 'crop_walnut';
const CROP_ID_SAFFRON = 'crop_saffron';
const CROP_ID_APRICOT = 'crop_apricot';

export const crops_static = [
  {
    id: CROP_ID_APPLE,
    name: 'Apple',
    description:
      'Kashmir is known as the "Apple Paradise" of India. The temperate climate and fertile soil make it ideal for growing premium quality apples including Ambri, Red Delicious, Golden Delicious, and Hazratbali varieties.',
    imageUrl: '/images/apple.png',
    diseases: JSON.stringify([
      { name: 'Apple Scab', severity: 'High', description: 'Dark olive-green spots on leaves and fruit, causing premature fruit drop' },
      { name: 'Powdery Mildew', severity: 'Medium', description: 'White powdery growth on leaves and shoots, stunting growth' },
      { name: 'Fire Blight', severity: 'High', description: 'Blossoms and branches turn black, appearing scorched' },
      { name: 'Codling Moth', severity: 'Medium', description: 'Larvae bore into fruit creating brown tunnels' },
    ]),
    recommendedProducts: 'prod_1,prod_3,prod_5,prod_12',
    sprayTiming: 'March → Dormant spray\nApril → Pre-bloom spray\nMay → Petal fall spray\nJune-July → Summer spray\nAugust → Pre-harvest spray',
    season: 'March - November',
  },
  {
    id: CROP_ID_WALNUT,
    name: 'Walnut',
    description:
      'Kashmir walnuts are famous worldwide for their premium quality. The unique climate of the valley produces thin-shelled, rich-flavored walnuts that are a major export product.',
    imageUrl: '/images/walnut.png',
    diseases: JSON.stringify([
      { name: 'Walnut Blight', severity: 'High', description: 'Black spots on leaves and nuts, causing nut drop' },
      { name: 'Walnut Husk Fly', severity: 'Medium', description: 'Larvae infest the husk, causing premature drop and staining' },
      { name: 'Root Rot', severity: 'Low', description: 'Fungal disease affecting roots, causing gradual decline' },
      { name: 'Aphid Infestation', severity: 'Medium', description: 'Sap-sucking insects causing leaf curl and sticky residue' },
    ]),
    recommendedProducts: 'prod_2,prod_4,prod_6',
    sprayTiming: 'February-March → Dormant spray\nApril → Bud break spray\nMay-June → Post-bloom spray\nJuly-August → Summer spray',
    season: 'March - October',
  },
  {
    id: CROP_ID_SAFFRON,
    name: 'Saffron',
    description:
      'Kashmir Saffron (Kong Posh) is one of the most precious spices in the world. Grown primarily in the Pampore area, it requires specific climatic conditions including well-drained soil and a specific temperature range.',
    imageUrl: '/images/saffron.png',
    diseases: JSON.stringify([
      { name: 'Fusarium Rot', severity: 'High', description: 'Causes corm rot, leading to plant death' },
      { name: 'Corm Mite', severity: 'Medium', description: 'Pests that damage corms during storage and in field' },
      { name: 'Rust Disease', severity: 'Low', description: 'Orange-brown pustules on leaves reducing photosynthesis' },
      { name: 'Leaf Blight', severity: 'Medium', description: 'Brown lesions on leaves, affecting bulb health' },
    ]),
    recommendedProducts: 'prod_7,prod_8',
    sprayTiming: 'September → Pre-planting treatment\nOctober → Planting time care\nNovember → Early growth monitoring\nFebruary-March → Spring care',
    season: 'September - March',
  },
  {
    id: CROP_ID_APRICOT,
    name: 'Apricot',
    description:
      'Kashmiri apricots are known for their exceptional sweetness and rich flavor. The dry temperate zones of Ladakh and some Kashmir valleys produce high-quality apricots used fresh and dried.',
    imageUrl: '/images/apricot.png',
    diseases: JSON.stringify([
      { name: 'Apricot Brown Rot', severity: 'High', description: 'Brown, rotting spots on fruit that can spread rapidly' },
      { name: 'Shot Hole', severity: 'Medium', description: 'Small holes in leaves caused by fungal infection' },
      { name: 'Peach Twig Borer', severity: 'Medium', description: 'Larvae bore into twigs and fruit' },
      { name: 'Bacterial Canker', severity: 'Low', description: 'Sunken cankers on branches with gum exudation' },
    ]),
    recommendedProducts: 'prod_1,prod_3,prod_9',
    sprayTiming: 'January → Dormant spray\nFebruary → Delayed dormant spray\nMarch → Pre-bloom spray\nApril → Bloom/Petal fall spray\nMay → Post-bloom spray',
    season: 'February - July',
  },
];

export const products_static: Product[] = [
  {
    id: 'prod_1',
    name: 'Captan 50% WP',
    description: 'Broad-spectrum contact fungicide effective against apple scab, brown rot, and other fungal diseases. Safe for most fruit trees when used as directed. Provides excellent protective coverage.',
    price: 450,
    company: 'Syngenta',
    usage: 'Mix 2-3g per liter of water. Spray at 10-15 day intervals. Apply during calm weather conditions for best results.',
    category: 'fungicide',
    imageUrl: '/images/product-fungicide-1.png',
    inStock: true,
    featured: true,
    cropIds: `${CROP_ID_APPLE},${CROP_ID_APRICOT}`,
  },
  {
    id: 'prod_2',
    name: 'Mancozeb 75% WP',
    description: 'Contact fungicide for control of early and late blight, downy mildew, and various leaf spots. Excellent rain-fastness properties make it ideal for Kashmir weather conditions.',
    price: 380,
    company: 'Bayer',
    usage: 'Mix 2.5g per liter of water. Start spraying at first sign of disease. Repeat every 7-10 days during wet season.',
    category: 'fungicide',
    imageUrl: '/images/product-fungicide-2.png',
    inStock: true,
    featured: true,
    cropIds: CROP_ID_WALNUT,
  },
  {
    id: 'prod_3',
    name: 'Imidacloprid 17.8% SL',
    description: 'Systemic insecticide for controlling sucking pests like aphids, jassids, thrips, and whiteflies. Absorbed quickly by plant tissue for rapid action and long-lasting protection.',
    price: 520,
    company: 'Coromandel',
    usage: 'Mix 0.25ml per liter of water. Apply as foliar spray. Best applied during early morning or late evening.',
    category: 'insecticide',
    imageUrl: '/images/product-insecticide-1.png',
    inStock: true,
    featured: true,
    cropIds: `${CROP_ID_APPLE},${CROP_ID_APRICOT}`,
  },
  {
    id: 'prod_4',
    name: 'Chlorpyrifos 20% EC',
    description: 'Broad-spectrum organophosphate insecticide for controlling soil and foliar insects. Effective against termites, cutworms, and fruit borers in walnut orchards.',
    price: 320,
    company: 'Dow AgroSciences',
    usage: 'Mix 2ml per liter of water. Spray on affected areas. Avoid spraying during flowering stage. Use protective equipment.',
    category: 'insecticide',
    imageUrl: '/images/product-insecticide-2.png',
    inStock: true,
    featured: false,
    cropIds: CROP_ID_WALNUT,
  },
  {
    id: 'prod_5',
    name: 'Difenoconazole 25% EC',
    description: 'Systemic triazole fungicide with preventive and curative action. Controls powdery mildew, scab, and anthracnose in apple orchards. Long residual activity.',
    price: 680,
    company: 'Syngenta',
    usage: 'Mix 0.5ml per liter of water. Apply at disease initiation. Repeat at 10-14 day intervals. Do not exceed recommended dose.',
    category: 'fungicide',
    imageUrl: '/images/product-fungicide-3.png',
    inStock: true,
    featured: true,
    cropIds: CROP_ID_APPLE,
  },
  {
    id: 'prod_6',
    name: 'Thiamethoxam 25% WG',
    description: 'Second-generation neonicotinoid insecticide with excellent systemic activity. Controls aphids, jassids, and leafhoppers. Safe for beneficial insects at recommended doses.',
    price: 750,
    company: 'Bayer',
    usage: 'Mix 0.15g per liter of water. Apply as foliar spray. Start early in pest season for best results.',
    category: 'insecticide',
    imageUrl: '/images/product-insecticide-3.png',
    inStock: true,
    featured: false,
    cropIds: CROP_ID_WALNUT,
  },
  {
    id: 'prod_7',
    name: 'Carbendazim 50% WP',
    description: 'Systemic fungicide for control of fusarium wilt, root rot, and damping-off in saffron corms. Essential for pre-planting treatment of saffron corms.',
    price: 290,
    company: 'BASF',
    usage: 'For corm treatment: Soak corms in 0.2% solution for 30 minutes before planting. For field spray: 1g per liter of water.',
    category: 'fungicide',
    imageUrl: '/images/product-fungicide-4.png',
    inStock: true,
    featured: true,
    cropIds: CROP_ID_SAFFRON,
  },
  {
    id: 'prod_8',
    name: 'Metalaxyl + Mancozeb',
    description: 'Combination fungicide for comprehensive protection against oomycete fungi. Effective against root rot and damping-off in saffron. Both contact and systemic action.',
    price: 550,
    company: 'Syngenta',
    usage: 'Mix 2.5g per liter of water. Apply as soil drench or foliar spray. Repeat at 15-day intervals during rainy season.',
    category: 'fungicide',
    imageUrl: '/images/product-fungicide-5.png',
    inStock: true,
    featured: false,
    cropIds: CROP_ID_SAFFRON,
  },
  {
    id: 'prod_9',
    name: 'Propiconazole 25% EC',
    description: 'Systemic fungicide effective against brown rot, shot hole, and rust in apricot trees. Provides both preventive and curative control with excellent plant compatibility.',
    price: 490,
    company: 'Rallis',
    usage: 'Mix 1ml per liter of water. Apply at petal fall stage. Repeat at 12-15 day intervals. Avoid application during full bloom.',
    category: 'fungicide',
    imageUrl: '/images/product-fungicide-6.png',
    inStock: true,
    featured: false,
    cropIds: CROP_ID_APRICOT,
  },
  {
    id: 'prod_10',
    name: 'Neem Oil (Azadirachtin 1500 PPM)',
    description: 'Natural, organic insecticide derived from neem seeds. Controls over 200 species of insects including aphids, whiteflies, and caterpillars. Safe for organic farming.',
    price: 350,
    company: 'Excel Industries',
    usage: 'Mix 3-5ml per liter of water. Add a small amount of soap as emulsifier. Spray thoroughly covering all plant surfaces.',
    category: 'insecticide',
    imageUrl: '/images/product-organic-1.png',
    inStock: true,
    featured: true,
    cropIds: `${CROP_ID_APPLE},${CROP_ID_WALNUT},${CROP_ID_SAFFRON},${CROP_ID_APRICOT}`,
  },
  {
    id: 'prod_11',
    name: 'Diazinon 60% EC',
    description: 'Soil-applied insecticide for controlling corm mites and soil-dwelling pests in saffron fields. Also effective against wireworms and grubs.',
    price: 420,
    company: 'Coromandel',
    usage: 'Mix 3ml per liter of water for soil application. Apply 2-3 weeks before planting. Incorporate into top 5cm of soil.',
    category: 'insecticide',
    imageUrl: '/images/product-insecticide-4.png',
    inStock: true,
    featured: false,
    cropIds: CROP_ID_SAFFRON,
  },
  {
    id: 'prod_12',
    name: 'Copper Oxychloride 50% WP',
    description: 'Protective fungicide containing copper for control of bacterial and fungal diseases. Essential for fire blight management in apple. Also effective against leaf spots.',
    price: 310,
    company: 'UPL',
    usage: 'Mix 3g per liter of water. Apply during dormant season and at green tip stage. Can be mixed with other fungicides.',
    category: 'fungicide',
    imageUrl: '/images/product-fungicide-7.png',
    inStock: true,
    featured: true,
    cropIds: CROP_ID_APPLE,
  },
];

// --- In-memory stores for orders / refunds (reset on each cold start) ---

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  createdAt: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  address: string;
  city: string;
  deliveryType: string;
  status: string;
  totalAmount: number;
  paymentMethod: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
  refunds: Refund[];
}

export interface Refund {
  id: string;
  orderId: string;
  reason: string;
  description: string;
  refundType: string;
  status: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
}

// Global in-memory arrays (work on serverless)
const orders_store: Order[] = [];
const refunds_store: Refund[] = [];

function uid(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function getAllOrders(): Order[] {
  return [...orders_store].reverse();
}

export function getOrderById(id: string): Order | undefined {
  return orders_store.find((o) => o.id === id);
}

export function createOrder(data: {
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  address?: string;
  city?: string;
  deliveryType?: string;
  paymentMethod?: string;
  notes?: string;
  items: { productId: string; productName: string; quantity: number; price: number }[];
  totalAmount: number;
}): Order {
  const now = new Date().toISOString();
  const order: Order = {
    id: `order_${uid()}`,
    customerName: data.customerName,
    customerPhone: data.customerPhone,
    customerEmail: data.customerEmail || '',
    address: data.address || '',
    city: data.city || 'Srinagar',
    deliveryType: data.deliveryType || 'home_delivery',
    status: 'pending',
    totalAmount: data.totalAmount,
    paymentMethod: data.paymentMethod || 'cod',
    notes: data.notes || '',
    createdAt: now,
    updatedAt: now,
    items: data.items.map((item) => ({
      id: `item_${uid()}`,
      orderId: `order_${uid()}`,
      productId: item.productId,
      productName: item.productName,
      quantity: item.quantity,
      price: item.price,
      createdAt: now,
    })),
    refunds: [],
  };
  // Fix orderId reference after we know it
  order.items.forEach((item) => {
    item.orderId = order.id;
  });
  orders_store.push(order);
  return order;
}

export function getAllRefunds(): (Refund & { order?: Order })[] {
  return [...refunds_store].reverse().map((r) => ({
    ...r,
    order: orders_store.find((o) => o.id === r.orderId),
  }));
}

export function createRefund(data: {
  orderId: string;
  reason: string;
  description?: string;
  refundType?: string;
  amount?: number;
}): Refund {
  const now = new Date().toISOString();
  const refund: Refund = {
    id: `refund_${uid()}`,
    orderId: data.orderId,
    reason: data.reason,
    description: data.description || '',
    refundType: data.refundType || 'store_credit',
    status: 'pending',
    amount: data.amount || 0,
    createdAt: now,
    updatedAt: now,
  };
  refunds_store.push(refund);
  // Attach to order
  const order = orders_store.find((o) => o.id === data.orderId);
  if (order) {
    order.refunds.push(refund);
  }
  return refund;
}
