import React, { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../hooks/useAuth";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "../../schemas/authSchemas";
import styles from "./ForgotPassword.module.css";

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();

  // Destructure auth context
  const {
    forgotPassword,
    loading,
    error,
    forgotPasswordSuccess,
    clearAuthState,
  } = useAuth();

  // Setup form with validation
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  // Clear previous state (like error/success) on mount
  useEffect(() => {
    clearAuthState();
  }, [clearAuthState]);

  // Navigate to OTP screen on successful request
  useEffect(() => {
    if (forgotPasswordSuccess) {
      const email = getValues("email");
      if (email) {
        const timer = setTimeout(() => {
          navigate("/forgot-password/verify-otp", { state: { email } });
        }, 2000);
        return () => clearTimeout(timer);
      }
    }
  }, [forgotPasswordSuccess, getValues, navigate]);

  // Handle form submit with useCallback for memoization
  const onSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {
      try {
        await forgotPassword(data.email);
        reset(); // Clear input
      } catch {
        // Errors handled via context
      }
    },
    [forgotPassword, reset]
  );

  // Handle back to login button
  const handleBackToLogin = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  return (
    <div className={styles.container}>
      {/* Wrapper */}
      <div className={styles.mainContent}>
        <div className={styles.forgotCard}>
          {/* Header Branding */}
          <div className={styles.header}>
            <h1 className={styles.brand}>THE Wyntra SHOP</h1>
            <h2 className={styles.title}>Forgot your password?</h2>
            <p className={styles.subtitle}>
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>

          {/* Email Form */}
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            {/* Email Field */}
            <div className={styles.field}>
              <label htmlFor="email" className={styles.label}>
                Email address*
              </label>
              <input
                {...register("email")}
                id="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email address"
                className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
              />
              {errors.email && (
                <p className={styles.errorMessage}>{errors.email.message}</p>
              )}
            </div>

            {/* Error from API */}
            {error && <div className={styles.serverError}>{error}</div>}

            {/* Success message */}
            {forgotPasswordSuccess && (
              <div className={styles.successMessage}>
                <div className={styles.successContent}>
                  <svg
                    className={styles.successIcon}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Password reset instructions have been sent to your email.
                </div>
                <p className={styles.redirectMessage}>
                  Redirecting to OTP verification in 2 seconds...
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || isSubmitting || forgotPasswordSuccess}
              className={styles.submitButton}
            >
              {loading || isSubmitting ? "Sending..." : "Send OTP"}
            </button>

            {/* Back to Login */}
            <div className={styles.linkContainer}>
              <button
                type="button"
                onClick={handleBackToLogin}
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
