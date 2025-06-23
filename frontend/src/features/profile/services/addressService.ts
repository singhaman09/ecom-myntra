import api from './api';
import type { Address } from '../types/profile.types';

// export const getAddresses = async (): Promise<Address[]> => {
//   const response = await api.get('/addresses');
//   console.log("notning" + response.data);
//   console.log("something" +  Object.values(response.data))
//   return Object.values(response.data);
//   // return response.data;
// };


export const getAddresses = async (): Promise<Address[]> => {
  const response = await api.get('/addresses');
  return response.data.data;
};


export const addAddress = async (address: Omit<Address, 'id'>): Promise<Address> => {
  const response = await api.post('/address', address);
  return response.data;
};

export const updateAddress = async (id: string, address: Partial<Address>): Promise<Address> => {
  const response = await api.put(`/address/${id}`, address);
  return response.data;
};

export const deleteAddress = async (id: string): Promise<void> => {
  await api.delete(`/address/${id}`);
};

export const setDefaultAddress = async (id: string): Promise<void> => {
  await api.patch(`/addresses/${id}/set-default`);
};