import { useState } from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../../contexts/WishlistProvider";
import { ReactComponent as Loader } from "../../assets/images/Loader.svg";
import { AiOutlineCloseCircle } from "react-icons/ai";
import styles from "./WishCard.module.css";

const WishCard = ({ product }) => {
  const { removeFromWishlist } = useWishlist();
  const [isLoading, setLoading] = useState(false);

  const remove = async (id) => {
    setLoading(true);
    await removeFromWishlist(id);
    setLoading(false);
  };

  return (
    <div className={`card ${styles.wishCard}`}>
      <button
        onClick={() => remove(product._id)}
        className={`btn secondary flex-icon ${styles.removeWishBtn}`}>
        <AiOutlineCloseCircle />
      </button>
      {isLoading ? (
        <div className="overlay">
          <Loader width="5rem" height="5rem" />
        </div>
      ) : (
        ""
      )}
      <Link to={`/products/${product._id}`} className="link">
        <img
          className={styles.wishCardImage}
          src={product.imageUrl}
          alt="product"
        />
        <div className="card-content">
          <p style={{ color: "var(--rb-very-dark-grey)", fontSize: "0.8rem" }}>
            {product.modelName}
          </p>
          <p style={{ padding: "0.5rem 0", fontSize: "1.1rem" }}>
            ₹{product.discountPrice}
          </p>
        </div>
      </Link>
    </div>
  );
};
export default WishCard;
