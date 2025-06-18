import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useOrders } from '../hooks/useOrders';
import Layout from '../components/Layout';
import OrderDetailCard from '../components/OrderDetailCard';
import OrderTrackingCard from '../components/OrderTrackingCard';
import PaymentSummaryCard from '../components/PaymentSummaryCard';
import styles from '../css/orderdetailPage.module.css';
import type { Order } from '../types/orders';

const OrderDetailPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { orders, loading, error } = useOrders();

  const order = orders.find((o) => o.id === orderId);

  if (loading) {
    return (
      <Layout>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Loading order details...</p>
        </div>
      </Layout>
    );
  }

  if (error || !order) {
    return (
      <Layout>
        <div className={styles.errorContainer}>
          <div className={styles.errorIcon}>⚠️</div>
          <h3>{error || 'Order not found'}</h3>
          <Link to="/orders" className={styles.backButton}>
            Back to Orders
          </Link>
        </div>
      </Layout>
    );
  }

  const handleNeedHelp = () => {
    // Handle need help action here
    console.log('Need help requested for order:', orderId);
  };

  return (
    <Layout>
      <div className={styles.orderDetailPage}>
      <div className={styles.header}>
        <Link to="/orders" className={styles.backLink}>
            ←
          </Link>
          <h1 className={styles.title}>Order Details</h1>
          </div>  

        <div className={styles.content}>
          <OrderDetailCard order={order} />
          <OrderTrackingCard order={order} onNeedHelp={handleNeedHelp} />
          <PaymentSummaryCard order={order} />
        </div>
      </div>
    </Layout>
  );
};

export default OrderDetailPage;