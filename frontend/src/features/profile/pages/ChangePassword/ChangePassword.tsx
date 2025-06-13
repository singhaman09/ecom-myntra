import React, { use, useState } from 'react';
import { Lock, Eye, EyeOff, Check, AlertCircle } from 'lucide-react';
import styles from './ChangePassword.module.css';
import { useAppDispatch } from '../../redux/hooks';
import { changePasswordThunk } from '../../redux/slices/changePasswordSlice';
import { verifyCurrentPasswordThunk } from '../../redux/slices/changePasswordSlice';

const ChangePassword: React.FC = () => {
  const dispatch = useAppDispatch();  
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [step, setStep] = useState<'verify' | 'change'>('verify');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const validateCurrentPassword = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    } else if (formData.currentPassword.length < 6) {
      newErrors.currentPassword = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateNewPassword = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'New password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.newPassword)) {
      newErrors.newPassword = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (formData.currentPassword === formData.newPassword) {
      newErrors.newPassword = 'New password must be different from current password';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleVerifyCurrentPassword = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateCurrentPassword()) return;

        setIsLoading(true);

        try {
            const result = await dispatch(verifyCurrentPasswordThunk({ currentPassword: formData.currentPassword })).unwrap();


            if (result.success) {
            setStep('change');
            setErrors({});
            } else {
            setErrors({ currentPassword: result.message || 'Current password is incorrect' });
            }
        } catch (err: any) {
            setErrors({ currentPassword: err?.message || 'Verification failed' });
        } finally {
            setIsLoading(false);
        }
    };


  const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateNewPassword()) return;

        setIsLoading(true);
        
        try {
            await dispatch(changePasswordThunk({
            oldPassword: formData.currentPassword,
            newPassword: formData.newPassword
            })).unwrap();

            setShowSuccess(true);
            setFormData({
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
            });
            setStep('verify');

            setTimeout(() => setShowSuccess(false), 5000);
        } catch (error: any) {
            setErrors({ newPassword: error.message || 'Failed to change password' });
        }

        setIsLoading(false);
    };

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    
    return strength;
  };

  const getPasswordStrengthLabel = (strength: number) => {
    switch (strength) {
      case 0:
      case 1:
        return 'Very Weak';
      case 2:
        return 'Weak';
      case 3:
        return 'Fair';
      case 4:
        return 'Good';
      case 5:
        return 'Strong';
      default:
        return '';
    }
  };

  const getPasswordStrengthColor = (strength: number) => {
    switch (strength) {
      case 0:
      case 1:
        return '#ff6b6b';
      case 2:
        return '#ff905a';
      case 3:
        return '#ffd93d';
      case 4:
        return '#6bcf7f';
      case 5:
        return '#03a685';
      default:
        return '#e9e9ed';
    }
  };

  const passwordStrength = getPasswordStrength(formData.newPassword);

  return (
    <div className={styles.changePasswordContainer}>
      {showSuccess && (
        <div className={styles.successMessage}>
          <Check size={20} />
          <span>Password changed successfully!</span>
        </div>
      )}

      <div className={styles.header}>
        <div className={styles.headerIcon}>
          <Lock size={32} />
        </div>
        <h2 className={styles.title}>Change Password</h2>
        <p className={styles.subtitle}>
          Keep your account secure by using a strong, unique password
        </p>
      </div>

      {step === 'verify' && (
        <form onSubmit={handleVerifyCurrentPassword} className={styles.form}>
          <div className={styles.step}>
            <div className={styles.stepHeader}>
              <h3>Step 1: Verify Current Password</h3>
              <p>Please enter your current password to continue</p>
            </div>

            <div className={styles.formGroup}>
              <div className={styles.passwordInput}>
                <input
                  type={showPasswords.current ? 'text' : 'password'}
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  className={`form-input ${errors.currentPassword ? styles.error : ''}`}
                  placeholder="Enter your current password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className={styles.togglePassword}
                  onClick={() => togglePasswordVisibility('current')}
                  disabled={isLoading}
                >
                  {showPasswords.current ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.currentPassword && (
                <div className={styles.errorMessage}>
                  <AlertCircle size={14} />
                  {errors.currentPassword}
                </div>
              )}
            </div>

            <div className={styles.formActions}>
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={isLoading || !formData.currentPassword}
              >
                {isLoading ? 'Verifying...' : 'Verify Password'}
              </button>
            </div>
          </div>
        </form>
      )}

      {step === 'change' && (
        <form onSubmit={handleChangePassword} className={styles.form}>
          <div className={styles.step}>
            <div className={styles.stepHeader}>
              <h3>Step 2: Set New Password</h3>
              <p>Choose a strong password that you haven't used before</p>
            </div>

            <div className={styles.formGroup}>
              <label className="form-label">New Password</label>
              <div className={styles.passwordInput}>
                <input
                  type={showPasswords.new ? 'text' : 'password'}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className={`form-input ${errors.newPassword ? styles.error : ''}`}
                  placeholder="Enter your new password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className={styles.togglePassword}
                  onClick={() => togglePasswordVisibility('new')}
                  disabled={isLoading}
                >
                  {showPasswords.new ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              
              {formData.newPassword && (
                <div className={styles.passwordStrength}>
                  <div className={styles.strengthBar}>
                    <div 
                      className={styles.strengthFill}
                      style={{ 
                        width: `${(passwordStrength / 5) * 100}%`,
                        backgroundColor: getPasswordStrengthColor(passwordStrength)
                      }}
                    />
                  </div>
                  <span 
                    className={styles.strengthLabel}
                    style={{ color: getPasswordStrengthColor(passwordStrength) }}
                  >
                    {getPasswordStrengthLabel(passwordStrength)}
                  </span>
                </div>
              )}

              {errors.newPassword && (
                <div className={styles.errorMessage}>
                  <AlertCircle size={14} />
                  {errors.newPassword}
                </div>
              )}

              <div className={styles.passwordRequirements}>
                <p>Password must contain:</p>
                <ul>
                  <li className={formData.newPassword.length >= 8 ? styles.met : ''}>
                    At least 8 characters
                  </li>
                  <li className={/[a-z]/.test(formData.newPassword) ? styles.met : ''}>
                    One lowercase letter
                  </li>
                  <li className={/[A-Z]/.test(formData.newPassword) ? styles.met : ''}>
                    One uppercase letter
                  </li>
                  <li className={/\d/.test(formData.newPassword) ? styles.met : ''}>
                    One number
                  </li>
                </ul>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className="form-label">Confirm New Password</label>
              <div className={styles.passwordInput}>
                <input
                  type={showPasswords.confirm ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`form-input ${errors.confirmPassword ? styles.error : ''}`}
                  placeholder="Confirm your new password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className={styles.togglePassword}
                  onClick={() => togglePasswordVisibility('confirm')}
                  disabled={isLoading}
                >
                  {showPasswords.confirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <div className={styles.errorMessage}>
                  <AlertCircle size={14} />
                  {errors.confirmPassword}
                </div>
              )}
            </div>

            <div className={styles.formActions}>
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={isLoading || !formData.newPassword || !formData.confirmPassword}
              >
                {isLoading ? 'Changing Password...' : 'Change Password'}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setStep('verify');
                  setFormData({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                  });
                  setErrors({});
                }}
                disabled={isLoading}
              >
                Back
              </button>
            </div>
          </div>
        </form>
      )}

      <div className={styles.securityTips}>
        <h4>Security Tips:</h4>
        <ul>
          <li>Use a unique password that you don't use elsewhere</li>
          <li>Include a mix of letters, numbers, and special characters</li>
          <li>Avoid using personal information like names or birthdays</li>
          <li>Consider using a password manager</li>
          <li>Change your password regularly</li>
        </ul>
      </div>
    </div>
  );
};

export default ChangePassword;