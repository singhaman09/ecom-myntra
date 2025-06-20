import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { WishlistItem, WishlistFilters } from '../types/wishlist';
import { apiService } from '../api';

export interface WishlistState {
  items: WishlistItem[];
  filteredItems: WishlistItem[];
  filters: WishlistFilters;
  loading: boolean;
  error: string | null;
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  categories: string[];
}

const initialState: WishlistState = {
  items: [],
  filteredItems: [],
  filters: {
    sortBy: 'dateAdded',
    sortOrder: 'desc',
  },
  loading: false,
  error: null,
  currentPage: 1,
  itemsPerPage: 12,
  totalItems: 0,
  categories: [],
};

// Async thunks
export const fetchWishlistItems = createAsyncThunk(
  'wishlist/fetchItems',
  async (_, { rejectWithValue }) => {
    try {
      const items = await apiService.getWishlistItems();
      return items;
    } catch (error) {
      return rejectWithValue('Failed to fetch wishlist items');
    }
  }
);

export const addToWishlist = createAsyncThunk(
  'wishlist/addItem',
  async (
    { productId, size, color }: { productId: string; size: string; color: string },
    { rejectWithValue }
  ) => {
    try {
      const newItem = await apiService.addToWishlist(productId, size, color);
      return newItem;
    } catch (error) {
      return rejectWithValue('Failed to add item to wishlist');
    }
  }
);

export const removeFromWishlist = createAsyncThunk(
  'wishlist/removeItem',
  async (itemId: string, { rejectWithValue }) => {
    try {
      await apiService.removeFromWishlist(itemId);
      return itemId;
    } catch (error) {
      return rejectWithValue('Failed to remove item from wishlist');
    }
  }
);

export const updateWishlistItem = createAsyncThunk(
  'wishlist/updateItem',
  async (item: WishlistItem, { rejectWithValue }) => {
    try {
      const updatedItem = await apiService.updateWishlistItem(item);
      return updatedItem;
    } catch (error) {
      return rejectWithValue('Failed to update wishlist item');
    }
  }
);

export const moveToCart = createAsyncThunk(
  'wishlist/moveToCart',
  async (itemId: string, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { wishlist: WishlistState };
      const item = state.wishlist.items.find((item) => item.id === itemId);
      if (!item) {
        throw new Error('Item not found');
      }
      await apiService.moveToCart(itemId);
      return itemId;
    } catch (error) {
      return rejectWithValue('Failed to move item to cart');
    }
  }
);

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<WishlistFilters>) => {
      state.filters = { ...state.filters, ...action.payload };
      state.currentPage = 1;
      wishlistSlice.caseReducers.applyFilters(state);
    },
    clearFilters: (state) => {
      state.filters = {
        sortBy: 'dateAdded',
        sortOrder: 'desc',
      };
      state.currentPage = 1;
      wishlistSlice.caseReducers.applyFilters(state);
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
      state.currentPage = 1;
    },
    applyFilters: (state) => {
      let filtered = [...state.items];

      if (state.filters.category) {
        filtered = filtered.filter(
          (item) => item.category === state.filters.category
        );
      }

      if (state.filters.brand) {
        filtered = filtered.filter(
          (item) => item.brand === state.filters.brand
        );
      }

      if (state.filters.searchQuery) {
        const query = state.filters.searchQuery.toLowerCase();
        filtered = filtered.filter(
          (item) =>
            item.name.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query)
        );
      }

      if (state.filters.priceRange) {
        filtered = filtered.filter(
          (item) =>
            item.price >= state.filters.priceRange!.min &&
            item.price <= state.filters.priceRange!.max
        );
      }

      if (state.filters.inStock !== undefined) {
        filtered = filtered.filter(
          (item) => item.inStock === state.filters.inStock
        );
      }

      const { sortBy, sortOrder } = state.filters;
      filtered.sort((a, b) => {
        let comparison = 0;

        switch (sortBy) {
          case 'name':
            comparison = a.name.localeCompare(b.name);
            break;
          case 'price':
          case 'price-low':
            comparison = a.price - b.price;
            break;
          case 'price-high':
            comparison = b.price - a.price;
            break;
          case 'dateAdded':
          case 'newest':
            comparison =
              new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
            break;
          case 'oldest':
            comparison =
              new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime();
            break;
          case 'rating':
            comparison = b.rating - a.rating;
            break;
          default:
            comparison = 0;
        }

        return sortOrder === 'desc' && !['price-low', 'oldest'].includes(sortBy || '') ? -comparison : comparison;
      });

      state.filteredItems = filtered;
      state.totalItems = filtered.length;
    },
    updateItemStock: (
      state,
      action: PayloadAction<{ itemId: string; inStock: boolean }>
    ) => {
      const { itemId, inStock } = action.payload;
      const index = state.items.findIndex((item) => item.id === itemId);
      if (index !== -1) {
        state.items[index].inStock = inStock;
        wishlistSlice.caseReducers.applyFilters(state);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch wishlist items
      .addCase(fetchWishlistItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlistItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.categories = Array.from(
          new Set(action.payload.map((item) => item.category))
        );
        wishlistSlice.caseReducers.applyFilters(state);
      })
      .addCase(fetchWishlistItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Add to wishlist
      .addCase(addToWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
        if (!state.categories.includes(action.payload.category)) {
          state.categories.push(action.payload.category);
        }
        wishlistSlice.caseReducers.applyFilters(state);
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Remove from wishlist
      .addCase(removeFromWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((item) => item.id !== action.payload);
        wishlistSlice.caseReducers.applyFilters(state);
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update wishlist item
      .addCase(updateWishlistItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateWishlistItem.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
          wishlistSlice.caseReducers.applyFilters(state);
        }
      })
      .addCase(updateWishlistItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Move to cart
      .addCase(moveToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(moveToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((item) => item.id !== action.payload);
        wishlistSlice.caseReducers.applyFilters(state);
      })
      .addCase(moveToCart.rejected, (state, action) => {
        state.loading = false;
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
  updateItemStock,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;