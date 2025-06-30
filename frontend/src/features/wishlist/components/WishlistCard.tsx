import React, { useState } from 'react';
import type { WishlistItem } from '../types/wishlist';
import Button from '../../../components/UI/Button';
import StarRating from '../../../components/UI/StarRating';
import styles from '../css/wishlistCard.module.css';
import { useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { removeFromWishlist } from '../slice/wishlistSlice';
import { useAppDispatch } from '../../order/hooks/redux';
interface WishlistCardProps {
  item: WishlistItem;
  onRemove: () => Promise<void>;
  onMoveToCart: () => Promise<void>;
}

const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
}> = ({ isOpen, onClose, onConfirm, itemName }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3>Remove Item</h3>
        <p>Are you sure you want to remove <strong>{itemName}</strong> from your wishlist?</p>
        <div className={styles.modalActions}>
          <Button onClick={onConfirm}
          variant="danger">
            Remove
          </Button>
          <Button onClick={onClose}
          variant="secondary">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

const WishlistCard: React.FC<WishlistCardProps> = ({
  item,
  onRemove,
  onMoveToCart,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(!item.image);
  const [rating, setRating] = useState(item.rating || 3);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMoveToCart = async () => {
    setIsLoading(true);
    try {
      await onMoveToCart();
      navigate('/cart');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmRemove = async () => {
    setIsLoading(true);
    try {
      await onRemove();
      setIsModalOpen(false);
      await dispatch(removeFromWishlist(item.id));
    } finally {
      setIsLoading(false);
    }
  };

  const handleNotifyMe = () => {
    alert(`We'll notify you when "${item.name}" is back in stock.`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const truncateDescription = (description: string, maxLength = 100) =>
    description.length <= maxLength
      ? description
      : `${description.slice(0, maxLength)}...`;

  const discountPercentage =
    item.originalPrice && item.originalPrice > item.price
      ? Math.round(
          ((item.originalPrice - item.price) / item.originalPrice) * 100
        )
      : 0;

  return (
    <>
      <div
        className={`${styles.wishlistCard} ${
          !item.inStock ? styles.outOfStock : ''
        }`}
      >
        <div className={styles.imageContainer}>
          {!imageError ? (
            <img
              src={item.image}
              alt={item.name}
              className={styles.itemImage}
              onError={() => setImageError(true)}
              loading="lazy"
            />
          ) : (
            <div className={styles.imagePlaceholder}>No Image</div>
          )}

          {/* {discountPercentage > 0 && (
            <div className={styles.discountBadge}>{discountPercentage}% OFF</div>
          )} */}

          {!item.inStock && (
            <div className={styles.outOfStockOverlay}>
              <span>Out of Stock</span>
            </div>
          )}

          <button
            className={styles.removeButton}
            onClick={handleRemoveClick}
            title="Remove from wishlist"
            aria-label="Remove from wishlist"
            disabled={isLoading}
          >
            <FaHeart color="rgb(7, 119, 4)" size={20} />
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
            <StarRating rating={rating} onRatingChange={setRating} />
            {/* <span className={styles.ratingText}>({item.reviewCount})</span> */}
          </div>

          <p className={styles.itemDescription}>
            {truncateDescription(item.description)}
          </p>

          <div className={styles.priceSection}>
            <div className={styles.priceContainer}>
              <span className={styles.currentPrice}>
                ${(item.price / 100).toFixed(2)}
              </span>
              {item.originalPrice && item.originalPrice > item.price && (
                <span className={styles.originalPrice}>
                  ${(item.originalPrice / 100).toFixed(2)}
                </span>
              )}
            </div>
            {discountPercentage > 0 && (
              <span className={styles.savings}>
                Save ${((item.originalPrice! - item.price) / 100).toFixed(2)}
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

          {item.variants && item.variants.length > 0 && (
            <div className={styles.variantsSection}>
              <h4>Available Variants</h4>
              <ul>
                {item.variants.map((variant) => (
                  <li key={variant._id}>
                    Size: {variant.size}, Color: {variant.color}, Stock: {variant.stock}
                  </li>
                ))}
              </ul>
              <p>Total Stock: {item.totalStock}</p>
            </div>
          )}

          <div className={styles.cardActions}>
            {item.inStock ? (
              <Button
                onClick={handleMoveToCart}
                variant="primary"
                disabled={isLoading}
                className={styles.addToCartButton}
              >
                {isLoading ? 'Adding...' : 'Add to Cart'}
              </Button>
            ) : (
              <Button
                onClick={handleNotifyMe}
                variant="primary"
                disabled={isLoading}
                className={styles.notifyButton}
              >
                Notify Me
              </Button>
            )}
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmRemove}
        itemName={item.name}
      />
    </>
  );
};

export default  React.memo(WishlistCard);