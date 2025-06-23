
import React from 'react';
import { MapPin, Phone, Clock, ArrowRight } from 'lucide-react';
import styles from './StoreListItem.module.css';
import type { Store } from '../../interfaces/Store';

interface StoreListItemProps {
  store: Store;
  setActiveView: (view: 'list' | 'map') => void;
}

const StoreListItem: React.FC<StoreListItemProps> = ({ store,setActiveView }) => {
  return (
    <div className={styles.storeListItem}>
      <div className={styles.storeListItemContent}>
        <img
          src={store.image}
          alt={store.name}
          className={styles.storeImage}
        />
        <div className={styles.storeDetails}>
          <h3 className={styles.storeName}>{store.name}</h3>
          <p className={styles.storeAddress}>{store.address}</p>
          
          <div className={styles.storeContactInfo}>
            <div className={styles.infoItem}>
              <MapPin className={styles.infoIcon} />
              <span>{store.distance}</span>
            </div>
            <div className={styles.infoItem}>
              <Phone className={styles.infoIcon} />
              <span>{store.phone}</span>
            </div>
          </div>
          
          <div className={styles.storeHoursToday}>
            <Clock className={`${styles.infoIcon} ${styles.openHoursIcon}`} />
            <span className={styles.openHoursText}>Open Today: </span>
            <span className={styles.openHoursTime}>{store.hours.today}</span>
          </div>
        </div>
        <button className={styles.button}><ArrowRight className={styles.listItemArrow} onClick={()=>setActiveView('map')}  /></button>
      </div>
    </div>
  );
};

export default React.memo(StoreListItem);