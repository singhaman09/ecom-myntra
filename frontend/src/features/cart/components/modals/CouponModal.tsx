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
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>AVAILABLE COUPONS</h2>
          <button className={styles.modalClose} onClick={onClose}>
            ✕
          </button>
        </div>
        {availableCoupons.length === 0 ? (
          <p className={styles.noCoupons}>No available coupons at this time.</p>
        ) : (
          <div className={styles.couponList}>
            {availableCoupons.map((coupon) => (
              <div key={coupon.code} className={styles.couponItem}>
                <div className={styles.wrapitems}>
                  <div className={styles.couponIcon}>
                    <FaTag />
                  </div>
                  <div className={styles.couponDetails}>
                    <div className={styles.couponHeader}>
                      <span className={styles.couponCode}>{coupon.code}</span>
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
                  </div>
                </div>
                <p className={styles.couponDescription}>{coupon.description}</p>
                <div className={styles.couponMeta}>
                  <span className={styles.couponDiscount}>
                    Save ₹{coupon.discount}
                  </span>
                  <span className={styles.couponExpires}>
                    Valid till {coupon.expires}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className={styles.modalActions}>
          <button className={styles.closeButton} onClick={onClose}>
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
};

export default CouponModal;
