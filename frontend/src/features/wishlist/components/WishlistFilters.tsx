// import React, { useState } from 'react';
// import { useAppDispatch, useAppSelector } from '../../order/hooks/redux';
// import { setFilters, clearFilters } from '../slice/wishlistSlice';
// import styles from '../css/wishlistFilter.module.css';

// const WishlistFilters: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const { filters, categories } = useAppSelector((state) => state.wishlist);
//   const [isFiltersOpen, setIsFiltersOpen] = useState(true);

//   const handleCategoryChange = (category: string) => {
//     dispatch(setFilters({ ...filters, category: category === filters.category ? '' : category }));
//   };

//   const handlePriceRangeChange = (min: number, max: number) => {
//     dispatch(setFilters({ ...filters, priceRange: { min, max } }));
//   };

//   const handleInStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     dispatch(setFilters({ ...filters, inStock: e.target.checked }));
//   };

//   const handleSortByChange = (sortBy: string) => {
//     dispatch(setFilters({ ...filters, sortBy }));
//   };

//   const handleSortOrderChange = (sortOrder: 'asc' | 'desc') => {
//     dispatch(setFilters({ ...filters, sortOrder }));
//   };

//   const handleClearFilters = () => {
//     dispatch(clearFilters());
//   };

//   const toggleFilters = () => {
//     setIsFiltersOpen(!isFiltersOpen);
//   };

//   return (
//     <div className={styles.wishlistFiltersWrapper}>
//       {/* Filter Toggle Button */}
//       <div className={styles.filterToggle}>
//         <button 
//           className={`${styles.toggleBtn} ${isFiltersOpen ? styles.active : ''}`}
//           onClick={toggleFilters}
//         >
//           FILTERS
//           <span className={styles.toggleIcon}>
//             {isFiltersOpen ? '▲' : '▼'}
//           </span>
//         </button>
//         {Object.keys(filters).some(key => 
//           filters[key] && 
//           (key !== 'sortBy' || filters[key] !== 'dateAdded') && 
//           (key !== 'sortOrder' || filters[key] !== 'desc')
//         ) && (
//           <button className={styles.clearAllBtn} onClick={handleClearFilters}>
//             CLEAR ALL
//           </button>
//         )}
//       </div>

//       {/* Filters Section */}
//       <div className={`${styles.wishlistFilters} ${isFiltersOpen ? styles.open : styles.closed}`}>
        
//         {/* Categories */}
//         <div className={styles.filterSection}>
//           <h4 className={styles.filterTitle}>CATEGORIES</h4>
//           <div className={styles.filterOptions}>
//             {categories.map((category) => (
//               <label key={category} className={styles.checkboxLabel}>
//                 <input
//                   type="checkbox"
//                   checked={filters.category === category}
//                   onChange={() => handleCategoryChange(category)}
//                   className={styles.checkbox}
//                 />
//                 <span className={styles.checkboxText}>{category}</span>
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Price Range */}
//         <div className={styles.filterSection}>
//           <h4 className={styles.filterTitle}>PRICE</h4>
//           <div className={styles.priceInputs}>
//             <input
//               type="number"
//               placeholder="Min"
//               value={filters.priceRange?.min || ''}
//               onChange={(e) =>
//                 handlePriceRangeChange(Number(e.target.value), filters.priceRange?.max || 100000)
//               }
//               className={styles.priceInput}
//             />
//             <span className={styles.priceSeparator}>to</span>
//             <input
//               type="number"
//               placeholder="Max"
//               value={filters.priceRange?.max || ''}
//               onChange={(e) =>
//                 handlePriceRangeChange(filters.priceRange?.min || 0, Number(e.target.value))
//               }
//               className={styles.priceInput}
//             />
//           </div>
//         </div>

//         {/* Availability */}
//         <div className={styles.filterSection}>
//           <h4 className={styles.filterTitle}>AVAILABILITY</h4>
//           <div className={styles.filterOptions}>
//             <label className={styles.checkboxLabel}>
//               <input
//                 type="checkbox"
//                 checked={filters.inStock || false}
//                 onChange={handleInStockChange}
//                 className={styles.checkbox}
//               />
//               <span className={styles.checkboxText}>In Stock</span>
//             </label>
//           </div>
//         </div>

//         {/* Sort By */}
//         <div className={styles.filterSection}>
//           <h4 className={styles.filterTitle}>SORT BY</h4>
//           <div className={styles.filterOptions}>
//             {['name', 'price', 'dateAdded', 'rating'].map((option) => (
//               <label key={option} className={styles.radioLabel}>
//                 <input
//                   type="radio"
//                   name="sortBy"
//                   checked={filters.sortBy === option}
//                   onChange={() => handleSortByChange(option)}
//                   className={styles.radio}
//                 />
//                 <span className={styles.radioText}>
//                   {option === 'dateAdded' ? 'Date Added' : 
//                    option.charAt(0).toUpperCase() + option.slice(1)}
//                 </span>
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Sort Order */}
//         <div className={styles.filterSection}>
//           <h4 className={styles.filterTitle}>ORDER</h4>
//           <div className={styles.filterOptions}>
//             <label className={styles.radioLabel}>
//               <input
//                 type="radio"
//                 name="sortOrder"
//                 checked={filters.sortOrder === 'asc'}
//                 onChange={() => handleSortOrderChange('asc')}
//                 className={styles.radio}
//               />
//               <span className={styles.radioText}>Low to High</span>
//             </label>
//             <label className={styles.radioLabel}>
//               <input
//                 type="radio"
//                 name="sortOrder"
//                 checked={filters.sortOrder === 'desc'}
//                 onChange={() => handleSortOrderChange('desc')}
//                 className={styles.radio}
//               />
//               <span className={styles.radioText}>High to Low</span>
//             </label>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WishlistFilters;