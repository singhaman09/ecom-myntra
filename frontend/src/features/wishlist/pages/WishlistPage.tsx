import React from 'react';
import { useAppSelector } from '../../order/hooks/redux';
// import WishlistFilters from '../components/WishlistFilters';
import WishlistList from '../components/WishlistList';
// import Button from '../../../components/UI/Button';
import styles from '../css/wishlistPage.module.css';
// import Layout from '../../../components/shared/Layout';
// import Sidebar from '../../order/components/Sidebar';

const WishlistPage: React.FC = () => {
  const { items, loading } = useAppSelector((state) => state.wishlist);

  const handleContinueShopping = () => {
    window.location.href = '/products';
  };

  const handleClearWishlist = () => {
    if (
      window.confirm(
        'Are you sure you want to clear your entire wishlist? This action cannot be undone.'
      )
    ) {
      //error handling if needed
    }
  };

  return (
   
    <div className={styles.wishlistPage}>
      
      <div className={styles.pageHeader}>
        <div className={styles.headerContent}>
          <h1>My Wishlist</h1>
          <p className={styles.pageDescription}>
            Keep track of items you love and want to purchase later
          </p>
        </div>
{/* 
        <div className={styles.button}>
          <Button onClick={handleContinueShopping} variant="secondary">
            Continue Shopping
          </Button>

          {items.length > 0 && (
            <Button onClick={handleClearWishlist} variant="danger">
              Clear Wishlist
            </Button>
          )}
        </div> */}
      </div>

      <div className={styles.pageContent}>
        
        {/* <aside className={styles.sidebar}>
          {/* <WishlistFilters /> 
          <Sidebar isVisible={true} onClose={() => {}}/>
        </aside>  */}

        <main className={styles.mainContent}>
          <WishlistList />
        </main>
      </div>
    </div>
  );
};

export default WishlistPage;