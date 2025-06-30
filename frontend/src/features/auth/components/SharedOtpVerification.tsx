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

  // Handle change in OTP input
  const handleOtpChange = (index: number, value: string) => {
    if (value && !/^\d$/.test(value)) return;
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Focus next input if value is entered
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const EVENT_KEY = {
    BACKSPACE: 'Backspace'
  }

  // Handle backspace key behavior
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === EVENT_KEY.BACKSPACE && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();

      if (showBackButton) {
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
      }
    }
  };

  // Handle pasting of entire OTP
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');

    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split('');
      setOtp(newOtp);
      setTimeout(() => {
        const lastInput = document.getElementById('otp-5');
        lastInput?.focus();
      }, 0);
    }
  };

  // Handle verification button click
  const handleVerifyClick = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) return;
    await onVerifyOtp(otpString);
  };

  // Reset OTP input when OTP is resent
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
        {/* Header Section */}
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

        {/* OTP Input Section */}
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

        {/* Resend Timer */}
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
        {error && <div className={styles.errorMessage}>{error}</div>}

        {/* Success Message */}
        {successMessage && <div className={styles.successMessage}>{successMessage}</div>}

        {/* Verify Button */}
        <button
          onClick={handleVerifyClick}
          disabled={isButtonDisabled}
          className={`${styles.verifyButton} ${isOtpComplete ? styles.verifyButtonActive : ''}`}
        >
          {isVerifying ? "Verifying..." : "Verify"}
        </button>

        {/* Change Email Link */}
        {showChangeEmail && (
          <button
            onClick={onChangeEmail}
            className={styles.changeEmailButton}
            disabled={isVerifying || disabled}
          >
            Change email address
          </button>
        )}

        {/* Back to Forgot Password */}
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
