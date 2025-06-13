import axios from 'axios';
import type { User } from '../types/profile.types';

export const getUser = async (): Promise<User> => {
  const response = await axios.get('/api/user'); // yahan real api point aega
  return response.data;
};

export const changePassword = async (
  currentPassword: string,
  newPassword: string
): Promise<void> => {
  await axios.patch('/api/change-password', {
    currentPassword,
    newPassword,
  });
};


export const verifyPassword = async (currentPassword: string): Promise<{ success: boolean; message?: string }> => {
  await axios.post('/api/verify-password', { currentPassword });
  return { success: true};
};

