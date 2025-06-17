import React, { useState } from "react";
import styles from "./styles/SimilarProducts.module.css";
import type { Product } from "../types/cart"; // Adjust the import path as necessary


interface SimilarProductsProps {
  products: Product[];
  onAddToCart: (id: string) => void;
}

const SimilarProducts: React.FC<SimilarProductsProps> = ({
  products,
  onAddToCart,
}) => {
  // State for active category (simulated since category field is not present in data)
  const [activeCategory, setActiveCategory] = useState("All");

  // Dummy categories for the buttons (since category field is missing)
  const categories = [
    "All",
    "Roll-Ons",
    "Day Cream",
    "Conditioner",
    "Body Cream and Lotion",
    "Night Cream",
    "Deodorant",
    "Hair Serum",
    "Lip Balm",
      ];

  // Simulated filtering (won't filter yet since products lack category)
  const filteredProducts = products; // Placeholder for future filtering logic

  return (
    <div className={styles.suggestionSection}>
      <h3 className={styles.heading}>YOU MAY ALSO LIKE</h3>
      <div className={styles.categoryButtons}>
        {categories.map((category) => (
          <button
            key={category}
            className={`${styles.categoryBtn} ${
              activeCategory === category ? styles.active : ""
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className={styles.productList}>
        {filteredProducts.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <img
              src={product.image}
              alt={product.name}
              className={styles.productImg}
              
              loading="lazy"
            />
            <p className={styles.brand}>{product.brand}</p>
            <p className={styles.name}>{product.name}</p>
            <div className={styles.priceRow}>
              <span className={styles.price}>
                ₹{product.price - product.discount}
              </span>
              <span className={styles.original}>₹{product.price}</span>
              <span className={styles.discount}>
                ({Math.round((product.discount / product.price) * 100)}% OFF)
              </span>
            </div>
            <button
              className={styles.addBtn}
              onClick={() => onAddToCart(product.id)}
            >
              ADD TO CART
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarProducts;
