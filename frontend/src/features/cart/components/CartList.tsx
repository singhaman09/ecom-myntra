import React, { useState } from "react";
import type { CartItem } from "../types/cart";
import styles from "./styles/CartList.module.css";

interface CartListProps {
  items: CartItem[];
  onQuantityChange: (id: string, qty: number) => void;
  onSelect: (id: string, selected: boolean) => void;
  selectedItems: string[];
  onRemove: (id: string) => void;
  onSizeChange?: (id: string, size: string) => void;
}

const CartList: React.FC<CartListProps> = ({
  items,
  onQuantityChange,
  onSelect,
  selectedItems,
  onRemove,
  onSizeChange,
}) => {
  const [sizeModalItem, setSizeModalItem] = useState<CartItem | null>(null);
  const [qtyModalItem, setQtyModalItem] = useState<CartItem | null>(null);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [modalAction, setModalAction] = useState<"remove" | "wishlist" | null>(
    null
  );

  const openSizeModal = (item: CartItem) => {
    setSizeModalItem(item);
  };

  const closeSizeModal = () => {
    setSizeModalItem(null);
  };

  const handleSizeChange = (itemId: string, newSize: string) => {
    onSizeChange?.(itemId, newSize);
    closeSizeModal();
  };

  const openQtyModal = (item: CartItem) => {
    setQtyModalItem(item);
  };

  const closeQtyModal = () => {
    setQtyModalItem(null);
  };

  const handleQtyChange = (itemId: string, newQty: number) => {
    onQuantityChange(itemId, newQty);
    closeQtyModal();
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
                setShowRemoveModal(true);
                setModalAction("remove");
              }}
            >
              ✕
            </button>

            <div className={styles.imageWrapper}>
              <input
                type="checkbox"
                checked={selectedItems.includes(item.productId)}
                onChange={(e) => onSelect(item.productId, e.target.checked)}
                className={styles.itemCheckbox}
              />
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

                <span
                  className={styles.itemQty}
                  onClick={() => openQtyModal(item)}
                  style={{
                    cursor: "pointer",
                    textDecoration: "underline",
                    marginLeft: 20,
                  }}
                >
                  Qty: {item.quantity} ▾
                </span>
              </div>

              <div className={styles.priceRow}>
                <span className={styles.currentPrice}>
                  ₹{item.price - item.discount}
                </span>
                <span className={styles.originalPrice}>₹{item.price}</span>
                <span className={styles.discount}>
                  {Math.round((item.discount / item.price) * 100)}% OFF
                </span>
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
                  if (modalAction === "remove") {
                    selectedItems.forEach((id) => onRemove(id));
                  } else {
                    // Handle move to wishlist logic here
                    alert('move to wishlist');
                  }
                  setShowRemoveModal(false);
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
                    ₹{sizeModalItem.price - sizeModalItem.discount}
                  </span>
                  <span className={styles.modalOriginalPrice}>
                    ₹{sizeModalItem.price}
                  </span>
                  <span className={styles.modalDiscount}>
                    {Math.round(
                      (sizeModalItem.discount / sizeModalItem.price) * 100
                    )}
                    % OFF
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
                {["S", "M", "L", "XL", "XXL"].map((size) => (
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
                ))}
              </div>
            </div>

            <button className={styles.doneBtn} onClick={closeSizeModal}>
              DONE
            </button>
          </div>
        </div>
      )}

      {/* Qty Modal */}
      {qtyModalItem && (
        <div className={styles.modalOverlay}>
          <div className={styles.customModal}>
            <button className={styles.closeModal} onClick={closeQtyModal}>
              ✕
            </button>
            <div className={styles.modalBottom}>
              <p className={styles.sizeLabel}>Select Quantity</p>
              <div className={styles.sizeOptions}>
                {[...Array(10)].map((_, i) => {
                  const qty = i + 1;
                  return (
                    <button
                      key={qty}
                      className={`${styles.sizeCircle} ${
                        qty === qtyModalItem.quantity ? styles.activeSize : ""
                      }`}
                      onClick={() =>
                        handleQtyChange(qtyModalItem.productId, qty)
                      }
                    >
                      {qty}
                    </button>
                  );
                })}
              </div>
            </div>

            <button className={styles.doneBtn} onClick={closeQtyModal}>
              DONE
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartList;
