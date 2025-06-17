import React, { useEffect, useState, useRef } from 'react';
import { 
  CheckCheck, 
  Trash2, 
  AlertCircle,
  Loader2,
  BellOff,
  Clock
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
import type {Notification, MarkAsReadRequest, DeleteNotificationRequest} from '../../types/profile.types'; 

const Notifications: React.FC = () => {
  const dispatch = useAppDispatch();
  const { 
    notifications, 
    unreadCount, 
    loading, 
    error, 
    pagination 
  } = useSelector((state: RootState) => state.notifications); 

  const [swipingId, setSwipingId] = useState<string | null>(null);
  const touchStartX = useRef<number>(0);
  const touchCurrentX = useRef<number>(0);

  useEffect(() => {
    
    dispatch(fetchNotifications({ page: 1, limit: 10 }));
  }, [dispatch]);

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

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.isRead) {
      
      dispatch(markNotificationsAsRead({ notificationIds: [notification.id] } as MarkAsReadRequest));
    }
  };

  const handleDelete = (notificationId: string) => {
    
    dispatch(deleteNotifications({ notificationIds: [notificationId] } as DeleteNotificationRequest));
    setSwipingId(null);
  };

  const formatTimeAgo = (timestamp: string) => {
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

  
  const handleTouchStart = (e: React.TouchEvent, notificationId: string) => {
    touchStartX.current = e.touches[0].clientX;
    touchCurrentX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent, notificationId: string) => {
    touchCurrentX.current = e.touches[0].clientX;
    const deltaX = touchStartX.current - touchCurrentX.current;
    
    if (deltaX > 50) { 
      setSwipingId(notificationId);
    } else if (deltaX < -20) {
      setSwipingId(null);
    }
  };

  const handleTouchEnd = () => {
    touchStartX.current = 0;
    touchCurrentX.current = 0;
  };

  if (error) {
    return (
      <div className={styles.notificationsContainer}>
        <div className={styles.errorState}>
          <AlertCircle size={20} />
          <span>{error}</span>
          <button 
            onClick={() => dispatch(clearError())}
            className="btn btn-secondary"
          >
            Dismiss
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.notificationsContainer}>
      <div className={styles.notificationsHeader}>
        <div className={styles.headerLeft}>
          <h2 className={styles.headerTitle}>Notifications</h2>
          {unreadCount > 0 && (
            <span className={styles.unreadBadge}>{unreadCount}</span>
          )}
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
                className={`${styles.notificationItem} ${
                  !notification.isRead ? styles.unread : ''
                } ${swipingId === notification.id ? styles.swiping : ''}`}
                onClick={() => handleNotificationClick(notification)}
                onTouchStart={(e) => handleTouchStart(e, notification.id)}
                onTouchMove={(e) => handleTouchMove(e, notification.id)}
                onTouchEnd={handleTouchEnd}
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

                <div className={styles.swipeActions}>
                  <button
                    className={styles.deleteButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(notification.id);
                    }}
                  >
                    <Trash2 size={20} />
                  </button>
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