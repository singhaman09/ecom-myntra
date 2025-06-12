// // Import types from your existing types file
// import type { WishlistItem } from '../wishlist/types/wishlist';

// // API response interfaces matching your backend
// export interface APIWishlistItem {
//   productId: string;
//   name: string;
//   price: number;
//   image: string;
//   _id: string;
// }

// export interface APIWishlistResponse {
//   _id: string;
//   userId: string;
//   items: APIWishlistItem[];
//   createdAt: string;
//   updatedAt: string;
//   __v: number;
// }

// export interface AddToWishlistRequest {
//   productId: string;
//   name: string;
//   price: number;
//   image: string;
//   brand?: string;
//   category?: string;
//   description?: string;
//   rating?: number;
//   reviewCount?: number;
//   size?: string;
//   color?: string;
//   originalPrice?: number;
// }

// // Transform API response to match your frontend WishlistItem interface
// const transformAPIItemToWishlistItem = (apiItem: APIWishlistItem, additionalData?: Partial<WishlistItem>): WishlistItem => {
//   return {
//     id: apiItem._id,
//     productId: apiItem.productId,
//     name: apiItem.name,
//     price: apiItem.price,
//     image: apiItem.image,
//     brand: additionalData?.brand || 'Unknown Brand',
//     category: additionalData?.category || 'General',
//     description: additionalData?.description || '',
//     rating: additionalData?.rating || 0,
//     reviewCount: additionalData?.reviewCount || 0,
//     inStock: additionalData?.inStock ?? true,
//     dateAdded: new Date().toISOString(),
//     addedAt: new Date(),
//     originalPrice: additionalData?.originalPrice,
//     discount: additionalData?.discount,
//     size: additionalData?.size,
//     color: additionalData?.color,
//   };
// };

// // API configuration
// const API_BASE_URL ='https://d6ab-14-194-22-202.ngrok-free.app/wishlist';

// class WishlistAPI {
//   private async request<T>(
//     endpoint: string,
//     options: RequestInit = {}
//   ): Promise<T> {
//     const url = `${API_BASE_URL}${endpoint}`;
    
//     const config: RequestInit = {
//       headers: {
//         'Content-Type': 'application/json',
//         ...options.headers,
//       },
//       ...options,
//     };

//     // Add authentication token if available
//     const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbnRpdHlJZCI6IjY4NDljNzAzNGNhY2M5NGQ4YzZjMDZlZCIsImVtYWlsIjoia2FydGlrZXlzaHJpdmFzdGF2MDFAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJkZXZpY2VJZCI6ImQ5OGZiZDFmLTlmMjctNDAzNy1hN2JhLWE0YmE3NDViOTQwMiIsImlhdCI6MTc0OTcyMzIyNywiZXhwIjoxNzQ5ODA5NjI3fQ.ErsWHsZ7q1YjYyNsPb3eXLc_5_MvHrVzPsce8kn6rE0';
//     if (token) {
//       config.headers = {
//         ...config.headers,
//         Authorization: `Bearer ${token}`,
//       };
//     }

//     try {
//       const response = await fetch(url, config);
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
      
//       return await response.json();
//     } catch (error) {
//       console.error('API request failed:', error);
//       throw error;
//     }
//   }

//   // Get user's wishlist - returns array of WishlistItems
//   async getWishlistItems(userId?: string): Promise<WishlistItem[]> {
//     try {
//       const endpoint = userId ? `/wishlist/${userId}` : '/wishlist';
//       const response = await this.request<APIWishlistResponse>(endpoint);
      
//       // Transform API items to frontend format
//       return response.items.map(apiItem => 
//         transformAPIItemToWishlistItem(apiItem)
//       );
//     } catch (error) {
//       console.error('Failed to fetch wishlist items:', error);
//       return [];
//     }
//   }

//   // Get full wishlist response (for debugging or raw data access)
//   async getWishlist(userId?: string): Promise<APIWishlistResponse> {
//     const endpoint = userId ? `/wishlist/${userId}` : '/wishlist';
//     return this.request<APIWishlistResponse>(endpoint);
//   }

//   // Add item to wishlist
//   async addToWishlist(item: AddToWishlistRequest): Promise<WishlistItem> {
//     try {
//       const response = await this.request<APIWishlistResponse>('/wishlist', {
//         method: 'POST',
//         body: JSON.stringify({
//           productId: item.productId,
//           name: item.name,
//           price: item.price,
//           image: item.image,
//         }),
//       });
      
//       // Find the newly added item in the response
//       const addedItem = response.items.find(apiItem => apiItem.productId === item.productId);
//       if (!addedItem) {
//         throw new Error('Failed to find added item in response');
//       }
      
//       return transformAPIItemToWishlistItem(addedItem, item);
//     } catch (error) {
//       console.error('Failed to add item to wishlist:', error);
//       throw error;
//     }
//   }

//   // Remove item from wishlist by productId
//   async removeFromWishlist(productId: string): Promise<boolean> {
//     try {
//       await this.request<APIWishlistResponse>(`/wishlist/item/${productId}`, {
//         method: 'DELETE',
//       });
//       return true;
//     } catch (error) {
//       console.error('Failed to remove item from wishlist:', error);
//       throw error;
//     }
//   }

//   // Update item in wishlist
//   async updateWishlistItem(item: WishlistItem): Promise<WishlistItem> {
//     try {
//       const response = await this.request<APIWishlistResponse>(`/wishlist/item/${item.productId}`, {
//         method: 'PUT',
//         body: JSON.stringify({
//           name: item.name,
//           price: item.price,
//           image: item.image,
//         }),
//       });
      
//       const updatedItem = response.items.find(apiItem => apiItem.productId === item.productId);
//       if (!updatedItem) {
//         throw new Error('Failed to find updated item in response');
//       }
      
//       return transformAPIItemToWishlistItem(updatedItem, item);
//     } catch (error) {
//       console.error('Failed to update wishlist item:', error);
//       throw error;
//     }
//   }

//   // Clear entire wishlist
//   async clearWishlist(): Promise<{ message: string }> {
//     return this.request<{ message: string }>('/wishlist/clear', {
//       method: 'POST',
//     });
//   }

//   // Check if product is in wishlist
//   async isInWishlist(productId: string): Promise<{ isInWishlist: boolean }> {
//     try {
//       const items = await this.getWishlistItems();
//       return { isInWishlist: items.some(item => item.productId === productId) };
//     } catch (error) {
//       console.error('Failed to check if item is in wishlist:', error);
//       return { isInWishlist: false };
//     }
//   }

//   // Get wishlist item count
//   async getWishlistCount(): Promise<{ count: number }> {
//     try {
//       const items = await this.getWishlistItems();
//       return { count: items.length };
//     } catch (error) {
//       console.error('Failed to get wishlist count:', error);
//       return { count: 0 };
//     }
//   }

//   // Move item to cart (implement based on your cart API)
//   async moveToCart(productId: string): Promise<boolean> {
//     try {
//       // First, get the item details from wishlist
//       const items = await this.getWishlistItems();
//       const item = items.find(item => item.productId === productId);
      
//       if (!item) {
//         throw new Error('Item not found in wishlist');
//       }

//       // Add to cart (you'll need to implement this based on your cart API)
//       await this.request('/cart', {
//         method: 'POST',
//         body: JSON.stringify({
//           productId: item.productId,
//           name: item.name,
//           price: item.price,
//           image: item.image,
//           quantity: 1,
//         }),
//       });

//       // Remove from wishlist
//       await this.removeFromWishlist(productId);
      
//       return true;
//     } catch (error) {
//       console.error('Failed to move item to cart:', error);
//       throw error;
//     }
//   }
// }

// // Create singleton instance
// export const wishlistAPI = new WishlistAPI();

// // Export individual functions for easier imports (matching your slice usage)
// export const {
//   getWishlistItems,
//   getWishlist,
//   addToWishlist,
//   removeFromWishlist,
//   updateWishlistItem,
//   clearWishlist,
//   isInWishlist,
//   getWishlistCount,
//   moveToCart,
// } = wishlistAPI;

// // Create apiService object to match your existing slice imports
// export const apiService = {
//   getWishlistItems: wishlistAPI.getWishlistItems.bind(wishlistAPI),
//   addToWishlist: wishlistAPI.addToWishlist.bind(wishlistAPI),
//   removeFromWishlist: wishlistAPI.removeFromWishlist.bind(wishlistAPI),
//   updateWishlistItem: wishlistAPI.updateWishlistItem.bind(wishlistAPI),
//   moveToCart: wishlistAPI.moveToCart.bind(wishlistAPI),
// };

// // Hook-style functions for React components (optional)
// export const useWishlistAPI = () => {
//   return {
//     getWishlist: wishlistAPI.getWishlist.bind(wishlistAPI),
//     addToWishlist: wishlistAPI.addToWishlist.bind(wishlistAPI),
//     removeFromWishlist: wishlistAPI.removeFromWishlist.bind(wishlistAPI),
//     updateWishlistItem: wishlistAPI.updateWishlistItem.bind(wishlistAPI),
//     clearWishlist: wishlistAPI.clearWishlist.bind(wishlistAPI),
//     isInWishlist: wishlistAPI.isInWishlist.bind(wishlistAPI),
//     getWishlistCount: wishlistAPI.getWishlistCount.bind(wishlistAPI),
//   };
// };

// // Error handling utilities
// export class WishlistAPIError extends Error {
//   constructor(message: string, public statusCode?: number) {
//     super(message);
//     this.name = 'WishlistAPIError';
//   }
// }

// // Utility functions
// export const formatWishlistData = (items: WishlistItem[]) => {
//   return {
//     totalItems: items.length,
//     totalValue: items.reduce((sum, item) => sum + item.price, 0),
//     inStockItems: items.filter(item => item.inStock).length,
//     outOfStockItems: items.filter(item => !item.inStock).length,
//     categories: Array.from(new Set(items.map(item => item.category))),
//     averagePrice: items.length > 0 ? items.reduce((sum, item) => sum + item.price, 0) / items.length : 0,
//   };
// };

// // Mock data generator for development/testing
// export const generateMockWishlistItems = (): WishlistItem[] => [
//   {
//     id: '1',
//     productId: 'prod-001',
//     name: 'Cotton Casual Shirt',
//     brand: 'Roadster',
//     price: 899,
//     originalPrice: 1299,
//     discount: 31,
//     image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300&h=400&fit=crop',
//     rating: 4.2,
//     reviewCount: 1250,
//     size: 'M',
//     color: 'Blue',
//     inStock: true,
//     addedAt: new Date('2024-01-15'),
//     category: 'Men',
//     description: 'A comfortable cotton casual shirt perfect for everyday wear.',
//     dateAdded: '2024-01-15T10:00:00Z'
//   },
//   {
//     id: '2',
//     productId: 'prod-002',
//     name: 'Samsung Galaxy Smartwatch 6',
//     brand: 'Samsung',
//     price: 18999,
//     originalPrice: 24999,
//     discount: 24,
//     image: 'https://example.com/images/smartwatch.jpg',
//     rating: 4.5,
//     reviewCount: 892,
//     inStock: true,
//     addedAt: new Date('2024-01-10'),
//     category: 'Electronics',
//     description: 'Advanced smartwatch with health monitoring features.',
//     dateAdded: '2024-01-10T10:00:00Z'
//   },
// ];

// export default wishlistAPI;