import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/profile/redux/slices/userSlice';
import addressReducer from '../features/profile/redux/slices/addressSlice';
import changePasswordReducer from '../features/profile/redux/slices/changePasswordSlice';
import ProductReducer from '../features/product/productSlice'
import ordersReducer from '../features/order/slice/orderSlice';
import wishlistReducer from '../features/wishlist/slice/wishlistSlice';
 const store = configureStore({
  reducer: {
    user: userReducer,
    address: addressReducer,
    changePassword: changePasswordReducer,
    orders: ordersReducer,
    wishlist: wishlistReducer,
    product:ProductReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: true }),
});



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export default store;