import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../hooks/useAuth';
import { verifyOtpSchema, type VerifyOtpFormData } from '../schemas/authSchemas';
import SharedOtpVerification from '../components/SharedOtpVerification';

const VerifyOtpForgotPass: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email; // Get email from navigation state
  const { verifyOtp, loading, error, otpVerified, resetToken, clearAuthState } = useAuth();
  
  const [localError, setLocalError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  
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

  // Redirect if no email
  useEffect(() => {
    if (!email) {
      navigate('/forgot-password');
    }
  }, [email, navigate]);

  // Clear auth state on component mount
  useEffect(() => {
    clearAuthState();
  }, [clearAuthState]);

  // Navigate to reset password after successful OTP verification
  useEffect(() => {
    if (otpVerified && resetToken) {
      setSuccessMessage('OTP verified successfully! Redirecting...');
      setTimeout(() => {
        navigate('/forgot-password/reset-password', { 
          state: { email, resetToken } 
        });
      }, 2000);
    }
  }, [otpVerified, resetToken, navigate, email]);

  // Handle server errors
  useEffect(() => {
    if (error) {
      setLocalError(error);
    }
  }, [error]);

  const onSubmit = async (data: VerifyOtpFormData) => {
    try {
      setLocalError('');
      setSuccessMessage('');
      setIsVerifying(true);
      await verifyOtp(data);
    } catch {
      // Error is handled by useAuth hook and useEffect
    } finally {
      setIsVerifying(false);
    }
  };

  const handleVerifyOtp = async (otpString: string) => {
    if (otpString.length !== 6) {
      setLocalError('Please enter a complete 6-digit OTP');
      return;
    }

    const formData = {
      email: email || '',
      otp: otpString
    };

    // Update form value
    setValue('otp', otpString);

    await onSubmit(formData);
  };

  const handleBackToForgotPassword = () => {
    navigate('/forgot-password');
  };

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