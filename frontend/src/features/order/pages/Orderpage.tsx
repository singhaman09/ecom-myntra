import React from 'react';
import { useOrders } from '../hooks/useOrders';
import Layout from '../components/Layout';
import OrderFilters from '../components/OderFilters';
import OrderList from '../components/OrderList';
import styles from '../css/ordersPage.module.css';
import { useNavigate } from 'react-router-dom';

const OrdersPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    orders,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    submitRating,
    refreshOrders,
  } = useOrders();

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
          <button className={styles.retryButton} onClick={refreshOrders}>
            Retry
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout searchTerm={searchTerm} onSearchChange={setSearchTerm}>
      <div className={styles.ordersPage}>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>My Orders</h1>
          <div className={styles.orderCount}>{orders.length} Orders</div>
        </div>

        <OrderFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          totalOrders={orders.length}
        />

        <OrderList
          onRatingSubmit={submitRating}
          onWriteReview={handleWriteReview}
          onExchangeReturn={handleExchangeReturn}
          onBuyAgain={handleBuyAgain}
        />
      </div>
    </Layout>
  );
};

export default OrdersPage;