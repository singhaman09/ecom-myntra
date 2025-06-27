import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../order/hooks/redux';
import {
  fetchWishlistItems,
  removeFromWishlist,
  moveToCart,
} from '../slice/wishlistSlice';
import WishlistCard from './WishlistCard';
import Button from '../../../components/UI/Button';
import styles from '../css/wishlistList.module.css';

const WishlistList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(fetchWishlistItems());
  }, [dispatch]);

  const handleRemoveFromWishlist = async (itemId: string) => {
    await dispatch(removeFromWishlist(itemId));
  };

  const handleMoveToCart = async (itemId: string) => {
    await dispatch(moveToCart(itemId));
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Loading wishlist...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>Error: {error}</p>
        <Button onClick={() => dispatch(fetchWishlistItems())} variant="primary">
          Retry
        </Button>
      </div>
    );
  }

  const totalItems = items.length;

  return (
    <div className={styles.wishlistList}>
      <div className={styles.listHeader}>
        <div className={styles.listInfo}>
          <p>{totalItems} item{totalItems !== 1 && 's'} in your wishlist</p>
        </div>
      </div>

      {items.length === 0 ? (
        <div className={styles.emptyWishlist}>
          <div className={styles.emptyIcon}>♡</div>
          <h3>Your wishlist is empty</h3>
          <p>Start adding items you love to keep track of them!</p>
          <Button variant="primary">Continue Shopping</Button>
        </div>
      ) : (
        <div className={styles.itemsGrid}>
          {items.map((item) => (
            <WishlistCard
              key={item.id}
              item={item}
              onRemove={() => handleRemoveFromWishlist(item.productId)}
              onMoveToCart={() => handleMoveToCart(item.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default  React.memo(WishlistList);
