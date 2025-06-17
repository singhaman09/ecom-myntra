import type { CartItem, Coupon, Address, Product } from "../types/cart";
import recom from "../../../assets/recom.jpg";

export const STATIC_CART_ITEMS: CartItem[] = [
  {
    productId: "P001",
    name: "Nike Air Max 270",
    brand: "Nike",
    desc: "Comfortable and stylish sneakers perfect for casual wear.",
    price: 8999,
    image:
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=120&q=80",
    size: "UK 9",
    quantity: 1,
  },
  {
    productId: "P002",
    name: "Levi's 511 Slim Fit Jeans",
    brand: "Levi's",
    desc: "Mid-rise slim fit denim with stretch for comfort.",
    price: 3599,
    image:
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=120&q=80",
    size: "32",
    quantity: 2,
  },
  {
    productId: "P003",
    name: "Apple AirPods Pro (2nd Gen)",
    brand: "Apple",
    desc: "Active Noise Cancellation with better battery and sound.",
    price: 24999,
    image:
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=120&q=80",
    size: "Standard",
    quantity: 1,
  },
];

export const STATIC_COUPONS: Coupon[] = [
  {
    code: "SAVE10",
    description: "Get ₹10 off on your order",
    discount: 10,
    expires: "2025-12-31",
  },
  {
    code: "FREESHIP",
    description: "Free shipping on orders above ₹499",
    discount: 20,
    expires: "2025-12-31",
  },
];

export const STATIC_OFFERS: string[] = [
  "Get extra 10% off using UPI at checkout.TCA",
  "Free delivery on orders above ₹499.TCA",
  "₹100 cashback on XYZ Bank Cards.TCA",
];

export const STATIC_ADDRESSES: Address[] = [
  {
    id: "A002",
    name: "Siddharth Pandey",
    street: "Appinventiv Technologies",
    city: "Noida",
    state: "UP",
    zip: "201301",
    phone: "9876543210",
    isDefault: true,
  },
  {
    id: "A003",
    name: "John Doe",
    street: "789 Oak St",
    city: "Gurgaon",
    state: "HR",
    zip: "122018",
    phone: "9876543210",
    isDefault: false,
  },
];

export const DISCOUNT = 28;

export const Recommended_items: Product[] = [
  {
    id: "1",
    name: "Air Max 270",
    brand: "Nike",
    price: 14999,
    discount: 20,
    image: recom,
    category: "Shoes",
  },
  {
    id: "2",
    name: "Ultraboost 22",
    brand: "Adidas",
    price: 17999,
    discount: 25,
    image: recom,
    category: "Shoes",
  },
  {
    id: "3",
    name: "Galaxy Watch 6",
    brand: "Samsung",
    price: 24999,
    discount: 15,
    image: recom,
    category: "Wearables",
  },
  {
    id: "4",
    name: "iPhone 14",
    brand: "Apple",
    price: 79999,
    discount: 10,
    image: recom,
    category: "Smartphones",
  },
  {
    id: "5",
    name: "OnePlus Nord CE 3",
    brand: "OnePlus",
    price: 24999,
    discount: 18,
    image: recom,
    category: "Smartphones",
  },
  {
    id: "6",
    name: "Noise ColorFit Icon",
    brand: "Noise",
    price: 3999,
    discount: 30,
    image: recom,
    category: "Wearables",
  },
  {
    id: "7",
    name: "MacBook Air M2",
    brand: "Apple",
    price: 114999,
    discount: 12,
    image: recom,
    category: "Laptops",
  },
  {
    id: "8",
    name: "Yoga Slim 7i",
    brand: "Lenovo",
    price: 84999,
    discount: 22,
    image: recom,
    category: "Laptops",
  },
];
