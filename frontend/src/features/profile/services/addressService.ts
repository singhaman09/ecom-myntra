import api from './api';
import type { Address } from '../types/profile.types';


export const getAddresses = async (): Promise<Address[]> => {
  const response = await api.get('/addresses');
  return response.data.data;
};


export const addAddress = async (address: Omit<Address, '_id'>): Promise<Address> => {
  const response = await api.post('/address', address);
  return response.data;
};

export const updateAddress = async (address: Partial<Address>): Promise<Address> => {
  const { _id, ...addressData } = address;
  const response = await api.patch(`/address/${_id}`, addressData);
  return response.data;
};

export const deleteAddress = async (id: string): Promise<void> => {
  await api.delete(`/address/${id}`);
};

export const setDefaultAddress = async (id: string): Promise<void> => {
  await api.patch(`/addresses/${id}/set-default`);
};