import React, { useState } from 'react'

import styles from '../styles/ProductList.module.css'
import ProductCard from './ProductCard';
import type { ProductListProps } from '../interfaces/ProductInterfaces';
import { useAppSelector } from '../hooks/storeHooks';

const ProductList:React.FC<ProductListProps>=({isSimilar,selectedBrands,selectedCategories,selectedColors,selectedGender})=> {
    const PAGE_SIZE=10
    const data=useAppSelector(state=>state.product)
  return (
  <div className={(selectedBrands?.length>0 || selectedColors?.length>0 || selectedCategories?.length>0 || selectedGender)?`${styles.listContainer}`:`${styles.listContainer} ${styles.border}` }>
    {data.products.slice(0,PAGE_SIZE).map(product => (
     <ProductCard  product={product} />
 ))}
 </div>
  )
}

export default ProductList