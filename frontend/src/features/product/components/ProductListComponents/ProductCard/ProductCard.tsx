import React, { memo,  useMemo, useState } from 'react';
import styles from './ProductCard.module.css';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import type { ProductCardProps } from '../../../interfaces/ProductInterfaces';
import { useNavigate } from 'react-router-dom';
import { renderStars } from '../../../utils/RenderStars';
import { averageRating } from '../../../utils/Reviews';
import { useProductSelector } from '../../../hooks/storeHooks';
import SelectShadeSizeModal from '../SelectSizeModal/SelectSizeModal';
import { toast } from 'react-toastify';
import { handleImageError } from '../../../utils/HandleImageError';
const ProductCard: React.FC<ProductCardProps> = ({product}) => {
  const navigate=useNavigate()
  const data=useProductSelector(state=>state.wishlist.items)
  const avgRating = useMemo(() => averageRating(product.reviews), [product.reviews]);
  const discountPercentage = 40
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
    <div className={styles.card} onClick={()=>navigate(`/productDetails/${product._id}`)}>
      {/* Image Container */}
      <div className={styles.imageContainer}>
        <img 
          src={product.images?.find(val=>val.isPrimary)?.url} 
          alt={product.name}
          className={styles.productImage}
          onError={handleImageError}
        />
        
        {/* Wishlist Button */}
        <button className={styles.wishlistBtn}   onClick={(event) => {event.stopPropagation()}}>
          {data.find(val=>val.productId==product._id)
            ? <FavoriteIcon style={{ color: '#3D857E' }} />
            : <FavoriteBorderIcon style={{ color: '#3D857E' }} />
          }
        </button>
        
        {/* Discount Badge */}
        {/* {discountPercentage > 0 && (
          <div className={styles.discountBadge}>
            {discountPercentage}% OFF
          </div>
        )} */}
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
          <span className={styles.ratingCount}>({product.reviews.length})</span>
        </div>
        
        {/* Pricing */}
        <div className={styles.pricing}>
          <span className={styles.discountedPrice}>
            ₹{Math.round(product.price)}
          </span>
          {product.price > ((product.price * discountPercentage)/100) && (
            <>
              <span className={styles.originalPrice}>
                ₹{Math.round(product.price+((product.price * discountPercentage)/100))}
              </span>
              {/* <span className={styles.discountPercent}>
                ({discountPercentage}% OFF)
              </span> */}
            </>
          )}
        </div>
        <button className={styles.addToBag} onClick={(event)=>{event.stopPropagation(),setModalOpen(true)}}>Select Shade</button>
         
      </div>
    
    </div>
      { modalOpen &&  <SelectShadeSizeModal
         product={product}         
        onClose={() => setModalOpen(false)}
        onConfirm={(selection) => {
          toast.success("Added successfully")
          setModalOpen(false);
        }}
      />}
      </>
  );
};

export default memo(ProductCard);
