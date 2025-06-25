import AppRoutes from './routes/AppRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import { fetchWishlistItems } from './features/wishlist/slice/wishlistSlice';
import { useEffect } from 'react';
import { useAppDispatch } from './features/order/hooks/redux';
import { useLenisScroll } from './features/home/hooks/useLenisScroll';
// import { useAppDispatch } from './store/hooks';

function App() {
  useLenisScroll();
  const dispatch = useAppDispatch();
  useEffect(() => {
    // Fetch wishlist on app load
     dispatch(fetchWishlistItems());
  }, [ dispatch ]);
  return (
   <>
    <ToastContainer position="top-right" autoClose={3000} />
    <AppRoutes/>
   </>
  );
}

export default App;
