import React from 'react';
import styles from '../styles/ProductCard.module.css';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import type { ProductCardProps } from '../interfaces/ProductInterfaces';
import { useNavigate } from 'react-router';
import { renderStars } from '../utils/RenderStars';
const ProductCard: React.FC<ProductCardProps> = ({product}) => {
  const navigate=useNavigate()
  const discountPercentage = Math.round(((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100);
 
  return (
    <div className={styles.card} onClick={()=>navigate(`/${product.title}/${product.id}`)}>
      {/* Image Container */}
      <div className={styles.imageContainer}>
        <img 
          src={product.image} 
          alt={product.title}
          className={styles.productImage}
        />
        
        {/* Wishlist Button */}
        <button className={styles.wishlistBtn}   onClick={(event) => {event.stopPropagation()}}>
          {product.isWishlisted
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
          {product.title}
        </h3>
        
        {/* Rating */}
        <div className={styles.ratingRow}>
          <div className={styles.stars}>
            {renderStars(product.rating)}
          </div>
          <span className={styles.ratingCount}>({product.ratingCount.toLocaleString()})</span>
        </div>
        
        {/* Pricing */}
        <div className={styles.pricing}>
          <span className={styles.discountedPrice}>
            ₹{product.discountedPrice.toLocaleString()}
          </span>
          {product.originalPrice > product.discountedPrice && (
            <>
              <span className={styles.originalPrice}>
                ₹{product.originalPrice.toLocaleString()}
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

export default ProductCard;
