import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../css/sidebar.module.css';

interface SidebarProps {
  isVisible: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isVisible, onClose }) => {
  return (
    <>
      {isVisible && (
        <div className={styles.mobileOverlay} onClick={onClose} />
      )}
      <aside className={`${styles.sidebar} ${isVisible ? styles.sidebarVisible : ''}`}>
        <div className={styles.sidebarHeader}>
          <h2 className={styles.accountTitle}>Account</h2>
          <p className={styles.accountName}>Aman</p>
        </div>
        
        <div className={styles.sidebarContent}>
          <div className={styles.menuSection}>
            <h3 className={styles.sectionTitle}>ORDERS</h3>
            <ul className={styles.menuList}>
              <li className={styles.menuItem}>
                <NavLink
                  to="/orders"
                  className={({ isActive }) =>
                    `${styles.menuLink} ${isActive ? styles.menuLinkActive : ''}`
                  }
                  onClick={onClose}
                >
                  Orders & Returns
                </NavLink>
              </li>
            </ul>
          </div>
          
          <div className={styles.menuSection}>
            <h3 className={styles.sectionTitle}>CREDITS</h3>
            <ul className={styles.menuList}>
              <li className={styles.menuItem}>
                <NavLink
                  to="/coupons"
                  className={({ isActive }) =>
                    `${styles.menuLink} ${isActive ? styles.menuLinkActive : ''}`
                  }
                  onClick={onClose}
                >
                  Coupons
                </NavLink>
              </li>
              <li className={styles.menuItem}>
                <NavLink
                  to="/credits"
                  className={({ isActive }) =>
                    `${styles.menuLink} ${isActive ? styles.menuLinkActive : ''}`
                  }
                  onClick={onClose}
                >
                  Myntra Credit
                </NavLink>
              </li>
              <li className={styles.menuItem}>
                <NavLink
                  to="/myncash"
                  className={({ isActive }) =>
                    `${styles.menuLink} ${isActive ? styles.menuLinkActive : ''}`
                  }
                  onClick={onClose}
                >
                  MynCash
                </NavLink>
              </li>
            </ul>
          </div>
          
          <div className={styles.menuSection}>
            <h3 className={styles.sectionTitle}>ACCOUNT</h3>
            <ul className={styles.menuList}>
              <li className={styles.menuItem}>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `${styles.menuLink} ${isActive ? styles.menuLinkActive : ''}`
                  }
                  onClick={onClose}
                >
                  Profile
                </NavLink>
              </li>
              <li className={styles.menuItem}>
                <NavLink
                  to="/cards"
                  className={({ isActive }) =>
                    `${styles.menuLink} ${isActive ? styles.menuLinkActive : ''}`
                  }
                  onClick={onClose}
                >
                  Saved Cards
                </NavLink>
              </li>
              <li className={styles.menuItem}>
                <NavLink
                  to="/addresses"
                  className={({ isActive }) =>
                    `${styles.menuLink} ${isActive ? styles.menuLinkActive : ''}`
                  }
                  onClick={onClose}
                >
                  Addresses
                </NavLink>
              </li>
              <li className={styles.menuItem}>
                <NavLink
                  to="/insider"
                  className={({ isActive }) =>
                    `${styles.menuLink} ${isActive ? styles.menuLinkActive : ''}`
                  }
                  onClick={onClose}
                >
                  Myntra Insider
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;