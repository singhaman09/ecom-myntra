import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import QRCode from "react-qr-code";
import styles from "../css/Helpsupport.module.css";

interface WriteToUsFormProps {
  orderNumber: string;
  onBack: () => void;
  onSubmit: (formData: any) => void;
}

const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/dnyatisob/raw/upload";
const CLOUDINARY_UPLOAD_PRESET = "invoice_unsigned";

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

  useEffect(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
}, []);
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };

  const toBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const generatePDF = async (): Promise<Blob> => {
    const pdf = new jsPDF();
    pdf.setFontSize(16);
    pdf.text("Write To Us", 20, 20);

    pdf.setFontSize(12);
    pdf.text(`Subject: ${formData.subject}`, 20, 40);
    pdf.text(`Order Number: ${formData.orderNumber}`, 20, 50);
    pdf.text("Description:", 20, 60);
    pdf.text(formData.description, 20, 70, { maxWidth: 170 });

    let yOffset = 90;
    for (let file of formData.images) {
      const imgData = await toBase64(file);
      pdf.addImage(imgData, "JPEG", 20, yOffset, 50, 50);
      yOffset += 60;
    }

    return pdf.output("blob");
  };

  const uploadPDFToCloudinary = async (pdfBlob: Blob): Promise<string> => {
    const formData = new FormData();
    formData.append("file", pdfBlob);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    formData.append("folder", "invoices");
    formData.append("public_id", `invoice_${Date.now()}`);

    const response = await fetch(CLOUDINARY_UPLOAD_URL, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Cloudinary upload failed:", data);
      throw new Error(data.error?.message || "Upload failed");
    }

    return data.secure_url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const pdfBlob = await generatePDF();
      const uploadedUrl = await uploadPDFToCloudinary(pdfBlob);
      setQrUrl(uploadedUrl); 
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.writeToUsForm}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={onBack}>←</button>
        <h1 className={styles.headerTitle}>Write To Us</h1>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Subject</label>
          <input
            type="text"
            className={styles.input}
            value={formData.subject}
            placeholder="Need urgent action"
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
            value={formData.description}
            placeholder="Received defected product.. Need replacement..."
            rows={4}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Add Image</label>
          <div className={styles.imageUpload}>
            {formData.images.map((file, index) => (
              <div key={index} className={styles.uploadedImage}>
                <img src={URL.createObjectURL(file)} alt={`Uploaded ${index + 1}`} />
              </div>
            ))}
            <label className={styles.uploadButton}>
              <span className={styles.uploadIcon}>+</span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
            </label>
          </div>
        </div>

        <button
          type="submit"
          className={styles.submitBtn}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>

      {qrUrl && (
        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <h3>Your QR Code</h3>
          <QRCode value={qrUrl} size={200} />
          <p style={{ marginTop: "10px" }}>
            <a href={qrUrl} download target="_blank" rel="noopener noreferrer">
              Download PDF
            </a>
          </p>
          {/* <button
            onClick={() => onSubmit(formData)} // Only finish when user confirms
            className={styles.submitBtn}
            style={{ marginTop: "20px" }}
          >
            Done
          </button> */}
        </div>
      )}
    </div>
  );
};

export default WriteToUsForm;
