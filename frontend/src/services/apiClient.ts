import axios from 'axios';

declare module 'axios' {
  export interface InternalAxiosRequestConfig {
    skipAuth?: boolean;
  }
}

const apiClient = axios.create({
  baseURL: 'http://localhost:3001/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - only adds token if skipAuth is NOT true
apiClient.interceptors.request.use(
  (config) => {
    // Don't add token if skipAuth is true
    if (!config.skipAuth) {
      const token = localStorage.getItem('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config; 
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;