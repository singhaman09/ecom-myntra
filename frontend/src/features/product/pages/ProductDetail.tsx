import  { useState } from "react";
import styles from "../styles/ProductDetail.module.css";
import SimilarProduct from "../components/SimilarProduct";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ReviewSection from "../components/ReviewSection";
import ImageZoomOnHover from "../components/ImageZoom";
import { renderStars } from "../utils/RenderStars";

const ProductDetails = () => {
  const [selectedSize, setSelectedSize] = useState("S");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const sizes = ["S", "M", "L", "XL"];
  return (
    <div className={styles.container}>
      <div className={styles.gridLayout}>
      <ImageZoomOnHover src="https://m.media-amazon.com/images/I/71tV8h2PJlL.jpg" alt="Headphones" />
        <div className={styles.productDetails}>
          {/* Brand and Title */}
          <div className={styles.brandTitle}>
            <h2 className={styles.brand}>Here &amp; Now</h2>
            <h1 className={styles.title}>Pink Solid Fit &amp; Flare Dress</h1>
          </div>

          {/* Rating */}
          <div className={styles.ratingRow}>
            <div className={styles.stars}>
            { renderStars(4.6)}
            </div>
            <span className={styles.ratingText}>(2.4k reviews)</span>
          </div>

          {/* Price */}
          <div className={styles.priceSection}>
            <div className={styles.priceRow}>
              <span className={styles.price}>₹899</span>
              <span className={styles.oldPrice}>₹1,499</span>
              <span className={styles.discount}>40% OFF</span>
            </div>
            <p className={styles.taxInfo}>inclusive of all taxes</p>
          </div>

          {/* Size Selection */}
          <div className={styles.sizeSection}>
            <div className={styles.sizeHeaderRow}>
              <h3 className={styles.sizeLabel}>Size</h3>
              <button className={styles.sizeGuideBtn}>SIZE GUIDE</button>
            </div>
            <div className={styles.sizesRow}>
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`${styles.sizeBtn} ${
                    selectedSize === size ? styles.sizeBtnSelected : ""
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Product Description */}
          <div className={styles.descriptionSection}>
            <p className={styles.descriptionText}>
              Pink fit and flare dress, has a round neck, short flared sleeves and flared hem
            </p>
            <ul className={styles.featuresList}>
              <li> Machine wash cold</li>
              <li> 100% Cotton</li>
              <li> Imported</li>
            </ul>
          </div>
          

          {/* Action Buttons */}
          <div className={styles.actionSection}>
            <button className={styles.addToBagBtn}>ADD TO BAG</button>
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={`${styles.wishlistBtn} ${
                isWishlisted ? styles.wishlistBtnSelected : ""
              }`}
            >
              {isWishlisted ? (
                <FavoriteIcon
                  className={styles.heartIcon}
                  sx={{ color: "#db2777", fontSize: 20, verticalAlign: "middle" }}
                />
              ) : (
                <FavoriteBorderIcon
                  className={styles.heartIcon}
                  sx={{ color: "#db2777", fontSize: 20, verticalAlign: "middle" }}
                />
              )}
              <span>WISHLIST</span>
            </button>
          </div>

          {/* Delivery Info */}
          <div className={styles.deliverySection}>
            <h4 className={styles.deliveryTitle}>Delivery Options</h4>
            <ul className={styles.deliveryList}>
              <li> Free delivery on orders above ₹499</li>
              <li> Cash on delivery available</li>
              <li> Easy 30 days return and exchange</li>
            </ul>
          </div>
        </div>
      </div>
      <ReviewSection productId="sample-product" />
      <SimilarProduct />
    </div>
  );
};

export default ProductDetails;
