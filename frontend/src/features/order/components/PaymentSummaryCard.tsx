import React from 'react';
import type { Order } from '../types/orders';
import styles from '../css/paymentsummarycard.module.css';
import icon1 from '../../../assets/summaryicon/Search Icon.jpg';
import icon2 from '../../../assets/summaryicon/Vector.png';
import icon3 from '../../../assets/summaryicon/Location Icon.png';
import icon4 from '../../../assets/summaryicon/Vector (1).png';
interface PaymentSummaryCardProps {
  order: Order;
}
const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

const PaymentSummaryCard: React.FC<PaymentSummaryCardProps> = ({ order }) => {
  return (
    <div className={styles.paymentSummaryContainer}>
      <div className={styles.orderSummaryCard}>
      <h2 className={styles.sectionTitle}>Order Summary</h2>
  <div className={styles.orderMeta}>
    <div className={styles.field}><img src={icon1} alt="User Icon" /><p>Aman Singh</p></div>
  <div className={styles.field}> <img src={icon2} alt="User Icon" />
  <p>+91 96 96 507451</p></div>
  
  
        {order.deliveryDate && (
          <div className={styles.field} ><img src={icon4} alt="User Icon" /> {formatDate(order.deliveryDate)}</div>
        )}
        {order.deliveryAddress && (
          <div className={`${styles.address} ${styles.field}`}>
            <img src={icon3} alt="User Icon" />
            {order.deliveryAddress.name},{" "}
            {order.deliveryAddress.addressLine1}, {order.deliveryAddress.city},{" "}
            {order.deliveryAddress.state} - {order.deliveryAddress.pincode}
          </div>
        )}
      </div>
      </div>
    <div className={styles.paymentSummaryCard}>
      
      <h2 className={styles.sectionTitle}>Payment Summary</h2>
      <div className={styles.summary}>
        {/* <div className={styles.summaryRow}>
           <span>Subtotal:</span> 
          <span>₹{order.totalAmount.toLocaleString()}</span>
        </div> */}
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
    </div>
  );
};

export default PaymentSummaryCard;