import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartProvider";
import CartCard from "../../components/CartCard/CartCard";
import DefaultWithoutSearch from "../../layouts/DefaultWithoutSearch";
import styles from "./Cart.module.css";
import { ReactComponent as EmptyCartSvg } from "./EmptyCartImage.svg";
import { useAuth } from "../../contexts/AuthProvider";

const Cart = () => {
  const { token } = useAuth();
  const { cartState, isCartLoading } = useCart();
  const deliveryCharge = cartState.totalPrice > 500 ? 50 : 0;

  if (isCartLoading) {
    return (
      <DefaultWithoutSearch>
        <h1 className="overlay">Loading ...</h1>
      </DefaultWithoutSearch>
    );
  }

  if (cartState.items.length <= 0) {
    return (
      <DefaultWithoutSearch>
        <div className={styles.emptyCartContainer}>
          <EmptyCartSvg width="80%" />
          <p
            style={{
              fontWeight: "bold",
              fontSize: "1.2rem",
              padding: "1rem 2rem",
            }}>
            You cart is empty!
          </p>
          <p>Add items to it now</p>
          <Link to="/products" className="btn links btn-link">
            Shop now
          </Link>
        </div>
      </DefaultWithoutSearch>
    );
  }

  return (
    <DefaultWithoutSearch>
      <h3 className={styles.cartHeader}>
        My Cart ({cartState.items.length > 0 && cartState.items.length})
      </h3>
      <div className={styles.cartItemContainer}>
        <div className={styles.cartItem}>
          {cartState.items.map(({ product, quantity }) => (
            <CartCard key={product._id} product={product} quantity={quantity} />
          ))}
        </div>
        <div className={styles.priceDetails}>
          <header className={styles.priceDetailsHeader}>Price Details</header>
          <div className={styles.details}>
            <div className="label">Price ({cartState.items.length} items)</div>
            <div className="amount">₹ {cartState.totalPrice}</div>
          </div>
          <div className={styles.details}>
            <div className="delivery-charges">Delivery Charges</div>
            <div className="amount">
              {deliveryCharge > 0 ? `₹ ${deliveryCharge}` : "FREE"}
            </div>
          </div>
          <div className={`${styles.totalPrice} ${styles.details}`}>
            <div className="label">Total Price</div>
            <div className="amount">
              ₹ {cartState.totalPrice + deliveryCharge}
            </div>
          </div>
        </div>
        {token ? (
          <button className={`btn primary ${styles.placeOrder}`}>
            Place Order
          </button>
        ) : (
          <Link
            to="/signin"
            className={`btn links btn-link ${styles.placeOrder}`}>
            Place Order
          </Link>
        )}
      </div>
      {cartState.items.length > 0 && (
        <footer className={styles.cartFooter}>
          <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
            ₹{cartState.totalPrice + deliveryCharge}
          </p>
          {token ? (
            <button className="btn primary">Place Order</button>
          ) : (
            <Link
              to="/signin"
              className={`btn links btn-link ${styles.orderBtn}`}>
              Place Order
            </Link>
          )}
        </footer>
      )}
    </DefaultWithoutSearch>
  );
};
export default Cart;
