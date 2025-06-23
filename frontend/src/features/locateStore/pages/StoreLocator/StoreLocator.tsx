import React, { useState } from 'react';
import styles from './StoreLocator.module.css';
import SearchBar from '../../Components/SearchBar/SearchBar';
import StoreOfferCard from '../../Components/StoreOffer/StoreOfferCard';
import ToggleButtons from '../../Components/ToggleButtons/ToggleButtons';
import StoreListItem from '../../Components/StoreListItem/StoreListItem';
import MapDisplay from '../../Components/MapDisplay/MapDisplay';
import MapStoreDetailsCard from '../../Components/MapStoreDetailsCard/MapStoreDetailsCard';
import type { Store } from '../../interfaces/Store';
import defaultImage from '../../../../assets/cam.jpg'
const StoreLocator: React.FC = () => {
  const [activeView, setActiveView] = useState<'list' | 'map'>('list');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const stores: Store[] = [
    {
      id: 1,
      name: 'Croydon High Street',
      address: '271-273 Croydon Road Beckenha, Kent BR3 3PS road',
      distance: '0.8 mi',
      phone: '+44 (0)20 8123 4567',
      hours: {
        today: '9:30 - 17:30 PM',
        schedule: {
          Monday: '9:30 - 17:30 PM',
          Tuesday: '9:30 - 17:30 PM',
          Wednesday: '9:30 - 17:30 PM',
          Thursday: '9:30 - 17:30 PM',
          Friday: '9:30 - 17:30 PM',
          Saturday: '9:30 - 17:30 PM',
          Sunday: 'Closed'
        }
      },
      image: defaultImage
    }
  ];

  return (
    <div className={styles.container}>
     
      <div className={styles.headerSearchWrapper}>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>
    
      <div className={styles.storeOffersSection}>
      <h2 className={styles.sectionTitle}>Store Offers</h2>
       <div className={styles.offerCardContainer}>
       <StoreOfferCard />
        <StoreOfferCard />
        <StoreOfferCard />
       </div>
      </div>

      <div className={styles.nearestStoresHeader}>
        <h2 className={styles.sectionTitle}>Nearest Stores (2)</h2>
      </div>

      <div className={styles.toggleContainer}>
        <ToggleButtons activeView={activeView} setActiveView={setActiveView} />
      </div>

      {activeView === 'list' ? (
        <div className={styles.storeList}>
          {stores.map((store) => (
            <StoreListItem key={store.id} store={store} />
          ))}
        </div>
      ) : (
        <div className={styles.mapView}>
          <MapDisplay />
          <MapStoreDetailsCard store={stores[0]} />
        </div>
      )}
    </div>
  );
};

export default StoreLocator;