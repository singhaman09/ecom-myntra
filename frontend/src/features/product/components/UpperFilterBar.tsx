import React, {  useCallback, useState } from 'react';
import type { UpperFilterProps } from '../interfaces/ProductInterfaces';
import styles from '../styles/UpperFilterBar.module.css';
import { useSearchParams } from 'react-router-dom';
import { ArrowUpDown, FilterIcon } from 'lucide-react';

const sortOptions = [
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'new', label: "What's new ?" },
];

const UpperFilterBar: React.FC<UpperFilterProps> = ({
  setIsDrawerOpen,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedSort = searchParams.get('sort') ?? 'new';
   const [open, setOpen] = useState(false);
  const handleSortChange = useCallback(
    (val:string) => {
      searchParams.set('sort', val);
      searchParams.delete('page'); // Reset page on sort change
      setSearchParams(searchParams, { replace: true });
    },
    [searchParams, setSearchParams]
  );

  // Helper to render selected filters
  // const renderSelectedFilters = (
  //   items: string[] | string ,
  //   type: string
  // ) => {
  //   if (!items || (Array.isArray(items) && items.length === 0)) return null;

  //   if (typeof items === 'string') {
  //     return (
  //       <div className={styles.innerContainer}>
  //         <p>{items}</p>
  //         <button
  //           className={styles.button}
  //           onClick={() => handleReset(items, type)}
  //           aria-label={`Remove filter ${items}`}
  //           type="button"
  //         >
  //           <CloseIcon />
  //         </button>
  //       </div>
  //     );
  //   }

  //   return items.map((val, index) => (
  //     <div className={styles.innerContainer} key={`${type}-${val}-${index}`}>
  //       <p>{val}</p>
  //       <button
  //         className={styles.button}
  //         onClick={() => handleReset(val, type)}
  //         aria-label={`Remove filter ${val}`}
  //         type="button"
  //       >
  //         <CloseIcon />
  //       </button>
  //     </div>
  //   ));
  // };

  // Determine container classes based on filters
  // const hasFilters =
  //   selectedBrands.length > 0 ||
  //   selectedColors.length > 0 ||
  //   selectedCategories.length > 0 ||
  //   !!selectedGender ||
  //   selectedSubCategories.length > 0;

  return (
    <div className={`${styles.container}`}>
      <div className={styles.sortDropdownContainer}>
         <div className={styles.sortButtonContainer}>
      <ArrowUpDown size={'18px'}/>
      <button className={styles.sortButton} onClick={() => setOpen(!open)}>
        Sort
      </button>
      {open && (
        <div className={styles.modal}>
          <div className={styles.sortValue}>
            <ol>
              {sortOptions.map(({ value, label }) => (
                <li key={String(value)} onClick={() => { handleSortChange(value); setOpen(false); }} className={selectedSort==value ?`${styles.sortValueSelected}`:''}>
                  {label}
                </li>
              ))}
            </ol>
            <button onClick={() => setOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
        
        <div className={styles.sortButtonContainer}>
        <button
          onClick={() => setIsDrawerOpen(true)}
          className={styles.btn}
          type="button"
          aria-label="Open filters"
        >
          <span><FilterIcon size={'18px'}/></span>
          Filters
        </button>
        </div>
      </div>

      {/* <div className={styles.filterContainer}>
        {renderSelectedFilters(selectedGender, 'gender')}
        {renderSelectedFilters(selectedCategories, 'category')}
        {renderSelectedFilters(selectedSubCategories, 'subCategory')}
        {renderSelectedFilters(selectedBrands, 'brand')}
        {renderSelectedFilters(selectedColors, 'color')}
      </div> */}
    </div>
  );
};

export default React.memo(UpperFilterBar);
