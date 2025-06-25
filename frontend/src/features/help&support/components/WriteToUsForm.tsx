import React, { useState } from "react";
import styles from "../css/Helpsupport.module.css";

interface WriteToUsFormProps {
  orderNumber: string;
  onBack: () => void;
  onSubmit: (formData: any) => void;
}

const WriteToUsForm: React.FC<WriteToUsFormProps> = ({
  orderNumber,
  onBack,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    subject: "",
    orderNumber: orderNumber,
    description: "",
    images: [] as File[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
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
            onChange={(e) =>
              setFormData({ ...formData, subject: e.target.value })
            }
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
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            rows={4}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Add Image</label>
          <div className={styles.imageUpload}>
            {formData.images.length > 0 &&
              formData.images.map((file, index) => (
                <div key={index} className={styles.uploadedImage}>
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Uploaded ${index + 1}`}
                  />
                </div>
              ))}
            <label className={styles.uploadButton}>
              <span className={styles.uploadIcon}>+</span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
            </label>
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
