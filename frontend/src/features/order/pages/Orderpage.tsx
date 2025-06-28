import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import OrderList from '../components/OrderList';
import styles from '../css/ordersPage.module.css';
import { useNavigate } from 'react-router-dom';
import NotFound from '../components/OrderNotFound';
import SomethingWentWrong from '../components/Somethingwentwrong';
import { useOrders } from '../hooks/useOrders';
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

  const [isTimedOut, setIsTimedOut] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsTimedOut(true);
    }, 10000);
    return () => clearTimeout(timeoutId);
  }, []);

  const handleWriteReview = (orderId: string) => {
    navigate(`/orders/${orderId}/review`);
  };

  const handleExchangeReturn = (orderId: string, itemId: string) => {
    navigate(`/orders/${orderId}/exchange-return/${itemId}`);
  };

  const handleBuyAgain = (itemId: string) => {
    navigate(`/products/${itemId}`);
  };

  if (isTimedOut && loading) {
    return <NotFound />;
  }

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
    return <SomethingWentWrong message={error} onRetry={refreshOrders} />;
  }

  return (
    <Layout searchTerm={searchTerm} onSearchChange={setSearchTerm}>
      <div className={styles.ordersPage}>
        <OrderList
          orders={orders}
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
