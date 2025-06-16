import React, { useEffect, useState, useMemo } from "react";
import styles from "../styles/ProductDetail.module.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { renderStars } from "../utils/RenderStars";
import { useParams, useSearchParams } from "react-router-dom";
import { useProductDispatch, useProductSelector } from "../hooks/storeHooks";
import { getProductDetails } from "../productAPI";
import Loader from "../utils/Loader";
import { averageRating } from "../utils/Reviews";

// Lazy load components (no Suspense here)
const SimilarProduct = React.lazy(() => import("../components/SimilarProduct"));
const ReviewSection = React.lazy(() => import("../components/ReviewSection"));
const ImageZoomOnHover = React.lazy(() => import("../components/ImageZoom"));
const Breadcrumbs = React.lazy(() => import("../utils/BreadCrumbs"));
const ErrorPage = React.lazy(() => import("./ErrorPage"));

const ProductDetails = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { id } = useParams();
  const dispatch = useProductDispatch();
  const data = useProductSelector((state) => state.product);
  const variants = data?.selectedProduct?.product?.variants || [];
  const uniqueColors = useMemo(() => [...new Set(variants.map((v) => v.color))], [variants]);
  const uniqueSizes = useMemo(() => [...new Set(variants.map((v) => v.size))], [variants]);
  const [notCompatible, setNotCompatible] = useState({ color: "", size: "" });
  const selectedSize = searchParams.get("size") || uniqueSizes[0] || "";
  const selectedColor = searchParams.get("color") || uniqueColors[0] || "";

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  const handleSize = (size: string) => {
    setNotCompatible({ color: "", size: "" });
    if (!variants.find((v) => v.size === size && v.color === selectedColor)) {
      setNotCompatible({ color: selectedColor, size: size });
    }
    searchParams.set("size", size);
    setSearchParams(searchParams, { replace: true });
  };

  const handleColor = (color: string) => {
    setNotCompatible({ color: "", size: "" });
    if (!variants.find((v) => v.color === color && v.size === selectedSize)) {
      setNotCompatible({ color: color, size: selectedSize });
    }
    searchParams.set("color", color);
    setSearchParams(searchParams, { replace: true });
  };

  if (data.loading) return <Loader />;
  if (data.error) return <ErrorPage />;

  return (
    <div className={styles.container}>
      <Breadcrumbs />
      <div className={styles.gridLayout}>
        <ImageZoomOnHover
          src={data.selectedProduct?.product.imageUrl ? data.selectedProduct?.product.imageUrl : ""}
          alt="Headphones"
        />
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
              <span className={styles.price}>{data?.selectedProduct?.product?.price}</span>
              <span className={styles.oldPrice}>
                {data?.selectedProduct?.product?.price
                  ? data?.selectedProduct?.product?.price +
                    (data?.selectedProduct?.product?.price
                      ? (40 * data?.selectedProduct?.product?.price) / 100
                      : 0)
                  : data?.selectedProduct?.product?.price}
              </span>
              <span className={styles.discount}>40% OFF</span>
            </div>
            <p className={styles.taxInfo}>inclusive of all taxes</p>
          </div>

          {/* Size Selection */}
          <div className={styles.sizeSection}>
            <div className={styles.sizeHeaderRow}>
              <h3 className={styles.sizeLabel}>Size</h3>
            </div>
          </div>
          <div className={styles.sizesRow}>
            {uniqueSizes.map((size) => {
              const sizeVariants = variants.filter((v) => v.size === size);
              const isOutOfStock = !sizeVariants.some((v) => v.stock > 0);
              const variantForSelectedColor = variants.find(
                (v) => v.color === selectedColor && v.size === size
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
              <h3 className={styles.sizeLabel}>Color</h3>
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
                    className={`${styles.sizeBtn} ${
                      selectedColor === color ? styles.sizeBtnSelected : ""
                    } ${
                      isOutOfStock ||
                      notCompatible.color === color ||
                      (!variantForSelectedSize && isSelected)
                        ? styles.sizeBtnOutOfStock
                        : ""
                    }`}
                    disabled={isOutOfStock}
                  >
                    {color}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Product Description */}
          <div className={styles.descriptionSection}>
            <p className={styles.descriptionText}>
              {data?.selectedProduct?.product?.description}
            </p>
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
              {1?<button className={styles.addToBagBtn}>ADD TO BAG</button>:<button className={styles.addToBagBtn}>REMOVE FROM BAG</button>}
              </>
            )}

            <button
              className={`${styles.wishlistBtn} ${0 ? styles.wishlistBtnSelected : ""}`}
            >
              {0 ? (
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
      <ReviewSection />
      <SimilarProduct />
    </div>
  );
};

export default ProductDetails;
