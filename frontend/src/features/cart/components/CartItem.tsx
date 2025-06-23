// src/components/CartItem.tsx
import React, { useState } from 'react';
import type { CartItem as CartItemType } from '../types/cart';
import styles from './CartItem.module.css';
import { DISCOUNT } from '../staticData/StaticData';
import bin from '../../../assets/bin.png';
import DiscountCarousel from '../../../assets/discound_carrousel.png';
import RemoveModal from './modals/RemoveModal';
import { toast } from 'react-toastify';

interface Props {
  item: CartItemType;
  onRemove: (productId: string) => void;
  onQuantityChange: (productId: string, action: "increment" | "decrement") => void;
  onMoveToWishlist?: (productId: string) => void;
}

const CartItem: React.FC<Props> = ({ 
  item, 
  onRemove, 
  onQuantityChange, 
  onMoveToWishlist 
}) => {
  const [hovered, setHovered] = useState(false);
  const [hoverDirection, setHoverDirection] = useState<'left' | 'right' | null>(null);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [modalAction, setModalAction] = useState<"remove" | "wishlist" | null>(null);

  const handleMouseEnter = (direction: 'left' | 'right') => {
    setHovered(true);
    setHoverDirection(direction);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setHoverDirection(null);
  };

  const handleRemoveClick = () => {
    setModalAction("remove");
    setShowRemoveModal(true);
  };

  const handleWishlistClick = () => {
    setModalAction("wishlist");
    setShowRemoveModal(true);
  };

  const handleConfirmAction = (id: string) => {
    if (modalAction === "remove") {
      onRemove(id);
      toast.success(`"${item.name}" removed from cart`);
    } else if (modalAction === "wishlist" && onMoveToWishlist) {
      onMoveToWishlist(id);
      toast.success(`"${item.name}" moved to wishlist`);
    }
    setShowRemoveModal(false);
    setModalAction(null);
  };

  const handleIncrement = () => {
    onQuantityChange(item.productId, "increment");
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      onQuantityChange(item.productId, "decrement");
    }
  };

  const discountedPrice = item.price - Math.floor((item.price * DISCOUNT) / 100);

  // Determine which shift class to apply based on hover direction
  const getShiftClass = () => {
    if (!hovered) return '';
    if (hoverDirection === 'left') return styles.shift; // Shift right when hovering left
    if (hoverDirection === 'right') return styles.shiftLeft; // Shift left when hovering right
    return '';
  };

  return (
    <>
      <div className={styles.wrapper}>
        {/* Left slide - Wishlist */}
        <div 
          className={`${styles.slide} ${styles.slideLeft} ${hovered && hoverDirection === 'left' ? styles.showLeft : ''}`}
          onMouseEnter={() => handleMouseEnter('left')}
          onMouseLeave={handleMouseLeave}
        >
          <button className={styles.wishlistBtn} onClick={handleWishlistClick}>
            <span className={styles.heartIcon}>♡</span>
            <span className={styles.btnText}>Wishlist</span>
          </button>
        </div>

        {/* Main item content */}
        <div 
          className={`${styles.item} ${getShiftClass()}`}
          onMouseLeave={handleMouseLeave}
        >
          <div className={styles.imageContainer}>
            <img
              src={item.image || 'https://via.placeholder.com/150'}
              alt={item.name}
              className={styles.image}
            />
          </div>
          
          <div className={styles.details}>
            <div className={styles.titleRow}>
              <h4 className={styles.title}>{item.name}</h4>
              <div className={styles.discountBadge}>
                <img
                  src={DiscountCarousel}
                  alt="Discount"
                  className={styles.discountCarousel}
                />
                <span className={styles.discountText}>
                  <span className={styles.discountPercent}>{DISCOUNT}%</span>
                  <span className={styles.discountOff}>OFF</span>
                </span>
              </div>
            </div>
            <p className={styles.description}>{item.description}</p>
            
            <div className={styles.sizeRow}>
              <span className={styles.size}>Size: {item.size}</span>
              <div className={styles.quantity}>
                <button 
                  className={styles.qtyBtn} 
                  onClick={handleDecrement}
                  disabled={item.quantity <= 1}
                >
                  −
                </button>
                <span className={styles.qtyValue}>{item.quantity}</span>
                <button 
                  className={styles.qtyBtn} 
                  onClick={handleIncrement}
                >
                  +
                </button>
              </div>
            </div>
            
            <div className={styles.priceRow}>
              <span className={styles.currentPrice}>₹{discountedPrice.toFixed(2)}</span>
              <span className={styles.originalPrice}>₹{item.price}</span>
              <span className={styles.discount}>{DISCOUNT}% OFF</span>
            </div>
          </div>
        </div>

        {/* Right slide - Remove */}
        <div 
          className={`${styles.slide} ${styles.slideRight} ${hovered && hoverDirection === 'right' ? styles.showRight : ''}`}
          onMouseEnter={() => handleMouseEnter('right')}
          onMouseLeave={handleMouseLeave}
        >
          <button className={styles.removeBtn} onClick={handleRemoveClick}>
            <img src={bin} alt="Remove" className={styles.binIcon} />
            <span className={styles.btnText}>Remove</span>
          </button>
        </div>

        {/* Invisible hover areas */}
        <div
          className={styles.hoverAreaLeft}
          onMouseEnter={() => handleMouseEnter('left')}
          onMouseLeave={handleMouseLeave}
        />
        <div
          className={styles.hoverAreaRight}
          onMouseEnter={() => handleMouseEnter('right')}
          onMouseLeave={handleMouseLeave}
        />
      </div>

      {/* Remove/Wishlist Confirmation Modal */}
      <RemoveModal
        showRemoveModal={showRemoveModal}
        modalAction={modalAction}
        selectedItems={[item.productId]}
        handleMoveToWishlist={handleConfirmAction}
        setShowRemoveModal={setShowRemoveModal}
        setModalAction={setModalAction}
      />
    </>
  );
};

export default CartItem;