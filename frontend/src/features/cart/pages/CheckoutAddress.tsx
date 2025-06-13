import CartHeader from "../components/CartHeader";
import CartSummary from "../components/CartSummary";
import styles from "../components/styles/CheckoutAddress.module.css";
import { useNavigate } from "react-router-dom";

const CheckoutAddress = () => {
  const navigate = useNavigate();
  const handlePayment = () => {
    navigate("/checkout/payment");
  }
  return (
    <>
      <CartHeader activeStep="ADDRESS" />
      <div className={styles.pageWrapper}>
        {/* LEFT SIDE */}
        <div className={styles.leftSection}>
          <div className={styles.sectionTop}>
            <h2>Select Delivery Address</h2>
            <button className={styles.addNewBtn}>Add New Address</button>
          </div>

          <h4 className={styles.sectionHeading}>DEFAULT ADDRESS</h4>
          <div className={`${styles.addressCard} ${styles.active}`}>
            <div className={styles.radioName}>
              <input type="radio" checked readOnly />
              <span className={styles.name}>Siddharth Pandey</span>
              <span className={styles.tag}>HOME</span>
            </div>
            <p className={styles.addrLine}>
              99/100 Vatikapuri chitikpur rania kanpur, Rania
              <br />
              Kanpur, Uttar Pradesh - 209304
            </p>
            <p className={styles.phone}>
              Mobile: <strong>9129358930</strong>
            </p>
            <p className={styles.cod}>• Pay on Delivery available</p>

            <div className={styles.actionBtns}>
              <button className={styles.removeBtn}>REMOVE</button>
              <button className={styles.editBtn}>EDIT</button>
            </div>
          </div>

          <h4 className={styles.sectionHeading}>OTHER ADDRESS</h4>
          <div className={styles.addressCard}>
            <div className={styles.radioName}>
              <input type="radio" />
              <span className={styles.name}>Siddharth Pandey</span>
              <span className={styles.tag}>HOME</span>
            </div>
            <p className={styles.addrLine}>
              Divine PG , Mamura , Sector 66 , Noida , Uttar Pradesh, 201301,
              INDIA,
              <br />
              Noida H.O, Gautam Buddha Nagar, Uttar Pradesh - 201301
            </p>
            <p className={styles.phone}>
              Mobile: <strong>9129358930</strong>
            </p>
          </div>

          <div className={styles.addAddressText}>+ Add New Address</div>
        </div>

        {/* RIGHT SIDE */}
        <div className={styles.rightSection}>
          <div className={styles.deliveryEstimate}>
            <img
              src="https://img.icons8.com/fluency/48/000000/parcel.png"
              alt="delivery"
              className={styles.deliveryIcon}
            />
            <p>
              Estimated delivery by <strong>15 Jun 2025</strong>
            </p>
          </div>

          <div className={styles.priceBox}>
            <p>
              Total MRP <span>₹3,073</span>
            </p>
            <p>
              Discount on MRP <span className={styles.green}>- ₹308</span>
            </p>
            <p>
              Platform Fee <span>₹20</span>
            </p>
            <p>
              Shipping Fee <span className={styles.green}>FREE</span>
            </p>
            <hr />
            <p className={styles.total}>
              Total Amount <span>₹2,785</span>
            </p>
            <button
              className={styles.continueBtn}
              onClick={handlePayment}
            >
              CONTINUE
            </button>
          </div>
          {/* <CartSummary /> */}
        </div>
      </div>
    </>
  );
};

export default CheckoutAddress;
