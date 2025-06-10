// components/Orders/OrderList.tsx
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { 
  fetchOrders, 
  updateOrderStatus, 
  cancelOrder, 
  setCurrentPage,
  setItemsPerPage 
} from '../../../store/slices/orderSlice';
import type { Order, OrderStatus } from '../../../types/orders';
import Button from '../../../components/UI/Button';
import styles from '../../../components/shared/css/orderList.module.css';

interface OrderListProps {
  orders: Order[];
  loading: boolean;
  error: string | null;
  onRatingSubmit: (orderId: string, rating: number) => Promise<any>;
  onRetry: () => Promise<void>;
  
}
const OrderCard: React.FC<{ 
  order: Order; 
  onUpdateStatus: (orderId: string, status: OrderStatus) => void;
  onCancelOrder: (orderId: string) => void;
}> = ({ order, onUpdateStatus, onCancelOrder }) => {
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>(order.status);
  
  const orderStatuses: OrderStatus[] = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
  
  const handleStatusChange = () => {
    if (selectedStatus !== order.status) {
      onUpdateStatus(order.id, selectedStatus);
    }
  };

  const getStatusColor = (status: OrderStatus) => {
    const colors = {
      pending: '#f59e0b',
      processing: '#3b82f6',
      shipped: '#8b5cf6',
      delivered: '#10b981',
      cancelled: '#ef4444',
      returned: '#9ca3af',
    };
    return colors[status];
  };

  return (
    <div className={styles.orderCard}>
      <div className={styles.orderHeader}>
        <div className={styles.orderInfo}>
          <h3>Order #{order.id}</h3>
          <p className={styles.customerName}>{order.customerName}</p>
          <p className={styles.orderDate}>
            {new Date(order.orderDate).toLocaleDateString()}
          </p>
        </div>
        <div className={styles.orderAmount}>
          <span className={styles.total}>${order.total.toFixed(2)}</span>
          <span 
            className={styles.status}
            style={{ backgroundColor: getStatusColor(order.status) }}
          >
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </span>
        </div>
      </div>

      <div className={styles.orderItems}>
        <h4>Items ({order.items.length})</h4>
        {order.items.slice(0, 3).map((item, index) => (
          <div key={index} className={styles.orderItem}>
            <span>{item.name}</span>
            <span>Qty: {item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        {order.items.length > 3 && (
          <p className={styles.moreItems}>
            +{order.items.length - 3} more items
          </p>
        )}
      </div>

      <div className={styles.orderActions}>
        <div className={styles.statusUpdate}>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as OrderStatus)}
            className={styles.statusSelect}
          >
            {orderStatuses.map(status => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
          <Button 
            onClick={handleStatusChange}
            variant="primary"
            size="small"
            disabled={selectedStatus === order.status}
          >
            Update
          </Button>
        </div>
        
        {order.status !== 'cancelled' && order.status !== 'delivered' && (
          <Button 
            onClick={() => onCancelOrder(order.id)}
            variant="danger"
            size="small"
          >
            Cancel Order
          </Button>
        )}
      </div>
    </div>
  );
};

const OrderList: React.FC<OrderListProps> = () => {
  const dispatch = useAppDispatch();
  const { 
    filteredOrders, 
    loading, 
    error, 
    currentPage, 
    itemsPerPage, 
    totalOrders 
  } = useAppSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleUpdateStatus = (orderId: string, status: OrderStatus) => {
    dispatch(updateOrderStatus({ orderId, status }));
  };

  const handleCancelOrder = (orderId: string) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      dispatch(cancelOrder(orderId));
    }
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const handleItemsPerPageChange = (items: number) => {
    dispatch(setItemsPerPage(items));
  };

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, endIndex);
  const totalPages = Math.ceil(totalOrders / itemsPerPage);

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>Error: {error}</p>
        <Button onClick={() => dispatch(fetchOrders())} variant="primary">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.orderList}>
      <div className={styles.listHeader}>
        <div className={styles.listInfo}>
          <h2>Orders</h2>
          <p>{totalOrders} orders found</p>
        </div>
        
        <div className={styles.listControls}>
          <label>
            Show:
            <select 
              value={itemsPerPage} 
              onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
            >
              <option value={5}>5 per page</option>
              <option value={10}>10 per page</option>
              <option value={25}>25 per page</option>
              <option value={50}>50 per page</option>
            </select>
          </label>
        </div>
      </div>

      {paginatedOrders.length === 0 ? (
        <div className={styles.noOrders}>
          <p>No orders found matching your criteria.</p>
        </div>
      ) : (
        <>
          <div className={styles.ordersGrid}>
            {paginatedOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onUpdateStatus={handleUpdateStatus}
                onCancelOrder={handleCancelOrder}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className={styles.pagination}>
              <Button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                variant="secondary"
                size="small"
              >
                Previous
              </Button>
              
              <div className={styles.pageNumbers}>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`${styles.pageButton} ${
                      page === currentPage ? styles.active : ''
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <Button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                variant="secondary"
                size="small"
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default OrderList;