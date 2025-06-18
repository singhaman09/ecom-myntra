import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import  type {  filters, getProductsInterface, SelectedProduct } from './interfaces/ProductInterfaces';
// Custom Axios instance
const customAxios = axios.create({
  baseURL: 'http://172.50.5.124:3000/products',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});


// Thunk for fetching products
export const getProducts = createAsyncThunk< 
  getProductsInterface,                          // Return type
  { filters: filters; slug: string | undefined,searchParams:URLSearchParams,page:Number },    // Argument type
  { rejectValue: string }                       // Rejection type
>(
  'products/getProducts',
  async ({ filters, slug='all',searchParams,page}, thunkAPI) => {
    try {
    const selectedSort=searchParams.get('sort') || 'new'
      // const currentPage=searchParams.get('page') || '1'
      const response = await customAxios.get(`/${slug}`, {
        params: { category:filters.category.toString(),subCategory:filters.subCategory.toString(),brand:filters.brand.toString(),color:filters.color.toString(),gender:filters.gender,price:filters.price.toString(),sort:selectedSort,page:page}
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Thunk for fetching product details
export const getProductDetails = createAsyncThunk<  
SelectedProduct,                 
  string | undefined,                                     
  { rejectValue: string }                     
>(
  'products/getProductDetails',
  async (id, thunkAPI) => {
    try {
      const response = await customAxios.get<SelectedProduct>(`/details/${id}`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

