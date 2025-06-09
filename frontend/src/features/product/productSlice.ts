
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product, ProductState, SelectedProduct } from './interfaces/ProductInterfaces';

const initialState: ProductState = {
  products: [],
  selectedProduct:null,
  cart: [],
  wishlist: [],
  sideBarData:null,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
      
    },
    setSideBarData(state,action){
      state.sideBarData=action.payload
    },
    setSelectedProduct(state, action: PayloadAction<SelectedProduct>) {
      state.selectedProduct = action.payload;
    },
    likeReviews(state, action) {
      if (state.selectedProduct) {
        state.selectedProduct.reviews = state.selectedProduct.reviews.map(
          (val) =>
            val.id === action.payload
              ? { ...val, helpful: val.helpful + 1 }
              : val
        );
      }
    },
    disLikeReviews(state, action) {
      if (state.selectedProduct) {
        state.selectedProduct.reviews = state.selectedProduct.reviews.map(
          (val) =>
            val.id === action.payload
              ? { ...val, helpful: val.helpful - 1 }
              : val
        );
      }
    },
    addToCart(state, action: PayloadAction<string>) {
        const id = action.payload;
        const item = state.cart.find(i => i._id === id);
        if (item) {
          item.quantity += 1;
        } else {
          state.cart.push({ _id: id, quantity: 1 });
        }
      },
    toggleWishlist(state, action: PayloadAction<string>) {
      const id = action.payload;
      if (state.wishlist.includes(id)) {
        state.wishlist = state.wishlist.filter(w => w !== id);
      } else {
        state.wishlist.push(id);
      }
    },
  },
});

export const {
  setSelectedProduct,
  addToCart,
  toggleWishlist,
  setProducts,
  setSideBarData,
  likeReviews,disLikeReviews
} = productSlice.actions;

export default productSlice.reducer;
