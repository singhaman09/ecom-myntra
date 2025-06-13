import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import styles from './ProfileLayout.module.css';
import { ChevronRight } from 'lucide-react';
import '../../styles/globals.css';


interface ProfileLayoutProps {
  children: React.ReactNode;
  activeItem: string;
  onItemClick: (itemId: string) => void;
  title: string;
  subtitle?: string;
  breadcrumbs?: string[];
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

const ProfileLayout: React.FC<ProfileLayoutProps> = ({
  children,
  activeItem,
  onItemClick,
  title,
  subtitle,
  breadcrumbs = [],
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
          {breadcrumbs.length > 0 && (
            <nav className={styles.breadcrumb}>
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={index}>
                  <span className={index === breadcrumbs.length - 1 ? styles.breadcrumbActive : ''}>
                    {crumb}
                  </span>
                  {index < breadcrumbs.length - 1 && (
                    <ChevronRight size={14} className={styles.breadcrumbSeparator} />
                  )}
                </React.Fragment>
              ))}
            </nav>
          )}
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>{title}</h1>
            {subtitle && <p className={styles.pageSubtitle}>{subtitle}</p>}
          </div>
          {children}
        </div>
      </main>
    </div>
  );
};

export default ProfileLayout;