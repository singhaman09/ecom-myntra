import React, { useEffect, useRef } from 'react';
import {
  AlertCircle,
  Loader2,
  BellOff,
  Clock,
  CheckCheck
} from 'lucide-react';
import styles from './Notifications.module.css';
import { useSelector } from 'react-redux';
import { useAppDispatch, type RootState } from '../../redux/hooks';
import {
  fetchNotifications,
  markNotificationsAsRead,
  deleteNotifications,
  markAllAsRead,
  clearError
} from '../../redux/slices/notificationSlice';
import type { Notification, MarkAsReadRequest, DeleteNotificationRequest } from '../../types/profile.types';

const Notifications: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    notifications,
    unreadCount,
    loading,
    error,
    pagination
  } = useSelector((state: RootState) => state.notifications);

  const dragStartX = useRef<number>(0);
  const dragEndX = useRef<number>(0);

  useEffect(() => {
    dispatch(fetchNotifications({ page: 1, limit: 10 }));
  }, [dispatch]);

  const handleMouseDown = (e: React.MouseEvent) => {
    dragStartX.current = e.clientX;
  };

  const handleMouseUp = (e: React.MouseEvent, notificationId: string) => {
    dragEndX.current = e.clientX;
    const deltaX = dragStartX.current - dragEndX.current;
    if (deltaX > 80) {
      dispatch(deleteNotifications({ notificationIds: [notificationId] } as DeleteNotificationRequest));
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.isRead) {
      dispatch(markNotificationsAsRead({ notificationIds: [notification.id] } as MarkAsReadRequest));
    }
  };

  const handleMarkAllAsRead = () => {
    dispatch(markAllAsRead());
  };

  const handleLoadMore = () => {
    if (pagination.hasMore && !loading) {
      dispatch(fetchNotifications({
        page: pagination.page + 1,
        limit: pagination.limit
      }));
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    console.log(timestamp);
    const now = new Date();
    const time = new Date(timestamp);
    const diffInSeconds = Math.floor((now.getTime() - time.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;

    return time.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: time.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
    
  };

  const formatTime = (timestamp: string) => {
    const time = new Date(timestamp);
    return time.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  if (error) {
    return (
      <div className={styles.notificationsContainer}>
        <div className={styles.errorState}>
          <AlertCircle size={20} />
          <span>{error}</span>
          <button onClick={() => dispatch(clearError())}>Dismiss</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.notificationsContainer}>
      <div className={styles.notificationsHeader}>
        <div className={styles.headerLeft}>
          <h2 className={styles.headerTitle}>Notifications</h2>
          {unreadCount > 0 && <span className={styles.unreadBadge}>{unreadCount}</span>}
        </div>
        {unreadCount > 0 && (
          <button
            className={styles.markAllButton}
            onClick={handleMarkAllAsRead}
            disabled={loading}
          >
            <CheckCheck size={16} />
            Mark All Read
          </button>
        )}
      </div>

      {loading && notifications.length === 0 ? (
        <div className={styles.loadingState}>
          <Loader2 size={24} className={styles.loadingSpinner} />
          <span>Loading notifications...</span>
        </div>
      ) : notifications.length === 0 ? (
        <div className={styles.emptyState}>
          <BellOff />
          <h3>No notifications</h3>
          <p>You're all caught up! Check back later for new updates.</p>
        </div>
      ) : (
        <>
          <div className={styles.notificationsList}>
            {notifications.map((notification: Notification) => (
              <div
                key={notification.id}
                className={`${styles.notificationItem} ${!notification.isRead ? styles.unread : ''}`}
                onClick={() => handleNotificationClick(notification)}
                onMouseDown={handleMouseDown}
                onMouseUp={(e) => handleMouseUp(e, notification.id)}
              >
                <div className={styles.notificationContent}>
                  <h3 className={styles.notificationTitle}>
                    {notification.title}
                  </h3>
                  <p className={styles.notificationMessage}>
                    {notification.message}
                  </p>
                  <div className={styles.notificationTime}>
                    <Clock size={12} />
                    <span>{formatTimeAgo(notification.timestamp)}</span>
                    <span>•</span>
                    <span>{formatTime(notification.timestamp)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {pagination.hasMore && (
            <button
              className={styles.loadMoreButton}
              onClick={handleLoadMore}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 size={16} className={styles.loadingSpinner} />
                  Loading more...
                </>
              ) : (
                'Load More Notifications'
              )}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Notifications;