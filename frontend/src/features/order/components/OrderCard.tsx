// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import type { Order } from '../types/orders';
// import StarRating from '../../../components/UI/StarRating';
// import { getStatusColor, getStatusText } from '../utils/helpers';
// import styles from '../css/orderCard.module.css';

// interface OrderCardProps {
//   order: Order;
//   onRatingSubmit: (orderId: string, rating: number) => Promise<boolean>;
//   onWriteReview?: (orderId: string) => void;
//   onExchangeReturn?: (orderId: string, itemId: string) => void;
//   onBuyAgain?: (orderId: string, itemId: string) => void;
// }

// const OrderCard: React.FC<OrderCardProps> = ({ 
//   order, 
//   onRatingSubmit,
//   onWriteReview,
//   onExchangeReturn,
//   onBuyAgain
// }) => {
  // const navigate = useNavigate();
//   const [isSubmittingRating, setIsSubmittingRating] = useState(false);
//   const [expandedItems, setExpandedItems] = useState(false);

//   const handleRatingChange = async (rating: number) => {
//     if (isSubmittingRating) return;
    
//     setIsSubmittingRating(true);
//     try {
//       const success = await onRatingSubmit(order.id, rating);
//       if (!success) {
//         //error handling if needed
//       }
//     } catch (error) {
//       //error handling if needed
//     } finally {
//       setIsSubmittingRating(false);
//     }
//   };

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case 'delivered': return '✓';
//       case 'shipped': return '🚚';
//       case 'pending': return '⏳';
//       case 'cancelled': return '✗';
//       default: return '📦';
//     }
//   };

//   const formatDate = (dateString: string) => {
//     try {
//       return new Date(dateString).toLocaleDateString('en-US', {
//         day: 'numeric',
//         month: 'short',
//         year: 'numeric'
//       });
//     } catch {
//       return dateString;
//     }
//   };

//   const isExchangeReturnAvailable = () => {
//     if (!order.exchangeReturnWindow) return false;
//     const windowDate = new Date(order.exchangeReturnWindow);
//     return windowDate > new Date();
//   };

//   const handleViewDetails = () => {
//     navigate(`/orders/order123`);
//   };

//   const handleWriteReview = () => {
//     onWriteReview?.(order.id);
//   };

//   const displayItems = expandedItems ? order.items : order.items.slice(0, 2);
//   const hasMoreItems = order.items.length > 2;

//   return (
//     <div className={styles.orderCard} >
//       <div className={styles.orderHeader} >
//         <div 
//           className={styles.statusIndicator}
//           style={{ backgroundColor: getStatusColor(order.status) }}
//           onClick={() => navigate(`/orders/${order.id}`)}
//         >
//           {getStatusIcon(order.status)}
//         </div>
        
//         <div className={styles.statusInfo}>
//           <div className={styles.statusText}>
//             {order.status === 'delivered' ? 'Order Delivered' : getStatusText(order.status)}
//           </div>
//           <div className={styles.deliveryDate}>
//             {order.status === 'delivered' ? 'Delivered on' : 'Expected on'} {formatDate(order.deliveryDate)}
//           </div>
//           <div className={styles.orderId}>
//             Order #{order.id.slice(-8)}
//           </div>
//         </div>
        
//         {order.trackingInfo && (
//           <div className={styles.trackingInfo}>
//             <span className={styles.trackingIcon}>📦</span>
//             <div className={styles.trackingDetails}>
//               <div className={styles.courierName}>{order.trackingInfo.courier}</div>
//               <div className={styles.trackingId}>#{order.trackingInfo.trackingId}</div>
//             </div>
//           </div>
//         )}
        
//         {/* <button 
//           className={styles.viewDetailsBtn}
//           onClick={handleViewDetails}
//           aria-label="View order details"
//         >
//           View Details
//         </button> */}
//       </div>
      
//       <div className={styles.orderBody}>
//         {displayItems.map((item) => (
//           <div key={item.id} className={styles.orderItem}>
//             <div className={styles.itemImageContainer}>
//               <img 
//                 src={item.image} 
//                 alt={item.name}
//                 className={styles.itemImage}
//                 loading="lazy"
//               />
//               {item.quantity > 1 && (
//                 <div className={styles.quantityBadge}>
//                   {item.quantity}
//                 </div>
//               )}
//             </div>
            
//             <div className={styles.itemDetails}>
//               <div className={styles.brandLabel}>
//                 fwd {item.brand}
//               </div>
              
//               <div className={styles.itemName} onClick={handleViewDetails}>
//                 {item.name}
//               </div>
              
//               <div className={styles.itemMeta}>
//                 <span>Size: {item.size}</span>
//                 {item.color && <span> • Color: {item.color}</span>}
//               </div>
              
//               <div className={styles.itemPrice}>
//                 ₹{item.price.toLocaleString()}
//               </div>
              
//               {order.status === 'delivered' && (
//                 <div className={styles.itemActions}>
//                   {isExchangeReturnAvailable() && (
//                     <button 
//                       className={`${styles.actionButton} ${styles.exchangeBtn}`}
//                       onClick={() => onExchangeReturn?.(order.id, item.id)}
//                     >
//                       Exchange/Return
//                     </button>
//                   )}
//                   <button 
//                     className={`${styles.actionButton} ${styles.buyAgainBtn}`}
//                     onClick={() => onBuyAgain?.(order.id, item.id)}
//                   >
//                     Buy Again
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
        
//         {hasMoreItems && (
//           <button 
//             className={styles.expandBtn}
//             onClick={() => setExpandedItems(!expandedItems)}
//           >
//             {expandedItems 
//               ? `Show Less` 
//               : `Show ${order.items.length - 2} More Items`
//             }
//           </button>
//         )}
        
//         {order.exchangeReturnWindow && (
//           <div className={styles.exchangeInfo}>
//             <span className={styles.exchangeIcon}>⏰</span>
//             <span>
//               {isExchangeReturnAvailable() 
//                 ? `Exchange/Return until ${formatDate(order.exchangeReturnWindow)}`
//                 : `Exchange/Return window closed on ${formatDate(order.exchangeReturnWindow)}`
//               }
//             </span>
//           </div>
//         )}
        
//         {order.status === 'delivered' && (
//           <div className={styles.orderActions}>
//             <div className={styles.ratingSection}>
//               <span className={styles.ratingText}>Rate & Review to</span>
//               <StarRating
//                 rating={order.rating || 0}
//                 onRatingChange={order.canRate ? handleRatingChange : undefined}
//                 readonly={!order.canRate || isSubmittingRating}
//                 size="medium"
//               />
//               <span className={styles.ratingText}>win Myntra Credit</span>
//               <button 
//                 className={styles.writeReviewBtn}
//                 onClick={handleWriteReview}
//                 disabled={!order.canRate}
//               >
//                 {order.rating ? 'Update Review' : 'Write Review'}
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default OrderCard;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../css/orderCard.module.css';
import shoes from '../../../assets/shoes.jpeg';
import type { Order } from '../types/orders';

interface OrderCardProps {
  order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const navigate = useNavigate();

  const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'placed':
      case 'pending':
      case 'processing':
        return '#d4a574';
      case 'delivered':
        return '#28a745';
      case 'shipped':
        return '#007bff';
      case 'cancelled':
        return '#dc3545';
      case 'returned':
        return '#6c757d';
      default:
        return '#6c757d';
    }
  };

  const handleViewDetails = () => {
    navigate(`/orders/${order.id}`);
  };
  // Use first item for product details; adjust if multiple items need display
  const primaryItem = order.items[0] || {
    name: 'Unknown Product',
    image: shoes,
  };

  return (
    <div className={styles.orderCard}>
      <div className={styles.orderHeader}>
        <div className={styles.orderInfo}>
          <h3 className={styles.orderId}>{order.id.slice(-8)}</h3>
          <p className={styles.itemCount}>{order.items.length} Item{order.items.length !== 1 ? 's' : ''}</p>
        </div>
        <div
          className={styles.statusBadge}
          style={{ backgroundColor: getStatusColor(order.status)}}
          onClick={handleViewDetails}
        >
          {order.status}
        </div>
      </div>

      <div className={styles.orderContent}>
        <div className={styles.productImage}>
          <img
            src={primaryItem.image || shoes}
            alt={primaryItem.name}
            className={styles.productImg}
          />
        </div>

        <div className={styles.productDetails}>
          <h4 className={styles.productName} onClick={handleViewDetails}>
            {primaryItem.name}
          </h4>
          <div className={styles.orderMeta}>
            <p className={styles.orderDate}>Order Date: {new Date(order.orderDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
            <p className={styles.paymentMode}>Mode of Payment: {order.paymentMethod?.type?.toUpperCase() || 'N/A'}</p>
          </div>
        </div>

        <div className={styles.priceSection}>
          <span className={styles.price}>₹{order.total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(OrderCard);