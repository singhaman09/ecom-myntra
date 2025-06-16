import React, { type ChangeEvent, useCallback } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import type { UpperFilterProps } from '../interfaces/ProductInterfaces';
import styles from '../styles/UpperFilterBar.module.css';
import { useSearchParams } from 'react-router-dom';

const sortOptions = [
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'new', label: "What's new ?" },
];

const UpperFilterBar: React.FC<UpperFilterProps> = ({
  setIsDrawerOpen,
  selectedBrands,
  selectedColors,
  selectedGender,
  selectedCategories,
  selectedSubCategories,
  handleReset,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedSort = searchParams.get('sort') ?? 'new';

  const handleSortChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      searchParams.set('sort', e.target.value);
      searchParams.delete('page'); // Reset page on sort change
      setSearchParams(searchParams, { replace: true });
    },
    [searchParams, setSearchParams]
  );

  // Helper to render selected filters
  const renderSelectedFilters = (
    items: string[] | string ,
    type: string
  ) => {
    if (!items || (Array.isArray(items) && items.length === 0)) return null;

    if (typeof items === 'string') {
      return (
        <div className={styles.innerContainer}>
          <p>{items}</p>
          <button
            className={styles.button}
            onClick={() => handleReset(items, type)}
            aria-label={`Remove filter ${items}`}
            type="button"
          >
            <CloseIcon />
          </button>
        </div>
      );
    }

    return items.map((val, index) => (
      <div className={styles.innerContainer} key={`${type}-${val}-${index}`}>
        <p>{val}</p>
        <button
          className={styles.button}
          onClick={() => handleReset(val, type)}
          aria-label={`Remove filter ${val}`}
          type="button"
        >
          <CloseIcon />
        </button>
      </div>
    ));
  };

  // Determine container classes based on filters
  const hasFilters =
    selectedBrands.length > 0 ||
    selectedColors.length > 0 ||
    selectedCategories.length > 0 ||
    !!selectedGender ||
    selectedSubCategories.length > 0;

  return (
    <div className={`${styles.container} ${hasFilters ? styles.shadow : ''}`}>
      <div className={styles.sortDropdownContainer}>
        <label htmlFor="sort-select" className={styles.sortLabel}>
          Sort by:
        </label>
        <select
          id="sort-select"
          className={styles.sortSelect}
          value={selectedSort}
          onChange={handleSortChange}
        >
          {sortOptions.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <button
          onClick={() => setIsDrawerOpen(true)}
          className={styles.btn}
          type="button"
          aria-label="Open filters"
        >
          Filters
        </button>
      </div>

      <div className={styles.filterContainer}>
        {renderSelectedFilters(selectedGender, 'gender')}
        {renderSelectedFilters(selectedCategories, 'category')}
        {renderSelectedFilters(selectedSubCategories, 'subCategory')}
        {renderSelectedFilters(selectedBrands, 'brand')}
        {renderSelectedFilters(selectedColors, 'color')}
      </div>
    </div>
  );
};

export default React.memo(UpperFilterBar);
