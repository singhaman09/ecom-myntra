import React from 'react';
import type { Order } from '../types/orders';
import styles from '../../../components/shared/css/ordertracking.module.css'

interface OrderTrackingCardProps {
  order: Order;
}

const OrderTrackingCard: React.FC<OrderTrackingCardProps> = ({ order }) => {
  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'Delivered';
      case 'shipped':
        return 'Shipped';
      case 'pending':
        return 'Processing';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className={styles.orderTrackingCard}>
      <h2 className={styles.sectionTitle}>Order Status</h2>
      <div className={styles.status}>
        <span className={styles.statusLabel}>Current Status:</span>
        <span className={styles.statusValue}>{getStatusText(order.status)}</span>
      </div>
      {order.trackingInfo && (
        <div className={styles.trackingInfo}>
          <div>Courier: {order.trackingInfo.courier}</div>
          <div>Tracking ID: {order.trackingInfo.trackingId}</div>
          {order.trackingInfo.trackingUrl && (
            <a href={order.trackingInfo.trackingUrl} className={styles.trackingLink}>
              Track Order
            </a>
          )}
          {order.trackingInfo.estimatedDelivery && (
            <div>Estimated Delivery: {formatDate(order.trackingInfo.estimatedDelivery)}</div>
          )}
          {order.trackingInfo.currentLocation && (
            <div>Current Location: {order.trackingInfo.currentLocation}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderTrackingCard;