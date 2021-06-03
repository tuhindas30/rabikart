import "../assets/css/Product.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { useCart } from "../contexts/cart-context";
import { useProducts } from "../contexts/products-context";
import { useWish } from "../contexts/wishlist-context";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const Product = () => {
  const { productId } = useParams();
  const { productsData } = useProducts();
  const { wishState, wishDispatch } = useWish();
  const { cartState, cartDispatch } = useCart();
  const {
    _id,
    modelName,
    modelNo,
    imageUrl,
    avgRating,
    noOfRatings,
    noOfReviews,
    price,
    discount,
    discountedPrice,
    offers,
    services,
    deliveryWithin,
    seller,
    sellerRating,
    description,
    specifications,
  } =
    productsData.length > 0 &&
    productsData.filter((product) => product._id === productId)[0];

  const handleAddToCart = async (_id) => {
    try {
      const { data } = await axios.post(
        "https://rabikart.tuhindas5.repl.co/cart",
        {
          id: _id,
        }
      );
      if (data.status === "SUCCESS") {
        cartDispatch({
          type: "ADD_TO_CART",
          payload: { item: data.data },
        });
        toast.dark("Added to cart", {
          position: "bottom-left",
          autoClose: 4000,
          hideProgressBar: true,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddToWishList = async (_id) => {
    if (wishState.some((item) => item.product._id === _id)) {
      const wishItemId = wishState.find((item) => item.product._id === _id)._id;
      try {
        const { data } = await axios.delete(
          `https://rabikart.tuhindas5.repl.co/wishlist/${wishItemId}`
        );
        if (data.status === "SUCCESS") {
          wishDispatch({
            type: "SET_WISH_DATA",
            payload: { wishlist: data.data },
          });
          toast.dark("Removed from wishlist", {
            position: "bottom-left",
            autoClose: 4000,
            hideProgressBar: true,
          });
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const { data } = await axios.post(
          "https://rabikart.tuhindas5.repl.co/wishlist",
          {
            id: _id,
          }
        );
        if (data.status === "SUCCESS") {
          wishDispatch({
            type: "ADD_WISH",
            payload: { item: data.data },
          });
          toast.dark("Added to wishlist", {
            position: "bottom-left",
            autoClose: 4000,
            hideProgressBar: true,
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="product-details--container">
      <div className="product-image">
        <img className="image" src={imageUrl} alt="" />
        <div
          onClick={() => handleAddToWishList(_id)}
          className="product-wish-icon--container flex-icon">
          {wishState && wishState.some((item) => item.product._id === _id) ? (
            <FaHeart color="var(--rb-red)" />
          ) : (
            <FaRegHeart />
          )}
        </div>
        <div className="product-page--btn">
          {cartState &&
          cartState.some((item) => item.item.product._id === _id) ? (
            <button className="btn secondary">
              <Link to="/cart" className="nav-links add-to-cart-btn">
                GO TO CART
              </Link>
            </button>
          ) : (
            <button
              onClick={() => handleAddToCart(_id)}
              className="btn secondary add-to-cart-btn">
              ADD TO CART
            </button>
          )}
          <button className="btn primary">BUY NOW</button>
        </div>
      </div>
      <div className="product-details">
        <div style={{ fontSize: "1.5rem" }}>{modelName}</div>
        <div>Model Number: {modelNo}</div>
        <div className="rating-review--container">
          {avgRating >= 4 && (
            <span className="rating--container">
              <small className="star-num rating-badge rating-h">
                {avgRating} <i className="bi bi-star-fill"></i>
              </small>
            </span>
          )}
          {avgRating >= 2 && avgRating < 4 && (
            <span className="rating--container">
              <span className="star-num rating-badge rating-m">
                <small>{avgRating}</small> <i className="bi bi-star-fill"></i>
              </span>
            </span>
          )}
          {avgRating >= 0 && avgRating < 2 && (
            <span className="rating--container">
              <span className="star-num rating-badge rating-l">
                <small>{avgRating}</small> <i className="bi bi-star-fill"></i>
              </span>
            </span>
          )}{" "}
          <span>
            {noOfRatings} Ratings & {noOfReviews} Reviews
          </span>
        </div>
        <div>
          <span style={{ fontSize: "1.5rem" }}>₹{discountedPrice}</span>{" "}
          {discount ? <strike>{price}</strike> : null}{" "}
          {discount ? (
            <span style={{ color: "var(--rb-green)" }}>{discount}% off</span>
          ) : null}
        </div>
        <div className="description">Description: {description}</div>
        <div className="offers--container">
          <div>Available Offers</div>
          <ul>{offers && offers.map((offer) => <li>{offer}</li>)}</ul>
        </div>
        <div className="services--container">
          <div>Services</div>
          <ul>
            <li>Usually delivered in {deliveryWithin} days</li>
            {services &&
              services.map((service) => <li key={service}>{service}</li>)}
          </ul>
        </div>
        <div className="highlights--container">
          <div>Highlights</div>
          <ul>
            {specifications &&
              specifications.map(({ _id, label, value }) => (
                <li key={_id}>
                  {label}: {value}
                </li>
              ))}
          </ul>
        </div>
        <div className="seller-info">
          <div>Sold By</div>
          <div>
            {seller}{" "}
            <span className="rating--container">
              <small className="star-num rating-badge rating-h">
                {sellerRating} <i className="bi bi-star-fill"></i>
              </small>
            </span>
          </div>
        </div>
      </div>
      <footer className="product-page-footer">
        {cartState &&
        cartState.some((item) => item.item.product._id === _id) ? (
          <button className="btn secondary">
            <Link to="/cart" className="nav-links add-to-cart-btn">
              GO TO CART
            </Link>
          </button>
        ) : (
          <button
            onClick={() => handleAddToCart(_id)}
            className="btn secondary add-to-cart-btn">
            ADD TO CART
          </button>
        )}
        <button className="btn primary">BUY NOW</button>
      </footer>
    </div>
  );
};
export default Product;
