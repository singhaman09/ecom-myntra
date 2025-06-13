import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "../features/product/productSlice";
import ordersReducer from "../features/order/slice/orderSlice";
import cartReducer from "../features/cart/redux/cartSlice";

import wishlistReducer from "../features/wishlist/slice/wishlistSlice";

export const store = configureStore({
  reducer: {
    orders: ordersReducer,
    wishlist: wishlistReducer,
    product: ProductReducer,
    cart: cartReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
