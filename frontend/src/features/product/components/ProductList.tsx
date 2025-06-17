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
 <div>
     {result.products.length >0 &&    <p style={{ marginLeft: '20px' }}>
    Showing {result.skip + 1} -{' '}
    {result.limit + result.skip > result.totalProducts
      ? result.totalProducts
      : result.limit + result.skip}{' '}
    entries of {result.totalProducts}
  </p>}
    <div className={`${styles.listContainer} ${styles.border}`}>
       
      {data.map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
 </div>
  );
};

export default React.memo(ProductList);
