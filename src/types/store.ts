export type ProductCategory = 'all' | 'phones' | 'laptops' | 'audio' | 'chargers' | 'powerbanks' | 'cases' | 'services';

export type Currency = 'YER' | 'SAR' | 'USD';

export interface ProductVariant {
  label: string;
  priceDelta: number;
  specsSummary?: string;
}

export interface ProductColor {
  name: string;
  hex: string;
  bgClass: string;
}

export interface Product {
  id: string;
  name: string;
  nameEn: string;
  brand: string;
  category: 'phones' | 'laptops' | 'audio' | 'chargers' | 'powerbanks' | 'cases' | 'services';
  badge?: string;
  price: number; // Base price in YER
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  stock: number;
  colors: ProductColor[];
  variants: ProductVariant[];
  specs: Record<string, string>;
  features: string[];
  warranty: string;
  isFeatured?: boolean;
  customImageUrl?: string;
  visualType:
    | 'iphone16'
    | 's25ultra'
    | 'pixel9'
    | 'xiaomi15'
    | 'macbook'
    | 'xps16'
    | 'rogzephyrus'
    | 'thinkpad'
    | 'charger_gan'
    | 'powerbank'
    | 'airpods'
    | 'laptop_stand'
    | 'braided_cable'
    | 'screen_protector';
}

export interface CartItem {
  id: string;
  product: Product;
  selectedColor: ProductColor;
  selectedVariant: ProductVariant;
  quantity: number;
  unitPrice: number;
}

export type OrderStatus = 'new' | 'processing' | 'shipping' | 'delivered' | 'cancelled' | 'confirmed' | 'shipped';

export interface Order {
  id: string;
  items: CartItem[];
  customerName: string;
  phone: string;
  city: string;
  address: string;
  paymentMethod: 'cod' | 'card' | 'tamara';
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  currency: Currency;
  date: string;
  status: OrderStatus;
}

export interface RepairOption {
  id: string;
  issue: string;
  estimatedPrice: number;
  duration: string;
  warranty: string;
}
