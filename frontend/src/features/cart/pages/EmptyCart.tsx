// src/components/EmptyCart.tsx
import React from 'react';
import EmptyBag from "../../../assets/EmptyBag.png"
import styles from '../components/styles/EmptyCart.module.css';
import { useNavigate } from 'react-router-dom';

const EmptyCart: React.FC = () => {
  const navigate = useNavigate();
  const handleAddWishlist = () => {
    navigate("/wishlist");
  };
  return (
    <>
      <section className={styles.emptyCart}>
        <div className={styles.emptyCartWrapper}>
          <img
            src={EmptyBag}
            className={styles.emptyBagImg}
          />
          <button onClick={handleAddWishlist} className={styles.wishlistBtn}>SELECT FROM WISHLIST</button>
        </div>
      </section>
    </>
  );
};

export default EmptyCart;