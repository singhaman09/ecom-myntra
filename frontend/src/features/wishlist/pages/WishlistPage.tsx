// components/Wishlist/WishlistPage.tsx
import React from 'react';
import { useAppSelector } from '../../order/hooks/redux';
import WishlistFilters from '../components/WishlistFilters';
import WishlistList from '../components/WishlistList';
import Button from '../../../components/UI/Button';
import styles from '../../../components/shared/css/wishlistPage.module.css';

const WishlistPage: React.FC = () => {
  const { items, loading } = useAppSelector((state) => state.wishlist);

  const handleContinueShopping = () => {
    // Navigate to products page
    window.location.href = '/products';
  };

  const handleClearWishlist = () => {
    if (window.confirm('Are you sure you want to clear your entire wishlist? This action cannot be undone.')) {
      // Implement clear all functionality
      console.log('Clear wishlist');
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
        
        <div className={styles.headerActions}>
          <Button 
            onClick={handleContinueShopping}
            variant="secondary"
          >
            Continue Shopping
          </Button>
          
          {items.length > 0 && (
            <Button 
              onClick={handleClearWishlist}
              variant="danger"
            >
              Clear Wishlist
            </Button>
          )}
        </div>
      </div>

      <div className={styles.pageContent}>
        <aside className={styles.sidebar}>
          <WishlistFilters />
        </aside>
        
        <main className={styles.mainContent}>
          <WishlistList />
        </main>
      </div>

      {!loading && items.length === 0 && (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h2>Your wishlist is waiting</h2>
          <p>Start adding items you love to keep track of them and purchase them later.</p>
          <Button onClick={handleContinueShopping} variant="primary" size="large">
            Start Shopping
          </Button>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;