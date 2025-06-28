import { useNavigate } from "react-router-dom";
import CartHeader from "../components/CartHeader";
import styles from "../components/styles/Payment.module.css";
import { useState, useRef, useEffect } from "react";
import { MdCreditCard, MdAccountBalanceWallet, MdOutlineLocalShipping, MdAccountBalance, MdPayment, MdWallet, MdCardGiftcard, MdAccessTime, MdNewReleases } from "react-icons/md";
import FooterCart from "../components/FooterCart";
import gsap from "gsap";
import CartSummary from "../components/CartSummary";

const paymentModes = [
  { key: "COD", label: "Cash On Delivery", icon: <MdOutlineLocalShipping size={22} />, badge: null },
  { key: "UPI", label: "UPI (Pay via any App)", icon: <MdAccountBalanceWallet size={22} />, badge: null, highlight: true },
  { key: "CARD", label: "Credit/Debit Card", icon: <MdCreditCard size={22} />, badge: "8 Offers" },
  { key: "PAYIN3", label: "Pay in 3", icon: <MdNewReleases size={22} />, badge: "NEW" },
  { key: "PAYLATER", label: "Pay Later", icon: <MdAccessTime size={22} />, badge: null },
  { key: "WALLET", label: "Wallets", icon: <MdWallet size={22} />, badge: "2 Offers" },
  { key: "EMI", label: "EMI", icon: <MdAccountBalance size={22} />, badge: null },
  { key: "NETBANKING", label: "Net Banking", icon: <MdPayment size={22} />, badge: null },
];

const Payment = () => {
  const [selectedMethod, setSelectedMethod] = useState("UPI");
  const [upiId, setUpiId] = useState("");
  const [upiError, setUpiError] = useState("");
  const navigate = useNavigate();
  const totalAmount = 2785;
  const totalMRP = 3200;
  const totalItems = 3;
  const appliedCoupon = { code: "SAVE20", discount: 100 };

  // GSAP refs
  const headingRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
    );
    gsap.fromTo(
      listRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "power3.out" }
    );
  }, []);

  const validateUpi = () => /^[\w.-]+@[\w.-]+$/.test(upiId);

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
      <div className={styles.paymentPageContainer}>
        <div className={styles.paymentLeftCol}>
          <h2 className={styles.paymentOptionsHeading} ref={headingRef}>Payment Options</h2>
          <div className={styles.paymentModeList} ref={listRef}>
            {paymentModes.map((mode) => (
              <div
                key={mode.key}
                className={`${styles.paymentModeOption} ${selectedMethod === mode.key ? styles.selected : ""} ${mode.highlight ? styles.highlight : ""}`}
                onClick={() => setSelectedMethod(mode.key)}
              >
                <span className={styles.paymentModeIcon}>{mode.icon}</span>
                <span className={styles.paymentModeLabel}>{mode.label}</span>
                {mode.badge && (
                  <span className={`${styles.paymentModeBadge} ${mode.badge === "NEW" ? styles.newBadge : ""}`}>{mode.badge}</span>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.paymentRightCol}>
          <CartSummary
            totalItems={totalItems}
            totalPrice={totalAmount}
            totalMRP={totalMRP}
            appliedCoupon={appliedCoupon}
          />
          {/* Payment Details Section */}
          {selectedMethod === "UPI" && (
            <div className={styles.upiSection}>
              <div className={styles.upiOptions}>
                <label className={styles.upiOption}>
                  <input type="radio" name="upiType" defaultChecked />
                  <span className={styles.upiIcon}>[QR]</span> Scan & Pay
                </label>
                <label className={styles.upiOption}>
                  <input type="radio" name="upiType" />
                  <span className={styles.upiIcon}><MdAccountBalanceWallet size={20} /></span> Enter UPI ID
                </label>
              </div>
              <input
                type="text"
                placeholder="Enter your UPI ID"
                className={styles.inputField}
                value={upiId}
                onChange={e => setUpiId(e.target.value)}
                style={{ marginTop: 12, width: 260 }}
              />
              {upiError && <div style={{ color: 'red', fontSize: 13, marginTop: 4 }}>{upiError}</div>}
            </div>
          )}
          {selectedMethod === "CARD" && (
            <div className={styles.cardForm}>
              <input type="text" placeholder="Card Number" className={styles.inputField} />
              <input type="text" placeholder="Expiry (MM/YY)" className={styles.inputField} />
              <input type="text" placeholder="CVV" className={styles.inputField} />
            </div>
          )}
          {selectedMethod === "COD" && (
            <div className={styles.codNote}>You can pay when the order is delivered.</div>
          )}
          {selectedMethod === "WALLET" && (
            <div className={styles.walletSection}>Select your wallet (Paytm, PhonePe, etc.)</div>
          )}
          {selectedMethod === "EMI" && (
            <div className={styles.emiSection}>Select EMI plan (Bank EMI, Card EMI, etc.)</div>
          )}
          {selectedMethod === "NETBANKING" && (
            <div className={styles.netbankingSection}>Select your bank for net banking.</div>
          )}
          {selectedMethod === "PAYLATER" && (
            <div className={styles.paylaterSection}>Choose your pay later provider.</div>
          )}
          {selectedMethod === "PAYIN3" && (
            <div className={styles.payin3Section}>Split your payment into 3 easy installments.</div>
          )}

          {/* Gift Card Section */}
          <div className={styles.giftCardSection}>
            <span>Have a Gift Card?</span>
            <button className={styles.applyGiftCardBtn}>APPLY GIFT CARD</button>
          </div>

          <button className={styles.payBtn} onClick={handlePay}>
            PAY NOW
          </button>
        </div>
      </div>
      <FooterCart totalPrice={totalAmount} savings={0} onPlaceOrder={handlePay} />
    </>
  );
};

export default Payment;