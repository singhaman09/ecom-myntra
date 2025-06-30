import React, {
  useState,
  useCallback,
  lazy,
  Suspense,
  memo,
} from 'react';
import styles from './DeleteAccount.module.css';
import { DELETE_ACCOUNT_FORM_FIELDS } from '../../types/profile_enum';

const AlertTriangle = lazy(() => import('lucide-react').then(m => ({ default: m.AlertTriangle })));
const Trash2 = lazy(() => import('lucide-react').then(m => ({ default: m.Trash2 })));
const ArrowLeft = lazy(() => import('lucide-react').then(m => ({ default: m.ArrowLeft })));

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
    'Other',
  ];

  const handleReasonSelect = useCallback((reason: string) => {
    setSelectedReason(reason);
  }, []);

  const handleContinue = useCallback(() => {
    if (selectedReason) setStep('confirm');
  }, [selectedReason]);

  const handleConfirmDelete = useCallback(() => {
    setStep('final');
  }, []);

  const handleFinalDelete = useCallback(() => {
    if (deleteConfirmation === DELETE_ACCOUNT_FORM_FIELDS.DELETE) {
      setIsDeleting(true);
      setTimeout(() => {
        alert('Account deletion request submitted. You will receive a confirmation email shortly.');
        setIsDeleting(false);
      }, 2000);
    }
  }, [deleteConfirmation]);

  const handleBack = useCallback(() => {
    if (step === DELETE_ACCOUNT_FORM_FIELDS.CONFIRM) setStep('reasons');
    else if (step === DELETE_ACCOUNT_FORM_FIELDS.FINAL) setStep('confirm');
    else onGoBack?.();
  }, [step, onGoBack]);

  return (
    <div className={styles.deleteAccountContainer}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={handleBack}>
          <Suspense fallback={null}><ArrowLeft size={20} /></Suspense>
          Back
        </button>
      </div>

      {step === DELETE_ACCOUNT_FORM_FIELDS.REASONS && (
        <div className={styles.step}>
          <div className={styles.sadIcon}>
            <Suspense fallback={null}><AlertTriangle size={64} /></Suspense>
          </div>

          <h2 className={styles.title}>We're sorry to see you go!</h2>
          <p className={styles.subtitle}>
            Before you delete your account, we'd love to know what went wrong.
          </p>

          <div className={styles.reasonsSection}>
            <h3>Why are you leaving?</h3>
            <div className={styles.reasonsList}>
              {reasons.map((reason, i) => (
                <label key={i} className={styles.reasonItem}>
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

      {step === DELETE_ACCOUNT_FORM_FIELDS.CONFIRM && (
        <div className={styles.step}>
          <div className={styles.warningIcon}>
            <Suspense fallback={null}><AlertTriangle size={64} /></Suspense>
          </div>

          <h2 className={styles.title}>Are you absolutely sure?</h2>
          <p className={styles.subtitle}>
            This action cannot be undone. Deleting your account will:
          </p>

          <ul className={styles.consequencesList}>
            <li>Permanently delete your profile and personal information</li>
            <li>Remove all your order history and tracking information</li>
            <li>Delete all saved addresses and payment methods</li>
            <li>Cancel any active orders or returns</li>
            <li>Remove you from our mailing lists and notifications</li>
            <li>Make your account and data unrecoverable</li>
          </ul>

          <div className={styles.reasonDisplay}>
            <strong>Reason for leaving:</strong> {selectedReason}
          </div>

          <div className={styles.actions}>
            <button className={`btn ${styles.deleteButton}`} onClick={handleConfirmDelete}>
              <Suspense fallback={null}><Trash2 size={16} /></Suspense>
              Yes, Delete My Account
            </button>
            <button className="btn btn-secondary" onClick={() => setStep('reasons')}>
              Go Back
            </button>
          </div>
        </div>
      )}

      {step === DELETE_ACCOUNT_FORM_FIELDS.FINAL && (
        <div className={styles.step}>
          <div className={styles.finalWarning}>
            <Suspense fallback={null}><AlertTriangle size={48} /></Suspense>
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
              disabled={deleteConfirmation !== DELETE_ACCOUNT_FORM_FIELDS.DELETE || isDeleting}
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

export default memo(DeleteAccount);