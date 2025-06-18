import React, { useState } from "react";
import type { CartItem } from "../types/cart";
import { updateItemSize } from "../redux/cartSlice";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { DISCOUNT } from "../staticData/StaticData";
import styles from "./styles/CartList.module.css";

interface CartListProps {
  items: CartItem[];
  onQuantityChange: (id: string, qty: number) => void;
  onSelect: (id: string, selected: boolean) => void;
  selectedItems: string[];
  onRemove: (id: string) => void;
}

const CartList: React.FC<CartListProps> = ({
  items,
  onQuantityChange,
  onSelect,
  selectedItems,
  onRemove,
}) => {
  const dispatch = useAppDispatch();

  const [sizeModalItem, setSizeModalItem] = useState<CartItem | null>(null);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [modalAction, setModalAction] = useState<"remove" | "wishlist" | null>(null);
  const [itemToRemove, setItemToRemove] = useState<string | null>(null);

  const openSizeModal = (item: CartItem) => setSizeModalItem(item);
  const closeSizeModal = () => setSizeModalItem(null);

  const handleSizeChange = async (itemId: string, newSize: string) => {
    try {
      await dispatch(updateItemSize({ id: itemId, newSize })).unwrap();
    } catch (error) {
      console.error("Failed to update size:", error);
      alert("Error updating size. Please try again.");
    }
    closeSizeModal();
  };

  return (
    <div className={styles.cartList}>
      {items.length === 0 ? (
        <p className={styles.emptyCart}>Your cart is empty.</p>
      ) : (
        items.map((item) => (
          <div key={item.productId} className={styles.cartItem}>
            <button
              className={styles.removeBtn}
              onClick={() => {
                setItemToRemove(item.productId);
                setModalAction("remove");
                setShowRemoveModal(true);
              }}
            >
              ✕
            </button>

            <div className={styles.imageWrapper}>
              <button
                className={`${styles.heartBtn} ${
                  selectedItems.includes(item.productId) ? styles.filled : ""
                }`}
                onClick={() =>
                  onSelect(item.productId, !selectedItems.includes(item.productId))
                }
                aria-label="Toggle Wishlist"
              >
                ❤
              </button>
              <img
                src={item.image}
                alt={item.name}
                className={styles.itemImage}
              />
            </div>

            <div className={styles.itemDetails}>
              <h3 className={styles.itemName}>{item.name}</h3>
              <p className={styles.itemDesc}>{item.desc}</p>

              <div className={styles.optionsRow}>
                <span
                  className={styles.itemSize}
                  onClick={() => openSizeModal(item)}
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                >
                  Size: {item.size} ▾
                </span>

                {/* Qty Controls */}
                <div className={styles.qtyControls}>
                  <button
                    className={styles.qtyBtn}
                    onClick={() =>
                      item.quantity > 1 &&
                      onQuantityChange(item.productId, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1}
                  >
                    −
                  </button>
                  <span className={styles.qtyValue}>{item.quantity}</span>
                  <button
                    className={styles.qtyBtn}
                    onClick={() =>
                      onQuantityChange(item.productId, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
              </div>

              <div className={styles.priceRow}>
                <span className={styles.currentPrice}>
                  ₹{item.price - Math.floor((item.price * DISCOUNT) / 100)}
                </span>
                <span className={styles.originalPrice}>₹{item.price}</span>
                <span className={styles.discount}>{DISCOUNT}% OFF</span>
              </div>

              <p className={styles.deliveryInfo}>
                ✅ Delivery by <strong>Tomorrow</strong>
              </p>
            </div>
          </div>
        ))
      )}

      {/* Remove Modal */}
      {showRemoveModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.removeModal}>
            <h3 className={styles.modalTitle}>
              {modalAction === "remove" ? "Remove Items" : "Move to Wishlist"}
            </h3>
            <p className={styles.modalMessage}>
              Are you sure you want to {modalAction} the selected items?
            </p>
            <div className={styles.modalActions}>
              <button
                className={styles.confirmBtn}
                onClick={() => {
                  if (modalAction === "remove" && itemToRemove) {
                    onRemove(itemToRemove);
                  }
                  setShowRemoveModal(false);
                  setItemToRemove(null);
                }}
              >
                Yes, {modalAction}
              </button>
              <button
                className={styles.cancelBtn}
                onClick={() => setShowRemoveModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Size Modal */}
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
                <h3 className={styles.modalBrand}>{sizeModalItem.brand}</h3>
                <p className={styles.modalName}>{sizeModalItem.name}</p>
                <div className={styles.priceBlock}>
                  <span className={styles.modalCurrentPrice}>
                    ₹{sizeModalItem.price - DISCOUNT}
                  </span>
                  <span className={styles.modalOriginalPrice}>
                    ₹{sizeModalItem.price}
                  </span>
                  <span className={styles.modalDiscount}>
                    {Math.round((DISCOUNT / sizeModalItem.price) * 100)}% OFF
                  </span>
                </div>
                <p className={styles.seller}>
                  Seller: {sizeModalItem.brand} India Pvt Ltd
                </p>
              </div>
            </div>
            <div className={styles.modalBottom}>
              <p className={styles.sizeLabel}>Select Size</p>
              <div className={styles.sizeOptions}>
                {(sizeModalItem.availableSizes || ["S", "M", "L", "XL", "XXL"]).map(
                  (size) => (
                    <button
                      key={size}
                      className={`${styles.sizeCircle} ${
                        size === sizeModalItem.size ? styles.activeSize : ""
                      }`}
                      onClick={() =>
                        handleSizeChange(sizeModalItem.productId, size)
                      }
                    >
                      {size}
                    </button>
                  )
                )}
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
