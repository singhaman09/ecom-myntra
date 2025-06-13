import React, { useMemo } from 'react';
import styles from '../styles/ProductList.module.css';
import type { ProductListProps } from '../interfaces/ProductInterfaces';
import { useProductSelector } from '../hooks/storeHooks';
//Lazy Load Components
const ProductCard=React.lazy(()=>import('./ProductCard'));

const ProductList: React.FC<ProductListProps> = ({
  isSimilar,
  selectedBrands,
  selectedCategories,
  selectedColors,
  selectedGender,
  selectedSubCategories
}) => {
  const data = useProductSelector(state => state.product);
  // Determine which products to show
  const products = useMemo(() => {
    if (isSimilar) {
      return data.selectedProduct?.similarProducts ?? [];
    }
    return data.products ?? [];
  }, [isSimilar, data.selectedProduct?.similarProducts, data.products]);

  // Compute container className
  const hasFilters =
    (selectedBrands?.length ?? 0) > 0 ||
    (selectedColors?.length ?? 0) > 0 ||
    (selectedCategories?.length ?? 0) > 0 ||
    !!selectedGender ||
    (selectedSubCategories?.length ?? 0) > 0;

  const containerClass = hasFilters
    ? styles.listContainer
    : `${styles.listContainer} ${styles.border}`;

  return (
    <div className={containerClass}>
      {products.map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default React.memo(ProductList);
