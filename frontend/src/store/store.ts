import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/profile/redux/slices/userSlice';
import addressReducer from '../features/profile/redux/slices/addressSlice';
import changePasswordReducer from '../features/profile/redux/slices/changePasswordSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    address: addressReducer,
    changePassword: changePasswordReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: true }),
});



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;







