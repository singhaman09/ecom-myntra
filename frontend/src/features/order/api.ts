// import type { WishlistItem } from '../wishlist/types/wishlist';
// import type { Order, OrderStatus } from '../order/types/orders';


// const API_BASE_URL = 'https://d6ab-14-194-22-202.ngrok-free.app/wishlist'; // Replace with your actual API base URL

// async function handleResponse(response: Response) {
//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(errorData.message || 'API Error');
//   }
//   return response.json();
// }

// export const apiService = {
//   // Wishlist APIs
//   async getWishlistItems(): Promise<WishlistItem[]> {
//     const response = await fetch(`${API_BASE_URL}/wishlist`);
//     return handleResponse(response);
//   },

//   async addToWishlist(item: Omit<WishlistItem, 'id' | 'dateAdded'>): Promise<WishlistItem> {
//     const response = await fetch(`${API_BASE_URL}/wishlist`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(item),
//     });
//     return handleResponse(response);
//   },

//   async removeFromWishlist(itemId: string): Promise<void> {
//     const response = await fetch(`${API_BASE_URL}/wishlist/${itemId}`, {
//       method: 'DELETE',
//     });
//     return handleResponse(response);
//   },

//   async updateWishlistItem(item: WishlistItem): Promise<WishlistItem> {
//     const response = await fetch(`${API_BASE_URL}/wishlist/${item.id}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(item),
//     });
//     return handleResponse(response);
//   },

//   async moveToCart(itemId: string): Promise<void> {
//     const response = await fetch(`${API_BASE_URL}/wishlist/${itemId}/move-to-cart`, {
//       method: 'POST',
//     });
//     return handleResponse(response);
//   },

//   // Orders APIs
//   async getOrders(): Promise<Order[]> {
//     const response = await fetch(`${API_BASE_URL}/orders`);
//     return handleResponse(response);
//   },

//   async updateOrderStatus(orderId: string, status: OrderStatus): Promise<{ data: Order }> {
//     const response = await fetch(`${API_BASE_URL}/orders/${orderId}/status`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ status }),
//     });
//     return handleResponse(response);
//   },

//   async cancelOrder(orderId: string): Promise<void> {
//     const response = await fetch(`${API_BASE_URL}/orders/${orderId}/cancel`, {
//       method: 'POST',
//     });
//     return handleResponse(response);
//   },

//   async submitRating(orderId: string, rating: number): Promise<{ success: boolean }> {
//   const response = await fetch(`${API_BASE_URL}/orders/${orderId}/rating`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ rating }),
//   });
//   return handleResponse(response);
// }

// };
// export type ApiService = typeof apiService;



import type { WishlistItem } from '../wishlist/types/wishlist';
import type { Order, OrderStatus } from '../order/types/orders';

const API_BASE_URL = 'https://your.api.endpoint';

async function handleResponse(response: Response) {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'API Error');
  }
  return response.json();
}

export const apiService = {
  // Wishlist APIs
 async getWishlistItems(): Promise<WishlistItem[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 'wish1',
          productId: 'prod1',
          name: 'Smartphone',
          brand: 'Samsung',
          price: 29999,
          dateAdded: '2025-06-01T10:00:00Z',
          image: '../../assets/cam.jpg',
          rating: 4.5,
          reviewCount: 150,
          inStock: true,
          description: 'Latest smartphone with advanced features',
          category: 'Electronics',
          addedAt: new Date('2025-06-01T10:00:00Z'), // addedAt field
          // removed quantity
        },
        {
          id: 'wish2',
          productId: 'prod2',
          name: 'Analog Watch',
          brand: 'Fossil',
          price: 4999,
          dateAdded: '2025-06-03T10:00:00Z',
          image: '../../assets/cam.jpg',
          rating: 4.2,
          reviewCount: 89,
          inStock: true,
          description: 'Classic analog watch',
          category: 'Watches',
          addedAt: new Date('2025-06-01T10:00:00Z'), // addedAt field

        },
        {
          id: 'wish3',
          productId: 'prod3',
          name: 'Running Shoes',
          brand: 'Adidas',
          price: 2999,
          dateAdded: '2025-06-05T10:00:00Z',
          image: '../../assets/cam.jpg',
          rating: 4.5,
          reviewCount: 120,
          inStock: true,
          description: 'Comfortable running shoes',
          category: 'Footwear',
                    addedAt: new Date('2025-06-01T10:00:00Z'), // addedAt field

        },
      ]);
    }, 500);
  });
},


  async addToWishlist(item: Omit<WishlistItem, 'id' | 'dateAdded'>): Promise<WishlistItem> {
    return {
      id: 'wish-mock-id',
      dateAdded: new Date().toISOString(),
      ...item,
    };
  },

  async removeFromWishlist(itemId: string): Promise<void> {
    return;
  },

  async updateWishlistItem(item: WishlistItem): Promise<WishlistItem> {
    return item;
  },

  async moveToCart(itemId: string): Promise<void> {
    return;
  },

  // Orders APIs
  async getOrders(): Promise<Order[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 'order1',
          customerName: 'Aman Singh',
          orderDate: '2025-06-08T10:00:00Z',
          total: 1200,
          totalAmount: 1200,
          status: 'pending',
          deliveryDate: '2025-06-12T00:00:00Z',
          canRate: true,
          rating: 0,
          exchangeReturnWindow: '2025-06-20T00:00:00Z',
          trackingInfo: {
            courier: 'Delhivery',
            trackingId: 'TRK12345',
          },
          items: [
            {
              id: 'item1',
              name: 'White Sneakers',
              brand: 'Nike',
              price: 1200,
              quantity: 1,
              size: '10',
              color: 'White',
              image: 'https://via.placeholder.com/100',
            },
          ],
        },
        {
          id: 'order2',
          customerName: 'Ravi Verma',
          orderDate: '2025-06-05T14:00:00Z',
          total: 750,
          totalAmount: 750,
          status: 'processing',
          deliveryDate: '2025-06-11T00:00:00Z',
          canRate: false,
          rating: 4,
          exchangeReturnWindow: '2025-06-18T00:00:00Z',
          trackingInfo: {
            courier: 'Bluedart',
            trackingId: 'BD234567',
          },
          items: [
            {
              id: 'item2',
              name: 'Casual Shirt',
              brand: 'Levis',
              price: 750,
              quantity: 1,
              size: 'L',
              color: 'Blue',
              image: 'https://via.placeholder.com/100',
            },
          ],
        },
      ]);
    }, 800);
  });
}
,

  async updateOrderStatus(orderId: string, status: OrderStatus): Promise<{ data: Order }> {
    return {
  data: {
    id: orderId,
    customerName: 'Mock User',
    orderDate: new Date().toISOString(),
    total: 1000,
    totalAmount: 1000,
    status,
    deliveryDate: new Date().toISOString(),
    canRate: false,
    rating: 0,
    exchangeReturnWindow: new Date().toISOString(),
    trackingInfo: {
      courier: 'MockCourier',
      trackingId: 'MOCK123',
    },
    items: [],
  },
};

  },

  async cancelOrder(orderId: string): Promise<void> {
    return;
  },

  async submitRating(orderId: string, rating: number): Promise<{ success: boolean }> {
    return { success: true };
  },
};

export type ApiService = typeof apiService;
