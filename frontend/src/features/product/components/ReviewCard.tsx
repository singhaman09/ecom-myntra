import React from 'react';
import styles from '../styles//ReviewCard.module.css';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import type { ReviewCardProps } from '../interfaces/ProductInterfaces';
import { renderStars } from '../utils/RenderStars';
const ReviewCard: React.FC<ReviewCardProps> = ({
  userName,
  rating,
  title,
  comment,
  date,
  verified,
  helpful,
  size
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
          <span className={styles.userName}>{userName}</span>
          {verified && (
            <span className={styles.verified}>✓ Verified Purchase</span>
          )}
          {size && (
            <span className={styles.size}>Size: {size}</span>
          )}
        </div>
        <span>{date}</span>
      </div>

      {/* Helpful Section */}
      <div className={styles.helpfulRow}>
        <button className={styles.helpfulBtn}>
          <ThumbUpAltOutlinedIcon fontSize="small" />
          <span>Helpful ({helpful})</span>
        </button>
      </div>
    </div>
  );
};

export default ReviewCard;
