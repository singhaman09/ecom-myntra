export interface Order {
  id: string;
  status: 'delivered' | 'Pending' | 'shipped' | 'cancelled' | 'processing' | 'returned';
  deliveryDate: string;
  orderDate: string;
  exchangeReturnWindow?: string;
  items: OrderItem[];
  rating?: number;
  canRate?: boolean;
  trackingInfo?: TrackingInfo;
  totalAmount: number;
  discount?: number;
  deliveryCharges?: number;
  paymentMethod?: PaymentMethod;
  deliveryAddress?: Address;
  orderNotes?: string;
  total:number
  customerName: string;
}

export interface OrderItem {
  id: string;
  name: string;
  brand: string;
  image: string;
  imageAlt?: string;
  size: string;
  color?: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  sku?: string;
  category?: string;
  subcategory?: string;
  isReturnable?: boolean;
  isExchangeable?: boolean;
  returnReason?: string;
  itemStatus?: 'active' | 'returned' | 'exchanged' | 'cancelled';
}

export interface TrackingInfo {
  courier: string;
  trackingId: string;
  trackingUrl?: string;
  estimatedDelivery?: string;
  currentLocation?: string;
  trackingHistory?: TrackingEvent[];
}

export interface TrackingEvent {
  id: string;
  timestamp: string;
  location: string;
  status: string;
  description: string;
}

export interface PaymentMethod {
  type: 'card' | 'upi' | 'netbanking' | 'wallet' | 'cod' | 'emi';
  last4Digits?: string;
  provider?: string;
  transactionId?: string;
}

export interface Address {
  id: string;
  name: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  phoneNumber: string;
  isDefault?: boolean;
  type?: 'home' | 'office' | 'other';
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
  timestamp?: string;
  pagination?: PaginationInfo;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

// Order filtering and sorting types
export interface OrderFilters {
  status?: Order['status'][];
  dateRange?: {
    from: string;
    to: string;
  };
  priceRange?: {
    min: number;
    max: number;
  };
  brands?: string[];
  categories?: string[];
  search?: string;
}

export interface OrderSortOptions {
  field: 'orderDate' | 'deliveryDate' | 'totalAmount' | 'status';
  direction: 'asc' | 'desc';
}

// Rating and Review types
export interface Review {
  id: string;
  orderId: string;
  itemId: string;
  rating: number;
  title?: string;
  comment?: string;
  images?: string[];
  isVerifiedPurchase: boolean;
  createdAt: string;
  updatedAt?: string;
  helpfulCount?: number;
  isHelpful?: boolean;
}

export interface RatingBreakdown {
  overall: number;
  totalReviews: number;
  breakdown: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

// Order action types
export type OrderAction = 
  | 'view_details'
  | 'track_order'
  | 'cancel_order'
  | 'return_item'
  | 'exchange_item'
  | 'buy_again'
  | 'write_review'
  | 'rate_item'
  | 'download_invoice'
  | 'contact_support';

export interface OrderActionPayload {
  orderId: string;
  itemId?: string;
  action: OrderAction;
  data?: any;
}

// Helper types for better type safety
export type OrderStatus = Order['status'];
export type PaymentType = PaymentMethod['type'];
export type AddressType = Address['type'];

// Utility types for form handling
export interface OrderFormData {
  filters: Partial<OrderFilters>;
  sort: OrderSortOptions;
  pagination: {
    page: number;
    limit: number;
  };
}

// Error handling types
export interface OrderError {
  code: string;
  message: string;
  field?: string;
  details?: Record<string, any>;
}

export interface OrderValidationError {
  field: string;
  message: string;
  code: string;
}

// Event types for order tracking
export interface OrderEvent {
  id: string;
  orderId: string;
  type: 'status_change' | 'payment' | 'shipping' | 'delivery' | 'return' | 'exchange';
  timestamp: string;
  data: Record<string, any>;
  createdBy?: string;
}

// Bulk operations
export interface BulkOrderOperation {
  orderIds: string[];
  action: 'cancel' | 'mark_delivered' | 'update_status' | 'send_notification';
  data?: Record<string, any>;
}

export interface BulkOperationResult {
  success: string[];
  failed: Array<{
    id: string;
    error: string;
  }>;
  total: number;
  processed: number;
}