import { useNavigate } from "react-router-dom";
import CartHeader from "../components/CartHeader";
import styles from "../components/styles/Payment.module.css";
import { useState } from "react";
import { MdCreditCard, MdAccountBalanceWallet, MdOutlineLocalShipping } from "react-icons/md";

const Payment = () => {
  const [selectedMethod, setSelectedMethod] = useState("UPI");
  const [upiId, setUpiId] = useState("");
  const [upiError, setUpiError] = useState("");
  const navigate = useNavigate();

  // Example values, replace with real cart data as needed
  const totalAmount = 2785;

  const validateUpi = () => {
    return /^[\w.-]+@[\w.-]+$/.test(upiId);
  };

  const handlePay = () => {
    if (selectedMethod === "UPI") {
      if (!upiId.trim() || !validateUpi()) {
        setUpiError("Please enter a valid UPI ID (e.g., name@bank)");
        return;
      }
      setUpiError("");
    }
    navigate("/orderSuccess");
  };

  return (
    <>
      <CartHeader activeStep="PAYMENT" />
      <div className={styles.pageWrapper}>
        <div className={styles.paymentCard}>
          <div className={styles.amountBox}>
            <span className={styles.amountLabel}>Total Amount</span>
            <span className={styles.amountValue}>₹{totalAmount}</span>
          </div>

          <div className={styles.optionsTitle}>Select Payment Method</div>
          <div className={styles.paymentOptions}>
            <div
              className={`${styles.optionCard} ${selectedMethod === "CARD" ? styles.active : ""}`}
              onClick={() => setSelectedMethod("CARD")}
            >
              <MdCreditCard size={28} className={styles.optionIcon} />
              <span>Credit/Debit Card</span>
            </div>
            <div
              className={`${styles.optionCard} ${selectedMethod === "UPI" ? styles.active : ""}`}
              onClick={() => setSelectedMethod("UPI")}
            >
              <MdAccountBalanceWallet size={28} className={styles.optionIcon} />
              <span>UPI</span>
            </div>
            <div
              className={`${styles.optionCard} ${selectedMethod === "COD" ? styles.active : ""}`}
              onClick={() => setSelectedMethod("COD")}
            >
              <MdOutlineLocalShipping size={28} className={styles.optionIcon} />
              <span>Cash on Delivery</span>
            </div>
          </div>

          <div className={styles.formSection}>
            {selectedMethod === "UPI" && (
              <>
                <input
                  type="text"
                  placeholder="Enter your UPI ID"
                  className={styles.inputField}
                  value={upiId}
                  onChange={e => setUpiId(e.target.value)}
                />
                {upiError && <div style={{ color: 'red', fontSize: 13, marginTop: 4 }}>{upiError}</div>}
              </>
            )}
            {selectedMethod === "CARD" && (
              <div className={styles.cardForm}>
                <input
                  type="text"
                  placeholder="Card Number"
                  className={styles.inputField}
                />
                <input
                  type="text"
                  placeholder="Expiry (MM/YY)"
                  className={styles.inputField}
                />
                <input
                  type="text"
                  placeholder="CVV"
                  className={styles.inputField}
                />
              </div>
            )}
            {selectedMethod === "COD" && (
              <p className={styles.codNote}>
                You can pay when the order is delivered.
              </p>
            )}
          </div>

          <button className={styles.payBtn} onClick={handlePay}>
            PAY NOW
          </button>
        </div>
      </div>
    </>
  );
};

export default Payment;