import React, { memo } from 'react';
import styles from './css/ProductSection.module.css';
import ProductCard from '../../product/components/ProductListComponents/ProductCard/ProductCard';
import { useNavigate } from 'react-router-dom';

interface ProductSectionProps {
  title: string;
  products: Array<{ _id: string; [key: string]: any }>;
  backgroundColor?: string;
}

const ProductSection: React.FC<ProductSectionProps> = ({ title, products, backgroundColor = 'white' }) => {
  const navigate = useNavigate();
  return (
    <section className={`${styles.section} ${backgroundColor === 'gray' ? styles.grayBg : ''}`}>
      <div className={styles.container}>
        
        {/* Section Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button className={styles.viewAllButton} onClick={() => {navigate('/products');}}>View All</button>
        </div>
        
        {/* Grid of products */}
        <div className={styles.productsGrid}>
          {products.map((product, index) => (
            <div 
              key={product._id}
              className={`${styles.productWrapper} ${index >= 2 ? styles.hiddenOnMobile : ''}`}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default memo(ProductSection);
