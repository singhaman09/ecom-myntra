import {configureStore } from '@reduxjs/toolkit';
import ordersReducer from './slices/orderSlice';
import wishlistReducer from './slices/wishlistSlice';
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