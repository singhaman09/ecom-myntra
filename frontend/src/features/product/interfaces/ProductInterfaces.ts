import type React from "react";

// 1. Product and Related Interfaces
export interface Product {
  _id: string;
  imageUrl: string;
  brand: string;
  name: string;
  price: number;
  category: string;
  subCategory: string;
  totalStock: number;
  createdAt: Date;
  updatedAt: Date;
  description:string;
  reviews:Review []
}

export interface Review {
  _id: string;
  reviewerName: string;
  rating: number;
  title: string;
  comment: string;
  createdAt: string;
}
interface variant{
  size:string,
  color:string,
  _id:string,
  stock:number,
  productId:string,
}
interface productDetails extends Product{
  variants:variant[]
}
export interface SelectedProduct {
  product: productDetails;
  similarProducts: Product[];
}

// 2. Sidebar & Filtering Interfaces
interface sideBarInterface {
  brands: string[];
  subCategories: string[];
  highestPrice: number;
  lowestPrice: number;
  colors: string[];
  genders:string[]
  categories:string[]
}

interface filtersSelectedData {
  selectedCategories: string[];
  selectedBrands: string[];
  selectedColors: string[];
  selectedGender: string;
  selectedSubCategories:string[]
}

// 3. Product List & Card Props
export interface ProductCardProps {
  product: Product;
}

export interface ProductListProps extends filtersSelectedData {
  isSimilar: boolean;
}

// 4. Pagination & Drawer Props
export interface PaginationProps {
  pageCount: number;
}

export interface DrawerProps {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (value: boolean) => void;
}

// 5. Sidebar & Upper Filter Props
export interface SideBarMainProps extends DrawerProps, filtersSelectedData {
  handleCategoryChange: (value: string, checked: boolean) => void;
  handleSubCategoryChange: (value: string, checked: boolean) => void;
  handleBrandChange: (value: string, checked: boolean) => void;
  handleColorChange: (value: string, checked: boolean) => void;
  handleGenderChange: (value: string, checked: boolean) => void;
  handleReset: (value: string, key: string) => void;
  handleChange: (event: Event | React.SyntheticEvent, newValue: number[]) => void;
  selectedPrice: number[];
}

export interface UpperFilterProps extends  filtersSelectedData {
  handleReset: (value: string, key: string) => void;
  setIsDrawerOpen:(value:boolean)=>void
}

export interface SideFilterProps {
  data: string[] | undefined;
  type: string;
  selectedData: string[];
  handleChange: (name: string, checked: boolean) => void;
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
 export interface ImageZoomOnHoverProps {
  src: string;
  alt?: string;
  zoomScale?: number;
  gridSize?: number;
}