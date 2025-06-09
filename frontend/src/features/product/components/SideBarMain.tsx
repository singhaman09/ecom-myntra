import React, { useState,  type ChangeEvent } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { Slider } from "@mui/material";
import type { DrawerProps, SideBarMainProps } from "../interfaces/ProductInterfaces";
import styles from "../styles/SideBar.module.css";
import SideBarFilters from "./SideBarFilters";

export type Category = { name: string; count: number };
export type Brand = { name: string; count: number };
 export type Color = { name: string; count: number; color: string };

const categories: Category[] = [
  { name: "Dresses", count: 2534 },
  { name: "Kurta Sets", count: 28 },
  { name: "Ethnic Dresses", count: 1 }
];

const brands: Brand[] = [
  { name: "H&M", count: 2073 },
  { name: "V&M", count: 544 },
  { name: "Vedika M", count: 61 },
  { name: "Babita M", count: 44 },
  { name: "Oh Rare", count: 17 },
  { name: "M&H Juniors", count: 13 },
  { name: "Sencei", count: 2 },
  { name: "SOJANYA", count: 1 }
];

const colors: Color[] = [
  { name: "Black", count: 660, color: "#000000" },
  { name: "Blue", count: 584, color: "#0066CC" },
  { name: "Pink", count: 456, color: "#FF69B4" },
  { name: "White", count: 398, color: "#FFFFFF" },
  { name: "Red", count: 321, color: "#FF0000" },
  { name: "Green", count: 289, color: "#00AA00" }
];
const genderOptions = ["men", "women", "girls"] as const;
type Gender = typeof genderOptions[number];
const SidebarMain: React.FC<SideBarMainProps> = ({isDrawerOpen,setIsDrawerOpen,value,selectedCategories,selectedBrands,selectedColors,selectedGender,handleBrandChange,handleCategoryChange,handleGenderChange,handleReset,handleColorChange,handleChange,selectedPrice}) => {

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
    <SideBarFilters   data={categories} type="categories"   selectedData={selectedCategories} handleChange={handleCategoryChange}/>

     {/* Brand */}
     <SideBarFilters   data={brands} type="brands"   selectedData={selectedBrands} handleChange={handleBrandChange}/>

     {/* Price Range */}
     <div className={styles.section}>
       <h3 className={styles.sectionTitle}>PRICE</h3>
    <Slider value={selectedPrice.length>0?selectedPrice:value}  onChange={handleChange} max={value[1]} min={value[0]} className={styles.slider}/>
         <div className={styles.priceRangeRow}>
           <span>₹{selectedPrice.length>0 ?selectedPrice[0]:value[0]}</span>
           <span>₹{selectedPrice.length>0 ?selectedPrice[1]:value[1]}&nbsp;</span>
         </div>
       </div>
     

     {/* Color */}
     <SideBarFilters   data={colors} type="colors"   selectedData={selectedColors} handleChange={handleColorChange}/>
    </div>
   </div>
   </div>
 
  );
};

export default SidebarMain;
