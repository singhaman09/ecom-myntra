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
    category: string[];
    subCategory: string[];
    brand: string[];
    color: string[];
    gender: string;
    price: number[];
  }
  export interface UpperFilterProps  {
    setIsDrawerOpen:(value:boolean)=>void
    setPage:(val:number)=>void
  }
  
  export interface SideFilterProps {
    data: string[];
    type: string;
    selectedData: string[];
    handleChange: (name: string, checked: boolean) => void;
  }