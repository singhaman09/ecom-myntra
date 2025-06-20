
import React from 'react';
import styles from './ToggleButtons.module.css';

interface ToggleButtonsProps {
  activeView: 'list' | 'map';
  setActiveView: (view: 'list' | 'map') => void;
}

const ToggleButtons: React.FC<ToggleButtonsProps> = ({ activeView, setActiveView }) => {
  return (
    <div className={styles.toggleButtonGroup}>
      <button
        onClick={() => setActiveView('list')}
        className={`${styles.toggleButton} ${activeView === 'list' ? styles.active : ''}`}
      >
        List
      </button>
      <button
        onClick={() => setActiveView('map')}
        className={`${styles.toggleButton} ${activeView === 'map' ? styles.active : ''}`}
      >
        Map
      </button>
    </div>
  );
};

export default ToggleButtons;