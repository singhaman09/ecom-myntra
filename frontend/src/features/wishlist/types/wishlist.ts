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
  dateAdded: string;
  category: string;
  description: string;
  image: string;
  addedAt: Date;
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