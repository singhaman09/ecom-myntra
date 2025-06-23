import axios from 'axios';
import qs from 'qs';
import { createAsyncThunk } from '@reduxjs/toolkit';
import  type {   getProductsInterface, SelectedProduct } from './interfaces/ProductInterfaces';
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
  {  slug: string | undefined,searchParams:URLSearchParams,page:Number },    // Argument type
  { rejectValue: string }                       // Rejection type
>(
  'products/getProducts',
  async ({  slug='all',searchParams,page}, thunkAPI) => {
    try {
    const selectedSort=searchParams.get('sort') || 'new'
   const category=searchParams.get('category')?.split(',')
   const subCategory=searchParams.get('subCategory')?.split(',')
   const color=searchParams.get('color')?.split(',')
   const  brand=searchParams.get('brand')?.split(',')
   const price=searchParams.get('price')?.split(',').map(Number) || []
   const gender=searchParams.get('gender') || undefined
   const params = {
    category,
    subCategory,
    brand,
    color,
    gender,
    price: price ? price.toString() : undefined,
    sort: selectedSort,
    page
  };
  
  const response = await customAxios.get(`/${slug}`, {
    params,
    paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' })
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

