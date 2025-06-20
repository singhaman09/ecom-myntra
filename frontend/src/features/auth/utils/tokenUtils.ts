const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

// Cookie utilities
export const setCookie = (name: string, value: string, days: number = 7) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;secure;samesite=strict`;
};

export const getCookie = (name: string): string | null => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

export const deleteCookie = (name: string) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

// Token management functions
export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

// Refresh token management (stored in cookies for security)
export const getRefreshToken = (): string | null => {
  return getCookie(REFRESH_TOKEN_KEY);
};

export const setRefreshToken = (refreshToken: string) => {
  setCookie(REFRESH_TOKEN_KEY, refreshToken, 30); // 30 days expiry
};

export const clearRefreshToken = () => {
  deleteCookie(REFRESH_TOKEN_KEY);
};

// Combined token management
export const setTokens = (accessToken: string, refreshToken: string) => {
  setToken(accessToken);
  setRefreshToken(refreshToken);
};

export const clearAllTokens = () => {
  clearToken();
  clearRefreshToken();
};