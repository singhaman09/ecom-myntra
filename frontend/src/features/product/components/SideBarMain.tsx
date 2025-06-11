import React from "react";
import { Slider } from "@mui/material";
import type { SideBarMainProps } from "../interfaces/ProductInterfaces";
import styles from "../styles/SideBar.module.css";
import SideBarFilters from "./SideBarFilters";
import { useAppSelector } from "../hooks/storeHooks";
 export type Color = { name: string;}
const colors = [
    "White",
    "Red",
   "Green"   
];
const genderOptions = ["men", "women", "girls"] as const;
type Gender = typeof genderOptions[number];
const SidebarMain: React.FC<SideBarMainProps> = ({isDrawerOpen,setIsDrawerOpen,selectedCategories,selectedBrands,selectedColors,selectedGender,handleBrandChange,handleCategoryChange,handleGenderChange,handleReset,handleColorChange,handleChange,selectedPrice}) => {
  const data=useAppSelector(state=>state.product)
  return (
   <div className={`${styles.container} ${isDrawerOpen ? styles.open : ""}`}>
   <div >
      <button className={styles.closeButton} onClick={()=>setIsDrawerOpen(false)}>Close</button>
     <div className={`${styles.filterHeader}`}>
        <p>FILTERS</p>
        {(selectedBrands.length>0 || selectedCategories.length>0|| selectedColors.length>0|| selectedGender || selectedPrice.length>0) && <p className={styles.clearFilter} onClick={()=>handleReset('all','')}>CLEAR ALL</p> }
      </div>
    <div className={styles.filteredContainer}>
    <div className={styles.section}>
       <div className={styles.radioGroup}>
         {genderOptions.map((gender) => (
           <label key={gender} className={styles.radioRow}>
             <input
               type="radio"
               name="gender"
               value={gender}
               checked={selectedGender === gender}
               onChange={(e) => handleGenderChange(gender,e.target.checked)}
             />
             <span className={styles.checkboxLabel} style={{ fontWeight: 500 }}>
               {gender.charAt(0).toUpperCase() + gender.slice(1)}
             </span>
           </label>
         ))}
       </div>
     </div>

     {/* Categories */}
    {data.sideBarData?.subCategories && <SideBarFilters   data={data.sideBarData?.subCategories} type="categories"   selectedData={selectedCategories} handleChange={handleCategoryChange}/>}

     {/* Brand */}
     {data.sideBarData?.brands && <SideBarFilters   data={data.sideBarData?.brands} type="brands"   selectedData={selectedBrands} handleChange={handleBrandChange}/>}

     {/* Price Range */}
     <div className={styles.section}>
       <h3 className={styles.sectionTitle}>PRICE</h3>
     <Slider value={selectedPrice.length>0?selectedPrice:data.sideBarData?[data.sideBarData?.lowestPrice,data.sideBarData?.highestPrice]:[0,1000]}  onChange={handleChange} max={data.sideBarData?data.sideBarData.highestPrice:1000} min={data.sideBarData?data.sideBarData.lowestPrice:0} className={styles.slider}/>
         <div className={styles.priceRangeRow}>
           <span>₹{selectedPrice.length>0 ?selectedPrice[0]:data.sideBarData?data.sideBarData.lowestPrice:0}</span>
           <span>₹{selectedPrice.length>0 ?selectedPrice[1]:data.sideBarData?data.sideBarData.highestPrice:1000}&nbsp;</span>
         </div>
       </div>
     

     {/* Color */}
     {data.sideBarData?.colors && <SideBarFilters   data={data.sideBarData?.colors} type="colors"   selectedData={selectedColors} handleChange={handleColorChange}/>}
    </div>
   </div>
   </div>
 
  );
};

export default SidebarMain;
