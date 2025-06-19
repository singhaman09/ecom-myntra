import React from "react";
import styles from "./styles/AddressSection.module.css";
import type { Address } from "../types/cart";

interface AddressSectionProps {
  address: Address | null;
  onChangeAddress: () => void;
}

const AddressSection: React.FC<AddressSectionProps> = ({
  address,
  onChangeAddress,
}) => {
  const renderAddressDetails = () => (
    <>
      <div className={styles.addressHeader}>
        <div className={styles.addressLabel}>Deliver To:</div>
        <div className={styles.nameAndPincode}>
          <span className={styles.addressName}>{address?.name}</span>,{" "}
          {address?.zip}
        </div>
      </div>
      <div className={styles.addressDetails}>
        {address?.street}, {address?.city}, {address?.state}
      </div>
    </>
  );

  const renderNoAddress = () => (
    <>
      <div className={styles.addressHeader}>
        <div className={styles.addressLabel}>Deliver To:</div>
      </div>
      <div className={styles.noAddress}>
        <span>
          Siddharth Pandey, Near Rahul furniture chitikpur raniyan Kanpur dehat, Kanpur, Uttar Pradesh, 209304
        </span>
        <button className={styles.addAddressButton} onClick={onChangeAddress}>
          Add Address
        </button>
      </div>
    </>
  );

  return (
    <div className={styles.addressSection}>
      <div className={styles.address}>
        {address ? renderAddressDetails() : renderNoAddress()}
      </div>
      {address && (
        <button className={styles.changeAddress} onClick={onChangeAddress}>
          Change Address
        </button>
      )}
    </div>
  );
};

export default AddressSection;