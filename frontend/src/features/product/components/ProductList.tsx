import React, { useState } from 'react'
export const products = [
    {
      id: "1",
      image: "https://m.media-amazon.com/images/I/71tV8h2PJlL.jpg",
      brand: "Apple",
      title: "iPhone 14 Pro 128GB Deep Purple",
      originalPrice: 129999,
      discountedPrice: 119999,
      rating: 4.7,
      ratingCount: 1243,
      isWishlisted: true,
    },
    {
      id: "2",
      image: "https://m.media-amazon.com/images/I/71tV8h2PJlL.jpg",
      brand: "Samsung",
      title: "Galaxy S22 Ultra 5G 256GB Phantom Black",
      originalPrice: 109999,
      discountedPrice: 99999,
      rating: 4.5,
      ratingCount: 987,
      isWishlisted: false,
    },
    {
      id: "3",
      image: "https://m.media-amazon.com/images/I/71tV8h2PJlL.jpg",
      brand: "Sony",
      title: "WH-1000XM5 Wireless Noise Cancelling Headphones",
      originalPrice: 34999,
      discountedPrice: 29999,
      rating: 4.8,
      ratingCount: 652,
      isWishlisted: false,
    },
    {
      id: "4",
      image: "https://m.media-amazon.com/images/I/71tV8h2PJlL.jpg",
      brand: "Apple",
      title: "MacBook Air M2 13-inch, 256GB SSD, Space Gray",
      originalPrice: 124999,
      discountedPrice: 109999,
      rating: 4.9,
      ratingCount: 321,
      isWishlisted: true,
    },
    
  ];
import styles from '../styles/ProductList.module.css'
import ProductCard from './ProductCard';
import type { ProductListProps } from '../interfaces/ProductInterfaces';

const ProductList:React.FC<ProductListProps>=({isSimilar,selectedBrands,selectedCategories,selectedColors,selectedGender})=> {
    const PAGE_SIZE=10
    const [visibleProducts, setVisibleProducts] = useState(products.slice(0, PAGE_SIZE));
  return (
  <div className={(selectedBrands?.length>0 || selectedColors?.length>0 || selectedCategories?.length>0 || selectedGender)?`${styles.listContainer}`:`${styles.listContainer} ${styles.border}` }>
    {visibleProducts.map(product => (
     <ProductCard  product={product} />
 ))}
 </div>
  )
}

export default ProductList