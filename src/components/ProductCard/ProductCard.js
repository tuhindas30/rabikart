import { Link } from "react-router-dom";
import { useWishlist } from "../../contexts/WishlistProvider";
import { useCart } from "../../contexts/CartProvider";
import { useState } from "react";
import { ReactComponent as Loader } from "../../assets/images/Loader.svg";
import { BiCheckDouble } from "react-icons/bi";
import {
  FaRegHeart,
  FaHeart,
  FaStar,
  FaCartPlus,
  FaShoppingCart,
} from "react-icons/fa";
import styles from "./ProductCard.module.css";

const ProductCard = ({ product }) => {
  const {
    isWishlistLoading,
    wishlistState,
    addToWishlist,
    removeFromWishlist,
  } = useWishlist();
  const { isCartLoading, cartState, addToCart } = useCart();
  const [loader, setLoader] = useState({ cart: false, wishlist: false });

  const handleAddToCart = async (product, productId) => {
    setLoader((state) => ({ ...state, cart: true }));
    await addToCart(product, productId);
    setLoader((state) => ({ ...state, cart: false }));
  };

  const handleAddOrRemoveWishListItems = async (productId) => {
    setLoader((state) => ({ ...state, wishlist: true }));
    if (wishlistState.some((item) => item.product._id === productId)) {
      await removeFromWishlist(productId);
    } else {
      await addToWishlist(productId);
    }
    setLoader((state) => ({ ...state, wishlist: false }));
  };

  return (
    <div className={`card ${styles.productListItem}`}>
      {loader.wishlist ? (
        <div className="overlay">
          <Loader width="5rem" height="5rem" />
        </div>
      ) : (
        ""
      )}
      <button
        onClick={() => handleAddOrRemoveWishListItems(product._id)}
        className={`btn secondary flex-icon ${styles.wishIcon} ${
          isCartLoading && "disabled"
        }`}
        disabled={isWishlistLoading}>
        {wishlistState.some((item) => item.product._id === product._id) ? (
          <FaHeart color="var(--rb-red)" />
        ) : (
          <FaRegHeart />
        )}
      </button>
      <Link
        to={`/products/${product._id}`}
        className={`${styles.productImgContainer}`}>
        {!product.inStock && (
          <div className={`overlay ${styles.overlay}`}>OUT OF STOCK</div>
        )}
        <img className="image" src={product.imageUrl} alt="product" />
      </Link>
      <div>
        <Link
          to={`/products/${product._id}`}
          className={`link card-content ${styles.productCardContentContainer}`}>
          <div className={styles.modelName}>{product.modelName}</div>
          <div style={{ display: "flex", alignItems: "center" }}>
            {product.avgRating >= 4 && (
              <div
                className={`star-num rating-h flex-icon ${styles.ratingBadge}`}>
                <div style={{ marginRight: "0.2rem" }}>{product.avgRating}</div>{" "}
                <FaStar />
              </div>
            )}
            {product.avgRating >= 2 && product.avgRating < 4 && (
              <div
                className={`star-num rating-m flex-icon ${styles.ratingBadge} ${styles.ratingLow}`}>
                <div style={{ marginRight: "0.2rem" }}>{product.avgRating}</div>{" "}
                <FaStar />
              </div>
            )}
            {product.avgRating >= 0 && product.avgRating < 2 && (
              <div
                className={`star-num rating-l flex-icon ${styles.ratingBadge}`}>
                <div style={{ marginRight: "0.2rem" }}>{product.avgRating}</div>{" "}
                <FaStar />
              </div>
            )}
            {product.fastDelivery && (
              <div className={`flex-icon ${styles.fastDelivery}`}>
                <BiCheckDouble color="var(--rb-green)" />{" "}
                <span style={{ fontSize: "1rem" }}>Fast Delivery</span>
              </div>
            )}
          </div>
          <div style={{ padding: ".5rem 0" }}>
            <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
              ₹{product.discountPrice}
            </span>{" "}
            {product.discount > 0 && (
              <span
                style={{ fontSize: "1rem", textDecoration: "line-through" }}>
                {product.price}
              </span>
            )}{" "}
            {product.discount > 0 && (
              <span style={{ fontSize: "1rem", color: "var(--rb-green)" }}>
                {product.discount}% off
              </span>
            )}
          </div>
          <ul className={styles.highlights}>
            {product.highlights.map((spec) => (
              <li key={spec._id}>
                {spec.label}: {spec.value}
              </li>
            ))}
          </ul>
        </Link>
        <div style={{ padding: "1rem 0" }}>
          {cartState.items.some((item) => item.product._id === product._id) ? (
            <Link
              to="/cart"
              className={`btn links btn-link ${styles.addToCartBtn}`}>
              <div style={{ marginRight: "0.5rem" }}>GO TO CART</div>{" "}
              <FaShoppingCart />
            </Link>
          ) : (
            <button
              onClick={() => handleAddToCart(product, product._id)}
              className={`btn primary ${styles.addToCartBtn} ${
                isCartLoading ? "disabled" : ""
              }`}
              disabled={isCartLoading}>
              <div style={{ marginRight: "0.5rem" }}>
                {loader.cart ? (
                  <Loader width="2rem" height="2rem" />
                ) : (
                  "ADD TO CART"
                )}
              </div>{" "}
              <FaCartPlus />{" "}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
