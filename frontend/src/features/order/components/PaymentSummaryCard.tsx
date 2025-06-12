import React from 'react';
import type { Order } from '../types/orders';
import styles from '../../../components/shared/css/paymentsummarycard.module.css';

interface PaymentSummaryCardProps {
  order: Order;
}

const PaymentSummaryCard: React.FC<PaymentSummaryCardProps> = ({ order }) => {
  return (
    <div className={styles.paymentSummaryCard}>
      <h2 className={styles.sectionTitle}>Payment Summary</h2>
      <div className={styles.summary}>
        <div className={styles.summaryRow}>
          <span>Subtotal:</span>
          <span>₹{order.totalAmount.toLocaleString()}</span>
        </div>
        {order.discount && (
          <div className={styles.summaryRow}>
            <span>Discount:</span>
            <span>-₹{order.discount.toLocaleString()}</span>
          </div>
        )}
        {order.deliveryCharges && (
          <div className={styles.summaryRow}>
            <span>Delivery Charges:</span>
            <span>₹{order.deliveryCharges.toLocaleString()}</span>
          </div>
        )}
        <div className={styles.summaryRow}>
          <span className={styles.totalLabel}>Total:</span>
          <span className={styles.totalValue}>₹{order.total.toLocaleString()}</span>
        </div>
      </div>
      {order.paymentMethod && (
        <div className={styles.paymentInfo}>
          <div>Payment Method: {order.paymentMethod.type.toUpperCase()}</div>
          {order.paymentMethod.provider && (
            <div>Provider: {order.paymentMethod.provider}</div>
          )}
          {order.paymentMethod.last4Digits && (
            <div>Card Ending: **** {order.paymentMethod.last4Digits}</div>
          )}
          {order.paymentMethod.transactionId && (
            <div>Transaction ID: {order.paymentMethod.transactionId}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default PaymentSummaryCard;