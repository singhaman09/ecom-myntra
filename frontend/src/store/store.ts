import {configureStore } from '@reduxjs/toolkit';
import ordersReducer from '../features/order/slice/orderSlice';
import wishlistReducer from '../features/wishlist/slice/wishlistSlice';
const store = configureStore({
  reducer: {
     orders: ordersReducer,
    wishlist: wishlistReducer,
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;