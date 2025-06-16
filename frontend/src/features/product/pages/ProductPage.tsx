import React, { useEffect, useState, useMemo, useCallback } from 'react';
import styles from '../styles/ProductPage.module.css';
import { useParams, useSearchParams } from 'react-router-dom';
import { getProducts } from '../productAPI';
import { useProductDispatch, useProductSelector } from '../hooks/storeHooks';
import Loader from '../utils/Loader';

// Lazy load components
const Breadcrumbs = React.lazy(() => import('../utils/BreadCrumbs'));
const SideBarMain = React.lazy(() => import('../components/SideBarMain'));
const ProductList = React.lazy(() => import('../components/ProductList'));
const UpperFilterBar = React.lazy(() => import('../components/UpperFilterBar'));
const Pagination = React.lazy(() => import('../components/Pagination'));
const ProductNotFoundPage = React.lazy(() => import('./ProductNotFoundPage'));
const ErrorPage = React.lazy(() => import('./ErrorPage'));

const ProductPage: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { slug } = useParams();
  const dispatch = useProductDispatch();
  const data = useProductSelector(state => state.product);

  // Memoized filter values for performance and stability
  const selectedCategories = useMemo(() => searchParams.getAll("category"), [searchParams]);
  const selectedSubCategories = useMemo(() => searchParams.getAll("subCategory"), [searchParams]);
  const selectedBrands = useMemo(() => searchParams.getAll("brand"), [searchParams]);
  const selectedColors = useMemo(() => searchParams.getAll("color"), [searchParams]);
  const selectedGender = searchParams.get("gender") || '';
  const selectedPrice = useMemo(() => searchParams.get('price')?.split(',').map(Number) || [],
    [searchParams]
  );

  // Fetch products when filters or slug change
  useEffect(() => {
    dispatch(getProducts({ searchParams, slug }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [dispatch, searchParams, slug]);

  // Helper to update filters
  const handleFilterChange = (key: string, value: string, checked: boolean) => {
    const currentValues = searchParams.getAll(key);
    let newValues: string[];
    if (checked) {
      newValues = [...currentValues, value];
    } else {
      newValues = currentValues.filter(v => v !== value);
    }
    searchParams.delete(key);
    searchParams.delete('page');
    newValues.forEach(val => searchParams.append(key, val));
    setSearchParams(searchParams, { replace: true });
  };

  // Specific handlers for each filter
  const handleCategoryChange = useCallback((category: string, checked: boolean) =>
    handleFilterChange('category', category, checked), [searchParams, setSearchParams]);

  const handleSubCategoryChange = useCallback((subCategory: string, checked: boolean) =>
    handleFilterChange('subCategory', subCategory, checked), [searchParams, setSearchParams]);

  const handleBrandChange = useCallback((brand: string, checked: boolean) =>
    handleFilterChange('brand', brand, checked), [searchParams, setSearchParams]);

  const handleColorChange = useCallback((color: string, checked: boolean) =>
    handleFilterChange('color', color, checked), [searchParams, setSearchParams]);

  const handleGenderChange = useCallback((gender: string) => {
    searchParams.delete('page');
    searchParams.delete('gender');
    searchParams.append('gender', gender);
    setSearchParams(searchParams, { replace: true });
  }, [searchParams, setSearchParams]);

  const handleReset = useCallback((value: string, key: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (value === 'all') {
      ['category', 'brand', 'color', 'gender', 'price', 'subCategory'].forEach(param =>
        newParams.delete(param)
      );
    } else {
      newParams.delete('page');
      newParams.delete(key, value);
    }
    setSearchParams(newParams, { replace: true });
  }, [searchParams, setSearchParams]);

  const handleChange = useCallback(( event: React.SyntheticEvent | Event,newValue: number | number[]) => {
    const valueArray = Array.isArray(newValue) ? newValue : [newValue];
    searchParams.delete('page');
    searchParams.delete('price');
    searchParams.append('price', valueArray.toString());
    setSearchParams(searchParams, { replace: true });
  }, [searchParams, setSearchParams]);

  // Render
  return (
    <div>
      <div className={styles.container}>
        <Breadcrumbs />
        
        {data.loading ? (
          <Loader />
        ) 
        : data.error ?
         (
          <ErrorPage />
          ) : data.products.length > 0 ? (
          <>
            <p style={{ marginLeft: '20px' }}>
              Showing {data.skip + 1} -{' '}
              {data.limit + data.skip > data.totalProducts
                ? data.totalProducts
                : data.limit + data.skip}{' '}
              entries of {data.totalProducts}
            </p>
            <div className={styles.sideBarContainer}>
             
                <SideBarMain
                  isDrawerOpen={isDrawerOpen}
                  setIsDrawerOpen={setIsDrawerOpen}
                  handleBrandChange={handleBrandChange}
                  handleSubCategoryChange={handleSubCategoryChange}
                  handleCategoryChange={handleCategoryChange}
                  handleColorChange={handleColorChange}
                  handleReset={handleReset}
                  handleGenderChange={handleGenderChange}
                  selectedBrands={selectedBrands}
                  selectedCategories={selectedCategories}
                  selectedGender={selectedGender}
                  selectedColors={selectedColors}
                  handleChange={handleChange}
                  selectedPrice={selectedPrice}
                  selectedSubCategories={selectedSubCategories}
                />
              
              <div className={styles.sortContainer}>
               
                  <UpperFilterBar
                    setIsDrawerOpen={setIsDrawerOpen}
                    handleReset={handleReset}
                    selectedBrands={selectedBrands}
                    selectedColors={selectedColors}
                    selectedCategories={selectedCategories}
                    selectedGender={selectedGender}
                    selectedSubCategories={selectedSubCategories}
                  />
                  <ProductList
                    isSimilar={false}
                    selectedBrands={selectedBrands}
                    selectedColors={selectedColors}
                    selectedCategories={selectedCategories}
                    selectedGender={selectedGender}
                    selectedSubCategories={selectedSubCategories}
                  />
                  <Pagination pageCount={Math.ceil(data.totalProducts / data.limit)} />
               
              </div>
            </div>
          </>
        ) : (          
          <ProductNotFoundPage isSimilar={false} />       
        )}
        {isDrawerOpen && (
          <div
            className={styles.overlay}
            onClick={() => setIsDrawerOpen(false)}
            aria-hidden="true"
          />
        )}
      </div>
    </div>
  );
};

export default ProductPage;
