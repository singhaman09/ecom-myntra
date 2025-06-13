import api from './api';
import type { Address } from '../types/profile.types';

export const getAddresses = async (): Promise<Address[]> => {
  const response = await api.get('/addresses');
  return response.data;
};

export const addAddress = async (address: Omit<Address, 'id'>): Promise<Address> => {
  const response = await api.post('/addresses', address);
  return response.data;
};

export const updateAddress = async (id: string, address: Partial<Address>): Promise<Address> => {
  const response = await api.put(`/address/${id}`, address);
  return response.data;
};

export const deleteAddress = async (id: string): Promise<void> => {
  await api.delete(`/addresses/${id}`);
};

export const setDefaultAddress = async (id: string): Promise<void> => {
  await api.patch(`/addresses/${id}/set-default`);
};