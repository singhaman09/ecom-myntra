// types/wishlist.ts
// export interface WishlistItem {
//   id: string;
//   productId: string;
//   name: string;
//   brand: string;
//   price: number;
//   originalPrice?: number;
//   discount?: number;
//   image: string;
//   rating: number;
//   reviewCount: number;
//   size?: string;
//   color?: string;
//   inStock: boolean;
//   addedAt: Date;
//   category: string;
//   imageUrl: string;
//   description: string;
//   dateAdded: string;
// }
export interface WishlistItem {
  id: string;
  productId: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  size?: string;
  color?: string;
  inStock: boolean;
  dateAdded: string; // Keep only this string field for date
  category: string;
  description: string;
  image:string
  addedAt:Date
  // imageUrl:string
  // Remove imageUrl and addedAt because not used in mock
  // Remove quantity (not in interface)
}


export interface WishlistFilters {
  category: string;
  priceRange: {
    min: number;
    max: number;
  };
  brand: string;
  inStock: boolean;
  sortBy: 'newest' | 'oldest' | 'price-low' | 'price-high' | 'name';
}

export interface WishlistState {
  items: WishlistItem[];
  filters: WishlistFilters;
  loading: boolean;
  error: string | null;
}