import React, {  useMemo, useState } from 'react';
import styles from '../styles/ReviewSection.module.css';
import StarIcon from '@mui/icons-material/Star';
import { renderStars } from '../utils/RenderStars';
import { averageRating, formatNumber } from '../utils/Reviews';
import { useProductSelector } from '../hooks/storeHooks';

//Lazy Load
const ReviewCard=React.lazy(()=>import('./ReviewCard'));

const ReviewSection: React.FC = () => {
  const selectedProduct = useProductSelector(state => state.product.selectedProduct?.product);
  const [more, setMore] = useState(3);

  // Memoize reviews to avoid repeated calculations
  const reviews = selectedProduct?.reviews ?? [];

  // Memoize average rating
  const avgRating = useMemo(() => averageRating(reviews), [reviews]);

  // Memoize rating distribution
  const ratingDistribution = useMemo(() =>
    [5, 4, 3, 2, 1].map(rating => {
      const count = reviews.filter(review => review.rating === rating).length;
      const percentage = reviews.length ? (count / reviews.length) * 100 : 0;
      return { rating, count, percentage };
    }),
    [reviews]
  );

  return (
    <div className={styles.section}>
      <div className={styles.header}>Ratings & Reviews</div>
      {/* Rating Summary */}
      <div className={styles.summaryRow}>
        {/* Overall Rating */}
        <div className={styles.overall}>
          <div className={styles.overallRating}>
            <span className={styles.overallValue}>
              {reviews.length ? avgRating.toFixed(1) : '0.0'}
            </span>
            <div className={styles.starsRow}>
              {renderStars(avgRating)}
            </div>
            <span className={styles.reviewsCount}>
              ({formatNumber(reviews.length)} reviews)
            </span>
          </div>
        </div>
        {/* Rating Distribution */}
        <div className={styles.distribution}>
          {ratingDistribution.map(({ rating, count, percentage }) => (
            <div key={rating} className={styles.distributionRow}>
              <span>{rating}</span>
              <StarIcon className={styles.distributionStar} style={{ fontSize: 16 }} />
              <div className={styles.distributionBarBg}>
                <div
                  className={styles.distributionBar}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span>{count}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Reviews List */}
      <div>
        <div className={styles.reviewListHeader}>
          Customer Reviews ({formatNumber(reviews.length)})
        </div>
        {reviews.length ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {reviews.slice(0, more).map(review => (
              <ReviewCard key={review._id} {...review} />
            ))}
            {reviews.length > more && (
              <p className={styles.load} onClick={() => setMore(prev => prev + 3)}>
                Show More...
              </p>
            )}
          </div>
        ) : (
          <div className={styles.noReviews}>
            <p>No reviews yet. Be the first to review this product!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(ReviewSection);
