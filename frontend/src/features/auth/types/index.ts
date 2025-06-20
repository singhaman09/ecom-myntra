export interface User {
  id: string;
  name: string;
  email: string;
}

export interface LoginCredentials {
  email: string;
  password: string ;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  phoneNumber: string;
}

export interface VerifyEmailData {
  userId: number;
  token: string;
}

export interface ResendOtpData {
  email: string;
  // userId: number;
}

export interface VerifyOtpData {
  email: string;
  otp: string;
}

export interface ResetPasswordData {
  email: string;
  newPassword: string;
  resetToken: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  forgotPasswordSuccess: boolean;
  registrationData: {
    userId: number | null;
    verificationToken: string | null;
    email: string | null;
  };
  emailVerified: boolean;
  otpVerified: boolean;
  resetToken: string | null;
  passwordResetSuccess: boolean;
}

// authApi interfaces

export interface AuthResponse {
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

export interface RegisterResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    userId: string;
  };
}

export interface VerifyEmailRequest {
  userId: number;
  token: string;
}

export interface VerifyEmailResponse {
  message: string;
  user?: {
    id: number;
    name: string;
    email: string;
  };
}

export interface ResendOtpRequest {
  userId: number;
}

export interface ResendOtpResponse {
  message: string;
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
}

export interface VerifyOtpResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    resetToken: string;
  };
}

export interface ResetPasswordRequest {
  email: string;
  newPassword: string;
  resetToken: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  statusCode: number;
  message: string;
}

// Updated logout interfaces - no request body needed
export interface LogoutResponse {
  success: boolean;
  statusCode: number;
  message: string;
}

// New refresh token interfaces
export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
}