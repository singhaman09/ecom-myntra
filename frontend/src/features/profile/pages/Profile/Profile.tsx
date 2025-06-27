import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import styles from './Profile.module.css';
import type { User } from '../../types/profile.types';
import { getUser, updateUser } from '../../services/userService';
import { useDispatch } from 'react-redux';
import { updateUser as updateUserRedux } from '../../redux/slices/userSlice';

const Check = lazy(() => import('lucide-react').then(m => ({ default: m.Check })));
const Save = lazy(() => import('lucide-react').then(m => ({ default: m.Save })));
const Loader2 = lazy(() => import('lucide-react').then(m => ({ default: m.Loader2 })));

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<User>({ _id: '', name: '', email: '', phoneNumber: '' });
  const [originalFormData, setOriginalFormData] = useState<User | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadUserData = async () => {
      setIsLoading(true);
      try {
        const userData = await getUser();
        setFormData(userData);
        setOriginalFormData(userData);
      } catch (err) {
        console.error('Error loading user data:', err);
      } finally {
        setIsLoading(false);
      }
    };
    loadUserData();
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const hasChanges = useCallback(() => {
    if (!originalFormData) return false;
    return formData.name !== originalFormData.name || formData.phoneNumber !== originalFormData.phoneNumber;
  }, [formData, originalFormData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasChanges() || isUpdating) return;
    setIsUpdating(true);
    try {
      const updated = await updateUser({ name: formData.name, phoneNumber: formData.phoneNumber });
      setFormData(updated);
      setOriginalFormData(updated);
      dispatch(updateUserRedux(updated));
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      setIsEditing(false);
    } catch (err) {
      console.error('Update failed:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    if (originalFormData) setFormData(originalFormData);
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Suspense fallback={null}><Loader2 className="animate-spin" size={32} /></Suspense>
        <span>Loading profile...</span>
      </div>
    );
  }

  return (
    <div className={styles.profileContainer}>
      {showSuccess && (
        <div className={styles.successMessage}>
          <Suspense fallback={null}><Check size={20} /></Suspense>
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
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="form-input" disabled={!isEditing || isUpdating} />
          </div>

          <div className={styles.formGroup}>
            <label className="form-label">Email Address</label>
            <input type="email" value={formData.email} className="form-input" disabled style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-muted)', cursor: 'not-allowed' }} />
          </div>

          <div className={styles.formGroup}>
            <label className="form-label">Phone Number</label>
            <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} className="form-input" disabled={!isEditing || isUpdating} required />
          </div>
        </div>

        <div className={styles.formActions}>
          {!isEditing ? (
            <button type="button" className="btn btn-primary" onClick={() => setIsEditing(true)} disabled={isUpdating}>Edit Profile</button>
          ) : (
            <>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!hasChanges() || isUpdating}
                style={{ opacity: hasChanges() ? 1 : 0.6, cursor: hasChanges() && !isUpdating ? 'pointer' : 'not-allowed' }}
              >
                {isUpdating ? (
                  <>
                    <Suspense fallback={null}><Loader2 className="animate-spin" size={16} /></Suspense>
                    Saving...
                  </>
                ) : (
                  <>
                    <Suspense fallback={null}><Save size={16} /></Suspense>
                    Save Changes
                  </>
                )}
              </button>
              <button type="button" className="btn btn-secondary" onClick={handleCancel} disabled={isUpdating}>Cancel</button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default Profile;