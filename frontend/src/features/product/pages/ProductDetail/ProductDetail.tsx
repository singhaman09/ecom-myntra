import React, { useEffect, useState, useMemo, useCallback } from "react";
import styles from "./ProductDetail.module.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { renderStars } from "../../utils/RenderStars";
import { useParams, useSearchParams } from "react-router-dom";
import { useProductDispatch, useProductSelector } from "../../hooks/storeHooks";
import { getProductDetails } from "../../productAPI";
import Loader from "../../utils/Loader";
import { averageRating } from "../../utils/Reviews";
import { addCartItem, deleteCartItem } from "../../../cart/redux/cartSlice";
import { addToWishlist, removeFromWishlist } from "../../../wishlist/slice/wishlistSlice";
// Lazy load components (no Suspense here)
const SimilarProduct = React.lazy(() => import("../../components/ProductDetailsComponents/similarProducts/SimilarProduct"));
const ReviewSection = React.lazy(() => import("../../components/ProductDetailsComponents/Reviews/ReviewSection"));
import defaultProductImage from '../../../../assets/cart.png'
import AvailableOffers, { type Offer } from "../../components/ProductDetailsComponents/offers/AvailableOffers";
import ProductInfo from "../../components/ProductDetailsComponents/ProductInfo/ProductInfo";
import BoughtTogether from "../../components/ProductDetailsComponents/BoughtTogether/BoughtTogether";
import { getColorCodeFromString } from "../../utils/colorsMapping";
const Breadcrumbs = React.lazy(() => import("../../utils/BreadCrumbs/BreadCrumbs"));
const ErrorPage = React.lazy(() => import("../Error/ErrorPage"));

const offers: Offer[] = [
  {
    type: 'bank',
    title: '10% Instant Discount',
    description: 'Get 10% instant discount on HDFC Bank Credit Cards. T&C apply.',
  },
  {
    type: 'coupon',
    title: '₹200 Off Coupon',
    description: 'Use code SAVE200 to get ₹200 off on orders above ₹999.',
  },
  {
    type: 'deal',
    title: 'Free Gift',
    description: 'Free travel pouch on orders above ₹1499.',
  },
];

const ProductDetails = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { id } = useParams();
  const dispatch = useProductDispatch();
  const result = useProductSelector((state) => state);
  const data = result.product;
  const cartData = result.cart;
  const wishlistData = result.wishlist;
  const variants = data?.selectedProduct?.product?.variants || [];
  const uniqueColors = useMemo(() => [...new Set(variants.map((v) => v.color))], [variants]);
  const uniqueSizes = useMemo(() => [...new Set(variants.map((v) => v.size))], [variants]);
  const [notCompatible, setNotCompatible] = useState({ color: "", size: "" });
  const selectedSize = searchParams.get("size") || uniqueSizes[0] || "";
  const selectedColor = searchParams.get("color") || uniqueColors[0] || "";
 
  // New state for image handling
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  
  // Mock multiple images - replace with actual product images from your data
  const productImages = useMemo(() => {
    const mainImage = data?.selectedProduct?.product?.images?.find(val=>val.isPrimary)?.url;
    if (!mainImage) return [defaultProductImage];
    const allimages = data?.selectedProduct?.product?.images
    .filter(val => !val.isPrimary)
    .map(val => val.url);
  
  const images = [
    mainImage,
    ...(allimages ?? [])
  ];
    return images;
  }, [data?.selectedProduct?.product]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    setSelectedImageIndex(0);
  }, [id]);

  const handleSize = useCallback((size: string) => {
    setNotCompatible({ color: "", size: "" });
    if (!variants.find((v) => v.size === size && v.color === selectedColor ) && selectedColor) {
      setNotCompatible({ color: selectedColor, size: size });
    }
    
    searchParams.set("size", size);
    setSearchParams(searchParams, { replace: true });
  },[notCompatible,searchParams]);

  const handleColor = useCallback((color: string) => {
    setNotCompatible({ color: "", size: "" });
    if (!variants.find((v) => v.color === color && v.size === selectedSize) && selectedSize) {
      setNotCompatible({ color: color, size: selectedSize });
    }
    searchParams.set("color", color);
    setSearchParams(searchParams, { replace: true });
  },[notCompatible,searchParams]);

  const handleImageSelect = useCallback((index: number) => {
    setSelectedImageIndex(index);
  },[selectedImageIndex]);

  const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    (e.currentTarget as HTMLImageElement).src = defaultProductImage;
    (e.currentTarget as HTMLImageElement).onerror = null;
  },[]);

  const addToBag = useCallback(() => {
    const productId = id || '';
    dispatch(addCartItem(productId));
  },[id]);

  const removeFromBag = useCallback(() => {
    const productId = id || '';
    dispatch(deleteCartItem(productId));
  },[id]);

  const removeWishlist = useCallback(() => {
    const productId = id || '';
    dispatch(removeFromWishlist(productId));
  },[id]);

  const addWishlist = useCallback(() => {
    const productId = id || '';
    dispatch(addToWishlist(productId));
  },[id]);

  if (data.loading) return <Loader isInitial={true} />;
  if (data.error) return <ErrorPage />;

  return (
    <div className={styles.container}>
      <Breadcrumbs />
      <div className={styles.gridLayout}>
        <div className={styles.imgContainer}>
          {/* Main Image Display */}
          <div className={styles.mainImageContainer}>
            <img 
              className={`${styles.mainImage} ${isZoomed ? styles.zoomed : ''}`}
              src={productImages[selectedImageIndex]} 
              alt={`${data?.selectedProduct?.product?.name} - Image ${selectedImageIndex + 1}`}
              onError={handleImageError}
              onClick={() => setIsZoomed(!isZoomed)}
            />
            
            {/* Image Navigation Arrows */}
            {productImages.length > 1 && (
              <>
                <button 
                  className={`${styles.imageNavBtn} ${styles.prevBtn}`}
                  onClick={() => setSelectedImageIndex(prev => 
                    prev === 0 ? productImages.length - 1 : prev - 1
                  )}
                  disabled={productImages.length <= 1}
                >
                  &#8249;
                </button>
                <button 
                  className={`${styles.imageNavBtn} ${styles.nextBtn}`}
                  onClick={() => setSelectedImageIndex(prev => 
                    prev === productImages.length - 1 ? 0 : prev + 1
                  )}
                  disabled={productImages.length <= 1}
                >
                  &#8250;
                </button>
              </>
            )}
            
            {/* Image Counter */}
            {productImages.length > 1 && (
              <div className={styles.imageCounter}>
                {selectedImageIndex + 1} / {productImages.length}
              </div>
            )}
          </div>
          
          {/* Thumbnail Images */}
          {productImages.length > 1 && (
            <div className={styles.thumbnailContainer}>
              {productImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${data?.selectedProduct?.product?.name} - Thumbnail ${index + 1}`}
                  className={`${styles.thumbnail} ${
                    selectedImageIndex === index ? styles.thumbnailActive : ''
                  }`}
                  onClick={() => handleImageSelect(index)}
                  onError={handleImageError}
                />
              ))}
            </div>
          )}
        </div>

        <div className={styles.productDetails}>
          {/* Brand and Title */}
          <div className={styles.brandTitle}>
            <h2 className={styles.brand}>{data?.selectedProduct?.product?.brand}</h2>
            <h1 className={styles.title}>{data?.selectedProduct?.product?.name}</h1>
          </div>

          {/* Rating */}
          <div className={styles.ratingRow}>
            <div className={styles.stars}>
              {data.selectedProduct?.product &&
                renderStars(averageRating(data.selectedProduct?.product?.reviews))}
            </div>
            <span className={styles.ratingText}>
              ({data.selectedProduct?.product?.reviews.length} reviews)
            </span>
          </div>

          {/* Price */}
          <div className={styles.priceSection}>
            <div className={styles.priceRow}>
              <span className={styles.price}>{ data?.selectedProduct?.product?.price && "₹"+Math.round(data?.selectedProduct?.product?.price)}</span>
              <span className={styles.oldPrice}>
                {data?.selectedProduct?.product?.price
                  ?'₹'+Math.round( data?.selectedProduct?.product?.price +
                    (data?.selectedProduct?.product?.price
                      ? (40 * data?.selectedProduct?.product?.price) / 100
                      : 0))
                  : data?.selectedProduct?.product?.price && '₹'+Math.round(data?.selectedProduct?.product?.price)}
              </span>
              <span className={styles.discount}>40% OFF</span>
            </div>
            <p className={styles.taxInfo}>inclusive of all taxes</p>
          </div>

          {/* Size Selection */}
          <div className={styles.sizeSection}>
            <div className={styles.sizeHeaderRow}>
              <h3 className={styles.sizeLabel} style={{marginBottom:'-2px'}}>Select Size</h3>
            </div>
          </div>
          <div className={styles.sizesRow}>
            {uniqueSizes.map((size) => {
              const sizeVariants = variants.filter((v) => v.size === size);
              const isOutOfStock = !sizeVariants.some((v) => v.stock > 0);
              const variantForSelectedColor = variants.find(
                (v) => v.color == selectedColor && v.size == size
              );
              const isSelected = selectedSize === size;
              return (
                <button
                  key={size}
                  onClick={() => handleSize(size)}
                  className={`${styles.sizeBtn} ${
                    selectedSize === size ? styles.sizeBtnSelected : ""
                  } ${
                    isOutOfStock ||
                    notCompatible.size === size ||
                    (!variantForSelectedColor && isSelected)
                      ? styles.sizeBtnOutOfStock
                      : ""
                  }`}
                  disabled={isOutOfStock}
                >
                  {size}
                </button>
              );
            })}
          </div>

          {/* Color Selection */}
          <div className={styles.sizeSection}>
            <div className={styles.sizeHeaderRow}>
              <h3 className={styles.sizeLabel}>Select Color</h3>
            </div>
            <div className={styles.sizesRow}>
              {uniqueColors.map((color) => {
                const colorVariants = variants.filter((v) => v.color === color);
                const isOutOfStock = !colorVariants.some((v) => v.stock > 0);
                const variantForSelectedSize = variants.find(
                  (v) => v.size === selectedSize && v.color === color
                );
                const isSelected = selectedColor === color;

                return (
                  <button
                    key={color}
                    onClick={() => handleColor(color)}
                    className={`${styles.colorBtn} ${
                      selectedColor === color ? styles.colorBtnSelected : ""
                    } ${
                      isOutOfStock ||
                      notCompatible.color === color ||
                      (!variantForSelectedSize && isSelected)
                        ? styles.sizeBtnOutOfStock
                        : ""
                    }`}
                    disabled={isOutOfStock}
                    style={{backgroundColor:`${getColorCodeFromString(color)}`}}
                  >
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className={styles.actionSection}>
            {variants?.find((v) => v.size === selectedSize && v.color === selectedColor)?.stock === 0 ||
            !variants.find(
              (v) =>
                v.size === selectedSize &&
                v.color === selectedColor 
            ) ||  data.selectedProduct?.product.totalStock === 0 ? (
              <button className={styles.notifyButton}>Notify Me</button>
            ) : (
              <>
              {cartData.cart.length<=0 || cartData.cart.find(val=>val.productId!=id)?<button className={styles.addToBagBtn} onClick={addToBag}>ADD TO BAG</button>:<button className={styles.addToBagBtn} onClick={removeFromBag}>REMOVE FROM BAG</button>}
              </>
            )}

            { wishlistData.items.find(val=>val.productId==id)?  <button
              className={`${styles.wishlistBtn} ${styles.wishlistBtnSelected}`}
              onClick={removeWishlist}
            >
                <FavoriteIcon
                  className={styles.heartIcon}
                  sx={{ color: "#3D857E", fontSize: 20, verticalAlign: "middle" }}
                />
                 <span>WISHLIST</span>
              </button>: <button className={`${styles.wishlistBtn}`} onClick={addWishlist}>
                <FavoriteBorderIcon
                  className={styles.heartIcon}
                  sx={{ color: "#3D857E", fontSize: 20, verticalAlign: "middle" }}
                />
               <span>WISHLIST</span>
            </button>}
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
      <AvailableOffers offers={offers}/>
      <ProductInfo/>
      <ReviewSection />
      <BoughtTogether/>
      <SimilarProduct />
    </div>
  );
};

export default ProductDetails;