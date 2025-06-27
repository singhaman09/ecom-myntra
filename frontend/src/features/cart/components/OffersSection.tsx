import React from "react";
import styles from "./styles/OfferSection.module.css";
import { STATIC_OFFERS } from "../staticData/StaticData";
import offertag from "../../../assets/offertag.png";

interface OffersSectionProps {
  offers: string[];
  showMoreOffers: boolean;
  toggleOffersDropdown: () => void;
}

const OffersSection: React.FC<OffersSectionProps> = ({
  offers = STATIC_OFFERS,
}) => {
  const hasOffers = offers.length > 0;

  return (
    <div className={styles.offersSection}>
      <div className={styles.offersHeader}>
        <span className={styles.offersIcon}>🎁</span>
        <span className={styles.offersTitle}>Available Offers</span>
      </div>

      {!hasOffers ? (
        <p className={styles.noOffers}>No offers available at the moment.</p>
      ) : (
        <div className={styles.offersScrollRow}>
          {offers.map((offer, idx) => {
            // Simple parsing: title is first 1-2 words, rest is description
            const [title, ...descArr] = offer.split(/[:.-]/);
            let desc = descArr.join("").trim() || offer;
            desc = desc.replace(/TCA|T&C/gi, 'Terms & Conditions apply.');
            return (
              <div className={styles.offerCard} key={idx}>
                <div className={styles.offerCardHeader}>
                  <img src={offertag} alt="Offer" className={styles.offerCardIconImg} />
                  <span className={styles.offerCardTitle}>{title.trim()}</span>
                </div>
                <div className={styles.offerCardDesc}>{desc}</div>
                <div className={styles.offerCardValidity}>Valid till 31st Dec, 2025</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OffersSection;
