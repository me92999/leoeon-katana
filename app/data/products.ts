/**
 * 商品数据配置文件
 * 当 Notion 未配置时，使用此本地数据作为 fallback
 *
 * 字段说明：
 * - id: 商品唯一编号（数字，不能重复）
 * - name: 商品名称
 * - category: 商品分类（ANIME REPLICA / MOVIE REPLICA / AUTHENTIC / ACCESSORY）
 * - price: 当前售价（数字，不含 $ 符号）
 * - originalPrice: 原价（不打折填 null）
 * - rating: 评分（1.0 ~ 5.0）
 * - reviews: 评价数量
 * - tag: 标签（BESTSELLER / LIMITED / POPULAR / PREMIUM / GIFT / MASTERPIECE / NEW）
 * - tagColor: 标签颜色（bg-gold / bg-gold-dark / bg-crimson / bg-crimson-light）
 * - image: 商品图片路径或 URL
 * - slug: URL 标识（小写英文，用 - 连接）
 * - inStock: 是否有库存（true / false）
 * - description: 商品详细描述（用于详情页）
 * - specs: 规格参数（用于详情页）
 */

export interface ProductSpecs {
  bladeLength: string;
  overallLength: string;
  weight: string;
  material: string;
  handle: string;
}

export interface ProductImage {
  url: string;
  type?: string;
  alt?: string;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice: number | null;
  rating: number;
  reviews: number;
  tag: string | null;
  tagColor: string | null;
  image: string;
  imageAlt?: string;
  gallery?: ProductImage[];
  slug: string;
  inStock: boolean;
  description?: string;
  specs?: ProductSpecs;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Demon Slayer Tanjiro Katana",
    category: "ANIME REPLICA",
    price: 329,
    originalPrice: 399,
    rating: 4.9,
    reviews: 128,
    tag: "BESTSELLER",
    tagColor: "bg-gold",
    image: "/images/products/tanjiro.jpg",
    slug: "demon-slayer-tanjiro-katana",
    inStock: true,
    description:
      "An officially inspired replica of Tanjiro Kamado's iconic Nichirin sword from Demon Slayer. This stunning piece features a black blade with a mesmerizing crimson hamon pattern, perfectly capturing the essence of the Water Breathing technique. The handle is wrapped in authentic ray skin with a dark green silk tsuka-ito, matching the original design. Each sword comes with a hardwood saya (scabbard) finished in deep black lacquer. Perfect for cosplay, collection, or display.",
    specs: {
      bladeLength: "28 inches / 71 cm",
      overallLength: "41 inches / 104 cm",
      weight: "2.6 lbs / 1.2 kg",
      material: "1045 Carbon Steel",
      handle: "Ray skin + Silk wrap",
    },
  },
  {
    id: 2,
    name: "Kill Bill Hattori Hanzo",
    category: "MOVIE REPLICA",
    price: 459,
    originalPrice: 529,
    rating: 4.8,
    reviews: 96,
    tag: "LIMITED",
    tagColor: "bg-crimson",
    image: "/images/products/kill-bill.jpg",
    slug: "kill-bill-hattori-hanzo",
    inStock: true,
    description:
      "The legendary sword crafted by Hattori Hanzo for The Bride in Quentin Tarantino's Kill Bill. This battle-ready replica features a beautifully polished 9260 spring steel blade with a distinctive gold lion emblem on the tsuba. The handle is wrapped in genuine white samegawa with black leather tsuka-ito. A true collector's piece that captures the spirit of vengeance and honor.",
    specs: {
      bladeLength: "30 inches / 76 cm",
      overallLength: "43 inches / 109 cm",
      weight: "2.8 lbs / 1.3 kg",
      material: "9260 Spring Steel",
      handle: "Ray skin + Leather wrap",
    },
  },
  {
    id: 3,
    name: "Traditional Handmade Katana",
    category: "AUTHENTIC",
    price: 599,
    originalPrice: null,
    rating: 5.0,
    reviews: 74,
    tag: null,
    tagColor: null,
    image: "/images/products/traditional.jpg",
    slug: "traditional-handmade-katana",
    inStock: true,
    description:
      "A fully functional, traditionally hand-forged katana made by certified master smiths in Japan. The blade is crafted from folded 1095 high-carbon steel with a genuine clay-tempered hamon. Featuring a genuine ray skin handle wrapped in premium black silk, a brass tsuba with traditional motifs, and a hand-lacquered saya. Each sword is individually numbered and comes with a certificate of authenticity signed by the smith.",
    specs: {
      bladeLength: "29 inches / 74 cm",
      overallLength: "42 inches / 107 cm",
      weight: "2.9 lbs / 1.3 kg",
      material: "1095 Folded Steel",
      handle: "Authentic ray skin + Silk",
    },
  },
  {
    id: 4,
    name: "One Piece Roronoa Zoro Wado",
    category: "ANIME REPLICA",
    price: 289,
    originalPrice: 349,
    rating: 4.7,
    reviews: 215,
    tag: "POPULAR",
    tagColor: "bg-gold-dark",
    image: "/images/products/zoro.jpg",
    slug: "one-piece-zoro-wado",
    inStock: true,
    description:
      "Wado Ichimonji, one of the 21 Great Grade Swords and the trusted companion of Roronoa Zoro. This high-quality replica features a pure white handle and saya, symbolizing its owner's unwavering will. The blade is made from 1045 carbon steel with a mirror polish finish. The circular tsuba is crafted from alloy with intricate wave patterns. A must-have for any One Piece fan.",
    specs: {
      bladeLength: "27 inches / 69 cm",
      overallLength: "40 inches / 102 cm",
      weight: "2.4 lbs / 1.1 kg",
      material: "1045 Carbon Steel",
      handle: "White ray skin + White silk",
    },
  },
  {
    id: 5,
    name: "Last Samurai Battle Ready",
    category: "MOVIE REPLICA",
    price: 749,
    originalPrice: 899,
    rating: 4.9,
    reviews: 52,
    tag: "PREMIUM",
    tagColor: "bg-crimson-light",
    image: "/images/products/last-samurai.jpg",
    slug: "last-samurai-battle-ready",
    inStock: true,
    description:
      "Inspired by the swords used in The Last Samurai, this battle-ready katana is crafted for serious practitioners. The blade is made from T10 tool steel with a genuine clay-tempered hamon and razor-sharp edge. The tsuka features genuine samegawa with brown silk ito in a traditional hineri-maki style. The iron tsuba features a classic cherry blossom motif. Includes a deluxe cotton sword bag.",
    specs: {
      bladeLength: "29 inches / 74 cm",
      overallLength: "42 inches / 107 cm",
      weight: "3.0 lbs / 1.4 kg",
      material: "T10 Clay-Tempered Steel",
      handle: "Genuine ray skin + Silk",
    },
  },
  {
    id: 6,
    name: "Mini Katana Letter Opener",
    category: "ACCESSORY",
    price: 89,
    originalPrice: null,
    rating: 4.6,
    reviews: 341,
    tag: "GIFT",
    tagColor: "bg-gold",
    image: "/images/products/mini-katana.jpg",
    slug: "mini-katana-letter-opener",
    inStock: true,
    description:
      "A beautifully crafted miniature katana that doubles as an elegant letter opener. Perfect for your desk or as a unique gift for sword enthusiasts. The 6-inch blade is made from stainless steel with a detailed hamon etching. The handle is wrapped in micro silk cord with a tiny alloy tsuba. Comes in a premium gift box with a wooden display stand.",
    specs: {
      bladeLength: "6 inches / 15 cm",
      overallLength: "9 inches / 23 cm",
      weight: "0.2 lbs / 90 g",
      material: "Stainless Steel",
      handle: "Silk cord wrap",
    },
  },
  {
    id: 7,
    name: "Bleach Ichigo Zangetsu",
    category: "ANIME REPLICA",
    price: 379,
    originalPrice: 429,
    rating: 4.8,
    reviews: 167,
    tag: null,
    tagColor: null,
    image: "/images/products/ichigo.jpg",
    slug: "bleach-ichigo-zangetsu",
    inStock: false,
    description:
      "The iconic Zangetsu wielded by Ichigo Kurosaki in Bleach. This impressive replica features the signature oversized blade with a sleek black finish and silver edge. The wrap-around handle design is faithfully recreated with black cotton tsuka-ito. The massive rectangular tsuba is cast from high-quality alloy with detailed engravings. A centerpiece for any anime sword collection.",
    specs: {
      bladeLength: "32 inches / 81 cm",
      overallLength: "47 inches / 119 cm",
      weight: "3.5 lbs / 1.6 kg",
      material: "1060 Carbon Steel",
      handle: "Cotton wrap",
    },
  },
  {
    id: 8,
    name: "Hand-Forged T10 Steel Katana",
    category: "AUTHENTIC",
    price: 899,
    originalPrice: 1099,
    rating: 5.0,
    reviews: 43,
    tag: "MASTERPIECE",
    tagColor: "bg-gold",
    image: "/images/products/t10-steel.jpg",
    slug: "hand-forged-t10-steel-katana",
    inStock: true,
    description:
      "Our flagship masterpiece — a hand-forged katana crafted from premium T10 tool steel with a stunning notare (wave) hamon. This sword represents the pinnacle of our craft, featuring a blade that has been differentially hardened using traditional clay coating techniques. The tsuka is adorned with premium black samegawa and gold silk ito. The hand-engraved copper tsuba depicts a dragon among clouds. Each piece takes over 3 weeks to complete and is accompanied by a deluxe display stand and maintenance kit.",
    specs: {
      bladeLength: "29 inches / 74 cm",
      overallLength: "42 inches / 107 cm",
      weight: "3.1 lbs / 1.4 kg",
      material: "T10 Differential Hardened",
      handle: "Premium ray skin + Gold silk",
    },
  },
];

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getInStockProducts(): Product[] {
  return products.filter((p) => p.inStock);
}

export function getOnSaleProducts(): Product[] {
  return products.filter((p) => p.originalPrice !== null);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
