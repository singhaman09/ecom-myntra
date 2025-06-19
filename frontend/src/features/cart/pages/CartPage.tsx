import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { FaTag } from "react-icons/fa";
import CartHeader from "../components/CartHeader";
import CartList from "../components/CartList";
import { DISCOUNT, STATIC_COUPONS, STATIC_OFFERS } from "../staticData/StaticData";
import CartSummary from "../components/CartSummary";
import AddressSection from "../components/AddressSection";
import OffersSection from "../components/OffersSection";
// import CartActions from "../components/CartActions";
import RemoveModal from "../components/modals/RemoveModal";
import CouponModal from "../components/modals/CouponModal";
import ChangeAddressModal from "../components/modals/ChangeAddressModal";
import EmptyCart from "./EmptyCart";
import styles from "../components/styles/CartPage.module.css";
import type { Address, Coupon } from "../types/cart";
import {
  fetchCart,
  updateItemQuantity,
  deleteCartItem,
  moveToWishlist,
} from "../redux/cartSlice";
import type { RootState, AppDispatch } from "../../../store/store";

const CartPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { search } = useLocation();

  const query = new URLSearchParams(search);
  const modal = query.get("modal");

  const {
    cart: items,
    loading,
    error,
  } = useSelector((state: RootState) => state.cart);

  const [offers, setOffers] = useState<string[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const appliedCouponDiscount = 10;
  const [availableCoupons, setAvailableCoupons] = useState<Coupon[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [modalAction, setModalAction] = useState<"remove" | "wishlist" | null>(
    null
  );
  const [showMoreOffers, setShowMoreOffers] = useState(false);

  const cartListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  useEffect(() => {
    const validCoupons = STATIC_COUPONS.filter(
      (coupon) => new Date(coupon.expires) > new Date()
    );
    setAvailableCoupons(validCoupons);
  }, []);

  useEffect(() => {
    setOffers(STATIC_OFFERS);
  }, []);

  const handleQtyChange = (id: string, quantity: number) => {
    dispatch(updateItemQuantity({ id, quantity }));
  };

  const handleRemove = (id: string) => {
    dispatch(deleteCartItem(id));
  };


  const handleMoveToWishlist = async () => {
    await Promise.all(selectedItems.map((id) => dispatch(moveToWishlist(id))));
    setSelectedItems([]);
    navigate("/cart");
    setModalAction(null);
  };

  const handleApplyCoupon = async (coupon: Coupon) => {
    alert(`Coupon ${coupon.code} applied!`);
  };

  const handleSaveAddress = (address: Address, updatedAddresses: Address[]) => {
    setAddresses(updatedAddresses);
    setSelectedAddress(address);
    navigate("/cart");
  };

  const handleSelect = (id: string, selected: boolean) => {
    setSelectedItems((prev) =>
      selected ? [...prev, id] : prev.filter((i) => i !== id)
    );
  };

  const toggleOffersDropdown = () => setShowMoreOffers((prev) => !prev);

  const totalMRP = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const totalPrice = items.reduce(
    (acc, item) => acc + (item.price - DISCOUNT) * item.quantity,
    0
  );
  const finalPrice = totalPrice - appliedCouponDiscount;

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <>
      <CartHeader activeStep = "BAG" />
      {items.length > 0 ? (
        <div className={styles.cartPage}>
          <div className={styles.mainContent}>
            <div className={styles.leftSection}>
              <AddressSection
                address={selectedAddress}
                onChangeAddress={() => navigate("/cart?modal=address")}
              />
              <OffersSection
                offers={offers}
                showMoreOffers={showMoreOffers}
                toggleOffersDropdown={toggleOffersDropdown}
              />
              {/* <CartActions
                items={items}
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
                setModalAction={(action) => {
                  setModalAction(action);
                  navigate("/cart?modal=remove");
                }}
                setShowRemoveModal={() => navigate("/cart?modal=remove")}
              /> */}
              <div ref={cartListRef} className={styles.cartListSection}>
                <CartList
                  items={items}
                  onQuantityChange={handleQtyChange}
                  onSelect={handleSelect}
                  selectedItems={selectedItems}
                  onRemove={handleRemove}
                />
              </div>
            </div>

            <div className={styles.rightSection}>
              <div className={styles.couponsSection}>
                <div className={styles.couponsHeader}>
                  <span className={styles.couponsTitle}>COUPONS</span>
                </div>
                <div className={styles.applyCoupons}>
                  <FaTag className={styles.tagIcon} />
                  <span className={styles.applyCouponsText}>
                    Apply Coupons{" "}
                  </span>
                  <button
                    className={styles.applyButton}
                    onClick={() => navigate("/cart?modal=coupon")}
                  >
                    Apply
                  </button>
                </div>
              </div>
              <CartSummary
                totalItems={items.length}
                totalPrice={finalPrice}
                totalMRP={totalMRP}
              />
            </div>
          </div>

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
              onUpdateAddresses={(addrs) => setAddresses(addrs)}
              addresses={addresses}
            />
          )}
        </div>
      ) : (
        <EmptyCart />
      )}
    </>
  );
};

export default CartPage;
		
