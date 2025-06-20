import api from './api';
import type { User, ApiResponse } from '../types/profile.types';

export const getUser = async (): Promise<User> => {
  const response = await api.get<ApiResponse<User>>('/profile');
  return response.data.data;
};

export const updateUser = async (userData: Partial<User>): Promise<User> => {
  const response = await api.patch<ApiResponse<User>>('/edit-profile', userData);
  return response.data.data;
};

export const changePassword = async (
  oldPassword: string,
  newPassword: string
): Promise<void> => {
  await api.patch('/change-password', {
    oldPassword,
    newPassword,
  });
};