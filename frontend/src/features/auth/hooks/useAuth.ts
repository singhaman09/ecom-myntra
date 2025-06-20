import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../../store/store';
import { 
  loginUser, 
  registerUser, 
  logout, 
  forgotPassword, 
  verifyEmail, 
  resendOtp,
  verifyOtp,
  resetPassword,
  clearAuthState,
  clearRegistrationData,
  logoutUser
} from '../authSlice';
import type { 
  LoginCredentials, 
  RegisterData, 
  VerifyEmailData, 
  ResendOtpData,
  VerifyOtpData,
  ResetPasswordData
} from '../types/index';
import { useCallback } from 'react';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      const result = await dispatch(loginUser(credentials)).unwrap();
      return result;
    },
    [dispatch]
  );

  const register = useCallback(
    async (data: RegisterData) => {
      const result = await dispatch(registerUser(data)).unwrap();
      return result;
    },
    [dispatch]
  );

  const verifyUserEmail = useCallback(
    async (data: VerifyEmailData) => {
      const result = await dispatch(verifyEmail(data)).unwrap();
      return result;
    },
    [dispatch]
  );

  const resendVerificationOtp = useCallback(
    async (data: ResendOtpData) => {
      const result = await dispatch(resendOtp(data)).unwrap();
      return result;
    },
    [dispatch]
  );

  const forgotPasswordRequest = useCallback(
    async (email: string) => {
      const result = await dispatch(forgotPassword(email)).unwrap();
      return result;
    },
    [dispatch]
  );
  const logoutRequest = useCallback(
    async ( ) => {
      const result = await dispatch(logoutUser()).unwrap();
      return result;
    },
    [dispatch]
  );

  const verifyOtpRequest = useCallback(
    async (data: VerifyOtpData) => {
      const result = await dispatch(verifyOtp(data)).unwrap();
      return result;
    },
    [dispatch]
  );
  
  const resetPasswordRequest = useCallback(
    async (data: ResetPasswordData) => {
      const result = await dispatch(resetPassword(data)).unwrap();
      return result;
    },
    [dispatch]
  );

  const signOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const clearError = useCallback(() => {
    dispatch(clearAuthState());
  }, [dispatch]);

  const clearRegData = useCallback(() => {
    dispatch(clearRegistrationData());
  }, [dispatch]);

  return {
    ...auth,
    login,
    register,
    verifyEmail: verifyUserEmail,
    resendOtp: resendVerificationOtp,
    forgotPassword: forgotPasswordRequest,
    verifyOtp: verifyOtpRequest,
    resetPassword: resetPasswordRequest,
    signOut,
    logoutRequest,
    clearError,
    clearAuthState: clearError,
    clearRegistrationData: clearRegData,
  };
};