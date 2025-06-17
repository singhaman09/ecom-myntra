import React from 'react';
import styles from '../styles/ProductList.module.css';
import type { ProductListProps } from '../interfaces/ProductInterfaces';
import { useProductSelector } from '../hooks/storeHooks';

//Lazy Load Components
const ProductCard=React.lazy(()=>import('./ProductCard'));
const ProductList: React.FC<ProductListProps> = ({
  data,
}) => {
 const result=useProductSelector(state=>state.product)
  return (
 <div className={styles.border}>
     {result.products.length >0 &&    <p style={{ marginLeft: '20px' }}>
    Showing {result.products.length}  of&nbsp;
    {result.totalProducts} products
  </p>}
    <div className={`${styles.listContainer}`}>
      {data.map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
 </div>
  );
};

export default React.memo(ProductList);
