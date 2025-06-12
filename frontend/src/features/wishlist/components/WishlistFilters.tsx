// components/Wishlist/WishlistFilters.tsx
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../order/hooks/redux';
import { setFilters, clearFilters } from '../slice/wishlistSlice';
import Button from '../../../components/UI/Button';
import SearchInput from '../../../components/UI/SearchInput';
import styles from '../../../components/shared/css/wishlistFilter.module.css';

const WishlistFilters: React.FC = () => {
  const dispatch = useAppDispatch();
  const { filters, categories } = useAppSelector((state) => state.wishlist);
   const [showFilters, setShowFilters] = useState(false); // default true for desktop
  const [localFilters, setLocalFilters] = useState({
    category: filters.category || '',
    searchQuery: filters.searchQuery || '',
    minPrice: filters.priceRange?.min || '',
    maxPrice: filters.priceRange?.max || '',
    inStock: filters.inStock !== undefined ? filters.inStock.toString() : '',
    sortBy: filters.sortBy || 'dateAdded',
    sortOrder: filters.sortOrder || 'desc',
  });

  const toggleFilters = () => setShowFilters(prev => !prev);

  const handleFilterChange = (key: string, value: string) => {
    setLocalFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const applyFilters = () => {
    const filterData: any = {
      sortBy: localFilters.sortBy,
      sortOrder: localFilters.sortOrder,
    };
    
    if (localFilters.category) {
      filterData.category = localFilters.category;
    }
    
    if (localFilters.searchQuery) {
      filterData.searchQuery = localFilters.searchQuery;
    }
    
    if (localFilters.minPrice || localFilters.maxPrice) {
      filterData.priceRange = {
        min: localFilters.minPrice ? parseFloat(String(localFilters.minPrice)) : 0,
        max: localFilters.maxPrice ? parseFloat(String(localFilters.maxPrice)) : Infinity,
      };
    }
    
    if (localFilters.inStock !== '') {
      filterData.inStock = localFilters.inStock === 'true';
    }
    
    dispatch(setFilters(filterData));
  };

  const handleClearFilters = () => {
    setLocalFilters({
      category: '',
      searchQuery: '',
      minPrice: '',
      maxPrice: '',
      inStock: '',
      sortBy: 'dateAdded',
      sortOrder: 'desc',
    });
    dispatch(clearFilters());
  };

  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'price', label: 'Price' },
    { value: 'dateAdded', label: 'Date Added' },
    { value: 'rating', label: 'Rating' },
  ];

  return (
     <div className={styles.wishlistFiltersWrapper}>
      <div className={styles.toggleBar}>
        <button onClick={toggleFilters} className={styles.toggleBtn}>
          {showFilters ? 'Hide Filters ▲' : 'Show Filters ▼'}
        </button>
      </div>
        { showFilters && (
    <div className={styles.wishlistFilters}>
      <div className={styles.filterSection}>
        <h3>Filter & Sort</h3>
        
        <div className={styles.filterGroup}>
          <SearchInput
            placeholder="Search wishlist items..."
            value={localFilters.searchQuery}
            onChange={(value) => handleFilterChange('searchQuery', value)}
            onSearch={applyFilters}
          />
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={localFilters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className={styles.select}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label>Price Range</label>
          <div className={styles.rangeInputs}>
            <input
              type="number"
              placeholder="Min price"
              value={localFilters.minPrice}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
              className={styles.input}
            />
            <span>-</span>
            <input
              type="number"
              placeholder="Max price"
              value={localFilters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="inStock">Availability</label>
          <select
            id="inStock"
            value={localFilters.inStock}
            onChange={(e) => handleFilterChange('inStock', e.target.value)}
            className={styles.select}
          >
            <option value="">All Items</option>
            <option value="true">In Stock Only</option>
            <option value="false">Out of Stock</option>
          </select>
        </div>

        <div className={styles.sortSection}>
          <div className={styles.filterGroup}>
            <label htmlFor="sortBy">Sort By</label>
            <select
              id="sortBy"
              value={localFilters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className={styles.select}
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label htmlFor="sortOrder">Order</label>
            <select
              id="sortOrder"
              value={localFilters.sortOrder}
              onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
              className={styles.select}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>

        <div className={styles.filterActions}>
          <Button onClick={applyFilters} variant="primary">
            Apply Filters
          </Button>
          <Button onClick={handleClearFilters} variant="secondary">
            Clear All
          </Button>
        </div>
      </div>
    </div> 
  )}
  </div>)
  };

export default WishlistFilters;