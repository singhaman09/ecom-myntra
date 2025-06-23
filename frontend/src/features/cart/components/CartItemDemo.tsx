// import React from 'react';
// import CartItem from './CartItem';
// import type { CartItem as CartItemType } from '../types/cart';
// import { toast } from 'react-toastify';

// const CartItemDemo: React.FC = () => {
//   // Sample cart item data
//   const sampleItem: CartItemType = {
//     productId: "1",
//     name: "Pink Grape Fruit Shower Gel",
//     description: "Refreshing shower gel with natural grapefruit extracts",
//     price: 499,
//     quantity: 2,
//     size: "450 ml",
//     image: "https://via.placeholder.com/150x150/FF69B4/FFFFFF?text=Shower+Gel",
//     availableSizes: ["250 ml", "450 ml", "750 ml"]
//   };

//   const handleRemove = (productId: string) => {
//     console.log('Remove item:', productId);
//     toast.success(`Removed item ${productId} from cart`);
//   };

//   const handleQuantityChange = (productId: string, action: "increment" | "decrement") => {
//     console.log('Quantity change:', productId, action);
//   };

//   const handleMoveToWishlist = (productId: string) => {
//     console.log('Move to wishlist:', productId);
//     toast.success(`Moved item ${productId} to wishlist`);
//   };

//   return (
//     <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
//       <h2>CartItem Component Demo</h2>
//       <p>Hover over the left or right edges of the cart item to see the slider effects:</p>
//       <ul>
//         <li><strong>Left edge:</strong> Shows "Remove" button</li>
//         <li><strong>Right edge:</strong> Shows "Move to Wishlist" button</li>
//       </ul>
      
//       <div style={{ marginTop: '20px' }}>
//         <CartItem
//           item={sampleItem}
//           onRemove={handleRemove}
//           onQuantityChange={handleQuantityChange}
//           onMoveToWishlist={handleMoveToWishlist}
//         />
//       </div>
      
//       <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
//         <h3>Features:</h3>
//         <ul>
//           <li>✅ Smooth slider hover effects</li>
//           <li>✅ Left slide for remove action</li>
//           <li>✅ Right slide for wishlist action</li>
//           <li>✅ Quantity controls with increment/decrement</li>
//           <li>✅ Responsive design</li>
//           <li>✅ Price display with discount</li>
//           <li>✅ Size information</li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default CartItemDemo; 