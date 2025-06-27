import React, { useEffect, useRef, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../hooks/useAuth";
import {
  registerSchema,
  type RegisterFormData,
} from "../../schemas/authSchemas";
import styles from "./Signup.module.css";
import ArrowIcon from "../../../../assets/icons/right-arrow.svg";
import { LOCATION_STATE_CHANGE_EMAIL } from "../../types/auth.enum";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Flag to track whether user came from "change email" flow
  const isFromChangeEmail = useRef(location.state?.from === LOCATION_STATE_CHANGE_EMAIL.STATUS);

  const {
    register: registerUser,
    loading,
    error,
    registrationData,
  } = useAuth();

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
    },
  });

  // Watch password for validation
  const password = watch("password");

  // Redirect to OTP verification if user registered successfully (and not from change-email)
  useEffect(() => {
    if (isFromChangeEmail.current) return;

    if (registrationData?.userId && registrationData?.email) {
      navigate("/verify-email", {
        state: {
          email: registrationData.email,
          userId: registrationData.userId,
        },
      });
    }
  }, [registrationData, navigate]);

  // Reset change-email flag if page is reloaded from change-email
  useEffect(() => {
    if (location.state?.from === LOCATION_STATE_CHANGE_EMAIL.STATUS) {
      isFromChangeEmail.current = true;
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // Handle form submit
  const onSubmit = useCallback(
    async (data: RegisterFormData) => {
      try {
        isFromChangeEmail.current = false; // Reset the change-email flag
        await registerUser(data); // Trigger register
        reset(); // Clear form
      } catch {
        // Error handled in useAuth
      }
    },
    [registerUser, reset]
  );

  // Navigation handlers
  const handleNavigateToLogin = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  const handleSkip = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div className={styles.container}>
      {/* Main Content */}
      <div className={styles.mainContent}>
        <div className={styles.signupCard}>
          {/* Header Section */}
          <div className={styles.header}>
            <div className={styles.loginHeader}>
              <h1 className={styles.brand}>THE Wyntra SHOP</h1>
              <p className={styles.instruction}>
                Sign Up Using Your
                <br />
                <strong>Email and Mobile Number</strong>
              </p>
            </div>
            {location.state?.from === LOCATION_STATE_CHANGE_EMAIL.STATUS && (
              <p className={styles.subtitle}>Enter your new email address</p>
            )}
          </div>

          {/* Signup Form */}
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.fieldGroup}>
              {/* Name */}
              <div className={styles.field}>
                <label htmlFor="name" className={styles.label}>Full Name*</label>
                <input
                  {...register("name")}
                  id="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Enter your full name"
                  className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
                  disabled={loading || isSubmitting}
                />
                {errors.name && <p className={styles.errorMessage}>{errors.name.message}</p>}
              </div>

              {/* Email */}
              <div className={styles.field}>
                <label htmlFor="email" className={styles.label}>Email Address*</label>
                <input
                  {...register("email")}
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
                  disabled={loading || isSubmitting}
                />
                {errors.email && <p className={styles.errorMessage}>{errors.email.message}</p>}
              </div>

              {/* Phone Number */}
              <div className={styles.field}>
                <label htmlFor="phoneNumber" className={styles.label}>Phone Number*</label>
                <input
                  {...register("phoneNumber")}
                  id="phoneNumber"
                  type="tel"
                  autoComplete="tel"
                  placeholder="Enter your phone number"
                  className={`${styles.input} ${errors.phoneNumber ? styles.inputError : ""}`}
                  disabled={loading || isSubmitting}
                />
                {errors.phoneNumber && (
                  <p className={styles.errorMessage}>{errors.phoneNumber.message}</p>
                )}
              </div>

              {/* Password */}
              <div className={styles.field}>
                <label htmlFor="password" className={styles.label}>Password*</label>
                <input
                  {...register("password")}
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Create a password"
                  className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
                  disabled={loading || isSubmitting}
                />
                {errors.password && (
                  <p className={styles.errorMessage}>{errors.password.message}</p>
                )}

                {/* Password requirements */}
                {password && (
                  <div className={styles.passwordRequirements}>
                    <div className={styles.requirementsTitle}>Password requirements:</div>
                    <ul className={styles.requirementsList}>
                      <li className={password.length >= 6 ? styles.requirementValid : styles.requirementInvalid}>
                        ✓ At least 6 characters
                      </li>
                      <li className={/[a-z]/.test(password) ? styles.requirementValid : styles.requirementInvalid}>
                        ✓ One lowercase letter
                      </li>
                      <li className={/[A-Z]/.test(password) ? styles.requirementValid : styles.requirementInvalid}>
                        ✓ One uppercase letter
                      </li>
                      <li className={/\d/.test(password) ? styles.requirementValid : styles.requirementInvalid}>
                        ✓ One number
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Server Error */}
            {error && <div className={styles.serverError}>{error}</div>}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || isSubmitting}
              className={styles.submitButton}
              style={{
                opacity: loading || isSubmitting ? 0.6 : 1,
                cursor: loading || isSubmitting ? "not-allowed" : "pointer",
              }}
            >
              {loading || isSubmitting ? "Creating account..." : "Create account"}
            </button>

            {/* Divider */}
            <div className={styles.divider}>
              <span className={styles.dividerLine}></span>
              <span className={styles.dividerText}>OR</span>
              <span className={styles.dividerLine}></span>
            </div>

            {/* Google OAuth Button (Placeholder) */}
            <div className={styles.oauthContainer}>
              <button type="button" className={styles.oauthButton}>
                <img
                  src="https://developers.google.com/identity/images/g-logo.png"
                  alt="Google logo"
                />
                Continue with Google
              </button>
            </div>

            {/* Already have account */}
            <div className={styles.linkContainer}>
              <button
                type="button"
                onClick={handleNavigateToLogin}
                className={styles.link}
                disabled={loading || isSubmitting}
                style={{
                  opacity: loading || isSubmitting ? 0.6 : 1,
                  cursor: loading || isSubmitting ? "not-allowed" : "pointer",
                }}
              >
                Already have an account? Sign in
              </button>
            </div>

            {/* Skip */}
            <div className={styles.skip}>
              <button type="button" onClick={handleSkip} className={styles.skipButton}>
                SKIP FOR NOW
                <img src={ArrowIcon} alt="arrow" className={styles.arrowIcon} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
