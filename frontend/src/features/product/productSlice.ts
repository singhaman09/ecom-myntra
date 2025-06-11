
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {  ProductState, SelectedProduct } from './interfaces/ProductInterfaces';
import { getProductDetails, getProducts } from './productAPI';

const initialState: ProductState = {
  products: [],
  selectedProduct:null,
  sideBarData:null,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // setProducts(state, action: PayloadAction<Product[]>) {
    //   state.products = action.payload;
      
    // },
    // setSideBarData(state,action){
    //   state.sideBarData=action.payload
    // },
    // setSelectedProduct(state, action: PayloadAction<SelectedProduct>) {
    //   state.selectedProduct = action.payload;
    // },
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
    // addToCart(state, action: PayloadAction<string>) {
    //     const id = action.payload;
    //     state.cart.push(id);
    //   },
    //   removeFromCart(state,action:PayloadAction<string>){
    //     const id = action.payload;
    //     state.cart=state.cart.filter(val=>val!=id);
    //   },
    // toggleWishlist(state, action: PayloadAction<string>) {
    //   const id = action.payload;
    //   if (state.wishlist.includes(id)) {
    //     state.wishlist = state.wishlist.filter(w => w !== id);
    //   } else {
    //     state.wishlist.push(id);
    //   }
    // },
  },
  extraReducers: (builder) => {
    builder
      // Handle getProducts thunk
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.sideBarData=action.payload.sideBar
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch products';
      })

      // Handle getProductDetails thunk
      .addCase(getProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch product details';
      });
  },
});


export const {
  likeReviews,disLikeReviews,
} = productSlice.actions;

export default productSlice.reducer;
