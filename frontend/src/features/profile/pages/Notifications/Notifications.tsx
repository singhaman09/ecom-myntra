import React, {
  useEffect,
  useRef,
  useState,
  lazy,
  Suspense,
  useCallback,
  memo,
} from 'react';
import styles from './Notifications.module.css';
import { useSelector } from 'react-redux';
import { useAppDispatch, type RootState } from '../../redux/hooks';
import {
  fetchNotifications,
  markNotificationsAsRead,
  deleteNotifications,
  markAllAsRead,
  clearError,
} from '../../redux/slices/notificationSlice';
import type {
  Notification,
  MarkAsReadRequest,
  DeleteNotificationRequest,
} from '../../types/profile.types';

const AlertCircle = lazy(() => import('lucide-react').then(m => ({ default: m.AlertCircle })));
const Loader2 = lazy(() => import('lucide-react').then(m => ({ default: m.Loader2 })));
const BellOff = lazy(() => import('lucide-react').then(m => ({ default: m.BellOff })));
const Clock = lazy(() => import('lucide-react').then(m => ({ default: m.Clock })));
const CheckCheck = lazy(() => import('lucide-react').then(m => ({ default: m.CheckCheck })));
const Trash2 = lazy(() => import('lucide-react').then(m => ({ default: m.Trash2 })));

const Notifications: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    notifications,
    unreadCount,
    loading,
    error,
    pagination
  } = useSelector((state: RootState) => state.notifications);

  const dragStartX = useRef(0);
  const isDragging = useRef(false);
  const [dragStates, setDragStates] = useState<Record<string, { offset: number; isDragging: boolean }>>({});

  useEffect(() => {
    dispatch(fetchNotifications({ page: 1, limit: 10 }));
  }, [dispatch]);

  const formatTimeAgo = useCallback((timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diff = Math.floor((now.getTime() - time.getTime()) / 1000);
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
    return time.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }, []);

  const formatTime = useCallback((timestamp: string) => {
    const time = new Date(timestamp);
    return time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent, id: string) => {
    dragStartX.current = e.clientX;
    isDragging.current = true;
    setDragStates(prev => ({ ...prev, [id]: { offset: 0, isDragging: true } }));

    const handleMouseMove = (move: MouseEvent) => {
      if (!isDragging.current) return;
      const deltaX = dragStartX.current - move.clientX;
      const offset = Math.max(0, Math.min(deltaX, 120));
      setDragStates(prev => ({ ...prev, [id]: { offset, isDragging: true } }));
    };

    const handleMouseUp = (up: MouseEvent) => {
      const deltaX = dragStartX.current - up.clientX;
      if (deltaX > 80) dispatch(deleteNotifications({ notificationIds: [id] } as DeleteNotificationRequest));
      setDragStates(prev => {
        const newState = { ...prev };
        delete newState[id];
        return newState;
      });
      isDragging.current = false;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [dispatch]);

  const handleNotificationClick = useCallback((n: Notification) => {
    if (isDragging.current) return;
    if (!n.isRead) {
      dispatch(markNotificationsAsRead({ notificationIds: [n.id] } as MarkAsReadRequest));
    }
  }, [dispatch]);

  const handleMarkAllAsRead = useCallback(() => {
    dispatch(markAllAsRead());
  }, [dispatch]);

  const handleLoadMore = useCallback(() => {
    if (pagination.hasMore && !loading) {
      dispatch(fetchNotifications({ page: pagination.page + 1, limit: pagination.limit }));
    }
  }, [dispatch, pagination, loading]);

  if (error) {
    return (
      <div className={styles.notificationsContainer}>
        <div className={styles.errorState}>
          <Suspense fallback={null}><AlertCircle size={20} /></Suspense>
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
          <button className={styles.markAllButton} onClick={handleMarkAllAsRead} disabled={loading}>
            <Suspense fallback={null}><CheckCheck size={16} /></Suspense>
            Mark All Read
          </button>
        )}
      </div>

      {loading && notifications.length === 0 ? (
        <div className={styles.loadingState}>
          <Suspense fallback={null}><Loader2 size={24} className={styles.loadingSpinner} /></Suspense>
          <span>Loading notifications...</span>
        </div>
      ) : notifications.length === 0 ? (
        <div className={styles.emptyState}>
          <Suspense fallback={null}><BellOff /></Suspense>
          <h3>No notifications</h3>
          <p>You're all caught up!</p>
        </div>
      ) : (
        <>
          <div className={styles.notificationsList}>
            {notifications.map(notification => {
              const drag = dragStates[notification.id];
              const offset = drag?.offset || 0;
              const isDrag = drag?.isDragging || false;

              return (
                <div key={notification.id} className={styles.swipeWrapper}>
                  <div className={styles.deleteBackground} style={{ width: `${offset}px`, opacity: offset > 0 ? 1 : 0 }}>
                    <div className={styles.deleteIcon}>
                      <Suspense fallback={null}><Trash2 size={20} /></Suspense>
                    </div>
                  </div>

                  <div
                    className={`${styles.notificationItem} ${!notification.isRead ? styles.unread : ''} ${isDrag ? styles.dragging : ''}`}
                    style={{
                      transform: `translateX(-${offset}px)`,
                      transition: isDrag ? 'none' : 'transform 0.3s ease',
                    }}
                    onClick={() => handleNotificationClick(notification)}
                    onMouseDown={(e) => handleMouseDown(e, notification.id)}
                  >
                    <div className={styles.notificationContent}>
                      <h3 className={styles.notificationTitle}>{notification.title}</h3>
                      <p className={styles.notificationMessage}>{notification.message}</p>
                      <div className={styles.notificationTime}>
                        <Suspense fallback={null}><Clock size={12} /></Suspense>
                        <span>{formatTimeAgo(notification.timestamp)}</span>
                        <span>•</span>
                        <span>{formatTime(notification.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {pagination.hasMore && (
            <button className={styles.loadMoreButton} onClick={handleLoadMore} disabled={loading}>
              {loading ? (
                <>
                  <Suspense fallback={null}><Loader2 size={16} className={styles.loadingSpinner} /></Suspense>
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

export default memo(Notifications);