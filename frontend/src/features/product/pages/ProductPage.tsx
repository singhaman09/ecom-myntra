import React, { useEffect, useState, useMemo, useCallback } from 'react';
import styles from '../styles/ProductPage.module.css';
import { useParams, useSearchParams } from 'react-router-dom';
import { getProducts } from '../productAPI';
import { useProductDispatch, useProductSelector } from '../hooks/storeHooks';
import Loader from '../utils/Loader';
import type { filters } from '../interfaces/ProductInterfaces';
import TrendingCard from '../components/TrendingCard';
import InfiniteScroll from 'react-infinite-scroll-component';
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
  const [page,setPage]=useState(1)
  const [filters, setFilters] = useState<filters>({
    category: [],
    subCategory: [],
    brand: [],
    color: [],
    gender: undefined,
    price:[]
  });
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);
  
  // Memoized filter values for performance and stability
useEffect(()=>{
 setFilters((prev)=>{
  return {
    category:searchParams.getAll('category'),
    subCategory:searchParams.getAll('subCategory'),
    color:searchParams.getAll('color'),
    brand:searchParams.getAll('brand'),
    price:searchParams.get('price')?.split(',').map(Number) || [],
    gender:searchParams.get('gender') || undefined
  }
 })

},[searchParams])

  // Fetch products when filters or slug change
  useEffect(() => {
    dispatch(getProducts({ slug ,searchParams,page}));
   
  }, [dispatch, searchParams,slug,page]);

  // Helper to update filters
  const handleFilterChange = (key: keyof typeof filters, value: string, checked: boolean) => {
    setFilters(prevFilters => {
      const currentValues = prevFilters[key] as string[] || [];
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
    });
  };
  
  // Specific handlers for each filter
  const handleCategoryChange = useCallback((category: string, checked: boolean) =>
    handleFilterChange('category', category, checked), []);
  
  const handleSubCategoryChange = useCallback((subCategory: string, checked: boolean) =>
    handleFilterChange('subCategory', subCategory, checked), []);
  
  const handleBrandChange = useCallback((brand: string, checked: boolean) =>
    handleFilterChange('brand', brand, checked), []);
  
  const handleColorChange = useCallback((color: string, checked: boolean) =>
    handleFilterChange('color', color, checked), []);
  
  const handleGenderChange = useCallback((gender: string) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      gender,
    }));
  }, []);
  const handleReset = useCallback(() => {
    const newParams = new URLSearchParams(searchParams.toString());
      ['category', 'brand', 'color', 'gender', 'price', 'subCategory'].forEach(param =>
        newParams.delete(param)
        
      );
  setSearchParams(newParams, { replace: true });
  setFilters({
    category: [],
    subCategory: [],
    brand: [],
    color: [],
    gender: undefined,
    price: []
  });
  }, [searchParams, setSearchParams]);

  const handlePriceChange = useCallback(
   
    (event: React.SyntheticEvent | Event, newValue: number | number[]) => {
      const valueArray = Array.isArray(newValue) ? newValue : [newValue];
      
      setFilters(prevFilters => ({
        ...prevFilters,
        price: valueArray,
      }));
    },
    []
  );
  
const apply=()=>{
  if(filters.category.length>0) searchParams.set('category',filters.category.toString())
  else searchParams.delete('category')
  if(filters.brand.length>0 )   searchParams.set('brand',filters.brand.toString())
    else searchParams.delete('brand')
 if(filters.subCategory.length>0) searchParams.set('subCategory',filters.subCategory.toString())
  else searchParams.delete('subCategory')
  if(filters.color.length>0 )  searchParams.set('color',filters.color.toString())
    else searchParams.delete('color')
  if(filters.gender ){
    searchParams.set('gender',filters.gender)
  }
  else searchParams.delete('gender')
  if(filters.price.length>0 ) searchParams.set('price',filters.price.toString())
  else searchParams.delete('price')
  setSearchParams(searchParams,{replace:true})
  setIsDrawerOpen(false)
}
const fetchMoreData = () => {
  setPage(prev => prev + 1);
};

  // Render
  return (
    <div>
      <div className={styles.container}>
        <Breadcrumbs />
        
        {data.loading && page==1? (
          <Loader isInitial={true}/>
        ) 
        : data.error ?
         (
          <ErrorPage />
          ) :   (
          <>
          <TrendingCard/>
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
                    />
                    <InfiniteScroll
                    dataLength={data.products.length}
                    next={fetchMoreData}
                    hasMore={data.totalProducts>data.products.length}
                    loader={data.loading && page > 1 && <Loader isInitial={false}/>}
                    endMessage={
                      <p style={{ textAlign: 'center', margin: '2rem 0' }}>
                        <b>No more products to show.</b>
                      </p>
                    }
                    >
                    {data.products.length ?  
                     <ProductList
                    data={data.products}
                  isSimilar={false}
                  />:<ProductNotFoundPage isSimilar={false} /> }
                    </InfiniteScroll>
                
                 
               
              </div>
            </div>
          </>
        ) }
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
