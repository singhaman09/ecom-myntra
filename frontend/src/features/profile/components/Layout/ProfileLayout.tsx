import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import styles from './ProfileLayout.module.css';
import '../../styles/globals.css';

interface ProfileLayoutProps {
  children: React.ReactNode;
  activeItem: string;
  onItemClick: (itemId: string) => void;
  user: {
    name: string;
    email: string;
    createdAt?: string | undefined;
  };
}

const ProfileLayout: React.FC<ProfileLayoutProps> = ({
  children,
  activeItem,
  onItemClick,
  user
}) => {
  return (
    <div className={styles.profileLayout}>
      <Sidebar 
        activeItem={activeItem} 
        onItemClick={onItemClick} 
        user={user}
      />
      <main className={styles.mainContent}>
        <div className={styles.contentWrapper}>
          <div className={styles.pageHeader}>
          </div>
          {children}
        </div>
      </main>
    </div>
  );
};

export default ProfileLayout;