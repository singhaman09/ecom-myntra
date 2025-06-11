import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import  type {  getProductsInterface, Product, SelectedProduct } from './interfaces/ProductInterfaces';
import { colors } from '@mui/material';

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
  { searchParams: URLSearchParams; slug: string },            // Argument type
  { rejectValue: string }                       // Rejection type
>(
  'products/getProducts',
  async ({ searchParams, slug }, thunkAPI) => {
    try {
      // You can use filters and slug in your request if needed
      const selectedCategories=searchParams.getAll("category")
      const selectedBrands=searchParams.getAll("brand")
      const selectedColors=searchParams.getAll("color")
      const selectedGender=searchParams.get("gender") || ''
      const selectedPrice=searchParams.get('price')?.split(',').map(Number) || []
      const selectedSort=searchParams.get('sort') || ''
      const currentPage=searchParams.get('page') || ''
      const response = await customAxios.get('', {
        params: { subCategory:selectedCategories.toString(),brand:selectedBrands.toString(),colors:selectedColors.toString(),gender:selectedGender,price:selectedPrice.toString(),sort:selectedSort,page:currentPage, slug }
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
      const response = await customAxios.get<SelectedProduct>(`/${id}`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

