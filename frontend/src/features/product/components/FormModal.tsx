import React from 'react';
import styles from '../styles/FormModal.module.css';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const FormModal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={e => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">&times;</button>
        {children}
      </div>
    </div>
  );
};

export default FormModal;
