import type React from "react";
import type { Review } from "./ReviewInterfaces";
import type { filters, sideBarInterface } from "./FilterInterfaces";

// 1. Product and Related Interfaces
interface image{
  url:string,
  isPrimary:boolean
}
export interface Product {
  _id: string;
  images: image[];
  brand: string;
  name: string;
  price: number;
  category: string;
  subCategory: string;
  totalStock: number;
  createdAt: string;
  updatedAt: string;
  description:string;
  reviews:Review []
  variants:variant[]
}


interface variant{
  size:string,
  color:string,
  _id:string,
  stock:number,
  productId:string,
}

export interface SelectedProduct {
  product:Product;
  similarProducts: Product[];
}

// 3. Product List & Card Props
export interface ProductCardProps {
  product: Product;
}

export interface ProductListProps {
 data:Product[];
 isSimilar:boolean
}

// 4. Pagination & Drawer Props


export interface DrawerProps {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (value: boolean) => void;
}

// 5. Sidebar & Upper Filter Props
export interface SideBarMainProps extends DrawerProps {
  handleCategoryChange: (value: string, checked: boolean) => void;
  handleSubCategoryChange: (value: string, checked: boolean) => void;
  handleBrandChange: (value: string, checked: boolean) => void;
  handleColorChange: (value: string, checked: boolean) => void;
  handleGenderChange: (value: string, checked: boolean) => void;
  handleReset: () => void;
  handleChange: (event: Event | React.SyntheticEvent, newValue: number[]) => void;
  filters:filters
  apply:()=>void
}



// 6. Review Section & Card Props
export interface ProductState {
  products: Product[];
  selectedProduct: SelectedProduct | null;
  sideBarData: sideBarInterface | null;
  loading: boolean;
  error: string | null;
  totalProducts:number,
  limit:number,
  skip:number
}

export interface getProductsInterface {
  products: Product[];
  sideBar: sideBarInterface;
  totalProducts:number
  limit:number,
  skip:number
}


export interface Shade {
  id: number;
  color: string;
  name: string;
}

export interface Size {
  id: number;
  label: string;
}

