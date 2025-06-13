import axios from 'axios';
import type { User } from '../types/profile.types';

export const getUser = async (): Promise<User> => {
  const response = await axios.get('/api/user'); // Replace with your real API endpoint
  return response.data;
};
