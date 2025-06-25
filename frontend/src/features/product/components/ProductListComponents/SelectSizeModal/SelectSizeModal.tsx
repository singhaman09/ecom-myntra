import React, { useMemo, useState } from "react";
import styles from "./ShadeSize.module.css";
import type { Product, Shade, Size } from "../../../interfaces/ProductInterfaces";
import { MoveLeft } from "lucide-react";
import { getColorCodeFromString } from "../../../utils/colorsMapping";
import { handleImageError } from "../../../utils/HandleImageError";

interface SelectShadeSizeModalProps {
  product: Product;
  onClose: () => void;
  onConfirm: (selection: { shade: Shade; size: Size }) => void;
}

const getDiscountedPrice = (price: number, discountPercent: number) =>
  Math.round(price * (1 - discountPercent / 100));

const SelectShadeSizeModal: React.FC<SelectShadeSizeModalProps> = ({
  product,
  onClose,
  onConfirm,
}) => {
  const [selectedShade, setSelectedShade] = useState<Shade | null>(null);
  const [shadeConfirmed, setShadeConfirmed] = useState(false);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);

  const uniqueColors = useMemo(
    () => [...new Set(product.variants.map((v) => v.color))],
    [product.variants]
  );
  const uniqueSizes = useMemo(
    () => [...new Set(product.variants.map((v) => v.size))],
    [product.variants]
  );

  const productData = {
    name: product.name,
    image: product.images.find((val) => val.isPrimary)?.url || "",
    description: product.description,
    price: product.price,
    shades: uniqueColors.map((val, index) => ({
      id: index + 1,
      name: val,
      color: getColorCodeFromString(val) ?? "white",
    })),
    sizes: uniqueSizes.map((val, index) => ({
      id: index + 1,
      label: val,
    })),
  };

  // Step 1: Select shade and confirm
  if (!shadeConfirmed) {
    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <button className={styles.closeButton} onClick={onClose} aria-label="Close">
            &times;
          </button>
          <h2>Select Shade</h2>
          <div className={styles.productInfo}>
            <img
              src={productData.image}
              alt={product.name}
              className={styles.productImage}
              onError={handleImageError}
            />
            <div>
              <h3 className={styles.productName}>{product.name}</h3>
              <p className={styles.productDesc}>{product.description}</p>
            </div>
          </div>
          <div>
            <div className={styles.shadesLabel}>Shades</div>
            <div className={styles.shadesList}>
              {productData.shades.map((shade) => (
                <div
                  key={shade.id}
                  className={
                    styles.shadeCircle +
                    (selectedShade?.id === shade.id ? " " + styles.shadeSelected : "")
                  }
                  style={{ background: `${shade.color}` }}
                  onClick={() => setSelectedShade(shade)}
                  title={shade.name}
                >
                  {selectedShade?.id === shade.id && (
                    <span className={styles.shadeCheck}>✔</span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <button
            className={styles.confirmButton}
            onClick={() => setShadeConfirmed(true)}
            disabled={!selectedShade}
            style={{ marginTop: 32 }}
          >
            Confirm Shade
          </button>
        </div>
      </div>
    );
  }

  // Step 2: Select size and confirm, show discounted price
  const discountedPrice = getDiscountedPrice(product.price, 40);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.backContainer} onClick={() => setShadeConfirmed(false)}>
          <MoveLeft size={"16px"} />
          <button className={styles.backButton} aria-label="Back">
            Back
          </button>
        </div>

        <button className={styles.closeButton} onClick={onClose} aria-label="Close">
          &times;
        </button>
        <h2>Select Size</h2>
        <div className={styles.productInfo}>
          <img
            src={productData.image}
            alt={product.name}
            className={styles.productImage}
            onError={handleImageError}
          />
          <div>
            <h3 className={styles.productName}>{product.name}</h3>
            <p className={styles.productDesc}>{product.description}</p>
          </div>
        </div>
        <div>
          <div className={styles.sizesLabel}>Size</div>
          <div className={styles.sizesListColumn}>
            {productData.sizes.map((size) => {
              const isOutOfStock = !product.variants.find(
                (val) =>
                  val.size === size.label && val.color === selectedShade?.name && val.stock
              );
              return (
                <label
                  key={size.id}
                  className={
                    styles.sizeRadioLabel 
                  }
                >
                    <div> {size.label}
                  {isOutOfStock && (
                    <span className={styles.outOfStockText}> (Out of stock)</span>
                  )}</div>
                  <input
                    type="radio"
                    name="size"
                    value={size.label}
                    checked={selectedSize?.id === size.id}
                    onChange={() => setSelectedSize(size)}
                    disabled={isOutOfStock}
                    className={styles.sizeRadioInput}
                  />
               
                </label>
              );
            })}
          </div>
        </div>
        <div className={styles.priceTag}>
          <div>
            <span style={{ color: "#333333", fontWeight: 600 }}>
              ₹{discountedPrice}
            </span>
            &nbsp;&nbsp;
            <span
              style={{
                textDecoration: "line-through",
                marginRight: 8,
                color: "#666666",
              }}
            >
              ₹{product.price}
            </span>
          </div>

          <button
            className={styles.confirmButton}
            onClick={() => {
              if (selectedShade && selectedSize) {
                onConfirm({ shade: selectedShade, size: selectedSize });
              }
            }}
            disabled={!selectedSize}
          >
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectShadeSizeModal;
