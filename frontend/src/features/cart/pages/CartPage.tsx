import React, { useEffect, useState, Suspense, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaTag, FaExclamationTriangle } from "react-icons/fa";
import CartHeader from "../components/CartHeader";
import CartList from "../components/CartList";
import {
  DISCOUNT,
  STATIC_COUPONS,
  STATIC_OFFERS,
  STATIC_CART_ITEMS,
  STATIC_ADDRESSES,
} from "../staticData/StaticData";
import { CartModalAction, CartActionType, CartModalType } from "../types/cartEnums";
import { removeCartItemAPI, moveItemToWishlistAPI } from "../api/cartApi";
import { toast } from "react-toastify";
import { useAppSelector, useAppDispatch } from "../../profile/redux/hooks";
import { fetchAddresses } from "../../profile/redux/slices/addressSlice";
import type { Address as ProfileAddress } from "../../profile/types/profile.types";
import type { Address, CartItem, Coupon } from "../types/cart";
import gsap from "gsap";
import {
  incrementItemQuantity,
  decrementItemQuantity,
  fetchCart,
} from "../redux/cartSlice";
import EmptyCart from "./EmptyCart";
import axios, { AxiosError } from "axios";
import styles from "../components/styles/CartPage.module.css";

const FooterCart = React.lazy(() => import("../components/FooterCart"));
const AddressSection = React.lazy(() => import("../components/AddressSection"));
const RemoveModal = React.lazy(() => import("../components/modals/RemoveModal"));
const CouponModal = React.lazy(() => import("../components/modals/CouponModal"));
const ChangeAddressModal = React.lazy(() => import("../components/modals/ChangeAddressModal"));
const OffersSection = React.lazy(() => import("../components/OffersSection"));
const CartSummary = React.lazy(() => import("../components/CartSummary"));
const RecommendedProduct = React.lazy(() => import("../components/RecommendedProducts"));

const ITEMS_PER_PAGE = 5;

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const modal = query.get("modal") as CartModalType | null;

  // State management
  const [offers, setOffers] = useState<string[]>(STATIC_OFFERS);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [availableCoupons] = useState<Coupon[]>(STATIC_COUPONS);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [modalAction, setModalAction] = useState<CartModalAction | null>(null);
  const [showMoreOffers, setShowMoreOffers] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(false);
  const [loadingItemId, setLoadingItemId] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const { items: profileAddresses = [], loading: addressLoading } =
    useAppSelector((state) => state.address);
  const cartItems = useAppSelector((state) => state.cart.cart) as CartItem[];

  // Map profile addresses to cart addresses
  const mappedAddresses: Address[] = profileAddresses.map(
    (addr: ProfileAddress) => ({
      id: addr._id,
      name: addr.name,
      street: addr.street,
      city: addr.city,
      state: addr.state,
      zip: addr.postalCode,
      phone: addr.phoneNumber,
      isDefault: addr.isDefault,
    })
  );

  // Set default address
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
    mappedAddresses,
    selectedAddress,
  ]);

  // Fetch cart data with retry mechanism
  const fetchCartData = async () => {
    try {
      setLoading(true);
      setError(null);
      setIsOffline(false);

      await dispatch(fetchCart()).unwrap();
      setOffers(STATIC_OFFERS);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (
          err.code === "NETWORK_ERROR" ||
          err.message?.includes("Network Error")
        ) {
          setIsOffline(true);
          toast.error(
            "Unable to connect to server. Please check your connection."
          );
        } else if (err.response?.status === 401 || err.response?.status === 404) {
          setError("Please login to view your cart.");
          toast.error("Please login to view your cart.");
        } else {
          setError("Unable to fetch cart data. Please try again later.");
          toast.error("Unable to fetch cart data. Please try again later.");
        }
      } else {
        setError("An unexpected error occurred.");
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, [dispatch]);

  // Debounced quantity change handler
  const handleQtyChange = async (
    productId: string,
    action: CartActionType
  ) => {
    try {
      if (isOffline) {
        toast.error(
          "Cannot update cart while offline. Please check your connection."
        );
        return;
      }
      setLoadingItemId(productId);
      if (action === CartActionType.INCREMENT) {
        await dispatch(incrementItemQuantity(productId)).unwrap();
      } else {
        await dispatch(decrementItemQuantity(productId)).unwrap();
      }
      await dispatch(fetchCart());
      toast.success(
        `Quantity ${
          action === CartActionType.INCREMENT ? "increased" : "decreased"
        } successfully!`
      );
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error(`Error ${action}ing quantity:`, err);
        toast.error(`Failed to ${action} quantity. Please try again.`);
      } else {
        console.error(`Unexpected error ${action}ing quantity:`, err);
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setLoadingItemId(null);
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
      setLoadingItemId(productId);
      await removeCartItemAPI(productId);
      await dispatch(fetchCart());
      toast.success("Item removed from cart!");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("Error removing item:", err);
        toast.error("Failed to remove item. Please try again.");
      } else {
        console.error("Unexpected error removing item:", err);
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setLoadingItemId(null);
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
      await dispatch(fetchCart());
      navigate("/cart");
      setSelectedItems([]);
      setModalAction(null);
      toast.success("Items moved to wishlist!");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("Error moving items to wishlist:", err);
        toast.error("Failed to move items to wishlist. Please try again.");
      } else {
        console.error("Unexpected error moving items to wishlist:", err);
        toast.error("An unexpected error occurred.");
      }
    }
  };

  const handleApplyCoupon = (coupon: Coupon) => {
    setAppliedCoupon(coupon);
    toast.success(`Coupon ${coupon.code} applied successfully!`);
  };

  const handleSaveAddress = (address: Address) => {
    setSelectedAddress(address);
    navigate("/cart");
  };

  const toggleOffersDropdown = () => setShowMoreOffers((prev) => !prev);

  // Use static data if cart is empty or error/server error
  const shouldShowStatic = !loading && (isOffline || !!error);
  const fallbackCartItems = shouldShowStatic ? STATIC_CART_ITEMS : cartItems;
  const fallbackOffers = shouldShowStatic ? STATIC_OFFERS : offers;
  const fallbackCoupons = shouldShowStatic ? STATIC_COUPONS : availableCoupons;
  const fallbackAddresses =
    shouldShowStatic && STATIC_ADDRESSES.length > 0
      ? STATIC_ADDRESSES
      : mappedAddresses;

  // Calculate totals with validation
  const calculateTotals = () => {
    const totalMRP = fallbackCartItems.reduce((acc, item) => {
      const price =
        typeof item.price === "number" && !isNaN(item.price) ? item.price : 0;
      const quantity =
        typeof item.quantity === "number" && !isNaN(item.quantity)
          ? item.quantity
          : 0;
      return acc + price * quantity;
    }, 0);

    const totalPrice = fallbackCartItems.reduce((acc, item) => {
      const price =
        typeof item.price === "number" && !isNaN(item.price) ? item.price : 0;
      const quantity =
        typeof item.quantity === "number" && !isNaN(item.quantity)
          ? item.quantity
          : 0;
      return acc + (price - DISCOUNT) * quantity;
    }, 0);

    const finalPrice =
      totalPrice - (appliedCoupon ? appliedCoupon.discount : 0);

    // Debug logging to verify totals
    console.log("CartSummary Props:", {
      totalItems: fallbackCartItems.length,
      totalMRP,
      totalPrice,
      finalPrice,
      appliedCoupon,
    });

    return { totalMRP, totalPrice, finalPrice };
  };
  const { totalMRP, totalPrice, finalPrice } = calculateTotals();

  // Pagination for fallbackCartItems
  const sortedCartItems = [...(fallbackCartItems || [])].reverse();
  const totalPages = Math.ceil(sortedCartItems.length / ITEMS_PER_PAGE);
  const paginatedItems = sortedCartItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const headerRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);

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
      ) : fallbackCartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className={styles.cartPage}>
          {error && (
            <div className={styles.errorBanner}>
              <FaExclamationTriangle className={styles.errorBannerIcon} />
              <span className={styles.errorBannerText}>{error}</span>
              <button
                className={styles.errorBannerRetry}
                onClick={() => fetchCartData()}
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
                  address={selectedAddress || fallbackAddresses[0]}
                  onChangeAddress={() => navigate("/cart?modal=address")}
                  onAddAddress={() => navigate("/cart?modal=address")}
                />
              </Suspense>
              <Suspense fallback={<div>Loading offers...</div>}>
                <OffersSection
                  offers={fallbackOffers}
                  showMoreOffers={showMoreOffers}
                  toggleOffersDropdown={toggleOffersDropdown}
                />
              </Suspense>
              <div className={styles.cartListSection}>
                <CartList
                  items={paginatedItems}
                  onQuantityChange={handleQtyChange}
                  onRemove={handleRemove}
                  onMoveToWishlist={handleMoveToWishlist}
                  loadingItemId={loadingItemId}
                />
                {totalPages > 1 && (
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
                      onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }
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
              <Suspense fallback={<div>Loading summary...</div>}>
                {/* Ensure CartSummary is rendered with valid props */}
                {totalMRP !== 0 || totalPrice !== 0 || finalPrice !== 0 ? (
                  <CartSummary
                    totalItems={fallbackCartItems.length}
                    totalPrice={finalPrice}
                    totalMRP={totalMRP}
                    appliedCoupon={appliedCoupon}
                  />
                ) : (
                  <div className={styles.summaryFallback}>
                    Unable to display cart summary due to invalid data.
                  </div>
                )}
              </Suspense>
            </div>
          </div>

          <Suspense fallback={<div>Loading recommendations...</div>}>
            <RecommendedProduct />
          </Suspense>

          {modal === CartModalType.REMOVE && (
            <Suspense fallback={<div>Loading modal...</div>}>
              <RemoveModal
                showRemoveModal={true}
                modalAction={modalAction}
                selectedItems={selectedItems}
                handleMoveToWishlist={handleMoveToWishlist}
                setShowRemoveModal={() => navigate("/cart")}
                setModalAction={setModalAction}
              />
            </Suspense>
          )}

          {modal === CartModalType.COUPON && (
            <Suspense fallback={<div>Loading modal...</div>}>
              <CouponModal
                isOpen={true}
                onClose={() => navigate("/cart")}
                onApplyCoupon={handleApplyCoupon}
                availableCoupons={fallbackCoupons}
              />
            </Suspense>
          )}

          {modal === CartModalType.ADDRESS && (
            <Suspense fallback={<div>Loading modal...</div>}>
              <ChangeAddressModal
                isOpen={true}
                onClose={() => navigate("/cart")}
                onSave={handleSaveAddress}
                onUpdateAddresses={() => dispatch(fetchAddresses())}
                addresses={fallbackAddresses}
              />
            </Suspense>
          )}
        </div>
      )}
      <Suspense fallback={<div>Loading footer...</div>}>
        <FooterCart
          totalPrice={finalPrice}
          savings={totalMRP - finalPrice}
          onPlaceOrder={() => {
            navigate("/payment", {
              state: {
                totalMRP,
                totalPrice,
                finalPrice,
                appliedCoupon,
                totalItems: fallbackCartItems.length,
              },
            });
          }}
        />
      </Suspense>
    </>
  );
};

export default CartPage;