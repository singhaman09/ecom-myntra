import React, { useState } from 'react';
import { AlertTriangle, Trash2, ArrowLeft } from 'lucide-react';
import styles from './DeleteAccount.module.css';

interface DeleteAccountProps {
  onGoBack?: () => void;
}

const DeleteAccount: React.FC<DeleteAccountProps> = ({ onGoBack }) => {
  const [step, setStep] = useState<'reasons' | 'confirm' | 'final'>('reasons');
  const [selectedReason, setSelectedReason] = useState('');
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const reasons = [
    'I found a better alternative',
    'Too expensive',
    'Poor customer service',
    'Technical issues with the platform',
    'Not using the service anymore',
    'Privacy concerns',
    'Too many promotional emails',
    'Difficult to navigate',
    'Limited product selection',
    'Other'
  ];

  const handleReasonSelect = (reason: string) => {
    setSelectedReason(reason);
  };

  const handleContinue = () => {
    if (selectedReason) {
      setStep('confirm');
    }
  };

  const handleConfirmDelete = () => {
    setStep('final');
  };

  const handleFinalDelete = async () => {
    if (deleteConfirmation === 'DELETE') {
      setIsDeleting(true);
      // Simulate API call
      setTimeout(() => {
        alert('Account deletion request submitted. You will receive a confirmation email shortly.');
        setIsDeleting(false);
        // In a real app, this would redirect to login or home page
      }, 2000);
    }
  };

  const handleBack = () => {
    if (step === 'confirm') {
      setStep('reasons');
    } else if (step === 'final') {
      setStep('confirm');
    } else if (onGoBack) {
      onGoBack();
    }
  };

  return (
    <div className={styles.deleteAccountContainer}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={handleBack}>
          <ArrowLeft size={20} />
          Back
        </button>
      </div>

      {step === 'reasons' && (
        <div className={styles.step}>
          <div className={styles.sadIcon}>
            <AlertTriangle size={64} />
          </div>
          
          <h2 className={styles.title}>We're sorry to see you go!</h2>
          <p className={styles.subtitle}>
            Before you delete your account, we'd love to know what went wrong.
          </p>

          <div className={styles.reasonsSection}>
            <h3>Why are you leaving?</h3>
            <div className={styles.reasonsList}>
              {reasons.map((reason, index) => (
                <label key={index} className={styles.reasonItem}>
                  <input
                    type="radio"
                    name="reason"
                    value={reason}
                    checked={selectedReason === reason}
                    onChange={() => handleReasonSelect(reason)}
                  />
                  <span className={styles.reasonText}>{reason}</span>
                </label>
              ))}
            </div>
          </div>

          <div className={styles.actions}>
            <button 
              className="btn btn-primary"
              onClick={handleContinue}
              disabled={!selectedReason}
            >
              Continue
            </button>
            <button className="btn btn-secondary" onClick={onGoBack}>
              Keep My Account
            </button>
          </div>
        </div>
      )}

      {step === 'confirm' && (
        <div className={styles.step}>
          <div className={styles.warningIcon}>
            <AlertTriangle size={64} />
          </div>
          
          <h2 className={styles.title}>Are you absolutely sure?</h2>
          <p className={styles.subtitle}>
            This action cannot be undone. Deleting your account will:
          </p>

          <div className={styles.consequencesList}>
            <ul>
              <li>Permanently delete your profile and personal information</li>
              <li>Remove all your order history and tracking information</li>
              <li>Delete all saved addresses and payment methods</li>
              <li>Cancel any active orders or returns</li>
              <li>Remove you from our mailing lists and notifications</li>
              <li>Make your account and data unrecoverable</li>
            </ul>
          </div>

          <div className={styles.reasonDisplay}>
            <strong>Reason for leaving:</strong> {selectedReason}
          </div>

          <div className={styles.actions}>
            <button 
              className={`btn ${styles.deleteButton}`}
              onClick={handleConfirmDelete}
            >
              <Trash2 size={16} />
              Yes, Delete My Account
            </button>
            <button className="btn btn-secondary" onClick={() => setStep('reasons')}>
              Go Back
            </button>
          </div>
        </div>
      )}

      {step === 'final' && (
        <div className={styles.step}>
          <div className={styles.finalWarning}>
            <AlertTriangle size={48} />
          </div>
          
          <h2 className={styles.title}>Final Confirmation</h2>
          <p className={styles.subtitle}>
            To confirm account deletion, please type <strong>DELETE</strong> in the box below:
          </p>

          <div className={styles.finalConfirmation}>
            <input
              type="text"
              value={deleteConfirmation}
              onChange={(e) => setDeleteConfirmation(e.target.value)}
              placeholder="Type DELETE to confirm"
              className={styles.deleteInput}
            />
          </div>

          <div className={styles.actions}>
            <button 
              className={`btn ${styles.finalDeleteButton}`}
              onClick={handleFinalDelete}
              disabled={deleteConfirmation !== 'DELETE' || isDeleting}
            >
              {isDeleting ? 'Processing...' : 'Delete My Account Forever'}
            </button>
            <button 
              className="btn btn-secondary" 
              onClick={() => setStep('confirm')}
              disabled={isDeleting}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteAccount;