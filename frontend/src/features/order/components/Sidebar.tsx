// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import styles from '../css/sidebar.module.css';
// import {
//   FaUser, FaWallet, FaHome, FaCreditCard, FaCogs,
//   FaSignOutAlt, FaQuestionCircle, FaGift, FaHeart, FaThLarge, FaClock, FaPaw, FaShareAlt
// } from 'react-icons/fa';

// interface SidebarProps {
//   isVisible: boolean;
//   onClose: () => void;
// }

// const Sidebar: React.FC<SidebarProps> = ({ isVisible, onClose }) => {
//   const menuItems = [
//     { to: '/profile', label: 'My Account', icon: <FaUser /> },
//     { to: '/', label: 'My Dashboard', icon: <FaThLarge /> },
//     { to: '/wallet', label: 'My Wallet', icon: <FaWallet /> },
//     { to: '/orders', label: 'My Orders', icon: <FaClock /> },
//     { to: '/wishlist', label: 'My Wishlist', icon: <FaHeart /> },
//     { to: '/address', label: 'My Address', icon: <FaHome /> },
//     { to: '/payment-methods', label: 'My Payment Methods', icon: <FaCreditCard /> },
//     { to: '/skin-preferences', label: 'My Skin Preferences', icon: <FaPaw /> },
//     { to: '/refer', label: 'Refer and Earn', icon: <FaShareAlt /> },
//     { to: '/settings', label: 'Settings', icon: <FaCogs /> },
//     { to: '/order-queries', label: 'Order Related Queries', icon: <FaQuestionCircle /> },
//     { to: '/logout', label: 'Logout', icon: <FaSignOutAlt /> },
//   ];

//   return (
//     <>
//       {isVisible && <div className={styles.mobileOverlay} onClick={onClose} />}
//       <aside className={`${styles.sidebar} ${isVisible ? styles.sidebarVisible : ''}`}>
//         <div className={styles.sidebarContent}>
//           <ul className={styles.menuList}>
//             {menuItems.map((item) => (
//               <li key={item.to} className={styles.menuItem}>
//                 <NavLink
//                   to={item.to}
//                   className={({ isActive }) =>
//                     `${styles.menuLink} ${isActive ? styles.menuLinkActive : ''}`
//                   }
//                   onClick={onClose}
//                 >
//                   <span className={styles.icon}>{item.icon}</span>
//                   <span>{item.label}</span>
//                 </NavLink>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </aside>
//     </>
//   );
// };

// export default Sidebar;