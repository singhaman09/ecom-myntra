import React, { useState } from "react";
import styles from "../styles/TrendingCard.module.css";

const TrendingCard = () => {
  const [expanded, setExpanded] = useState(false);

  const handleReadMore = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <div className={styles.trendingCard}>
      <div className={styles.trendingCardContent}>
        <div className={styles.trendingFlexRow}>
          {/* Left content section */}
          <div className={styles.trendingLeftSection}>
            <h2 className={styles.trendingHeading}>New & Trending</h2>
            <p className={styles.trendingDescription}>
              Personally there's no one we trust more than our{" "}
              <span className={styles.trendingHighlight}>community of The Body Shop</span>{" "}
              geeks and lovers to recommend.
              {expanded && (
                <>
                  {" "}
                  Here you’ll find the latest, most-loved products and honest reviews from real people. Explore trending picks and discover new favorites, all recommended by our passionate community.
                </>
              )}
            </p>
            <button className={styles.trendingButton} onClick={handleReadMore}>
              {expanded ? "Show Less" : "Read More"}
            </button>
          </div>
          
          {/* Right image section */}
          <div className={styles.trendingRightImage}>
            <img
              src="https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg"
              alt="Smiling woman"
              className={styles.trendingImage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingCard;
