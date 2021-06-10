import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { useCart } from "../../contexts/CartProvider";
import { useProducts } from "../../contexts/ProductsProvider";
import { useWishlist } from "../../contexts/WishlistProvider";
import styles from "./Product.module.css";
import { BiCheckDouble } from "react-icons/bi";
import DefaultWithoutSearch from "../../layouts/DefaultWithoutSearch";
import {
  FaRegHeart,
  FaHeart,
  FaStar,
  FaCartPlus,
  FaShoppingCart,
} from "react-icons/fa";
import { ReactComponent as EmptyProductSvg } from "./EmptyProductImage.svg";

const Product = () => {
  const { id } = useParams();
  const { products, isProductsLoading } = useProducts();
  const { isCartLoading, cartState, addToCart } = useCart();
  const {
    isWishlistLoading,
    wishlistState,
    removeFromWishlist,
    addToWishlist,
  } = useWishlist();
  const product = products.find((product) => product._id === id);

  const handleAddToCart = async (product, productId) => {
    await addToCart(product, productId);
  };

  const handleAddOrRemoveWishListItems = async (productId) => {
    if (wishlistState.some((item) => item.product._id === productId)) {
      await removeFromWishlist(productId);
    } else {
      await addToWishlist(productId);
    }
  };

  if (isProductsLoading) {
    return (
      <DefaultWithoutSearch>
        <h1 className="overlay">Loading ...</h1>
      </DefaultWithoutSearch>
    );
  }

  if (products.length <= 0) {
    return (
      <DefaultWithoutSearch>
        <div className={styles.noProductFound}>
          <EmptyProductSvg width="80%" />
          <p
            style={{
              fontWeight: "bold",
              fontSize: "1.2rem",
              padding: "1rem 2rem",
            }}>
            Missing product data!
          </p>
          <Link to="/products" className="btn links btn-link">
            Shop now
          </Link>
        </div>
      </DefaultWithoutSearch>
    );
  }

  return (
    <DefaultWithoutSearch>
      <div className={styles.productDetailsContainer}>
        <div className={styles.productImage}>
          <img className="image" src={product.imageUrl} alt="" />
          <button
            onClick={() => handleAddOrRemoveWishListItems(product._id)}
            className={`btn secondary flex-icon ${styles.wishIcon} ${
              isWishlistLoading && "disabled"
            }`}
            disabled={isWishlistLoading}>
            {wishlistState.some((item) => item.product._id === product._id) ? (
              <FaHeart color="var(--rb-red)" />
            ) : (
              <FaRegHeart />
            )}
          </button>
          {cartState.items.some((item) => item.product._id === product._id) ? (
            <Link
              to="/cart"
              className={`btn secondary links btn-link ${styles.addToCartBtn}`}>
              <div style={{ marginRight: "0.5rem" }}>GO TO CART</div>{" "}
              <FaShoppingCart />
            </Link>
          ) : (
            <button
              onClick={() => handleAddToCart(product, product._id)}
              className={`btn secondary ${styles.addToCartBtn} ${
                isCartLoading && "disabled"
              }`}
              disabled={isCartLoading}>
              <div style={{ marginRight: "0.5rem" }}>
                {isCartLoading ? "GOING TO CART ..." : "ADD TO CART"}
              </div>
              <FaCartPlus />
            </button>
          )}
          <div className={`btn links btn-link ${styles.buyProduct}`}>
            <a href={product.productLink} rel="noreferrer" target="_blank">
              BUY NOW
            </a>
          </div>
        </div>
        <div className={styles.productDetails}>
          <div style={{ fontSize: "1.5rem" }}>{product.modelName}</div>
          <div style={{ padding: "0.5rem 0" }}>
            Model Number: {product.modelNo}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "0.5rem 0",
            }}>
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
          <div style={{ padding: "0.5rem 0" }}>
            <span style={{ fontSize: "1.5rem" }}>₹{product.discountPrice}</span>{" "}
            {product.discount > 0 && (
              <span style={{ textDecoration: "line-through" }}>
                {product.price}
              </span>
            )}{" "}
            {product.discount > 0 && (
              <span style={{ color: "var(--rb-green)" }}>
                {product.discount}% off
              </span>
            )}
          </div>
          <div style={{ padding: "0.5rem 0" }}>
            Description: {product.description}
          </div>
          <div className={styles.highlightsContainer}>
            Highlights
            <ul>
              {product.highlights.map(({ _id, label, value }) => (
                <li key={_id}>
                  {label}: {value}
                </li>
              ))}
            </ul>
          </div>
          <div className="seller-info">
            <div>Sold By</div>
            <div style={{ display: "flex", alignItems: "center" }}>
              {product.seller}{" "}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "0.5rem",
                }}>
                {product.sellerRating >= 4 && (
                  <div
                    className={`star-num rating-h flex-icon ${styles.ratingBadge}`}>
                    <div style={{ marginRight: "0.2rem" }}>
                      {product.sellerRating}
                    </div>{" "}
                    <FaStar />
                  </div>
                )}
                {product.sellerRating >= 2 && product.sellerRating < 4 && (
                  <div
                    className={`star-num rating-m flex-icon ${styles.ratingBadge} ${styles.ratingLow}`}>
                    <div style={{ marginRight: "0.2rem" }}>
                      {product.sellerRating}
                    </div>{" "}
                    <FaStar />
                  </div>
                )}
                {product.sellerRating >= 0 && product.sellerRating < 2 && (
                  <div
                    className={`star-num rating-l flex-icon ${styles.ratingBadge}`}>
                    <div style={{ marginRight: "0.2rem" }}>
                      {product.sellerRating}
                    </div>{" "}
                    <FaStar />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className={styles.productPageFooter}>
        {cartState.items.some((item) => item.product._id === product._id) ? (
          <div style={{ flexBasis: "50%" }}>
            <Link
              to="/cart"
              className={`btn secondary links btn-link flex-icon ${styles.addToCartBtn}`}>
              <div style={{ marginRight: "0.5rem" }}>GO TO CART</div>{" "}
              <FaShoppingCart />
            </Link>
          </div>
        ) : (
          <button
            onClick={() => handleAddToCart(product, product._id)}
            className={`btn secondary ${styles.addToCartBtn}`}
            disabled={isCartLoading}>
            {isCartLoading ? "GOING TO CART ..." : "ADD TO CART"} <FaCartPlus />
          </button>
        )}
        <div className={`btn links btn-link ${styles.buyProduct}`}>
          <a href={product.productLink} rel="noreferrer" target="_blank">
            BUY NOW
          </a>
        </div>
      </footer>
    </DefaultWithoutSearch>
  );
};
export default Product;
