import React from 'react';
import type { Order } from '../../order/types/orders';
import styles from '../css/Helpsupport.module.css';

interface RecentPurchaseSectionProps {
  order: Order;
}

const RecentPurchaseSection: React.FC<RecentPurchaseSectionProps> = ({ order }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const getStatusBadge = (status: string) => {
    const statusClass = status === 'delivered' ? styles.deliveredBadge : styles.statusBadge;
    return (
      <span className={statusClass}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className={styles.recentPurchaseSection}>
      <h3 className={styles.sectionTitle}>Need help with recent purchase ?</h3>
      <div className={styles.orderItem}>
        <div className={styles.productImage}>
          <img src="/api/placeholder/60/60" alt="Product" />
        </div>
        <div className={styles.orderDetails}>
          <h4 className={styles.productName}>Anti-Dandruff Shampoo</h4>
          <div className={styles.orderMeta}>
            <span className={styles.price}>₹{order.total}</span>
            {getStatusBadge(order.status)}
          </div>
          <div className={styles.orderDate}>
            Order Date : {formatDate(order.orderDate)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentPurchaseSection;