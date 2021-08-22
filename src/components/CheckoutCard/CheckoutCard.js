import { Link } from "react-router-dom";
import styles from "./CheckoutCard.module.css";

const CheckoutCard = ({ product, quantity }) => {
  return (
    <div className={`card ${styles.cartCard}`}>
      <div className={`card-content ${styles.cartCardContentContainer}`}>
        <div className={styles.cartCardContent}>
          <Link to={`/products/${product._id}`} className="link">
            <div style={{ fontSize: "1.2rem" }}>{product.modelName}</div>
            <small style={{ color: "var(--rb-dark-grey)" }}>
              Seller: {product.seller}
            </small>
            <div style={{ padding: "1rem 0" }}>
              <span style={{ fontSize: "1.5rem" }}>
                ₹{product.discountPrice}
              </span>{" "}
              <small>
                {product.discount && (
                  <span style={{ textDecoration: "line-through" }}>
                    {product.price}
                  </span>
                )}{" "}
                {product.discount && (
                  <span style={{ color: "var(--rb-green)" }}>
                    {product.discount}% off
                  </span>
                )}
              </small>
            </div>
          </Link>
        </div>
        <div className={styles.cartImgContainer}>
          <Link to={`/products/${product._id}`}>
            <img
              className={`image ${styles.image}`}
              src={product.imageUrl}
              alt=""
            />
          </Link>
          <div className={styles.qtyChangerContainer}>
            <div className={styles.quantity}>Quantity: {quantity}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CheckoutCard;
