import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import SharedOtpVerification from '../../components/SharedOtpVerification';

const VerifyEmail: React.FC = () => {
  // State variables for managing verification and OTP resend logic
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [countdown, setCountdown] = useState(60);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  // Getting auth context values
  const { 
    loading, 
    registrationData, 
    emailVerified, 
    verifyEmail, 
    resendOtp, 
    clearError,
    clearRegistrationData,
    error: authError 
  } = useAuth();

  // Extract email and userId from location state or fallback to auth context
  const email = location.state?.email || registrationData?.email;
  const userId = location.state?.userId || registrationData?.userId;

  // Start countdown timer for "Resend OTP" button
  useEffect(() => {
    if (!email || !userId) {
      navigate('/signup');
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setResendDisabled(false);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [email, userId, navigate]);

  // Show auth errors from context
  useEffect(() => {
    if (authError) {
      setError(authError);
      clearError();
    }
  }, [authError, clearError]);

  // Show success message and navigate to login page when email is verified
  useEffect(() => {
    if (emailVerified) {
      setSuccessMessage('Email verified successfully! Redirecting to login...');
      setTimeout(() => {
        navigate('/reg-success', { 
          state: { 
            message: 'Email verified successfully. Please login to continue.' 
          } 
        });
      }, 2000);
    }
  }, [emailVerified, navigate]);

  // Handles OTP verification logic
  const handleVerifyOtp = useCallback(async (otpString: string) => {
    if (!userId) {
      setError('User ID not found. Please try signing up again.');
      return;
    }

    setIsVerifying(true);
    setError('');
    setSuccessMessage('');

    try {
      await verifyEmail({ userId, token: otpString });
      // Successful verification handled by useEffect
    } catch (error: any) {
      setError(error || 'The OTP you entered is invalid or has expired');
    } finally {
      setIsVerifying(false);
    }
  }, [userId, verifyEmail]);

  // Handles resending OTP logic
  const handleResendOtp = useCallback(async () => {
    if (!email) {
      setError('User ID not found. Please try signing up again.');
      return;
    }

    setIsResending(true);
    setResendDisabled(true);
    setCountdown(60);
    setError('');
    setSuccessMessage('');

    try {
      await resendOtp({ email });

      setSuccessMessage('New verification code sent to your email');

      // Restart countdown for resend
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setResendDisabled(false);
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Auto clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);

    } catch (error: any) {
      setError(error || 'Failed to send OTP. Please try again later');
      setResendDisabled(false);
    } finally {
      setIsResending(false);
    }
  }, [email, resendOtp]);

  // Navigate to signup page to change email
  const handleChangeEmail = useCallback(() => {
    if (clearRegistrationData) {
      clearRegistrationData();
    }

    navigate('/signup', { 
      replace: true, 
      state: { from: 'change-email' } 
    });
  }, [clearRegistrationData, navigate]);

  // Render the OTP verification UI
  return (
    <SharedOtpVerification
      title="Verify Email Address,"
      subtitle="Kindly enter the 6digit verification code sent to"
      email={email || 'your email'}
      onVerifyOtp={handleVerifyOtp}
      onResendOtp={handleResendOtp}
      onChangeEmail={handleChangeEmail}
      isVerifying={isVerifying}
      isResending={isResending}
      error={error}
      successMessage={successMessage}
      showResend={true}
      showChangeEmail={true}
      disabled={loading}
      resendDisabled={resendDisabled}
      countdown={countdown}
    />
  );
};

export default VerifyEmail;
