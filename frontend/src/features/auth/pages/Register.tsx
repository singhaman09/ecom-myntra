import React, { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../hooks/useAuth";
import { registerSchema, type RegisterFormData } from "../schemas/authSchemas";
import styles from "./css/Signup.module.css";
import ArrowIcon from "../../../assets/icons/right-arrow.svg";


const Register: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isFromChangeEmail = useRef(location.state?.from === "change-email");

  const {
    register: registerUser,
    loading,
    error,
    registrationData,
  } = useAuth();

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

  useEffect(() => {
    // If we're coming from change-email, don't redirect even if registrationData exists
    if (isFromChangeEmail.current) {
      return;
    }

    // Only redirect to verify-email if we have fresh registration data
    if (registrationData?.userId && registrationData?.email) {
      navigate("/verify-email", {
        state: {
          email: registrationData.email,
          userId: registrationData.userId,
        },
      });
    }
  }, [registrationData, navigate]);

  // Reset the flag when component mounts from change-email
  useEffect(() => {
    if (location.state?.from === "change-email") {
      isFromChangeEmail.current = true;
      // Clear the navigation state so it doesn't persist
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const onSubmit = async (data: RegisterFormData) => {
    try {
      // Reset the change-email flag before submitting
      isFromChangeEmail.current = false;

      await registerUser(data);
      reset();
    } catch {
      // Handle registration error
    }
  };

  const password = watch("password");

  return (
    <div className={styles.container}>
      {/* Main Content */}
      <div className={styles.mainContent}>
        <div className={styles.signupCard}>
          <div className={styles.header}>
            <div className={styles.loginHeader}>
              <h1 className={styles.brand}>THE BODY SHOP</h1>
              <p className={styles.instruction}>
                Sign Up Using Your
                <br />
                <strong>Email and Mobile Number</strong>
              </p>
            </div>
            {location.state?.from === "change-email" && (
              <p className={styles.subtitle}>Enter your new email address</p>
            )}
          </div>

          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.fieldGroup}>
              {/* Name Field */}
              <div className={styles.field}>
                <label htmlFor="name" className={styles.label}>
                  Full Name*
                </label>
                <input
                  {...register("name")}
                  id="name"
                  type="text"
                  autoComplete="name"
                  className={`${styles.input} ${
                    errors.name ? styles.inputError : ""
                  }`}
                  placeholder="Enter your full name"
                  disabled={loading || isSubmitting}
                />
                {errors.name && (
                  <p className={styles.errorMessage}>{errors.name.message}</p>
                )}
              </div>

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
                  className={`${styles.input} ${
                    errors.email ? styles.inputError : ""
                  }`}
                  placeholder="Enter your email"
                  disabled={loading || isSubmitting}
                />
                {errors.email && (
                  <p className={styles.errorMessage}>{errors.email.message}</p>
                )}
              </div>

              {/* Phone Field */}
              <div className={styles.field}>
                <label htmlFor="phoneNumber" className={styles.label}>
                  Phone Number*
                </label>
                <input
                  {...register("phoneNumber")}
                  id="phoneNumber"
                  type="tel"
                  autoComplete="tel"
                  className={`${styles.input} ${
                    errors.phoneNumber ? styles.inputError : ""
                  }`}
                  placeholder="Enter your phone number"
                  disabled={loading || isSubmitting}
                />
                {errors.phoneNumber && (
                  <p className={styles.errorMessage}>
                    {errors.phoneNumber.message}
                  </p>
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
                  autoComplete="new-password"
                  className={`${styles.input} ${
                    errors.password ? styles.inputError : ""
                  }`}
                  placeholder="Create a password"
                  disabled={loading || isSubmitting}
                />
                {errors.password && (
                  <p className={styles.errorMessage}>
                    {errors.password.message}
                  </p>
                )}

                {/* Password strength indicator */}
                {password && password.length > 0 && (
                  <div className={styles.passwordRequirements}>
                    <div className={styles.requirementsTitle}>
                      Password requirements:
                    </div>
                    <ul className={styles.requirementsList}>
                      <li
                        className={
                          password.length >= 6
                            ? styles.requirementValid
                            : styles.requirementInvalid
                        }
                      >
                        ✓ At least 6 characters
                      </li>
                      <li
                        className={
                          /[a-z]/.test(password)
                            ? styles.requirementValid
                            : styles.requirementInvalid
                        }
                      >
                        ✓ One lowercase letter
                      </li>
                      <li
                        className={
                          /[A-Z]/.test(password)
                            ? styles.requirementValid
                            : styles.requirementInvalid
                        }
                      >
                        ✓ One uppercase letter
                      </li>
                      <li
                        className={
                          /\d/.test(password)
                            ? styles.requirementValid
                            : styles.requirementInvalid
                        }
                      >
                        ✓ One number
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Server Error */}
            {error && <div className={styles.serverError}>{error}</div>}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || isSubmitting}
              className={styles.submitButton}
              style={{
                opacity: loading || isSubmitting ? 0.6 : 1,
                cursor: loading || isSubmitting ? "not-allowed" : "pointer",
              }}
            >
              {loading || isSubmitting
                ? "Creating account..."
                : "Create account"}
            </button>

            <div className={styles.divider}>
              <span className={styles.dividerLine}></span>
              <span className={styles.dividerText}>OR</span>
              <span className={styles.dividerLine}></span>
            </div>

            <div className={styles.oauthContainer}>
              <button type="button" className={styles.oauthButton}>
                <img
                  src="https://developers.google.com/identity/images/g-logo.png"
                  alt="Google logo"
                />
                Continue with Google
              </button>
            </div>

            {/* Link to Login */}
            <div className={styles.linkContainer}>
              <button
                type="button"
                onClick={() => navigate("/login")}
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

            <div className={styles.skip}>
              <button
                type="button"
                onClick={() => navigate("/")}
                className={styles.skipButton}
              >
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
