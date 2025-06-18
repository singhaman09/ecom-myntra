// import React from 'react';
// import type { Order } from '../types/orders';
// import styles from '../css/ordertracking.module.css'

// interface OrderTrackingCardProps {
//   order: Order;
// }

// const OrderTrackingCard: React.FC<OrderTrackingCardProps> = ({ order }) => {
//   const getStatusText = (status: string) => {
//     switch (status) {
//       case 'delivered':
//         return 'Delivered';
//       case 'shipped':
//         return 'Shipped';
//       case 'pending':
//         return 'Processing';
//       case 'cancelled':
//         return 'Cancelled';
//       default:
//         return status;
//     }
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('en-IN', {
//       day: 'numeric',
//       month: 'short',
//       year: 'numeric',
//     });
//   };

//   return (
//     <div className={styles.orderTrackingCard}>
//       <h2 className={styles.sectionTitle}>Order Status</h2>
//       <div className={styles.status}>
//         <span className={styles.statusLabel}>Current Status:</span>
//         <span className={styles.statusValue}>{getStatusText(order.status)}</span>
//       </div>
//       {order.trackingInfo && (
//         <div className={styles.trackingInfo}>
//           <div>Courier: {order.trackingInfo.courier}</div>
//           <div>Tracking ID: {order.trackingInfo.trackingId}</div>
//           {order.trackingInfo.trackingUrl && (
//             <a href={order.trackingInfo.trackingUrl} className={styles.trackingLink}>
//               Track Order
//             </a>
//           )}
//           {order.trackingInfo.estimatedDelivery && (
//             <div>Estimated Delivery: {formatDate(order.trackingInfo.estimatedDelivery)}</div>
//           )}
//           {order.trackingInfo.currentLocation && (
//             <div>Current Location: {order.trackingInfo.currentLocation}</div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrderTrackingCard;

import React from 'react';
import type { Order } from '../types/orders';
import styles from '../css/ordertracking.module.css';
import { useNavigate } from 'react-router-dom';

interface OrderTrackingCardProps {
  order: Order;
}

const OrderTrackingCard: React.FC<OrderTrackingCardProps> = ({ order }) => {
  const navigate = useNavigate();

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
        return 'Delivered';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const handleNeedHelp = () => {
    navigate("/helpsupport", { state: { order } });

  };

  const isDelivered = order.status === 'delivered';

  return (
    <div className={styles.orderTrackingCard}>
      <h3>Order Status</h3>
      <div className={styles.timeline}>
        <div className={styles.timelineItem}>
          <div className={styles.statusCircle}>
            {order.status === 'delivered' || order.status === 'shipped' || order.status === 'pending' ? '✓' : '○'}
          </div>
          <div className={styles.statusText}>Order placed</div>
          <div className={styles.date}>{formatDate('2021-07-31')}</div>
        </div>
        <div className={styles.timelineLine}></div>
        <div className={styles.timelineItem}>
          <div className={styles.statusCircle}>
            {order.status === 'delivered' || order.status === 'shipped' ? '✓' : '○'}
          </div>
          <div className={styles.statusText}>Order picked</div>
          <div className={styles.date}>{formatDate('2021-08-01')}</div>
        </div>
        <div className={styles.timelineLine}></div>
        <div className={styles.timelineItem}>
          <div className={styles.statusCircle}>
            {order.status === 'delivered' ? '✓' : '○'}
          </div>
          <div className={styles.statusText}>Shipped</div>
          <div className={styles.date}>{formatDate('2021-08-02')}</div>
        </div>
        <div className={styles.timelineLine}></div>
        <div className={styles.timelineItem}>
          <div className={styles.statusCircle}>
            {order.status === 'delivered' ? '✓' : '○'}
          </div>
          <div className={styles.statusText}>Delivered</div>
          <div className={styles.date}>{formatDate('2021-08-03')}</div>
        </div>
      </div>

      {order.trackingInfo && (
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
