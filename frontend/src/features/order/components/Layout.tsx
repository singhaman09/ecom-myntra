import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../../components/shared/Header';
import Sidebar from './Sidebar';
import styles from '../../../components/shared/css/layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
  searchTerm?: string;
  onSearchChange?: React.Dispatch<React.SetStateAction<string>>;
}

const Layout: React.FC<LayoutProps> = ({ children, searchTerm, onSearchChange }) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const location = useLocation();

  // Only show sidebar on the orders page
  const showSidebar = location.pathname === '/orders';

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const closeSidebar = () => {
    setSidebarVisible(false);
  };

  return (
    <div className={styles.layout}>
      <Header
        searchTerm={searchTerm || ''}
        onSearchChange={onSearchChange}
        onMenuToggle={showSidebar ? toggleSidebar : undefined}
      />
      <div className={styles.main}>
        {showSidebar && <Sidebar isVisible={sidebarVisible} onClose={closeSidebar} />}
        <main className={styles.content}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;