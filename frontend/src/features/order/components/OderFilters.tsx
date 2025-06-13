import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { setFilters, clearFilters } from '../slice/orderSlice';
import type { OrderStatus } from '../types/orders';
import Button from '../../../components/UI/Button';
import SearchInput from '../../../components/UI/SearchInput';
import styles from '../css/orderFilter.module.css'
import wstyles from '../../wishlist/css/wishlistFilter.module.css';
interface OrderFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  totalOrders: number;
}

const OrderFilters: React.FC<OrderFiltersProps> = () => {
   const [showFilters, setShowFilters] = useState(false); 
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector((state) => state.orders);
  
  const [localFilters, setLocalFilters] = useState({
    status: filters.status || '',
    searchQuery: filters.searchQuery || '',
    minAmount: filters.minAmount || '',
    maxAmount: filters.maxAmount || '',
    startDate: filters.dateRange?.startDate || '',
    endDate: filters.dateRange?.endDate || '',
  });

  const toggleFilters = () => setShowFilters(prev => !prev);
  const handleFilterChange = (key: string, value: string) => {
    setLocalFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const applyFilters = () => {
    const filterData: any = {};
    
    if (localFilters.status) {
      filterData.status = localFilters.status as OrderStatus;
    }
    
    if (localFilters.searchQuery) {
      filterData.searchQuery = localFilters.searchQuery;
    }
    
    if (localFilters.minAmount) {
      filterData.minAmount = parseFloat(String(localFilters.minAmount));
    }
    
    if (localFilters.maxAmount) {
      filterData.maxAmount = parseFloat(String(localFilters.maxAmount));
    }
    
    if (localFilters.startDate && localFilters.endDate) {
      filterData.dateRange = {
        startDate: localFilters.startDate,
        endDate: localFilters.endDate,
      };
    }
    
    dispatch(setFilters(filterData));
  };

  const handleClearFilters = () => {
    setLocalFilters({
      status: '',
      searchQuery: '',
      minAmount: '',
      maxAmount: '',
      startDate: '',
      endDate: '',
    });
    dispatch(clearFilters());
  };

  const orderStatuses: OrderStatus[] = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

  return (
    <div className={wstyles.wishlistFiltersWrapper}>
      <div className={wstyles.toggleBar}>
        <button onClick={toggleFilters} className={wstyles.toggleBtn}>
          {showFilters ? 'Hide Filters ▲' : 'Show Filters ▼'}
        </button>
      </div>
      { showFilters && (
    <div className={styles.orderFilters}>
      <div className={styles.filterSection}>
        <h3>Filter Orders</h3>
        
        <div className={styles.filterGroup}>
          <SearchInput
            placeholder="Search orders, customers, or products..."
            value={localFilters.searchQuery}
            onChange={(value) => handleFilterChange('searchQuery', value)}
            onSearch={applyFilters}
          />
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="status">Order Status</label>
          <select
            id="status"
            value={localFilters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className={styles.select}
          >
            <option value="">All Statuses</option>
            {orderStatuses.map(status => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label>Amount Range</label>
          <div className={styles.rangeInputs}>
            <input
              type="number"
              placeholder="Min amount"
              value={localFilters.minAmount}
              onChange={(e) => handleFilterChange('minAmount', e.target.value)}
              className={styles.input}
            />
            <span>-</span>
            <input
              type="number"
              placeholder="Max amount"
              value={localFilters.maxAmount}
              onChange={(e) => handleFilterChange('maxAmount', e.target.value)}
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.filterGroup}>
          <label>Date Range</label>
          <div className={styles.dateInputs}>
            <input
              type="date"
              value={localFilters.startDate}
              onChange={(e) => handleFilterChange('startDate', e.target.value)}
              className={styles.input}
            />
            <span>to</span>
            <input
              type="date"
              value={localFilters.endDate}
              onChange={(e) => handleFilterChange('endDate', e.target.value)}
              className={styles.input}
            />
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
    </div>)}
    </div>
  );
};

export default OrderFilters;