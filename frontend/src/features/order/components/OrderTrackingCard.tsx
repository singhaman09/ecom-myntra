import React from 'react';
import type { Order } from '../types/orders';
import styles from '../css/ordertracking.module.css';
import { useNavigate } from 'react-router-dom';

interface OrderTrackingCardProps {
  order: Order;
}

const OrderTrackingCard: React.FC<OrderTrackingCardProps> = ({ order }) => {
  const navigate = useNavigate();

  const getStatusText = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'Delivered';
      case 'shipped':
        return 'Shipped';
      case 'pending':
        return 'Processing';
      case 'cancelled':
        return 'Cancelled';
      case 'processing':
        return 'Processing';
      case 'returned':
        return 'Returned';
      default:
        return 'Unknown';
    }
  };

  const formatDate = (dateString: string): string => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  // Estimate timeline dates based on orderDate
  const getTimelineDates = () => {
    const orderDate = new Date(order.orderDate);
    return {
      placed: formatDate(order.orderDate),
      picked: formatDate(new Date(orderDate.getTime() + 24 * 60 * 60 * 1000).toISOString()),
      shipped: formatDate(new Date(orderDate.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString()),
      delivered: order.status === 'delivered' ? formatDate(order.deliveryDate) : 'N/A',
    };
  };

  const timelineDates = getTimelineDates();
  const isDelivered = order.status.toLowerCase() === 'delivered';

  const handleNeedHelp = () => {
    navigate('/helpsupport', { state: { order } });
  };

  return (
    <div className={styles.orderTrackingCard}>
      <h3>Order Status</h3>
      <div className={styles.timeline}>
        <div className={styles.timelineItem}>
          <div className={styles.statusCircle}>
            {['pending', 'processing', 'shipped', 'delivered', 'returned'].includes(order.status.toLowerCase()) ? '✓' : '○'}
          </div>
          <div className={styles.statusText}>Order placed</div>
          <div className={styles.date}>{timelineDates.placed}</div>
        </div>
        <div className={styles.timelineLine}></div>
        <div className={styles.timelineItem}>
          <div className={styles.statusCircle}>
            {['shipped', 'delivered', 'returned'].includes(order.status.toLowerCase()) ? '✓' : '○'}
          </div>
          <div className={styles.statusText}>Order picked</div>
          <div className={styles.date}>{timelineDates.picked}</div>
        </div>
        <div className={styles.timelineLine}></div>
        <div className={styles.timelineItem}>
          <div className={styles.statusCircle}>
            {['delivered', 'returned'].includes(order.status.toLowerCase()) ? '✓' : '○'}
          </div>
          <div className={styles.statusText}>Shipped</div>
          <div className={styles.date}>{timelineDates.shipped}</div>
        </div>
        <div className={styles.timelineLine}></div>
        <div className={styles.timelineItem}>
          <div className={styles.statusCircle}>{isDelivered ? '✓' : '○'}</div>
          <div className={styles.statusText}>Delivered</div>
          <div className={styles.date}>{timelineDates.delivered}</div>
        </div>
      </div>

      {order.trackingInfo ? (
        <div className={styles.trackingInfo}>
          <div>Courier: {order.trackingInfo.courier}</div>
          <div>Tracking ID: {order.trackingInfo.trackingId}</div>
          {order.trackingInfo.trackingUrl && (
            <a href={order.trackingInfo.trackingUrl} target="_blank" rel="noopener noreferrer">
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
      ) : (
        <div className={styles.trackingInfo}>Tracking information not available</div>
      )}

      <div className={styles.buttons}>
        {isDelivered ? (
          <>
            <button className={styles.returnExchangeBtn}>Return / Exchange</button>
            <button className={styles.helpBtn} onClick={handleNeedHelp}>Need Help</button>
          </>
        ) : (
          <button className={styles.helpBtn} onClick={handleNeedHelp}>Need Help</button>
        )}
      </div>
    </div>
  );
};

export default OrderTrackingCard;