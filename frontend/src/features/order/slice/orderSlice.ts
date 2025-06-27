import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Order, OrderStatus } from "../types/orders";
import { apiService } from "../api";

export interface OrderFilters {
  status?: OrderStatus;
  dateRange?: {
    startDate: string;
    endDate: string;
  };
  searchQuery?: string;
  minAmount?: number;
  maxAmount?: number;
}

interface OrdersState {
  orders: Order[];
  filteredOrders: Order[];
  filters: OrderFilters;
  loading: boolean;
  error: string | null;
  currentPage: number;
  itemsPerPage: number;
  totalOrders: number;
}

const initialState: OrdersState = {
  orders: [],
  filteredOrders: [],
  filters: {},
  loading: false,
  error: null,
  currentPage: 1,
  itemsPerPage: 10,
  totalOrders: 0,
};

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const orders = await apiService.getOrders();
      return orders;
    } catch (error) {
      return rejectWithValue("Failed to fetch orders");
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "orders/updateStatus",
  async (
    { orderId, status }: { orderId: string; status: OrderStatus },
    { rejectWithValue }
  ) => {
    try {
      const updatedOrder = await apiService.updateOrderStatus(orderId, status);
      return updatedOrder;
    } catch (error) {
      return rejectWithValue("Failed to update order status");
    }
  }
);

export const cancelOrder = createAsyncThunk(
  "orders/cancelOrder",
  async (orderId: string, thunkAPI) => {
    try {
      const cancelledOrder = await apiService.cancelOrder(orderId);
      return cancelledOrder;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Cancel failed");
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<OrderFilters>) => {
      state.filters = { ...state.filters, ...action.payload };
      state.currentPage = 1;
      ordersSlice.caseReducers.applyFilters(state);
    },
    clearFilters: (state) => {
      state.filters = {};
      state.filteredOrders = state.orders;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
      state.currentPage = 1;
    },
    applyFilters: (state) => {
      let filtered = [...state.orders];

      if (state.filters.status) {
        filtered = filtered.filter(
          (order) =>
            order.status.toLowerCase() === state.filters.status!.toLowerCase()
        );
      }

      if (state.filters.searchQuery) {
        const query = state.filters.searchQuery.toLowerCase();
        filtered = filtered.filter(
          (order) =>
            order.id.toLowerCase().includes(query) ||
            order.items.some((item) => item.name.toLowerCase().includes(query))
        );
      }

      if (state.filters.minAmount !== undefined) {
        filtered = filtered.filter(
          (order) => order.total >= state.filters.minAmount!
        );
      }
      if (state.filters.maxAmount !== undefined) {
        filtered = filtered.filter(
          (order) => order.total <= state.filters.maxAmount!
        );
      }

      if (state.filters.dateRange) {
        const startDate = new Date(state.filters.dateRange.startDate);
        const endDate = new Date(state.filters.dateRange.endDate);
        filtered = filtered.filter((order) => {
          const orderDate = new Date(order.orderDate);
          return orderDate >= startDate && orderDate <= endDate;
        });
      }

      state.filteredOrders = filtered;
      state.totalOrders = filtered.length;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.filteredOrders = action.payload;
        state.totalOrders = action.payload.length;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const index = state.orders.findIndex(
          (order) => order.id === action.payload.id
        );
        if (index !== -1) {
          state.orders[index] = action.payload;
          ordersSlice.caseReducers.applyFilters(state);
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        const updatedOrder = action.payload;
        const index = state.orders.findIndex((o) => o.id === updatedOrder.id);
        if (index !== -1) {
          state.orders[index] = updatedOrder;
        }
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const {
  setFilters,
  clearFilters,
  setCurrentPage,
  setItemsPerPage,
  applyFilters,
} = ordersSlice.actions;

export default ordersSlice.reducer;
