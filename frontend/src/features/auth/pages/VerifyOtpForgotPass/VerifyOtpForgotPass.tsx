import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../../hooks/useAuth';
import { verifyOtpSchema, type VerifyOtpFormData } from '../../schemas/authSchemas';
import SharedOtpVerification from '../../components/SharedOtpVerification';

const VerifyOtpForgotPass: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get email from navigation state
  const email = location.state?.email;

  // Auth context values
  const { verifyOtp, loading, error, otpVerified, resetToken, clearAuthState } = useAuth();

  // Local state for UI feedback
  const [localError, setLocalError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  // React Hook Form setup with validation
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<VerifyOtpFormData>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      email: email || '',
      otp: '',
    },
  });

  // Redirect if no email is found in state
  useEffect(() => {
    if (!email) {
      navigate('/forgot-password');
    }
  }, [email, navigate]);

  // Clear any previous auth state on mount
  useEffect(() => {
    clearAuthState();
  }, [clearAuthState]);

  // Handle navigation after successful OTP verification
  useEffect(() => {
    if (otpVerified && resetToken) {
      setSuccessMessage('OTP verified successfully! Redirecting...');
      setTimeout(() => {
        navigate('/forgot-password/reset-password', {
          state: { email, resetToken },
        });
      }, 2000);
    }
  }, [otpVerified, resetToken, navigate, email]);

  // Set server error (from auth context) into local error state
  useEffect(() => {
    if (error) {
      setLocalError(error);
    }
  }, [error]);

  // Handle form submission
  const onSubmit = useCallback(async (data: VerifyOtpFormData) => {
    try {
      setLocalError('');
      setSuccessMessage('');
      setIsVerifying(true);
      await verifyOtp(data);
    } catch {
      // Error handled by useAuth and shown via localError
    } finally {
      setIsVerifying(false);
    }
  }, [verifyOtp]);

  // Called when OTP is submitted from SharedOtpVerification component
  const handleVerifyOtp = useCallback(async (otpString: string) => {
    if (otpString.length !== 6) {
      setLocalError('Please enter a complete 6-digit OTP');
      return;
    }

    const formData = {
      email: email || '',
      otp: otpString
    };

    // Sync OTP value with form state (good for RHF validation/debug)
    setValue('otp', otpString);

    await onSubmit(formData);
  }, [email, setValue, onSubmit]);

  // Navigate back to forgot password page
  const handleBackToForgotPassword = useCallback(() => {
    navigate('/forgot-password');
  }, [navigate]);

  return (
    <SharedOtpVerification
      title="OTP Verification"
      subtitle="Kindly enter the 4digit verification code sent to"
      email={email || ''}
      onVerifyOtp={handleVerifyOtp}
      onBack={handleBackToForgotPassword}
      isVerifying={isVerifying || loading || isSubmitting}
      error={localError || errors.otp?.message || ''}
      successMessage={successMessage}
      showResend={false}
      showChangeEmail={false}
      showBackButton={true}
      disabled={loading || isSubmitting}
    />
  );
};

export default VerifyOtpForgotPass;
