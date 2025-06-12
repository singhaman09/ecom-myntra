
import { createSlice} from '@reduxjs/toolkit';
import type {  ProductState } from './interfaces/ProductInterfaces';
import { getProductDetails, getProducts } from './productAPI';

const initialState: ProductState = {
  products: [],
  selectedProduct:null,
  sideBarData:null,
  loading: false,
  error: null,
  totalProducts:0,
  limit:1,
  skip:0
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: { 
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
        state.totalProducts=action.payload.totalProducts
        state.limit=action.payload.limit
        state.skip=action.payload.skip
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
} = productSlice.actions;

export default productSlice.reducer;
