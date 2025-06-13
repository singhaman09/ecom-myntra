import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../hooks/useAuth';
import { forgotPasswordSchema, type ForgotPasswordFormData } from '../schemas/authSchemas';
import styles from './css/ForgotPassword.module.css';

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const { forgotPassword, loading, error, forgotPasswordSuccess, clearAuthState } = useAuth();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  // Clear auth state on component mount
  useEffect(() => {
    // clearAuthState();
  }, [clearAuthState]);

  // Redirect to login after successful password reset request
  useEffect(() => {
    if (forgotPasswordSuccess) {
      const email = getValues('email');
      if (email) {
        const timer = setTimeout(() => {
          navigate('/forgot-password/verify-otp', { state: { email } });
        }, 2000);
        return () => clearTimeout(timer);
      }
    }
  }, [forgotPasswordSuccess, navigate, getValues]);

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      await forgotPassword(data.email);
      reset();
    } catch {
      // Error is handled by useAuth hook
    }
  };

  return (
    <div className={styles.container}>
      {/* Main Content */}
      <div className={styles.mainContent}>
        <div className={styles.forgotCard}>
          <div className={styles.header}>
            <h2 className={styles.title}>Forgot your password?</h2>
            <p className={styles.subtitle}>
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>
          
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            {/* Email Field */}
            <div className={styles.field}>
              <label htmlFor="email" className={styles.label}>
                Email address*
              </label>
              <input
                {...register('email')}
                id="email"
                type="email"
                autoComplete="email"
                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                placeholder="Enter your email address"
              />
              {errors.email && (
                <p className={styles.errorMessage}>{errors.email.message}</p>
              )}
            </div>

            {/* Server Error */}
            {error && (
              <div className={styles.serverError}>
                {error}
              </div>
            )}

            {/* Success Message */}
            {forgotPasswordSuccess && (
              <div className={styles.successMessage}>
                <div className={styles.successContent}>
                  <svg className={styles.successIcon} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Password reset instructions have been sent to your email.
                </div>
                <p className={styles.redirectMessage}>Redirecting to OTP verification in 2 seconds...</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || isSubmitting || forgotPasswordSuccess}
              className={styles.submitButton}
            >
              {loading || isSubmitting ? 'Sending...' : 'Send OTP'}
            </button>

            {/* Back to Login Link */}
            <div className={styles.linkContainer}>
              <button
                type="button"
                onClick={() => navigate('/login')}
                className={styles.link}
              >
                Back to sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
