// src/components/MapStoreDetailsCard/MapStoreDetailsCard.tsx
import React from 'react';
import { MapPin, Phone } from 'lucide-react';
import styles from './MapStoreDetailsCard.module.css';
import type { Store } from '../../interfaces/Store';

interface MapStoreDetailsCardProps {
  store: Store;
}

const MapStoreDetailsCard: React.FC<MapStoreDetailsCardProps> = ({ store }) => {
  return (
    <div className={styles.mapStoreDetailsCard}>
      <div className={styles.mapStoreDetailsHeader}>
        <h3 className={styles.mapStoreName}>{store.name}</h3>
        <span className={styles.mapStoreDistance}>
          <MapPin className={styles.mapStoreDistanceIcon} />
          {store.distance}
        </span>
      </div>
      
      <p className={styles.mapStoreAddress}>
        {store.address}, India
      </p>
      
      <div className={styles.mapStorePhone}>
        <Phone className={styles.mapStorePhoneIcon} />
        <span>{store.phone}, {store.phone}</span>
      </div>
      
      <div>
        <h4 className={styles.openingHoursTitle}>Opening Hours</h4>
        <div className={styles.openingHoursList}>
          {Object.entries(store.hours.schedule).map(([day, hours]) => (
            <div key={day} className={styles.openingHourItem}>
              <span className={styles.openingHourDay}>{day}:</span>
              <span className={styles.openingHourTime}>{hours}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapStoreDetailsCard;