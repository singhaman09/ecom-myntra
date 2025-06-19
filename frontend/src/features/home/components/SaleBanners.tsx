import React from 'react';
import styles from './css/SaleBanner.module.css';

interface SaleBannerProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  ctaText: string;
  onCtaClick?: () => void;
}

const SaleBanners: React.FC<SaleBannerProps> = ({ 
  title, 
  subtitle, 
  backgroundImage, 
  ctaText, 
  onCtaClick 
}) => {
  return (
    <section className={styles.saleBanner}>
      <div className={styles.container}>
        <div 
          className={styles.bannerCard}
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className={styles.bannerOverlay}>
            <div className={styles.bannerContent}>
              <h2 className={styles.bannerTitle}>{title}</h2>
              <p className={styles.bannerSubtitle}>{subtitle}</p>
              <button 
                className={styles.bannerCta}
                onClick={onCtaClick}
              >
                {ctaText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SaleBanners;