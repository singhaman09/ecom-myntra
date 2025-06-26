import React, { useEffect, useState, Suspense, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaTag, FaExclamationTriangle, FaRedo } from "react-icons/fa";
import CartHeader from "../components/CartHeader";
import CartList from "../components/CartList";
import {
  DISCOUNT,
  STATIC_COUPONS,
  STATIC_OFFERS,
  // for dummy data -> uncomment this 
  STATIC_CART_ITEMS,
} from "../staticData/StaticData";
import CartSummary from "../components/CartSummary";
import OffersSection from "../components/OffersSection";
import RemoveModal from "../components/modals/RemoveModal";
import CouponModal from "../components/modals/CouponModal";
import ChangeAddressModal from "../components/modals/ChangeAddressModal";
// import EmptyCart from "./EmptyCart";
import styles from "../components/styles/CartPage.module.css";
import type { Address, CartItem } from "../types/cart";
import {
  getCartAPI,
  removeCartItemAPI,
  incrementCartItemQuantityAPI,
  decrementCartItemQuantityAPI,
  moveItemToWishlistAPI,
} from "../api/cartApi";
import RecommendedProduct from "../components/RecommendedProducts";
import { toast } from "react-toastify";
import { useAppSelector, useAppDispatch } from "../../profile/redux/hooks";
import { fetchAddresses } from "../../profile/redux/slices/addressSlice";
import type { Address as ProfileAddress } from "../../profile/types/profile.types";
import gsap from "gsap";

const FooterCart = React.lazy(() => import("../components/FooterCart"));

const AddressSection = React.lazy(() => import("../components/AddressSection"));

const ITEMS_PER_PAGE = 5;

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const modal = query.get("modal");

  // State management
  const [offers, setOffers] = useState<string[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [availableCoupons] = useState(STATIC_COUPONS);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [modalAction, setModalAction] = useState<"remove" | "wishlist" | null>(
    null
  );
  const [showMoreOffers, setShowMoreOffers] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  
  // const [cartItems, setCartItems] = useState<CartItem[]>([]); // for API CALLS
  const [cartItems, setCartItems] = useState<CartItem[]>(STATIC_CART_ITEMS); // For STATIC data
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // API states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(false);

  const dispatch = useAppDispatch();
  const { items: profileAddresses = [], loading: addressLoading } =
    useAppSelector((state) => state.address);

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
      const defaultAddr =
        mappedAddresses.find((addr) => addr.isDefault) || mappedAddresses[0];
      setSelectedAddress(defaultAddr);
    }
  }, [
    dispatch,
    profileAddresses.length,
    addressLoading,
    mappedAddresses.length,
  ]);

  // Fetch cart data from API
  const fetchCartData = async () => {
    try {
      setLoading(true);
      setError(null);
      setIsOffline(false);

      const apiCartItems = await getCartAPI();
      if (Array.isArray(apiCartItems) && apiCartItems.length > 0) {
        setCartItems(apiCartItems);
      } else {
        setCartItems(STATIC_CART_ITEMS); // fallback to static data
      }

      // Set offers and coupons
      setOffers(STATIC_OFFERS);
    } catch (err: any) {
      console.error("Error fetching cart data:", err);
      if (
        err.code === "NETWORK_ERROR" ||
        err.message?.includes("Network Error")
      ) {
        setIsOffline(true);
        setOffers([]);
        toast.error(
          "Unable to connect to server. Please check your internet connection."
        );
      } else if (err.response?.status === 401 || err.response?.status === 404) {
        setError("Please login to view your cart.");
        setOffers([]);
        toast.error("Please login to view your cart.");
      } else {
        setError("Unable to fetch cart data. Please try again later.");
        setOffers([]);
        toast.error("Unable to fetch cart data. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

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
        toast.error(
          "Cannot update cart while offline. Please check your connection."
        );
        return;
      }
      if (action === "increment") {
        await incrementCartItemQuantityAPI(productId);
      } else {
        await decrementCartItemQuantityAPI(productId);
      }
      toast.success(
        `Quantity ${
          action === "increment" ? "increased" : "decreased"
        } successfully!`
      );
    } catch (err: any) {
      console.error(`Error ${action}ing quantity:`, err);
      toast.error(`Failed to ${action} quantity. Please try again.`);
    }
  };

  // Handle remove item
  const handleRemove = async (productId: string) => {
    try {
      if (isOffline) {
        toast.error(
          "Cannot remove items while offline. Please check your connection."
        );
        return;
      }
      await removeCartItemAPI(productId);
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
        toast.error(
          "Cannot move items while offline. Please check your connection."
        );
        return;
      }
      const promises = selectedItems.map((productId) =>
        moveItemToWishlistAPI(productId)
      );
      await Promise.all(promises);
      await getCartAPI();
      navigate("/cart");
      setSelectedItems([]);
      setModalAction(null);
      toast.success("Items moved to wishlist!");
    } catch (err: any) {
      console.error("Error moving items to wishlist:", err);
      toast.error("Failed to move items to wishlist. Please try again.");
    }
  };

  const handleApplyCoupon = (coupon: any) => {
    setAppliedCoupon(coupon);
    toast.success(`Coupon ${coupon.code} applied successfully!`);
  };

  const handleSaveAddress = (address: Address) => {
    setSelectedAddress(address);
    navigate("/cart");
  };

  const toggleOffersDropdown = () => setShowMoreOffers((prev) => !prev);

  // Calculate totals using cartItems
  const totalMRP = cartItems.reduce((acc, item) => {
    const price = typeof item.price === "number" ? item.price : 0;
    const quantity = typeof item.quantity === "number" ? item.quantity : 0;
    return acc + price * quantity;
  }, 0);

  const totalPrice = cartItems.reduce((acc, item) => {
    const price = typeof item.price === "number" ? item.price : 0;
    const quantity = typeof item.quantity === "number" ? item.quantity : 0;
    return acc + (price - DISCOUNT) * quantity;
  }, 0);

  const finalPrice = totalPrice - (appliedCoupon ? DISCOUNT : 0);

  // Sort items so latest added are first (assuming last in array is latest)
  const sortedCartItems = [...cartItems].reverse();
  const totalPages = Math.ceil(sortedCartItems.length / ITEMS_PER_PAGE);
  const paginatedItems = sortedCartItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const headerRef = useRef(null);
  const mainContentRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
    );
    gsap.fromTo(
      mainContentRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.9, delay: 0.2, ease: "power3.out" }
    );
  }, []);

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
      <div ref={headerRef}>
        <CartHeader activeStep="BAG" />
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : error && cartItems.length === 0 ? (
        <ErrorMessage />
      ) : (
        <div className={styles.cartPage}>
          {/* Show error banner if there's an error but we have data */}
          {error && cartItems.length > 0 && (
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

          <div className={styles.mainContent} ref={mainContentRef}>
            <div className={styles.leftSection}>
              <Suspense fallback={<div>Loading address...</div>}>
                <AddressSection
                  address={selectedAddress}
                  onChangeAddress={() => navigate("/cart?modal=address")}
                  onAddAddress={() => navigate("/cart?modal=address")}
                />
              </Suspense>
              <OffersSection
                offers={STATIC_OFFERS}
                showMoreOffers={showMoreOffers}
                toggleOffersDropdown={toggleOffersDropdown}
              />
              <div className={styles.cartListSection}>
                <CartList
                  items={paginatedItems}
                  onQuantityChange={handleQtyChange}
                  onRemove={handleRemove}
                  onMoveToWishlist={handleMoveToWishlist}
                />
                {totalPages > 1 && cartItems.length > ITEMS_PER_PAGE && (
                  <div className={styles.paginationControls}>
                    <button
                      onClick={() => setCurrentPage(1)}
                      disabled={currentPage === 1}
                      className={styles.paginationBtn}
                      aria-label="First page"
                    >
                      First
                    </button>
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className={styles.paginationBtn}
                      aria-label="Previous page"
                    >
                      Prev
                    </button>
                    {/* Page numbers */}
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className={
                          currentPage === i + 1
                            ? `${styles.paginationBtn} ${styles.activePage}`
                            : styles.paginationBtn
                        }
                        aria-label={`Page ${i + 1}`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className={styles.paginationBtn}
                      aria-label="Next page"
                    >
                      Next
                    </button>
                    <button
                      onClick={() => setCurrentPage(totalPages)}
                      disabled={currentPage === totalPages}
                      className={styles.paginationBtn}
                      aria-label="Last page"
                    >
                      Last
                    </button>
                    <span className={styles.paginationInfo}>
                      Page {currentPage} of {totalPages}
                    </span>
                  </div>
                )}
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
              {cartItems.length > 0 && (
                <CartSummary
                  totalItems={cartItems.length}
                  totalPrice={Number.isNaN(finalPrice) ? 0 : finalPrice}
                  totalMRP={Number.isNaN(totalMRP) ? 0 : totalMRP}
                  appliedCoupon={appliedCoupon}
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
      <FooterCart
        totalPrice={Number.isNaN(finalPrice) ? 0 : finalPrice}
        savings={
          Number.isNaN(totalMRP - finalPrice) ? 0 : totalMRP - finalPrice
        }
        onPlaceOrder={() => {
          /* TODO: handle place order */
        }}
      />
    </>
  );
};

export default CartPage;
