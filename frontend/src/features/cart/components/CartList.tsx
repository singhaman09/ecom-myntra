import React, { useState } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import {
  updateItemSize,
  incrementItemQuantity,
  decrementItemQuantity,
} from "../redux/cartSlice";
import type { CartItem as CartItemType } from "../types/cart";
import CartItem from "./CartItem";
import styles from "./styles/CartList.module.css";
import { toast } from 'react-toastify';

interface CartListProps {
  items: CartItemType[];
  onQuantityChange?: (id: string, action: "increment" | "decrement") => void;
  onRemove: (id: string) => void;
  onMoveToWishlist?: (id: string) => void;
}

const CartList: React.FC<CartListProps> = ({
  items,
  onQuantityChange,
  onRemove,
  onMoveToWishlist,
}) => {
  const dispatch = useAppDispatch();

  const [sizeModalItem, setSizeModalItem] = useState<CartItemType | null>(null);

  const openSizeModal = (item: CartItemType) => setSizeModalItem(item);
  const closeSizeModal = () => setSizeModalItem(null);

  const handleSizeChange = async (itemId: string, newSize: string) => {
    try {
      await dispatch(updateItemSize({ id: itemId, newSize })).unwrap();
    } catch {
      toast.error("Error updating size. Please try again.");
    }
    closeSizeModal();
  };

  const handleQuantityChange = (productId: string, action: "increment" | "decrement") => {
    onQuantityChange?.(productId, action);
  };

  return (
    <div className={styles.cartList}>
      {items.length === 0 ? (
        <p className={styles.emptyCart}>Your cart is empty.</p>
      ) : (
        items.map((item) => (
          <CartItem
            key={item.productId}
            item={item}
            onRemove={onRemove}
            onQuantityChange={handleQuantityChange}
            onMoveToWishlist={onMoveToWishlist}
          />
        ))
      )}

      {sizeModalItem && (
        <div className={styles.modalOverlay}>
          <div className={styles.customModal}>
            <button className={styles.closeModal} onClick={closeSizeModal}>
              ✕
            </button>
            <div className={styles.modalTop}>
              <img
                src={sizeModalItem.image}
                alt={sizeModalItem.name}
                className={styles.modalImage}
              />
              <div className={styles.modalInfo}>
                <div className={styles.nameDiscountRow}>
                  <p className={styles.modalName}>{sizeModalItem.name}</p>
                </div>
                <div className={styles.priceBlock}>
                  <span className={styles.modalCurrentPrice}>
                    ₹{(sizeModalItem.price - Math.floor((sizeModalItem.price * 20) / 100)).toFixed(2)}
                  </span>
                  <span className={styles.modalOriginalPrice}>
                    ₹{sizeModalItem.price}
                  </span>
                </div>
                <div className={styles.sizeSelectBlock}>
                  <p className={styles.sizeLabel}>Select Size</p>
                  <div className={styles.sizeOptions}>
                    {(sizeModalItem.availableSizes || ["S", "M", "L", "XL", "XXL"]).map((size) => (
                      <button
                        key={size}
                        className={`${styles.sizeCircle} ${size === sizeModalItem.size ? styles.activeSize : ""}`}
                        onClick={() => handleSizeChange(sizeModalItem.productId, size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <button className={styles.doneBtn} onClick={closeSizeModal}>
              DONE
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartList;