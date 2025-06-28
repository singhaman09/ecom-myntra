import type { TAB_KEYS } from "../Product.enum";

export interface sideBarInterface {
    brands: string[];
    subCategories: string[];
    highestPrice: number;
    lowestPrice: number;
    colors: string[];
    genders:string[]
    categories:string[]
  }
  export interface filters{
  [TAB_KEYS.CATEGORY]: string[] ;
  [TAB_KEYS.SUBCATEGORY]: string[] ;
  [TAB_KEYS.BRAND]: string[];
  [TAB_KEYS.COLOR]: string[] ;
  [TAB_KEYS.GENDER]: string ;
  [TAB_KEYS.PRICE]: number[] ;
  }
  export interface UpperFilterProps  {
    setIsDrawerOpen:(value:boolean)=>void
    setPage:(val:number)=>void
  }
  
  export interface SideFilterProps {
    data: string[];
    type: string;
    selectedData: string[] | undefined;
    handleChange: (name: string, checked: boolean) => void;
  }