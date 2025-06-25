import React from 'react';
import styles from '../css/ConfirmModal.module.css';

interface ConfirmModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ message, onConfirm, onCancel }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <p>{message}</p>
        <div className={styles.buttonGroup}>
          <button onClick={onConfirm} className={styles.confirmBtn}>Yes</button>
          <button onClick={onCancel} className={styles.cancelBtn}>No</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
