import type { AxiosResponse } from "axios";
import type { Order, OrderStatus, OrderItem, Address } from "./types/orders";

import { ORDER } from "./types/order.enum";
import apiClient from "../../services/apiClient";
import axios from "axios";
const ORDER_URL = import.meta.env.VITE_ORDER_URL;
const USE_MOCK = true;

const API_BASE_URL = "http://172.50.0.244:3333/orders";
const token = localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
    Authorization: `Bearer ${token}`,
  },
});

interface OrderApiResponse {
  _id: string;
  userId: string;
  products: {
    productId: string;
    description: string;
    color: string;
    size: string;
    quantity: number;
    price: number;
    _id: string;
  }[];
  address: {
    name: string;
    phoneNumber: string;
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    _id: string;
  };
  totalPrice: number;
  status: string;
  paymentStatus: string;
  reviews: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  paymentUrl: string;
  sessionId: string;
}

const mapApiOrderToOrder = (apiOrder: OrderApiResponse): Order => {
  const statusMap: Record<string, OrderStatus> = {
    PENDING: "placed",
    PLACED: "placed",
    SHIPPED: "shipped",
    DELIVERED: "delivered",
    CANCELLED: "canceled",
    RETURNED: "returned",
    PICKED: "picked",
    CONFIRMED: "placed",
    IN_TRANSIT: "shipped",
  };

  return {
    id: apiOrder._id,
    customerName: apiOrder.address.name || "Unknown",
    orderDate: apiOrder.createdAt,
    deliveryDate: apiOrder.status === ORDER.CDELIVERED ? apiOrder.updatedAt : "",
    total: apiOrder.totalPrice,
    totalAmount: apiOrder.totalPrice,
    status: statusMap[apiOrder.status.toUpperCase()] ?? apiOrder.status.toLowerCase(),
    items: apiOrder.products.map(
      (product): OrderItem => ({
        id: product._id,
        name: product.description,
        brand: "Unknown",
        image: "",
        size: product.size,
        color: product.color,
        price: product.price,
        quantity: product.quantity,
        isReturnable: apiOrder.status !== ORDER.CCANCELLED && apiOrder.status !== ORDER.RETURNED,
        isExchangeable: apiOrder.status !== ORDER.CCANCELLED && apiOrder.status !== ORDER.RETURNED,
      })
    ),
    deliveryAddress: {
      id: apiOrder.address._id,
      name: apiOrder.address.name,
      addressLine1: apiOrder.address.street,
      city: apiOrder.address.city,
      state: apiOrder.address.state,
      pincode: apiOrder.address.postalCode,
      country: apiOrder.address.country,
      phoneNumber: apiOrder.address.phoneNumber,
    } as Address,
    canRate: apiOrder.reviews.length === 0 && apiOrder.status === ORDER.CDELIVERED,
    rating: 0,
    exchangeReturnWindow:
      apiOrder.status === ORDER.CDELIVERED
        ? new Date(new Date(apiOrder.updatedAt).getTime() + 7 * 24 * 60 * 60 * 1000).toISOString()
        : "",
  };
};

const simulateDelay = (ms: number = 500) => new Promise((res) => setTimeout(res, ms));

const mockOrders: Order[] = [
  {
    id: "mock1",
    customerName: "Mock User",
    orderDate: "2025-05-10",
    deliveryDate: "2025-05-15",
    status: "canceled",
    total: 1999,
    totalAmount: 1999,
    items: [
      {
        id: "item1",
        name: "Mock T-shirt",
        brand: "MockBrand",
        image: "",
        size: "M",
        color: "Red",
        price: 999,
        quantity: 2,
        isReturnable: true,
        isExchangeable: true,
      },
    ],
    deliveryAddress: {
      id: "addr1",
      name: "Mock User",
      addressLine1: "123 Test St",
      city: "Testville",
      state: "TestState",
      pincode: "123456",
      country: "Mockland",
      phoneNumber: "9999999999",
    },
    rating: 0,
    canRate: true,
    exchangeReturnWindow: "2025-05-22",
  },
  {
    id: "mock2",
    customerName: "Mock User",
    orderDate: "2025-05-10",
    deliveryDate: "2025-05-15",
    status: "shipped",
    total: 1999,
    totalAmount: 1999,
    items: [
      {
        id: "item1",
        name: "Mock T-shirt",
        brand: "MockBrand",
        image: "",
        size: "M",
        color: "Red",
        price: 999,
        quantity: 2,
        isReturnable: true,
        isExchangeable: true,
      },
    ],
    deliveryAddress: {
      id: "addr1",
      name: "Mock User",
      addressLine1: "123 Test St",
      city: "Testville",
      state: "TestState",
      pincode: "123456",
      country: "Mockland",
      phoneNumber: "9999999999",
    },
    rating: 0,
    canRate: true,
    exchangeReturnWindow: "2025-05-22",
  },
  {
    id: "mock3",
    customerName: "Mock User",
    orderDate: "2025-05-10",
    deliveryDate: "2025-05-15",
    status: "delivered",
    total: 1999,
    totalAmount: 1999,
    items: [
      {
        id: "item1",
        name: "Mock T-shirt",
        brand: "MockBrand",
        image: "",
        size: "M",
        color: "Red",
        price: 999,
        quantity: 2,
        isReturnable: true,
        isExchangeable: true,
      },
    ],
    deliveryAddress: {
      id: "addr1",
      name: "Mock User",
      addressLine1: "123 Test St",
      city: "Testville",
      state: "TestState",
      pincode: "123456",
      country: "Mockland",
      phoneNumber: "9999999999",
    },
    rating: 0,
    canRate: true,
    exchangeReturnWindow: "2025-05-22",
  },
];

export const apiService = {
  getOrders: async (): Promise<Order[]> => {
    if (USE_MOCK) {
      await simulateDelay();
      return mockOrders;
    }

    try {
      const response: AxiosResponse<OrderApiResponse[]> = await apiClient.get(`${ORDER_URL}/user`);
      return response.data.map(mapApiOrderToOrder);
    } catch {
      throw new Error("Failed to fetch orders");
    }
  },

  getOrderById: async (orderId: string): Promise<Order> => {
    if (USE_MOCK) {
      await simulateDelay();
      const order = mockOrders.find((o) => o.id === orderId);
      if (order) return order;
      throw new Error("Mock order not found");
    }

    try {
      const response: AxiosResponse<OrderApiResponse> = await apiClient.get(`${ORDER_URL}/${orderId}`);
      return mapApiOrderToOrder(response.data);
    } catch {
      throw new Error("Failed to fetch order details");
    }
  },

  updateOrderStatus: async (orderId: string, status: OrderStatus): Promise<Order> => {
    if (USE_MOCK) {
      await simulateDelay();
      const order = mockOrders.find((o) => o.id === orderId);
      if (order) {
        order.status = status;
        return order;
      }
      throw new Error("Mock order not found");
    }

    try {
      const statusMap: Record<OrderStatus, string> = {
        delivered: "DELIVERED",
        Pending: "PENDING",
        shipped: "SHIPPED",
        canceled: "CANCELLED",
        placed: "PLACED",
        returned: "RETURNED",
        picked: "PICKED",
      };

      const response: AxiosResponse<{ data: OrderApiResponse }> = await apiClient.patch(`${ORDER_URL}/orders/${orderId}`, {
        status: statusMap[status],
      });

      return mapApiOrderToOrder(response.data.data);
    } catch {
      throw new Error("Failed to update order status");
    }
  },

  cancelOrder: async (orderId: string): Promise<Order> => {
  if (USE_MOCK) {
    await simulateDelay();
    const order = mockOrders.find((o) => o.id === orderId);
    if (order) {
      order.status = "canceled";
      return order;
    }
    throw new Error("Mock order not found");
  }

  try {
    await apiClient.post(`${ORDER_URL}/${orderId}/cancel`, {});
    const updatedOrder = await apiService.getOrderById(orderId);
    return updatedOrder;
  } catch (error) {
    throw new Error("Failed to cancel order");
  }
},


  submitRating: async (orderId: string, rating: number): Promise<{ success: boolean }> => {
    if (USE_MOCK) {
      await simulateDelay();
      return { success: true };
    }

    try {
      const response: AxiosResponse<{ success: boolean }> = await apiClient.post(`${ORDER_URL}/orders/${orderId}/review`, {
        rating,
      });
      return { success: response.data.success };
    } catch {
      throw new Error("Failed to submit rating");
    }
  },
};
