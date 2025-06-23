import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { WishlistItem } from '../types/wishlist';
import { apiService } from '../api';

export interface WishlistState {
  items: WishlistItem[];
  loading: boolean;
  error: string | null;
  categories: string[];
}

const initialState: WishlistState = {
  items: [],
  loading: false,
  error: null,
  categories: [],
};

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
      if (!item) throw new Error('Item not found');
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
    updateItemStock: (
      state,
      action: PayloadAction<{ itemId: string; inStock: boolean }>
    ) => {
      const { itemId, inStock } = action.payload;
      const item = state.items.find((i) => i.id === itemId);
      if (item) item.inStock = inStock;
    },
  },
  extraReducers: (builder) => {
    builder
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
      })
      .addCase(fetchWishlistItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

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
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(removeFromWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(updateWishlistItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateWishlistItem.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateWishlistItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(moveToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(moveToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(moveToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { updateItemStock } = wishlistSlice.actions;
export default wishlistSlice.reducer;
