import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartProvider";
import DefaultWithoutSearch from "../../layouts/DefaultWithoutSearch";
import styles from "./Checkout.module.css";
import { useAuth } from "../../contexts/AuthProvider";
import CheckoutCard from "../../components/CheckoutCard/CheckoutCard";
import { useEffect, useState } from "react";
import { useOrder } from "../../contexts/OrderProvider";
import PriceDetail from "../../components/PriceDetail/PriceDetail";

const Checkout = () => {
  const secret = process.env.REACT_APP_RAZORPAY_API_KEY;
  const { token, user } = useAuth();
  const { cartState, isCartLoading } = useCart();
  const { initiateOrder, confirmOrder } = useOrder();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    pin: "",
    contactNo: "",
  });

  useEffect(() => {
    if (cartState.items.length === 0 || !token) {
      navigate("/cart");
    }
  }, []);

  const handleAddressInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (isCartLoading) {
    return (
      <DefaultWithoutSearch>
        <h1 className="overlay">Loading ...</h1>
      </DefaultWithoutSearch>
    );
  }

  const displayRazorpay = async () => {
    if (!window.Razorpay) {
      alert("Something went wrong. Please try again :)");
      return;
    }

    const data = await initiateOrder(formData);

    const options = {
      key: secret,
      amount: data.orderObj.amount.toString(),
      currency: data.orderObj.currency,
      name: "RabiKart",
      description: "An e-commerce Music Store",
      image: "",
      order_id: data.orderObj.id,
      handler: (resp) => confirmOrder(data.order._id, resp),
      prefill: {
        name: user.username,
        email: user.email,
        contact: formData.contactNo,
      },
    };
    const paymentObj = new window.Razorpay(options);
    paymentObj.open();
  };

  return (
    <DefaultWithoutSearch>
      <h3 className={styles.heading}>Checkout</h3>
      <div className={styles.container}>
        <div className={styles.orderDetails}>
          <form className={styles.form}>
            <h3 style={{ textAlign: "center" }}>Delivery Address</h3>
            <label htmlFor="name">Name</label>
            <input
              value={formData.name}
              onChange={handleAddressInput}
              className={styles.input}
              type="text"
              name="name"
              required
              autoFocus
            />
            <label htmlFor="street">Street</label>
            <textarea
              value={formData.street}
              onChange={handleAddressInput}
              className={styles.input}
              type="text"
              name="street"
              rows="3"
              required
            />
            <label htmlFor="city">City</label>
            <input
              value={formData.city}
              onChange={handleAddressInput}
              className={styles.input}
              type="text"
              name="city"
              required
            />
            <label htmlFor="state">State</label>
            <input
              value={formData.state}
              onChange={handleAddressInput}
              className={styles.input}
              type="text"
              name="state"
              required
            />
            <label htmlFor="pin">Pin</label>
            <input
              value={formData.pin}
              onChange={handleAddressInput}
              className={styles.input}
              type="number"
              name="pin"
              required
            />
            <label htmlFor="contactNo">Contact</label>
            <input
              value={formData.contactNo}
              onChange={handleAddressInput}
              className={styles.input}
              type="text"
              name="contactNo"
              required
            />
          </form>
          <div className={styles.orderItem}>
            <h3 style={{ textAlign: "center" }}>Orders</h3>
            {cartState.items.map(({ product, quantity }) => (
              <CheckoutCard
                key={product._id}
                product={product}
                quantity={quantity}
              />
            ))}
          </div>
          <button
            onClick={displayRazorpay}
            className={`btn primary ${styles.payment}`}>
            Continue
          </button>
        </div>
      </div>
      <PriceDetail />
      {cartState.items.length > 0 && (
        <footer className={styles.checkoutFooter}>
          <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
            ₹ {cartState.totalPrice}
          </p>
          <button onClick={displayRazorpay} className="btn primary">
            Continue
          </button>
        </footer>
      )}
    </DefaultWithoutSearch>
  );
};
export default Checkout;
