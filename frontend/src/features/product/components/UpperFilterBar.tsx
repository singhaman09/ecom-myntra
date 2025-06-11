import React, { useEffect, useState, type ChangeEvent } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import type { DrawerProps, UpperFilterProps } from '../interfaces/ProductInterfaces';
import styles from '../styles/UpperFilterBar.module.css'
import { useSearchParams } from 'react-router';
const UpperFilterBar:React.FC<UpperFilterProps>=({isDrawerOpen,setIsDrawerOpen,selectedBrands,selectedColors,selectedGender,selectedCategories,handleReset})=> {
  type SortOption = {
    value: string;
    label: string;
  };
  const sortOptions: SortOption[] = [
    { value: "price_asc", label: "Price: Low to High" },
    { value: "price_desc", label: "Price: High to Low" },
    { value: "new", label: "What's new ?" },
    { value: "rating", label: "Customer Rating" },
  ]; 
  const [searchParams,setSearchParams]=useSearchParams()
 const selectedSort=searchParams.get('sort') || ''
  useEffect(()=>{
    if(!searchParams.get('sort')){
      searchParams.append('sort','new')
      setSearchParams(searchParams,{replace:true})
    }
   },[])
  const handleChange=(e:any)=>{
       searchParams.delete('sort')
       searchParams.append('sort',e.target.value)
       setSearchParams(searchParams,{replace:true})
  }
  return (
    <div className={(selectedBrands.length>0 || selectedColors.length>0 || selectedCategories.length>0 || selectedGender)?`${styles.container} ${styles.shadow}`:`${styles.container}` }>  
        <div className={styles.sortDropdownContainer}>
    <label htmlFor="sort-select" className={styles.sortLabel}>
      Sort by:
    </label>
    <select
      id="sort-select"
      className={styles.sortSelect}
      value={selectedSort}
      onChange={(e) => handleChange(e) }
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