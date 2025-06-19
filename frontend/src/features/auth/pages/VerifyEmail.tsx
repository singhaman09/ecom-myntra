import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import SharedOtpVerification from '../components/SharedOtpVerification';

const VerifyEmail: React.FC = () => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [countdown, setCountdown] = useState(60);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();
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

  // Get data from navigation state or from Redux store
  const email = location.state?.email || registrationData?.email;
  const userId = location.state?.userId || registrationData?.userId;

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

  useEffect(() => {
    // Handle auth errors
    if (authError) {
      setError(authError);
      clearError();
    }
  }, [authError, clearError]);

  useEffect(() => {
    // Handle successful email verification
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

  const handleVerifyOtp = async (otpString: string) => {
    if (!userId) {
      setError('User ID not found. Please try signing up again.');
      return;
    }

    setIsVerifying(true);
    setError('');
    setSuccessMessage('');
    
    try {
      await verifyEmail({
        userId: userId,
        token: otpString
      });
      
      // Success is handled by useEffect hook
    } catch (error: any) {
      setError(error || 'The OTP you entered is invalid or has expired');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOtp = async () => {
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
      await resendOtp({ email: email });
      
      setSuccessMessage('New verification code sent to your email');
      
      // Start countdown again
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
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
      
    } catch (error: any) {
      setError(error || 'Failed to send OTP. Please try again later');
      setResendDisabled(false);
    } finally {
      setIsResending(false);
    }
  };

  const handleChangeEmail = () => {
    // Clear registration data to prevent automatic redirect back to verify-email
    if (clearRegistrationData) {
      clearRegistrationData();
    }
    
    // Navigate to signup page
    navigate('/signup', { 
      replace: true, 
      state: { from: 'change-email' } 
    });
  };

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