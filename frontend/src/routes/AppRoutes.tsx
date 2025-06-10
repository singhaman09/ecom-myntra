// src/routes/AppRoutes.tsx
import React from 'react';
import { useRoutes } from 'react-router-dom';
import Layout from '../components/shared/Layout';
import { ProtectedRoute, AuthRoute } from './ProtectedRoute';

import Home from '../features/home/pages/Home';
import Login from '../features/auth/pages/Login';
import Register from '../features/auth/pages/Register';
import ForgotPassword from '../features/auth/pages/ForgotPassword';
import Profile from '../features/profile/pages/Profile';

// From personal project
import WishlistPage from '../features/wishlist/Wishlist/WishlistPage';
import OrderList from '../features/order/Orders/OrderList';
import OrderFilters from '../features/order/Orders/OderFilters';
import { useOrders } from '../hooks/useOrders';

// Orders Page Component
const OrdersPage: React.FC = () => {
  const {
    orders,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    submitRating,
    refreshOrders
  } = useOrders();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <Layout
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      isSidebarOpen={isSidebarOpen}
      sidebarContent={<div>Sidebar Content</div>}
    >
      <OrderFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        totalOrders={orders.length}
      />
      <OrderList
        orders={orders}
        loading={loading}
        error={error}
        onRatingSubmit={submitRating}
        onRetry={refreshOrders}
      />
    </Layout>
  );
};

// Final route structure
const AppRoutes: React.FC = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: (
        <Layout>
          <Home />
        </Layout>
      ),
    },
    {
      path: '/login',
      element: (
        <AuthRoute>
          <Login />
        </AuthRoute>
      ),
    },
    {
      path: '/signup',
      element: (
        <AuthRoute>
          <Register />
        </AuthRoute>
      ),
    },
    {
      path: '/forgot-password',
      element: (
        <AuthRoute>
          <ForgotPassword />
        </AuthRoute>
      ),
    },
    {
      path: '/profile',
      element: (
        <ProtectedRoute>
          <Layout>
            <Profile />
          </Layout>
        </ProtectedRoute>
      ),
    },
    {
      path: '/orders',
      element: (
        <ProtectedRoute>
          <OrdersPage />
        </ProtectedRoute>
      ),
    },
    {
      path: '/wishlist',
      element: (
        <ProtectedRoute>
          <Layout>
            <WishlistPage />
          </Layout>
        </ProtectedRoute>
      ),
    },
    {
      path: '*',
      element: <div style={{ textAlign: 'center', padding: '2rem' }}>404 - Page Not Found</div>,
    },
  ]);

  return routes;
};

export default AppRoutes;
