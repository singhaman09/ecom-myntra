import React, { useEffect } from "react";
import styles from "./styles/AddressSection.module.css";
import type { Address as CartAddress } from "../types/cart";
import { useAppDispatch, useAppSelector } from '../../profile/redux/hooks';
import { fetchAddresses } from '../../profile/redux/slices/addressSlice';

interface AddressSectionProps {
  address?: CartAddress | null;
  onChangeAddress: () => void;
  onAddAddress: () => void;
}

const AddressSection: React.FC<AddressSectionProps> = ({
  address,
    onChangeAddress,
  onAddAddress,
}) => {
  const dispatch = useAppDispatch();
  const { items: profileAddresses = [], loading } = useAppSelector((state) => state.address);

  useEffect(() => {
    if (profileAddresses.length === 0 && !loading) {
      dispatch(fetchAddresses());
    }
  }, [dispatch, profileAddresses.length, loading]);

  // Find default address from profile if no address prop is provided
  const defaultProfileAddress = profileAddresses.find(addr => addr.isDefault);

  // Map profile address to cart address type if needed
  const mappedAddress: CartAddress | null = address
    ? address
    : defaultProfileAddress
      ? {
          id: defaultProfileAddress._id,
          name: defaultProfileAddress.name,
          street: defaultProfileAddress.street,
          city: defaultProfileAddress.city,
          state: defaultProfileAddress.state,
          zip: defaultProfileAddress.postalCode,
          phone: defaultProfileAddress.phoneNumber,
          isDefault: defaultProfileAddress.isDefault,
        }
      : null;

  const renderAddressDetails = () => (
    <>
      <div className={styles.addressHeader}>
        <div className={styles.addressLabel}>Deliver To:</div>
        <div className={styles.nameAndPincode}>
          <span className={styles.addressName}>{mappedAddress?.name}</span>,{" "}
          {mappedAddress?.zip}
        </div>
      </div>
      <div className={styles.addressDetails}>
        {mappedAddress?.street}, {mappedAddress?.city}, {mappedAddress?.state}
      </div>
    </>
  );

  const renderNoAddress = () => (
    <>
      <div className={styles.addressHeader}>
        <div className={styles.addressLabel}>Deliver To:</div>
      </div>
      <div className={styles.noAddress}>
        <span>No address found. Please add an address.</span>
      </div>
    </>
  );

  return (
    <div className={styles.addressSection}>
      <div className={styles.address}>
        {mappedAddress ? renderAddressDetails() : renderNoAddress()}
      </div>
      <div >
          <button className={styles.changeAddress} onClick={onChangeAddress}>
            Change Address
          </button>
      </div>
    </div>
  );
};

export default AddressSection;
