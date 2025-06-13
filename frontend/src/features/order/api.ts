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
