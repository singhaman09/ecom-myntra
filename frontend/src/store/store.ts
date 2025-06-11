import {configureStore } from '@reduxjs/toolkit';
import ProductReducer from '../features/product/productSlice'


const store = configureStore({
  reducer: {
    product:ProductReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;