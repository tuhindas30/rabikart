import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../contexts/cart-context";
import CartCard from "./CartCard";

const Cart = () => {
  const { cartState } = useCart();

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartState));
  }, [cartState]);

  useEffect(() => {
    JSON.parse(localStorage.getItem("cartItems"));
  }, []);

  return (
    <div className="cart-container">
      <h3 className="cart-header">My Cart</h3>
      {cartState.length > 0 ? (
        cartState.map((item) => <CartCard key={item.id} item={item} />)
      ) : (
        <div className="empty-cart-container">
          <div className="empty-cart-image-container">
            <img
              className="image"
              src="images/empty-cart-image.svg"
              alt="Your cart"
            />
          </div>
          <p
            style={{
              fontWeight: "bold",
              fontSize: "1.2rem",
              padding: "1rem 2rem",
            }}
          >
            You cart is empty!
          </p>
          <p>Add items to it now</p>
          <button className="btn primary">
            <Link to="/product-listing" className="nav-links">
              Shop now
            </Link>
          </button>
        </div>
      )}
      {cartState.length > 0 && (
        <footer className="cart-footer">
          <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
            ₹
            {cartState.reduce(
              (acc, val) => (acc = acc + val.price * val.qty),
              0
            )}
          </p>
          <button className="btn primary">Place Order</button>
        </footer>
      )}
    </div>
  );
};
export default Cart;
