import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartProvider";
import CartCard from "../../components/CartCard/CartCard";
import DefaultWithoutSearch from "../../layouts/DefaultWithoutSearch";
import styles from "./Cart.module.css";
import { ReactComponent as EmptyCartSvg } from "./EmptyCartImage.svg";
import { useAuth } from "../../contexts/AuthProvider";
import PriceDetail from "../../components/PriceDetail/PriceDetail";

const Cart = () => {
  const { token } = useAuth();
  const { cartState, isCartLoading } = useCart();

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
      <h3 className={styles.heading}>
        My Cart ({cartState.items.length > 0 && cartState.items.length})
      </h3>
      <div className={styles.container}>
        <div className={styles.cartItems}>
          {cartState.items.map(({ product, quantity }) => (
            <CartCard key={product._id} product={product} quantity={quantity} />
          ))}
          <Link
            to={token ? "/checkout" : "/signin"}
            className={`btn links btn-link ${styles.orderBtn}`}>
            Place Order
          </Link>
        </div>

        <PriceDetail />
      </div>
      {cartState.items.length > 0 && (
        <footer className={styles.cartFooter}>
          <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
            ₹{cartState.totalPrice}
          </p>
          <Link
            to={token ? "/checkout" : "/signin"}
            className={`btn links btn-link ${styles.orderBtn}`}>
            Place Order
          </Link>
        </footer>
      )}
    </DefaultWithoutSearch>
  );
};
export default Cart;
