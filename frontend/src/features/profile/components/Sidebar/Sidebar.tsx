import React, { useState } from 'react';
import { 
  Package, 
  RefreshCw, 
  User, 
  MapPin, 
  Key,
  Trash2, 
  FileText, 
  Shield,
  ChevronRight,
  Bell,
  LogOut,
  X
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
    createdAt: string;
  };
  onLogout?: () => Promise<void>;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeItem, 
  onItemClick, 
  user,
  onLogout 
}) => {
  const { logoutRequest , signOut } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  const accountItems: SidebarItem[] = [
    {
      id: 'profile',
      label: 'Profile',
      icon: 'User'
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: 'Bell'
    },
    {
      id: 'orders',
      label: 'Orders',
      icon: 'Package'
    },
    {
      id: 'addresses',
      label: 'Addresses',
      icon: 'MapPin'
    },
    {
      id: 'change-password',
      label: 'Change Password',
      icon: 'Key'
    },
    {
      id: 'delete-account',
      label: 'Delete Account',
      icon: 'Trash2'
    },
    {
      id: 'logout',
      label: 'Logout',
      icon: 'LogOut'
    }
  ];

  const legalItems: SidebarItem[] = [
    {
      id: 'terms',
      label: 'Terms of Use',
      icon: 'FileText'
    },
    {
      id: 'privacy',
      label: 'Privacy Policy',
      icon: 'Shield'
    }
  ];

  const getIcon = (iconName: string) => {
    const icons = {
      Package,
      RefreshCw,
      User,
      Bell,
      MapPin,
      Key,
      Trash2,
      FileText,
      Shield,
      LogOut
    };
    const IconComponent = icons[iconName as keyof typeof icons];
    return IconComponent ? <IconComponent /> : null;
  };

  const handleItemClick = (itemId: string) => {
    if (itemId === 'logout') {
      setShowLogoutModal(true);
    } else {
      onItemClick(itemId);
    }
  };

  const handleLogoutConfirm = async () => {
    if (!onLogout) {
      logoutRequest();
      navigate('/login');
      
      console.warn('No logout handler provided');
      setShowLogoutModal(false);
      return;
    }
    
    setIsLoggingOut(true);
    try {
      await onLogout();
      setShowLogoutModal(false);
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleLogoutCancel = () => {
    if (!isLoggingOut) {
      setShowLogoutModal(false);
    }
  };

  const handleModalBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !isLoggingOut) {
      handleLogoutCancel();
    }
  };

  const handleModalKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && !isLoggingOut) {
      handleLogoutCancel();
    }
  };

  const renderMenuItem = (item: SidebarItem) => (
    <div
      key={item.id}
      className={`${styles.menuItem} ${
        activeItem.includes(`/profile/${item.id}`) || 
        (item.id === 'profile' && activeItem === '/profile') 
          ? styles.active 
          : ''
      }`}
      onClick={() => handleItemClick(item.id)}
    >
      {item.icon && getIcon(item.icon)}
      <span>{item.label}</span>
      <ChevronRight className={styles.chevron} size={14} />
    </div>
  );

  const parseNameAndGetInitials = (fullName: string) => {
    if (!fullName) return '';
    
    const nameParts = fullName.trim().split(/\s+/);
    const firstInitial = nameParts[0]?.charAt(0).toUpperCase() || '';
    const lastInitial = nameParts[nameParts.length - 1]?.charAt(0).toUpperCase() || '';
    if (nameParts.length === 1) {
      return firstInitial;
    }
    
    return firstInitial + lastInitial;
  };

  const getMemberSinceYear = (createdAt: string) => {
    if (!createdAt) return '';
    const year = new Date(createdAt).getFullYear();
    return `Member Since: ${year}`;
  };

  return (
    <>
      <div className={styles.sidebar}>
        <div className={styles.sidebarContent}>
          <div className={styles.userInfo}>
            <div className={styles.avatar}>
              {user?.name ? parseNameAndGetInitials(user.name) : ''}
            </div>
            <div className={styles.userDetails}>
              <h3>{user.name}</h3>
              <p>{getMemberSinceYear(user.createdAt)}</p>
            </div>
          </div>       

          <div className={styles.menuSection}>
            <div className={styles.sectionTitle}>Account</div>
            {accountItems.map(renderMenuItem)}
          </div>

          <div className={styles.menuSection}>
            <div className={styles.sectionTitle}>Legal</div>
            {legalItems.map(renderMenuItem)}
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div 
          className={styles.modalOverlay}
          onClick={handleModalBackdropClick}
          onKeyDown={handleModalKeyDown}
          tabIndex={-1}
        >
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <div className={styles.iconContainer}>
                <LogOut className={styles.logoutIcon} size={24} />
              </div>
              <button
                className={styles.closeButton}
                onClick={handleLogoutCancel}
                disabled={isLoggingOut}
                aria-label="Close modal"
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
                onClick={handleLogoutCancel}
                disabled={isLoggingOut}
              >
                Cancel
              </button>
              <button
                className={styles.confirmButton}
                onClick={handleLogoutConfirm}
                disabled={isLoggingOut}
              >
                {isLoggingOut ? (
                  <>
                    <div className={styles.spinner}></div>
                    Logging out...
                  </>
                ) : (
                  'Yes, Log out'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;