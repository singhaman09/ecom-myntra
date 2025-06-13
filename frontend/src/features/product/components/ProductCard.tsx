import React, { memo, useMemo } from 'react';
import styles from '../styles/ProductCard.module.css';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import type { ProductCardProps } from '../interfaces/ProductInterfaces';
import { useNavigate } from 'react-router';
import { renderStars } from '../utils/RenderStars';
import { averageRating } from '../utils/Reviews';
const ProductCard: React.FC<ProductCardProps> = ({product}) => {
  const navigate=useNavigate()
  const avgRating = useMemo(() => averageRating(product.reviews), [product.reviews]);
  const discountPercentage = 40
  return (
    <div className={styles.card} onClick={()=>navigate(`/${product.name}/${product._id}`)}>
      {/* Image Container */}
      <div className={styles.imageContainer}>
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className={styles.productImage}
        />
        
        {/* Wishlist Button */}
        <button className={styles.wishlistBtn}   onClick={(event) => {event.stopPropagation()}}>
          {1
            ? <FavoriteIcon style={{ color: '#ef4444' }} />
            : <FavoriteBorderIcon style={{ color: '#6b7280' }} />
          }
        </button>
        
        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className={styles.discountBadge}>
            {discountPercentage}% OFF
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className={styles.info}>
        {/* Brand */}
        <div className={styles.brand}>
          {product.brand}
        </div>
        
        {/* Title */}
        <h3 className={styles.title}>
          {product.name}
        </h3>
        
        {/* Rating */}
        <div className={styles.ratingRow}>
          <div className={styles.stars}>
            {renderStars(avgRating)}
          </div>
          <span className={styles.ratingCount}>({avgRating>0 ?averageRating(product.reviews).toFixed(1) :averageRating(product.reviews)})</span>
        </div>
        
        {/* Pricing */}
        <div className={styles.pricing}>
          <span className={styles.discountedPrice}>
            ₹{product.price}
          </span>
          {product.price > ((product.price * discountPercentage)/100) && (
            <>
              <span className={styles.originalPrice}>
                ₹{product.price+((product.price * discountPercentage)/100)}
              </span>
              <span className={styles.discountPercent}>
                ({discountPercentage}% OFF)
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(ProductCard);
