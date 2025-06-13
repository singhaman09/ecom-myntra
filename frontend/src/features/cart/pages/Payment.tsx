import {useNavigate } from "react-router-dom";
import CartHeader from "../components/CartHeader";
import styles from "../components/styles/Payment.module.css";
import { useState } from "react";

const Payment = () => {
  const [selectedMethod, setSelectedMethod] = useState("UPI");
  const navigate = useNavigate();

  const handleSelect = (method: string) => {
    setSelectedMethod(method);
  };

  const handlePay = () => {
    navigate("/orderSuccess");
  }

  return (
    <>
      <CartHeader activeStep="PAYMENT" />
      <div className={styles.pageWrapper}>
        {/* LEFT SIDE - Payment Options */}
        <div className={styles.leftSection}>
          <h2 className={styles.title}>Choose Payment Method</h2>

          <div
            className={`${styles.methodCard} ${
              selectedMethod === "UPI" ? styles.active : ""
            }`}
            onClick={() => handleSelect("UPI")}
          >
            <input type="radio" checked={selectedMethod === "UPI"} readOnly />
            <span>UPI</span>
          </div>

          <div
            className={`${styles.methodCard} ${
              selectedMethod === "CARD" ? styles.active : ""
            }`}
            onClick={() => handleSelect("CARD")}
          >
            <input type="radio" checked={selectedMethod === "CARD"} readOnly />
            <span>Credit/Debit Card</span>
          </div>

          <div
            className={`${styles.methodCard} ${
              selectedMethod === "COD" ? styles.active : ""
            }`}
            onClick={() => handleSelect("COD")}
          >
            <input type="radio" checked={selectedMethod === "COD"} readOnly />
            <span>Cash on Delivery</span>
          </div>

          {/* Dummy form just for UI feel */}
          <div className={styles.formSection}>
            {selectedMethod === "UPI" && (
              <input
                type="text"
                placeholder="Enter your UPI ID"
                className={styles.inputField}
              />
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
            <button className={styles.payBtn} onClick={handlePay}>PAY NOW</button>
          </div>
        </div>

        {/* RIGHT SIDE - Order Summary */}
        <div className={styles.rightSection}>
          <div className={styles.priceBox}>
            <p>
              Total MRP <span>₹3,073</span>
            </p>
            <p>
              Discount on MRP <span className={styles.green}>- ₹308</span>
            </p>
            <p>
              Platform Fee <span>₹20</span>
            </p>
            <p>
              Shipping Fee <span className={styles.green}>FREE</span>
            </p>
            <hr />
            <p className={styles.total}>
              Total Amount <span>₹2,785</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
