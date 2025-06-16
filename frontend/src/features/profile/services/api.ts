import axios from 'axios';

const API_BASE_URL =  'http://172.50.3.140:3001/users';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('authToken');
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbnRpdHlJZCI6IjY4NDE2ZDllZGE5MDkyZDc1YjBkODg2MCIsImVtYWlsIjoiaGltYW5zaHUuc2luZ2gyQGFwcGludmVudGl2LmNvbSIsInJvbGUiOiJ1c2VyIiwiZGV2aWNlSWQiOiI5NzgwZTVmZS03Zjg3LTQyNGQtYjIyNi0wMWM5NTMzMzkzZWMiLCJpYXQiOjE3NDk4MjE1ODUsImV4cCI6MTc0OTkwNzk4NX0.ARz2atccDepg5vvD85JDaukTfNQrAcFNn8g6mxA8Sds';
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