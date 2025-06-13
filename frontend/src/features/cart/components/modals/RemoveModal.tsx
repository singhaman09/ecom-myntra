import React from "react";
import styles from "../Styles/CartPage.module.css";

interface RemoveModalProps {
  showRemoveModal: boolean;
  modalAction: "remove" | "wishlist" | null;
  selectedItems: string[];
  handleRemoveSelected: () => void;
  handleMoveToWishlist: (id : string) => void;
  setShowRemoveModal: React.Dispatch<React.SetStateAction<boolean>>;
  setModalAction: React.Dispatch<React.SetStateAction<"remove" | "wishlist" | null>>;
}

const RemoveModal: React.FC<RemoveModalProps> = ({
  showRemoveModal,
  modalAction,
  selectedItems,
  handleRemoveSelected,
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
          <strong>{modalAction === "remove" ? "remove" : "move"} {selectedItems.length}</strong>{" "}
          item{selectedItems.length > 1 ? "s" : ""}{" "}
          {modalAction === "remove" ? "from cart" : "to wishlist"}?
        </p>
        <div className={styles.modalActions}>
          <button
            className={styles.modalRemove}
            onClick={() => {
              if (modalAction === "remove") {
                handleRemoveSelected();
              } else {
                selectedItems.forEach((id) => handleMoveToWishlist(id));
              }
              setShowRemoveModal(false);
              setModalAction(null);
            }}
          >
            {modalAction === "remove" ? "Remove" : "Move"}
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