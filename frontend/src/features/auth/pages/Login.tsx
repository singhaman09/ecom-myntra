import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../hooks/useAuth";
import { loginSchema, type LoginFormData } from "../schemas/authSchemas";
import styles from "./css/Login.module.css";
import ArrowIcon from "../../../assets/icons/right-arrow.svg";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, loading, error, clearAuthState } = useAuth();
  const [agreedToTerms, setAgreedToTerms] = useState(false);

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

  // Clear auth state on component mount
  useEffect(() => {
    clearAuthState();
  }, [clearAuthState]);

  const onSubmit = async (data: LoginFormData) => {
    if (!agreedToTerms) {
      return;
    }

    try {
      await login(data);
      navigate("/");
      reset();
    } catch {
      // Handle login failure silently or show an error message
    }
  };

  return (
    <div className={styles.container}>
      {/* Main Content */}
      <div className={styles.mainContent}>
        <div className={styles.loginCard}>
          <div className={styles.header}>
            <div className={styles.loginHeader}>
              <h1 className={styles.brand}>THE Wyntra SHOP</h1>
              <p className={styles.instruction}>
                Sign In Using Your
                <br />
                <strong>Mobile Number Or Email</strong>
              </p>
            </div>
          </div>

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
                className={`${styles.input} ${
                  errors.email ? styles.inputError : ""
                }`}
                placeholder="Enter your email"
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
                className={`${styles.input} ${
                  errors.password ? styles.inputError : ""
                }`}
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className={styles.errorMessage}>{errors.password.message}</p>
              )}
            </div>

            {/* Terms and Conditions */}
            <div className={styles.termsContainer}>
              <input
                type="checkbox"
                id="terms"
                className={styles.checkbox}
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
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

            {/* Trouble logging in */}
            <div className={styles.troubleText}>
              Have trouble logging in?{" "}
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className={styles.troubleLink}
              >
                Forgot Password
              </button>
            </div>
          </form>

          {/* Links */}
          <div className={styles.linksContainer}>
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className={styles.link}
            >
              Create new account
            </button>
          </div>

          {/* Skip for now */}
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
        </div>
      </div>
    </div>
  );
};

export default Login;
