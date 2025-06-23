import React, { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import styles from "../styles/ChangeAddressModal.module.css"; // Adjust the path as necessary

interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  isDefault: boolean;
}

interface ChangeAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (address: Address, updatedAddresses: Address[]) => void; // Updated prop to pass updated addresses
  onUpdateAddresses: (updatedAddresses: Address[]) => void;
  addresses: Address[];
  editAddress?: Address | null;
  canAddAddress?: boolean;
}

const ChangeAddressModal: React.FC<ChangeAddressModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onUpdateAddresses,
  addresses,
  editAddress = null,
  canAddAddress = true,
}) => {
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    addresses.find((addr) => addr.isDefault)?.id || null
  );
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
  });
  const [pincode, setPincode] = useState("");
  const [formErrors, setFormErrors] = useState<any>({});

  // Prefill form for editing
  React.useEffect(() => {
    if (editAddress) {
      setShowAddForm(true);
      setNewAddress({
        name: editAddress.name,
        street: editAddress.street,
        city: editAddress.city,
        state: editAddress.state,
        zip: editAddress.zip,
        phone: editAddress.phone,
      });
    } else {
      setShowAddForm(false);
      setNewAddress({
        name: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        phone: "",
      });
    }
  }, [editAddress, isOpen]);

  const validateForm = () => {
    const errors: any = {};
    if (!newAddress.name.trim()) errors.name = "Name is required.";
    if (!newAddress.street.trim()) errors.street = "Street is required.";
    if (!newAddress.city.trim()) errors.city = "City is required.";
    if (!newAddress.state.trim()) errors.state = "State is required.";
    if (!/^[0-9]{6}$/.test(newAddress.zip)) errors.zip = "Zip must be 6 digits.";
    if (!/^[0-9]{10}$/.test(newAddress.phone)) errors.phone = "Phone must be 10 digits.";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;
    if (addresses.length >= 2 && !editAddress) return;
    let updatedAddresses: Address[] = [...addresses];

    if (showAddForm) {
      if (editAddress) {
        // Edit existing address
        updatedAddresses = updatedAddresses.map((addr) =>
          addr.id === editAddress.id
            ? { ...addr, ...newAddress }
            : addr
        );
        onSave({ ...editAddress, ...newAddress }, updatedAddresses);
      } else {
        // Add new address
        if (addresses.length >= 2) return; // Prevent adding more than 2
        const newAddr: Address = {
          id: `addr_${Date.now()}`,
          name: newAddress.name,
          street: newAddress.street,
          city: newAddress.city,
          state: newAddress.state,
          zip: newAddress.zip,
          phone: newAddress.phone,
          isDefault: true, // Set the new address as default
        };
        // Mark all other addresses as non-default
        updatedAddresses = updatedAddresses.map((addr) => ({
          ...addr,
          isDefault: false,
        }));
        updatedAddresses.push(newAddr);
        onSave(newAddr, updatedAddresses); // Pass the new address and updated list
      }
    } else if (selectedAddressId) {
      const selectedAddress = addresses.find(
        (addr) => addr.id === selectedAddressId
      );
      if (selectedAddress) {
        // Mark the selected address as default and others as non-default
        updatedAddresses = updatedAddresses.map((addr) => ({
          ...addr,
          isDefault: addr.id === selectedAddressId,
        }));
        onSave(selectedAddress, updatedAddresses);
      }
    }

    // Update the addresses list in the parent component
    onUpdateAddresses(updatedAddresses);

    setShowAddForm(false);
    setNewAddress({
      name: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      phone: "",
    });
    onClose();
  };

  const handleAddNewAddress = () => {
    if (!canAddAddress) return;
    setShowAddForm(true);
    setSelectedAddressId(null);
  };

  const handleEditAddress = (address: Address) => {
    setShowAddForm(true);
    setNewAddress({
      name: address.name,
      street: address.street,
      city: address.city,
      state: address.state,
      zip: address.zip,
      phone: address.phone,
    });
  };

  const handleDeleteAddress = (addressId: string) => {
    const updatedAddresses = addresses.filter((addr) => addr.id !== addressId);
    onUpdateAddresses(updatedAddresses);
    if (selectedAddressId === addressId) {
      setSelectedAddressId(updatedAddresses[0]?.id || null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.addressModalOverlay}>
      <div className={styles.addressModalContent}>
        <div className={styles.addressModalHeader}>
          <h2 className={styles.addressModalTitle}>Select Delivery Address</h2>
          <button className={styles.addressModalClose} onClick={onClose}>
            ✕
          </button>
        </div>

        {!showAddForm ? (
          <>
            {/* Pincode Section */}
            <div className={styles.pincodeSection}>
              <input
                type="text"
                placeholder="Enter Pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className={styles.pincodeInput}
              />
              <button className={styles.checkButton}>CHECK</button>
            </div>

            {/* Address List */}
            <div className={styles.addressList}>
              {addresses.length === 0 ? (
                <p className={styles.noAddress}>
                  No saved addresses. Add a new one!
                </p>
              ) : (
                addresses.map((address) => (
                  <div key={address.id} className={styles.addressItem}>
                    <input
                      type="radio"
                      name="address"
                      value={address.id}
                      checked={selectedAddressId === address.id}
                      onChange={() => setSelectedAddressId(address.id)}
                      className={styles.addressRadio}
                    />
                    <div className={styles.addressDetails}>
                      <p className={styles.addressName}>
                        {address.name}{" "}
                        {address.isDefault && (
                          <span className={styles.defaultTag}>(Default)</span>
                        )}
                      </p>
                      <p className={styles.addressText}>
                        {address.street}, {address.city}, {address.state} -{" "}
                        {address.zip}
                      </p>
                      <p className={styles.addressPhone}>
                        Mobile: {address.phone}
                      </p>
                    </div>
                    <div className={styles.addressActions}>
                      <button
                        className={styles.iconButton}
                        onClick={() => handleEditAddress(address)}
                        disabled={addresses.length > 2 && !canAddAddress}
                        aria-label="Edit address"
                        type="button"
                      >
                        <FaEdit size={18} />
                      </button>
                      <button
                        className={styles.iconButton}
                        onClick={() => handleDeleteAddress(address.id)}
                        aria-label="Delete address"
                        type="button"
                      >
                        <FaTrash size={18} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            <button
              className={styles.addNewAddressButton}
              onClick={handleAddNewAddress}
              disabled={!canAddAddress}
              style={!canAddAddress ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
            >
              Add New Address
            </button>
          </>
        ) : (
          <div className={styles.addAddressForm}>
            <h3 className={styles.addAddressTitle}>{editAddress ? 'Edit Address' : 'Add New Address'}</h3>
            <input
              type="text"
              placeholder="Full Name"
              value={newAddress.name}
              onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
              className={styles.addressInput}
            />
            {formErrors.name && <div style={{ color: 'red', fontSize: 12 }}>{formErrors.name}</div>}
            <input
              type="text"
              placeholder="Street Address"
              value={newAddress.street}
              onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
              className={styles.addressInput}
            />
            {formErrors.street && <div style={{ color: 'red', fontSize: 12 }}>{formErrors.street}</div>}
            <input
              type="text"
              placeholder="City"
              value={newAddress.city}
              onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
              className={styles.addressInput}
            />
            {formErrors.city && <div style={{ color: 'red', fontSize: 12 }}>{formErrors.city}</div>}
            <input
              type="text"
              placeholder="State"
              value={newAddress.state}
              onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
              className={styles.addressInput}
            />
            {formErrors.state && <div style={{ color: 'red', fontSize: 12 }}>{formErrors.state}</div>}
            <input
              type="text"
              placeholder="Zip Code"
              value={newAddress.zip}
              onChange={(e) => setNewAddress({ ...newAddress, zip: e.target.value })}
              className={styles.addressInput}
            />
            {formErrors.zip && <div style={{ color: 'red', fontSize: 12 }}>{formErrors.zip}</div>}
            <input
              type="text"
              placeholder="Phone Number"
              value={newAddress.phone}
              onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
              className={styles.addressInput}
            />
            {formErrors.phone && <div style={{ color: 'red', fontSize: 12 }}>{formErrors.phone}</div>}
            <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
              <button
                className={styles.saveButton}
                onClick={handleSave}
                disabled={addresses.length >= 2 && !editAddress}
                style={addresses.length >= 2 && !editAddress ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
              >
                {editAddress ? 'Save Changes' : 'Save Address'}
              </button>
              <button className={styles.cancelButton} onClick={onClose}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChangeAddressModal;