import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../hooks/useAuth';
import { resetPasswordSchema, type ResetPasswordFormData } from '../schemas/authSchemas';
import styles from './css/ResetPassword.module.css'; 

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const resetToken = location.state?.resetToken;
  const { resetPassword, loading, error, passwordResetSuccess, clearAuthState } = useAuth();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: email || '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  // Redirect if missing required data
  useEffect(() => {
    if (!email || !resetToken) {
      navigate('/forgot-password');
    }
  }, [email, resetToken, navigate]);

  // Clear auth state on component mount
  useEffect(() => {
    clearAuthState();
  }, [clearAuthState]);

  // Redirect to login after successful password reset
  useEffect(() => {
    if (passwordResetSuccess) {
      const timer = setTimeout(() => {
        navigate('/login');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [passwordResetSuccess, navigate]);

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      await resetPassword({
        email: data.email,
        newPassword: data.newPassword,
        resetToken,
      });
      reset();
    } catch {
      // Error is handled by useAuth hook
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.resetCard}>
          <div className={styles.header}>
            <h2 className={styles.title}>Reset Password</h2>
            <p className={styles.subtitle}>
              Enter your new password below
            </p>
          </div>
          
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            {/* Hidden Email Field */}
            <input type="hidden" {...register('email')} />

            {/* New Password Field */}
            <div className={styles.field}>
              <label htmlFor="newPassword" className={styles.label}>
                New Password*
              </label>
              <input
                {...register('newPassword')}
                id="newPassword"
                type="password"
                className={`${styles.input} ${errors.newPassword ? styles.inputError : ''}`}
                placeholder="Enter new password"
              />
              {errors.newPassword && (
                <p className={styles.errorMessage}>{errors.newPassword.message}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className={styles.field}>
              <label htmlFor="confirmPassword" className={styles.label}>
                Confirm Password*
              </label>
              <input
                {...register('confirmPassword')}
                id="confirmPassword"
                type="password"
                className={`${styles.input} ${errors.confirmPassword ? styles.inputError : ''}`}
                placeholder="Confirm new password"
              />
              {errors.confirmPassword && (
                <p className={styles.errorMessage}>{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Server Error */}
            {error && (
              <div className={styles.serverError}>
                {error}
              </div>
            )}

            {/* Success Message */}
            {passwordResetSuccess && (
              <div className={styles.successMessage}>
                <div className={styles.successContent}>
                  <svg className={styles.successIcon} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Password reset successful!
                </div>
                <p className={styles.redirectMessage}>Redirecting to login page in 3 seconds...</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || isSubmitting || passwordResetSuccess}
              className={styles.submitButton}
            >
              {loading || isSubmitting ? 'Resetting...' : 'Reset Password'}
            </button>

            {/* Back Link */}
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

export default ResetPassword;