import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import type { DrawerProps, UpperFilterProps } from '../interfaces/ProductInterfaces';
import styles from '../styles/UpperFilterBar.module.css'
const UpperFilterBar:React.FC<UpperFilterProps>=({isDrawerOpen,setIsDrawerOpen,selectedBrands,selectedColors,selectedGender,selectedCategories,handleReset})=> {
  type SortOption = {
    value: string;
    label: string;
  };
  const sortOptions: SortOption[] = [
    { value: "relevance", label: "Relevance" },
    { value: "priceLowHigh", label: "Price: Low to High" },
    { value: "priceHighLow", label: "Price: High to Low" },
    { value: "newest", label: "Newest First" },
    { value: "rating", label: "Customer Rating" },
  ]; 
  const [sort, setSort] = useState("relevance");
  return (
    <div className={(selectedBrands.length>0 || selectedColors.length>0 || selectedCategories.length>0 || selectedGender)?`${styles.container} ${styles.shadow}`:`${styles.container}` }>  
        <div className={styles.sortDropdownContainer}>
    <label htmlFor="sort-select" className={styles.sortLabel}>
      Sort by:
    </label>
    <select
      id="sort-select"
      className={styles.sortSelect}
      value={sort}
      onChange={(e) => setSort(e.target.value)}
    >
      {sortOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    <button onClick={() => setIsDrawerOpen(true)} className={styles.btn}>
    Filters
  </button>
  </div>
        <div className={styles.filterContainer}>
       {selectedGender &&  <div className={styles.innerContainer} >
         <p>{selectedGender}</p>
         <button className={styles.button} onClick={()=>handleReset(selectedGender,"gender")}><CloseIcon/></button>
         </div>}
         {selectedCategories.map((val:string,index:number)=>(
          <div className={styles.innerContainer} key={index}>
         <p>{val}</p>
         <button className={styles.button} onClick={()=>handleReset(val,"category")}><CloseIcon/></button>
         </div>
         ))}
          {selectedBrands.map((val:string,index:number)=>(
          <div className={styles.innerContainer} key={index}>
         <p>{val}</p>
         <button className={styles.button} onClick={()=>handleReset(val,"brand")}><CloseIcon/></button>
         </div>
         ))}
          {selectedColors.map((val:string,index:number)=>(
            <div className={styles.innerContainer} key={index}>
            <p>{val}</p>
            <button className={styles.button} onClick={()=>handleReset(val,"color")}><CloseIcon/></button>
            </div>
         ))}
         
        </div>
    </div>
  )
}

export default UpperFilterBar