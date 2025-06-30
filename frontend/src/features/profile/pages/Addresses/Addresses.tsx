import React, {
  useState,
  useEffect,
  useCallback,
  lazy,
  Suspense,
  memo,
} from 'react';
import styles from './Addresses.module.css';
import { countries } from 'countries-list';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  createAddress,
  modifyAddress,
  removeAddress,
  fetchAddresses,
} from '../../redux/slices/addressSlice';
import type { Address } from '../../types/profile.types';
import { LOCATION_STATE_CHANGE_CHECKBOX } from '../../types/profile_enum';

const Plus = lazy(() => import('lucide-react').then(m => ({ default: m.Plus })));
const Home = lazy(() => import('lucide-react').then(m => ({ default: m.Home })));
const Briefcase = lazy(() => import('lucide-react').then(m => ({ default: m.Briefcase })));
const MapPin = lazy(() => import('lucide-react').then(m => ({ default: m.MapPin })));
const Edit2 = lazy(() => import('lucide-react').then(m => ({ default: m.Edit2 })));
const Trash2 = lazy(() => import('lucide-react').then(m => ({ default: m.Trash2 })));
const X = lazy(() => import('lucide-react').then(m => ({ default: m.X })));

const countryList = Object.entries(countries)
  .map(([code, country]) => ({ code, name: (country as any).name }))
  .sort((a, b) => a.name.localeCompare(b.name));

type AddressFormData = Omit<Address, '_id'>;

const Addresses: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items: addresses = [], loading, error } = useAppSelector(
    (state) => state.address
  );

  const [showModal, setShowModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [formData, setFormData] = useState<AddressFormData>({
    addressType: 'home',
    name: '',
    phoneNumber: '',
    street: '',
    city: '',
    state: '',
    country: 'IN',
    postalCode: '',
    isDefault: false,
  });

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === LOCATION_STATE_CHANGE_CHECKBOX.STATUS
        ? (e.target as HTMLInputElement).checked
        : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingAddress) {
        await dispatch(
          modifyAddress({ ...editingAddress, ...formData } as Address)
        ).unwrap();
      } else {
        await dispatch(createAddress(formData)).unwrap();
      }
      await dispatch(fetchAddresses());
      handleCloseModal();
    } catch (error) {
      console.error('Failed to save address:', error);
    }
  };

  const handleEdit = useCallback((address: Address) => {
    setEditingAddress(address);
    setFormData({
      addressType: address.addressType,
      name: address.name,
      phoneNumber: address.phoneNumber,
      street: address.street,
      city: address.city,
      state: address.state,
      country: address.country,
      postalCode: address.postalCode,
      isDefault: address.isDefault,
    });
    setShowModal(true);
  }, []);

  const handleRemove = useCallback((id: string) => {
    dispatch(removeAddress(id));
  }, [dispatch]);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setEditingAddress(null);
    setFormData({
      addressType: 'home',
      name: '',
      phoneNumber: '',
      street: '',
      city: '',
      state: '',
      country: 'IN',
      postalCode: '',
      isDefault: false,
    });
  }, []);

  const getAddressIcon = useCallback((addressType: string) => {
    switch (addressType) {
      case 'home':
        return <Home size={16} />;
      case 'work':
        return <Briefcase size={16} />;
      default:
        return <MapPin size={16} />;
    }
  }, []);

  if (loading) return <div className="loading-spinner">Loading addresses...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className={styles.addressesContainer}>
      <div className={styles.addressesHeader}>
        <h2>Saved Addresses</h2>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <Suspense fallback={null}><Plus size={16} /></Suspense>
          Add New Address
        </button>
      </div>

      <div className={styles.addressesList}>
        {addresses.length === 0 && !loading && !error ? (
          <p className={styles.noAddresses}>No addresses found. Add a new one!</p>
        ) : (
          addresses.map((address: Address) => (
            <div key={address._id} className={`${styles.addressCard} ${address.isDefault ? styles.default : ''}`}>
              <div>
                <div className={styles.addressHeader}>
                  <div className={styles.addressType}>
                    <Suspense fallback={null}>
                      {getAddressIcon(address.addressType)}
                    </Suspense>
                    {address.addressType}
                  </div>
                  {address.isDefault && <div className={styles.defaultBadge}>Default</div>}
                </div>
                <div className={styles.addressDetails}>
                  <h3>{address.name}</h3>
                  <p>{address.street}</p>
                  <p>
                    {address.city}, {address.state},{' '}
                    {countryList.find((c) => c.code === address.country)?.name} -{' '}
                    {address.postalCode}
                  </p>
                  <p className={styles.phoneNumber}>Phone: {address.phoneNumber}</p>
                </div>
              </div>

              <div className={styles.addressActions}>
                <button className={styles.actionButton} onClick={() => handleEdit(address)}>
                  <Suspense fallback={null}><Edit2 size={14} /></Suspense>
                </button>
                <button className={`${styles.actionButton} ${styles.delete}`} onClick={() => handleRemove(address._id)}>
                  <Suspense fallback={null}><Trash2 size={14} /></Suspense>
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
                  <Suspense fallback={null}><X size={20} /></Suspense>
                </button>
              </div>

              <form onSubmit={handleSubmit} className={styles.addressForm}>
                <div className="form-group">
                  <label className="form-label">Address Type</label>
                  <div className={styles.typeSelector}>
                    {(['home', 'work', 'other'] as const).map(addressType => (
                      <button
                        key={addressType}
                        type="button"
                        className={`${styles.typeButton} ${formData.addressType === addressType ? styles.active : ''}`}
                        onClick={() => setFormData(prev => ({ ...prev, addressType }))}
                      >
                        {addressType}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="form-input" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} className="form-input" required />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Street</label>
                  <input type="text" name="street" value={formData.street} onChange={handleInputChange} className="form-input" placeholder="House No, Building Name, Street" required />
                </div>

                <div className={styles.formRow}>
                  <div className="form-group">
                    <label className="form-label">City</label>
                    <input type="text" name="city" value={formData.city} onChange={handleInputChange} className="form-input" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">State</label>
                    <input type="text" name="state" value={formData.state} onChange={handleInputChange} className="form-input" required />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className="form-group">
                    <label className="form-label">Country</label>
                    <select name="country" value={formData.country} onChange={handleInputChange} className="form-input" required>
                      {countryList.map(country => (
                        <option key={country.code} value={country.code}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Pincode</label>
                    <input type="text" name="postalCode" value={formData.postalCode} onChange={handleInputChange} className="form-input" required />
                  </div>
                </div>

                <div className="form-group">
                  <div className={styles.defaultCheckbox}>
                    <input type="checkbox" id="isDefault" name="isDefault" checked={formData.isDefault} onChange={handleInputChange} />
                    <label htmlFor="isDefault">Make this my default address</label>
                  </div>
                </div>

                <div className={styles.modalActions}>
                  <button type="submit" className="btn btn-primary">
                    {editingAddress ? 'Update Address' : 'Save Address'}
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
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

export default memo(Addresses);