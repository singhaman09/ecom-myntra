import React from 'react';
import { ArrowRight } from 'lucide-react';
import styles from './StoreOfferCard.module.css';
import defaultImage from '../../../../assets/cam.jpg'
const StoreOfferCard: React.FC = () => {
  return (
    <div className={styles.offerCard}>
    <div className={styles.offerContent}>
    <div className={styles.offerImageWrapper}>
    <img src={defaultImage} className={styles.offerImage}/>
    </div>
     <div>
     <h3 className={styles.offerTitle}>Festive Offer</h3>
      <p className={styles.offerDescription}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
      </p>
     </div>
    </div>
    <ArrowRight className={styles.offerArrow} />
   
    <div className={styles.decorativeElementBottomLeft}></div>
    <div className={styles.decorativeElementTopRight}></div>
  </div>
  
  );
};

export default StoreOfferCard;