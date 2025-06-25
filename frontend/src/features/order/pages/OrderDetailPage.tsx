import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import OrderDetailCard from '../components/OrderDetailCard';
import OrderTrackingCard from '../components/OrderTrackingCard';
import PaymentSummaryCard from '../components/PaymentSummaryCard';
import styles from '../css/orderdetailPage.module.css';
import type { Order } from '../types/orders';
import { apiService } from '../api';
import SomethingWentWrong from '../components/Somethingwentwrong';
import { useOrders } from '../hooks/useOrders';

const OrderDetailPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const {
      refreshOrders,
    } = useOrders();
  useEffect(() => {
  const fetchOrder = async () => {
    if (!orderId) return;
    try {
      setLoading(true);
      const fetchedOrder = await apiService.getOrderById(orderId);
      setOrder(fetchedOrder);
    } catch (err) {
      setError('Failed to load order details');
    } finally {
      setLoading(false);
    }
  };
  fetchOrder();
}, [orderId, order?.status]);

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
    <SomethingWentWrong onRetry={refreshOrders} />
  }

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
          {order && <OrderDetailCard order={order} />}
          {order && <OrderTrackingCard order={order} />}
          {order && <PaymentSummaryCard order={order} />}
        </div>
      </div>
    </Layout>
  );
};

export default React.memo(OrderDetailPage);;