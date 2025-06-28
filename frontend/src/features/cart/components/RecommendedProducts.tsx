// src/components/RecommendedProduct.tsx
import React from "react";
import { Recommended_items } from "../staticData/StaticData";
import { useNavigate } from "react-router-dom";
import { addCartItem } from "../redux/cartSlice";
import { useAppDispatch } from "../hooks/useAppDispatch";
import type { Product } from "../types/cart";
import styles from "../components/styles/RecommendedProduct.module.css";

const RecommendedProduct: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleAddToBag = (item: Product) => {
    dispatch(addCartItem(item.id));
    navigate("/cart");
  };

  return (
    <div className={styles.recommendedContainer}>
      <h2 className={styles.recommendedHeading}>Recommended Products</h2>
      <div className={styles.recommendedGrid}>
        {Recommended_items.map((item) => (
          <div className={styles.productCard} key={item.id}>
            <img src={item.image} alt={item.name} />
            <div className={styles.productInfo}>
              <h3>{item.name}</h3>
              <p className={styles.brand}>{item.brand}</p>
              <p className={styles.price}>
                ₹{(item.price * (1 - item.discount / 100)).toFixed(0)}
                <span className={styles.original}> ₹{item.price}</span>
              </p>
              <button
                className={styles.addButton}
                onClick={() => handleAddToBag(item)}
              >
                Add to Bag
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedProduct;
