import apiClient from '../../../services/apiClient';
import type { LoginCredentials, RegisterData } from '../authSlice';

interface AuthResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    user: {
      _id: string;
      name: string;
      email: string;
      isVerified: boolean;
      role: string;
      deviceId: string;
    };
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
  };
}

interface RegisterResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    userId: string;
  };
}

interface VerifyEmailRequest {
  userId: number;
  token: string;
}

interface VerifyEmailResponse {
  message: string;
  user?: {
    id: number;
    name: string;
    email: string;
  };
}

interface ResendOtpRequest {
  userId: number;
}

interface ResendOtpResponse {
  message: string;
}

// Add skipAuth: true to these calls since they don't need authentication
export const loginAPI = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const res = await apiClient.post('/users/login', credentials, { skipAuth: true });
  return res.data;
};

export const registerAPI = async (data: RegisterData): Promise<RegisterResponse & { email: string }> => {
  const res = await apiClient.post('/users/signup', data, { skipAuth: true });
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