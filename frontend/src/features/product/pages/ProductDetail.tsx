import styles from "../styles/ProductDetail.module.css";
import SimilarProduct from "../components/SimilarProduct";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ReviewSection from "../components/ReviewSection";
import ImageZoomOnHover from "../components/ImageZoom";
import { renderStars } from "../utils/RenderStars";
import { useParams, useSearchParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import { useEffect, useState } from "react";
import { getProductDetails } from "../productAPI";

const ProductDetails = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.product.selectedProduct);
  const [notCombinations,setNotCombinations]=useState(false)
  // Variants extraction and unique values
  const variants = data?.product.variants || [];
  const uniqueColors = [...new Set(variants.map((v) => v.color))];
  const uniqueSizes = [...new Set(variants.map((v) => v.size))];

  // Defaults (fall back to first available if not in search params)
  const selectedSize =
    searchParams.get("size") || uniqueSizes[0] || "";
  const selectedColor =
    searchParams.get("color") || uniqueColors[0] || "";

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  const handleSize = (size:string) => {
    if( !variants.find(
      (v) =>
        v.size === size &&
        v.color === selectedColor
    )){
      return
    }
    searchParams.set("size", size);
    setSearchParams(searchParams, { replace: true });
  };

  const handleColor = (color:string) => {
    if(!variants.find(
      (v) =>
        v.color === color &&
        v.size === selectedSize
    )){
      return;
    }
    searchParams.set("color", color);
    setSearchParams(searchParams, { replace: true });
  };

  return (
    <div className={styles.container}>
      <div className={styles.gridLayout}>
        <ImageZoomOnHover
          src="https://m.media-amazon.com/images/I/71tV8h2PJlL.jpg"
          alt="Headphones"
        />
        <div className={styles.productDetails}>
          {/* Brand and Title */}
          <div className={styles.brandTitle}>
            <h2 className={styles.brand}>{data?.product.brand}</h2>
            <h1 className={styles.title}>{data?.product.name}</h1>
          </div>

          {/* Rating */}
          <div className={styles.ratingRow}>
            <div className={styles.stars}>{renderStars(4.6)}</div>
            <span className={styles.ratingText}>(2.4k reviews)</span>
          </div>

          {/* Price */}
          <div className={styles.priceSection}>
            <div className={styles.priceRow}>
              <span className={styles.price}>{data?.product.price}</span>
              <span className={styles.oldPrice}>
                {data?.product.price
                  ? data?.product.price +
                    (data?.product.price
                      ? (40 * data?.product.price) / 100
                      : 0)
                  : data?.product.price}
              </span>
              <span className={styles.discount}>40% OFF</span>
            </div>
            <p className={styles.taxInfo}>inclusive of all taxes</p>
          </div>

          {/* Size Selection */}
          {uniqueSizes.length > 1 ? (
            <div className={styles.sizeSection}>
              <div className={styles.sizeHeaderRow}>
                <h3 className={styles.sizeLabel}>Size</h3>
              </div>
              <div className={styles.sizesRow}>
                {uniqueSizes.map((size) => {
                  // Find the variant for this size and current color
                  const variant =
                   variants.find(v=>v.size===size)
                  return (
                    <button
                      key={size}
                      onClick={() => handleSize(size)}
                      className={`${styles.sizeBtn} ${
                        selectedSize === size
                          ? styles.sizeBtnSelected
                          : ""
                      } ${
                        variant?.stock === 0 
                          ? styles.sizeBtnOutOfStock
                          : ""
                      }`}
                      disabled={variant?.stock === 0 }
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : uniqueSizes.length === 1 ? (
            <div className={styles.sizeSection}>
              <div className={styles.sizeHeaderRow}>
                <h3 className={styles.sizeLabel}>Size</h3>
              </div>
              <div className={styles.sizesRow}>
                <span className={styles.sizeBtn}>
                  {uniqueSizes[0]}
                </span>
              </div>
            </div>
          ) : null}

          {/* Color Selection */}
          {uniqueColors.length > 1 ? (
            <div className={styles.sizeSection}>
              <div className={styles.sizeHeaderRow}>
                <h3 className={styles.sizeLabel}>Color</h3>
              </div>
              <div className={styles.sizesRow}>
                {uniqueColors.map((color) => {
                  // Find the variant for this color and current size
                  const variant =
                 variants.find(v=>v.color===color)
                  return (
                    <button
                      key={color}
                      onClick={() => handleColor(color)}
                      className={`${styles.sizeBtn} ${
                        selectedColor === color
                          ? styles.sizeBtnSelected
                          : ""
                      } ${
                        variant?.stock === 0 
                          ? styles.sizeBtnOutOfStock
                          : ""
                      }`}
                      disabled={variant?.stock === 0}
                    >
                      {color}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : uniqueColors.length === 1 ? (
            <div className={styles.sizeSection}>
              <div className={styles.sizeHeaderRow}>
                <h3 className={styles.sizeLabel}>Color</h3>
              </div>
              <div className={styles.sizesRow}>
                <span className={styles.sizeBtn}>
                  {uniqueColors[0]}
                </span>
              </div>
            </div>
          ) : null}

          {/* Product Description */}
          <div className={styles.descriptionSection}>
            <p className={styles.descriptionText}>
              {data?.product?.description}
            </p>
            {/* <ul className={styles.featuresList}>
              <li> Machine wash cold</li>
              <li> 100% Cotton</li>
              <li> Imported</li>
            </ul> */}
          </div>

          {/* Out of stock */}
          <div>
            <p style={{ color: "#db2711" }}>
              {data?.product.totalStock &&
              data?.product.totalStock > 0
                ? ""
                : "*Out of Stock"}
            </p>
          </div>
             {/* Action Buttons */}
          {/* <div className={styles.actionSection}>
           {!data.cart.includes('1')? <button className={styles.addToBagBtn} onClick={()=>dispatch(addToCart('1'))}>ADD TO BAG</button>: <button className={styles.addToBagBtn} onClick={()=>dispatch(removeFromCart('1'))}>REMOVE FROM BAG</button>}
            <button
              onClick={() => dispatch(toggleWishlist('1'))}
              className={`${styles.wishlistBtn} ${
                data.wishlist?.includes('1')  ? styles.wishlistBtnSelected : ""
              }`}
            >
              {data.wishlist?.includes('1') ? (
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
          </div> */}
          {/* Delivery Info */}
          <div className={styles.deliverySection}>
            <h4 className={styles.deliveryTitle}>
              Delivery Options
            </h4>
            <ul className={styles.deliveryList}>
              <li> Free delivery on orders above ₹499</li>
              <li> Cash on delivery available</li>
              <li> Easy 30 days return and exchange</li>
            </ul>
          </div>
        </div>
      </div>
      <ReviewSection productId={'hey'} />
      <SimilarProduct />
    </div>
  );
};

export default ProductDetails;
