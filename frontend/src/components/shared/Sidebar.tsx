import React from 'react';
import styles from '../../components/shared/css/sidebar.module.css';

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
                <a href="/orders" className={`${styles.menuLink} ${styles.menuLinkActive}`}>
                  Orders & Returns
                </a>
              </li>
            </ul>
          </div>
          
          <div className={styles.menuSection}>
            <h3 className={styles.sectionTitle}>CREDITS</h3>
            <ul className={styles.menuList}>
              <li className={styles.menuItem}>
                <a href="/coupons" className={styles.menuLink}>
                  Coupons
                </a>
              </li>
              <li className={styles.menuItem}>
                <a href="/credits" className={styles.menuLink}>
                  Myntra Credit
                </a>
              </li>
              <li className={styles.menuItem}>
                <a href="/myncash" className={styles.menuLink}>
                  MynCash
                </a>
              </li>
            </ul>
          </div>
          
          <div className={styles.menuSection}>
            <h3 className={styles.sectionTitle}>ACCOUNT</h3>
            <ul className={styles.menuList}>
              <li className={styles.menuItem}>
                <a href="/profile" className={styles.menuLink}>
                  Profile
                </a>
              </li>
              <li className={styles.menuItem}>
                <a href="/cards" className={styles.menuLink}>
                  Saved Cards
                </a>
              </li>
              <li className={styles.menuItem}>
                <a href="/addresses" className={styles.menuLink}>
                  Addresses
                </a>
              </li>
              <li className={styles.menuItem}>
                <a href="/insider" className={styles.menuLink}>
                  Myntra Insider
                </a>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
