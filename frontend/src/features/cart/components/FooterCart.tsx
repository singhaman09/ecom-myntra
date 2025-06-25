import React from 'react';
import styles from './styles/FooterCart.module.css';
import visa from "../../../assets/visa_log.png"
import mastercard from "../../../assets/mastercard_logo.png"
import paytm from "../../../assets/Paytm_Logo.jpg"
import rupay from "../../../assets/Rupay-Logo.png"
import paypal from "../../../assets/paypal.jpg"

interface FooterCartProps {
  totalPrice: number;
  savings?: number;
  onPlaceOrder: () => void;
}

const paymentLogos = [
  visa,
  mastercard,
  paytm,
  rupay,
  paypal
];

const FooterCart: React.FC<FooterCartProps> = () => {
  return (
    <footer className={styles.footerCart}>
      <div className={styles.topRow}>
        <div className={styles.paymentLogos}>
          {paymentLogos.map((src, idx) => (
            <img key={idx} src={src} alt={`Payment option ${idx + 1}`} className={styles.paymentLogo} />
          ))}
        </div>
        <div className={styles.links}>
          <a href="#" className={styles.link}>Need Help</a>
          <span className={styles.separator}>|</span>
          <a href="#" className={styles.link}>Contact</a>
        </div>
      </div>
          
    </footer>
  );
};

export default FooterCart;




