import apiClient from '../../../services/apiClient';

// Extend AxiosRequestConfig to include skipAuth
declare module 'axios' {
  export interface AxiosRequestConfig {
    skipAuth?: boolean;
  }
}

import type { LoginCredentials, RegisterData } from '../authSlice';
import { API_ENDPOINTS } from '../constants/authConstants';
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
  RefreshTokenRequest,
  RefreshTokenResponse,
  LogoutResponse
} from '../types';

// Add skipAuth: true to these calls since they don't need authentication
export const loginAPI = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const res = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials, { skipAuth: true });
  return res.data;
};

export const registerAPI = async (data: RegisterData): Promise<RegisterResponse & { email: string }> => {
  const res = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, data, { skipAuth: true });
  return { ...res.data, email: data.email };
};

export const forgotPasswordAPI = async (email: string): Promise<{ message: string }> => {
  const res = await apiClient.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email }, { skipAuth: true });
  return res.data;
};

export const verifyEmailAPI = async (data: VerifyEmailRequest): Promise<VerifyEmailResponse> => {
  const res = await apiClient.post(API_ENDPOINTS.AUTH.VERIFY_EMAIL, data, { skipAuth: true });
  return res.data;
};

export const resendOtpAPI = async (data: ResendOtpRequest): Promise<ResendOtpResponse> => {
  const res = await apiClient.post(API_ENDPOINTS.AUTH.RESEND_VERIFICATION, data, { skipAuth: true });
  return res.data;
};

export const verifyOtpAPI = async (data: VerifyOtpRequest): Promise<VerifyOtpResponse> => {
  const res = await apiClient.post(API_ENDPOINTS.AUTH.VERIFY_OTP, data, { skipAuth: true });
  return res.data;
};

export const resetPasswordAPI = async (data: ResetPasswordRequest): Promise<ResetPasswordResponse> => {
  const res = await apiClient.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, data, { skipAuth: true });
  return res.data;
};

export const logoutAPI = async (): Promise<LogoutResponse> => {
  const res = await apiClient.delete(API_ENDPOINTS.AUTH.LOGOUT, { skipAuth: false });
  return res.data;
};

// New refresh token API
export const refreshTokenAPI = async (data: RefreshTokenRequest): Promise<RefreshTokenResponse> => {
  const res = await apiClient.post(API_ENDPOINTS.AUTH.REFRESH_TOKEN, data, { skipAuth: true });
  return res.data;
};