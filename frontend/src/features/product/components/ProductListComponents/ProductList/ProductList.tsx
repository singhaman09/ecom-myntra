import React from 'react';
import styles from './ProductList.module.css';
import type { ProductListProps } from '../../../interfaces/ProductInterfaces';
import { useProductSelector } from '../../..//hooks/storeHooks';

//Lazy Load Components
const ProductCard=React.lazy(()=>import('../ProductCard/ProductCard'));
const ProductList: React.FC<ProductListProps> = ({
  data,
  isSimilar=false
}) => {
 const result=useProductSelector(state=>state.product)
  return (
 <div className={styles.border}>
     {!isSimilar && result.products.length >0 &&    <p style={{ marginLeft: '20px',fontFamily:'Work sans' }}>
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
