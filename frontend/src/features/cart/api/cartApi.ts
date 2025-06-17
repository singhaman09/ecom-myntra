import axios from "axios";
import type { Cart } from "../types/cart";

const baseURL = "http://172.50.0.217:3002/api/v1/";

const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbnRpdHlJZCI6IjY4NGIyNGFmMjU2ODVmODVkMWQ0ZjJmNCIsImVtYWlsIjoic2hyaXZhc3RhdmthcnRpa2V5QGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiZGV2aWNlSWQiOiI1OTE2YzFlYS03ODA1LTQwNjgtYTllOC01MjMzZjdhOWUzNzciLCJpYXQiOjE3NDk4MDIxMTcsImV4cCI6MTc0OTg4ODUxN30.foyAr8PYL2uJCSeZELBn10jjzEmSVk-u-RBw6DHRb38";
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API METHODS

// 1.) get whole cart from backend

export const getCartAPI = async () => {
  try {
    const response = await apiClient.get<Cart>("/cart");
    return response.data.items;
  } catch (error) {

    throw error;
  }
};

// 2.) add item to cart by product id

export const addCartItemsAPI = async (productId: string) => {
  try {
    const response = await apiClient.post<Cart>("/cart/items", { productId });
    return response.data.items;
  } catch (error) {
    
    throw error;
  }
};

// 3.) remove particular item from cart by product id

export const removeCartItemAPI = async (productId: string) => {
  try {
    const response = await apiClient.delete<Cart>("/cart/items/" + productId);
    return response.data.items;
  } catch (error) {
   
    throw error;
  }
};

// 4.)  Remove Selected Items from Cart by taking ids in array (string)

export const removeSelectedCartItemsAPI = async (ids: string[]) => {
  try {
    const response = await apiClient.post<Cart>("/cart/items/delete-many", {
      ids,
    });
    return response.data.items;
  } catch (error) {
  
    throw error;
  }
};

// 5.) Update Cart items Quantity by (product id, and number)

export const updateCartItemQuantityAPI = async (
  productId: string,
  quantity: number
) => {
  try {
    const response = await apiClient.put<Cart>(`/cart/items/${productId}`, {
      quantity,
    });
    return response.data.items;
  } catch (error) {
    
    throw error;
  }
};

// 6.) move to wishlist by product id

export const moveItemToWishlistAPI = async (productId: string) => {
  try {
    const response = await apiClient.put<Cart>(
      `/cart/items/${productId}/move-to-wishlist`
    );
    return response.data.items;
  } catch (error) {
    
    throw error;
  }
};
