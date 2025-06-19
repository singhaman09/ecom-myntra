import React from 'react';
import styles from '../css/Helpsupport.module.css';

interface HelpSupportHeaderProps {
  onBack: () => void;
}

const HelpSupportHeader: React.FC<HelpSupportHeaderProps> = ({ onBack }) => {
  return (
    <div className={styles.header}>
      <button className={styles.backButton} onClick={onBack}>
        ←
      </button>
      <h1 className={styles.headerTitle}>Help & Support</h1>
    </div>
  );
};

export default HelpSupportHeader;
