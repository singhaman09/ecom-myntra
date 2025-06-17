// src/components/CartSummary.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles/CartSummary.module.css';

interface CartSummaryProps {
  totalItems: number;
  totalPrice: number;
  totalMRP: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({ totalItems, totalPrice, totalMRP }) => {
  if (totalItems === 0) return null;

  const platformFee = 20; 
  const discount = totalMRP - totalPrice;
  const finalTotal = totalPrice + platformFee;
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    navigate("/checkout/address");  
  }

  return (
    <div className={styles.cartSummary}>
      <h3 className={styles.summaryTitle}>Price Details ({totalItems} {totalItems === 1 ? 'item' : 'items'})</h3>
      <div className={styles.priceItem}>
        <span>Total MRP</span>
        <span>₹{totalMRP}</span>
      </div>
      <div className={styles.priceItem}>
        <span>
          Discount on MRP <a href="#" className={styles.knowMore}>Know More</a>
        </span>
        <span className={styles.discount}>-₹{discount}</span>
      </div>
      <div className={styles.priceItem}>
        <span>
          Coupon Discount <a href="#" className={styles.applyCoupon}>Apply Coupon</a>
        </span>
        <span>₹0</span>
      </div>
      <div className={styles.priceItem}>
        <span>
          Platform Fee <a href="#" className={styles.knowMore}>Know More</a>
        </span>
        <span>₹{platformFee}</span>
      </div>
      <div className={styles.priceItem}>
        <span>
          Shipping Fee <a href="#" className={styles.knowMore}>Know More</a>
        </span>
        <span className={styles.free}>Free</span>
      </div>
      <div className={styles.total}>
        <span className={styles.totalLabel}>Total Amount</span>
        <span className={styles.totalPrice}>₹{finalTotal}</span>
      </div>
      <button
        className={styles.checkoutButton}
        onClick={handlePlaceOrder}
      >
        Place Order
      </button>
    </div>
  );
};

export default CartSummary;