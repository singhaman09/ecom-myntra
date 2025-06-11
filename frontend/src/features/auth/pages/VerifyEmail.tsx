import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import styles from './css/VerifyEmail.module.css';

const VerifyEmail: React.FC = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
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
    error: authError 
  } = useAuth();

  // Get data from navigation state or from Redux store
  const email = location.state?.email || registrationData?.email;
  const userId = location.state?.userId || registrationData?.userId;
//   const verificationToken = location.state?.verificationToken || registrationData.verificationToken;

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
        navigate('/login', { 
          state: { 
            message: 'Email verified successfully. Please login to continue.' 
          } 
        });
      }, 2000);
    }
  }, [emailVerified, navigate]);

  const handleOtpChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return;
    
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Clear any existing errors
    setError('');
    setSuccessMessage('');
    
    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const otpString = otp.join('');
    
    if (otpString.length !== 6) {
      setError('Please enter a complete 6-digit OTP');
      return;
    }

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
      console.error('Email verification failed:', error);
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
      
      // Clear OTP fields
      setOtp(['', '', '', '', '', '']);
      
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
      console.error('Resend OTP failed:', error);
      setError(error || 'Failed to send OTP. Please try again later');
      setResendDisabled(false);
    } finally {
      setIsResending(false);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    
    // Check if pasted data is 6 digits
    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split('');
      setOtp(newOtp);
      // Focus the last input
      setTimeout(() => {
        const lastInput = document.getElementById('otp-5');
        lastInput?.focus();
      }, 0);
    }
  };

  return (
    <div className={styles.verifyEmailContainer}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Verify your email</h1>
          <p className={styles.subtitle}>
            We've sent a 6-digit verification code to
            <br />
            <span className={styles.emailHighlight}>{email || 'your email'}</span>
          </p>
        </div>

        <div className={styles.otpContainer}>
          <div className={styles.otpInput} onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                maxLength={1}
                disabled={isVerifying || loading}
                style={{
                  width: '45px',
                  height: '45px',
                  textAlign: 'center',
                  border: '1px solid #d4d5d9',
                  borderRadius: '4px',
                  fontSize: '18px',
                  fontWeight: '600',
                  opacity: (isVerifying || loading) ? 0.6 : 1,
                  cursor: (isVerifying || loading) ? 'not-allowed' : 'text'
                }}
              />
            ))}
          </div>
        </div>

        {error && (
          <div style={{ 
            color: '#ff3f6c', 
            fontSize: '14px', 
            textAlign: 'center', 
            marginBottom: '1rem',
            padding: '8px',
            backgroundColor: '#fff5f5',
            border: '1px solid #ffebee',
            borderRadius: '4px'
          }}>
            {error}
          </div>
        )}

        {successMessage && (
          <div style={{ 
            color: '#4caf50', 
            fontSize: '14px', 
            textAlign: 'center', 
            marginBottom: '1rem',
            padding: '8px',
            backgroundColor: '#f1f8e9',
            border: '1px solid #c8e6c9',
            borderRadius: '4px'
          }}>
            {successMessage}
          </div>
        )}

        <button
          onClick={handleVerifyOtp}
          disabled={otp.join('').length !== 6 || isVerifying || loading}
          className={styles.verifyButton}
          style={{
            opacity: (otp.join('').length !== 6 || isVerifying || loading) ? 0.6 : 1,
            cursor: (otp.join('').length !== 6 || isVerifying || loading) ? 'not-allowed' : 'pointer'
          }}
        >
          {isVerifying ? "Verifying..." : "Verify Email"}
        </button>

        <div className={styles.resendContainer}>
          <p>
            Didn't receive the code?{" "}
            {resendDisabled ? (
              <span style={{ color: '#999' }}>
                Resend in {countdown}s
              </span>
            ) : (
              <button
                onClick={handleResendOtp}
                disabled={isResending}
                className={styles.resendButton}
                style={{
                  opacity: isResending ? 0.6 : 1,
                  cursor: isResending ? 'not-allowed' : 'pointer'
                }}
              >
                {isResending ? "Sending..." : "Resend code"}
              </button>
            )}
          </p>
        </div>

        <button
          onClick={() => navigate('/signup')}
          className={styles.changeEmailButton}
          disabled={isVerifying || loading}
          style={{
            opacity: (isVerifying || loading) ? 0.6 : 1,
            cursor: (isVerifying || loading) ? 'not-allowed' : 'pointer'
          }}
        >
          Change email address
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;