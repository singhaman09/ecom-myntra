// SharedOtpVerification.tsx
import React, { useState, useEffect } from 'react';
import styles from './SharedOtpVerification.module.css';

interface SharedOtpVerificationProps {
  title: string;
  subtitle: string;
  email: string;
  onVerifyOtp: (otp: string) => Promise<void>;
  onResendOtp?: () => Promise<void>;
  onChangeEmail?: () => void;
  onBack?: () => void;
  isVerifying: boolean;
  isResending?: boolean;
  error: string;
  successMessage: string;
  showResend?: boolean;
  showChangeEmail?: boolean;
  showBackButton?: boolean;
  disabled?: boolean;
  resendDisabled?: boolean;
  countdown?: number;
}

const SharedOtpVerification: React.FC<SharedOtpVerificationProps> = ({
  title,
  subtitle,
  email,
  onVerifyOtp,
  onResendOtp,
  onChangeEmail,
  onBack,
  isVerifying,
  isResending = false,
  error,
  successMessage,
  showResend = false,
  showChangeEmail = false,
  showBackButton = false,
  disabled = false,
  resendDisabled = false,
  countdown = 0,
}) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handleOtpChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return;
    
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
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
      
      // Clear the previous input for forgot password flow
      if (showBackButton) {
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
      }
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

  const handleVerifyClick = async () => {
    const otpString = otp.join('');
    
    if (otpString.length !== 6) {
      return;
    }

    await onVerifyOtp(otpString);
  };

  // Clear OTP when there's a success message (for resend)
  useEffect(() => {
    if (successMessage && successMessage.includes('sent')) {
      setOtp(['', '', '', '', '', '']);
    }
  }, [successMessage]);

  const isOtpComplete = otp.join('').length === 6;
  const isButtonDisabled = !isOtpComplete || isVerifying || disabled;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.logo}>THE BODY SHOP</h1>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>
            {subtitle}
            <br />
            <span className={styles.emailId}>
              {email} <span className={styles.editLink}>Edit</span>
            </span>
          </p>
        </div>

        {/* OTP Input */}
        <div className={styles.otpContainer}>
          <div className={styles.otpInputs} onPaste={handlePaste}>
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
                disabled={isVerifying || disabled}
                className={styles.otpInput}
              />
            ))}
          </div>
        </div>

        {/* Timer */}
        {showResend && resendDisabled && countdown > 0 && (
          <div className={styles.timer}>
            <span className={styles.timerIcon}>⏱</span> {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, '0')}
          </div>
        )}

        {/* Resend Button */}
        {showResend && (
          <div className={styles.resendContainer}>
            {resendDisabled ? (
              <span className={styles.resendDisabled}>RESEND OTP</span>
            ) : (
              <button
                onClick={onResendOtp}
                disabled={isResending}
                className={styles.resendButton}
              >
                {isResending ? "SENDING..." : "RESEND OTP"}
              </button>
            )}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className={styles.errorMessage}>
            {error}
          </div>
        )}

        {/* Success Message */}
        {successMessage && (
          <div className={styles.successMessage}>
            {successMessage}
          </div>
        )}

        {/* Verify Button */}
        <button
          onClick={handleVerifyClick}
          disabled={isButtonDisabled}
          className={`${styles.verifyButton} ${isOtpComplete ? styles.verifyButtonActive : ''}`}
        >
          {isVerifying ? "Verifying..." : "Verify"}
        </button>

        {/* Change Email Button */}
        {showChangeEmail && (
          <button
            onClick={onChangeEmail}
            className={styles.changeEmailButton}
            disabled={isVerifying || disabled}
          >
            Change email address
          </button>
        )}

        {/* Back Button */}
        {showBackButton && (
          <button
            onClick={onBack}
            className={styles.backButton}
            disabled={isVerifying || disabled}
          >
            Back to forgot password
          </button>
        )}
      </div>
    </div>
  );
};

export default SharedOtpVerification;