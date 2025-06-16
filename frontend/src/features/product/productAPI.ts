import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import  type {  getProductsInterface, SelectedProduct } from './interfaces/ProductInterfaces';
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
  { searchParams: URLSearchParams; slug: string | undefined },    // Argument type
  { rejectValue: string }                       // Rejection type
>(
  'products/getProducts',
  async ({ searchParams, slug='all'}, thunkAPI) => {
    try {
      const selectedCategories=searchParams.getAll("category")
      const selectedSubCategories=searchParams.getAll("subCategory")
      const selectedBrands=searchParams.getAll("brand")
      const selectedColors=searchParams.getAll("color")
      const selectedGender=searchParams.get("gender") || ''
      const selectedPrice=searchParams.get('price')
      const selectedSort=searchParams.get('sort') || ''
      const currentPage=searchParams.get('page') || '1'
      const response = await customAxios.get(`/${slug}`, {
        params: { category:selectedCategories.toString(),subCategory:selectedSubCategories.toString(),brand:selectedBrands.toString(),color:selectedColors.toString(),gender:selectedGender,price:selectedPrice,sort:selectedSort,page:currentPage}
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

