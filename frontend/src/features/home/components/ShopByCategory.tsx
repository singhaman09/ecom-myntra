import React from 'react';
import styles from './css/ShopByCategory.module.css';

interface Category {
  id: string;
  name: string;
  image: string;
  link: string;
}

interface ShopByCategoryProps {
  categories: Category[];
  title: string;
}

const ShopByCategory = ({ categories, title }: ShopByCategoryProps) => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        <div className={styles.grid}>
          {categories.map((category) => (
            <a 
              key={category.id} 
              href={category.link} 
              className={styles.categoryCard}
            >
              <div className={styles.categoryImageWrapper}>
                <img 
                  src={category.image} 
                  alt={category.name}
                  className={styles.categoryImage}
                />
              </div>
              <h3 className={styles.categoryName}>{category.name}</h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByCategory;
