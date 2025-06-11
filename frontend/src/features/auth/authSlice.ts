import { createSlice, createAsyncThunk, type Action, isAction } from '@reduxjs/toolkit';
import { loginAPI, registerAPI, forgotPasswordAPI, verifyEmailAPI, resendOtpAPI } from './services/authAPI';
import { setToken, clearToken, getToken } from './utils/tokenUtils';

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
}

export interface VerifyEmailData {
  userId: number;
  token: string;
}

export interface ResendOtpData {
  email: string;
}

interface AuthState {
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
}

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

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, thunkAPI) => {
    try {
      const response = await loginAPI(credentials);
      setToken(response.data.tokens.accessToken); // Update this line
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'An error occurred during login';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (data: RegisterData, thunkAPI) => {
    try {
      const response = await registerAPI(data);
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'An error occurred during registration';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const verifyEmail = createAsyncThunk(
  'auth/verifyEmail',
  async (data: VerifyEmailData, thunkAPI) => {
    try {
      const response = await verifyEmailAPI(data);
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'An error occurred during email verification';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const resendOtp = createAsyncThunk(
  'auth/resendOtp',
  async (data: ResendOtpData, thunkAPI) => {
    try {
      const response = await resendOtpAPI(data);
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'An error occurred while resending OTP';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email: string, thunkAPI) => {
    try {
      const response = await forgotPasswordAPI(email);
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'An error occurred during password reset request';
      return thunkAPI.rejectWithValue(message);
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
      clearToken();
    },
    clearAuthState(state) {
      state.error = null;
      state.forgotPasswordSuccess = false;
      state.emailVerified = false;
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
        state.user = action.payload.data.user; // Changed from action.payload.user
        state.token = action.payload.data.tokens.accessToken; // Changed from action.payload.token
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
        // Update to match your API response structure
        state.registrationData = {
          userId: action.payload.data.userId, // Changed from action.payload.userId
          verificationToken: null, // Your API doesn't return this
          email: action.payload.email, // This should come from the original request
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
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.emailVerified = true;
        // Clear registration data after successful verification
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
      });
      
  },
});

export const { logout, clearAuthState, clearRegistrationData } = authSlice.actions;
export default authSlice.reducer;