// import { useState, useEffect, useMemo } from 'react';
// import type { WishlistItem } from '../types/wishlist';
// import { apiService } from '../api';

// export interface WishlistFilters {
//   category?: string;
//   priceRange?: { min: number; max: number };
//   brand?: string;
//   inStock?: boolean;
//   sortBy?: 'newest' | 'oldest' | 'price-low' | 'price-high' | 'name';
//   searchQuery?: string;
// }

// export interface WishlistState {
//   items: WishlistItem[];
//   filters: WishlistFilters;
//   loading: boolean;
//   error: string | null;
// }

// const initialFilters: WishlistFilters = {
//   category: '',
//   priceRange: { min: 0, max: 100000 },
//   brand: '',
//   inStock: false,
//   sortBy: 'newest',
// };

// export const useWishlist = () => {
//   const [state, setState] = useState<WishlistState>({
//     items: [],
//     filters: initialFilters,
//     loading: false,
//     error: null,
//   });

//   const fetchWishlistItems = async () => {
//     setState((prev) => ({ ...prev, loading: true, error: null }));
//     try {
//       const items = await apiService.getWishlistItems();
//       setState((prev) => ({
//         ...prev,
//         items,
//         loading: false,
//       }));
//     } catch (error) {
//       setState((prev) => ({
//         ...prev,
//         error: 'Failed to load wishlist items',
//         loading: false,
//       }));
//     }
//   };

//   useEffect(() => {
//     fetchWishlistItems();
//   }, []);

//   const updateFilters = (newFilters: Partial<WishlistFilters>) => {
//     setState((prev) => ({
//       ...prev,
//       filters: { ...prev.filters, ...newFilters },
//     }));
//   };

//   const clearFilters = () => {
//     setState((prev) => ({
//       ...prev,
//       filters: initialFilters,
//     }));
//   };

//   const removeFromWishlist = async (itemId: string) => {
//     setState((prev) => ({ ...prev, error: null }));
//     try {
//       await apiService.removeFromWishlist(itemId);
//       setState((prev) => ({
//         ...prev,
//         items: prev.items.filter((item) => item.id !== itemId),
//       }));
//     } catch (error) {
//       setState((prev) => ({
//         ...prev,
//         error: 'Failed to remove item from wishlist',
//       }));
//     }
//   };

//   const addToWishlist = async (item: WishlistItem) => {
//     setState((prev) => ({ ...prev, error: null }));
//     try {
//       const newItem = await apiService.addToWishlist(item);
//       setState((prev) => ({
//         ...prev,
//         items: [...prev.items, newItem],
//       }));
//     } catch (error) {
//       setState((prev) => ({
//         ...prev,
//         error: 'Failed to add item to wishlist',
//       }));
//     }
//   };

//   const moveToCart = async (itemId: string) => {
//     setState((prev) => ({ ...prev, error: null }));
//     try {
//       await apiService.moveToCart(itemId);
//       setState((prev) => ({
//         ...prev,
//         items: prev.items.filter((item) => item.id !== itemId),
//       }));
//     } catch (error) {
//       setState((prev) => ({
//         ...prev,
//         error: 'Failed to move item to cart',
//       }));
//     }
//   };

//   const updateWishlistItem = async (updatedItem: WishlistItem) => {
//     setState((prev) => ({ ...prev, error: null }));
//     try {
//       const item = await apiService.updateWishlistItem(updatedItem);
//       setState((prev) => ({
//         ...prev,
//         items: prev.items.map((existingItem) =>
//           existingItem.id === item.id ? item : existingItem
//         ),
//       }));
//     } catch (error) {
//       setState((prev) => ({
//         ...prev,
//         error: 'Failed to update wishlist item',
//       }));
//     }
//   };

//   const filteredItems = useMemo(() => {
//     let filtered = [...state.items];

//     // Filter by category
//     if (state.filters.category) {
//       filtered = filtered.filter((item) =>
//         item.category.toLowerCase() === state.filters.category!.toLowerCase()
//       );
//     }

//     // Filter by brand
//     if (state.filters.brand) {
//       filtered = filtered.filter((item) =>
//         item.brand?.toLowerCase().includes(state.filters.brand!.toLowerCase())
//       );
//     }

//     // Filter by stock status
//     if (state.filters.inStock) {
//       filtered = filtered.filter((item) => item.inStock);
//     }

//     // Filter by price range
//     if (state.filters.priceRange) {
//       filtered = filtered.filter(
//         (item) =>
//           item.price >= state.filters.priceRange!.min &&
//           item.price <= state.filters.priceRange!.max
//       );
//     }

//     // Filter by search query
//     if (state.filters.searchQuery) {
//       const query = state.filters.searchQuery.toLowerCase();
//       filtered = filtered.filter(
//         (item) =>
//           item.name.toLowerCase().includes(query) ||
//           item.description.toLowerCase().includes(query) ||
//           item.category.toLowerCase().includes(query) ||
//           item.brand?.toLowerCase().includes(query)
//       );
//     }

//     // Sort items
//     filtered.sort((a, b) => {
//       switch (state.filters.sortBy) {
//         case 'newest':
//           return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
//         case 'oldest':
//           return new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime();
//         case 'price-low':
//           return a.price - b.price;
//         case 'price-high':
//           return b.price - a.price;
//         case 'name':
//           return a.name.localeCompare(b.name);
//         default:
//           return 0;
//       }
//     });

//     return filtered;
//   }, [state.items, state.filters]);

//   const getCategories = useMemo(() => {
//     return Array.from(new Set(state.items.map(item => item.category)));
//   }, [state.items]);

//   const getBrands = useMemo(() => {
//     return Array.from(new Set(state.items.map(item => item.brand).filter(Boolean)));
//   }, [state.items]);

//   const clearError = () => {
//     setState((prev) => ({ ...prev, error: null }));
//   };

//   return {
//     ...state,
//     filteredItems,
//     categories: getCategories,
//     brands: getBrands,
//     updateFilters,
//     clearFilters,
//     removeFromWishlist,
//     addToWishlist,
//     moveToCart,
//     updateWishlistItem,
//     refetch: fetchWishlistItems,
//     clearError,
//   };
// };