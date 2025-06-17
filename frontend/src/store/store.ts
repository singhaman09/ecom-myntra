import {configureStore } from '@reduxjs/toolkit';
import ProductReducer from '../features/product/productSlice'
import ordersReducer from '../features/order/slice/orderSlice';
import wishlistReducer from '../features/wishlist/slice/wishlistSlice';
import authReducer from '../features/auth/authSlice'; 
import cartReducer from "../features/cart/redux/cartSlice"



export const store = configureStore({
  reducer: {
    orders: ordersReducer,
    wishlist: wishlistReducer,
    product:ProductReducer,
    auth: authReducer,
    cart : cartReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
