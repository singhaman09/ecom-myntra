// src/components/CartItem.tsx
import React, { useState } from 'react';
import type { CartItem as CartItemType } from '../types/cart';
import styles from './CartItem.module.css';
import { DISCOUNT } from '../staticData/StaticData';
import bin from '../../../assets/bin.png';
import DiscountCarousel from '../../../assets/discound_carrousel.png';
import RemoveModal from './modals/RemoveModal';
import { toast } from 'react-toastify';
import Loader from '../../product/utils/Loader';
import { CartActionType, CartModalAction } from '../types/cartEnums';

interface Props {
  item: CartItemType;
  onRemove: (productId: string) => void;
  onQuantityChange: (productId: string, action: CartActionType) => void;
  onMoveToWishlist?: (productId: string) => void;
  onSizeClick?: (item: CartItemType) => void;
  loading?: boolean;
  onSizeChange?: (id: string, newSize: string) => void;
}

const FALLBACK_IMAGE = 'https://via.placeholder.com/150';
const FALLBACK_NAME = 'Product';
const FALLBACK_DESC = 'No description available.';
const FALLBACK_SIZE = 'N/A';

const CartItem: React.FC<Props> = ({ 
  item, 
  onRemove, 
  onQuantityChange, 
  onMoveToWishlist,
  onSizeClick,
  loading = false,
  onSizeChange
}) => {
  const [hovered, setHovered] = useState(false);
  const [hoverDirection, setHoverDirection] = useState<'left' | 'right' | null>(null);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [modalAction, setModalAction] = useState<CartModalAction | null>(null);

  const handleMouseEnter = (direction: 'left' | 'right') => {
    setHovered(true);
    setHoverDirection(direction);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setHoverDirection(null);
  };

  const handleRemoveClick = () => {
    setModalAction(CartModalAction.REMOVE);
    setShowRemoveModal(true);
  };

  const handleWishlistClick = () => {
    setModalAction(CartModalAction.WISHLIST);
    setShowRemoveModal(true);
  };

  const handleConfirmAction = (id: string) => {
    if (modalAction === CartModalAction.REMOVE) {
      onRemove(id);
      toast.success(`"${item.name}" removed from cart`);
    } else if (modalAction === CartModalAction.WISHLIST && onMoveToWishlist) {
      onMoveToWishlist(id);
      toast.success(`"${item.name}" moved to wishlist`);
    }
    setShowRemoveModal(false);
    setModalAction(null);
  };

  const handleIncrement = () => {
    onQuantityChange(item.productId, CartActionType.INCREMENT);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      onQuantityChange(item.productId, CartActionType.DECREMENT);
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

  // Add a handler for size selection if onSizeChange is provided
  const handleSizeSelect = (size: string) => {
    if (onSizeChange) {
      onSizeChange(item.productId, size);
    }
    if (onSizeClick) {
      onSizeClick(null as any); // close modal if needed
    }
  };

  return (
    <>
      <div className={styles.wrapper} style={{ position: 'relative' }}>
        {loading && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(255,255,255,0.7)',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Loader isInitial={false} />
          </div>
        )}
        {/* Left slide - Wishlist */}
        <div 
          className={`${styles.slide} ${styles.slideLeft} ${hovered && hoverDirection === 'left' ? styles.showLeft : ''}`}
          onMouseEnter={() => handleMouseEnter('left')}
          onMouseLeave={handleMouseLeave}
        >
          <button className={styles.wishlistBtn} onClick={handleWishlistClick} disabled={loading}>
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
              src={item.image || FALLBACK_IMAGE}
              alt={item.name || FALLBACK_NAME}
              className={styles.image}
            />
          </div>
          <div className={styles.details}>
            <div className={styles.titleRow}>
              <h4 className={styles.title}>{item.name || FALLBACK_NAME}</h4>
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
            <p className={styles.description}>{item.description || FALLBACK_DESC}</p>
            <div className={styles.sizeRow}>
              <span className={styles.size}>
                Size: {item.size || FALLBACK_SIZE}
                {onSizeClick && (
                  <span
                    className={styles.caretIcon}
                    onClick={() => onSizeClick(item)}
                    role="button"
                    tabIndex={0}
                    aria-label="Change size"
                  >
                    {' '}▼
                  </span>
                )}
              </span>
              <div className={styles.quantity}>
                <button 
                  className={styles.qtyBtn} 
                  onClick={handleDecrement}
                  disabled={item.quantity <= 1 || loading}
                >
                  −
                </button>
                <span className={styles.qtyValue}>{typeof item.quantity === 'number' ? item.quantity : 1}</span>
                <button 
                  className={styles.qtyBtn} 
                  onClick={handleIncrement}
                  disabled={loading}
                >
                  +
                </button>
              </div>
            </div>
            <div className={styles.priceRow}>
              <span className={styles.currentPrice}>₹{typeof discountedPrice === 'number' && !isNaN(discountedPrice) ? discountedPrice.toFixed(1) : '0.0'}</span>
              <span className={styles.originalPrice}>₹{typeof item.price === 'number' && !isNaN(item.price) ? item.price.toFixed(1) : '0.0'}</span>
            </div>
          </div>
        </div>
        {/* Right slide - Remove */}
        <div 
          className={`${styles.slide} ${styles.slideRight} ${hovered && hoverDirection === 'right' ? styles.showRight : ''}`}
          onMouseEnter={() => handleMouseEnter('right')}
          onMouseLeave={handleMouseLeave}
        >
          <button className={styles.removeBtn} onClick={handleRemoveClick} disabled={loading}>
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