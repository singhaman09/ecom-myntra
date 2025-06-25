import React from 'react';
import styles from '../css/SomethingWentWrong.module.css';

interface Props {
  message?: string;
  onRetry: () => void;
}

const SomethingWentWrong: React.FC<Props> = ({ message = "Something went wrong.", onRetry }) => {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>⚠️</div>
      <h2 className={styles.title}>Oops!</h2>
      <p className={styles.message}>{message}</p>
      <button className={styles.retryButton} onClick={onRetry}>
        Retry
      </button>
    </div>
  );
};

export default SomethingWentWrong;
