import AppRoutes from './routes/AppRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import { fetchWishlistItems } from './features/wishlist/slice/wishlistSlice';
import { useEffect } from 'react';
import { useAppDispatch } from './features/order/hooks/redux';
// import { useAppDispatch } from './store/hooks';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    // Fetch wishlist on app load
     dispatch(fetchWishlistItems());
  }, [ dispatch ]);
  return (
   <>
    <ToastContainer position="top-center"/>
    <AppRoutes/>
   </>
  );
}

export default App;
