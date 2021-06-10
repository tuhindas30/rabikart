import { Link } from "react-router-dom";
import { useWishlist } from "../../contexts/WishlistProvider";
import styles from "./WishCard.module.css";
import { AiOutlineCloseCircle } from "react-icons/ai";

const WishCard = ({ product }) => {
  const { removeFromWishlist } = useWishlist();

  const handleRemoveWishlistItem = async (productId) => {
    await removeFromWishlist(productId);
  };

  return (
    <div className={`card ${styles.wishCard}`}>
      <button
        onClick={() => handleRemoveWishlistItem(product._id)}
        className={`btn secondary flex-icon ${styles.removeWishBtn}`}>
        <AiOutlineCloseCircle />
      </button>
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
