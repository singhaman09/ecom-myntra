import axios from 'axios';
import type { AxiosResponse } from 'axios'; 
import type { WishlistItem } from './types/wishlist';

const API_BASE_URL = 'https://d6ab-14-194-22-202.ngrok-free.app';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true',
    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbnRpdHlJZCI6IjY4NDljNzAzNGNhY2M5NGQ4YzZjMDZlZCIsImVtYWlsIjoia2FydGlrZXlzaHJpdmFzdGF2MDFAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJkZXZpY2VJZCI6ImQ5OGZiZDFmLTlmMjctNDAzNy1hN2JhLWE0YmE3NDViOTQwMiIsImlhdCI6MTc0OTcyMzIyNywiZXhwIjoxNzQ5ODA5NjI3fQ.ErsWHsZ7q1YjYyNsPb3eXLc_5_MvHrVzPsce8kn6rE0`
  },
});


interface WishlistApiResponse {
  _id: string;
  userId: string;
  items: {
    productId: string;
    name: string;
    price: number;
    image: string;
    _id: string;
  }[];
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
}

// Map API response to WishlistItem type
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
  inStock: true,
  dateAdded: new Date().toISOString(),
  category: 'Unknown',
  description: 'No description available',
  addedAt: new Date(),
});

export const apiService = {
  getWishlistItems: async (): Promise<WishlistItem[]> => {
  try {
    const response: AxiosResponse<WishlistApiResponse> = await axiosInstance.get('/wishlist');
    return response.data.items.map(mapApiItemToWishlistItem);
  } catch (error: any) {
    throw new Error('Failed to fetch wishlist items');
  }
},

  addToWishlist: async (item: Omit<WishlistItem, 'id' | 'dateAdded'>): Promise<WishlistItem> => {
    try {
      const payload = {
        productId: item.productId,
        name: item.name,
        price: item.price,
        image: item.image,
      };
      const response: AxiosResponse<WishlistItemApiResponse> = await axiosInstance.post('/wishlist/add', payload);
      return mapApiItemToWishlistItem(response.data);
    } catch (error) {
      throw new Error('Failed to add item to wishlist');
    }
  },

  removeFromWishlist: async (itemId: string): Promise<void> => {
    try {
      await axiosInstance.delete(`/wishlist/item/${itemId}`);
    } catch (error) {
      throw new Error('Failed to remove item from wishlist');
    }
  },

  moveToCart: async (itemId: string): Promise<void> => {
    try {
      await axiosInstance.post(`/cart/add/${itemId}`);
    } catch (error) {
      throw new Error('Failed to move item to cart');
    }
  },

  updateWishlistItem: async (item: WishlistItem): Promise<WishlistItem> => {
    try {
      const payload = {
        productId: item.productId,
        name: item.name,
        price: item.price,
        image: item.image,
      };
      const response: AxiosResponse<WishlistItemApiResponse> = await axiosInstance.put(`/wishlist/item/${item.id}`, payload);
      return mapApiItemToWishlistItem(response.data);
    } catch (error) {
      throw new Error('Failed to update wishlist item');
    }
  },
};