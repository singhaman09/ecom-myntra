import React from 'react';
import styles from '../../components/shared/css/searchInput.module.css';
import { FiSearch } from 'react-icons/fi';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  onSearch?: () => void;
  onClear?: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = "Search in orders",
  className = ""
}) => {
  return (
    <div className={`${styles.searchContainer} ${className}`}>
      <span className={styles.searchIcon}><FiSearch/></span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={styles.searchInput}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className={styles.clearButton}
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default SearchInput;
