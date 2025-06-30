import axios from "axios";
import type { Cart } from "../types/cart";
import { getToken } from "../../auth/utils/tokenUtils";

const CART_API_BASE_URL = import.meta.env.VITE_CART_API_URL;

const apiClient = axios.create({
  baseURL: CART_API_BASE_URL,  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});



export const getCartAPI = async () => {
  try {
    const response = await apiClient.get<Cart>("/cart");
    return response.data.items;
  } catch (error) {
    throw error;
  }
};


export const addCartItemsAPI = async (productId: string,size:string,color:string ) => {
  try {
    const response = await apiClient.post<Cart>(`/cart/${productId}?size=${size}&color=${color}`);
    return response.data.items;
  } catch (error) {
    throw error;
  }
};



export const removeCartItemAPI = async (cartId: string) => {
  try {
    const response = await apiClient.delete<Cart>(`/cart/${cartId}`);
    return response.data.items;
  } catch (error) {
    throw error;
  }
};



export const updateCartItemSizeAPI = async (
  productId: string,
  newSize: string
) => {
  try {
    const res = await apiClient.put<Cart>(`/cart/${productId}/size`, { size: newSize });
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
    const response = await apiClient.put<Cart>(`/cart/${productId}/increment`);
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
   
    const response = await apiClient.put<Cart>(`/cart/${productId}/decrement`);
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
