import React, { useState } from "react";
import styles from "../styles/ShadeSize.module.css";
import type {  Shade, Size } from "../interfaces/ProductInterfaces";
import { MoveLeft } from "lucide-react";

interface SelectShadeSizeModalProps {
  onClose: () => void;
  onConfirm: (selection: { shade: Shade; size: Size }) => void;
}
const product= {
    name: "Satsuma Shower Gel",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
    description: "For all skin type • Vegan",
    price: 999,
    shades: [
      { id: 1, color: "#b83a4b", name: "Rose Red" },
      { id: 2, color: "#e97ca3", name: "Pink" },
      { id: 3, color: "#e97a6a", name: "Peach" }
    ],
    sizes: [
      { id: 1, label: "100ml" },
      { id: 2, label: "200ml" },
      { id: 3, label: "500ml" }
    ]
  };
const getDiscountedPrice = (price: number, discountPercent: number) =>
  Math.round(price * (1 - discountPercent / 100));

const SelectShadeSizeModal: React.FC<SelectShadeSizeModalProps> = ({
 
  onClose,
  onConfirm,
}) => {
  const [selectedShade, setSelectedShade] = useState<Shade | null>(null);
  const [shadeConfirmed, setShadeConfirmed] = useState(false);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);

  // Step 1: Select shade and confirm
  if (!shadeConfirmed) {
    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <button className={styles.closeButton} onClick={onClose} aria-label="Close">&times;</button>
          <h2>Select Shade</h2>
          <div className={styles.productInfo}>
            <img
              src={product.image}
              alt={product.name}
              className={styles.productImage}
            />
            <div>
              <h3 className={styles.productName}>{product.name}</h3>
              <p className={styles.productDesc}>{product.description}</p>
            </div>
          </div>
          <div>
            <div className={styles.shadesLabel}>Shades</div>
            <div className={styles.shadesList}>
              {product.shades.map((shade) => (
                <div
                  key={shade.id}
                  className={
                    styles.shadeCircle +
                    (selectedShade?.id === shade.id ? " " + styles.shadeSelected : "")
                  }
                  style={{ background: shade.color }}
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
     <div className={styles.backContainer} onClick={()=>setShadeConfirmed(false)}>
     <MoveLeft size={'16px'}/>
     <button className={styles.backButton}  aria-label="Back">Back</button>
     </div>
  
    
    
        <button className={styles.closeButton} onClick={onClose} aria-label="Close">&times;</button>
        <h2>Select Size</h2>
        <div className={styles.productInfo}>
          <img
            src={product.image}
            alt={product.name}
            className={styles.productImage}
          />
          <div>
            <h3 className={styles.productName}>{product.name}</h3>
            <p className={styles.productDesc}>{product.description}</p>
          </div>
        </div>
        <div>
          <div className={styles.sizesLabel}>Sizes</div>
          <div className={styles.sizesList}>
            {product.sizes.map((size) => (
              <button
                key={size.id}
                className={
                  styles.sizeButton +
                  (selectedSize?.id === size.id ? " " + styles.sizeSelected : "")
                }
                onClick={() => setSelectedSize(size)}
              >
                {size.label}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.priceTag}>
          <span style={{ textDecoration: "line-through", marginRight: 8, color: "#b0b0b0" }}>
            ₹{product.price}
          </span>
          <span style={{ color: "#d32f2f", fontWeight: 600 }}>
            ₹{discountedPrice}
          </span>
          <span style={{ marginLeft: 8, color: "#388e3c", fontWeight: 500, fontSize: "0.95em" }}>
            (40% OFF)
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
  );
};

export default SelectShadeSizeModal;
