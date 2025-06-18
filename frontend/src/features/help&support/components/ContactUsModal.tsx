// components/ContactUsModal.tsx
import React from 'react';
import type { ContactOption } from '../types/support';
import styles from '../css/Helpsupport.module.css';

interface ContactUsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWriteToUs: () => void;
}

const ContactUsModal: React.FC<ContactUsModalProps> = ({ isOpen, onClose, onWriteToUs }) => {
  if (!isOpen) return null;

  const contactOptions: ContactOption[] = [
    {
      type: 'call',
      title: 'Call now',
      subtitle: 'Call Now & Call be back',
      icon: '📞'
    },
    {
      type: 'chat',
      title: 'Chat',
      subtitle: 'Call Now & Call be back',
      icon: '💬'
    },
    {
      type: 'write',
      title: 'Write to us',
      subtitle: 'Call Now & Call be back',
      icon: '✉️'
    }
  ];

  const handleOptionClick = (option: ContactOption) => {
    if (option.type === 'write') {
      onWriteToUs();
    } else {
      // Handle other contact options
      console.log(`Selected: ${option.type}`);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>Contact Us</h3>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>
        
        <div className={styles.modalContent}>
          <p className={styles.modalDescription}>
            Lorem ipsum dollar gotchs ipsum dollar gotchs
          </p>
          
          <div className={styles.contactOptions}>
            {contactOptions.map((option) => (
              <div 
                key={option.type}
                className={styles.contactOption}
                onClick={() => handleOptionClick(option)}
              >
                <span className={styles.contactIcon}>{option.icon}</span>
                <div className={styles.contactDetails}>
                  <div className={styles.contactTitle}>{option.title}</div>
                  <div className={styles.contactSubtitle}>{option.subtitle}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsModal;
