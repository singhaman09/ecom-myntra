import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCartAPI as getCartItems,
  addCartItemsAPI as addItem,
  removeCartItemAPI as removeItem,
  incrementCartItemQuantityAPI,
  decrementCartItemQuantityAPI,
  moveItemToWishlistAPI,
  updateCartItemSizeAPI,
} from "../api/cartApi";

import type { CartState, CartItem } from "../types/cart";

const initialState: CartState = {
  cart: [],
  loading: false,
  error: null,
};

const addCartInterface = {
  productId : "",
  size : "",
  color : "",
}

// Get all cart items
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getCartItems();
      return res;
    } catch (err: any) {
      return rejectWithValue(err.message || "Error fetching cart");
    }
  }
);

// Add item
export const addCartItem = createAsyncThunk(
  "cart/addItem",
  async ({productId, size, color} : typeof addCartInterface,{ rejectWithValue }) => {
    try {
      const res = await addItem(productId, size, color);
      return res;
    } catch (err: any) {
      return rejectWithValue(err.message || "Error adding item to cart");
    }
  }
);

// Remove single item
export const deleteCartItem = createAsyncThunk(
  "cart/deleteItem",
  async (id: string, { rejectWithValue }) => {
    try {
      await removeItem(id);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.message || "Error deleting item");
    }
  }
);

// Update size
export const updateItemSize = createAsyncThunk(
  "cart/updateSize",
  async (
    { id, newSize }: { id: string; newSize: string },
    { rejectWithValue }
  ) => {
    try {
      await updateCartItemSizeAPI(id, newSize);
      return { id, newSize };
    } catch (err: any) {
      return rejectWithValue(err.message || "Error updating size");
    }
  }
);

// Increment quantity
export const incrementItemQuantity = createAsyncThunk(
  "cart/incrementQuantity",
  async (id: string, { rejectWithValue }) => {
    try {
      const updatedItems: CartItem[] = await incrementCartItemQuantityAPI(id);
      return { id, updatedItems };
    } catch (err: any) {
      return rejectWithValue(err.message || "Error incrementing quantity");
    }
  }
);

// Decrement quantity
export const decrementItemQuantity = createAsyncThunk(
  "cart/decrementQuantity",
  async (id: string, { rejectWithValue }) => {
    try {
      const updatedItems: CartItem[] = await decrementCartItemQuantityAPI(id);
      return { id, updatedItems };
    } catch (err: any) {
      return rejectWithValue(err.message || "Error decrementing quantity");
    }
  }
);

// Move to wishlist
export const moveToWishlist = createAsyncThunk(
  "cart/moveToWishlist",
  async (id: string, { rejectWithValue }) => {
    try {
      await moveItemToWishlistAPI(id);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.message || "Error moving item to wishlist");
    }
  }
);

// Slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetCart: (state) => {
      state.cart = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Add Item
      .addCase(addCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(addCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Delete One
      .addCase(deleteCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = state.cart.filter(
          (item) => item.productId !== action.payload
        );
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update Size
      .addCase(updateItemSize.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateItemSize.fulfilled, (state, action) => {
        state.loading = false;
        const { id, newSize } = action.payload;
        const item = state.cart.find((i) => i.productId === id);
        if (item) item.size = newSize;
      })
      .addCase(updateItemSize.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Increment Quantity
      .addCase(incrementItemQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(incrementItemQuantity.fulfilled, (state, action) => {
        state.loading = false;
        const { updatedItems } = action.payload;
        state.cart = updatedItems;
      })
      .addCase(incrementItemQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Decrement Quantity
      .addCase(decrementItemQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(decrementItemQuantity.fulfilled, (state, action) => {
        state.loading = false;
        const { updatedItems } = action.payload;
        state.cart = updatedItems;
      })
      .addCase(decrementItemQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Move to Wishlist
      .addCase(moveToWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(moveToWishlist.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.payload;
        state.cart = state.cart.filter((item) => item.productId !== id);
      })
      .addCase(moveToWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetCart } = cartSlice.actions;
export default cartSlice.reducer;