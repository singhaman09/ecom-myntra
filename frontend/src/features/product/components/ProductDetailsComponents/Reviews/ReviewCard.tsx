import React, { memo } from 'react';
import styles from './ReviewCard.module.css';

import { renderStars } from '../../../utils/RenderStars';
import { formatDate } from '../../../utils/Reviews';
import type { Review } from '../../../interfaces/ReviewInterfaces';
const ReviewCard: React.FC<Review> = ({
  reviewerName,
  rating,
  title,
  comment,
  createdAt,
}) => {
  return (
    <div className={styles.card}>
      {/* Rating and Title */}
      <div className={styles.ratingRow}>
        <div className={styles.stars}>
          {renderStars(rating)}
        </div>
        <span className={styles.ratingValue}>{rating}/5</span>
      </div>
      <div className={styles.metaRow}>
        <div className={styles.metaLeft}>
          <span className={styles.userName}>{reviewerName}</span>
                 </div>
        <button className={styles.reportButton}>Report this</button>
      </div>
      {/* Review Title */}
      <h4 className={styles.title}>{title}</h4>

      {/* Review Comment */}
      <p className={styles.comment}>{comment}</p>

      {/* Review Meta */}
     <div>
    <div className={styles.helpOuter}>
    <div className={styles.helpfulContainer}>
      <h4>Was this helpul?</h4>
      <p className={styles.count}>4 found this helpful</p>
      </div>
      <div className={styles.buttonContainer}>
        <button>Yes</button>
        <button>No</button>
      </div>
    </div>
     </div>
    </div>
  );
};

export default memo(ReviewCard);
