// src/components/SearchBar/SearchBar.tsx
import React from 'react';
import { Search, LocateFixed } from 'lucide-react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className={styles.searchBar}>
      <Search className={styles.searchIcon} />
      <input
        type="text"
        placeholder="Search by city, town or postcode"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className={styles.searchInput}
      />
      <LocateFixed className={styles.navigationIcon} />
    </div>
  );
};

export default React.memo(SearchBar);