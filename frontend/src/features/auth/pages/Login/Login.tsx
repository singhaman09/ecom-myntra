import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../hooks/useAuth";
import { loginSchema, type LoginFormData } from "../../schemas/authSchemas";
import styles from "./Login.module.css";
import ArrowIcon from "../../../../assets/icons/right-arrow.svg";

const Login: React.FC = () => {
  const navigate = useNavigate();

  // Access authentication logic
  const { login, loading, error, clearAuthState } = useAuth();

  // Track whether user has agreed to terms
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // React Hook Form setup with zod validation
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Clear error/success state on component mount
  useEffect(() => {
    clearAuthState();
  }, [clearAuthState]);

  // Handle form submission with useCallback to avoid re-creating on re-renders
  const onSubmit = useCallback(
    async (data: LoginFormData) => {
      if (!agreedToTerms) return;

      try {
        await login(data); // Call login API
        navigate("/");     // Redirect to homepage on success
        reset();           // Clear form
      } catch {
        // Error handled inside useAuth context
      }
    },
    [login, navigate, reset, agreedToTerms]
  );

  // Navigate to signup
  const handleSignup = useCallback(() => {
    navigate("/signup");
  }, [navigate]);

  // Navigate to forgot password
  const handleForgotPassword = useCallback(() => {
    navigate("/forgot-password");
  }, [navigate]);

  // Skip login and go to home
  const handleSkip = useCallback(() => {
    navigate("/");
  }, [navigate]);

  // Toggle terms checkbox
  const handleTermsChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setAgreedToTerms(e.target.checked);
  }, []);

  return (
    <div className={styles.container}>
      {/* Main Login Box */}
      <div className={styles.mainContent}>
        <div className={styles.loginCard}>
          {/* Header Section */}
          <div className={styles.header}>
            <div className={styles.loginHeader}>
              <h1 className={styles.brand}>THE Wyntra SHOP</h1>
              <p className={styles.instruction}>
                Sign In Using Your
                <br />
                <strong>Email and Password</strong>
              </p>
            </div>
          </div>

          {/* Login Form */}
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            {/* Email Field */}
            <div className={styles.field}>
              <label htmlFor="email" className={styles.label}>
                Email Address*
              </label>
              <input
                {...register("email")}
                id="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
              />
              {errors.email && (
                <p className={styles.errorMessage}>{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className={styles.field}>
              <label htmlFor="password" className={styles.label}>
                Password*
              </label>
              <input
                {...register("password")}
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
              />
              {errors.password && (
                <p className={styles.errorMessage}>{errors.password.message}</p>
              )}
            </div>

            {/* Terms Agreement */}
            <div className={styles.termsContainer}>
              <input
                type="checkbox"
                id="terms"
                className={styles.checkbox}
                checked={agreedToTerms}
                onChange={handleTermsChange}
              />
              <label htmlFor="terms" className={styles.termsText}>
                I agree to the{" "}
                <a href="#" className={styles.termsLink}>
                  Terms of Use
                </a>
              </label>
            </div>

            {/* Server Error */}
            {error && <div className={styles.serverError}>{error}</div>}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || isSubmitting || !agreedToTerms}
              className={styles.submitButton}
            >
              {loading || isSubmitting ? "Signing in..." : "Continue"}
            </button>

            {/* Divider */}
            <div className={styles.divider}>
              <span className={styles.dividerLine}></span>
              <span className={styles.dividerText}>OR</span>
              <span className={styles.dividerLine}></span>
            </div>

            {/* Google Login Placeholder */}
            <div className={styles.oauthContainer}>
              <button type="button" className={styles.oauthButton}>
                <img
                  src="https://developers.google.com/identity/images/g-logo.png"
                  alt="Google logo"
                />
                Continue with Google
              </button>
            </div>

            {/* Forgot Password Link */}
            <div className={styles.troubleText}>
              Have trouble logging in?{" "}
              <button
                type="button"
                onClick={handleForgotPassword}
                className={styles.troubleLink}
              >
                Forgot Password
              </button>
            </div>
          </form>

          {/* Sign Up Link */}
          <div className={styles.linksContainer}>
            <button
              type="button"
              onClick={handleSignup}
              className={styles.link}
            >
              Create new account
            </button>
          </div>

          {/* Skip Login Button */}
          <div className={styles.skip}>
            <button
              type="button"
              onClick={handleSkip}
              className={styles.skipButton}
            >
              SKIP FOR NOW
              <img src={ArrowIcon} alt="arrow" className={styles.arrowIcon} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
