
import React from 'react';
import styles from './ToggleButtons.module.css';
import { TOGGLE_BUTTONS, type TOGGLE_BUTTONS_TYPE } from '../../Store.enum';

interface ToggleButtonsProps {
  activeView: TOGGLE_BUTTONS_TYPE;
  setActiveView: (view: TOGGLE_BUTTONS_TYPE) => void;
}

const ToggleButtons: React.FC<ToggleButtonsProps> = ({ activeView, setActiveView }) => {
  return (
    <div className={styles.toggleButtonGroup}>
      <button
        onClick={() => setActiveView(TOGGLE_BUTTONS.LIST )}
        className={`${styles.toggleButton} ${activeView === TOGGLE_BUTTONS.LIST ? styles.active : ''}`}
      >
        List
      </button>
      <button
        onClick={() => setActiveView(TOGGLE_BUTTONS.MAP)}
        className={`${styles.toggleButton} ${activeView === TOGGLE_BUTTONS.MAP ? styles.active : ''}`}
      >
        Map
      </button>
    </div>
  );
};

export default React.memo(ToggleButtons);