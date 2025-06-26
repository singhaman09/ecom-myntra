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

  const item = order.items?.[0]; // first item

  return (
    <div className={styles.recentPurchaseSection}>
      <h3 className={styles.sectionTitle}>Need help with recent purchase?</h3>
      <div className={styles.orderItem}>
        <div className={styles.productImage}>
          <img
            src={item?.image || 'https://via.placeholder.com/60'}
            alt={item?.name || 'Product Image'}
          />
        </div>
        <div className={styles.orderDetails}>
          <h4 className={styles.productName}>{item?.name || 'Product Name'}</h4>
          <div className={styles.orderMeta}>
            <span className={styles.price}>₹{order.total}</span>
            {getStatusBadge(order.status)}
          </div>
          <div className={styles.orderDate}>
            Order Date: {formatDate(order.orderDate)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentPurchaseSection;
