import React from 'react';
import styles from '../css/OrderNotFound.module.css';
import { useNavigate } from 'react-router-dom';

const OrderNotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1 className={styles.code}>404</h1>
      <p className={styles.message}>Order Not Found</p>
      <button className={styles.button} onClick={() => navigate('/')}>
        Go to Homepage
      </button>
    </div>
  );
};

export default OrderNotFound;
