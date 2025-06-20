import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginAPI, registerAPI, forgotPasswordAPI, verifyEmailAPI, resendOtpAPI, verifyOtpAPI, resetPasswordAPI, logoutAPI, refreshTokenAPI } from './services/authAPI';
import { setTokens, clearAllTokens, getToken, getRefreshToken } from './utils/tokenUtils';
import { AxiosError } from 'axios';
import type { AuthState, LoginCredentials, RegisterData, ResendOtpData, ResetPasswordData, VerifyEmailData, VerifyOtpData, RefreshTokenRequest } from './types';

const initialState: AuthState = {
  user: null,
  token: getToken(),
  loading: false,
  error: null,
  isAuthenticated: !!getToken(),
  forgotPasswordSuccess: false,
  registrationData: {
    userId: null,
    verificationToken: null,
    email: null,
  },
  emailVerified: false,
};    

export const handleThunkError = (error: unknown, errorMessage: string) => {
  let message = errorMessage;
  if (error instanceof AxiosError) {
    message = error.response?.data?.message || error.message || errorMessage;
  } else if (error instanceof Error) {
    message = error.message;
  }
  return message;
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, thunkAPI) => {
    try {
      const response = await loginAPI(credentials);
      // Store both access and refresh tokens
      setTokens(response.data.tokens.accessToken, response.data.tokens.refreshToken);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        handleThunkError(error, 'An error occurred during login')
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (data: RegisterData, thunkAPI) => {
    try {
      const response = await registerAPI(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        handleThunkError(error, 'An error occurred during registration')
      );
    }
  }
);

export const verifyEmail = createAsyncThunk(
  'auth/verifyEmail',
  async (data: VerifyEmailData, thunkAPI) => {
    try {
      const response = await verifyEmailAPI(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        handleThunkError(error, 'An error occurred during email verification')
      );
    }
  }
);

export const resendOtp = createAsyncThunk(
  'auth/resendOtp',
  async (data: ResendOtpData, thunkAPI) => {
    try {
      const response = await resendOtpAPI(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        handleThunkError(error, 'An error occurred while resending OTP')
      );
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email: string, thunkAPI) => {
    try {
      const response = await forgotPasswordAPI(email);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        handleThunkError(error, 'An error occurred during password reset request')
      );
    }
  }
);

export const verifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async (data: VerifyOtpData, thunkAPI) => {
    try {
      const response = await verifyOtpAPI(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        handleThunkError(error, 'An error occurred during OTP verification')
      );
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (data: ResetPasswordData, thunkAPI) => {
    try {
      const response = await resetPasswordAPI(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        handleThunkError(error, 'An error occurred during password reset')
      );
    }
  }
);

// Updated logout - no parameters needed
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      const response = await logoutAPI();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        handleThunkError(error, 'An error occurred during logout')
      );
    }
  }
);

// New refresh token thunk
export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, thunkAPI) => {
    try {
      const currentRefreshToken = getRefreshToken();
      if (!currentRefreshToken) {
        throw new Error('No refresh token available');
      }
      
      const response = await refreshTokenAPI({ refreshToken: currentRefreshToken });
      // Update tokens
      setTokens(response.data.accessToken, response.data.refreshToken);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        handleThunkError(error, 'An error occurred during token refresh')
      );
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.forgotPasswordSuccess = false;
      state.registrationData = {
        userId: null,
        verificationToken: null,
        email: null,
      };
      state.emailVerified = false;
      clearAllTokens();
    },
    clearAuthState(state) {
      state.error = null;
      state.forgotPasswordSuccess = false;
      state.emailVerified = false;
      state.otpVerified = false;
      state.resetToken = null;
      state.passwordResetSuccess = false;
    },
    
    clearRegistrationData(state) {
      state.registrationData = {
        userId: null,
        verificationToken: null,
        email: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = {
          id: action.payload.data.user._id,
          name: action.payload.data.user.name,
          email: action.payload.data.user.email,
        }; 
        state.token = action.payload.data.tokens.accessToken;
        state.loading = false;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.registrationData = {
          userId: action.payload.data.userId, 
          verificationToken: null,
          email: action.payload.email,
        };
      })      
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyEmail.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.emailVerified = true;
        state.registrationData = {
          userId: null,
          verificationToken: null,
          email: null,
        };
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.emailVerified = false;
      })
      .addCase(resendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resendOtp.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(resendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.forgotPasswordSuccess = false;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
        state.forgotPasswordSuccess = true;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.forgotPasswordSuccess = false;
      })
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.otpVerified = true;
        state.resetToken = action.payload.data.resetToken;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.otpVerified = false;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.passwordResetSuccess = true;
        state.otpVerified = false;
        state.resetToken = null;
        state.forgotPasswordSuccess = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.passwordResetSuccess = false;
      })
      // Logout cases
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.loading = false;
        state.isAuthenticated = false;
        state.forgotPasswordSuccess = false;
        state.registrationData = {
          userId: null,
          verificationToken: null,
          email: null,
        };
        state.emailVerified = false;
        clearAllTokens();
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        // Even if logout API fails, clear local tokens
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        clearAllTokens();
      })
      // Refresh token cases
      .addCase(refreshToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.token = action.payload.data.accessToken;
        state.loading = false;
        state.error = null;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        // If refresh fails, logout user
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        clearAllTokens();
      });
  },
});

export const { logout, clearAuthState, clearRegistrationData } = authSlice.actions;
export default authSlice.reducer;