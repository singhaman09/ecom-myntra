import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import  type {  filters, getProductsInterface, SelectedProduct } from './interfaces/ProductInterfaces';
// Custom Axios instance
const customAxios = axios.create({
  baseURL: 'http://0.0.0.0:3000/products',
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
   const category=searchParams.getAll('category')
   const subCategory=searchParams.getAll('subCategory')
   const color=searchParams.getAll('color')
   const  brand=searchParams.getAll('brand')
   const price=searchParams.get('price')?.split(',').map(Number) || []
   const gender=searchParams.get('gender') || undefined
      const response = await customAxios.get(`/${slug}`, {
        params: { category:category.toString(),subCategory:subCategory.toString(),brand:brand.toString(),color:color.toString(),gender:gender,price:price.toString(),sort:selectedSort,page:page}
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

