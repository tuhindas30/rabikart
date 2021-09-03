import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartProvider";
import DefaultWithoutSearch from "../../layouts/DefaultWithoutSearch";
import CartCard from "../../components/CartCard/CartCard";
import PriceDetail from "../../components/PriceDetail/PriceDetail";
import { ReactComponent as EmptyCartSvg } from "./EmptyCartImage.svg";
import { ReactComponent as Loader } from "../../assets/images/Loader.svg";
import styles from "./Cart.module.css";

const Cart = () => {
  const { cartState, isCartLoading } = useCart();

  if (isCartLoading) {
    return (
      <DefaultWithoutSearch>
        <div className="overlay">
          <Loader />
        </div>
      </DefaultWithoutSearch>
    );
  }

  if (cartState.items.length === 0) {
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
            to="/checkout"
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
            to="/checkout"
            className={`btn links btn-link ${styles.footerOrderBtn}`}>
            Place Order
          </Link>
        </footer>
      )}
    </DefaultWithoutSearch>
  );
};
export default Cart;
