// features/auth/constants/authConstants.ts

// Base URL from environment variables with fallback
export const API_BASE_URL = import.meta.env.VITE_AUTH_SERVICE_URL;

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/users/login`,
    REGISTER: `${API_BASE_URL}/users/signup`,
    LOGOUT: `${API_BASE_URL}/users/logout`,
    FORGOT_PASSWORD: `${API_BASE_URL}/users/forgot-password`,
    VERIFY_EMAIL: `${API_BASE_URL}/users/verify-email`,
    RESEND_VERIFICATION: `${API_BASE_URL}/users/resend-verification`,
    VERIFY_OTP: `${API_BASE_URL}/users/forgot-password/verify-otp`,
    RESET_PASSWORD: `${API_BASE_URL}/users/forgot-password/reset`,
    REFRESH_TOKEN: `${API_BASE_URL}/users/refresh-token`,
  },
} as const;