import React, { useState } from 'react';
import { Lock, Eye, EyeOff, Check, AlertCircle, Loader2 } from 'lucide-react'; 
import styles from './ChangePassword.module.css';
import { useAppDispatch } from '../../redux/hooks';
import { changePasswordThunk } from '../../redux/slices/changePasswordSlice'; 

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
       
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    if (errors.general) {
        setErrors(prev => ({ ...prev, general: '' }));
    }
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required.';
      isValid = false;
    } else if (formData.currentPassword.length < 6) { 
      newErrors.currentPassword = 'Current password must be at least 6 characters.';
      isValid = false;
    }

    
    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required.';
      isValid = false;
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'New password must be at least 8 characters.';
      isValid = false;
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.newPassword)) {
      newErrors.newPassword = 'Password must contain at least one uppercase letter, one lowercase letter, and one number.';
      isValid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm new password is required.';
      isValid = false;
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'New password and confirm password do not match.';
      isValid = false;
    }

    if (formData.currentPassword && formData.newPassword && formData.currentPassword === formData.newPassword) {
      newErrors.newPassword = 'New password must be different from current password.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({}); 

    if (!validateForm()) { 
      return;
    }

    setIsLoading(true);
    setShowSuccess(false); 

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
      
      
      setTimeout(() => setShowSuccess(false), 5000); 

    } catch (error: any) {
      const errorMessage = error?.message || 'Failed to change password. Please try again.';
      if (errorMessage.toLowerCase().includes('current password incorrect')) { 
        setErrors({ currentPassword: errorMessage });
      } else {
        setErrors({ general: errorMessage }); 
      }
    } finally {
      setIsLoading(false); 
    }
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
      case 0: return 'Very Weak';
      case 1: return 'Weak';
      case 2: return 'Fair';
      case 3: return 'Good';
      case 4: return 'Strong';
      case 5: return 'Very Strong';
      default: return '';
    }
  };

  const getPasswordStrengthColor = (strength: number) => {
    switch (strength) {
      case 0: return '#ff6b6b'; 
      case 1: return '#ff905a'; 
      case 2: return '#ffd93d'; 
      case 3: return '#6bcf7f'; 
      case 4: return '#03a685'; 
      case 5: return '#028a6f'; 
      default: return '#e9e9ed'; 
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
      {errors.general && (
        <div className={`${styles.errorMessage} ${styles.error}`}>
          <AlertCircle size={16} />
          <span>{errors.general}</span>
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

      
      <form onSubmit={handleSubmit} className={styles.form}>
        
        <div className={styles.formGroup}>
          <label className="form-label">Current Password</label>
          <div className={styles.passwordInput}>
            <input
              type={showPasswords.current ? 'text' : 'password'}
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleInputChange}
              className={`form-input ${errors.currentPassword ? styles.error : ''}`}
              placeholder="Enter your current password"
              disabled={isLoading}
              required
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
              required
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
              <li className={/[!@#$%^&*(),.?":{}|<>]/.test(formData.newPassword) ? styles.met : ''}> 
                One special character (!@#$%^&*)
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
              required
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
            disabled={isLoading || !formData.currentPassword || !formData.newPassword || !formData.confirmPassword}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={16} />
                Changing Password...
              </>
            ) : (
              'Change Password'
            )}
          </button>
        </div>
      </form>    
    </div>
  );
};

export default ChangePassword;