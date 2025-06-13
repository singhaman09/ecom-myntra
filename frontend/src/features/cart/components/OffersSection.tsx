import React from "react";
import styles from "./Styles/OfferSection.module.css";

interface OffersSectionProps {
  offers: string[];
  showMoreOffers: boolean;
  toggleOffersDropdown: () => void;
}

const OffersSection: React.FC<OffersSectionProps> = ({
  offers,
  showMoreOffers,
  toggleOffersDropdown,
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
        <>
          <ul className={styles.offersList}>
            {offers
              .slice(0, showMoreOffers ? offers.length : 1)
              .map((offer, index) => (
                <li key={index} className={styles.offer}>
                  {offer}
                </li>
              ))}
          </ul>

          {offers.length > 1 && (
            <button
              onClick={toggleOffersDropdown}
              className={`${styles.showMore} ${
                showMoreOffers ? styles.showMoreOpen : ""
              }`}
            >
              <span className={styles.showMoreIcon}>
                {showMoreOffers ? "Show less ▲" : "Show more ▼"}
              </span>
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default OffersSection;
