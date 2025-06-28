import { useState, useEffect } from 'react';
import type { Order } from '../types/orders';
import { apiService } from '../api';
export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, searchTerm]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await apiService.getOrders();
      setOrders(data);
      setError(null);
    } catch (err) {
      setError('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const filterOrders = () => {
    if (!searchTerm.trim()) {
      setFilteredOrders(orders);
      return;
    }

    const lower = searchTerm.toLowerCase();
    const filtered = orders.filter(order =>
      order.items.some(item =>
        item.name.toLowerCase().includes(lower) ||
        item.brand.toLowerCase().includes(lower)
      )
    );
    setFilteredOrders(filtered);
  };

  const submitRating = async (orderId: string, rating: number) => {
    try {
      const res = await apiService.submitRating(orderId, rating);
      return res.success;
    } catch {
      return false;
    }
  };

  return {
    orders: filteredOrders,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    submitRating,
    refreshOrders: fetchOrders,
  };
};
