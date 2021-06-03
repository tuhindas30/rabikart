import "../assets/css/Cart.css";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/cart-context";
import CartCard from "../components/CartCard";
import { useState } from "react";
import { PuffLoader } from "react-spinners";
import { ReactComponent as EmptyCartSvg } from "../assets/images/empty-cart-image.svg";

const Cart = () => {
  const { cartState } = useCart();
  const [isLoading, setLoading] = useState(false);
  const totalPrice = cartState.reduce(
    (acc, val) =>
      (acc = acc + val.item.product.discountedPrice * val.item.quantity),
    0
  );
  const deliveryCharge = totalPrice > 500 ? 0 : 50;

  return (
    <div className="cart-container">
      <h3 className="cart-header">
        My Cart {cartState.length > 0 && <span>({cartState.length})</span>}
      </h3>
      {cartState.length > 0 ? (
        <div className="cart-item--container">
          <div className="cart-item">
            {cartState.map(({ _id, item }) => (
              <CartCard
                key={_id}
                id={_id}
                item={item}
                setLoading={setLoading}
              />
            ))}
          </div>
          <div className="price-details">
            <header className="price-details-header">Price Details</header>
            <div className="details">
              <div className="label">Price ({cartState.length} items)</div>
              <div className="amount">₹ {totalPrice}</div>
            </div>
            {totalPrice > 500 ? (
              <div className="details">
                <div className="delivery-charges">Delivery Charges</div>
                <div className="amount">FREE</div>
              </div>
            ) : (
              <div className="details">
                <div className="delivery-charges">Delivery Charges</div>
                <div className="amount">₹ {deliveryCharge}</div>
              </div>
            )}
            <div className="total-price details">
              <div className="label">Total Price</div>
              <div className="amount">₹ {totalPrice + deliveryCharge}</div>
            </div>
          </div>
          <div className="place-order-btn">
            <button className="btn primary">Place Order</button>
          </div>
        </div>
      ) : (
        <div className="empty-cart-container">
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
          <button className="btn primary">
            <Link to="/product-listing" className="nav-links">
              Shop now
            </Link>
          </button>
        </div>
      )}
      {cartState.length > 0 && (
        <footer className="cart-footer">
          {isLoading ? (
            <PuffLoader color="var(--rb-primary)" size={22} />
          ) : (
            <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
              ₹{totalPrice}
            </p>
          )}
          <button className="btn primary">Place Order</button>
        </footer>
      )}
    </div>
  );
};
export default Cart;
