import React, {  useCallback, useState } from 'react';
import styles from './UpperFilterBar.module.css';
import { useSearchParams } from 'react-router-dom';
import { ArrowUpDown, FilterIcon } from 'lucide-react';
import type { UpperFilterProps } from '../../../interfaces/FilterInterfaces';
import { UPPER_FILTER } from '../../../Product.enum';

const sortOptions = [
  { value:UPPER_FILTER.PRICE_ASC, label: 'Price: Low to High' },
  { value:UPPER_FILTER.PRICE_DSC, label: 'Price: High to Low' },
  { value:UPPER_FILTER.NEW, label: "What's new ?" },
];

const UpperFilterBar: React.FC<UpperFilterProps> = ({
  setIsDrawerOpen,
  setPage
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedSort = searchParams.get(UPPER_FILTER.SORT) ?? UPPER_FILTER.NEW;
   const [open, setOpen] = useState(false);
  const handleSortChange = useCallback(
    (val:string) => {
      searchParams.set(UPPER_FILTER.SORT, val); 
      setSearchParams(searchParams, { replace: true });
      setPage(1)
    },
    [searchParams]
  );


  return (
    <div className={`${styles.container}`}>
      <div className={styles.sortDropdownContainer}>
         <div className={styles.sortButtonContainer}>
      <ArrowUpDown size={'18px'} color='#3D857E'/>
      <button className={styles.sortButton} onClick={() => setOpen(!open)}>
        Sort
      </button>
      {open && (
        <div className={styles.modal}>
         
          <div className={styles.sortValue}>
          <button className={styles.close} onClick={()=>setOpen(false)} aria-label="Close">&times;</button>
            <ol>
              {sortOptions.map(({ value, label }) => (
                <li key={String(value)} onClick={() => { handleSortChange(value); setOpen(false); }} className={selectedSort==value ?`${styles.sortValueSelected}`:''}>
                  {label}
                </li>
              ))}
            </ol>
            
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
          <span><FilterIcon size={'16px'} color='#3D857E'/></span>&nbsp;
          Filters
        </button>
        </div>
      </div>

   
    </div>
  );
};

export default React.memo(UpperFilterBar);
