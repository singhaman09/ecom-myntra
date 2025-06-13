import React, { memo } from 'react';
import styles from '../styles//ReviewCard.module.css';
import type { Review } from '../interfaces/ProductInterfaces';
import { renderStars } from '../utils/RenderStars';
import { formatDate } from '../utils/Reviews';
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

      {/* Review Title */}
      <h4 className={styles.title}>{title}</h4>

      {/* Review Comment */}
      <p className={styles.comment}>{comment}</p>

      {/* Review Meta */}
      <div className={styles.metaRow}>
        <div className={styles.metaLeft}>
          <span className={styles.userName}>{reviewerName}</span>
                 </div>
        <span>{formatDate(createdAt)}</span>
      </div>

    </div>
  );
};

export default memo(ReviewCard);
