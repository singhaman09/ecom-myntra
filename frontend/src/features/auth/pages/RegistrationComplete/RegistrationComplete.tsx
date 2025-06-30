import React from 'react';
import styles from './RegistrationComplete.module.css';

import successImg from '../../../../assets/icons/successpage.svg';
import { useNavigate } from 'react-router-dom';

const CongratulationsPage: React.FC = () => {
    const navigate = useNavigate();
  const handleShopNow = () => {
    navigate('/login');
  };

  return (
    <div className={styles.container}>
      {/* Decorative Elements */}
      <div className={styles.decorativeElements}>
        <div className={`${styles.element} ${styles.element1}`}>ʌ</div>
        <div className={`${styles.element} ${styles.element2}`}>ツ</div>
        <div className={`${styles.element} ${styles.element3}`}>●</div>
        <div className={`${styles.element} ${styles.element4}`}>●</div>
        <div className={`${styles.element} ${styles.element5}`}>ʌ</div>
        <div className={`${styles.element} ${styles.element6}`}>ʌ</div>
        <div className={`${styles.element} ${styles.element7}`}>●</div>
        <div className={`${styles.element} ${styles.element8}`}>○</div>
        <div className={`${styles.element} ${styles.element9}`}>-</div>
        <div className={`${styles.element} ${styles.element10}`}>○</div>
        <div className={`${styles.element} ${styles.element11}`}>●</div>
        <div className={`${styles.element} ${styles.element12}`}>ʌ</div>
        <div className={`${styles.element} ${styles.element13}`}>-</div>
        <div className={`${styles.element} ${styles.element14}`}>●</div>
        <div className={`${styles.element} ${styles.element15}`}>○</div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <div className={styles.checkIcon}>
          <img className={styles.checkmark} src={successImg} />
        </div>
        
        <h1 className={styles.title}>Congratulations!</h1>
        
        <p className={styles.subtitle}>
          You've successfully Registered<br />
          yourself on application
        </p>
        
        <button
          className={styles.button}
          onClick={handleShopNow}
        >
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default CongratulationsPage;