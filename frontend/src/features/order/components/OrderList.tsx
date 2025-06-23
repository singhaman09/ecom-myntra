// import React, { useEffect } from 'react';
// import { useAppDispatch, useAppSelector } from '../hooks/redux';
// import { fetchOrders, setCurrentPage, setItemsPerPage } from '../slice/orderSlice';
// import OrderCard from './OrderCard';
// import Button from '../../../components/UI/Button';
// import styles from '../css/orderList.module.css';
// import { useNavigate } from 'react-router-dom';

// interface OrderListProps {
//   onRatingSubmit: (orderId: string, rating: number) => Promise<boolean>;
//   onWriteReview?: (orderId: string) => void;
//   onExchangeReturn?: (orderId: string, itemId: string) => void;
//   onBuyAgain?: (orderId: string, itemId: string) => void;
// }

// const OrderList: React.FC<OrderListProps> = ({
//   onRatingSubmit,
//   onWriteReview,
//   onExchangeReturn,
//   onBuyAgain,
// }) => {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const { filteredOrders, loading, error, currentPage, itemsPerPage, totalOrders } = useAppSelector(
//     (state) => state.orders
//   );

//   useEffect(() => {
//     dispatch(fetchOrders());
//   }, [dispatch]);

//   const handlePageChange = (page: number) => {
//     dispatch(setCurrentPage(page));
//   };

//   const handleItemsPerPageChange = (items: number) => {
//     dispatch(setItemsPerPage(items));
//   };

//   // Pagination logic
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const paginatedOrders = filteredOrders.slice(startIndex, endIndex);
//   const totalPages = Math.ceil(totalOrders / itemsPerPage);

//   if (loading) {
//     return (
//       <div className={styles.loading}>
//         <div className={styles.spinner}></div>
//         <p>Loading orders...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className={styles.error}>
//         <p>Error: {error}</p>
//         <Button onClick={() => dispatch(fetchOrders())} variant="primary">
//           Retry
//         </Button>
//       </div>
//     );
//   }

//   return (
//     <div className={styles.orderList}>
//       <div className={styles.listHeader}>
//         <div className={styles.listInfo}>
//           <h2>My Orders</h2>
//           <p>{totalOrders} orders found</p>
//         </div>
//         {/* <div className={styles.listControls}>
//           <label>
//             Show:
//             <select
//               value={itemsPerPage}
//               onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
//             >
//               <option value={5}>5 per page</option>
//               <option value={10}>10 per page</option>
//               <option value={25}>25 per page</option>
//               <option value={50}>50 per page</option>
//             </select>
//           </label>
//         </div> */}
//       </div>

//       {paginatedOrders.length === 0 ? (
//         <div className={styles.noOrders}>
//           <p>No orders found matching your criteria.</p>
//           <Button onClick={() => navigate('/products')} variant="primary">
//             Start Shopping
//           </Button>
//         </div>
//       ) : (
//         <>
//           <div className={styles.ordersGrid}>
//             {paginatedOrders.map((order) => (
//               <OrderCard
//                 key={order.id}
//                 order={order}
//                 onRatingSubmit={onRatingSubmit}
//                 onWriteReview={onWriteReview}
//                 onExchangeReturn={onExchangeReturn}
//                 onBuyAgain={onBuyAgain}
//               />
//             ))}
//           </div>

//           {totalPages > 1 && (
//             <div className={styles.pagination}>
//               <Button
//                 onClick={() => handlePageChange(currentPage - 1)}
//                 disabled={currentPage === 1}
//                 variant="secondary"
//                 size="small"
//               >
//                 Previous
//               </Button>
//               <div className={styles.pageNumbers}>
//                 {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//                   <button
//                     key={page}
//                     onClick={() => handlePageChange(page)}
//                     className={`${styles.pageButton} ${page === currentPage ? styles.active : ''}`}
//                   >
//                     {page}
//                   </button>
//                 ))}
//               </div>
//               <Button
//                 onClick={() => handlePageChange(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//                 variant="secondary"
//                 size="small"
//               >
//                 Next
//               </Button>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default OrderList;



// import React, { useEffect, useState } from 'react';
// import { useAppDispatch, useAppSelector } from '../hooks/redux';
// import { fetchOrders, setCurrentPage, setItemsPerPage } from '../slice/orderSlice';
// import OrderCard from './OrderCard';
// import Button from '../../../components/UI/Button';
// import styles from '../css/orderList.module.css';
// import { useNavigate } from 'react-router-dom';
// import { FiFilter } from 'react-icons/fi';
// import OrderFilters from './OderFilters'

// Placeholder FilterComponent
// const FilterComponent: React.FC<{ onClose: () => void }> = ({ onClose }) => {
//   return (
//     <div className={styles.filterPanel}>
//       <div className={styles.filterHeader}>
//         <h3>Filter Orders</h3>
//         <button className={styles.closeButton} onClick={onClose} aria-label="Close filter">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="20"
//             height="20"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <path d="M18 6L6 18" />
//             <path d="M6 6l12 12" />
//           </svg>
//         </button>
//       </div>
//       <p>Filter options will be implemented here</p>
//     </div>
//   );
// };
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchOrders } from '../slice/orderSlice';
import OrderCard from './OrderCard';
import Button from '../../../components/UI/Button';
import styles from '../css/orderList.module.css';
import { useNavigate } from 'react-router-dom';
import { FiFilter } from 'react-icons/fi';
import OrderFilters from './OderFilters';

const OrderList: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { filteredOrders, loading, error, totalOrders } = useAppSelector(
    (state) => state.orders
  );
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const toggleFilter = () => {
    setShowFilter((prev) => !prev);
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>Error: {error}</p>
        <Button onClick={() => dispatch(fetchOrders())} variant="primary">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.orderList}>
      <div className={styles.listHeader}>
        <div className={styles.titlelistInfo}>
          <h2>My Orders</h2>
        </div>
        <div className={styles.listControls}>
          <button
            className={styles.filterButton}
            onClick={toggleFilter}
            aria-label="Toggle filters"
          >
            <FiFilter size={24} />
          </button>
        </div>
      </div>

      {showFilter && (
        <div className={styles.modalOverlay} onClick={toggleFilter}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <OrderFilters
              onClose={toggleFilter}
              searchTerm={''}
              onSearchChange={() => {}}
              totalOrders={totalOrders}
            />
          </div>
        </div>
      )}

      {filteredOrders.length === 0 ? (
        <div className={styles.noOrders}>
          <p>No orders found.</p>
          <Button onClick={() => navigate('/products')} variant="primary">
            Start Shopping
          </Button>
        </div>
      ) : (
        <div className={styles.ordersGrid}>
          {filteredOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(OrderList);
