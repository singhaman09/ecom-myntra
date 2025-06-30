import React, { useState } from 'react';
import {
  Package, RefreshCw, User, MapPin, Key, Trash2,
  FileText, Shield, ChevronRight, Bell, LogOut, X
} from 'lucide-react';
import styles from './Sidebar.module.css';
import type { SidebarItem } from '../../types/profile.types';
import { useAuth } from '../../../auth/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  activeItem: string;
  onItemClick: (itemId: string) => void;
  user: {
    name: string;
    email: string;
    createdAt?: string;
  };
  onLogout?: () => Promise<void>;
}

const Sidebar: React.FC<SidebarProps> = ({ activeItem, onItemClick, user, onLogout }) => {
  const { logoutRequest } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  const ICONS = {
    Package, RefreshCw, User, Bell, MapPin, Key, Trash2,
    FileText, Shield, LogOut
  };

  const accountItems: SidebarItem[] = [
    { id: 'profile', label: 'Profile', icon: 'User' },
    { id: 'notifications', label: 'Notifications', icon: 'Bell' },
    { id: 'orders', label: 'Orders', icon: 'Package' },
    { id: 'addresses', label: 'Addresses', icon: 'MapPin' },
    { id: 'change-password', label: 'Change Password', icon: 'Key' },
    { id: 'delete-account', label: 'Delete Account', icon: 'Trash2' },
    { id: 'logout', label: 'Logout', icon: 'LogOut' }
  ];

  const legalItems: SidebarItem[] = [
    { id: 'terms', label: 'Terms of Use', icon: 'FileText' },
    { id: 'privacy', label: 'Privacy Policy', icon: 'Shield' }
  ];

  const getIcon = (icon: string) => {
    const IconComponent = ICONS[icon as keyof typeof ICONS];
    return IconComponent ? <IconComponent /> : null;
  };

  const handleItemClick = (id: string) => {
    id === 'logout' ? setShowLogoutModal(true) : onItemClick(id);
  };

  const handleLogoutConfirm = async () => {
    setIsLoggingOut(true);
    try {
      if (onLogout) await onLogout();
      else {
        logoutRequest();
        navigate('/login');
      }
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      setIsLoggingOut(false);
      setShowLogoutModal(false);
    }
  };

  const cancelLogout = () => !isLoggingOut && setShowLogoutModal(false);

  const isActive = (id: string) =>
    activeItem.includes(`/profile/${id}`) || (id === 'profile' && activeItem === '/profile');

  const getInitials = (name: string) => {
    const [first = '', last = ''] = name.trim().split(/\s+/);
    return (first[0] ?? '').toUpperCase() + (last[0] ?? '').toUpperCase();
  };

  const renderItem = (item: SidebarItem) => (
    <div
      key={item.id}
      className={`${styles.menuItem} ${isActive(item.id) ? styles.active : ''}`}
      onClick={() => handleItemClick(item.id)}
    >
      {item.icon && getIcon(item.icon)}
      <span>{item.label}</span>
      <ChevronRight className={styles.chevron} size={14} />
    </div>
  );

  return (
    <>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarContent}>
          <div className={styles.userInfo}>
            <div className={styles.avatar}>{getInitials(user.name)}</div>
            <div className={styles.userDetails}>
              <h3>{user.name}</h3>
              <p>{user.createdAt && `Member Since: ${new Date(user.createdAt).getFullYear()}`}</p>
            </div>
          </div>

          <div className={styles.menuSection}>
            <div className={styles.sectionTitle}>Account</div>
            {accountItems.map(renderItem)}
          </div>

          <div className={styles.menuSection}>
            <div className={styles.sectionTitle}>Legal</div>
            {legalItems.map(renderItem)}
          </div>
        </div>
      </aside>

      {showLogoutModal && (
        <div
          className={styles.modalOverlay}
          onClick={(e) => e.target === e.currentTarget && cancelLogout()}
          onKeyDown={(e) => e.key === 'Escape' && cancelLogout()}
          tabIndex={-1}
        >
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <div className={styles.iconContainer}>
                <LogOut size={24} className={styles.logoutIcon} />
              </div>
              <button
                className={styles.closeButton}
                onClick={cancelLogout}
                disabled={isLoggingOut}
              >
                <X size={20} />
              </button>
            </div>

            <div className={styles.modalBody}>
              <h2 className={styles.title}>Confirm Logout</h2>
              <p className={styles.message}>
                Are you sure you want to log out? You'll need to sign in again to access your account.
              </p>
            </div>

            <div className={styles.modalFooter}>
              <button
                className={styles.cancelButton}
                onClick={cancelLogout}
                disabled={isLoggingOut}
              >
                Cancel
              </button>
              <button
                className={styles.confirmButton}
                onClick={handleLogoutConfirm}
                disabled={isLoggingOut}
              >
                {isLoggingOut ? <><div className={styles.spinner}></div> Logging out...</> : 'Yes, Log out'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;