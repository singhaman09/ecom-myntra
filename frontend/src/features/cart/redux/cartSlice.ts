import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCartAPI as getCartItems,
  addCartItemsAPI as addItem,
  removeCartItemAPI as removeItem,
  removeSelectedCartItemsAPI as removeSelectedItems,
  updateCartItemQuantityAPI as updateQuantity,
  moveItemToWishlistAPI
} from "../api/cartApi";
import type { CartState } from "../types/cart";

const initialState: CartState = {
  cart: [],
  loading: false,
  error: null,
};

//  Get all cart items
export const fetchCart = createAsyncThunk("cart/fetchCart", async (_, { rejectWithValue }) => {
  try {
    const res = await getCartItems();
    return res;
  } catch (err: any) {
    return rejectWithValue(err.message || "Error fetching cart");
  }
});

//  Add item
export const addCartItem = createAsyncThunk("cart/addItem", async (productId: string, { rejectWithValue }) => {
  try {
    const res = await addItem(productId);
    return res;
  } catch (err: any) {
    return rejectWithValue(err.message || "Error adding item to cart");
  }
});

//  Remove one item
export const deleteCartItem = createAsyncThunk("cart/deleteItem", async (id: string, { rejectWithValue }) => {
  try {
    await removeItem(id);
    return id;
  } catch (err: any) {
    return rejectWithValue(err.message || "Error deleting item");
  }
});

//  Remove multiple items
export const deleteSelectedItems = createAsyncThunk(
  "cart/deleteMultiple",
  async (ids: string[], { rejectWithValue }) => {
    try {
      await removeSelectedItems(ids);
      return ids;
    } catch (err: any) {
      return rejectWithValue(err.message || "Error deleting items");
    }
  }
);

//  Update quantity
export const updateItemQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ id, quantity }: { id: string; quantity: number }, { rejectWithValue }) => {
    try {
      await updateQuantity(id, quantity);
      return { id, quantity };
    } catch (err: any) {
      return rejectWithValue(err.message || "Error updating quantity");
    } 
  }
);

// Move to Wishlist

export const moveToWishlist = createAsyncThunk(
  "cart/moveToWishlist",
  async (id: string, { rejectWithValue }) => {
    try {
      // Assuming there's an API endpoint to move items to wishlist
      await moveItemToWishlistAPI(id);
      return id; // Return the ID of the item moved to wishlist
    } catch (err: any) {
      return rejectWithValue(err.message || "Error moving item to wishlist");
    }
  }
);

//  Slice
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
    // GET CART
    builder
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
      });

    // ADD ITEM
    builder
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
      });

    // DELETE SINGLE ITEM
    builder
      .addCase(deleteCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = state.cart.filter((item) => item.productId !== action.payload);
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // DELETE MULTIPLE
    builder
      .addCase(deleteSelectedItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSelectedItems.fulfilled, (state, action) => {
        state.loading = false;
        const idsToRemove = action.payload;
        state.cart = state.cart.filter((item) => !idsToRemove.includes(item.productId));
      })
      .addCase(deleteSelectedItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // UPDATE QUANTITY
    builder
      .addCase(updateItemQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateItemQuantity.fulfilled, (state, action) => {
        state.loading = false;
        const { id, quantity } = action.payload;
        const item = state.cart.find((i) => i.productId === id);
        if (item) item.quantity = quantity;
      })
      .addCase(updateItemQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

      // MOVE TO WISHLIST

    builder
      .addCase(moveToWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(moveToWishlist.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.payload;
        state.cart = state.cart.filter((item) => item.productId !== id);
      } )
      .addCase(moveToWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});


export const { resetCart } = cartSlice.actions;
export default cartSlice.reducer;
