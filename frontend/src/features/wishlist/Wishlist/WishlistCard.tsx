import React, { useState } from 'react';
import type { WishlistItem } from '../../../types/wishlist';
import Button from '../../../components/UI/Button';
import StarRating from '../../../components/UI/StarRating';
import styles from '../../../components/shared/css/wishlistCard.module.css';

interface WishlistCardProps {
  item: WishlistItem;
  onRemove: () => void;
  onMoveToCart: () => void;
}

const WishlistCard: React.FC<WishlistCardProps> = ({ item, onRemove, onMoveToCart }) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleMoveToCart = async () => {
    setIsLoading(true);
    try {
      await onMoveToCart();
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const truncateDescription = (description: string, maxLength: number = 100) => {
    if (description.length <= maxLength) return description;
    return `${description.substring(0, maxLength)}...`;
  };

  const getDiscountPercentage = () => {
    if (item.originalPrice && item.originalPrice > item.price) {
      return Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100);
    }
    return 0;
  };

  const discountPercentage = getDiscountPercentage();

  return (
    <div className={`${styles.wishlistCard} ${!item.inStock ? styles.outOfStock : ''}`}>
      <div className={styles.imageContainer}>
        {!imageError ? (
          <img
            src={item.imageUrl}
            alt={item.name}
            className={styles.itemImage}
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <div className={styles.imagePlaceholder}>
            <span>No Image Available</span>
          </div>
        )}

        {discountPercentage > 0 && (
          <div className={styles.discountBadge}>{discountPercentage}% OFF</div>
        )}

        {!item.inStock && (
          <div className={styles.outOfStockOverlay}>
            <span>Out of Stock</span>
          </div>
        )}

        <button
          className={styles.removeButton}
          onClick={onRemove}
          title="Remove from wishlist"
          aria-label="Remove from wishlist"
        >
          ×
        </button>
      </div>

      <div className={styles.itemContent}>
        <div className={styles.itemHeader}>
          <h3 className={styles.itemName} title={item.name}>
            {item.name}
          </h3>
          <span className={styles.category}>{item.category}</span>
        </div>

        <div className={styles.itemRating}>
          <StarRating rating={item.rating} readonly />
          <span className={styles.ratingText}>({item.rating})</span>
        </div>

        <p className={styles.itemDescription}>
          {truncateDescription(item.description)}
        </p>

        <div className={styles.priceSection}>
          <div className={styles.priceContainer}>
            <span className={styles.currentPrice}>${item.price.toFixed(2)}</span>
            {item.originalPrice && item.originalPrice > item.price && (
              <span className={styles.originalPrice}>
                ${item.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          {discountPercentage > 0 && (
            <span className={styles.savings}>
              Save ${(item.originalPrice! - item.price).toFixed(2)}
            </span>
          )}
        </div>

        <div className={styles.itemMeta}>
          <span className={styles.dateAdded}>
            Added {formatDate(item.dateAdded)}
          </span>
          <span
            className={`${styles.stockStatus} ${
              item.inStock ? styles.inStock : styles.outOfStock
            }`}
          >
            {item.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>

        <div className={styles.cardActions}>
          <Button
            onClick={handleMoveToCart}
            variant="primary"
            disabled={!item.inStock || isLoading}
            className={styles.addToCartButton}
          >
            {isLoading ? 'Adding...' : 'Add to Cart'}
          </Button>

          <Button
            onClick={onRemove}
            variant="secondary"
            size="small"
            className={styles.removeFromWishlistButton}
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;