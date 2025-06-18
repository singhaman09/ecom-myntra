import React, { useState, useEffect } from 'react';
import styles from '../../components/shared/css/starRating.module.css';

interface StarRatingProps {
  rating?: number;
  onRatingChange?: (rating: number) => void;
  readonly?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const StarRating: React.FC<StarRatingProps> = ({
  rating = 0,
  onRatingChange,
  readonly = false,
  size = 'medium'
}) => {
  const [currentRating, setCurrentRating] = useState(rating);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    setCurrentRating(rating);
  }, [rating]);

  const handleStarClick = (starRating: number) => {
    if (!readonly) {
      setCurrentRating(starRating);
      onRatingChange?.(starRating); // call parent if needed
    }
  };

  const handleStarHover = (starRating: number) => {
    if (!readonly) setHoverRating(starRating);
  };

  const handleMouseLeave = () => {
    if (!readonly) setHoverRating(0);
  };

  return (
    <div
      className={`${styles.starRating} ${readonly ? styles.ratingReadonly : ''} ${styles[size]}`}
      onMouseLeave={handleMouseLeave}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`${styles.star} ${star <= (hoverRating || currentRating) ? styles.starFilled : ''}`}
          onClick={() => handleStarClick(star)}
          onMouseEnter={() => handleStarHover(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;