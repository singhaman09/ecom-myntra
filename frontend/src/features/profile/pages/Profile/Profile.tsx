// import { useState } from 'react';
// import { Check, Save, Loader2 } from 'lucide-react';
// import styles from './Profile.module.css';
// import type { User } from '../../types/profile.types';
// import { useSelector } from 'react-redux';
// import type { RootState } from '../../../../store/store';


// const Profile: React.FC = () => {
//   const data = useSelector((state: RootState) => state.user);
//   const user = data.user || { id: '', firstName: '', lastName: '', email: '', phone: '', gender: 'other', dateOfBirth: '', avatar: '' };
//   const [formData, setFormData] = useState<User>(user);
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [fullNameInput, setFullNameInput] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const onUpdateProfile = async () => {
//     setIsLoading(true);
//     try {
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       // await updateProfileAPI(formData);
//     } catch (error) {
//       console.error('Failed to update profile:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFullNameChange = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const fullName = e.target.value;
//     setFullNameInput(fullName);

//     const names = fullName.trim().split(/\s+/);
//     setFormData((prev) => ({
//       ...prev,
//       firstName: names[0] || '',
//       lastName: names.slice(1).join(' '),
//     }));
//   };

//   const hasChanges = () => {
//     const currentFullName = fullNameInput.trim();
//     const originalFullName = `${user.firstName} ${user.lastName}`.trim();
//     return (
//       currentFullName !== originalFullName || formData.phone !== user.phone
//     );
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!hasChanges() || isLoading) return;

//     await onUpdateProfile(); // Now actually using the function
//     setShowSuccess(true);
//     setTimeout(() => setShowSuccess(false), 3000);
//     setIsEditing(false);
//   };

//   const handleCancel = () => {
//     setFormData(user);
//     setFullNameInput(`${user.firstName} ${user.lastName}`.trim());
//     setIsEditing(false);
//   };

//   return (
//     <div className={styles.profileContainer}>
//       {showSuccess && (
//         <div className={styles.successMessage}>
//           <Check size={20} />
//           <span>Profile updated successfully!</span>
//         </div>
//       )}

//       <div className={styles.profileHeader}>
//         <h3>Personal Information</h3>
//         <p>Update your personal details and contact information</p>
//       </div>

//       <form onSubmit={handleSubmit}>
//         <div className={styles.profileForm}>
//           <div className={`${styles.formGroup} ${styles.fullWidth}`}>
//             <label className="form-label">Full Name</label>
//             <input
//               type="text"
//               value={fullNameInput}
//               onChange={handleFullNameChange}
//               className="form-input"
//               disabled={!isEditing}
//               placeholder="Enter your full name"
//               required
//             />
//           </div>

//           <div className={styles.formGroup}>
//             <label className="form-label">Email Address</label>
//             <input
//               type="email"
//               value={formData.email}
//               className="form-input"
//               disabled
//               style={{
//                 backgroundColor: 'var(--bg-secondary)',
//                 color: 'var(--text-muted)',
//                 cursor: 'not-allowed',
//               }}
//             />
//           </div>

//           <div className={styles.formGroup}>
//             <label className="form-label">Phone Number</label>
//             <input
//               type="tel"
//               name="phone"
//               value={formData.phone}
//               onChange={handleInputChange}
//               className="form-input"
//               disabled={!isEditing}
//               required
//             />
//           </div>
//         </div>

//         <div className={styles.formActions}>
//           {!isEditing ? (
//             <button
//               type="button"
//               className="btn btn-primary"
//               onClick={() => setIsEditing(true)}
//               disabled={isLoading}
//             >
//               Edit Profile
//             </button>
//           ) : (
//             <>
//               <button
//                 type="submit"
//                 className="btn btn-primary"
//                 disabled={!hasChanges() || isLoading}
//                 style={{
//                   opacity: hasChanges() ? 1 : 0.6,
//                   cursor: hasChanges() && !isLoading ? 'pointer' : 'not-allowed',
//                 }}
//               >
//                 {isLoading ? (
//                   <>
//                     <Loader2 className="animate-spin" size={16} />
//                     Saving...
//                   </>
//                 ) : (
//                   <>
//                     <Save size={16} />
//                     Save Changes
//                   </>
//                 )}
//               </button>
//               <button
//                 type="button"
//                 className="btn btn-secondary"
//                 onClick={handleCancel}
//                 disabled={isLoading}
//               >
//                 Cancel
//               </button>
//             </>
//           )}
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Profile;
















import { useState, useEffect } from 'react';
import { Check, Save, Loader2 } from 'lucide-react';
import styles from './Profile.module.css';
import type { User } from '../../types/profile.types';
import {getUser, updateUser} from '../../services/userService'; // Ensure this path is correct based on your project structure


const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<User>({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: 'other',
    dateOfBirth: '',
    avatar: ''
  });
  // New state to store the original fetched user data for comparison and reverting
  const [originalFormData, setOriginalFormData] = useState<User | null>(null);
  const [fullNameInput, setFullNameInput] = useState('');

  // Fetch user data on component mount
  useEffect(() => {
    const loadUserData = async () => {
      try {
        setIsLoading(true);
        const userData = await getUser();
        setFormData(userData);
        setOriginalFormData(userData); // Store the original fetched data
        setFullNameInput(`${userData.firstName} ${userData.lastName}`.trim());
      } catch (error) {
        console.error('Error loading user data:', error);
        // Optionally, handle error display to the user here
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

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fullName = e.target.value;
    setFullNameInput(fullName);
    const names = fullName.trim().split(/\s+/);
    setFormData(prev => ({
      ...prev,
      firstName: names[0] || '',
      lastName: names.slice(1).join(' '),
    }));
  };

  const hasChanges = () => {
    // Cannot compare if original data hasn't been loaded yet
    if (!originalFormData) return false;

    const currentFullName = fullNameInput.trim();
    const originalFetchedFullName = `${originalFormData.firstName} ${originalFormData.lastName}`.trim();

    // Check if full name has changed OR if phone number has changed
    return (
      currentFullName !== originalFetchedFullName ||
      formData.phone !== originalFormData.phone
      // Add other fields here if they become editable in the future
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Prevent submission if no changes or if an update is already in progress
    if (!hasChanges() || isUpdating) return;

    setIsUpdating(true);
    try {
      // Call the updateUser API with the current formData
      const updatedUser = await updateUser(formData);

      // Update both formData and originalFormData with the latest data from the server
      setFormData(updatedUser);
      setOriginalFormData(updatedUser);
      setFullNameInput(`${updatedUser.firstName} ${updatedUser.lastName}`.trim());

      setShowSuccess(true);
      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000);
      setIsEditing(false); // Exit editing mode
    } catch (error) {
      console.error('Failed to update profile:', error);
      // Optionally, show an error message to the user
    } finally {
      setIsUpdating(false); // Always reset updating state
    }
  };

  const handleCancel = () => {
    // Revert formData and fullNameInput to the original fetched state
    if (originalFormData) {
      setFormData(originalFormData);
      setFullNameInput(`${originalFormData.firstName} ${originalFormData.lastName}`.trim());
    }
    setIsEditing(false); // Exit editing mode
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
              value={fullNameInput}
              onChange={handleFullNameChange}
              className="form-input"
              disabled={!isEditing || isUpdating} // Disable when not editing or updating
            />
          </div>

          <div className={styles.formGroup}>
            <label className="form-label">Email Address</label>
            <input
              type="email"
              value={formData.email}
              className="form-input"
              disabled // Email is always disabled
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
              disabled={!isEditing || isUpdating} // Disable when not editing or updating
              required
            />
          </div>
        </div>

        <div className={styles.formActions}>
          {!isEditing ? (
            // Show Edit Profile button when not in editing mode
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setIsEditing(true)}
              disabled={isUpdating} // Disable if an update is in progress
            >
              Edit Profile
            </button>
          ) : (
            // Show Save and Cancel buttons when in editing mode
            <>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!hasChanges() || isUpdating} // Disable if no changes or updating
                style={{
                  opacity: hasChanges() ? 1 : 0.6, // Visual cue for disabled state
                  cursor: hasChanges() && !isUpdating ? 'pointer' : 'not-allowed',
                }}
              >
                {isUpdating ? (
                  // Show loading spinner and text during update
                  <>
                    <Loader2 className="animate-spin" size={16} />
                    Saving...
                  </>
                ) : (
                  // Show Save icon and text normally
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
                disabled={isUpdating} // Disable if an update is in progress
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