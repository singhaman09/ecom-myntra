// import { useState, useEffect } from 'react';
// import type { Order } from '../types/orders';

// const mockOrders: Order[] = [
//   {
//     id: 'order123',
//     status: 'delivered',
//     deliveryDate: '2025-06-01',
//     orderDate: '2025-05-25',
//     exchangeReturnWindow: '2025-06-15',
//     items: [
//       {
//         id: 'item1',
//         name: 'Casual Shirt',
//         brand: 'Levis',
//         image: 'https://via.placeholder.com/80',
//         size: 'M',
//         color: 'Blue',
//         price: 1999,
//         quantity: 1,
//       },
//     ],
//     totalAmount: 1999,
//     total: 1999,
//     customerName: 'John Doe',
//     deliveryAddress: {
//       id: 'addr1',
//       name: 'John Doe',
//       addressLine1: '123 Main St',
//       city: 'Mumbai',
//       state: 'Maharashtra',
//       pincode: '400001',
//       country: 'India',
//       phoneNumber: '9876543210',
//     },
//     paymentMethod: {
//       type: 'card',
//       last4Digits: '1234',
//       provider: 'Visa',
//       transactionId: 'txn123',
//     },
//   },
//   {
//     id: 'order123',
//     status: 'delivered',
//     deliveryDate: '2025-06-01',
//     orderDate: '2025-05-25',
//     exchangeReturnWindow: '2025-06-15',
//     items: [
//       {
//         id: 'item1',
//         name: 'Casual Pant',
//         brand: 'Levis',
//         image: 'https://via.placeholder.com/80',
//         size: 'M',
//         color: 'Blue',
//         price: 1999,
//         quantity: 1,
//       },
//     ],
//     totalAmount: 1999,
//     total: 1999,
//     customerName: 'John Doe',
//     deliveryAddress: {
//       id: 'addr1',
//       name: 'John Doe',
//       addressLine1: '123 Main St',
//       city: 'Mumbai',
//       state: 'Maharashtra',
//       pincode: '400001',
//       country: 'India',
//       phoneNumber: '9876543210',
//     },
//     paymentMethod: {
//       type: 'card',
//       last4Digits: '1234',
//       provider: 'Visa',
//       transactionId: 'txn123',
//     },
//   }
// ];

// export const useOrders = () => {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   useEffect(() => {
//     filterOrders();
//   }, [orders, searchTerm]);

//   const fetchOrders = async () => {
//     setLoading(true);
//     try {
//       setTimeout(() => {
//         setOrders(mockOrders);
//         setError(null);
//         setLoading(false);
//       }, 1000);
//     } catch (err) {
//       setError('Failed to load orders');
//       setLoading(false);
//     }
//   };
  

//   const filterOrders = () => {
//     if (!searchTerm.trim()) {
//       setFilteredOrders(orders);
//       return;
//     }

//     const filtered = orders.filter(order =>
//       order.items.some(item =>
//         item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         item.brand.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     );
//     setFilteredOrders(filtered);
//   };

//     const submitRating = async (orderId: string, rating: number) => {
//     try {
//       // API call or state update logic here
//       return true;
//     } catch (error) {
//       return false;
//     }
//   };

//   return {
//     orders: filteredOrders,
//     loading,
//     error,
//     searchTerm,
//     setSearchTerm,
//     submitRating,
//     refreshOrders: fetchOrders,
//   };
// };