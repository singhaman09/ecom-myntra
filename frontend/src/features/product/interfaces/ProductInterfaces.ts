import type React from "react";
import type { Brand, Category, Color } from "../components/SideBarMain";

export interface Product {
  id: string;
  image: string;
  brand: string;
  title: string;
  originalPrice: number;
  discountedPrice: number;
  rating: number;
  ratingCount: number;
  isWishlisted?: boolean;
  }
  interface filtersSelectedData{
    selectedCategories:string[],
    selectedBrands:string[],
    selectedColors:string[],
    selectedGender:string,
  }
 export interface ProductCardProps  {
    product: Product;
  }
  export interface ProductListProps extends filtersSelectedData {
    isSimilar:Boolean;
    selectedCategories:string[],
    selectedBrands:string[],
    selectedColors:string[],
    selectedGender:string
  }
 export interface PaginationProps {    
    pageCount: number;
  }
  export interface DrawerProps{isDrawerOpen:Boolean;setIsDrawerOpen:(value: Boolean) => void
  }
 export interface SideBarMainProps extends DrawerProps,filtersSelectedData{
    handleCategoryChange:(value:string,checked:boolean)=>void,
    handleBrandChange:(value:string,checked:boolean)=>void,
    handleColorChange:(value:string,checked:boolean)=>void,
    handleGenderChange:(value:string,checked:boolean)=>void,
    handleReset:(value:string,key:string)=>void
    handleChange:(event: Event, newValue: number[])=>void
    selectedPrice:number[]
    value:number[]
  }
 export interface UpperFilterProps extends DrawerProps,filtersSelectedData{
    handleReset:(value:string,key:string)=>void,
  
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
  
 export interface ReviewSectionProps {
    productId: string;
  }
  interface CartItem {
    _id: string;       
    quantity: number;
  }
 export interface SelectedProduct {
    product:Product
    reviews:Review[],
    similarProducts:Product[]
  }
 export interface ProductState {
    products: Product[];
    selectedProduct: SelectedProduct | null;
    sideBarData:{} | null;
    cart: CartItem [];
    wishlist: string[]; 
    loading: boolean;
    error: string | null;
  }
  export interface SideFilterProps{
      data: (Category | Brand | Color)[],
      type: string;
      selectedData:string[]
      handleChange:(name:string,checked:boolean)=>void
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
