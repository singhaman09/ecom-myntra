import type { Notification, NotificationFilters, NotificationResponse, MarkAsReadRequest, DeleteNotificationRequest } from '../types/profile.types';


const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Order Delivered Successfully',
    message: 'Your order #MYN123456789 has been delivered to your address. Thank you for shopping with us!',
    timestamp: '2024-01-20T10:30:00Z',
    isRead: false
  },
  {
    id: '2',
    title: 'Flash Sale - 50% Off!',
    message: 'Don\'t miss out! Get 50% off on selected fashion items. Sale ends in 24 hours.',
    timestamp: '2024-01-20T09:15:00Z',
    isRead: false
  },
  {
    id: '3',
    title: 'New Login Detected',
    message: 'We detected a new login to your account from Chrome on Windows. If this wasn\'t you, please secure your account immediately.',
    timestamp: '2024-01-20T08:45:00Z',
    isRead: true
  },
  {
    id: '4',
    title: 'Account Verification Complete',
    message: 'Your account has been successfully verified. You now have access to all premium features.',
    timestamp: '2024-01-19T16:20:00Z',
    isRead: true
  },
  {
    id: '5',
    title: 'Items in Your Cart',
    message: 'You have 3 items waiting in your cart. Complete your purchase before they\'re gone!',
    timestamp: '2024-01-19T14:30:00Z',
    isRead: false
  },
  {
    id: '6',
    title: 'Order Shipped',
    message: 'Great news! Your order #MYN987654321 is on its way. Track your package for real-time updates.',
    timestamp: '2024-01-19T11:15:00Z',
    isRead: true
  },
  {
    id: '7',
    title: 'Welcome Bonus!',
    message: 'Welcome to our platform! Here\'s a special 20% discount on your first purchase. Use code WELCOME20.',
    timestamp: '2024-01-18T12:00:00Z',
    isRead: true
  },
  {
    id: '8',
    title: 'Privacy Policy Updated',
    message: 'We\'ve updated our Privacy Policy to better protect your data. Please review the changes.',
    timestamp: '2024-01-18T09:30:00Z',
    isRead: false
  }
];

class NotificationService {
  private baseUrl = '/api/notifications'; // Replace with your actual API base URL

  // Simulate API delay
  private delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  async getNotifications(filters: NotificationFilters = {}): Promise<NotificationResponse> {
    try {
      // Simulate API call delay
      await this.delay(800);

      // In production, replace this with actual API call:
      // const response = await fetch(`${this.baseUrl}?${new URLSearchParams(filters)}`);
      // const data = await response.json();
      // return data;

      // Mock implementation
      let filteredNotifications = [...mockNotifications];

      // Sort by timestamp (newest first)
      filteredNotifications.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

      // Apply pagination
      const page = filters.page || 1;
      const limit = filters.limit || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedNotifications = filteredNotifications.slice(startIndex, endIndex);

      return {
        notifications: paginatedNotifications,
        total: filteredNotifications.length,
        page,
        limit,
        hasMore: endIndex < filteredNotifications.length
      };
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw new Error('Failed to fetch notifications');
    }
  }

  async markAsRead(request: MarkAsReadRequest): Promise<void> {
    try {
      // Simulate API call delay
      await this.delay(500);

      // In production, replace this with actual API call:
      // const response = await fetch(`${this.baseUrl}/mark-read`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(request)
      // });
      // if (!response.ok) throw new Error('Failed to mark notifications as read');

      // Mock implementation - update local data
      request.notificationIds.forEach(id => {
        const notification = mockNotifications.find(n => n.id === id);
        if (notification) {
          notification.isRead = true;
        }
      });
    } catch (error) {
      console.error('Error marking notifications as read:', error);
      throw new Error('Failed to mark notifications as read');
    }
  }

  async deleteNotifications(request: DeleteNotificationRequest): Promise<void> {
    try {
      // Simulate API call delay
      await this.delay(500);

      // In production, replace this with actual API call:
      // const response = await fetch(`${this.baseUrl}/delete`, {
      //   method: 'DELETE',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(request)
      // });
      // if (!response.ok) throw new Error('Failed to delete notifications');

      // Mock implementation
      request.notificationIds.forEach(id => {
        const index = mockNotifications.findIndex(n => n.id === id);
        if (index !== -1) {
          mockNotifications.splice(index, 1);
        }
      });
    } catch (error) {
      console.error('Error deleting notifications:', error);
      throw new Error('Failed to delete notifications');
    }
  }

  async markAllAsRead(): Promise<void> {
    try {
      // Simulate API call delay
      await this.delay(500);

      // In production, replace this with actual API call:
      // const response = await fetch(`${this.baseUrl}/mark-all-read`, {
      //   method: 'POST'
      // });
      // if (!response.ok) throw new Error('Failed to mark all notifications as read');

      // Mock implementation
      mockNotifications.forEach(notification => {
        notification.isRead = true;
      });
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      throw new Error('Failed to mark all notifications as read');
    }
  }

  async getUnreadCount(): Promise<number> {
    try {
      // Simulate API call delay
      await this.delay(300);

      // In production, replace this with actual API call:
      // const response = await fetch(`${this.baseUrl}/unread-count`);
      // const data = await response.json();
      // return data.count;

      // Mock implementation
      return mockNotifications.filter(n => !n.isRead).length;
    } catch (error) {
      console.error('Error fetching unread count:', error);
      throw new Error('Failed to fetch unread count');
    }
  }
}

export const notificationService = new NotificationService();