// hooks/useWishlist.ts
import { useState, useEffect, useMemo } from 'react';
import type { WishlistItem, WishlistFilters, WishlistState } from '../types/wishlist';
import { apiService } from '../../order/api';

// Mock data for demonstration
const mockWishlistItems: WishlistItem[] = [
  {
    id: '1',
    productId: 'prod-001',
    name: 'Cotton Casual Shirt',
    brand: 'Roadster',
    price: 899,
    originalPrice: 1299,
    discount: 31,
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300&h=400&fit=crop',
    rating: 4.2,
    reviewCount: 1250,
    size: 'M',
    color: 'Blue',
    inStock: true,
    addedAt: new Date('2024-01-15'),
    category: 'Men',
    // imageUrl: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300&h=400&fit=crop',
    description: 'A comfortable cotton casual shirt perfect for everyday wear.',
    dateAdded: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    productId: 'prod-002',
    name: 'Floral Print Dress',
    brand: 'H&M',
    price: 1299,
    originalPrice: 1999,
    discount: 35,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=400&fit=crop',
    rating: 4.5,
    reviewCount: 892,
    size: 'S',
    color: 'Pink',
    inStock: true,
    addedAt: new Date('2024-01-10'),
    category: 'Women',
    // imageUrl: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300&h=400&fit=crop',
    description: 'A comfortable cotton casual shirt perfect for everyday wear.',
    dateAdded: '2024-01-15T10:00:00Z'
  },
  {
    id: '3',
    productId: 'prod-003',
    name: 'Kids Denim Jacket',
    brand: 'Gini & Jony',
    price: 799,
    originalPrice: 1199,
    discount: 33,
    image: 'https://images.unsplash.com/photo-1503944168674-c5f26644d3b4?w=300&h=400&fit=crop',
    rating: 4.0,
    reviewCount: 456,
    size: '8-9Y',
    color: 'Blue',
    inStock: false,
    addedAt: new Date('2024-01-05'),
    category: 'Kids',
    // imageUrl: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300&h=400&fit=crop',
    description: 'A comfortable cotton casual shirt perfect for everyday wear.',
    dateAdded: '2024-01-15T10:00:00Z'
  },
  {
    id: '4',
    productId: 'prod-004',
    name: 'Wireless Earbuds',
    brand: 'boAt',
    price: 1999,
    originalPrice: 2999,
    discount: 33,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&h=400&fit=crop',
    rating: 4.3,
    reviewCount: 2156,
    inStock: true,
    addedAt: new Date('2024-01-12'),
    category: 'Beauty',
    // imageUrl: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300&h=400&fit=crop',
    description: 'A comfortable cotton casual shirt perfect for everyday wear.',
    dateAdded: '2024-01-15T10:00:00Z'
  }
];

const initialFilters: WishlistFilters = {
  category: '',
  priceRange: { min: 0, max: 10000 },
  brand: '',
  inStock: false,
  sortBy: 'newest'
};

export const useWishlist = () => {
  const [state, setState] = useState<WishlistState>({
    items: [],
    filters: initialFilters,
    loading: false,
    error: null
  });

  useEffect(() => {
    fetchWishlistItems();
  }, []);

  const fetchWishlistItems = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      setState(prev => ({
        ...prev,
        items: mockWishlistItems,
        loading: false
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Failed to load wishlist items',
        loading: false
      }));
    }
  };

  const updateFilters = (newFilters: Partial<WishlistFilters>) => {
    setState(prev => ({
      ...prev,
      filters: { ...prev.filters, ...newFilters }
    }));
  };

  const removeFromWishlist = async (itemId: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      setState(prev => ({
        ...prev,
        items: prev.items.filter(item => item.id !== itemId)
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Failed to remove item from wishlist'
      }));
    }
  };

  const moveToCart = async (itemId: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      // Remove from wishlist after moving to cart
      setState(prev => ({
        ...prev,
        items: prev.items.filter(item => item.id !== itemId)
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Failed to move item to cart'
      }));
    }
  };

  const filteredItems = useMemo(() => {
    let filtered = [...state.items];

    // Apply filters
    if (state.filters.category) {
      filtered = filtered.filter(item => 
        item.category.toLowerCase() === state.filters.category.toLowerCase()
      );
    }

    if (state.filters.brand) {
      filtered = filtered.filter(item => 
        item.brand.toLowerCase().includes(state.filters.brand.toLowerCase())
      );
    }

    if (state.filters.inStock) {
      filtered = filtered.filter(item => item.inStock);
    }

    filtered = filtered.filter(item => 
      item.price >= state.filters.priceRange.min && 
      item.price <= state.filters.priceRange.max
    );

    // Apply sorting
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
    refetch: fetchWishlistItems
  };
};