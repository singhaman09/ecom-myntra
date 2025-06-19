import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import styles from '../styles/BreadCrumbs.module.css'
import { useProductSelector } from '../hooks/storeHooks';
import { PRODUCT_ROUTES } from '../Constants/Routes';
function convertedPathNames(str: string) {
  return decodeURIComponent(str)         // Decode %20 and other encodings
    .toLowerCase()
    .replace(/\s+/g, '-')                // Replace spaces with -
    .replace(/[^\w\-]+/g, '')            // Remove all non-word chars
    .replace(/\-\-+/g, '-')              // Replace multiple - with single -
    .replace(/^-+/, '')                  // Trim - from start
    .replace(/-+$/, '');                 // Trim - from end
}

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);
  const data = useProductSelector(state => state.product.selectedProduct);
  const {id}=useParams()
  const crumbs = [
    { label: 'HOME', to: '/' }
  ];

  if (data?.product && id ) {
    if (data.product.category) {
      crumbs.push({
        label: data.product?.category.toUpperCase(),
        to: `${PRODUCT_ROUTES.list}/${data.product?.category}`
      });
    }
    if (data.product?.subCategory) {
      crumbs.push({
        label: data.product?.subCategory.toUpperCase(),
        to: `${PRODUCT_ROUTES.list}/${data.product?.subCategory}`
      });
    }
    // Last crumb: Product name, not a link
    crumbs.push({
      label: data.product?.name,
      to:''
    });
  } else {
    // Fallback: use path segments
    pathnames.forEach((value, index) => {
      crumbs.push({
      label: convertedPathNames(value).toUpperCase(),
        to: `/${pathnames.slice(0, index + 1).join('/')}`
      });
    });
  }

  return (
    <nav className={styles.breadcrumbsNav} aria-label="breadcrumb">
      <ol className={styles.breadcrumbsList}>
        {crumbs.map((crumb, idx) => (
          <li className={styles.breadcrumbItem} key={idx}>
            {idx !== 0 && <span className={styles.breadcrumbSeparator}>/</span>}
            {crumb.to && idx !== crumbs.length - 1 ? (
              <Link to={crumb.to} className={styles.breadcrumbLink}>{crumb.label}</Link>
            ) : (
              <span className={styles.breadcrumbCurrent}>{crumb.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
