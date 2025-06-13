import { useState, useEffect, useMemo } from 'react';
import type { WishlistItem, WishlistFilters, WishlistState } from '../types/wishlist';
import { apiService } from '../api';

const initialFilters: WishlistFilters = {
  category: '',
  priceRange: { min: 0, max: 100000 },
  brand: '',
  inStock: false,
  sortBy: 'newest',
};

export const useWishlist = () => {
  const [state, setState] = useState<WishlistState>({
    items: [],
    filters: initialFilters,
    loading: false,
    error: null,
  });

  const fetchWishlistItems = async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const items = await apiService.getWishlistItems();
      setState((prev) => ({
        ...prev,
        items,
        loading: false,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: 'Failed to load wishlist items',
        loading: false,
      }));
    }
  };

  useEffect(() => {
    fetchWishlistItems();
  }, []);

  const updateFilters = (newFilters: Partial<WishlistFilters>) => {
    setState((prev) => ({
      ...prev,
      filters: { ...prev.filters, ...newFilters },
    }));
  };

  const removeFromWishlist = async (itemId: string) => {
    try {
      await apiService.removeFromWishlist(itemId);
      setState((prev) => ({
        ...prev,
        items: prev.items.filter((item) => item.id !== itemId),
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: 'Failed to remove item from wishlist',
      }));
    }
  };

  const moveToCart = async (itemId: string) => {
    try {
      await apiService.moveToCart(itemId);
      setState((prev) => ({
        ...prev,
        items: prev.items.filter((item) => item.id !== itemId),
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: 'Failed to move item to cart',
      }));
    }
  };

  const filteredItems = useMemo(() => {
    let filtered = [...state.items];

    if (state.filters.category) {
      filtered = filtered.filter((item) =>
        item.category.toLowerCase() === state.filters.category.toLowerCase()
      );
    }

    if (state.filters.brand) {
      filtered = filtered.filter((item) =>
        item.brand.toLowerCase().includes(state.filters.brand.toLowerCase())
      );
    }

    if (state.filters.inStock) {
      filtered = filtered.filter((item) => item.inStock);
    }

    filtered = filtered.filter(
      (item) =>
        item.price >= state.filters.priceRange.min &&
        item.price <= state.filters.priceRange.max
    );

    filtered.sort((a, b) => {
      switch (state.filters.sortBy) {
        case 'newest':
          return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
        case 'oldest':
          return new Date(a.addedAt).getTime() - new Date(b.addedAt).getTime();
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [state.items, state.filters]);

  return {
    ...state,
    filteredItems,
    updateFilters,
    removeFromWishlist,
    moveToCart,
    refetch: fetchWishlistItems,
  };
};