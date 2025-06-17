import React, { useState } from "react";
import type { WishlistItem } from "../types/wishlist";
import Button from "../../../components/UI/Button";
import StarRating from "../../../components/UI/StarRating";
import styles from "../css/wishlistCard.module.css";
import { useNavigate } from "react-router-dom";
import { FaHeart } from 'react-icons/fa'; // solid heart icon

interface WishlistCardProps {
  item: WishlistItem;
  onRemove: () => void;
  onMoveToCart: () => void;
}

const WishlistCard: React.FC<WishlistCardProps> = ({
  item,
  onRemove,
  onMoveToCart,
}) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  const [rating, setRating] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [isLiked] = useState(true); // assuming it's already in wishlist

  const handleMoveToCart = async () => {
    setIsLoading(true);
    try {
      await onMoveToCart();
      navigate("/cart");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNotifyMe = () => {
    // Placeholder for notify me functionality
    // console.log(`Notify me when ${item.name} is back in stock`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const truncateDescription = (
    description: string,
    maxLength: number = 100
  ) => {
    if (description.length <= maxLength) return description;
    return `${description.substring(0, maxLength)}...`;
  };

  const getDiscountPercentage = () => {
    if (item.originalPrice && item.originalPrice > item.price) {
      return Math.round(
        ((item.originalPrice - item.price) / item.originalPrice) * 100
      );
    }
    return 0;
  };

  const discountPercentage = getDiscountPercentage();

  return (
    <div
      className={`${styles.wishlistCard} ${
        !item.inStock ? styles.outOfStock : ""
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
          onClick={() => {
            onRemove();
          }}
          title="Remove from wishlist"
          aria-label="Remove from wishlist"
        >
          <FaHeart
            color={isLiked ? "#00a65a" : "#d1d1d1"} // greenish if liked, grey if not
            size={20}
          />
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
          <span className={styles.ratingText}>({item.rating})</span>
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
            {item.inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        <div className={styles.cardActions}>
          {item.inStock ? (
            <Button
              onClick={handleMoveToCart}
              variant="primary"
              disabled={isLoading}
              className={styles.addToCartButton}
            >
              {isLoading ? "Adding..." : "Add to Cart"}
            </Button>
          ) : (
            <Button
              onClick={handleNotifyMe}
              variant="primary"
              disabled={isLoading}
              className={styles.NotifyToCartButton}
            >
              Notify Me
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;