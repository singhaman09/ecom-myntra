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
import DiscountCarousel from '../../../assets/discound_carrousel.png';
import { DISCOUNT } from '../staticData/StaticData';

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
            onSizeClick={openSizeModal}
          />
        ))
      )}

      {sizeModalItem && (
        <div className={styles.modalOverlay}>
          <div className={styles.customModal}>
            <button className={styles.closeModal} onClick={closeSizeModal}>
              ✕
            </button>
            <div className={styles.modalContentCentered}>
              <div className={styles.nameDiscountRowCentered}>
                <span className={styles.modalName}>{sizeModalItem.name}</span>
                <span className={styles.discountCarouselWrapper}>
                  <img src={DiscountCarousel} alt="Discount" className={styles.discountCarouselImgTop} />
                  <span className={styles.discountPercentOnCarousel}>{DISCOUNT}% OFF</span>
                </span>
              </div>
              <img
                src={sizeModalItem.image}
                alt={sizeModalItem.name}
                className={styles.modalImageCentered}
              />
              <div className={styles.priceDiscountBlock}>
                <span className={styles.modalCurrentPrice}>
                  ₹{(sizeModalItem.price - Math.floor((sizeModalItem.price * DISCOUNT) / 100)).toFixed(2)}
                </span>
                <span className={styles.modalOriginalPrice}>
                  ₹{sizeModalItem.price}
                </span>
                {/* <span className={styles.discountPercent}>{DISCOUNT}% OFF</span> */}
              </div>
              <div className={styles.sizeSelectBlockCentered}>
                <p className={styles.sizeLabel}>Select Size</p>
                <div className={styles.sizeOptionsCentered}>
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