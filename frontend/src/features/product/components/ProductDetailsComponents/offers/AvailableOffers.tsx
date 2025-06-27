import React from 'react';
import styles from './AvailableOffers.module.css';
import { FaTag, FaCreditCard, FaGift } from 'react-icons/fa';
import { OFFER_TYPE, type OfferType } from '../../../Product.enum';

// Enum-like offer types

export interface Offer {
  type: OfferType;
  title: string;
  description: string;
}

interface AvailableOffersProps {
  offers: Offer[];
}

const getIcon = (type: OfferType) => {
  switch (type) {
    case OFFER_TYPE.BANK:
      return <FaCreditCard color="#3D857E" />;
    case OFFER_TYPE.COUPON:
      return <FaTag color="#eab308" />;
    case OFFER_TYPE.DEAL:
      return <FaGift color="#059669" />;
    default:
      return <FaTag color="#3B82F6" />;
  }
};

const AvailableOffers: React.FC<AvailableOffersProps> = ({ offers }) => {
  if (!offers || offers.length === 0) return null;

  return (
    <section className={styles.offersSection}>
      <div className={styles.title}>Available Offers</div>
      <ul className={styles.offerList}>
        {offers.map((offer, idx) => (
          <li key={idx} className={styles.offerCard}>
            <span className={styles.icon}>{getIcon(offer.type)}</span>
            <span>
              <span className={styles.offerMain}>{offer.title}</span>
              <span className={styles.offerDesc}>{offer.description}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default AvailableOffers;
