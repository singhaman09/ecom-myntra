import React, { useState } from 'react';
import styles from '../styles/ReviewSection.module.css';
import StarIcon from '@mui/icons-material/Star';
import AddIcon from '@mui/icons-material/Add';
import ReviewCard from './ReviewCard';
import ReviewForm from './ReviewForm';
import FormModal from './FormModal';
import type { Review, ReviewSectionProps } from '../interfaces/ProductInterfaces';
import { renderStars } from '../utils/RenderStars';
const ReviewSection: React.FC<ReviewSectionProps> = ({ productId }) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      userName: 'Priya S.',
      rating: 5,
      title: 'Excellent quality and fit!',
      comment: 'Really happy with this purchase. The fabric is soft and comfortable. True to size and the color is exactly as shown in the pictures. Would definitely recommend!',
      date: '2 days ago',
      verified: true,
      helpful: 12,
      size: 'M'
    },
    {
      id: '2',
      userName: 'Rahul K.',
      rating: 4,
      title: 'Good product but could be better',
      comment: 'The product is good overall. Quality is decent for the price point. Delivery was quick. Only issue is that it\'s slightly smaller than expected, so consider ordering one size up.',
      date: '1 week ago',
      verified: true,
      helpful: 8,
      size: 'L'
    },
    {
      id: '3',
      userName: 'Anjali M.',
      rating: 5,
      title: 'Love it! Great value for money',
      comment: 'Absolutely love this! The quality exceeded my expectations. Perfect fit and very comfortable. The color is vibrant and hasn\'t faded after multiple washes.',
      date: '2 weeks ago',
      verified: false,
      helpful: 15,
      size: 'S'
    }
  ]);
  const [more,setMore]=useState(3)
  // Calculate average rating
  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;

  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(review => review.rating === rating).length,
    percentage: reviews.length > 0
      ? (reviews.filter(review => review.rating === rating).length / reviews.length) * 100
      : 0
  }));

  const handleSubmitReview = (newReview: {
    rating: number;
    title: string;
    comment: string;
    userName: string;
  }) => {
    const review: Review = {
      id: Date.now().toString(),
      ...newReview,
      date: 'Just now',
      verified: false,
      helpful: 0
    };

    setReviews(prev => [review, ...prev]);
    setShowReviewForm(false);
  };

  return (
    <div className={styles.section}>
      <div className={styles.header}>Ratings & Reviews</div>
      {/* Rating Summary */}
      <div className={styles.summaryRow}>
        {/* Overall Rating */}
        <div className={styles.overall}>
          <div className={styles.overallRating}>
            <span className={styles.overallValue}>
              {averageRating.toFixed(1)}
            </span>
            <div className={styles.starsRow}>
              {renderStars(averageRating)}
            </div>
            <span className={styles.reviewsCount}>({reviews.length} reviews)</span>
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
      {/* Write Review Button */}
      {!showReviewForm ? (
        <button
          className={styles.writeBtn}
          onClick={() => setShowReviewForm(true)}
        >
          <AddIcon style={{ fontSize: 20 }} />
          Write a Review
        </button>
      ):      
      (
        <FormModal open={showReviewForm} onClose={() => setShowReviewForm(false)}>
        <ReviewForm
          onSubmit={handleSubmitReview}
          onCancel={() => setShowReviewForm(false)}
        />
      </FormModal>
      )}
      {/* Reviews List */}
      <div>
        <div className={styles.reviewListHeader}>
          Customer Reviews ({reviews.length})
        </div>
        {reviews.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {reviews.slice(0,more).map((review) => (
              <ReviewCard key={review.id} {...review} />
            ))}
            {reviews.length>more && <p className={styles.load} onClick={()=>setMore(prev=>prev+3)}>Show More...</p>}
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

export default ReviewSection;
