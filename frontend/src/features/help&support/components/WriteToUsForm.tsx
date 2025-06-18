import React, { useState } from 'react';
import styles from '../css/Helpsupport.module.css'; // Adjust the path as necessary

interface WriteToUsFormProps {
  orderNumber: string;
  onBack: () => void;
  onSubmit: (formData: any) => void;
}

const WriteToUsForm: React.FC<WriteToUsFormProps> = ({ orderNumber, onBack, onSubmit }) => {
  const [formData, setFormData] = useState({
    subject: '',
    orderNumber: orderNumber,
    description: '',
    image: null as File | null
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  return (
    <div className={styles.writeToUsForm}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={onBack}>
          ←
        </button>
        <h1 className={styles.headerTitle}>Write To Us</h1>
      </div>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Subject</label>
          <input
            type="text"
            className={styles.input}
            placeholder="Need urgent action"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          />
        </div>
        
        <div className={styles.formGroup}>
          <label className={styles.label}>Order Number</label>
          <input
            type="text"
            className={styles.input}
            value={formData.orderNumber}
            readOnly
          />
        </div>
        
        <div className={styles.formGroup}>
          <label className={styles.label}>Description</label>
          <textarea
            className={styles.textarea}
            placeholder="Received defected product.. Need replacement..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
          />
        </div>
        
        <div className={styles.formGroup}>
          <label className={styles.label}>Add Image</label>
          <div className={styles.imageUpload}>
            {formData.image ? (
              <div className={styles.uploadedImage}>
                <img src={URL.createObjectURL(formData.image)} alt="Uploaded" />
              </div>
            ) : (
              <label className={styles.uploadButton}>
                <span className={styles.uploadIcon}>+</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
              </label>
            )}
          </div>
        </div>
        
        <button type="submit" className={styles.submitBtn}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default WriteToUsForm;