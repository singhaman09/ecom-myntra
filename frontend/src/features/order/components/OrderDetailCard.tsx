import React from 'react';
import type { Order } from '../types/orders';
import styles from '../css/orderdetailCard.module.css';

interface OrderDetailCardProps {
  order: Order;
}

const OrderDetailCard: React.FC<OrderDetailCardProps> = ({ order }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className={styles.orderDetailCard}>
      <h2 className={styles.sectionTitle}>Order Items</h2>
      {order.items.map((item) => (
        <div key={item.id} className={styles.item}>
          <img src={item.image} alt={item.name} className={styles.itemImage} />
          <div className={styles.itemDetails}>
            <div className={styles.brand}>{item.brand}</div>
            <div className={styles.name}>{item.name}</div>
            <div className={styles.meta}>
              Size: {item.size} {item.color && `| Color: ${item.color}`}
            </div>
            <div className={styles.price}>₹{item.price.toLocaleString()}</div>
            <div className={styles.quantity}>Qty: {item.quantity}</div>
          </div>
        </div>
      ))}
      <div className={styles.orderMeta}>
        <div>Ordered on: {formatDate(order.orderDate)}</div>
        {order.deliveryDate && (
          <div>Delivered on: {formatDate(order.deliveryDate)}</div>
        )}
        {order.deliveryAddress && (
          <div className={styles.address}>
            Delivery Address: {order.deliveryAddress.name}, {order.deliveryAddress.addressLine1},{' '}
            {order.deliveryAddress.city}, {order.deliveryAddress.state} - {order.deliveryAddress.pincode}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetailCard;