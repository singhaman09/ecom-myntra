import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../hooks/useAuth';
import { verifyOtpSchema, type VerifyOtpFormData } from '../schemas/authSchemas';
import styles from './css/VerifyOtpForgotPass.module.css';

const VerifyOtpForgotPass: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email; // Get email from navigation state
  const { verifyOtp, loading, error, otpVerified, resetToken, clearAuthState } = useAuth();
  
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [localError, setLocalError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    // reset,
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

  const handleOtpChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return;
    
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Update form value
    const otpString = newOtp.join('');
    setValue('otp', otpString);
    
    // Clear any existing errors
    setLocalError('');
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
      
      // Clear the previous input
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
      setValue('otp', newOtp.join(''));
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    
    // Check if pasted data is 6 digits
    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split('');
      setOtp(newOtp);
      setValue('otp', pastedData);
      setLocalError('');
      setSuccessMessage('');
      
      // Focus the last input
      setTimeout(() => {
        const lastInput = document.getElementById('otp-5');
        lastInput?.focus();
      }, 0);
    }
  };

  const onSubmit = async (data: VerifyOtpFormData) => {
    try {
      setLocalError('');
      setSuccessMessage('');
      await verifyOtp(data);
    } catch {
      // Error is handled by useAuth hook and useEffect
    }
  };

  const handleVerifyOtp = async () => {
    const otpString = otp.join('');
    
    if (otpString.length !== 6) {
      setLocalError('Please enter a complete 6-digit OTP');
      return;
    }

    const formData = {
      email: email || '',
      otp: otpString
    };

    await onSubmit(formData);
  };

  const handleBackToForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <div className={styles.verifyOtpContainer}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Verify OTP</h1>
          <p className={styles.subtitle}>
            We've sent a 6-digit verification code to
            <br />
            <span className={styles.emailHighlight}>{email}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Hidden Email Field */}
          <input type="hidden" {...register('email')} />
          
          {/* Hidden OTP Field for form validation */}
          <input type="hidden" {...register('otp')} />

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
                  disabled={loading || isSubmitting}
                  className={styles.otpDigit}
                />
              ))}
            </div>
          </div>

          {/* Display errors */}
          {(localError || errors.otp) && (
            <div className={styles.errorMessage}>
              {localError || errors.otp?.message}
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className={styles.successMessage}>
              {successMessage}
            </div>
          )}

          <button
            type="button"
            onClick={handleVerifyOtp}
            disabled={otp.join('').length !== 6 || loading || isSubmitting}
            className={styles.verifyButton}
          >
            {loading || isSubmitting ? "Verifying..." : "Verify OTP"}
          </button>

          <button
            type="button"
            onClick={handleBackToForgotPassword}
            className={styles.backButton}
            disabled={loading || isSubmitting}
          >
            Back to forgot password
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtpForgotPass;