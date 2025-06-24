import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaTag, FaExclamationTriangle, FaRedo } from "react-icons/fa";
import CartHeader from "../components/CartHeader";
import CartList from "../components/CartList";
import {
  DISCOUNT,
  STATIC_COUPONS,
  STATIC_OFFERS,
  STATIC_CART_ITEMS,
} from "../staticData/StaticData";
import CartSummary from "../components/CartSummary";
import AddressSection from "../components/AddressSection";
import OffersSection from "../components/OffersSection";
import RemoveModal from "../components/modals/RemoveModal";
import CouponModal from "../components/modals/CouponModal";
import ChangeAddressModal from "../components/modals/ChangeAddressModal";
import EmptyCart from "./EmptyCart";
import styles from "../components/styles/CartPage.module.css";
import type { Address, Coupon, CartItem } from "../types/cart";
import { 
  getCartAPI, 
  removeCartItemAPI, 
  incrementCartItemQuantityAPI, 
  decrementCartItemQuantityAPI,
  moveItemToWishlistAPI 
} from "../api/cartApi";
import RecommendedProduct from "../components/RecommendedProducts";
import { toast } from 'react-toastify';
import { useAppSelector, useAppDispatch } from '../../profile/redux/hooks';
import { fetchAddresses } from '../../profile/redux/slices/addressSlice';
import type { Address as ProfileAddress } from '../../profile/types/profile.types';

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const modal = query.get("modal");

  // State management
  const [offers, setOffers] = useState<string[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [appliedCouponDiscount] = useState(10);
  const [availableCoupons, setAvailableCoupons] = useState<Coupon[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [modalAction, setModalAction] = useState<"remove" | "wishlist" | null>(null);
  const [showMoreOffers, setShowMoreOffers] = useState(false);

  // API states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(false);

  const dispatch = useAppDispatch();
  const { items: profileAddresses = [], loading: addressLoading } = useAppSelector((state) => state.address);

  // Map profile addresses to cart addresses
  const mappedAddresses = profileAddresses.map((addr: ProfileAddress) => ({
    id: addr._id,
    name: addr.name,
    street: addr.street,
    city: addr.city,
    state: addr.state,
    zip: addr.postalCode,
    phone: addr.phoneNumber,
    isDefault: addr.isDefault,
  }));

  // Set default address as selected if not set
  useEffect(() => {
    if (profileAddresses.length === 0 && !addressLoading) {
      dispatch(fetchAddresses());
    }
    if (!selectedAddress && mappedAddresses.length > 0) {
      const defaultAddr = mappedAddresses.find(addr => addr.isDefault) || mappedAddresses[0];
      setSelectedAddress(defaultAddr);
    }
  }, [dispatch, profileAddresses.length, addressLoading, mappedAddresses.length]);

  // Fetch cart data from API
  const fetchCartData = async () => {
    try {
      setLoading(true);
      setError(null);
      setIsOffline(false);
      
      const cartItems = await getCartAPI();
      
      // Set offers and coupons
      setOffers(STATIC_OFFERS);
      const validCoupons = STATIC_COUPONS.filter(
        (coupon) => new Date(coupon.expires) > new Date()
      );
      setAvailableCoupons(validCoupons);
      
    } catch (err: any) {
      console.error("Error fetching cart data:", err);
      
      // Check if it's a network error or server error
      if (err.code === 'NETWORK_ERROR' || err.message?.includes('Network Error')) {
        // setError("Unable to connect to server. Please check your internet connection.");
        setIsOffline(true);
        setOffers([]);
        toast.error("Unable to connect to server. Please check your internet connection.");
      } else if (err.response?.status === 401) {
        setError("Please login to view your cart.");
        setOffers([]);
        toast.error("Please login to view your cart.");
      } else if (err.response?.status === 404) {
        setError("Cart not found.");
        setOffers([]);
      } else {
        setError("Unable to fetch cart data. Please try again later.");
        setOffers([]);
        toast.error("Unable to fetch cart data. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchCartData();
  }, []);

  // Handle quantity change
  const handleQtyChange = async (
    productId: string,
    action: "increment" | "decrement"
  ) => {
    try {
      if (isOffline) {
        toast.error("Cannot update cart while offline. Please check your connection.");
        return;
      }

      // API call for online mode
      let updatedItems: CartItem[];
      if (action === "increment") {
        updatedItems = await incrementCartItemQuantityAPI(productId);
      } else {
        updatedItems = await decrementCartItemQuantityAPI(productId);
      }
      
      toast.success(`Quantity ${action === "increment" ? "increased" : "decreased"} successfully!`);
      
    } catch (err: any) {
      console.error(`Error ${action}ing quantity:`, err);
      toast.error(`Failed to ${action} quantity. Please try again.`);
    }
  };

  // Handle remove item
  const handleRemove = async (productId: string) => {
    try {
      if (isOffline) {
        toast.error("Cannot remove items while offline. Please check your connection.");
        return;
      }

      // API call for online mode
      const updatedItems = await removeCartItemAPI(productId);
      toast.success("Item removed from cart!");
      
    } catch (err: any) {
      console.error("Error removing item:", err);
      toast.error("Failed to remove item. Please try again.");
    }
  };

  // Handle move to wishlist
  const handleMoveToWishlist = async () => {
    try {
      if (isOffline) {
        toast.error("Cannot move items while offline. Please check your connection.");
        return;
      }

      // API call for online mode
      const promises = selectedItems.map((productId) => 
        moveItemToWishlistAPI(productId)
      );
      
      await Promise.all(promises);
      
      // Refresh cart data
      const updatedItems = await getCartAPI();
      navigate("/cart");
      setSelectedItems([]);
      setModalAction(null);
      toast.success("Items moved to wishlist!");
      
    } catch (err: any) {
      console.error("Error moving items to wishlist:", err);
      toast.error("Failed to move items to wishlist. Please try again.");
    }
  };

  const handleApplyCoupon = async (coupon: Coupon) => {
    toast.success(`Coupon ${coupon.code} applied successfully!`);
  };

  const handleSaveAddress = (address: Address, updatedAddresses: Address[]) => {
    setSelectedAddress(address);
    navigate("/cart");
  };

  const toggleOffersDropdown = () => setShowMoreOffers((prev) => !prev);

  // Calculate totals using STATIC_CART_ITEMS
  const totalMRP = STATIC_CART_ITEMS.reduce((acc, item) => {
    const price = typeof item.price === "number" ? item.price : 0;
    const quantity = typeof item.quantity === "number" ? item.quantity : 0;
    return acc + price * quantity;
  }, 0);

  const totalPrice = STATIC_CART_ITEMS.reduce((acc, item) => {
    const price = typeof item.price === "number" ? item.price : 0;
    const quantity = typeof item.quantity === "number" ? item.quantity : 0;
    return acc + (price - DISCOUNT) * quantity;
  }, 0);

  const finalPrice = totalPrice - appliedCouponDiscount;

  // Error component
  const ErrorMessage = () => (
    <div className={styles.errorContainer}>
      <div className={styles.errorContent}>
        <FaExclamationTriangle className={styles.errorIcon} />
        <h3 className={styles.errorTitle}>Unable to Fetch Cart Data</h3>
        <p className={styles.errorMessage}>{error}</p>
        <button 
          className={styles.retryButton}
          onClick={fetchCartData}
          disabled={loading}
        >
          <FaRedo className={styles.retryIcon} />
          {loading ? "Retrying..." : "Retry"}
        </button>
      </div>
    </div>
  );

  // Loading component
  const LoadingSpinner = () => (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingSpinner}></div>
      <p className={styles.loadingText}>Loading your cart...</p>
    </div>
  );

  return (
    <>
      <CartHeader activeStep="BAG" />
      
      {loading ? (
        <LoadingSpinner />
      ) : error && STATIC_CART_ITEMS.length === 0 ? (
        <ErrorMessage />
      ) : (
        <div className={styles.cartPage}>
          {/* Show error banner if there's an error but we have data */}
          {error && STATIC_CART_ITEMS.length > 0 && (
            <div className={styles.errorBanner}>
              <FaExclamationTriangle className={styles.errorBannerIcon} />
              <span className={styles.errorBannerText}>{error}</span>
              <button 
                className={styles.errorBannerRetry}
                onClick={fetchCartData}
                disabled={loading}
              >
                Retry
              </button>
            </div>
          )}

          <div className={styles.mainContent}>
            <div className={styles.leftSection}>
              <AddressSection
                address={selectedAddress}
                onChangeAddress={() => navigate("/cart?modal=address")}
                onAddAddress={() => navigate("/cart?modal=address")}
              />
              <OffersSection
                offers={offers}
                showMoreOffers={showMoreOffers}
                toggleOffersDropdown={toggleOffersDropdown}
              />
              <div className={styles.cartListSection}>
                <CartList
                  items={STATIC_CART_ITEMS}
                  onQuantityChange={handleQtyChange}
                  onRemove={handleRemove}
                  onMoveToWishlist={handleMoveToWishlist}
                />
              </div>
            </div>

            <div className={styles.rightSection}>
              <div className={styles.couponsSection}>
                <div className={styles.couponsHeader}>
                  <span className={styles.couponsTitle}>COUPONS</span>
                  <FaTag className={styles.tagIcon} />
                </div>
                <div className={styles.applyCoupons}>
                  <span className={styles.applyCouponsText}>Apply Coupons</span>
                  <button
                    className={styles.applyButton}
                    onClick={() => navigate("/cart?modal=coupon")}
                  >
                    Apply
                  </button>
                </div>
              </div>
              {STATIC_CART_ITEMS.length > 0 && (
                <CartSummary
                  totalItems={STATIC_CART_ITEMS.length}
                  totalPrice={Number.isNaN(finalPrice) ? 0 : finalPrice}
                  totalMRP={Number.isNaN(totalMRP) ? 0 : totalMRP}
                />
              )}
            </div>
          </div>

          <RecommendedProduct />

          {modal === "remove" && (
            <RemoveModal
              showRemoveModal={true}
              modalAction={modalAction}
              selectedItems={selectedItems}
              handleMoveToWishlist={handleMoveToWishlist}
              setShowRemoveModal={() => navigate("/cart")}
              setModalAction={setModalAction}
            />
          )}

          {modal === "coupon" && (
            <CouponModal
              isOpen={true}
              onClose={() => navigate("/cart")}
              onApplyCoupon={handleApplyCoupon}
              availableCoupons={availableCoupons}
            />
          )}

          {modal === "address" && (
            <ChangeAddressModal
              isOpen={true}
              onClose={() => navigate("/cart")}
              onSave={handleSaveAddress}
              onUpdateAddresses={() => {}}
              addresses={mappedAddresses}
            />
          )}
        </div>
      )}
    </>
  );
};

export default CartPage;
