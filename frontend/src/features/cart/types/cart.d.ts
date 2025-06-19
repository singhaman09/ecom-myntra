export interface CartItem {
  productId: string;
  name: string;
  desc: string;
  price: number;
  // discount: number;
  image: string;
  brand: string;
  quantity: number;
  size: string;
  availableSizes?: string[]; // ✅ added for modal size options
}


export interface Coupon {
  code: string;
  discount: number;
  description: string;
  expires: string;
}

export interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  isDefault: boolean;
} 


interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  discount: number;
  image: string;
  category?: string;
}

export interface Cart {
  userId: string;
  items: CartItem[];
  totalAmount: number;
}



export interface CartState {
  cart: CartItem[];
  loading: boolean;
  error: string | null;
}