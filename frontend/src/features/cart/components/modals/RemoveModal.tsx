import React from "react";
import styles from "../styles/CartPage.module.css";
import { CartModalAction } from "../../types/cartEnums";

interface RemoveModalProps {
  showRemoveModal: boolean;
  modalAction: CartModalAction | null;
  selectedItems: string[];
  handleMoveToWishlist: (id: string) => void;
  setShowRemoveModal: React.Dispatch<React.SetStateAction<boolean>>;
  setModalAction: React.Dispatch<React.SetStateAction<CartModalAction | null>>;
}

const RemoveModal: React.FC<RemoveModalProps> = ({
  showRemoveModal,
  modalAction,
  selectedItems,
  handleMoveToWishlist,
  setShowRemoveModal,
  setModalAction,
}) => {
  if (!showRemoveModal) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <p>
          Are you sure you want to{" "}
          <strong>
            {modalAction === CartModalAction.REMOVE ? "remove" : "move"}{" "}
            {selectedItems.length}
          </strong>{" "}
          item{selectedItems.length > 1 ? "s" : ""}{" "}
          {modalAction === CartModalAction.REMOVE ? "from cart" : "to wishlist"}?
        </p>
        <div className={styles.modalActions}>
          <button
            className={styles.modalRemove}
            onClick={() => {
              selectedItems.forEach((id) => handleMoveToWishlist(id));

              setShowRemoveModal(false);
              setModalAction(null);
            }}
          >
            {modalAction === CartModalAction.REMOVE ? "Remove" : "Move"}
          </button>
          <span className={styles.modalDivider}></span>
          <button
            className={styles.modalWishlist}
            onClick={() => {
              setShowRemoveModal(false);
              setModalAction(null);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveModal;
