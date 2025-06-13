import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaTag } from "react-icons/fa";
import CartHeader from "../components/CartHeader";
import CartList from "../components/CartList";
import CartSummary from "../components/CartSummary";
import AddressSection from "../components/AddressSection";
import OffersSection from "../components/OffersSection";
import CartActions from "../components/CartActions";
import RemoveModal from "../components/modals/RemoveModal";
import CouponModal from "../components/modals/CouponModal";
import ChangeAddressModal from "../components/modals/ChangeAddressModal";
import EmptyCart from "./EmptyCart";
import styles from "../components/styles/CartPage.module.css";
import type { Address, Coupon } from "../types/cart";
import {
  STATIC_COUPONS,
  STATIC_OFFERS,
  STATIC_CART_ITEMS,
  STATIC_ADDRESSES,
} from "../staticData/StaticData";

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const modal = query.get("modal");

  const [items, setItems] = useState(STATIC_CART_ITEMS);
  const [offers, setOffers] = useState<string[]>([]);
  const [addresses, setAddresses] = useState(STATIC_ADDRESSES);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(
    STATIC_ADDRESSES[0]
  );
  const [availableCoupons, setAvailableCoupons] = useState<Coupon[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [modalAction, setModalAction] = useState<"remove" | "wishlist" | null>(
    null
  );
  const [showMoreOffers, setShowMoreOffers] = useState(false);
  const [appliedCouponDiscount, setAppliedCouponDiscount] = useState(0);

  const cartListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const validCoupons = STATIC_COUPONS.filter(
      (coupon) => new Date(coupon.expires) > new Date()
    );
    setAvailableCoupons(validCoupons);
    setOffers(STATIC_OFFERS);
  }, []);

  const handleQtyChange = (id: string, quantity: number) => {
    setItems((prev) =>
      prev.map((item) => (item.productId === id ? { ...item, quantity } : item))
    );
  };

  const handleRemove = (id: string) => {
    setItems((prev) => prev.filter((item) => item.productId !== id));
  };

  const handleRemoveSelected = () => {
    setItems((prev) =>
      prev.filter((item) => !selectedItems.includes(item.productId))
    );
    setSelectedItems([]);
    navigate("/cart");
  };

  const handleMoveToWishlist = () => {
    alert("Moved selected items to wishlist (simulated)");
    setItems((prev) =>
      prev.filter((item) => !selectedItems.includes(item.productId))
    );
    setSelectedItems([]);
    setModalAction(null);
    navigate("/cart");
  };

  const handleApplyCoupon = (coupon: Coupon) => {
    setAppliedCouponDiscount(coupon.discount);
    alert(`Coupon "${coupon.code}" applied! ₹${coupon.discount} off 🎉`);
    navigate("/cart");
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
    (acc, item) => acc + (item.price - item.discount) * item.quantity,
    0
  );
  const finalPrice = totalPrice - appliedCouponDiscount;

  const handleCheckout =  () => {
    navigate("/checkout/address");
  }

  return (
    <>
      <CartHeader activeStep="BAG" />
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
              <CartActions
                items={items}
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
                setModalAction={(action) => {
                  setModalAction(action);
                  navigate("/cart?modal=remove");
                }}
                setShowRemoveModal={() => navigate("/cart?modal=remove")}
              />
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
                    APPLY 
                  </button> 
                </div>
              </div>
              <CartSummary
                totalItems={items.length}
                totalPrice={finalPrice}
                totalMRP={totalMRP}
                onCheckout={handleCheckout}
              />
            </div>
          </div>

          {modal === "remove" && (
            <RemoveModal
              showRemoveModal={true}
              modalAction={modalAction}
              selectedItems={selectedItems}
              handleRemoveSelected={handleRemoveSelected}
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
