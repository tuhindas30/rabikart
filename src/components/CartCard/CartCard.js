import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartProvider";
import { FaTrash } from "react-icons/fa";
import showToast from "../../utils/showToast";
import { ReactComponent as Loader } from "../../assets/images/Loader.svg";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import styles from "./CartCard.module.css";

const CartCard = ({ product, quantity }) => {
  const { increaseCartItemQuantity, decreaseCartItemQuantity, removeFromCart } =
    useCart();
  const [isLoading, setLoading] = useState(false);

  const handlePlus = async (productId, quantity) => {
    if (quantity === product.maxQuantity) {
      showToast(
        `This product can have maximum ${product.maxQuantity} quantities`
      );
      return;
    }
    setLoading(true);
    await increaseCartItemQuantity(productId, quantity);
    setLoading(false);
  };

  const handleMinus = async (productId, quantity) => {
    setLoading(true);
    await decreaseCartItemQuantity(productId, quantity);
    setLoading(false);
  };

  const remove = async (productId) => {
    setLoading(true);
    await removeFromCart(productId);
    setLoading(false);
  };

  return (
    <div className={`card ${styles.cartCard}`}>
      {isLoading ? (
        <div className="overlay">
          <Loader width="5rem" height="5rem" />
        </div>
      ) : (
        ""
      )}
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
            <button
              onClick={() => handleMinus(product._id, quantity)}
              className={`btn secondary ${styles.qtyChanger}`}
              disabled={quantity === 1}>
              <AiOutlineMinus />
            </button>
            <div className={styles.quantity}>{quantity}</div>
            <button
              onClick={() => handlePlus(product._id, quantity)}
              className={`btn secondary ${styles.qtyChanger}`}>
              <AiOutlinePlus />
            </button>
          </div>
        </div>
      </div>
      <button
        onClick={() => remove(product._id)}
        className={`btn secondary flex-icon ${styles.removeBtn}`}>
        <FaTrash />
        <span style={{ marginLeft: "0.5rem" }}>Remove</span>
      </button>
    </div>
  );
};
export default CartCard;
