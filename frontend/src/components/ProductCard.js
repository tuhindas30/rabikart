import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { IoBagAddOutline, IoBagCheckSharp } from "react-icons/io5";
import { BsArrowRightShort } from "react-icons/bs";
import PuffLoader from "react-spinners/PuffLoader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/css/ProductCard.css";

const ProductCard = ({
  itemDetails: {
    _id,
    modelName,
    imageUrl,
    price,
    avgRating,
    noOfRatings,
    discount,
    discountedPrice,
    inStock,
  },
  wishState,
  wishDispatch,
  cartState,
  cartDispatch,
}) => {
  const [isAddingToCart, setAddToCartLoader] = useState("hide");
  const [isAddingToWishlist, setAddToWishlistLoader] = useState("hide");

  const handleAddToCart = async (_id) => {
    try {
      setAddToCartLoader("show");
      const { data } = await axios.post(
        "https://rabikart.tuhindas5.repl.co/cart",
        {
          id: _id,
        }
      );
      if (data.status === "SUCCESS")
        cartDispatch({
          type: "ADD_TO_CART",
          payload: { item: data.data },
        });
      toast.dark("Added to cart", {
        position: "bottom-left",
        autoClose: 4000,
        hideProgressBar: true,
      });
    } catch (error) {
      toast.dark("Error while adding to cart. Please try again", {
        position: "bottom-left",
        autoClose: 4000,
        hideProgressBar: true,
      });
    } finally {
      setAddToCartLoader("hide");
    }
  };

  const handleAddToWishList = async (_id) => {
    if (wishState.some((item) => item.product._id === _id)) {
      const wishItemId = wishState.find((item) => item.product._id === _id)._id;
      try {
        setAddToWishlistLoader("show");
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
        toast.dark("Error while removing from wishlist. Please try again", {
          position: "bottom-left",
          autoClose: 4000,
          hideProgressBar: true,
        });
      } finally {
        setAddToWishlistLoader("hide");
      }
    } else {
      try {
        setAddToWishlistLoader("show");
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
        toast.dark("Error while adding to wishlist. Please try again", {
          position: "bottom-left",
          autoClose: 4000,
          hideProgressBar: true,
        });
      } finally {
        setAddToWishlistLoader("hide");
      }
    }
  };

  return (
    <div className="card product-list-item">
      <div className="list-item-details">
        <div className="product-img--container ">
          <img className="image" src={imageUrl} alt="" />
          {!inStock && (
            <div className="overlay">
              <div>OUT OF STOCK</div>
            </div>
          )}
        </div>
        <div className="card-content product-card-content--container">
          <Link to={`/product/${_id}`} className="link">
            <div className="product-card-content">
              <p>{modelName}</p>
              {avgRating >= 4 && (
                <div className="rating--container">
                  <small className="star-num rating-badge rating-h">
                    {avgRating} <i className="bi bi-star-fill"></i>
                  </small>{" "}
                  ({noOfRatings})
                </div>
              )}
              {avgRating >= 2 && avgRating < 4 && (
                <div className="rating--container">
                  <span className="star-num rating-badge rating-m">
                    <small>{avgRating}</small>{" "}
                    <i className="bi bi-star-fill"></i>
                  </span>{" "}
                  ({noOfRatings})
                </div>
              )}
              {avgRating >= 0 && avgRating < 2 && (
                <div className="rating--container">
                  <span className="star-num rating-badge rating-l">
                    <small>{avgRating}</small>{" "}
                    <i className="bi bi-star-fill"></i>
                  </span>{" "}
                  ({noOfRatings})
                </div>
              )}
              <div>
                <strong style={{ fontSize: "1rem" }}>₹{discountedPrice}</strong>{" "}
                {discount ? <strike>{price}</strike> : null}{" "}
                {discount ? (
                  <span style={{ color: "var(--rb-green)" }}>
                    {discount}% off
                  </span>
                ) : null}
              </div>
            </div>
          </Link>
          <div className="product-card-icons--container">
            {isAddingToWishlist === "show" ? (
              <PuffLoader color="var(--rb-primary)" size={22} />
            ) : (
              <div
                onClick={() => handleAddToWishList(_id)}
                className="flex-icon"
                style={{
                  cursor:
                    isAddingToWishlist === "show" ? "not-allowed" : "pointer",
                }}>
                {wishState &&
                wishState.some((item) => item.product._id === _id) ? (
                  <FaHeart color="var(--rb-red)" />
                ) : (
                  <FaRegHeart />
                )}
              </div>
            )}
            <div className="flex-icon">
              {cartState &&
              cartState.some((item) => item.item.product._id === _id) ? (
                <Link to="/cart" className="nav-links flex-icon">
                  <IoBagCheckSharp color="var(--rb-primary)" />
                  <BsArrowRightShort color="var(--rb-primary)" />
                </Link>
              ) : (
                <div
                  onClick={() => handleAddToCart(_id)}
                  className="flex-icon"
                  style={{
                    cursor:
                      isAddingToCart === "show" ? "not-allowed" : "pointer",
                  }}>
                  {isAddingToCart === "show" ? (
                    <PuffLoader color="var(--rb-primary)" size={22} />
                  ) : (
                    <IoBagAddOutline />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
