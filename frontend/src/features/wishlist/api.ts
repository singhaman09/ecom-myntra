import axios from 'axios';
import type { AxiosResponse } from 'axios'; 
import type { WishlistItem } from './types/wishlist';
import shoes from '../../assets/shoes.jpeg';

const USE_MOCK = false;

const API_BASE_URL = 'https://d6ab-14-194-22-202.ngrok-free.app';
const token = localStorage.getItem('token');

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true',
    'Authorization': `Bearer ${token}`
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
  productId: string;
  name: string;
  price: number;
  image: string;
  _id: string;
  inStock: boolean;
}

const mapApiItemToWishlistItem = (apiItem: WishlistItemApiResponse): WishlistItem => ({
  id: apiItem._id,
  productId: apiItem.productId,
  name: apiItem.name,
  brand: 'Unknown',
  price: apiItem.price,
  originalPrice: undefined,
  discount: undefined,
  image: apiItem.image,
  rating: 0,
  reviewCount: 0,
  size: undefined,
  color: undefined,
  inStock: apiItem.inStock,
  dateAdded: new Date().toISOString(),
  category: 'Unknown',
  description: 'No description available',
  addedAt: new Date(),
});


const mockWishlistItems: WishlistItemApiResponse[] = [
  {
    _id: "1",
    productId: "mock1",
    name: "Mock Headphones",
    price: 999,
    image: shoes,
    inStock: true,
  },
  {
    _id: "2",
    productId: "mock2",
    name: "Mock Laptop",
    price: 45999,
    image: shoes,
    inStock: false,
  },
  {
    _id: "3",
    productId: "mock2",
    name: "Mock Laptop",
    price: 45999,
    image: shoes,
    inStock: false,
  },
  {
    _id: "4",
    productId: "mock2",
    name: "Mock Laptop",
    price: 45999,
    image: shoes,

    inStock: true,
  },
  {
    _id: "5",
    productId: "mock2",
    name: "Mock Laptop",
    price: 45999,
    image: shoes,

    inStock: true,
  },
  {
    _id: "6",
    productId: "mock2",
    name: "Mock Laptop",
    price: 45999,
    image: shoes,

    inStock: true,
  },
];

const simulateDelay = (ms: number = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));

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

  addToWishlist: async (productId: string): Promise<WishlistItem> => {
    if (USE_MOCK) {
      await simulateDelay();
      const newItem: WishlistItemApiResponse = {
        _id: `mock${mockWishlistItems.length + 1}`,
        productId,
        name: `Mock Product ${mockWishlistItems.length + 1}`,
        price: 1000,
        image: shoes,
        inStock: true,
      };
      mockWishlistItems.push(newItem);
      return mapApiItemToWishlistItem(newItem);
    }

    try {
      const response: AxiosResponse<WishlistItemApiResponse> =
        await axiosInstance.post('/wishlist/add', productId);
      return mapApiItemToWishlistItem(response.data);
    } catch {
      throw new Error('Failed to add item to wishlist');
    }
  },

  removeFromWishlist: async (itemId: string): Promise<void> => {
    if (USE_MOCK) {
      await simulateDelay();
      const index = mockWishlistItems.findIndex(item => item._id === itemId);
      if (index !== -1) {
        mockWishlistItems.splice(index, 1);
        return;
      }
      throw new Error('Item not found in mock data');
    }

    try {
      await axiosInstance.delete(`/wishlist/item/${itemId}`);
    } catch {
      throw new Error('Failed to remove item from wishlist');
    }
  },

  moveToCart: async (itemId: string): Promise<void> => {
    if (USE_MOCK) {
      await simulateDelay();
      const index = mockWishlistItems.findIndex(item => item._id === itemId);
      if (index !== -1) {
        mockWishlistItems.splice(index, 1);
        return;
      }
      throw new Error('Item not found in mock data');
    }

    try {
      await axiosInstance.post(`/cart/add/${itemId}`);
    } catch {
      throw new Error('Failed to move item to cart');
    }
  },

  updateWishlistItem: async (item: WishlistItem): Promise<WishlistItem> => {
    if (USE_MOCK) {
      await simulateDelay();
      const index = mockWishlistItems.findIndex(apiItem => apiItem._id === item.id);
      if (index !== -1) {
        const updated: WishlistItemApiResponse = {
          _id: item.id,
          productId: item.productId,
          name: item.name,
          price: item.price,
          image: item.image,
          inStock: item.inStock,
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
      };
      const response: AxiosResponse<WishlistItemApiResponse> =
        await axiosInstance.put(`/wishlist/item/${item.id}`, payload);
      return mapApiItemToWishlistItem(response.data);
    } catch {
      throw new Error('Failed to update wishlist item');
    }
  },
};