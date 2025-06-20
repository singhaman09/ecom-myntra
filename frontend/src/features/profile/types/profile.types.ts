export interface User {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role?: string;
  isActive?: string;
  isVerified?: boolean;
  deviceId?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  addresses?: Address[];
  // gender?: 'male' | 'female' | 'other';
  // dateOfBirth?: string;
  // avatar?: string;
}

export interface Address {
  _id: string;
  addressType: 'home' | 'work' | 'other';
  name: string;
  phoneNumber: string;
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  isDefault: boolean;
}

export interface ApiResponse<T = any> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export interface RawApiAddress {
  id?: string;
  type?: string;
  name?: string;
  phoneNumber?: string;
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  isDefault?: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'delivered' | 'shipped' | 'processing' | 'cancelled';
  total: number;
  items: OrderItem[];
}

export interface OrderItem {
  id: string;
  name: string;
  image: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
}

export interface SidebarItem {
  id: string;
  label: string;
  icon?: string;
  isActive?: boolean;
  children?: SidebarItem[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

export interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };
}

export interface NotificationFilters {
  page?: number;
  limit?: number;
}

export interface NotificationResponse {
  notifications: Notification[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface MarkAsReadRequest {
  notificationIds: string[];
}

export interface DeleteNotificationRequest {
  notificationIds: string[];
}