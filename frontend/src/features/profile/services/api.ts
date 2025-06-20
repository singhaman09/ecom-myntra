import axios from 'axios';
import { getToken } from '../../auth/utils/tokenUtils';

const API_BASE_URL =  'http://172.50.3.140:3001/users';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    } 
  return config;
});


api.interceptors.response.use(
  (response) => response,
  (error) => {    
    if (error.response?.status === 401) {     
    }
    return Promise.reject(error);
  }
);

export default api;