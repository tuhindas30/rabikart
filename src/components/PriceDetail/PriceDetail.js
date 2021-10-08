import { useCart } from "../../contexts/CartProvider";
import styles from "./PriceDetail.module.css";

const PriceDetail = () => {
  const { cartState } = useCart();
  return (
    <div className={styles.priceDetails}>
      <h3 className={styles.priceDetailsHeader}>Price Details</h3>
      <div className={styles.details}>
        <div className="label">Price ({cartState.items.length} items)</div>
        <div className="amount">₹ {cartState.totalPrice}</div>
      </div>
      <div className={styles.details}>
        <div className="taxes">Tax</div>
        <div className="amount">₹ 0</div>
      </div>
      <div className={styles.details}>
        <div className="delivery-charges">Delivery Charges</div>
        <div className="amount">FREE</div>
      </div>
      <div className={`${styles.totalPrice} ${styles.details}`}>
        <div className="label">Total Price</div>
        <div className="amount">₹ {cartState.totalPrice}</div>
      </div>
      <div>
        <b>N.B.: (after clicking "Continue")</b>
        <div>Test Card: 5267 3181 8797 5449</div>
        <div>Any random CVV, Any future expiry date, Any random OTP</div>
      </div>
    </div>
  );
};

export default PriceDetail;
