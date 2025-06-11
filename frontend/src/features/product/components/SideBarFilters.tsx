import React, { useState, useEffect } from 'react'
import type { SideFilterProps } from '../interfaces/ProductInterfaces'
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import styles from "../styles/SideBar.module.css";

const SideBarFilters: React.FC<SideFilterProps> = ({
  data,
  type,
  selectedData,
  handleChange
}) => {
  const [isSearch, setIsSearch] = useState(false)
  const [more, setMore] = useState(6)
  const [filteredData, setFilteredData] = useState(data)

  // Keep filteredData in sync with data prop
  useEffect(() => {
    setFilteredData(data)
    setMore(6)
  }, [data])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase()
    const filtered = data?.filter(val =>
      val.toLowerCase().includes(value)
    )
    setFilteredData(filtered)
    setMore(6) // Reset "more" to 6 on new search
  }

  const handleCloseSearch = () => {
    setIsSearch(false)
    setFilteredData(data)
    setMore(6)
  }

  return (
    <div className={styles.section}>
      {isSearch ? (
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder={`Search for ${type}... `}
            className={styles.input}
            onChange={handleInputChange}
          />
          <button
            className={styles.closeSearchButton}
            onClick={handleCloseSearch}
          >
            <CloseIcon />
          </button>
        </div>
      ) : (
        <div className={styles.brandHeader}>
          <h3 className={styles.sectionTitle}>{type.toUpperCase()}</h3>
          {data && data.length > 4 && (
            <button
              className={styles.searchButton}
              onClick={() => setIsSearch(true)}
            >
              <SearchIcon fontSize='small' />
            </button>
          )}
        </div>
      )}

      <div className={styles.checkboxGroup}>
        {filteredData?.slice(0, more).map((val) =>
         
            <label key={val} className={styles.checkboxRow}>
              <input
                type="checkbox"
                checked={selectedData.includes(val)}
                onChange={e => handleChange(val, e.target.checked)}
              />
              <span className={styles.checkboxLabel}>{val}</span>
            </label>
          
        )}
        {filteredData && filteredData.length > more && (
          <button
            className={styles.moreBtn}
            onClick={() => setMore(filteredData.length)}
          >
            + {filteredData.length - more} more
          </button>
        )}
      </div>
    </div>
  )
}

export default SideBarFilters
