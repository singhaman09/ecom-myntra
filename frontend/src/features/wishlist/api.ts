import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { WishlistItem } from './types/wishlist';
import shoes from '../../assets/shoes.jpeg';

const USE_MOCK = false;

const API_BASE_URL = 'https://dd8f-14-194-22-202.ngrok-free.app';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbnRpdHlJZCI6IjY4NGZhZDc0YmRiNTc1MTQ1MmY5OGMxNSIsImVtYWlsIjoiMzAzMDFpdEBnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImRldmljZUlkIjoiMTI3OGY4N2ItZjY4Ny00NzAzLWIxMTItYzYwOWVlY2Q0OGZiIiwiaWF0IjoxNzUwNDE5MTE0LCJleHAiOjE3NTA1MDU1MTR9.dH06S8EAW9VWgAV0-Usm3eU7XcdgwLikrIGw8Yi9MAw';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true',
    Authorization: `Bearer ${token}`,
    
  },
});

interface WishlistApiResponse {
  _id: string;
  userId: string;
  items: WishlistItemApiResponse[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface WishlistItemApiResponse {
  _id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  category?: string;
  description?: string;
  variants?: { _id: string; size: string; color: string; stock: number; createdAt: string; updatedAt: string; __v: number }[];
  totalStock?: number;
  reviews?: any[];
}

const mapApiItemToWishlistItem = (apiItem: WishlistItemApiResponse): WishlistItem => ({
  id: apiItem._id,
  productId: apiItem.productId,
  name: apiItem.name,
  brand: 'Unknown', // JSON doesn't provide brand
  price: apiItem.price,
  originalPrice: undefined, // JSON doesn't provide originalPrice
  discount: undefined, // JSON doesn't provide discount
  image: apiItem.image || shoes,
  rating: apiItem.reviews?.length ? 3 : 0, // Default rating if reviews exist
  reviewCount: apiItem.reviews?.length || 0,
  size: apiItem.variants?.[0]?.size, // Use first variant's size
  color: apiItem.variants?.[0]?.color, // Use first variant's color
  inStock: (apiItem.totalStock ?? 0) > 0,
  dateAdded: new Date().toISOString(), // JSON doesn't provide dateAdded
  category: apiItem.category || 'Unknown',
  description: apiItem.description || 'No description available',
  addedAt: new Date(),
  variants: apiItem.variants,
  totalStock: apiItem.totalStock,
});

const mockWishlistItems: WishlistItemApiResponse[] = [
  {
    _id: '1',
    productId: 'mock1',
    name: 'Mock Headphones',
    price: 999,
    image: shoes,
    category: 'Electronics',
    description: 'High-quality headphones',
    variants: [
      { _id: 'v1', size: 'One Size', color: 'Black', stock: 5, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), __v: 0 },
    ],
    totalStock: 5,
    reviews: [],
  },
  {
    _id: '2',
    productId: 'mock2',
    name: 'Mock Laptop',
    price: 45999,
    image: shoes,
    category: 'Electronics',
    description: 'Powerful laptop',
    variants: [
      { _id: 'v2', size: '15-inch', color: 'Silver', stock: 0, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), __v: 0 },
    ],
    totalStock: 0,
    reviews: [],
  },
  {
    _id: '3',
    productId: 'mock3',
    name: 'Mock Laptop',
    price: 45999,
    image: shoes,
    category: 'Electronics',
    description: 'Powerful laptop',
    variants: [
      { _id: 'v3', size: '15-inch', color: 'Silver', stock: 0, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), __v: 0 },
    ],
    totalStock: 0,
    reviews: [],
  },
  {
    _id: '4',
    productId: 'mock4',
    name: 'Mock Laptop',
    price: 45999,
    image: shoes,
    category: 'Electronics',
    description: 'Powerful laptop',
    variants: [
      { _id: 'v4', size: '15-inch', color: 'Silver', stock: 10, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), __v: 0 },
    ],
    totalStock: 10,
    reviews: [],
  },
  {
    _id: '5',
    productId: 'mock5',
    name: 'Mock Laptop',
    price: 45999,
    image: shoes,
    category: 'Electronics',
    description: 'Powerful laptop',
    variants: [
      { _id: 'v5', size: '15-inch', color: 'Silver', stock: 10, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), __v: 0 },
    ],
    totalStock: 10,
    reviews: [],
  },
  {
    _id: '6',
    productId: 'mock6',
    name: 'Mock Laptop',
    price: 45999,
    image: shoes,
    category: 'Electronics',
    description: 'Powerful laptop',
    variants: [
      { _id: 'v6', size: '15-inch', color: 'Silver', stock: 10, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), __v: 0 },
    ],
    totalStock: 10,
    reviews: [],
  },
];

const simulateDelay = (ms: number = 500) => new Promise((resolve) => setTimeout(resolve, ms));

export const apiService = {
  getWishlistItems: async (): Promise<WishlistItem[]> => {
    if (USE_MOCK) {
      await simulateDelay();
      return mockWishlistItems.map(mapApiItemToWishlistItem);
    }

    try {
      const response: AxiosResponse<WishlistApiResponse> = await axiosInstance.get('/wishlist');
      return response.data.items.map(mapApiItemToWishlistItem);
    } catch {
      throw new Error('Failed to fetch wishlist items');
    }
  },

  addToWishlist: async (productId: string, size: string, color: string): Promise<WishlistItem> => {
    if (USE_MOCK) {
      await simulateDelay();
      const newItem: WishlistItemApiResponse = {
        _id: `mock${mockWishlistItems.length + 1}`,
        productId,
        name: `Mock Product ${mockWishlistItems.length + 1}`,
        price: 1000,
        image: shoes,
        category: 'Unknown',
        description: 'Mock product description',
        variants: [{ _id: `v${mockWishlistItems.length + 1}`, size, color, stock: 10, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), __v: 0 }],
        totalStock: 10,
        reviews: [],
      };
      mockWishlistItems.push(newItem);
      return mapApiItemToWishlistItem(newItem);
    }

    try {
      const response: AxiosResponse<WishlistItemApiResponse> = await axiosInstance.post(`/wishlist/add/${productId}`, { size, color });
      return mapApiItemToWishlistItem(response.data);
    } catch {
      throw new Error('Failed to add item to wishlist');
    }
  },

  removeFromWishlist: async (itemId: string): Promise<void> => {
    if (USE_MOCK) {
      await simulateDelay();
      const index = mockWishlistItems.findIndex((item) => item._id === itemId);
      if (index !== -1) {
        mockWishlistItems.splice(index, 1);
        return;
      }
      throw new Error('Item not found in mock data');
    }

    try {
      await axiosInstance.delete(`/wishlist/items/${itemId}`);
    } catch {
      throw new Error('Failed to remove item from wishlist');
    }
  },

  moveToCart: async (itemId: string): Promise<void> => {
    if (USE_MOCK) {
      await simulateDelay();
      const index = mockWishlistItems.findIndex((item) => item._id === itemId);
      if (index !== -1) {
        mockWishlistItems.splice(index, 1);
        return;
      }
      throw new Error('Item not found in mock data');
    }

    try {
      await axiosInstance.post(`/addToCart/${itemId}`);
    } catch {
      throw new Error('Failed to move item to cart');
    }
  },

  updateWishlistItem: async (item: WishlistItem): Promise<WishlistItem> => {
    if (USE_MOCK) {
      await simulateDelay();
      const index = mockWishlistItems.findIndex((apiItem) => apiItem._id === item.id);
      if (index !== -1) {
        const updated: WishlistItemApiResponse = {
          _id: item.id,
          productId: item.productId,
          name: item.name,
          price: item.price,
          image: item.image,
          category: item.category,
          description: item.description,
          variants: item.variants,
          totalStock: item.totalStock,
          reviews: item.reviews || [],
        };
        mockWishlistItems[index] = updated;
        return mapApiItemToWishlistItem(updated);
      }
      throw new Error('Mock item not found');
    }

    try {
      const payload = {
        productId: item.productId,
        name: item.name,
        price: item.price,
        image: item.image,
        category: item.category,
        description: item.description,
        variants: item.variants,
        totalStock: item.totalStock,
      };
      const response: AxiosResponse<WishlistItemApiResponse> = await axiosInstance.put(`/wishlist/item/${item.id}`, payload);
      return mapApiItemToWishlistItem(response.data);
    } catch {
      throw new Error('Failed to update wishlist item');
    }
  },
};