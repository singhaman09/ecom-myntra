import apiClient from '../../../services/apiClient';

// Extend AxiosRequestConfig to include skipAuth
declare module 'axios' {
  export interface AxiosRequestConfig {
    skipAuth?: boolean;
  }
}
import type { LoginCredentials, RegisterData } from '../authSlice';
import type {
  AuthResponse,
  RegisterResponse,
  VerifyEmailRequest,
  VerifyEmailResponse,
  ResendOtpRequest,
  ResendOtpResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  LogoutRequest,
  logoutResponse
} from '../types';

// Add skipAuth: true to these calls since they don't need authentication
export const loginAPI = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const res = await apiClient.post('/users/login', credentials, { skipAuth: true });
  return res.data;
};

export const registerAPI = async (data: RegisterData): Promise<RegisterResponse & { email: string }> => {
  const res = await apiClient.post('/users/signup', data, { skipAuth: true } );
  return { ...res.data, email: data.email }; // Add email to response
};

export const forgotPasswordAPI = async (email: string): Promise<{ message: string }> => {
  const res = await apiClient.post('/users/forgot-password', { email }, { skipAuth: true });
  return res.data;
};

export const verifyEmailAPI = async (data: VerifyEmailRequest): Promise<VerifyEmailResponse> => {
  const res = await apiClient.post('/users/verify-email', data, { skipAuth: true });
  return res.data;
};

export const resendOtpAPI = async (data: ResendOtpRequest): Promise<ResendOtpResponse> => {
  const res = await apiClient.post('/users/resend-verification', data, { skipAuth: true });
  return res.data;
};

export const verifyOtpAPI = async (data: VerifyOtpRequest): Promise<VerifyOtpResponse> => {
  const res = await apiClient.post('/users/forgot-password/verify-otp', data, { skipAuth: true });
  return res.data;
};

export const resetPasswordAPI = async (data: ResetPasswordRequest): Promise<ResetPasswordResponse> => {
  const res = await apiClient.post('/users/forgot-password/reset', data, { skipAuth: true });
  return res.data;
};

export const logoutAPI = async (data: LogoutRequest): Promise<logoutResponse> => {
  const res = await apiClient.post('/users/logout', data, { skipAuth: false});
  return res.data;
}