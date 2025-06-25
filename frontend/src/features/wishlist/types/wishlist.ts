export interface WishlistItem {
  id: string;
  productId: string;
  name: string;
  brand?: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  rating: number;
  reviewCount: number;
  size?: string;
  color?: string;
  inStock: boolean;
  dateAdded: string;
  category: string;
  description: string;
  addedAt: Date;
  variants?: { _id: string; size: string; color: string; stock: number }[];
  totalStock?: number;
}

export interface WishlistFilters {
  category?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  brand?: string;
  inStock?: boolean;
  sortBy?: 'name' | 'price' | 'dateAdded' | 'rating' | 'newest' | 'oldest' | 'price-low' | 'price-high';
  sortOrder?: 'asc' | 'desc';
  searchQuery?: string;
}

export interface WishlistState {
  items: WishlistItem[];
  filteredItems: WishlistItem[];
  filters: WishlistFilters;
  loading: boolean;
  error: string | null;
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  categories: string[];
}