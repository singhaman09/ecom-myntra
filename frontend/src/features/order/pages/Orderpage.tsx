import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
// import OrderFilters from '../components/OderFilters';
import OrderList from '../components/OrderList';
import styles from '../css/ordersPage.module.css';
import { useNavigate } from 'react-router-dom';
import type { Order } from '../types/orders';
import { apiService } from '../api';

const OrdersPage: React.FC = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, searchTerm]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await apiService.getOrders();
      setOrders(data);
      setError(null);
    } catch (err) {
      setError('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const filterOrders = () => {
    if (!searchTerm.trim()) {
      setFilteredOrders(orders);
      return;
    }

    const lower = searchTerm.toLowerCase();
    const filtered = orders.filter((order) =>
      order.items.some(
        (item) =>
          item.name.toLowerCase().includes(lower) ||
          item.brand.toLowerCase().includes(lower)
      )
    );
    setFilteredOrders(filtered);
  };

  const submitRating = async (orderId: string, rating: number) => {
    try {
      const res = await apiService.submitRating(orderId, rating);
      return res.success;
    } catch {
      return false;
    }
  };

  const handleWriteReview = (orderId: string) => {
    navigate(`/orders/${orderId}/review`);
  };

  const handleExchangeReturn = (orderId: string, itemId: string) => {
    navigate(`/orders/${orderId}/exchange-return/${itemId}`);
  };

  const handleBuyAgain = (orderId: string, itemId: string) => {
    navigate(`/products/${itemId}`);
  };

  if (loading) {
    return (
      <Layout searchTerm={searchTerm} onSearchChange={setSearchTerm}>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Loading your orders...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout searchTerm={searchTerm} onSearchChange={setSearchTerm}>
        <div className={styles.errorContainer}>
          <div className={styles.errorIcon}>⚠️</div>
          <h3>Something went wrong</h3>
          <p>{error}</p>
          <button className={styles.retryButton} onClick={fetchOrders}>
            Retry
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout searchTerm={searchTerm} onSearchChange={setSearchTerm}>
      <div className={styles.ordersPage}>
        {/* Uncomment if needed */}
        {/* <h1 className={styles.pageTitle}>My Orders</h1> */}
        {/* <div className={styles.orderCount}>{filteredOrders.length} Orders</div> */}

        {/* <OrderFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          totalOrders={filteredOrders.length}
        /> */}

        <OrderList
          orders={filteredOrders}
          onRatingSubmit={submitRating}
          onWriteReview={handleWriteReview}
          onExchangeReturn={handleExchangeReturn}
          onBuyAgain={handleBuyAgain}
        />
      </div>
    </Layout>
  );
};

export default React.memo(OrdersPage);
