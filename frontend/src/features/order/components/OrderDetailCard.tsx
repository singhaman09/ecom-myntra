import React from "react";
import type { Order } from "../types/orders";
import styles from "../css/orderdetailCard.module.css";

import shoes from '../../../assets/shoes.jpeg';

interface OrderDetailCardProps {
  order: Order;
}

const OrderDetailCard: React.FC<OrderDetailCardProps> = ({ order }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className={styles.orderDetailCard}>
     <div className={styles.orderId}>{order.id.slice(-8)}</div>
     <div>Ordered on: {formatDate(order.orderDate)}</div>
      {order.items.map((item) => (
        <div key={item.id} className={styles.item}>
          <img
            src={shoes}
            alt={item.name}
            className={styles.itemImage}
          />
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
    </div>
  );
};

export default React.memo(OrderDetailCard);