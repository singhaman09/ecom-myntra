import React from "react";
import styles from "./Styles/CartActions.module.css";
// import  {deleteSelectedItems} from "../redux/cartSlice";
// import { useAppDispatch } from "../hooks/useAppDispatch";

interface CartActionsProps {
  items: { productId: string }[];
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
  setModalAction: React.Dispatch<React.SetStateAction<"remove" | "wishlist" | null>>;
  setShowRemoveModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartActions: React.FC<CartActionsProps> = ({
  items,
  selectedItems,
  setSelectedItems,
  setModalAction,
  setShowRemoveModal,
}) => {
  return (
    <div className={styles.cartListSection}>
      <div className={styles.itemsHeader}>
        <label className={styles.selectAllWrapper}>
          <input
            type="checkbox"
            checked={selectedItems.length === items.length && items.length > 0}
            onChange={(e) => {
              if (e.target.checked) {
                setSelectedItems(items.map((item) => item.productId));
              } else {
                setSelectedItems([]);
              }
            }}
            className={styles.selectAllCheckbox}
          />
          <strong className={styles.selectAllText}>
            {selectedItems.length}/{items.length} ITEMS SELECTED
          </strong>
          <span className={styles.moveButtons}>
            <button
              className={styles.removeSelectedButton}
              onClick={() => {
                if (selectedItems.length > 0) {
                  setModalAction("remove");
                  setShowRemoveModal(true);
                } else {
                  alert("Please select items to remove.");
                }
              }}
            >
              REMOVE
            </button>
            <span className={styles.verticalDivider}></span>
            <button
              className={styles.moveSelectedButton}
              onClick={() => {
                if (selectedItems.length > 0) {
                  setModalAction("wishlist");
                  setShowRemoveModal(true);
                } else {
                  alert("Please select items to move to wishlist.");
                }
              }}
            >
              MOVE TO WISHLIST
            </button>
          </span>
        </label>
      </div>
    </div>
  );
};

export default CartActions;