import React, { useEffect, useState } from 'react'
import Breadcrumbs from '../../../utils/BreadCrumbs';
import SideBarMain from '../components/SideBarMain';
import styles from '../styles/ProductPage.module.css'
import ProductList, { products } from '../components/ProductList';
import UpperFilterBar from '../components/UpperFilterBar';
import Pagination from '../components/Pagination';
import { useSearchParams } from 'react-router';
const ProductPage :React.FC =()=> {
   const [isDrawerOpen,setIsDrawerOpen]=useState<Boolean>(false)
    const [searchParams,setSearchParams]=useSearchParams()
    const [value, setValue] = React.useState<number[]>([200, 10200])
     const selectedCategories=searchParams.getAll("category")
     const selectedBrands=searchParams.getAll("brand")
     const selectedColors=searchParams.getAll("color")
     const selectedGender=searchParams.get("gender") || ''
     const selectedPrice=searchParams.get('price')?.split(',').map(Number) || []
  
     const handleCategoryChange = (category: string, checked: boolean) => {
      let newCategories: string[];
      if (checked) {
        newCategories = [...selectedCategories, category];
      } else {
        newCategories = selectedCategories.filter((c) => c !== category);
      }
      searchParams.delete('category')
      newCategories.forEach((cat) => searchParams.append("category", cat));
      setSearchParams(searchParams, { replace: true });
    
    };
  
    const handleBrandChange = (brand: string, checked: boolean) => {
      let newBrands: string[];
      if (checked) {
        newBrands = [...selectedBrands, brand];
      } else {
        newBrands = selectedCategories.filter((c) => c !== brand);
      }
     searchParams.delete('brand')
      newBrands.forEach((bra) => searchParams.append("brand", bra));
      setSearchParams(searchParams, { replace: true });
    };
  
    const handleColorChange = (color: string, checked: boolean) => {
      let newColors: string[];
      if (checked) {
        newColors = [...selectedColors, color];
      } else {
        newColors = selectedCategories.filter((c) => c !== color);
      }
      searchParams.delete('color')
      newColors.forEach((col) => searchParams.append("color", col));
      setSearchParams(searchParams, { replace: true });
    };
    const handleGenderChange = (gender: string, checked: boolean) => { 
     searchParams.delete("gender")
     searchParams.append("gender", gender)
   setSearchParams(searchParams, { replace: true });
    };
    const handleReset=(value:string,key:string)=>{
     if(value==='all'){
      searchParams.delete('category')
      searchParams.delete('brand')
      searchParams.delete('color')
      searchParams.delete('gender')
      searchParams.delete('price')
      setSearchParams(searchParams,{replace:true})
     }
     else{
     const newParams=new URLSearchParams(searchParams.toString())
       newParams.delete(key,value)
       setSearchParams(newParams,{replace:true})
     }
    }
    const handleChange = (event: Event, newValue: number[]) => {
      searchParams.delete('price')
      searchParams.append('price',newValue.toString())
      setSearchParams(searchParams,{replace:true})
    };
    const limit=10
  return (
    <div>
      <div className={styles.container} >
        <Breadcrumbs/>
        <div className={styles.sideBarContainer}>
       <SideBarMain isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} value={value} handleBrandChange={handleBrandChange} handleCategoryChange={handleCategoryChange} handleColorChange={handleColorChange} handleReset={handleReset} handleGenderChange={handleGenderChange} selectedBrands={selectedBrands} selectedCategories={selectedCategories} selectedGender={selectedGender} selectedColors={selectedColors}  handleChange={handleChange} selectedPrice={selectedPrice}/>
      <div className={styles.sortContainer}>
       <UpperFilterBar isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen}  handleReset={handleReset} selectedBrands={selectedBrands} selectedColors={selectedColors} selectedCategories={selectedCategories} selectedGender={selectedGender}/>
       <ProductList isSimilar={false} selectedBrands={selectedBrands} selectedColors={selectedColors} selectedCategories={selectedCategories} selectedGender={selectedGender}/>
       <Pagination pageCount={Math.ceil(products.length/limit)}/>
        </div>
    </div>
    {isDrawerOpen && (
    <div
      className={styles.overlay}
      onClick={() => setIsDrawerOpen(false)}
      aria-hidden="true"
    />
  )}
     </div>
    </div>
  )
}

export default ProductPage 