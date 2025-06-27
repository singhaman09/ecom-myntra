import React from 'react';
import styles from './css/NotFound.module.css';

const NotFound: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Oops! Page Not Found</h1>
      <a href="/" className={styles.homeLink}>Go to Homepage</a>
    </div>
  );
};

export default NotFound;
