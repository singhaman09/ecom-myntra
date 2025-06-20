import React from 'react';
import { ArrowRight } from 'lucide-react';
import styles from './StoreOfferCard.module.css';

const StoreOfferCard: React.FC = () => {
  return (
    <div className={styles.offerCard}>
    <div className={styles.offerContent}>
  
      <h3 className={styles.offerTitle}>Festive Offer</h3>
      <p className={styles.offerDescription}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
      </p>
    </div>
    <ArrowRight className={styles.offerArrow} />
   
    <div className={styles.decorativeElementBottomLeft}></div>
    <div className={styles.decorativeElementTopRight}></div>
  </div>
  
  );
};

export default StoreOfferCard;