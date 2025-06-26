import axios from "axios";
import type { AxiosResponse } from "axios";
import type { Order, OrderStatus, OrderItem, Address } from "./types/orders";

const API_BASE_URL = "http://172.50.3.140:3333/orders";
const token = localStorage.getItem('auth_token')
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

interface OrderApiUpdateResponse {
  data: OrderApiResponse;
  success: boolean;
  message?: string;
}

const mapApiOrderToOrder = (apiOrder: OrderApiResponse): Order => {
  // Normalize status to match OrderStatus and OrderTrackingCard
  const statusMap: Record<string, OrderStatus> = {
    PENDING: "Pending",
    PROCESSING: "processing",
    SHIPPED: "shipped",
    DELIVERED: "delivered",
    CANCELLED: "cancelled",
    RETURNED: "returned",
  };

  return {
    id: apiOrder._id,
    customerName: apiOrder.address.name || "Unknown", // Use address name as fallback
    orderDate: apiOrder.createdAt,
    deliveryDate: apiOrder.status === "DELIVERED" ? apiOrder.updatedAt : "", // Only set if delivered
    total: apiOrder.totalPrice,
    totalAmount: apiOrder.totalPrice,
    status: statusMap[apiOrder.status.toUpperCase()] || "Pending",
    items: apiOrder.products.map(
      (product): OrderItem => ({
        id: product._id,
        name: product.description,
        brand: "Unknown", // TODO: Fetch from product API if available
        image: "", // TODO: Fetch from product API or use placeholder
        size: product.size,
        color: product.color,
        price: product.price,
        quantity: product.quantity,
        isReturnable: apiOrder.status !== "CANCELLED" && apiOrder.status !== "RETURNED",
        isExchangeable: apiOrder.status !== "CANCELLED" && apiOrder.status !== "RETURNED",
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
    canRate: apiOrder.reviews.length === 0 && apiOrder.status === "DELIVERED",
    rating: 0, // TODO: Fetch from reviews if available
    exchangeReturnWindow:
      apiOrder.status === "DELIVERED"
        ? new Date(new Date(apiOrder.updatedAt).getTime() + 7 * 24 * 60 * 60 * 1000).toISOString()
        : "", // 7-day window after delivery
    // trackingInfo: undefined, // TODO: Fetch from tracking API if available
    // paymentMethod: undefined, // TODO: Derive from paymentUrl/sessionId if possible
  };
};

export const apiService = {
  getOrders: async (): Promise<Order[]> => {
    try {
      const response: AxiosResponse<OrderApiResponse[]> = await axiosInstance.get("/user");
      return response.data.map(mapApiOrderToOrder);
    } catch (error) {
      throw new Error("Failed to fetch orders");
    }
  },

  getOrderById: async (orderId: string): Promise<Order> => {
    try {
      const response: AxiosResponse<OrderApiResponse> = await axiosInstance.get(`/${orderId}`);
      return mapApiOrderToOrder(response.data);
    } catch (error) {
      throw new Error("Failed to fetch order details");
    }
  },

  updateOrderStatus: async (orderId: string, status: OrderStatus): Promise<Order> => {
    try {
      const statusMap: Record<OrderStatus, string> = {
        delivered: "DELIVERED",
        Pending: "PENDING",
        shipped: "SHIPPED",
        cancelled: "CANCELLED",
        processing: "PROCESSING",
        returned: "RETURNED",
      };

      const response: AxiosResponse<OrderApiUpdateResponse> = await axiosInstance.patch(`/orders/${orderId}`, {
        status: statusMap[status],
      });
      return mapApiOrderToOrder(response.data.data);
    } catch (error) {
      throw new Error("Failed to update order status");
    }
  },

  cancelOrder: async (orderId: string): Promise<void> => {
    try {
      await axiosInstance.patch(`/orders/${orderId}`, { status: "CANCELLED" });
    } catch (error) {
      throw new Error("Failed to cancel order");
    }
  },

  submitRating: async (orderId: string, rating: number): Promise<{ success: boolean }> => {
    try {
      const response: AxiosResponse<{ success: boolean; message?: string }> = await axiosInstance.post(
        `/orders/${orderId}/review`,
        { rating }
      );
      return { success: response.data.success };
    } catch (error) {
      throw new Error("Failed to submit rating");
    }
  },
};