import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './styles/BreadCrumbs.module.css'
const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);
  console.log(pathnames)
  return (
    <nav className={styles.breadcrumbsNav} aria-label="breadcrumb">
    <ol className={styles.breadcrumbsList}>
      <li className={styles.breadcrumbItem}>
        <Link to="/" className={styles.breadcrumbLink}>Home</Link>
      </li>
      {pathnames.map((value, index) => {
    
        const isLast = index === pathnames.length - 1;
        return (
          <li className={styles.breadcrumbItem} key={index}>
            <span className={styles.breadcrumbSeparator}>/</span>
            {isLast ? (
              <span className={styles.breadcrumbCurrent}>{value}</span>
            ) : (
              <Link to={`/${value}`} className={styles.breadcrumbLink}>{value}</Link>
            )}
          </li>
        );
      })}
    </ol>
  </nav>
  );
};

export default Breadcrumbs;
