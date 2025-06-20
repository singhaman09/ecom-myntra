import React from 'react';
import { useDispatch } from 'react-redux';
import { cancelOrder } from '../slice/orderSlice';
import type { Order } from '../types/orders';
import styles from '../css/ordertracking.module.css';
import { useNavigate } from 'react-router-dom';

interface OrderTrackingCardProps {
  order: Order;
}

const OrderTrackingCard: React.FC<OrderTrackingCardProps> = ({ order }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formatDate = (dateString: string): string => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const orderDate = new Date(order.orderDate);
  const timelineDates = {
    placed: formatDate(order.orderDate),
    picked: formatDate(new Date(orderDate.getTime() + 1 * 86400000).toISOString()),
    shipped: formatDate(new Date(orderDate.getTime() + 2 * 86400000).toISOString()),
    delivered:
      order.status.toLowerCase() === 'delivered'
        ? formatDate(order.deliveryDate)
        : 'N/A',
  };

  const steps = [
    { key: 'placed', label: 'Order placed', date: timelineDates.placed },
    { key: 'picked', label: 'Order picked', date: timelineDates.picked },
    { key: 'shipped', label: 'Shipped', date: timelineDates.shipped },
    { key: 'delivered', label: 'Delivered', date: timelineDates.delivered },
  ];

  const isCancelled = order.status.toLowerCase() === 'cancelled';
  const currentStatusIndex = isCancelled ? -1 : steps.findIndex(step => step.key === order.status.toLowerCase());

  const handleNeedHelp = () => {
    navigate('/helpsupport', { state: { order } });
  };

  const handleCancel = async () => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      const result = await dispatch(cancelOrder(order.id));
      if (cancelOrder.fulfilled.match(result)) {
        window.location.reload();
      } else {
        alert('Failed to cancel order');
      }
    }
  };

  return (
    <div className={styles.orderTrackingCard}>
      <h3>Order Status</h3>
      <div className={styles.timeline}>
        {steps.map((step, index) => {
          const isActive = !isCancelled && index <= currentStatusIndex;
          return (
            <div key={step.key} className={`${styles.timelineItem} ${isActive ? styles.active : ''}`}>
              <div className={styles.statusCircle}>{isActive ? '✓' : ''}</div>
              <div className={styles.statusText}>{step.label}</div>
              <div className={styles.date}>{step.date}</div>
            </div>
          );
        })}
      </div>

      {isCancelled && (
        <div className={styles.cancelledMessage}>
          Order Cancelled
        </div>
      )}

      <div className={styles.buttons}>
        {!isCancelled && order.status !== 'delivered' && (
          <>
            <button className={styles.returnExchangeBtn} onClick={handleCancel}>
              Cancel
            </button>
            <button className={styles.helpBtn} onClick={handleNeedHelp}>
              Need Help
            </button>
          </>
        )}
        {order.status === 'delivered' && (
          <>
            <button className={styles.returnExchangeBtn}>Return / Exchange</button>
            <button className={styles.helpBtn} onClick={handleNeedHelp}>Need Help</button>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderTrackingCard;
