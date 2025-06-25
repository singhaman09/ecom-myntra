import React from 'react';
import styles from './css/SummerSaleBanner.module.css';

const SummerSaleBanner: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.banner}>
          
          {/* Text content on the left */}
          <div className={styles.content}>
            <h2 className={styles.title}>Hot Summer Offer</h2>
            <p className={styles.subtitle}>
              AVAIL THIS OFFER OF Summer Collection Products
            </p>
            <button className={styles.ctaButton}>Learn More</button>
          </div>
          
          {/* Image on the right */}
          <div className={styles.imageWrapper}>
            <img
              src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&h=300&fit=crop"
              alt="Summer Products"
              className={styles.bannerImage}
              loading="lazy" // improve performance
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default React.memo(SummerSaleBanner);
