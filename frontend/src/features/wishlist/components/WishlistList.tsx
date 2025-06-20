import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../order/hooks/redux';
import {
  fetchWishlistItems,
  removeFromWishlist,
  moveToCart,
  setCurrentPage,
  setItemsPerPage,
} from '../slice/wishlistSlice';
import WishlistCard from './WishlistCard';
import Button from '../../../components/UI/Button';
import styles from '../css/wishlistList.module.css';

const WishlistList: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    filteredItems,
    loading,
    error,
    currentPage,
    itemsPerPage,
    totalItems,
  } = useAppSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(fetchWishlistItems());
    console.log("fetch item")
  }, [dispatch]);

  const handleRemoveFromWishlist = async (itemId: string) => {
    await dispatch(removeFromWishlist(itemId));
  };

  const handleMoveToCart = async (itemId: string) => {
    await dispatch(moveToCart(itemId));
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const handleItemsPerPageChange = (items: number) => {
    dispatch(setItemsPerPage(items));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = filteredItems.slice(startIndex, endIndex);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

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

  return (
    <div className={styles.wishlistList}>
      <div className={styles.listHeader}>
        <div className={styles.listInfo}>
          <p>{totalItems} items in your wishlist</p>
        </div>
      </div>

      {paginatedItems.length === 0 ? (
        <div className={styles.emptyWishlist}>
          <div className={styles.emptyIcon}>♡</div>
          <h3>Your wishlist is empty</h3>
          <p>Start adding items you love to keep track of them!</p>
          <Button variant="primary">Continue Shopping</Button>
        </div>
      ) : (
        <>
          <div className={styles.itemsGrid}>
            {paginatedItems.map((item) => (
              <WishlistCard
                key={item.id}
                item={item}
                onRemove={() => handleRemoveFromWishlist(item.productId)}
                onMoveToCart={() => handleMoveToCart(item.id)}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className={styles.pagination}>
              <Button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                variant="secondary"
                size="small"
              >
                Previous
              </Button>

              <div className={styles.pageNumbers}>
                {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => {
                  const pageNum = Math.max(
                    1,
                    Math.min(
                      totalPages - 9,
                      currentPage - 4
                    )
                  ) + i;
                  if (pageNum > totalPages) return null;

                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`${styles.pageButton} ${
                        pageNum === currentPage ? styles.active : ''
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <Button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                variant="secondary"
                size="small"
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default WishlistList;
