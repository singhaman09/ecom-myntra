const TOKEN_KEY = 'auth_token';

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (token: string) => {
    localStorage.setItem('auth_token', token);
  };
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);
