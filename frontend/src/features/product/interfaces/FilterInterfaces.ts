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
    category: string[] |undefined;
    subCategory: string[]|undefined;
    brand: string[]|undefined;
    color: string[]|undefined;
    gender: string;
    price: number[]|undefined;
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