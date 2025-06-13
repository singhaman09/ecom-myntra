import { useState } from 'react';
import { Check, Save } from 'lucide-react';
import styles from './Profile.module.css';
import type { User } from '../../types/profile.types';

interface ProfileProps {
  user: User;
  onUpdateProfile: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdateProfile }) => {
  const [formData, setFormData] = useState<User>(user);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [fullNameInput, setFullNameInput] = useState(
    `${user.firstName} ${user.lastName}`.trim()
  );

  if (!user) return null;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFullNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const fullName = e.target.value;
    setFullNameInput(fullName);

    const names = fullName.trim().split(/\s+/);
    setFormData((prev) => ({
      ...prev,
      firstName: names[0] || '',
      lastName: names.slice(1).join(' '),
    }));
  };

  const hasChanges = () => {
    const currentFullName = fullNameInput.trim();
    const originalFullName = `${user.firstName} ${user.lastName}`.trim();
    return (
      currentFullName !== originalFullName || formData.phone !== user.phone
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasChanges()) return;

    onUpdateProfile();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(user);
    setFullNameInput(`${user.firstName} ${user.lastName}`.trim());
    setIsEditing(false);
  };

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
              value={fullNameInput}
              onChange={handleFullNameChange}
              className="form-input"
              disabled={!isEditing}
              placeholder="Enter your full name"
              required
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
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="form-input"
              disabled={!isEditing}
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
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!hasChanges()}
                style={{
                  opacity: hasChanges() ? 1 : 0.6,
                  cursor: hasChanges() ? 'pointer' : 'not-allowed',
                }}
              >
                <Save size={16} />
                Save Changes
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCancel}
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
