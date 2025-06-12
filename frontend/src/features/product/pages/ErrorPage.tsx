import React from 'react';
import styles from '../styles/ErrorPage.module.css'; // Create this CSS module for styling

const ErrorPage: React.FC<{ message?: string }> = ({ message }) => {
  const handleRetry = () => window.location.reload();
 return (
    <div className={styles.container}>
      <div className={styles.icon}>😕</div>
      <h1 className={styles.title}>Oops! Something went wrong.</h1>
      <p className={styles.message}>
        {message || "We couldn't respond now."}
      </p>
      <button className={styles.button} onClick={handleRetry}>
        Try Again
      </button>
    </div>
  );
};

export default ErrorPage;
