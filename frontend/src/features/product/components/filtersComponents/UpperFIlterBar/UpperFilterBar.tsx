import React, {  useCallback, useState } from 'react';
import type { UpperFilterProps } from '../../../interfaces/ProductInterfaces';
import styles from './UpperFilterBar.module.css';
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
