import qs from 'qs';
import { createAsyncThunk } from '@reduxjs/toolkit';
import  type {   getProductsInterface, SelectedProduct } from './interfaces/ProductInterfaces';
import apiClient from '../../services/apiClient';
import { TAB_KEYS } from './Product.enum';

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
   const category=searchParams.get(TAB_KEYS.CATEGORY)?.split(',')
   const subCategory=searchParams.get(TAB_KEYS.SUBCATEGORY)?.split(',')
   const color=searchParams.get(TAB_KEYS.COLOR)?.split(',')
   const  brand=searchParams.get(TAB_KEYS.BRAND)?.split(',')
   const price=searchParams.get(TAB_KEYS.PRICE)?.split(',').map(Number) || []
   const gender=searchParams.get(TAB_KEYS.GENDER) || undefined
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

const queryString = qs.stringify(params, { arrayFormat: 'repeat' });
const url = `${import.meta.env.VITE_PRODUCT_API_URL}/${slug}?${queryString}`;
const response = await apiClient.get(url, { skipAuth: false });
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
      const response = await apiClient.get<SelectedProduct>(`http://0.0.0.0:3000/products/details/${id}`,{skipAuth:true});
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

