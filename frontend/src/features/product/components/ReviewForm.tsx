import React, { useState } from 'react';
import styles from '../styles/ReviewForm.module.css';
import StarIcon from '@mui/icons-material/Star';
import type { ReviewFormProps } from '../interfaces/ProductInterfaces';
const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit, onCancel }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [userName, setUserName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || !title.trim() || !comment.trim() || !userName.trim()) {
      return;
    }
    onSubmit({
      rating,
      title: title.trim(),
      comment: comment.trim(),
      userName: userName.trim()
    });
    setRating(0);
    setHoveredRating(0);
    setTitle('');
    setComment('');
    setUserName('');
  };

  return (
    <div className={styles.formContainer}>
      <h3 className={styles.heading}>Write a Review</h3>
      <form onSubmit={handleSubmit}>
        {/* Rating */}
        <div className={styles.ratingRow}>
          <label style={{ fontWeight: 500, marginRight: 8 }}>Rating</label>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className={styles.starBtn}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              onClick={() => setRating(star)}
              aria-label={`Set rating to ${star}`}
            >
              <StarIcon
                className={styles.starIcon}
                style={{
                  color:
                    star <= (hoveredRating || rating)
                      ? '#fbbf24'
                      : '#e5e7eb'
                }}
              />
            </button>
          ))}
        
        </div>

        {/* Name */}
        <div className={styles.inputGroup}>
          <label htmlFor="userName" className={styles.label}>
            Your Name
          </label>
          <input
            id="userName"
            type="text"
            className={styles.input}
            placeholder="Enter your name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>

        {/* Review Title */}
        <div className={styles.inputGroup}>
          <label htmlFor="title" className={styles.label}>
            Review Title
          </label>
          <input
            id="title"
            type="text"
            className={styles.input}
            placeholder="Summarize your review"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Review Comment */}
        <div className={styles.inputGroup}>
          <label htmlFor="comment" className={styles.label}>
            Your Review
          </label>
          <textarea
            id="comment"
            className={styles.textarea}
            placeholder="Share your thoughts about this product..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            required
          />
        </div>

        {/* Action Buttons */}
        <div className={styles.actionRow}>
          <button
            type="submit"
            className={styles.submitBtn}
            disabled={rating === 0 || !title.trim() || !comment.trim() || !userName.trim()}
          >
            Submit Review
          </button>
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
