import React from 'react';
import { 
  Package, 
  RefreshCw, 
  User, 
  MapPin, 
  Key,
  Trash2, 
  FileText, 
  Shield,
  ChevronRight
} from 'lucide-react';
import styles from './Sidebar.module.css';
import type { SidebarItem } from '../../types/profile.types';

interface SidebarProps {
  activeItem: string;
  onItemClick: (itemId: string) => void;
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

const Sidebar: React.FC<SidebarProps> = ({ activeItem, onItemClick, user }) => {
  

  const accountItems: SidebarItem[] = [
    {
      id: 'profile',
      label: 'Profile',
      icon: 'User'
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
      MapPin,
      Key,
      Trash2,
      FileText,
      Shield
    };
    const IconComponent = icons[iconName as keyof typeof icons];
    return IconComponent ? <IconComponent /> : null;
  };

  const renderMenuItem = (item: SidebarItem) => (
    <div
      key={item.id}
      className={`${styles.menuItem} ${activeItem === (item.id=='profile'?'/profile':'/profile/'+item.id)   ? styles.active : ''}`}
      onClick={() => onItemClick(item.id)}
    >
      {item.icon && getIcon(item.icon)}
      <span>{item.label}</span>
      <ChevronRight className={styles.chevron} size={14} />
    </div>
  );

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarContent}>
        <div className={styles.userInfo}>
          <div className={styles.avatar}>
            {user?.firstName && user?.lastName ? getInitials(user.firstName, user.lastName) : ''}

          </div>
          <div className={styles.userDetails}>
            <h3>{user.firstName} {user.lastName}</h3>
            <p>{user.email}</p>
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
  );
};

export default Sidebar;