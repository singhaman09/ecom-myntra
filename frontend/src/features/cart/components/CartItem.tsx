// src/components/CartItem.tsx
import React from 'react';
import type { CartItem } from '../types/cart';
import styles from './styles/CartItem.module.css';
import { DISCOUNT } from '../staticData/StaticData';

interface Props {
  item: CartItem;
  onRemove: (productId: string) => void; // Updated to use productId
  onQuantityChange: (productId: string, quantity: number) => void; // Updated to use productId
}

const CartItem: React.FC<Props> = ({ item, onRemove, onQuantityChange }) => {
  return (
    <div className={styles.cartItem}>
      <div className={styles.itemImageContainer}>
        <img
          src={item.image || 'https://via.placeholder.com/150'}
          alt={item.name}
          className={styles.itemImg}
        />
      </div>
      <div className={styles.itemDetails}>
        <h4 className={styles.itemTitle}>{item.name}</h4>
        {item.desc && <p className={styles.itemDesc}>{item.desc}</p>}
        <div className={styles.priceContainer}>
          <span className={styles.itemPrice}>₹{item.price}</span>
          {DISCOUNT && (
            <>
              <span className={styles.originalPrice}>
                ₹{Math.round(item.price / (1 - DISCOUNT / 100))}
              </span>
              <span className={styles.discount}>{DISCOUNT}% OFF</span>
            </>
          )}
        </div>
        <div className={styles.controlsContainer}>
          <div className={styles.qtyControls}>
            <button
              onClick={() => onQuantityChange(item.productId, item.quantity - 1)}
              disabled={item.quantity <= 1}
              className={styles.qtyBtn}
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className={styles.qtyDisplay}>{item.quantity}</span>
            <button
              onClick={() => onQuantityChange(item.productId, item.quantity + 1)}
              className={styles.qtyBtn}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          <button
            className={styles.removeBtn}
            onClick={() => onRemove(item.productId)}
            aria-label={`Remove ${item.name} from cart`}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;