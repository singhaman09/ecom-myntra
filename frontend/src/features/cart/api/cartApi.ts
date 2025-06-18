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
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbnRpdHlJZCI6IjY4NGIyNGFmMjU2ODVmODVkMWQ0ZjJmNCIsImVtYWlsIjoic2hyaXZhc3RhdmthcnRpa2V5QGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiZGV2aWNlSWQiOiI2MjNlOWI3MC05MmE1LTRiMDAtODhjMC1hZDU1YTU1OWMxZGQiLCJpYXQiOjE3NTAyMjk1ODIsImV4cCI6MTc1MDMxNTk4Mn0.6YRi4xXVRvSydLlkLCwmV57wYLv80wEn2gfIqoeTqrw";
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
    console.log(response.data);
    return response.data.items;
  } catch (error) {
    throw error;
  }
};

// 2.) add item to cart by product id

export const addCartItemsAPI = async (productId: string) => {
  try {
    const response = await apiClient.post<Cart>(`/cart/${productId}`);
    return response.data.items;
  } catch (error) {
    throw error;
  }
};

// 3.) remove particular item from cart by product id

export const removeCartItemAPI = async (productId: string) => {
  try {
    const response = await apiClient.delete<Cart>(`/cart/${productId}`);
    return response.data.items;
  } catch (error) {
    throw error;
  }
};

//4.)  Update size of selected item by (id and newsize)

export const updateCartItemSizeAPI = async (
  productId: string,
  newSize: string
) => {
  try {
    const res = await apiClient.put<Cart>(`/cart/${productId}/${newSize}`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

// 5.) Increment cart item quantity
export const incrementCartItemQuantityAPI = async (
  productId: string,
) => {
  try {
    const response = await apiClient.post<Cart>(`/cart/${productId}`);
    return response.data.items;
  } catch (error) {
    throw error;
  }
};

// 6.)  Decrement cart item quantity
export const decrementCartItemQuantityAPI = async (
  productId: string,
) => {
  try {
   
    const response = await apiClient.put<Cart>(`/cart/${productId}`);
    return response.data.items;
  } catch (error) {
    throw error;
  }
};

// 7.) move to wishlist by product id

export const moveItemToWishlistAPI = async (productId: string) => {
  try {
    const response = await apiClient.put<Cart>(
      `/cart/${productId}/move-to-wishlist`
    );
    return response.data.items;
  } catch (error) {
    throw error;
  }
};
