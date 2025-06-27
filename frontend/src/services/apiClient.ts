import axios from 'axios';
import { getRefreshToken, setTokens, clearAllTokens, getToken } from '../features/auth/utils/tokenUtils';

declare module 'axios' {
  export interface InternalAxiosRequestConfig {
    skipAuth?: boolean;
    _retry?: boolean;
  }
}

const apiClient = axios.create({
  baseURL: '',
  headers: {
    'Content-Type': 'application/json',
  },
});


apiClient.interceptors.request.use(
  (config) => {
    
    if (!config.skipAuth) {
      const token = getToken();
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

// Response interceptor to handle common errors and token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = getRefreshToken();
        if (refreshToken) {
          // Call refresh token API
          const refreshResponse = await axios.post(
            'http://172.50.3.140:3001/users/refresh-token',
            { refreshToken },
            { headers: { 'Content-Type': 'application/json' } }
          );

          const { accessToken, refreshToken: newRefreshToken } = refreshResponse.data.data;
          
          // Update tokens
          setTokens(accessToken, newRefreshToken);
          
          // Update the original request with new token
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          
          // Retry the original request
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, clear tokens and redirect to login
        clearAllTokens();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // If not 401 or refresh failed, handle as before
    if (error.response?.status === 401) {
      clearAllTokens();
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;