import React, { memo } from 'react';
import styles from './ReviewSection.module.css';

const ReviewSection: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Section heading */}
          <h2 className={styles.title}>What do you think of the Item ?</h2>
          <p className={styles.subtitle}>Rate your purchase</p>

          {/* Product card with rating stars */}
          <div className={styles.productCard}>
            <div className={styles.productSomething}>
              <img
                src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop"
                alt="Product"
                className={styles.productImage}
              />
              <div className={styles.productInfo}>
                <p className={styles.productDescription}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua sed do
                  eiusmod tempor incididunt.
                </p>

                {/* Static 5-star rating (4 filled) */}
                <div className={styles.rating}>
                  {[...Array(5)].map((_, index) => (
                    <div
                      key={index}
                      className={`${styles.star} ${index < 4 ? styles.filled : ''}`}
                    >
                      ★
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Button to review more items */}
            <div className={styles.btnContainer}>
              <button className={styles.reviewButton}>Review more product</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Prevent re-renders unless props/state change
export default memo(ReviewSection);
