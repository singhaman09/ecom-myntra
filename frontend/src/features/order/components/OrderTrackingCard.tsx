import React, { useState } from 'react';
import { useAppDispatch } from '../hooks/redux';
import { cancelOrder } from '../slice/orderSlice';
import type { Order } from '../types/orders';
import styles from '../css/ordertracking.module.css';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from '../components/Confirmmodal';
import { toast } from 'react-toastify';

interface OrderTrackingCardProps {
  order: Order;
}

const OrderTrackingCard: React.FC<OrderTrackingCardProps> = ({ order }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

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
    delivered: order.status.toLowerCase() === 'delivered' ? formatDate(order.deliveryDate) : 'N/A',
  };

  const isCancelled = order.status.toLowerCase() === 'canceled';

  const steps = isCancelled
    ? [
        { key: 'placed', label: 'Order Placed', date: timelineDates.placed },
        { key: 'cancelled', label: 'Cancelled', date: formatDate(new Date().toISOString()) },
      ]
    : [
        { key: 'placed', label: 'Order Placed', date: timelineDates.placed },
        { key: 'picked', label: 'Order Picked', date: timelineDates.picked },
        { key: 'shipped', label: 'Shipped', date: timelineDates.shipped },
        { key: 'delivered', label: 'Delivered', date: timelineDates.delivered },
      ];

  const currentStatusIndex = steps.findIndex(step => step.key === order.status.toLowerCase());

  const handleNeedHelp = () => navigate('/helpsupport', { state: { order } });
  const handleCancel = () => setShowModal(true);

  const confirmCancel = async () => {
    setShowModal(false);
    const result = await dispatch(cancelOrder(order.id));
    if (cancelOrder.fulfilled.match(result)) {
      toast.success('Order cancelled successfully');
    } else {
      toast.error('Failed to cancel order');
    }
  };

  return (
    <>
      {showModal && (
        <ConfirmModal
          message="Are you sure you want to cancel this order?"
          onConfirm={confirmCancel}
          onCancel={() => setShowModal(false)}
        />
      )}

      <div className={styles.orderTrackingCard}>
        <h3>Order Status</h3>
        <div className={styles.timeline}>
          {steps.map((step, index) => {
            const isActive =
              isCancelled
                ? step.key === 'placed' || step.key === 'cancelled'
                : index <= currentStatusIndex;

            return (
              <div
                key={step.key}
                className={`${styles.timelineItem} ${isActive ? styles.active : ''} ${
                  step.key === 'cancelled' ? styles.cancelled : ''
                }`}
              >
                <div className={styles.statusCircle}>
                  {step.key === 'cancelled' ? '✕' : isActive ? '✓' : ''}
                </div>
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
              <button className={styles.helpBtn} onClick={handleNeedHelp}>
                Need Help
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default React.memo(OrderTrackingCard);
