import React from "react";
import { FaTag } from "react-icons/fa";
import styles from "../styles/CouponModal.module.css";
import type { Coupon } from "../../types/cart";

interface CouponModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyCoupon: (coupon: Coupon) => void;
  availableCoupons: Coupon[];
}

const CouponModal: React.FC<CouponModalProps> = ({
  isOpen,
  onClose,
  onApplyCoupon,
  availableCoupons,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose} role="presentation">
      <div
        className={styles.modalContent}
        role="dialog"
        aria-labelledby="coupon-modal-title"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <div className={styles.modalHeader}>
          <h2 id="coupon-modal-title" className={styles.modalTitle}>
            Available Coupons
          </h2>
          <button
            className={styles.modalClose}
            onClick={onClose}
            aria-label="Close coupon modal"
          >
            ✕
          </button>
        </div>
        {availableCoupons.length === 0 ? (
          <p className={styles.noCoupons}>No available coupons at this time.</p>
        ) : (
          <div className={styles.couponList}>
            {availableCoupons.map((coupon, index) => (
              <div
                key={coupon.code}
                className={`${styles.couponItem} ${
                  index < availableCoupons.length - 1 ? styles.couponBorder : ""
                }`}
              >
                <div className={styles.couponWrapper}>
                  <div className={styles.couponIcon}>
                    <FaTag aria-hidden="true" />
                  </div>
                  <div className={styles.couponDetails}>
                    <div className={styles.couponHeader}>
                      <button
                        className={styles.couponCode}
                        onClick={() => {
                          onApplyCoupon(coupon);
                          onClose();
                        }}
                        aria-label={`Apply coupon ${coupon.code}`}
                      >
                        {coupon.code}
                      </button>
                      <button
                        className={styles.applyCouponButton}
                        onClick={() => {
                          onApplyCoupon(coupon);
                          onClose();
                        }}
                      >
                        Apply
                      </button>
                    </div>
                    <p className={styles.couponDescription}>
                      {coupon.description}
                    </p>
                    <div className={styles.couponMeta}>
                      <span className={styles.couponDiscount}>
                        Save ₹{coupon.discount}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className={styles.modalActions}>
          <button className={styles.closeButton} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CouponModal;
