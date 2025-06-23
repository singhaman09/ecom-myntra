import { useState, useEffect } from 'react';
import { Check, Save, Loader2 } from 'lucide-react';
import styles from './Profile.module.css';
import type { User } from '../../types/profile.types';
import {getUser, updateUser} from '../../services/userService'; 

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<User>({
    _id: '',
    name: '',
    email: '',
    phoneNumber: ''
  });
  const [originalFormData, setOriginalFormData] = useState<User | null>(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        setIsLoading(true);
        const userData = await getUser();
        setFormData(userData);
        setOriginalFormData(userData); 
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const hasChanges = () => {
    if (!originalFormData) return false;
    return (
      formData.name !== originalFormData.name ||
      formData.phoneNumber !== originalFormData.phoneNumber
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasChanges() || isUpdating) return;

    setIsUpdating(true);
    try {
      const updatedUser = await updateUser({
        name: formData.name,
        phoneNumber: formData.phoneNumber
      });
      setFormData(updatedUser);
      setOriginalFormData(updatedUser);

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      setIsEditing(false); 
    } catch (error) {
      console.error('Failed to update profile:', error);      
    } finally {
      setIsUpdating(false); 
    }
  };

  const handleCancel = () => {
    if (originalFormData) {
      setFormData(originalFormData);
    }
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Loader2 className="animate-spin" size={32} />
        <span>Loading profile...</span>
      </div>
    );
  }

  return (
    <div className={styles.profileContainer}>
      {showSuccess && (
        <div className={styles.successMessage}>
          <Check size={20} />
          <span>Profile updated successfully!</span>
        </div>
      )}

      <div className={styles.profileHeader}>
        <h3>Personal Information</h3>
        <p>Update your personal details and contact information</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className={styles.profileForm}>
          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="form-input"
              disabled={!isEditing || isUpdating} 
            />
          </div>

          <div className={styles.formGroup}>
            <label className="form-label">Email Address</label>
            <input
              type="email"
              value={formData.email}
              className="form-input"
              disabled 
              style={{
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-muted)',
                cursor: 'not-allowed',
              }}
            />
          </div>

          <div className={styles.formGroup}>
            <label className="form-label">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="form-input"
              disabled={!isEditing || isUpdating} 
              required
            />
          </div>
        </div>

        <div className={styles.formActions}>
          {!isEditing ? (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setIsEditing(true)}
              disabled={isUpdating}
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!hasChanges() || isUpdating} 
                style={{
                  opacity: hasChanges() ? 1 : 0.6,
                  cursor: hasChanges() && !isUpdating ? 'pointer' : 'not-allowed',
                }}
              >
                {isUpdating ? (
                  <>
                    <Loader2 className="animate-spin" size={16} />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    Save Changes
                  </>
                )}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCancel}
                disabled={isUpdating} 
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default Profile;