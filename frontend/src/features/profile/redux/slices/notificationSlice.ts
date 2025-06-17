import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'; // Corrected import
import type { NotificationState, Notification, NotificationFilters, MarkAsReadRequest, DeleteNotificationRequest } from '../../types/profile.types'; // Corrected path
import { notificationService } from '../../services/notificationService';


const initialState: NotificationState = {
  notifications: [],
  unreadCount: 0,
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    hasMore: false
  }
};

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (filters: NotificationFilters = {}, { rejectWithValue }) => {
    try {
      const response = await notificationService.getNotifications(filters);
      return response;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch notifications');
    }
  }
);

export const markNotificationsAsRead = createAsyncThunk(
  'notifications/markAsRead',
  async (request: MarkAsReadRequest, { rejectWithValue }) => {
    try {
      await notificationService.markAsRead(request);
      return request.notificationIds;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to mark notifications as read');
    }
  }
);

export const deleteNotifications = createAsyncThunk(
  'notifications/deleteNotifications',
  async (request: DeleteNotificationRequest, { rejectWithValue }) => {
    try {
      await notificationService.deleteNotifications(request);
      return request.notificationIds;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to delete notifications');
    }
  }
);

export const markAllAsRead = createAsyncThunk(
  'notifications/markAllAsRead',
  async (_, { rejectWithValue }) => {
    try {
      await notificationService.markAllAsRead();
      return true;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to mark all notifications as read');
    }
  }
);

export const fetchUnreadCount = createAsyncThunk(
  'notifications/fetchUnreadCount',
  async (_, { rejectWithValue }) => {
    try {
      const count = await notificationService.getUnreadCount();
      return count;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch unread count');
    }
  }
);

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetNotifications: (state) => {
      state.notifications = [];
      state.pagination = initialState.pagination;
    },
    updateNotificationLocally: (state, action: PayloadAction<{ id: string; updates: Partial<Notification> }>) => {
      const { id, updates } = action.payload;
      const notification = state.notifications.find((n: Notification) => n.id === id); 
      if (notification) {
        Object.assign(notification, updates);
      }
    }
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        const { notifications, total, page, limit, hasMore } = action.payload;
        
        if (page === 1) {
          state.notifications = notifications;
        } else {
          state.notifications = [...state.notifications, ...notifications];
        }
        
        state.pagination = { page, limit, total, hasMore };
        state.unreadCount = notifications.filter((n: Notification) => !n.isRead).length; 
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      
      .addCase(markNotificationsAsRead.pending, (state) => {
        state.error = null;
      })
      .addCase(markNotificationsAsRead.fulfilled, (state, action) => {
        const notificationIds = action.payload;
        state.notifications.forEach((notification: Notification) => { 
          if (notificationIds.includes(notification.id)) {
            notification.isRead = true;
          }
        });
        state.unreadCount = state.notifications.filter((n: Notification) => !n.isRead).length; 
      })
      .addCase(markNotificationsAsRead.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      
      .addCase(deleteNotifications.pending, (state) => {
        state.error = null;
      })
      .addCase(deleteNotifications.fulfilled, (state, action) => {
        const notificationIds = action.payload;
        state.notifications = state.notifications.filter((n: Notification) => !notificationIds.includes(n.id)); 
        state.unreadCount = state.notifications.filter((n: Notification) => !n.isRead).length; 
        state.pagination.total = Math.max(0, state.pagination.total - notificationIds.length);
      })
      .addCase(deleteNotifications.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      
      .addCase(markAllAsRead.pending, (state) => {
        state.error = null;
      })
      .addCase(markAllAsRead.fulfilled, (state) => {
        state.notifications.forEach((notification: Notification) => { 
          notification.isRead = true;
        });
        state.unreadCount = 0;
      })
      .addCase(markAllAsRead.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      
      .addCase(fetchUnreadCount.fulfilled, (state, action) => {
        state.unreadCount = action.payload;
      });
  }
});

export const { clearError, resetNotifications, updateNotificationLocally } = notificationSlice.actions;
export default notificationSlice.reducer;