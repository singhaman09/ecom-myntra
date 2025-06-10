import { useState, useEffect } from 'react';
import type { Order } from '../types/orders';
import { apiService } from '../services/api';

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, searchTerm]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await apiService.getOrders();
      setOrders(response);
      setError(null);
    } catch (err) {
      setError('Failed to load orders');
    }
    setLoading(false);
  };

  const filterOrders = () => {
    if (!searchTerm.trim()) {
      setFilteredOrders(orders);
      return;
    }

    const filtered = orders.filter(order =>
      order.items.some(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredOrders(filtered);
  };

  const submitRating = async (orderId: string, rating: number) => {
    const response = await apiService.submitRating(orderId, rating);
    if (response.success) {
      setOrders(prev => prev.map(order =>
        order.id === orderId ? { ...order, rating } : order
      ));
    }
    return response.success;
  };

  return {
    orders: filteredOrders,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    submitRating,
    refreshOrders: fetchOrders
  };
};
