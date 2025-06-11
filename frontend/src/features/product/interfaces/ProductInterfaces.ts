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
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
  helpful: number;
  size?: string;
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
  reviews: Review[];
  similarProducts: Product[];
}

// 2. Sidebar & Filtering Interfaces
interface sideBarInterface {
  brands: string[];
  subCategories: string[];
  highestPrice: number;
  lowestPrice: number;
  colors: string[];
}

interface filtersSelectedData {
  selectedCategories: string[];
  selectedBrands: string[];
  selectedColors: string[];
  selectedGender: string;
}

// 3. Product List & Card Props
export interface ProductCardProps {
  product: Product;
}

export interface ProductListProps extends filtersSelectedData {
  isSimilar: boolean;
  selectedCategories: string[];
  selectedBrands: string[];
  selectedColors: string[];
  selectedGender: string;
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
  handleBrandChange: (value: string, checked: boolean) => void;
  handleColorChange: (value: string, checked: boolean) => void;
  handleGenderChange: (value: string, checked: boolean) => void;
  handleReset: (value: string, key: string) => void;
  handleChange: (event: Event, newValue: number[]) => void;
  selectedPrice: number[];
}

export interface UpperFilterProps extends DrawerProps, filtersSelectedData {
  handleReset: (value: string, key: string) => void;
}

export interface SideFilterProps {
  data: string[] | undefined;
  type: string;
  selectedData: string[];
  handleChange: (name: string, checked: boolean) => void;
}

// 6. Review Section & Card Props
export interface ReviewSectionProps {
  productId: string;
}

export interface ReviewFormProps {
  onSubmit: (review: {
    rating: number;
    title: string;
    comment: string;
    userName: string;
  }) => void;
  onCancel: () => void;
}

export interface ReviewCardProps {
  id: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
  helpful: number;
  size?: string;
}


export interface ProductState {
  products: Product[];
  selectedProduct: SelectedProduct | null;
  sideBarData: sideBarInterface | null;
  loading: boolean;
  error: string | null;
}

export interface getProductsInterface {
  products: Product[];
  sideBar: sideBarInterface;
}
