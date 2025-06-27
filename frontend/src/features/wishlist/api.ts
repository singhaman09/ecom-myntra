import type { AxiosResponse } from 'axios';
import type { WishlistItem } from './types/wishlist';
import shoes from '../../assets/shoes.jpeg';
import bag from '../../assets/bag.jpeg';
import cam from '../../assets/cam.jpg';
import watch from '../../assets/watch.jpeg';
import watch1 from '../../assets/watch1.jpeg';
import honey from '../../assets/honey.jpeg';
import apiClient from '../../services/apiClient'; 
const WISHLIST_URL = import.meta.env.VITE_WISHLIST_URL;
const USE_MOCK = true;

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
  variants: { _id: string; size: string; color: string; stock: number; createdAt: string; updatedAt: string; __v: number }[];
  totalStock?: number;
  reviews?: any[];
}

const mapApiItemToWishlistItem = (apiItem: WishlistItemApiResponse): WishlistItem => ({
  id: apiItem._id,
  productId: apiItem.productId,
  name: apiItem.name,
  brand: 'Unknown',
  price: apiItem.price,
  originalPrice: undefined,
  discount: undefined,
  image: apiItem.image || shoes,
  rating: apiItem.reviews?.length ? 3 : 0,
  reviewCount: apiItem.reviews?.length || 0,
  size: apiItem.variants?.[0]?.size,
  color: apiItem.variants?.[0]?.color,
  inStock: (apiItem.totalStock ?? 0) > 0,
  dateAdded: new Date().toISOString(),
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
    name: 'Shoes',
    price: 999,
    image: shoes,
    category: 'Electronics',
    description: 'High-quality headphones',
    variants: [{ _id: 'v1', size: 'One Size', color: 'Black', stock: 5, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), __v: 0 }],
    totalStock: 5,
    reviews: [],
  },
   {
    _id: '2',
    productId: 'mock2',
    name: 'Bag',
    price: 45999,
    image: bag,
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
    name: 'Camera',
    price: 45999,
    image: cam,
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
    name: 'Watch',
    price: 45999,
    image: watch,
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
    name: 'Watch',
    price: 45999,
    image: watch1,
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
    name: 'Honey',
    price: 45999,
    image: honey,
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
      const response: AxiosResponse<WishlistApiResponse> = await apiClient.get(`${WISHLIST_URL}/wishlist`);
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
        variants: [{
          _id: `v${mockWishlistItems.length + 1}`,
          size, color, stock: 10,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          __v: 0
        }],
        totalStock: 10,
        reviews: [],
      };
      mockWishlistItems.push(newItem);
      return mapApiItemToWishlistItem(newItem);
    }

    try {
      const response: AxiosResponse<WishlistItemApiResponse> = await apiClient.post(`${WISHLIST_URL}/wishlist/add/${productId}`, { size, color });
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
      await apiClient.delete(`${WISHLIST_URL}/wishlist/items/${itemId}`);
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
      await apiClient.post(`${WISHLIST_URL}/addToCart/${itemId}`);
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
          variants: item.variants?.map(variant => ({
            ...variant,
            createdAt: (variant as any).createdAt || new Date().toISOString(),
            updatedAt: (variant as any).updatedAt || new Date().toISOString(),
            __v: (variant as any).__v ?? 0,
          })) || [],
          totalStock: item.totalStock,
          reviews: [],
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
      const response: AxiosResponse<WishlistItemApiResponse> = await apiClient.put(`${WISHLIST_URL}/wishlist/item/${item.id}`, payload);
      return mapApiItemToWishlistItem(response.data);
    } catch {
      throw new Error('Failed to update wishlist item');
    }
  },
};
