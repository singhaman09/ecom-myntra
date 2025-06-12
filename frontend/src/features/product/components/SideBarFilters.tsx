import React, { useState, useEffect, useCallback } from 'react';
import type { SideFilterProps } from '../interfaces/ProductInterfaces';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import styles from "../styles/SideBar.module.css";

const INITIAL_MORE = 6;

const SideBarFilters: React.FC<SideFilterProps> = ({
  data = [],
  type,
  selectedData,
  handleChange
}) => {
  const [isSearch, setIsSearch] = useState(false);
  const [more, setMore] = useState(INITIAL_MORE);
  const [filteredData, setFilteredData] = useState(data);

  // Sync filteredData with data prop
  useEffect(() => {
    setFilteredData(data);
    setMore(INITIAL_MORE);
  }, [data]);

  // Search handler (memoized)
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    const filtered = data.filter(val =>
      val.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
    setMore(INITIAL_MORE);
  }, [data]);

  // Close search handler (memoized)
  const handleCloseSearch = useCallback(() => {
    setIsSearch(false);
    setFilteredData(data);
    setMore(INITIAL_MORE);
  }, [data]);

  // Show more handler (memoized)
  const handleShowMore = useCallback(() => {
    setMore(filteredData.length);
  }, [filteredData]);

  return (
    <div className={styles.section}>
      {isSearch ? (
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder={`Search ... `}
            className={styles.input}
            onChange={handleInputChange}
            autoFocus
          />
          <button
            className={styles.closeSearchButton}
            onClick={handleCloseSearch}
            aria-label="Close search"
            type="button"
          >
            <CloseIcon />
          </button>
        </div>
      ) : (
        <div className={styles.brandHeader}>
          <h3 className={styles.sectionTitle}>{type.toUpperCase()}</h3>
          {data.length > 4 && (
            <button
              className={styles.searchButton}
              onClick={() => setIsSearch(true)}
              aria-label="Open search"
              type="button"
            >
              <SearchIcon fontSize='small' />
            </button>
          )}
        </div>
      )}

      <div className={styles.checkboxGroup}>
        {filteredData.slice(0, more).map((val) => (
          <label key={val} className={styles.checkboxRow}>
            <input
              type="checkbox"
              checked={selectedData.includes(val)}
              onChange={e => handleChange(val, e.target.checked)}
            />
            <span className={styles.checkboxLabel}>{val}</span>
          </label>
        ))}
        {filteredData.length > more && (
          <button
            className={styles.moreBtn}
            onClick={handleShowMore}
            type="button"
          >
            + {filteredData.length - more} more
          </button>
        )}
      </div>
    </div>
  );
};

export default React.memo(SideBarFilters);
