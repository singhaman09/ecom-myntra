import React, { useState, useEffect } from 'react';
import { Plus, Home, Briefcase, MapPin, Edit2, Trash2, X } from 'lucide-react';
import styles from './Addresses.module.css';
import { countries } from 'countries-list';
// import { useAppDispatch, useAppSelector } from '../../redux/hooks'; // Keep commented for now
// import { createAddress, modifyAddress, removeAddress, fetchAddresses } from '../../redux/slices/addressSlice'; // Keep commented for now
import type { Address } from '../../types/profile.types';

const countryList = Object.entries(countries)
  .map(([code, country]) => ({ code, name: (country as any).name }))
  .sort((a, b) => a.name.localeCompare(b.name));

// Mock Data
const MOCK_ADDRESSES: Address[] = [
  {
    id: '1',
    type: 'home',
    name: 'John Doe',
    phone: '9876543210',
    street: '123, Maple Street',
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'IN',
    postalCode: '400001',
    isDefault: true,
  },
  {
    id: '2',
    type: 'work',
    name: 'John Doe',
    phone: '9876543211',
    street: '101, Business Park, MG Road',
    city: 'Bengaluru',
    state: 'Karnataka',
    country: 'IN',
    postalCode: '560001',
    isDefault: false,
  },
  {
    id: '3',
    type: 'other',
    name: 'Jane Smith',
    phone: '9876543212',
    street: '5, Pine Avenue',
    city: 'New Delhi',
    state: 'Delhi',
    country: 'IN',
    postalCode: '110001',
    isDefault: false,
  },
];

const Addresses: React.FC = () => {
  // Comment out Redux hooks for now
  // const dispatch = useAppDispatch();
  // const { items: addresses, loading, error } = useAppSelector((state) => state.address);

  
  const [addresses, setAddresses] = useState<Address[]>(MOCK_ADDRESSES);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState<string | null>(null); 

  const [showModal, setShowModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [formData, setFormData] = useState<Omit<Address, 'id'>>({
    type: 'home',
    name: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    country: 'IN',
    postalCode: '',
    isDefault: false,
  });


  useEffect(() => {
    //dispatch(fetchAddresses());
    setAddresses(MOCK_ADDRESSES);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAddress) {
      setAddresses((prev) =>
        prev.map((addr) =>
          addr.id === editingAddress.id ? { ...addr, ...formData, id: addr.id } : addr
        )
      );
      // dispatch(modifyAddress({ ...editingAddress, ...formData } as Address)); 
    } else {
      const newAddress = { ...formData, id: String(Date.now()) }; 
      setAddresses((prev) => [...prev, newAddress]);
      // dispatch(createAddress(formData)); 
    }
    handleCloseModal();
  };

  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    setFormData({
      type: address.type,
      name: address.name,
      phone: address.phone,
      street: address.street,
      city: address.city,
      state: address.state,
      country: address.country,
      postalCode: address.postalCode,
      isDefault: address.isDefault,
    });
    setShowModal(true);
  };

  const handleRemove = (id: string) => {
    
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));
    // dispatch(removeAddress(id)); 
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingAddress(null);
    setFormData({
      type: 'home',
      name: '',
      phone: '',
      street: '',
      city: '',
      state: '',
      country: 'IN',
      postalCode: '',
      isDefault: false,
    });
  };

  const getAddressIcon = (type: string) => {
    switch (type) {
      case 'home':
        return <Home size={16} />;
      case 'work':
        return <Briefcase size={16} />;
      default:
        return <MapPin size={16} />;
    }
  };


  if (loading) return <div className="loading-spinner">Loading addresses...</div>;

  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className={styles.addressesContainer}>
      <div className={styles.addressesHeader}>
        <h2>Saved Addresses</h2>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={16} />
          Add New Address
        </button>
      </div>

      <div className={styles.addressesList}>
        {addresses.length === 0 && !loading && !error ? (
            <p className={styles.noAddresses}>No addresses found. Add a new one!</p>
        ) : (
          addresses.map((address: Address) => (
            <div key={address.id} className={`${styles.addressCard} ${address.isDefault ? styles.default : ''}`}>
              <div>
                <div className={styles.addressHeader}>
                  <div className={styles.addressType}>
                    {getAddressIcon(address.type)}
                    {address.type}
                  </div>
                  {address.isDefault && <div className={styles.defaultBadge}>Default</div>}
                </div>

                <div className={styles.addressDetails}>
                  <h3>{address.name}</h3>
                  <p>{address.street}</p>
                  <p>
                    {address.city}, {address.state}, {countryList.find((c) => c.code === address.country)?.name} - {address.postalCode}
                  </p>
                  <p className={styles.phoneNumber}>Phone: {address.phone}</p>
                </div>
              </div>

              <div className={styles.addressActions}>
                <button className={styles.actionButton} onClick={() => handleEdit(address)}>
                  <Edit2 size={14} />
                </button>
                <button className={`${styles.actionButton} ${styles.delete}`} onClick={() => handleRemove(address.id)}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalCard}>
            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <h2 className={styles.modalTitle}>{editingAddress ? 'Edit Address' : 'Add New Address'}</h2>
                <button className={styles.closeButton} onClick={handleCloseModal}>
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className={styles.addressForm}>
                <div className="form-group">
                  <label className="form-label">Address Type</label>
                  <div className={styles.typeSelector}>
                    {(['home', 'work', 'other'] as const).map(type => (
                      <button
                        key={type}
                        type="button"
                        className={`${styles.typeButton} ${formData.type === type ? styles.active : ''}`}
                        onClick={() => setFormData(prev => ({ ...prev, type }))}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Street</label>
                  <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="House No, Building Name, Street"
                    required
                  />
                </div>

                <div className={styles.formRow}>
                  <div className="form-group">
                    <label className="form-label">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">State</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className="form-group">
                    <label className="form-label">Country</label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    >
                      {countryList.map(country => (
                        <option key={country.code} value={country.code}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Pincode</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className={styles.defaultCheckbox}>
                    <input
                      type="checkbox"
                      id="isDefault"
                      name="isDefault"
                      checked={formData.isDefault}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="isDefault">Make this my default address</label>
                  </div>
                </div>

                <div className={styles.modalActions}>
                  <button type="submit" className="btn btn-primary">
                    {editingAddress ? 'Update Address' : 'Save Address'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Addresses;