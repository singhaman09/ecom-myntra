import React from 'react';
import styles from '../styles/SimilarProduct.module.css';
import { useProductSelector } from '../hooks/storeHooks';
import { useNavigate } from 'react-router';

// Lazy load components
const ProductList = React.lazy(() => import('./ProductList'));
const ProductNotFoundPage = React.lazy(() => import('../pages/ProductNotFoundPage'));

const SimilarProduct: React.FC = () => {
  const data = useProductSelector(state => state.product);
  const navigate = useNavigate();

  const product = data.selectedProduct?.product;
  const similarProducts = data.selectedProduct?.similarProducts ?? [];

  // Prepare "Show More About" buttons
  const showMoreButtons = [
    {
      label: product?.subCategory
        ? `Show More About ${product.subCategory}`
        : null,
      path: product?.subCategory ? `/${product.subCategory}` : null,
    },
    {
      label: product?.name
        ? `Show More About ${product.name}`
        : null,
      path: product?.name ? `/${product.name}` : null,
    },
    {
      label: product?.brand
        ? `Show More About ${product.brand}`
        : null,
      path: product?.brand ? `/${product.brand}` : null,
    },
  ].filter(btn => btn.label && btn.path);

  return (
    <div className={styles.container}>
      <h3>SIMILAR PRODUCTS</h3>
      
        {similarProducts.length > 0 ? (
          <>
            <ProductList isSimilar={true} />
            <div className={styles.allContainer}>
              {showMoreButtons.map(({ label, path }) => (
                <div className={styles.buttonContainer} key={label}>
                  <button onClick={() => navigate(path!)} type="button">
                    {label}
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <ProductNotFoundPage isSimilar={true} />
        )}
      
    </div>
  );
};

export default React.memo(SimilarProduct);
