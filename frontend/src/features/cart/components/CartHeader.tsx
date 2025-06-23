import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/CartHeader.module.css";

interface CartHeaderProps {
  activeStep: "BAG" | "PAYMENT";
}

const CartHeader: React.FC<CartHeaderProps> = ({ activeStep }) => {
  const navigate = useNavigate();

  const steps: ("BAG" | "PAYMENT")[] = [
    "BAG",
    "PAYMENT",
  ];
  const currentStepIndex = steps.indexOf(activeStep);

  const handleStepClick = (
    step: "BAG" | "PAYMENT",
    index: number
  ) => {
    if (index < currentStepIndex) {
      if (step === "BAG") navigate("/cart");
      // Don't allow navigating to 'PAYMENT' directly
    }
  };

  const getStepClass = (step: string, index: number) => {
    if (index < currentStepIndex) return styles.completedStep;
    if (step === activeStep) return styles.activeStep;
    return styles.step;
  };

  return (
    <div className={styles.cartHeader}>
      <div className={styles.progressBar}>
        <div className={styles.logo}>
          <a href="/" className={styles.logoLink}>
            Wyntra
          </a>
        </div>

        <div className={styles.progressElement}>
          <ul className={styles.progressList}>
            {steps.map((step, index) => (
              <React.Fragment key={step}>
                <li
                  className={getStepClass(step, index)}
                  onClick={() => handleStepClick(step, index)}
                >
                  {step}
                </li>
                {index < steps.length - 1 && (
                  <li className={styles.divider}></li>
                )}
              </React.Fragment>
            ))}
          </ul>
        </div>

        <div className={styles.securityWrapper}>
          <span className={styles.security}>
            <span className={styles.securityIcon}>✔</span> 100% SECURE
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartHeader;
