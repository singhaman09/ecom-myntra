import React from 'react';
import styles from './css/ProductSection.module.css';
import ProductCard from '../../product/components/ProductCard';

interface ProductSectionProps {
  title: string;
  products: Array<{ _id: string; [key: string]: any }>;
  backgroundColor?: string;
}

const ProductSection: React.FC<ProductSectionProps> = ({ title, products, backgroundColor = 'white' }) => {
  return (
    <section className={`${styles.section} ${backgroundColor === 'gray' ? styles.grayBg : ''}`}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button className={styles.viewAllButton}>View All</button>
        </div>
        
        <div className={styles.productsGrid}>
          {products.map((product, index) => (
            <div key={product._id} className={`${styles.productWrapper} ${index >= 2 ? styles.hiddenOnMobile : ''}`}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;