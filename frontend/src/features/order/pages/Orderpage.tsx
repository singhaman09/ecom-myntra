import React, { useState } from 'react';
import { useOrders } from '../hooks/useOrders';
import Layout from '../components/Layout';
import styles from '../css/ordersPage.module.css';
import type { Order } from '../types/orders';
import { useNavigate } from 'react-router-dom';


interface OrderCardProps {
  order: Order;
  onRatingSubmit: (orderId: string, rating: number) => Promise<{ success: boolean; }>;
}

const StarRating: React.FC<{
  rating: number;
  onRatingChange?: (rating: number) => void;
  readonly?: boolean;
  size?: 'small' | 'medium';
}> = ({ rating, onRatingChange, readonly = false, size = 'medium' }) => {
  return (
    <div className={`${styles.starRating} ${styles[size]}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          className={`${styles.star} ${star <= rating ? styles.filled : styles.filled}`}
          onClick={() => !readonly && onRatingChange?.(star)}
          disabled={readonly}
          type="button"
        >
          ★
        </button>
      ))}
    </div>
  );
};
const OrderCard: React.FC<OrderCardProps> = ({ order, onRatingSubmit }) => {
  const navigate = useNavigate();
  const [isSubmittingRating, setIsSubmittingRating] = useState(false);
  const [showAllItems, setShowAllItems] = useState(false);

  const handleRatingChange = async (rating: number) => {
    if (isSubmittingRating) return;
    setIsSubmittingRating(true);
    try {
      await onRatingSubmit(order.id, rating);
    } catch (error) {
      //error handling if needed
    } finally {
      setIsSubmittingRating(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return '#03a685';
      case 'shipped': return '#ff905a';
      case 'pending': return '#ffc107';
      case 'cancelled': return '#ff3e6c';
      default: return '#535665';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered': return 'Delivered';
      case 'shipped': return 'Shipped';
      case 'pending': return 'Processing';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const isExchangeReturnAvailable = () => {
    if (!order.exchangeReturnWindow) return false;
    return new Date(order.exchangeReturnWindow) > new Date();
  };

  const displayItems = showAllItems ? order.items : order.items.slice(0, 1);
  const hasMoreItems = order.items.length > 1;

  return (
    <div className={styles.orderCard}>
      {/* Order Header */}
      <div className={styles.orderHeader}>
        <div className={styles.orderInfo}>
          <div className={styles.statusBadge} style={{ backgroundColor: getStatusColor(order.status) }}>
            {getStatusText(order.status)}
          </div>
          <div className={styles.orderDate}>
            {order.status === 'delivered' ? 'Delivered on' : 'Ordered on'} {formatDate(order.orderDate || order.deliveryDate)}
          </div>
        </div>
        <div className={styles.orderMeta}>
          <div className={styles.orderId}>Order ID: {order.id.slice(-8).toUpperCase()}</div>
          {order.trackingInfo && (
            <div className={styles.trackingInfo}>
              Track: <span className={styles.trackingId}>{order.trackingInfo.trackingId}</span>
            </div>
          )}
        </div>
      </div>

      {/* Order Items */}
      <div className={styles.orderItems}>
        {displayItems.map((item, index) => (
          <div key={item.id} className={styles.orderItem}>
            <div className={styles.itemImage}>
              <img src={item.image} alt={item.name} />
              {item.quantity > 1 && (
                <div className={styles.quantityBadge}>{item.quantity}</div>
              )}
            </div>
            
            <div className={styles.itemDetails}>
              <div className={styles.brandName}>{item.brand}</div>
              <div className={styles.itemName}>{item.name}</div>
              <div className={styles.itemVariants}>
                Size: {item.size} {item.color && `| Color: ${item.color}`}
              </div>
              <div className={styles.itemPrice}>₹{item.price.toLocaleString()}</div>
              
              {order.status === 'delivered' && (
                <div className={styles.itemActions}>
                  {isExchangeReturnAvailable() && (
                    <button className={styles.exchangeBtn}>
                      <span className={styles.exchangeIcon}>↺</span>
                      Exchange
                    </button>
                  )}
                  <button className={styles.returnBtn}>
                    <span className={styles.returnIcon}>↩</span>
                    Return
                  </button>
                </div>
              )}
            </div>

            <div className={styles.itemStatus}>
              {order.status === 'delivered' && (
                <div className={styles.deliveryStatus}>
                  <div className={styles.deliveredIcon}>✓</div>
                  <span>Delivered on {formatDate(order.deliveryDate)}</span>
                </div>
              )}
              {order.status === 'shipped' && (
                <div className={styles.shippingStatus}>
                  <div className={styles.shippedIcon}>🚚</div>
                  <span>Expected by {formatDate(order.deliveryDate)}</span>
                </div>
              )}
            </div>
          </div>
        ))}

        {hasMoreItems && (
          <button 
            className={styles.showMoreBtn}
            onClick={() => setShowAllItems(!showAllItems)}
          >
            {showAllItems 
              ? 'Show Less' 
              : `Show ${order.items.length - 1} more item${order.items.length > 2 ? 's' : ''}`
            }
          </button>
        )}
      </div>

      {/* Order Actions */}
      <div className={styles.orderActions}>
        <div className={styles.leftActions}>
          {order.status === 'delivered' && (
            <div className={styles.ratingSection}>
              <span className={styles.rateText}>Rate Product</span>
              <StarRating
                rating={order.rating || 0}
                onRatingChange={order.canRate ? handleRatingChange : undefined}
                readonly={!order.canRate || isSubmittingRating}
                size="small"
              />
            </div>
          )}
          
          {order.exchangeReturnWindow && isExchangeReturnAvailable() && (
            <div className={styles.exchangeInfo}>
              <span className={styles.exchangeInfoText}>
                Exchange/Return available till {formatDate(order.exchangeReturnWindow)}
              </span>
            </div>
          )}
        </div>

        <div className={styles.rightActions}>
          <button className={styles.helpBtn}>Need Help?</button>
          {order.status === 'delivered' && (
            <button className={styles.buyAgainBtn} onClick={() => navigate('/products/' + order.id)}>Buy Again</button>
          )}
        </div>
      </div>
    </div>
  );
};

const OrderFilters: React.FC<{
  searchTerm: string;
  onSearchChange: (term: string) => void;
  totalOrders: number;
}> = ({ searchTerm, onSearchChange, totalOrders }) => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { key: 'all', label: 'All Orders', count: totalOrders },
    { key: 'delivered', label: 'Delivered' },
    { key: 'shipped', label: 'Shipped' },
    { key: 'pending', label: 'Processing' },
    { key: 'cancelled', label: 'Cancelled' },
  ];

  return (
    <div className={styles.filtersContainer}>
      <div className={styles.searchContainer}>
        <div className={styles.searchBox}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            type="text"
            placeholder="Search in orders"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>
      
      <div className={styles.filterTabs}>
        {filters.map((filter) => (
          <button
            key={filter.key}
            className={`${styles.filterTab} ${activeFilter === filter.key ? styles.active : ''}`}
            onClick={() => setActiveFilter(filter.key)}
          >
            {filter.label}
            {filter.count && <span className={styles.filterCount}>({filter.count})</span>}
          </button>
        ))}
      </div>
    </div>
  );
};

const OrdersPage: React.FC = () => {
  const {
    orders,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    submitRating,
    refreshOrders,
  } = useOrders();

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

        <div className={styles.ordersContainer}>
          {orders.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>📦</div>
              <h3>No orders found</h3>
              <p>Looks like you haven't placed any orders yet!</p>
              <button className={styles.shopNowBtn}>Start Shopping</button>
            </div>
          ) : (
            <div className={styles.ordersList}>
              {orders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onRatingSubmit={submitRating}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default OrdersPage;