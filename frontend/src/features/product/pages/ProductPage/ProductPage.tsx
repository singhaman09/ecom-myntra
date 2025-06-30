import React, { useEffect, useState, useCallback } from 'react';
import styles from './ProductPage.module.css';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { getProducts } from '../../productAPI';
import { useProductDispatch, useProductSelector } from '../../hooks/storeHooks';
import Loader from '../../utils/Loader';
import TrendingCard from '../../components/ProductListComponents/TrendingCard/TrendingCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import { TAB_KEYS, type TabKey } from '../../Product.enum';
import type { filters } from '../../interfaces/FilterInterfaces';


// Lazy load components
const Breadcrumbs = React.lazy(() => import('../../utils/BreadCrumbs/BreadCrumbs'));
const SideBarMain = React.lazy(() => import('../../components/filtersComponents/SideBarMain/SideBarMain'));
const ProductList = React.lazy(() => import('../../components/ProductListComponents/ProductList/ProductList'));
const UpperFilterBar = React.lazy(() => import('../../components/filtersComponents/UpperFIlterBar/UpperFilterBar'));
const ProductNotFoundPage = React.lazy(() => import('../ProductNotFound/ProductNotFoundPage'));
const ErrorPage = React.lazy(() => import('../Error/ErrorPage'));

const ProductPage: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { slug } = useParams();
  const dispatch = useProductDispatch();
  const data = useProductSelector(state => state.product);
  const [page, setPage] = useState(1);
  const location = useLocation();

  // Type-safe filters state
  const [filters, setFilters] = useState<filters>({
    [TAB_KEYS.CATEGORY]: [],
    [TAB_KEYS.SUBCATEGORY]: [],
    [TAB_KEYS.BRAND]: [],
    [TAB_KEYS.COLOR]: [],
    [TAB_KEYS.GENDER]: '',
    [TAB_KEYS.PRICE]: [],
  });

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  // Sync filters state from URL search params
  useEffect(() => {
    setFilters({
      [TAB_KEYS.CATEGORY]: searchParams.get(TAB_KEYS.CATEGORY)?.split(',').filter(Boolean) || [],
      [TAB_KEYS.SUBCATEGORY]: searchParams.get(TAB_KEYS.SUBCATEGORY)?.split(',').filter(Boolean) || [],
      [TAB_KEYS.BRAND]: searchParams.get(TAB_KEYS.BRAND)?.split(',').filter(Boolean) || [],
      [TAB_KEYS.COLOR]: searchParams.get(TAB_KEYS.COLOR)?.split(',').filter(Boolean) || [],
      [TAB_KEYS.GENDER]: searchParams.get(TAB_KEYS.GENDER) || '',
      [TAB_KEYS.PRICE]: searchParams.get(TAB_KEYS.PRICE)
        ? searchParams.get(TAB_KEYS.PRICE)!.split(',').map(Number).filter(n => !isNaN(n))
        : [],
    });
  }, [searchParams]);

  // Reset page on path change
  useEffect(() => {
    setPage(1);
  }, [location.pathname]);

  // Fetch products when filters or slug or page changes
  useEffect(() => {
    dispatch(getProducts({ slug, searchParams, page }));
  }, [dispatch, searchParams, slug, page]);

  // Generic filter handler for array filters
  const handleFilterChange = useCallback(
    (key: TabKey, value: string, checked: boolean) => {
      setFilters(prevFilters => {
        if (
          key === TAB_KEYS.CATEGORY ||
          key === TAB_KEYS.SUBCATEGORY ||
          key === TAB_KEYS.BRAND ||
          key === TAB_KEYS.COLOR
        ) {
          const currentValues = prevFilters[key] as string[];
          let newValues: string[];
          if (checked) {
            newValues = [...currentValues, value];
          } else {
            newValues = currentValues.filter(v => v !== value);
          }
          return {
            ...prevFilters,
            [key]: newValues,
          };
        }
        return prevFilters;
      });
    },
    []
  );

  // Specific handlers for each filter
  const handleCategoryChange = useCallback((category: string, checked: boolean) =>
    handleFilterChange(TAB_KEYS.CATEGORY, category, checked), [handleFilterChange]);

  const handleSubCategoryChange = useCallback((subCategory: string, checked: boolean) =>
    handleFilterChange(TAB_KEYS.SUBCATEGORY, subCategory, checked), [handleFilterChange]);

  const handleBrandChange = useCallback((brand: string, checked: boolean) =>
    handleFilterChange(TAB_KEYS.BRAND, brand, checked), [handleFilterChange]);

  const handleColorChange = useCallback((color: string, checked: boolean) =>
    handleFilterChange(TAB_KEYS.COLOR, color, checked), [handleFilterChange]);

  const handleGenderChange = useCallback((gender: string) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [TAB_KEYS.GENDER]: gender,
    }));
  }, []);

  const handlePriceChange = useCallback(
    (_event: React.SyntheticEvent | Event, newValue: number | number[]) => {
      const valueArray = Array.isArray(newValue) ? newValue : [newValue];
      setFilters(prevFilters => ({
        ...prevFilters,
        [TAB_KEYS.PRICE]: valueArray,
      }));
    },
    []
  );

  // Reset all filters
  const handleReset = useCallback(() => {
    const newParams = new URLSearchParams(searchParams.toString());
    Object.values(TAB_KEYS).forEach(param => newParams.delete(param));
    setSearchParams(newParams, { replace: true });
    setFilters({
      [TAB_KEYS.CATEGORY]: [],
      [TAB_KEYS.SUBCATEGORY]: [],
      [TAB_KEYS.BRAND]: [],
      [TAB_KEYS.COLOR]: [],
      [TAB_KEYS.GENDER]: '',
      [TAB_KEYS.PRICE]: [],
    });
  }, [searchParams, setSearchParams]);

  // Apply filters to URL
  const apply = () => {
    if (filters[TAB_KEYS.CATEGORY].length>0) searchParams.set(TAB_KEYS.CATEGORY, filters[TAB_KEYS.CATEGORY].toString());
    else searchParams.delete(TAB_KEYS.CATEGORY);

    if (filters[TAB_KEYS.BRAND].length > 0) searchParams.set(TAB_KEYS.BRAND, filters[TAB_KEYS.BRAND].toString());
    else searchParams.delete(TAB_KEYS.BRAND);

    if (filters[TAB_KEYS.SUBCATEGORY].length > 0) searchParams.set(TAB_KEYS.SUBCATEGORY, filters[TAB_KEYS.SUBCATEGORY].toString());
    else searchParams.delete(TAB_KEYS.SUBCATEGORY);

    if (filters[TAB_KEYS.COLOR].length > 0) searchParams.set(TAB_KEYS.COLOR, filters[TAB_KEYS.COLOR].toString());
    else searchParams.delete(TAB_KEYS.COLOR);

    if (filters[TAB_KEYS.GENDER]) searchParams.set(TAB_KEYS.GENDER, filters[TAB_KEYS.GENDER]);
    else searchParams.delete(TAB_KEYS.GENDER);

    if (filters[TAB_KEYS.PRICE].length > 0) searchParams.set(TAB_KEYS.PRICE, filters[TAB_KEYS.PRICE].toString());
    else searchParams.delete(TAB_KEYS.PRICE);

    setSearchParams(searchParams, { replace: true });
    setIsDrawerOpen(false);
    setPage(1);
  };

  // Infinite scroll
  const fetchMoreData = () => {
    setPage(prev => prev + 1);
  };

  // Render
  return (
    <div>
      <div className={styles.container}>
        <Breadcrumbs />

        {data.loading && page === 1 ? (
          <Loader isInitial={true} />
        ) : data.error ? (
          <ErrorPage />
        ) : (
          <>
            <TrendingCard />
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
                filters={filters}
                handleChange={handlePriceChange}
                apply={apply}
              />
              <div className={styles.sortContainer}>
                <UpperFilterBar
                  setIsDrawerOpen={setIsDrawerOpen}
                  setPage={setPage}
                />
                <InfiniteScroll
                  dataLength={data.products ? data.products.length : 0}
                  next={fetchMoreData}
                  hasMore={data.totalProducts > (data.products?.length || 0)}
                  loader={data.loading && page > 1 && <Loader isInitial={false} />}
                  endMessage={
                    <p style={{ textAlign: 'center', margin: '2rem 0' }}>
                      <b>No more products to show.</b>
                    </p>
                  }
                >
                  {data.products?.length ? (
                    <ProductList
                      data={data.products}
                      isSimilar={false}
                    />
                  ) : (
                    <ProductNotFoundPage isSimilar={false} />
                  )}
                </InfiniteScroll>
              </div>
            </div>
          </>
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
