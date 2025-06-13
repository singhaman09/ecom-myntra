// src/components/EmptyCart.tsx
import React from 'react';
import styles from '../components/styles/EmptyCart.module.css';

const EmptyCart: React.FC = () => {
  return (
    <section className={styles.emptyCart}>
      <div className={styles.emptyCartWrapper}>
        <img
          src="https://constant.myntassets.com/checkout/assets/img/empty-bag.webp"
          alt="Empty Bag"
          className={styles.emptyBagImg}
        />
        <p className={styles.emptyMessage}>YOUR CART IS EMPTY</p>
        <p className={styles.emptyDescription}>Add items to your cart to get started</p>
        <button className={styles.wishlistBtn}>SELECT FROM WISHLIST</button>
      </div>
    </section>
  );
};

export default EmptyCart;